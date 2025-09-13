import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://agencehyperweb.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/',
          '/api/',
          '/.next/',
          '/node_modules/',
          '/admin/',
          '/wp-admin/',
          '/wp-content/',
          '/wp-includes/',
          '/dashboard/',
          '/login/',
          '/auth/',
          '/404',
          '/500',
          '/*?utm_*',
          '/*?fbclid=*',
          '/*?gclid=*',
          '/*?ref=*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-Mobile',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/public/', '/images/', '/*.webp', '/*.jpg', '/*.png', '/*.svg'],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: ['/', '/blog/'],
      },
      {
        userAgent: 'Twitterbot',
        allow: ['/', '/blog/'],
      },
      {
        userAgent: 'LinkedInBot',
        allow: ['/', '/blog/'],
      },
      {
        userAgent: 'MJ12bot',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'SemrushBot',
        allow: '/',
        crawlDelay: 10,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}