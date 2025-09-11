import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('Testing contacts fetch with service role...');
    
    // Test basic select
    const { data: contacts, error: dbError } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Service role query result:', {
      contactsCount: contacts?.length || 0,
      error: dbError?.message,
      contacts: contacts
    });

    if (dbError) {
      return NextResponse.json({
        success: false,
        error: 'Database error',
        details: {
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          code: dbError.code
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Service role can fetch contacts',
      contactsCount: contacts?.length || 0,
      contacts: contacts
    });

  } catch (error) {
    console.error('Debug contacts error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : error
    });
  }
}