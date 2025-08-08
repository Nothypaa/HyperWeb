"use client";

import { usePathname } from 'next/navigation';
import { AuroraBackground } from './ui/aurora-background';
import Navbar from './Navbar';
import { Footer } from './ui/large-name-footer';

interface ConditionalAuroraProps {
  children: React.ReactNode;
}

export default function ConditionalAurora({ children }: ConditionalAuroraProps) {
  const pathname = usePathname();
  
  // Disable aurora animation on blog and FAQ pages
  const isBlogPage = pathname?.startsWith('/blog');
  const isFaqPage = pathname?.startsWith('/faq');
  
  return (
    <AuroraBackground showAurora={!isBlogPage && !isFaqPage}>
      <Navbar />
      {children}
      <Footer />
    </AuroraBackground>
  );
}
