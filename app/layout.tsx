import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '../components/Navbar'
import { SpeedInsights } from "@vercel/speed-insights/next"

import ConditionalAurora from '../components/ConditionalAurora'
import LenisProvider from '../components/LenisProvider'
import LocalBusinessSchema from '../components/LocalBusinessSchema'

export const metadata: Metadata = {
  title: 'HyperWeb - Agence Web France | Création Site Internet dès 450€',
  description: 'Agence web française spécialisée en création de sites internet professionnels. Développement React/Next.js. Tarifs transparents dès 450€. Garantie satisfait ou remboursé.',
  keywords: 'agence web france, création site internet, développement web professionnel, site web sur mesure',
  openGraph: {
    title: 'HyperWeb - Agence Web France | Sites Internet Professionnels',
    description: 'Création de sites internet professionnels dès 450€. Garantie satisfait ou remboursé.',
    type: 'website',
    locale: 'fr_FR',
  }
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
        <script 
          src="https://analytics.ahrefs.com/analytics.js" 
          data-key="/4HvJHnAj1QZ2Gvt8iHz/Q" 
          async
        ></script>
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
