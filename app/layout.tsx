import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '../components/Navbar'

import { AuroraBackground } from '../components/ui/aurora-background'
import { Footer } from '@/components/ui/large-name-footer'
import LenisProvider from '../components/LenisProvider'

export const metadata: Metadata = {
  title: 'HyperWeb',
  description: 'A modern web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KESKV6R0ZY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KESKV6R0ZY');
          `}
        </Script>
        <LenisProvider>
          <AuroraBackground>
            <Navbar />
            {children}
            <Footer />
            
          </AuroraBackground>
        </LenisProvider>
      </body>
    </html>
  )
}
