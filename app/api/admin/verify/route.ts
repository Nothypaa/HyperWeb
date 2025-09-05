import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { logAuditEvent } from '@/lib/db';

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
  const clientIp = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    const { token } = await request.json();
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
      await logAuditEvent('ADMIN_VERIFY_CONFIG_ERROR', clientIp, userAgent, 'JWT secret not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }
    
    try {
      const decoded = jwt.verify(token, jwtSecret) as any;
      
      if (!decoded.admin) {
        await logAuditEvent('ADMIN_VERIFY_INVALID_TOKEN', clientIp, userAgent, 'Token does not have admin privileges');
        return NextResponse.json(
          { success: false, error: 'Invalid token' },
          { status: 401 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Token is valid'
      });
      
    } catch (jwtError) {
      await logAuditEvent('ADMIN_VERIFY_FAILED', clientIp, userAgent, 'JWT verification failed');
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Token verification error:', error);
    await logAuditEvent('ADMIN_VERIFY_ERROR', clientIp, userAgent, error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json(
      { success: false, error: 'Token verification failed' },
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