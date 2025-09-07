import { NextRequest, NextResponse } from 'next/server';
import { deleteContactSubmission, verifyAdminToken } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Verify admin token
    const isValid = await verifyAdminToken(token);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse contact ID
    const contactId = parseInt(params.id, 10);
    if (isNaN(contactId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid contact ID' },
        { status: 400 }
      );
    }

    // Delete the contact submission
    const result = await deleteContactSubmission(contactId);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}