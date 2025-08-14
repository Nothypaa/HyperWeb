import React from 'react';
import Link from 'next/link';

function SimpleFooter() {
  return (
    <footer className="py-8 px-4 md:px-6 bg-background border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-4">
          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Accueil
            </Link>
            <Link 
              href="/faq" 
              className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link 
              href="/blog" 
              className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="https://share.google/N6Yc8AanPtFa7BZhG" 
              className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Avis Google
            </Link>
          </nav>
          
          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 HyperWeb. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { SimpleFooter };