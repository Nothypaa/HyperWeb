import { NextRequest, NextResponse } from 'next/server';
import { getAllContacts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // In production, add authentication here
    // For now, we'll just return the data
    const contacts = await getAllContacts();
    
    return NextResponse.json({
      success: true,
      data: contacts,
      total: contacts.length
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch contacts' 
      },
      { status: 500 }
    );
  }
}