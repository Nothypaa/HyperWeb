import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, type Contact, type ContactSubmission, type DatabaseResult } from '@/lib/supabase'
import { sendContactNotification } from '@/lib/email'

// =======================================
// RATE LIMITING & SPAM DETECTION
// =======================================

// Simple in-memory rate limiter (production should use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const existing = rateLimitStore.get(ip)
  
  if (!existing || now > existing.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  existing.count++
  return true
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now()
  rateLimitStore.forEach((data, ip) => {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip)
    }
  })
}, 60 * 1000) // Clean every minute

// =======================================
// VALIDATION FUNCTIONS
// =======================================

function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email is required' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Invalid email format' }
  }
  
  if (email.length > 254) {
    return { valid: false, error: 'Email too long' }
  }
  
  return { valid: true }
}

function validateFullName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim() === '') {
    return { valid: false, error: 'Full name is required' }
  }
  
  const trimmed = name.trim()
  if (trimmed.length < 2) {
    return { valid: false, error: 'Full name must be at least 2 characters' }
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Full name too long (max 100 characters)' }
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = /[<>{}\[\]\\|`~]/
  if (suspiciousPatterns.test(trimmed)) {
    return { valid: false, error: 'Full name contains invalid characters' }
  }
  
  return { valid: true }
}

function validatePhone(phone: string | undefined): { valid: boolean; error?: string } {
  if (!phone || phone.trim() === '') {
    return { valid: true } // Phone is optional
  }
  
  const phoneRegex = /^[\+\d\s\-\(\)]{10,20}$/
  if (!phoneRegex.test(phone.trim())) {
    return { valid: false, error: 'Invalid phone number format' }
  }
  
  return { valid: true }
}

function validateSubject(subject: string): { valid: boolean; error?: string } {
  const validSubjects: Contact['subject'][] = ['web-development', 'web-design', 'consultation']
  
  if (!subject || !validSubjects.includes(subject as Contact['subject'])) {
    return { valid: false, error: 'Invalid subject selection' }
  }
  
  return { valid: true }
}

function validateMessage(message: string | undefined): { valid: boolean; error?: string } {
  if (!message || message.trim() === '') {
    return { valid: true } // Message is optional
  }
  
  if (message.length > 2000) {
    return { valid: false, error: 'Message too long (max 2000 characters)' }
  }
  
  return { valid: true }
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000)
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
// DUPLICATE DETECTION
// =======================================

async function checkForDuplicates(email: string, message: string): Promise<{
  isDuplicate: boolean
  recentSubmission?: Contact
}> {
  try {
    const supabase = supabaseAdmin
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('email', email)
      .gte('created_at', oneHourAgo)
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (error) {
      console.warn('⚠️ Duplicate check failed:', error.message)
      return { isDuplicate: false }
    }
    
    if (!data || data.length === 0) {
      return { isDuplicate: false }
    }
    
    const recent = data[0] as Contact
    
    // Check if message is very similar (simple approach)
    const similarity = message && recent.message ? 
      getSimilarity(message.toLowerCase(), recent.message.toLowerCase()) : 0
    
    if (similarity > 0.8) {
      console.log(`🚫 Duplicate detected: ${email} (similarity: ${similarity})`)
      return { isDuplicate: true, recentSubmission: recent }
    }
    
    return { isDuplicate: false }
  } catch (error) {
    console.error('Error checking duplicates:', error)
    return { isDuplicate: false }
  }
}

function getSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1
  
  if (longer.length === 0) return 1.0
  
  const editDistance = levenshteinDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = []
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  return matrix[str2.length][str1.length]
}

// =======================================
// DATABASE OPERATIONS
// =======================================

async function saveContactToDatabase(contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseResult<Contact>> {
  try {
    console.log('💾 Attempting to save contact to database...')
    const supabase = supabaseAdmin
    
    const { data, error } = await supabase
      .from('contacts')
      .insert([contactData])
      .select()
      .single()
    
    if (error) {
      console.error('❌ Database save failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      
      return {
        success: false,
        error: error.message,
        details: error
      }
    }
    
    console.log(`✅ Contact saved successfully with ID: ${data.id}`)
    return {
      success: true,
      data: data as Contact
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

async function verifyContactSaved(contactId: number): Promise<boolean> {
  try {
    console.log(`🔍 Verifying contact ${contactId} was saved...`)
    const supabase = supabaseAdmin
    
    const { data, error } = await supabase
      .from('contacts')
      .select('id, full_name, email')
      .eq('id', contactId)
      .single()
    
    if (error || !data) {
      console.error('❌ Verification failed:', error?.message)
      return false
    }
    
    console.log(`✅ Contact verified: ${data.full_name} (${data.email})`)
    return true
  } catch (error) {
    console.error('❌ Verification error:', error)
    return false
  }
}

// =======================================
// MAIN API HANDLER
// =======================================

export async function POST(request: NextRequest) {
      const startTime = Date.now()
      const clientIp = getClientIp(request)
      
      console.log(`\n🚀 Contact form submission started (IP: ${clientIp})`)
      
      try {
        // Step 1: Rate limiting
        console.log('🔒 Checking rate limits...')
        if (!checkRateLimit(clientIp)) {
          console.log(`❌ Rate limit exceeded for IP: ${clientIp}`)
          
          return NextResponse.json(
            { 
              success: false, 
              error: 'Too many requests. Please wait 15 minutes before submitting again.',
              retryAfter: 900 // 15 minutes
            },
            { status: 429 }
          )
        }
        
        // Step 2: Parse request body
        console.log('📝 Parsing request body...')
        let body: ContactSubmission
        try {
          body = await request.json()
        } catch (error) {
          console.error('❌ Invalid JSON body:', error)
          return NextResponse.json(
            { success: false, error: 'Invalid request format' },
            { status: 400 }
          )
        }
        
        const { fullName, email, phone, subject, message, honeypot } = body
        
        // Step 3: Honeypot spam check
        console.log('🍯 Checking honeypot...')
        if (honeypot && honeypot.trim() !== '') {
          console.log(`🚫 Spam detected via honeypot (IP: ${clientIp})`)
          
          return NextResponse.json(
            { success: false, error: 'Spam detected' },
            { status: 400 }
          )
        }
        
        // Step 4: Validate all inputs
        console.log('✅ Validating inputs...')
        const validations = [
          validateFullName(fullName),
          validateEmail(email),
          validatePhone(phone),
          validateSubject(subject),
          validateMessage(message)
        ]
        
        const firstError = validations.find(v => !v.valid)
        if (firstError) {
          console.log(`❌ Validation failed: ${firstError.error}`)
          return NextResponse.json(
            { success: false, error: firstError.error },
            { status: 400 }
          )
        }
        
        // Step 5: Check for duplicates
        console.log('🔍 Checking for duplicates...')
        const { isDuplicate, recentSubmission } = await checkForDuplicates(
          email.trim(), 
          message || ''
        )
        
        if (isDuplicate && recentSubmission) {
          console.log(`🚫 Duplicate submission detected for ${email}`)
          
          return NextResponse.json({
            success: true, // Return success to avoid user confusion
            message: 'We received your message and will respond soon.',
            note: 'duplicate_handled'
          })
        }
        
        // Step 6: Prepare contact data
        console.log('🛠️ Preparing contact data...')
        const contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at'> = {
          full_name: sanitizeInput(fullName),
          email: sanitizeInput(email),
          phone: phone ? sanitizeInput(phone) : undefined,
          subject: subject as Contact['subject'],
          message: message ? sanitizeInput(message) : undefined,
          ip_address: clientIp,
          status: 'new'
        }
        
        console.log(`📊 Contact data prepared:`, {
          full_name: contactData.full_name,
          email: contactData.email,
          subject: contactData.subject,
          has_phone: !!contactData.phone,
          has_message: !!contactData.message,
          ip_address: contactData.ip_address
        })
        
        // Step 7: Save to database
        const saveResult = await saveContactToDatabase(contactData)
        
        if (!saveResult.success) {
          console.error('❌ Failed to save contact:', saveResult.error)
          
          // TODO: Implement backup mechanism (email fallback, queue, etc.)
          
          return NextResponse.json(
            {
              success: false,
              error: 'Unable to process your submission. Please try again or contact us directly.',
              details: process.env.NODE_ENV === 'development' ? saveResult.error : undefined
            },
            { status: 500 }
          )
        }
        
        // Step 8: Verify the save
        const contactId = saveResult.data!.id!
        console.log('🔍 Verifying save operation...')
        const isVerified = await verifyContactSaved(contactId)
        
        if (!isVerified) {
          console.error('❌ Save verification failed')
        }
        
        // Step 9: Send email notification
        if (isVerified) {
          console.log('📧 Sending email notification...')
          const emailResult = await sendContactNotification(saveResult.data!)
          
          if (emailResult.success) {
            console.log('✅ Email notification sent successfully')
          } else {
            console.warn('⚠️ Email notification failed:', emailResult.error)
            // Don't fail the entire request if email fails
          }
        }
        
        // Step 10: Success response
        const processingTime = Date.now() - startTime
        console.log(`🎉 Contact form processed successfully in ${processingTime}ms`)
        
        
        return NextResponse.json({
          success: true,
          message: 'Contact form submitted successfully',
          contactId,
          processingTime,
          verified: isVerified
        })
        
      } catch (error) {
        const processingTime = Date.now() - startTime
        console.error('❌ Unexpected contact API error:', error)
        
        
        return NextResponse.json(
          {
            success: false,
            error: 'An unexpected error occurred. Please try again later.'
          },
          { status: 500 }
        )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests for contact form submissions',
      allowedMethods: ['POST']
    },
    { status: 405, headers: { Allow: 'POST' } }
  )
}