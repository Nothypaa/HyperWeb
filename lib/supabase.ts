import { createClient, SupabaseClient } from '@supabase/supabase-js'
import * as Sentry from '@sentry/nextjs'

// =======================================
// ENVIRONMENT VALIDATION
// =======================================

interface SupabaseConfig {
  url: string
  anonKey: string
  serviceKey?: string
}

function validateEnvironment(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) {
    const error = new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL environment variable.\n' +
      'Please add it to your .env.local file or Vercel environment variables.'
    )
    Sentry.captureException(error, { tags: { component: 'supabase_config' } })
    throw error
  }

  if (!anonKey) {
    const error = new Error(
      'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.\n' +
      'Please add it to your .env.local file or Vercel environment variables.'
    )
    Sentry.captureException(error, { tags: { component: 'supabase_config' } })
    throw error
  }

  // Validate URL format
  try {
    new URL(url)
  } catch {
    const error = new Error(`Invalid NEXT_PUBLIC_SUPABASE_URL format: ${url}`)
    Sentry.captureException(error, { tags: { component: 'supabase_config' } })
    throw error
  }

  // Warn if service key is missing on server side
  if (typeof window === 'undefined' && !serviceKey) {
    console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY is missing. Admin operations may fail.')
    Sentry.captureMessage('Supabase service key missing', {
      level: 'warning',
      tags: { component: 'supabase_config' }
    })
  }

  console.log('✅ Supabase environment variables validated successfully')
  return { url, anonKey, serviceKey }
}

// =======================================
// CONNECTION TESTING
// =======================================

async function testConnection(client: SupabaseClient, clientType: string): Promise<boolean> {
  try {
    console.log(`🔍 Testing ${clientType} connection...`)
    const { error } = await client.from('contacts').select('id').limit(1)
    
    if (error) {
      console.error(`❌ ${clientType} connection test failed:`, error.message)
      Sentry.captureException(new Error(`${clientType} connection failed: ${error.message}`), {
        tags: { component: 'supabase_connection' }
      })
      return false
    }
    
    console.log(`✅ ${clientType} connection successful`)
    return true
  } catch (error) {
    console.error(`❌ ${clientType} connection error:`, error)
    Sentry.captureException(error as Error, {
      tags: { component: 'supabase_connection' }
    })
    return false
  }
}

// =======================================
// CLIENT INSTANCES
// =======================================

let _supabaseClient: SupabaseClient | null = null
let _supabaseAdminClient: SupabaseClient | null = null
let _configCache: SupabaseConfig | null = null

// Get validated config (cached)
function getConfig(): SupabaseConfig {
  if (!_configCache) {
    _configCache = validateEnvironment()
  }
  return _configCache
}

// Client-side Supabase instance with retry logic
export function getSupabaseClient(): SupabaseClient {
  if (_supabaseClient) {
    return _supabaseClient
  }

  try {
    const config = getConfig()
    console.log('🔧 Creating Supabase client instance...')
    
    _supabaseClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        headers: {
          'x-application-name': 'hyperweb-contact-system'
        }
      }
    })

    console.log('✅ Supabase client created successfully')
    return _supabaseClient
  } catch (error) {
    console.error('❌ Failed to create Supabase client:', error)
    Sentry.captureException(error as Error, {
      tags: { component: 'supabase_client_creation' }
    })
    throw error
  }
}

// Server-side admin client with service role
export function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdminClient) {
    return _supabaseAdminClient
  }

  try {
    const config = getConfig()
    console.log('🔧 Creating Supabase admin client...')

    const key = config.serviceKey || config.anonKey
    const isServiceRole = !!config.serviceKey

    if (!isServiceRole) {
      console.warn('⚠️  Using anon key for admin client - operations may be limited')
    }

    _supabaseAdminClient = createClient(config.url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers: {
          'x-application-name': 'hyperweb-admin-system',
          'x-client-type': isServiceRole ? 'service-role' : 'anon-fallback'
        }
      }
    })

    console.log(`✅ Supabase admin client created (${isServiceRole ? 'service role' : 'anon fallback'})`)
    return _supabaseAdminClient
  } catch (error) {
    console.error('❌ Failed to create Supabase admin client:', error)
    Sentry.captureException(error as Error, {
      tags: { component: 'supabase_admin_creation' }
    })
    throw error
  }
}

// =======================================
// HEALTH CHECK FUNCTIONS
// =======================================

export async function healthCheckSupabase(): Promise<{
  client: boolean
  admin: boolean
  timestamp: string
}> {
  const timestamp = new Date().toISOString()
  
  try {
    const [clientOk, adminOk] = await Promise.all([
      testConnection(getSupabaseClient(), 'client'),
      testConnection(getSupabaseAdmin(), 'admin')
    ])

    const result = {
      client: clientOk,
      admin: adminOk,
      timestamp
    }

    console.log('🏥 Supabase health check:', result)
    return result
  } catch (error) {
    console.error('❌ Health check failed:', error)
    Sentry.captureException(error as Error, {
      tags: { component: 'supabase_health_check' }
    })
    
    return {
      client: false,
      admin: false,
      timestamp
    }
  }
}

// Reset connections (useful for testing)
export function resetSupabaseConnections(): void {
  console.log('🔄 Resetting Supabase connections...')
  _supabaseClient = null
  _supabaseAdminClient = null
  _configCache = null
  console.log('✅ Supabase connections reset')
}

// Legacy exports (lazy initialization)
export const supabase = getSupabaseClient()
export const supabaseAdmin = getSupabaseAdmin()

// =======================================
// DATABASE TYPES
// =======================================

export interface Contact {
  id?: number
  full_name: string
  email: string
  phone?: string
  subject: 'web-development' | 'web-design' | 'consultation'
  message?: string
  ip_address?: string
  created_at?: string
  updated_at?: string
  status?: 'new' | 'read' | 'replied' | 'archived'
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
  last_login?: string
  is_active: boolean
}

// Contact form submission data (for API)
export interface ContactSubmission {
  fullName: string
  email: string
  phone?: string
  subject: Contact['subject']
  message?: string
  honeypot?: string
}

// Database operation result
export interface DatabaseResult<T> {
  success: boolean
  data?: T
  error?: string
  details?: any
}