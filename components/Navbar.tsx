'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ui/theme-toggle';
import { useAnchorNavigation } from '@/hooks/useAnchorNavigation';

const Navbar: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isBlogPage = pathname === '/blog';
  const isFaqPage = pathname === '/faq';
  const { navigateToAnchor } = useAnchorNavigation();

  const handlePortfolioClick = () => {
    if (pathname === '/') {
      // Same page navigation
      navigateToAnchor('#portfolio');
    } else {
      // Cross-page navigation
      navigateToAnchor('#portfolio', '/');
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handlePricingClick = () => {
    if (pathname === '/') {
      // Same page navigation
      navigateToAnchor('#pricing');
    } else {
      // Cross-page navigation
      navigateToAnchor('#pricing', '/');
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleContactClick = () => {
    if (pathname === '/') {
      // Same page navigation
      navigateToAnchor('#contact');
    } else {
      // Cross-page navigation
      navigateToAnchor('#contact', '/');
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Initial animation for navbar appearance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    if (isBlogPage || isFaqPage) {
      // Always show button on blog and FAQ pages, but allow initial animation
      setTimeout(() => setShowButton(true), 600);
      return () => clearTimeout(timer);
    }

    // Original scroll behavior for other pages
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.5;
      setShowButton(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isBlogPage, isFaqPage]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 md:p-6">
        <div className={`w-full max-w-xl bg-gray-100/95 backdrop-blur px-8 py-0 rounded-[28px] md:rounded-full transition-all duration-800 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-8'
        }`}>
          {/* Top row with logo and hamburger/desktop nav */}
          <div className="flex items-center justify-between h-12 md:h-14">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center space-x-1 -ml-4" onClick={closeMobileMenu}>
              <div className="w-14 h-14 md:w-14 md:h-14 relative">
                <Image
                  src="/HyperWeb-logo/Hyperweb-nobg.svg"
                  alt="HyperWeb - Agence Web France Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="hidden md:inline text-black font-black text-lg tracking-tight">HyperWeb</span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center relative">
              {/* Navigation Links - slide left when button appears */}
              <div className={`flex items-center space-x-6 transition-transform duration-500 ease-out ${
                              showButton ? 'transform -translate-x-32' : ''
              }`}>
                <button
                  onClick={handlePricingClick}
                  className="text-black font-bold text-sm hover:text-gray-700 transition-colors"
                >
                  Tarifs
                </button>
                <button
                  onClick={handleContactClick}
                  className="text-black font-bold text-sm hover:text-gray-700 transition-colors"
                >
                  Contact
                </button>
              </div>
              
              {/* Sites réalisés button - fades in from below */}
              <div className={`absolute -right-6 transition-all duration-500 ease-out ${
                showButton 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}>
                <button 
                  onClick={handlePortfolioClick}
                  className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  Sites réalisés
                </button>
              </div>
            </div>

            {/* Mobile Hamburger Menu - Visible only on mobile */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center w-8 h-8 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                {/* Hamburger Icon - 2 lines */}
                <span 
                  className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1.5'
                  }`}
                />
                <span 
                  className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-3.5'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu - Expanding content inside navbar container */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}>
            {/* Mobile Navigation Links */}
            <div className="pt-6 pb-4 space-y-0">
              <div className="text-left">
                <button
                  onClick={handlePricingClick}
                  className="block w-full text-black font-extrabold text-xl py-2 text-left hover:text-gray-700 transition-colors"
                >
                  Tarifs
                </button>
              </div>
              
              <div className="text-left">
                <button
                  onClick={handleContactClick}
                  className="block w-full text-black font-extrabold text-xl py-2 text-left hover:text-gray-700 transition-colors"
                >
                  Contact
                </button>
              </div>
              
              <div className="text-left">
                <Link
                  href="/blog"
                  className="block w-full text-black font-extrabold text-xl py-2 text-left hover:text-gray-700 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Blog
                </Link>
              </div>

              {/* Theme Toggle for Mobile */}
              <div className="flex justify-center py-4 border-t border-gray-200 mt-4">
                <ThemeToggle />
              </div>

              {/* Always show on mobile, conditional on desktop */}
              <div className="text-center pt-2">
                <button 
                  onClick={handlePortfolioClick}
                  className="bg-black text-white px-8 py-2 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors w-full"
                >
                  Sites réalisés
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Theme Toggle - Hidden on mobile, visible on desktop */}
      <div className={`hidden md:block fixed top-6 right-6 z-50 transition-all duration-800 ease-out delay-200 ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-8'
      }`}>
        <ThemeToggle />
      </div>
    </>
  );
};

export default Navbar;