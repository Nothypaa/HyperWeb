"use client";

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { AuroraBackground } from './ui/aurora-background';
import Navbar from './Navbar';
import { Footer } from './ui/large-name-footer';
import { SimpleFooter } from './ui/simple-footer';

interface ConditionalAuroraProps {
  children: React.ReactNode;
}

export default function ConditionalAurora({ children }: ConditionalAuroraProps) {
  const pathname = usePathname();
  // The coming-soon page is reached through a middleware rewrite, so the URL can be any path:
  // detect it from the matched route segment instead of the pathname
  const segment = useSelectedLayoutSegment();
  
  // Disable aurora animation on blog, FAQ, and SEO pages
  const isBlogPage = pathname?.startsWith('/blog');
  const isFaqPage = pathname?.startsWith('/faq');
  const isSeoPage = pathname?.startsWith('/seo');
  const isAdminPage = pathname?.startsWith('/admin');
  const isBriefPage = pathname?.startsWith('/cahier-des-charges');
  
  // IMPORTANT: Admin pages must be excluded from all wrappers
  // to prevent React event handling issues (logout button bug)
  // DO NOT wrap admin pages with Navbar, Footer, or any UI components
  // Admin pages require clean, isolated React event handling
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Client brief and coming-soon page are standalone, with their own header
  if (isBriefPage || segment === 'en-construction') {
    return <>{children}</>;
  }
  
  return (
    <AuroraBackground showAurora={!isBlogPage && !isFaqPage && !isSeoPage}>
      <Navbar />
      {children}
      {isBlogPage || isFaqPage || isSeoPage ? <SimpleFooter /> : <Footer />}
    </AuroraBackground>
  );
}
