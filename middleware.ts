import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Skip redirects for localhost development (IPv4, IPv6, and all variants)
  const isLocalhost =
    hostname.includes('localhost') ||
    hostname.includes('127.0.0.1') ||
    hostname.includes('[::1]') ||
    hostname === '::1' ||
    hostname.startsWith('[::1]:') ||
    hostname.startsWith('localhost:') ||
    hostname.startsWith('127.0.0.1:');

  if (!isLocalhost) {
    // URL Redirects for SEO canonicalization
    const shouldRedirect =
      // WWW to non-WWW redirect
      hostname.startsWith('www.') ||
      // HTTP to HTTPS redirect (in case of reverse proxy issues)
      url.protocol === 'http:';

    if (shouldRedirect) {
      // Create the canonical URL
      const canonicalUrl = new URL(request.url);
      canonicalUrl.hostname = 'agencehyperweb.com'; // Remove www
      canonicalUrl.protocol = 'https:'; // Force HTTPS

      return NextResponse.redirect(canonicalUrl.toString(), 301);
    }
  }

  // SEO-friendly URL redirects - Old URLs to new SEO-optimized URLs
  if (url.pathname === '/seo') {
    url.pathname = '/c-est-quoi-seo';
    return NextResponse.redirect(url.toString(), 301);
  }

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
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdn.jsdelivr.net", // unsafe-* needed for Next.js dev
    "style-src 'self' 'unsafe-inline' https://api.fontshare.com", // unsafe-inline needed for Tailwind
    "img-src 'self' data: https:",
    "font-src 'self' https://api.fontshare.com https://cdn.fontshare.com",
    "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://bfksghkgtjnimmoetour.supabase.co",
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