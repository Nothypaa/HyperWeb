import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '../components/Navbar'
import { SpeedInsights } from "@vercel/speed-insights/next"

import ConditionalAurora from '../components/ConditionalAurora'
import LenisProvider from '../components/LenisProvider'
import LocalBusinessSchema from '../components/LocalBusinessSchema'

export const metadata: Metadata = {
  title: {
    template: '%s | Agence HyperWeb Montpellier',
    default: 'Agence Web Montpellier - Sites avec Garantie Résultats | HyperWeb'
  },
  description: 'La seule agence web Montpellier qui vous rembourse si votre site ne génère aucun résultat. Création de sites web performants avec SEO inclus. Devis gratuit.',
  keywords: 'agence web montpellier, création site web montpellier, développement web, SEO montpellier, site internet montpellier, garantie résultats',
  authors: [{ name: 'Agence HyperWeb Montpellier' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: 'Agence Web Montpellier - Sites avec Garantie Résultats',
    description: 'La seule agence web Montpellier qui vous rembourse si votre site ne génère aucun résultat. Création de sites web performants avec SEO inclus.',
    url: 'https://agencehyperweb.com',
    siteName: 'Agence HyperWeb Montpellier',
    images: [
      {
        url: 'https://agencehyperweb.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agence HyperWeb Montpellier - Création de sites web',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agence Web Montpellier - Sites avec Garantie Résultats',
    description: 'La seule agence web Montpellier qui vous rembourse si votre site ne génère aucun résultat.',
    images: ['https://agencehyperweb.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://agencehyperweb.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        {/* Favicon - multiple sizes for better visibility */}
        <link rel="icon" href="/Hyperweb-nobg.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/Hyperweb-nobg.ico" />
        
        {/* Apple Touch Icon - larger icon for mobile bookmarks */}
        <link rel="apple-touch-icon" sizes="180x180" href="/HyperWeb-logo/Hyperweb-nobg.svg" />
        
        {/* SVG favicons for better quality at different sizes */}
        <link rel="icon" type="image/svg+xml" href="/HyperWeb-logo/Hyperweb-nobg.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/HyperWeb-logo/Hyperweb-nobg.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/HyperWeb-logo/Hyperweb-nobg.svg" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Meta tags for better PWA support */}
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content="HyperWeb" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  let shouldBeDark;
                  
                  if (theme === 'dark') {
                    shouldBeDark = true;
                  } else if (theme === 'light') {
                    shouldBeDark = false;
                  } else {
                    // No manual preference, follow system
                    shouldBeDark = systemPrefersDark;
                  }
                  
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Fallback to system preference if localStorage fails
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                }
              })();
            `,
          }}
        />
        <LocalBusinessSchema />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KESKV6R0ZY"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KESKV6R0ZY');
          `}
        </Script>
        <Script 
          src="https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js" 
          strategy="lazyOnload"
        />
        <LenisProvider>
          <ConditionalAurora>
            {children}
          </ConditionalAurora>
          {process.env.NODE_ENV === 'production' && <SpeedInsights />}
        </LenisProvider>
      </body>
    </html>
  )
}
