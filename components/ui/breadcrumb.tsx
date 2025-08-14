'use client'

import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

interface BreadcrumbProps {
  currentPage: string
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm relative z-50 ${className}`} aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 cursor-pointer relative z-50 p-1 -m-1"
      >
        <HomeIcon className="w-4 h-4 mr-1" />
        Accueil
      </Link>
      
      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
      
      <span className="text-gray-900 dark:text-white font-medium">
        {currentPage}
      </span>
    </nav>
  )
}
