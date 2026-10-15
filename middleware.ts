import { NextRequest, NextResponse } from 'next/server';

// While true, every page shows "Site en cours de création" except the paths below.
// Set to false to put the full website back online.
const COMING_SOON = true;
const COMING_SOON_ALLOWED = ['/cahier-des-charges', '/en-construction', '/admin'];

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

  if (COMING_SOON) {
    const { pathname } = url;
    const isAllowed = COMING_SOON_ALLOWED.some((p) => pathname === p || pathname.startsWith(`${p}/`));
    // Let files from /public through (logo, favicon, manifest, robots.txt, sitemap.xml…)
    const isFile = /\.[a-z0-9]+$/i.test(pathname);

    if (!isAllowed && !isFile) {
      url.pathname = '/en-construction';
      // 503 + Retry-After tells search engines the outage is temporary, so rankings are kept
      const response = NextResponse.rewrite(url, { status: 503 });
      response.headers.set('Retry-After', '86400');
      return withSecurityHeaders(response, false);
    }
  }

  // SEO-friendly URL redirects - Old URLs to new SEO-optimized URLs
  if (url.pathname === '/seo') {
    url.pathname = '/c-est-quoi-seo';
    return NextResponse.redirect(url.toString(), 301);
  }

  // The client brief builds its PDF in the browser (@react-pdf/renderer), which needs data:/blob: URLs
  const allowPdf = url.pathname.startsWith('/cahier-des-charges');
  return withSecurityHeaders(NextResponse.next(), allowPdf);
}

function withSecurityHeaders(response: NextResponse, allowPdf: boolean) {
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
    `connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://bfksghkgtjnimmoetour.supabase.co https://formspree.io${allowPdf ? ' data: blob:' : ''}`,
    ...(allowPdf ? ["worker-src 'self' blob:"] : []),
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