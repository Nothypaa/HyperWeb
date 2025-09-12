import { NextRequest, NextResponse } from 'next/server'
import { healthCheckSupabase, getSupabaseAdmin } from '@/lib/supabase'

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
    
    const supabase = getSupabaseAdmin()
    const { data, error, count } = await supabase
      .from('contacts')
      .select('id', { count: 'exact', head: true })
      .limit(1)
    
    const responseTime = Date.now() - startTime
    
    if (error) {
      console.error('❌ Database health check failed:', error.message)
      return {
        status: 'unhealthy',
        responseTime,
        lastCheck: new Date().toISOString(),
        error: error.message
      }
    }
    
    console.log(`✅ Database healthy (${responseTime}ms)`)
    
    return {
      status: 'healthy',
      responseTime,
      lastCheck: new Date().toISOString(),
      details: { contactsCount: count || 0 }
    }
  } catch (error) {
    console.error('❌ Database health check error:', error)
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function checkAuthenticationHealth(): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    console.log('🔐 Checking authentication health...')
    
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1
    })
    
    const responseTime = Date.now() - startTime
    
    if (error) {
      console.error('❌ Authentication health check failed:', error.message)
      return {
        status: 'unhealthy',
        responseTime,
        lastCheck: new Date().toISOString(),
        error: error.message
      }
    }
    
    console.log(`✅ Authentication healthy (${responseTime}ms)`)
    
    return {
      status: 'healthy',
      responseTime,
      lastCheck: new Date().toISOString(),
      details: { usersFound: data?.users?.length || 0 }
    }
  } catch (error) {
    console.error('❌ Authentication health check error:', error)
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function gatherSystemStatistics(): Promise<HealthStatus['statistics']> {
  try {
    console.log('📈 Gathering system statistics...')
    
    const supabase = getSupabaseAdmin()
    
    // Get contacts count
    const { count: contactsCount } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
    
    // Get admin users count
    const { data: adminUsers } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000
    })
    
    // Get most recent contact
    const { data: recentContact } = await supabase
      .from('contacts')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    return {
      contactsCount: contactsCount || 0,
      adminUsersCount: adminUsers?.users?.length || 0,
      lastContactAt: recentContact?.created_at,
      systemLoad: 0 // Placeholder
    }
  } catch (error) {
    console.warn('⚠️ Failed to gather statistics:', error)
    return {
      contactsCount: 0,
      adminUsersCount: 0,
      systemLoad: 0
    }
  }
}

// =======================================
// MAIN HEALTH CHECK HANDLER
// =======================================

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  console.log('\n🏥 Health check requested...')
  
  try {
    // Run health checks in parallel
    const [
      databaseHealth,
      authenticationHealth,
      systemStatistics
    ] = await Promise.all([
      checkDatabaseHealth(),
      checkAuthenticationHealth(),
      gatherSystemStatistics()
    ])
    
    // Determine overall status
    const services = {
      database: databaseHealth,
      authentication: authenticationHealth
    }
    
    const allHealthy = Object.values(services).every(service => service.status === 'healthy')
    const anyDegraded = Object.values(services).some(service => service.status === 'degraded')
    
    let overallStatus: HealthStatus['status'] = 'healthy'
    if (!allHealthy) {
      overallStatus = anyDegraded ? 'degraded' : 'unhealthy'
    }
    
    // Get memory usage
    const memoryUsage = process.memoryUsage()
    const memory = {
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      percentage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100)
    }
    
    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
      services,
      statistics: systemStatistics,
      memory
    }
    
    const totalTime = Date.now() - startTime
    console.log(`✅ Health check completed in ${totalTime}ms: ${overallStatus.toUpperCase()}`)
    
    const httpStatus = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503
    
    return NextResponse.json(healthStatus, { status: httpStatus })
    
  } catch (error) {
    const totalTime = Date.now() - startTime
    console.error('❌ Health check failed:', error)
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
      error: error instanceof Error ? error.message : 'Unknown error',
      processingTime: totalTime
    }, { status: 503 })
  }
}

// =======================================
// METHOD NOT ALLOWED HANDLER
// =======================================

export async function POST() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'This endpoint only supports GET requests for health checks'
    },
    { status: 405, headers: { Allow: 'GET' } }
  )
}