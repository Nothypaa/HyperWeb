import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}
if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Global variables to store singleton instances
let _supabaseClient: ReturnType<typeof createClient> | null = null
let _supabaseAdminClient: ReturnType<typeof createClient> | null = null

// Client-side Supabase instance (singleton getter)
function getSupabaseClient() {
  if (!_supabaseClient) {
    _supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabaseClient
}

// Server-side client with service role key (singleton getter)
function getSupabaseAdminClient() {
  if (!_supabaseAdminClient) {
    if (typeof window === 'undefined' && !supabaseServiceKey) {
      console.warn('Missing SUPABASE_SERVICE_ROLE_KEY - server operations may fail')
    }
    
    _supabaseAdminClient = createClient(
      supabaseUrl,
      supabaseServiceKey || supabaseAnonKey, // Fallback to anon key if service key missing
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  }
  return _supabaseAdminClient
}

// Export singleton instances
export const supabase = getSupabaseClient()
export const supabaseAdmin = getSupabaseAdminClient()

// Types for our database
export interface Contact {
  id?: number
  full_name: string
  email: string
  phone?: string
  subject: string
  message?: string
  ip_address?: string
  created_at?: string
}