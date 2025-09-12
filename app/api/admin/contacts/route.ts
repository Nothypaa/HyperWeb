import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, type Contact, type DatabaseResult } from '@/lib/supabase'

// =======================================
// TYPES AND INTERFACES
// =======================================

interface ContactsQuery {
  page?: number
  limit?: number
  status?: Contact['status']
  subject?: Contact['subject']
  search?: string
  sortBy?: 'created_at' | 'updated_at' | 'full_name' | 'email'
  sortOrder?: 'asc' | 'desc'
  dateFrom?: string
  dateTo?: string
}

interface ContactsResponse {
  success: boolean
  data?: Contact[]
  total?: number
  page?: number
  limit?: number
  totalPages?: number
  statistics?: ContactStatistics
  error?: string
}

interface ContactStatistics {
  totalContacts: number
  byStatus: Record<Contact['status'], number>
  bySubject: Record<Contact['subject'], number>
  recentCount: number
  todayCount: number
  weekCount: number
  monthCount: number
}

// =======================================
// HELPER FUNCTIONS
// =======================================

function parseQuery(request: NextRequest): ContactsQuery {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  
  return {
    page: Math.max(1, parseInt(searchParams.get('page') || '1')),
    limit: Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20'))),
    status: searchParams.get('status') as Contact['status'] || undefined,
    subject: searchParams.get('subject') as Contact['subject'] || undefined,
    search: searchParams.get('search') || undefined,
    sortBy: searchParams.get('sortBy') as any || 'created_at',
    sortOrder: searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc',
    dateFrom: searchParams.get('dateFrom') || undefined,
    dateTo: searchParams.get('dateTo') || undefined
  }
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIp) return cfConnectingIp.trim()
  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIp) return realIp.trim()
  
  return request.ip || 'unknown'
}

// =======================================
// DATABASE OPERATIONS
// =======================================

async function verifyAdminToken(token: string): Promise<{ valid: boolean; user?: any; error?: string }> {
  try {
    console.log('🔍 Verifying admin token...')
    const supabase = getSupabaseAdmin()
    
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      console.log('❌ Token verification failed:', error?.message)
      return { valid: false, error: 'Invalid or expired token' }
    }
    
    console.log(`✅ Token verified for admin: ${user.email}`)
    return { valid: true, user }
  } catch (error) {
    console.error('❌ Token verification error:', error)
    return { valid: false, error: 'Token verification failed' }
  }
}

async function getContactStatistics(): Promise<ContactStatistics> {
  try {
    const supabase = getSupabaseAdmin()
    
    // Get all contacts for statistics
    const { data: allContacts, error } = await supabase
      .from('contacts')
      .select('status, subject, created_at')
    
    if (error) throw error
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    
    const statistics: ContactStatistics = {
      totalContacts: allContacts?.length || 0,
      byStatus: { new: 0, read: 0, replied: 0, archived: 0 },
      bySubject: { 'web-development': 0, 'web-design': 0, 'consultation': 0 },
      recentCount: 0,
      todayCount: 0,
      weekCount: 0,
      monthCount: 0
    }
    
    allContacts?.forEach(contact => {
      const createdAt = new Date(contact.created_at)
      
      // Count by status
      if (contact.status && statistics.byStatus.hasOwnProperty(contact.status)) {
        statistics.byStatus[contact.status as Contact['status']]++
      }
      
      // Count by subject
      if (contact.subject && statistics.bySubject.hasOwnProperty(contact.subject)) {
        statistics.bySubject[contact.subject as Contact['subject']]++
      }
      
      // Count by time periods
      if (createdAt >= hourAgo) statistics.recentCount++
      if (createdAt >= today) statistics.todayCount++
      if (createdAt >= weekAgo) statistics.weekCount++
      if (createdAt >= monthAgo) statistics.monthCount++
    })
    
    return statistics
  } catch (error) {
    console.error('⚠️ Failed to get statistics:', error)
    return {
      totalContacts: 0,
      byStatus: { new: 0, read: 0, replied: 0, archived: 0 },
      bySubject: { 'web-development': 0, 'web-design': 0, 'consultation': 0 },
      recentCount: 0,
      todayCount: 0,
      weekCount: 0,
      monthCount: 0
    }
  }
}

async function fetchContacts(query: ContactsQuery): Promise<DatabaseResult<{ contacts: Contact[]; totalCount: number }>> {
  try {
    console.log('💾 Fetching contacts with query:', query)
    const supabase = getSupabaseAdmin()
    
    let queryBuilder = supabase.from('contacts').select('*', { count: 'exact' })
    
    // Apply filters
    if (query.status) {
      queryBuilder = queryBuilder.eq('status', query.status)
    }
    
    if (query.subject) {
      queryBuilder = queryBuilder.eq('subject', query.subject)
    }
    
    if (query.search) {
      queryBuilder = queryBuilder.or(
        `full_name.ilike.%${query.search}%,email.ilike.%${query.search}%,message.ilike.%${query.search}%`
      )
    }
    
    if (query.dateFrom) {
      queryBuilder = queryBuilder.gte('created_at', query.dateFrom)
    }
    
    if (query.dateTo) {
      queryBuilder = queryBuilder.lte('created_at', query.dateTo)
    }
    
    // Apply sorting
    queryBuilder = queryBuilder.order(query.sortBy || 'created_at', {
      ascending: query.sortOrder === 'asc'
    })
    
    // Apply pagination
    const from = (query.page! - 1) * query.limit!
    const to = from + query.limit! - 1
    queryBuilder = queryBuilder.range(from, to)
    
    const { data: contacts, error, count } = await queryBuilder
    
    if (error) {
      console.error('❌ Database query failed:', error)
      return {
        success: false,
        error: error.message,
        details: error
      }
    }
    
    console.log(`✅ Fetched ${contacts?.length || 0} contacts (total: ${count})`)
    
    return {
      success: true,
      data: {
        contacts: contacts || [],
        totalCount: count || 0
      }
    }
  } catch (error) {
    console.error('❌ Unexpected database error:', error)
    return {
      success: false,
      error: 'Database connection failed',
      details: error
    }
  }
}

// =======================================
// MAIN CONTACTS HANDLER
// =======================================

export async function GET(request: NextRequest) {
      const startTime = Date.now()
      const clientIp = getClientIp(request)
      
      console.log(`\n📊 Admin contacts request (IP: ${clientIp})`)
      
      try {
        // Step 1: Authentication
        const authHeader = request.headers.get('authorization')
        const token = authHeader?.replace('Bearer ', '')
        
        if (!token) {
          console.log('❌ No authorization token provided')
          return NextResponse.json(
            { success: false, error: 'No authorization token provided' },
            { status: 401 }
          )
        }
        
        const authResult = await verifyAdminToken(token)
        if (!authResult.valid) {
          return NextResponse.json(
            { success: false, error: authResult.error },
            { status: 401 }
          )
        }
        
        // Step 2: Parse query parameters
        const query = parseQuery(request)
        console.log('🔍 Query parameters:', query)
        
        // Step 3: Fetch contacts and statistics in parallel
        console.log('🔄 Fetching contacts and statistics...')
        const [contactsResult, statistics] = await Promise.all([
          fetchContacts(query),
          getContactStatistics()
        ])
        
        if (!contactsResult.success) {
          console.error('❌ Failed to fetch contacts:', contactsResult.error)
          
          
          return NextResponse.json(
            {
              success: false,
              error: 'Failed to fetch contacts',
              details: process.env.NODE_ENV === 'development' ? contactsResult.error : undefined
            },
            { status: 500 }
          )
        }
        
        // Step 4: Prepare response
        const { contacts, totalCount } = contactsResult.data!
        const totalPages = Math.ceil(totalCount / query.limit!)
        const processingTime = Date.now() - startTime
        
        console.log(`✅ Admin contacts fetched successfully in ${processingTime}ms:`, {
          returned: contacts.length,
          total: totalCount,
          page: query.page,
          totalPages
        })
        
        // Step 5: Log activity
        
        const response: ContactsResponse = {
          success: true,
          data: contacts,
          total: totalCount,
          page: query.page,
          limit: query.limit,
          totalPages,
          statistics,
          ...(process.env.NODE_ENV === 'development' && {
            _debug: {
              processingTime,
              query,
              user: authResult.user.email
            }
          })
        }
        
        return NextResponse.json(response)
        
      } catch (error) {
        const processingTime = Date.now() - startTime
        console.error('❌ Unexpected admin contacts error:', error)
        
        
        return NextResponse.json(
          {
            success: false,
            error: 'An unexpected error occurred while fetching contacts'
          },
          { status: 500 }
        )
  }
}