import { NextRequest, NextResponse } from 'next/server'
import { healthCheckSupabase, getSupabaseAdmin } from '@/lib/supabase'
import * as Sentry from '@sentry/nextjs'

// =======================================
// HEALTH CHECK TYPES
// =======================================

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  uptime: number
  version: string
  environment: string
  services: {
    database: ServiceHealth
    authentication: ServiceHealth
    sentry: ServiceHealth
  }
  statistics: {
    contactsCount: number
    adminUsersCount: number
    lastContactAt?: string
    systemLoad: number
  }
  memory: {
    used: number
    total: number
    percentage: number
  }
}

interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  responseTime: number
  lastCheck: string
  error?: string
  details?: any
}

// =======================================
// HEALTH CHECK FUNCTIONS
// =======================================

async function checkDatabaseHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    console.log('🔍 Checking database health...')
    
    // Test basic connectivity
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('contacts')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('❌ Database health check failed:', error.message)
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        error: error.message,
        details: error
      }
    }
    
    const responseTime = Date.now() - startTime
    console.log(`✅ Database healthy (${responseTime}ms)`)
    
    return {
      status: responseTime > 2000 ? 'degraded' : 'healthy',
      responseTime,
      lastCheck: new Date().toISOString()
    }
  } catch (error) {
    console.error('❌ Database health check error:', error)
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: (error as Error).message
    }
  }
}

async function checkAuthenticationHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    console.log('🔐 Checking authentication health...')
    
    const supabase = getSupabaseAdmin()
    
    // Test auth service by checking if we can list users (admin function)
    const { data, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1
    })
    
    if (error) {
      console.error('❌ Auth health check failed:', error.message)
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        lastCheck: new Date().toISOString(),
        error: error.message
      }
    }
    
    const responseTime = Date.now() - startTime
    console.log(`✅ Authentication healthy (${responseTime}ms)`)
    
    return {
      status: responseTime > 1500 ? 'degraded' : 'healthy',
      responseTime,
      lastCheck: new Date().toISOString()
    }
  } catch (error) {
    console.error('❌ Authentication health check error:', error)
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: (error as Error).message
    }
  }
}

async function checkSentryHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    console.log('📊 Checking Sentry health...')
    
    // Test Sentry by sending a test breadcrumb
    Sentry.addBreadcrumb({
      message: 'Health check test breadcrumb',
      level: 'info',
      category: 'health_check'
    })
    
    const responseTime = Date.now() - startTime
    console.log(`✅ Sentry healthy (${responseTime}ms)`)
    
    return {
      status: 'healthy',
      responseTime,
      lastCheck: new Date().toISOString()
    }
  } catch (error) {
    console.error('❌ Sentry health check error:', error)
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: (error as Error).message
    }
  }
}

async function getSystemStatistics(): Promise<HealthStatus['statistics']> {
  try {
    console.log('📈 Gathering system statistics...')
    const supabase = getSupabaseAdmin()
    
    // Get contacts count and last contact
    const { data: contactsData, error: contactsError } = await supabase
      .from('contacts')
      .select('created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(1)
    
    // Get admin users count
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('id', { count: 'exact' })
    
    return {
      contactsCount: contactsData?.length || 0,
      adminUsersCount: adminData?.length || 0,
      lastContactAt: contactsData?.[0]?.created_at,
      systemLoad: process.memoryUsage().heapUsed / process.memoryUsage().heapTotal
    }
  } catch (error) {
    console.error('⚠️ Failed to get statistics:', error)
    return {
      contactsCount: 0,
      adminUsersCount: 0,
      systemLoad: 0
    }
  }
}

function getMemoryInfo() {
  const memUsage = process.memoryUsage()
  return {
    used: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
    total: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
    percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100)
  }
}

function determineOverallStatus(services: HealthStatus['services']): HealthStatus['status'] {
  const statuses = Object.values(services).map(service => service.status)
  
  if (statuses.includes('unhealthy')) {
    return 'unhealthy'
  }
  
  if (statuses.includes('degraded')) {
    return 'degraded'
  }
  
  return 'healthy'
}

// =======================================
// MAIN HEALTH CHECK HANDLER
// =======================================

export async function GET(request: NextRequest) {
  return Sentry.startSpan(
    {
      op: 'http.server',
      name: 'GET /api/health',
    },
    async () => {
      const startTime = Date.now()
      const isDetailed = new URL(request.url).searchParams.get('detailed') === 'true'
      
      console.log('\\n🏥 Health check requested...')
      
      try {
        // Run all health checks in parallel
        const [databaseHealth, authHealth, sentryHealth, statistics] = await Promise.all([
          checkDatabaseHealth(),
          checkAuthenticationHealth(),
          checkSentryHealth(),
          isDetailed ? getSystemStatistics() : Promise.resolve({
            contactsCount: 0,
            adminUsersCount: 0,
            systemLoad: 0
          })
        ])
        
        const services = {
          database: databaseHealth,
          authentication: authHealth,
          sentry: sentryHealth
        }
        
        const overallStatus = determineOverallStatus(services)
        const processingTime = Date.now() - startTime
        
        const healthStatus: HealthStatus = {
          status: overallStatus,
          timestamp: new Date().toISOString(),
          uptime: Math.floor(process.uptime()),
          version: process.env.npm_package_version || '1.0.0',
          environment: process.env.NODE_ENV || 'unknown',
          services,
          statistics,
          memory: getMemoryInfo()
        }
        
        console.log(`${overallStatus === 'healthy' ? '✅' : overallStatus === 'degraded' ? '⚠️' : '❌'} Health check completed in ${processingTime}ms: ${overallStatus.toUpperCase()}`)
        
        // Log health check in Sentry
        Sentry.addBreadcrumb({
          message: `Health check completed: ${overallStatus}`,
          level: overallStatus === 'healthy' ? 'info' : overallStatus === 'degraded' ? 'warning' : 'error',
          data: {
            processingTime,
            overallStatus,
            serviceStatuses: Object.entries(services).map(([name, health]) => `${name}: ${health.status}`)
          }
        })
        
        // Return appropriate HTTP status
        const httpStatus = overallStatus === 'healthy' ? 200 : 
                          overallStatus === 'degraded' ? 200 : 503
        
        return NextResponse.json(healthStatus, { status: httpStatus })
        
      } catch (error) {
        const processingTime = Date.now() - startTime
        console.error('❌ Health check failed:', error)
        
        Sentry.captureException(error as Error, {
          tags: { operation: 'health_check_failed' },
          extra: { processingTime }
        })
        
        return NextResponse.json(
          {
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            error: 'Health check system failure',
            processingTime
          },
          { status: 503 }
        )
      }
    }
  )
}

// =======================================
// SIMPLE PING ENDPOINT
// =======================================

export async function HEAD(request: NextRequest) {
  // Simple ping for load balancers
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'X-Health-Status': 'ok',
      'X-Timestamp': new Date().toISOString()
    }
  })
}