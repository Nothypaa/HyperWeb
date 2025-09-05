import { NextRequest, NextResponse } from 'next/server';
import { insertContact, checkRateLimit, ContactSubmission } from '@/lib/db';

// Input validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000); // Limit length and trim whitespace
}

function validatePhoneNumber(phone: string): boolean {
  if (!phone || phone.trim() === '') return true; // Phone is optional
  const phoneRegex = /^[\+\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return request.ip || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIp = getClientIp(request);

    // Check rate limit (default 5 submissions per hour per IP)
    const rateLimitMax = parseInt(process.env.RATE_LIMIT_PER_HOUR || '5');
    const withinRateLimit = await checkRateLimit(clientIp, rateLimitMax);
    
    if (!withinRateLimit) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Please try again later.' 
        },
        { status: 429 }
      );
    }

    // Extract and validate required fields
    const { fullName, email, phone, subject, message, honeypot } = body;

    // Check honeypot field (should be empty if human)
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json(
        { success: false, error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!fullName || !email || !subject) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: fullName, email, and subject are required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone number if provided
    if (phone && !validatePhoneNumber(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const contactData: ContactSubmission = {
      full_name: sanitizeInput(fullName),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : undefined,
      subject: sanitizeInput(subject),
      message: message ? sanitizeInput(message) : undefined,
      ip_address: clientIp
    };

    // Validate subject is one of the expected values
    const validSubjects = [
      'web-development',
      'web-design',
      'consultation'
    ];
    
    if (!validSubjects.includes(contactData.subject)) {
      return NextResponse.json(
        { success: false, error: 'Invalid subject selection' },
        { status: 400 }
      );
    }

    // Insert into database
    const contactId = await insertContact(contactData);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}