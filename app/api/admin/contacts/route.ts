import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    // Verify the token with Supabase
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Fetch contacts from database
    console.log('Fetching contacts for user:', user.id, user.email);
    const { data: contacts, error: dbError } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    
    console.log('Query result:', { 
      contactsCount: contacts?.length || 0, 
      error: dbError?.message,
      firstContact: contacts?.[0] 
    });

    if (dbError) {
      console.error('Database error details:', {
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
        code: dbError.code
      });
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch contacts',
          details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contacts || [],
      total: contacts?.length || 0
    });

  } catch (error) {
    console.error('Contacts API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}