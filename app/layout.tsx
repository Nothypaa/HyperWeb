import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '../components/Navbar'
import StagewiseWrapper from '../components/StagewiseWrapper'

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
        <Navbar />
        {children}
        <StagewiseWrapper />
      </body>
    </html>
  )
}
