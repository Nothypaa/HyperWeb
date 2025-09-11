import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contactId = parseInt(params.id);
    
    if (isNaN(contactId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid contact ID' },
        { status: 400 }
      );
    }

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

    // Delete the contact
    const { error: deleteError } = await supabaseAdmin
      .from('contacts')
      .delete()
      .eq('id', contactId);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json(
        { success: false, error: 'Failed to delete contact' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact deleted successfully',
    });

  } catch (error) {
    console.error('Delete contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}