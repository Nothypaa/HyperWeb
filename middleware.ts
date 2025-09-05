import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://analytics.ahrefs.com https://www.googletagmanager.com", // unsafe-* needed for Next.js dev
    "style-src 'self' 'unsafe-inline' https://api.fontshare.com", // unsafe-inline needed for Tailwind
    "img-src 'self' data: https:",
    "font-src 'self' https://api.fontshare.com https://cdn.fontshare.com",
    "connect-src 'self' https://analytics.ahrefs.com https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com",
    "frame-src 'none'"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};