import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import * as Sentry from "@sentry/nextjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate with Supabase
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase auth error:', error.message);
      
      // Capture auth failures in Sentry (without sensitive data)
      Sentry.captureException(new Error(`Admin auth failed: ${error.message}`), {
        tags: { operation: 'admin_auth' },
        extra: { errorCode: error.status, email: email.replace(/(.{2}).*(@.*)/, '$1***$2') }
      });
      
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!data.user || !data.session) {
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });

  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

// =======================================
// TOKEN VERIFICATION ENDPOINT
// =======================================

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      )
    }
    
    console.log('🔍 Verifying admin token...')
    const supabase = getSupabaseAdmin()
    
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      console.log('❌ Token verification failed:', error?.message)
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      )
    }
    
    console.log(`✅ Token verified for user: ${user.email}`)
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
      verified: true
    })
    
  } catch (error) {
    console.error('❌ Token verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Token verification failed' },
      { status: 500 }
    )
  }
}

// =======================================
// LOGOUT ENDPOINT
// =======================================

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      )
    }
    
    console.log('🚪 Admin logout requested...')
    const supabase = getSupabaseAdmin()
    
    // Sign out the user
    const { error } = await supabase.auth.admin.signOut(token)
    
    if (error) {
      console.warn('⚠️ Logout error (may be expected):', error.message)
    }
    
    console.log('✅ Admin logout completed')
    
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })
    
  } catch (error) {
    console.error('❌ Logout error:', error)
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    )
  }
}