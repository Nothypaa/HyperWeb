'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ui/theme-toggle';

const Navbar: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past 50vh (hero section)
      const scrolled = window.scrollY > window.innerHeight * 0.5;
      setShowButton(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 flex justify-center p-6">
        <div className="flex items-center justify-between w-full max-w-xl bg-gray-100/95 backdrop-blur rounded-full px-8 h-14">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-1 -ml-4">
          <div className="w-14 h-14 relative">
            <Image
              src="/HyperWeb-logo/Hyperweb-nobg.svg"
              alt="HyperWeb Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-black font-black text-lg tracking-tight">HyperWeb</span>
        </Link>

        {/* Right side - nav links with optional button */}
        <div className="flex items-center relative">
          {/* Navigation Links - slide left when button appears */}
          <div className={`flex items-center space-x-6 transition-transform duration-500 ease-out ${
                          showButton ? 'transform -translate-x-32' : ''
          }`}>
            <Link
              href="/pricing"
              className="text-black font-bold text-sm hover:text-gray-700 transition-colors"
            >
              Tarifs
            </Link>
            <Link
              href="/login"
              className="text-black font-bold text-sm hover:text-gray-700 transition-colors"
            >
              Connexion
            </Link>
          </div>
          
          {/* Sites réalisés button - fades in from below */}
          <div className={`absolute -right-6 transition-opacity duration-500 ease-out ${
            showButton 
              ? 'opacity-100' 
              : 'opacity-0 pointer-events-none'
          }`}>
            <button className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors whitespace-nowrap">
              Sites réalisés
            </button>
          </div>
        </div>
        </div>
      </nav>
      
      {/* Theme Toggle - Fixed in top right corner */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </>
  );
};

export default Navbar;