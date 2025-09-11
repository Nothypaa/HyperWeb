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

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
if (typeof window === 'undefined' && !supabaseServiceKey) {
  console.warn('Missing SUPABASE_SERVICE_ROLE_KEY - server operations may fail')
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey, // Fallback to anon key if service key missing
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

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