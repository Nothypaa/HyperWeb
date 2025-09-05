import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkAdminRateLimit, resetAdminRateLimit, logAuditEvent } from '@/lib/db';

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
    const { password } = await request.json();
    
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;
    
    
    if (!jwtSecret) {
      await logAuditEvent('ADMIN_AUTH_CONFIG_ERROR', clientIp, userAgent, 'JWT secret not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    if (!adminPassword && !adminPasswordHash) {
      await logAuditEvent('ADMIN_AUTH_CONFIG_ERROR', clientIp, userAgent, 'Admin password not configured');
      return NextResponse.json(
        { success: false, error: 'Admin password not configured' },
        { status: 500 }
      );
    }
    
    if (!password) {
      await logAuditEvent('ADMIN_AUTH_MISSING_PASSWORD', clientIp, userAgent);
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    // Check rate limit (3 attempts per hour per IP)
    const withinRateLimit = await checkAdminRateLimit(clientIp, 3);
    
    if (!withinRateLimit) {
      await logAuditEvent('ADMIN_AUTH_RATE_LIMITED', clientIp, userAgent, 'Too many failed attempts');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many failed attempts. Please try again later.' 
        },
        { status: 429 }
      );
    }
    
    let isValid = false;
    
    // Check against plain text first for immediate fix, then hashed password
    if (adminPassword) {
      isValid = password === adminPassword;
    } else if (adminPasswordHash) {
      isValid = await bcrypt.compare(password, adminPasswordHash);
    }
    
    if (isValid) {
      // Reset rate limit on successful login
      await resetAdminRateLimit(clientIp);
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          admin: true,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + (4 * 60 * 60) // 4 hours
        },
        jwtSecret
      );
      
      await logAuditEvent('ADMIN_LOGIN_SUCCESS', clientIp, userAgent);
      
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        token
      });
    } else {
      await logAuditEvent('ADMIN_LOGIN_FAILED', clientIp, userAgent, 'Invalid password');
      
      return NextResponse.json({
        success: false,
        message: 'Invalid password'
      }, { status: 401 });
    }
    
  } catch (error) {
    console.error('Authentication error:', error);
    await logAuditEvent('ADMIN_AUTH_ERROR', clientIp, userAgent, error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
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