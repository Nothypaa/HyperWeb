import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, resetSupabaseConnections } from '@/lib/supabase'
import * as Sentry from '@sentry/nextjs'

// =======================================
// DEBUG TYPES
// =======================================

interface DebugInfo {
  environment: {
    nodeVersion: string
    platform: string
    nodeEnv: string
    timestamp: string
    uptime: number
    timezone: string
  }
  database: {
    connectionStatus: string
    tablesInfo: any[]
    recentContacts: any[]
    contactsCount: number
  }
  configuration: {
    hasSupabaseUrl: boolean
    hasSupabaseAnonKey: boolean
    hasSupabaseServiceKey: boolean
    hasSentryDsn: boolean
  }
  memory: {
    rss: number
    heapTotal: number
    heapUsed: number
    external: number
    arrayBuffers: number
  }
  request: {
    method: string
    url: string
    headers: Record<string, string>
    ip: string
    userAgent: string
  }
}

// =======================================
// HELPER FUNCTIONS
// =======================================

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIp) return cfConnectingIp.trim()
  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIp) return realIp.trim()
  
  return request.ip || 'unknown'
}

function getRequestInfo(request: NextRequest): DebugInfo['request'] {
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    // Filter out sensitive headers
    if (!['authorization', 'cookie', 'x-api-key'].includes(key.toLowerCase())) {
      headers[key] = value
    }
  })

  return {
    method: request.method,
    url: request.url,
    headers,
    ip: getClientIp(request),
    userAgent: request.headers.get('user-agent') || 'unknown'
  }
}

async function getDatabaseInfo(): Promise<DebugInfo['database']> {
  try {
    console.log('🔍 Gathering database debug info...')
    const supabase = getSupabaseAdmin()
    
    // Test basic connection
    const { data: pingData, error: pingError } = await supabase
      .from('contacts')
      .select('id')
      .limit(1)
    
    if (pingError) {
      return {
        connectionStatus: `Failed: ${pingError.message}`,
        tablesInfo: [],
        recentContacts: [],
        contactsCount: 0
      }
    }
    
    // Get recent contacts (limited info for privacy)
    const { data: recentContacts } = await supabase
      .from('contacts')
      .select('id, full_name, subject, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5)
    
    // Get total count
    const { data: countData, count } = await supabase
      .from('contacts')
      .select('id', { count: 'exact', head: true })
    
    // Get table info (if available)
    const { data: tablesData } = await supabase
      .from('information_schema.tables')
      .select('table_name, table_type')
      .eq('table_schema', 'public')
      .limit(10)
    
    return {
      connectionStatus: 'Connected',
      tablesInfo: tablesData || [],
      recentContacts: recentContacts?.map(contact => ({
        ...contact,
        full_name: contact.full_name?.substring(0, 1) + '***' // Privacy protection
      })) || [],
      contactsCount: count || 0
    }
  } catch (error) {
    console.error('❌ Database debug info failed:', error)
    return {
      connectionStatus: `Error: ${(error as Error).message}`,
      tablesInfo: [],
      recentContacts: [],
      contactsCount: 0
    }
  }
}

// =======================================
// MAIN DEBUG HANDLER
// =======================================

export async function GET(request: NextRequest) {
  // Only allow in development environment
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Debug endpoint not available in production' },
      { status: 404 }
    )
  }
  
  return Sentry.startSpan(
    {
      op: 'http.server',
      name: 'GET /api/debug',
    },
    async () => {
      const startTime = Date.now()
      
      console.log('\\n🐛 Debug info requested...')
      
      try {
        const memUsage = process.memoryUsage()
        
        const [databaseInfo] = await Promise.all([
          getDatabaseInfo()
        ])
        
        const debugInfo: DebugInfo = {
          environment: {
            nodeVersion: process.version,
            platform: process.platform,
            nodeEnv: process.env.NODE_ENV || 'unknown',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          database: databaseInfo,
          configuration: {
            hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            hasSupabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            hasSentryDsn: !!process.env.SENTRY_DSN
          },
          memory: {
            rss: Math.round(memUsage.rss / 1024 / 1024),
            heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
            heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
            external: Math.round(memUsage.external / 1024 / 1024),
            arrayBuffers: Math.round(memUsage.arrayBuffers / 1024 / 1024)
          },
          request: getRequestInfo(request)
        }
        
        const processingTime = Date.now() - startTime
        console.log(`✅ Debug info generated in ${processingTime}ms`)
        
        return NextResponse.json({
          ...debugInfo,
          _meta: {
            processingTime,
            generated: new Date().toISOString()
          }
        })
        
      } catch (error) {
        const processingTime = Date.now() - startTime
        console.error('❌ Debug info generation failed:', error)
        
        return NextResponse.json(
          {
            error: 'Failed to generate debug info',
            message: (error as Error).message,
            processingTime
          },
          { status: 500 }
        )
      }
    }
  )
}

// =======================================\n// DEBUG ACTIONS\n// =======================================

export async function POST(request: NextRequest) {
  // Only allow in development environment
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Debug actions not available in production' },
      { status: 404 }
    )
  }
  
  try {
    const body = await request.json()
    const { action } = body
    
    console.log(`🔧 Debug action requested: ${action}`)
    
    switch (action) {
      case 'reset_connections':
        resetSupabaseConnections()
        console.log('✅ Supabase connections reset')
        return NextResponse.json({ success: true, message: 'Connections reset' })
      
      case 'test_sentry':
        Sentry.captureMessage('Debug test message from /api/debug', 'info')
        console.log('✅ Test message sent to Sentry')
        return NextResponse.json({ success: true, message: 'Test message sent to Sentry' })
      
      case 'trigger_error':
        throw new Error('Debug test error')
      
      case 'memory_info':
        const memUsage = process.memoryUsage()
        return NextResponse.json({
          success: true,
          memory: {
            rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
            heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
            heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
            external: `${Math.round(memUsage.external / 1024 / 1024)} MB`
          }
        })
      
      default:
        return NextResponse.json(
          { error: 'Unknown debug action', availableActions: ['reset_connections', 'test_sentry', 'trigger_error', 'memory_info'] },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('❌ Debug action failed:', error)
    return NextResponse.json(
      { error: 'Debug action failed', message: (error as Error).message },
      { status: 500 }
    )
  }
}