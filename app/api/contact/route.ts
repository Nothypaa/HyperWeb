import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, type Contact } from '@/lib/supabase';
import * as Sentry from "@sentry/nextjs";

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
  return Sentry.startSpan(
    {
      op: "http.server",
      name: "POST /api/contact",
    },
    async () => {
  try {
    const body = await request.json();
    const clientIp = getClientIp(request);

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

    // Validate subject is one of the expected values
    const validSubjects = [
      'web-development',
      'web-design',
      'consultation'
    ];
    
    if (!validSubjects.includes(subject)) {
      return NextResponse.json(
        { success: false, error: 'Invalid subject selection' },
        { status: 400 }
      );
    }

    // Prepare contact data
    const contactData: Omit<Contact, 'id' | 'created_at'> = {
      full_name: sanitizeInput(fullName),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : undefined,
      subject: sanitizeInput(subject),
      message: message ? sanitizeInput(message) : undefined,
      ip_address: clientIp,
    };

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert([contactData])
      .select()
      .single() as { data: Contact | null; error: any };

    if (error) {
      const errorDetails = {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      };
      console.error('Supabase error details:', errorDetails);
      
      // Capture error in Sentry
      Sentry.captureException(new Error(`Supabase contact save failed: ${error.message}`), {
        tags: { operation: 'contact_save' },
        extra: { errorDetails, contactData }
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to save contact',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: data?.id
    });

  } catch (error) {
    console.error('Contact API error:', error);
    
    // Capture error in Sentry
    Sentry.captureException(error, {
      tags: { operation: 'contact_api' },
      extra: { requestUrl: request.url, requestMethod: request.method }
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
    }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}