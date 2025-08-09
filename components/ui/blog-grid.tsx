'use client'

import React, { useState } from 'react'
import { useLenis } from '../LenisProvider'

// Custom scrollbar styles
const customScrollbarStyle = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
    min-height: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
  }
  .custom-scrollbar::-webkit-scrollbar-corner {
    background: transparent;
  }
  .dark .custom-scrollbar {
    scrollbar-color: #4b5563 transparent;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4b5563;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`

interface BlogPost {
  id: string
  title: string
  date: string
  category: string
  image?: string
}

interface BlogGridProps {
  posts?: BlogPost[]
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  
  // Inject custom scrollbar styles
  React.useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = customScrollbarStyle
    document.head.appendChild(styleElement)
    
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])
  
  // Default single post for demonstration
  const defaultPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Comment être #1 sur Google en 2025',
      date: '4 août 2025',
      category: 'LECTURE RAPIDE',
      image: '/blog.webp'
    }
  ]

  const displayPosts = posts || defaultPosts

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayPosts.map((post) => (
          <BlogCard key={post.id} post={post} onReadMore={() => setSelectedPost(post)} />
        ))}
      </div>
      
      {selectedPost && (
        <BlogModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </>
  )
}

interface BlogCardProps {
  post: BlogPost
  onReadMore: () => void
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore }) => {
  return (
    <div className="bg-white dark:bg-black rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 relative group w-full border border-gray-50 dark:border-gray-800 overflow-hidden">
      {/* Image Area - Edge to edge */}
      {post.image && (
        <div className="w-full aspect-[16/10] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Card Content Container */}
      <div className="p-6">
        {/* Category with Lightning Icon */}
        <div className="flex items-center gap-2 mb-4">
          <LightningIcon className="w-4 h-4 text-gray-500 dark:text-gray-500" />
          <span className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wide">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-black dark:text-white mb-4 leading-tight tracking-tight">
          {post.title}
        </h3>

        {/* Date */}
        <p className="text-base font-normal text-gray-500 dark:text-gray-500 mb-4">
          {post.date}
        </p>
      </div>

      {/* Plus Button */}
      <button 
        onClick={onReadMore}
        className="absolute bottom-6 right-6 w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 transform"
        aria-label="Lire la suite"
      >
        <PlusIcon className="w-6 h-6 text-gray-500 dark:text-gray-500" />
      </button>
    </div>
  )
}

// Lightning Icon Component
const LightningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M13 0L3 12h5l-1 12 10-12h-5L13 0z" />
  </svg>
)

// Plus Icon Component
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
)

// Modal Component
interface BlogModalProps {
  post: BlogPost
  onClose: () => void
}

const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  const lenis = useLenis()
  const modalContentRef = React.useRef<HTMLDivElement>(null)

  // Prevent background scroll and disable Lenis when modal is open
  React.useEffect(() => {
    // Disable Lenis smooth scrolling to prevent it from capturing wheel events
    if (lenis) {
      lenis.stop()
    }
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden'
    
    // Focus the modal content for accessibility and scroll capture
    if (modalContentRef.current) {
      modalContentRef.current.focus()
    }
    
    return () => {
      // Re-enable Lenis smooth scrolling
      if (lenis) {
        lenis.start()
      }
      
      // Restore background scrolling
      document.body.style.overflow = 'unset'
    }
  }, [lenis])

  // Handle wheel events specifically on the modal content
  const handleWheel = React.useCallback((e: React.WheelEvent) => {
    // Allow the wheel event to bubble normally within the modal content
    // This ensures proper scrolling within the modal
    e.stopPropagation()
  }, [])

  // Handle keyboard events for accessibility
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-50 flex items-end justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-black rounded-3xl max-w-4xl w-full flex flex-col max-h-[calc(100vh-2rem)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button - Top Left */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 z-10 w-8 h-8 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
          aria-label="Fermer la fenêtre"
        >
          <CloseIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Modal Content */}
        <div 
          ref={modalContentRef}
          className="px-8 pt-16 pb-8 overflow-y-auto flex-1 overscroll-contain focus:outline-none custom-scrollbar" 
          style={{ 
            overscrollBehavior: 'contain'
          }}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Header with category and date */}
          <div className="flex items-center gap-2 mb-8">
            <LightningIcon className="w-4 h-4 text-gray-500 dark:text-gray-500" />
            <span className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wide">
              {post.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-500">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Social sharing icons */}
          <div className="flex items-center gap-4 mb-12">
            <ShareIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            <TwitterIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            <EmailIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            <LinkIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </div>

          {/* Hero Image */}
          {post.image && (
            <div className="w-full aspect-[16/9] rounded-3xl mb-12 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-normal">
              Le référencement naturel est devenu l'élément clé pour dominer les résultats de recherche en 2025. Découvrez les stratégies avancées qui permettent d'atteindre et de maintenir la première position sur Google.
            </p>
            
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Le référencement naturel (SEO) est devenu l'un des piliers essentiels du marketing digital en 2025. 
              Avec l'évolution constante des algorithmes de Google et l'émergence de l'intelligence artificielle, 
              les stratégies pour atteindre la première position ont considérablement évolué.
            </p>
            
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6 mt-10">
              Les fondamentaux du SEO en 2025
            </h2>
            
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Google privilégie désormais l'expérience utilisateur avant tout. Les Core Web Vitals, 
              l'optimisation mobile et la vitesse de chargement sont devenus des facteurs de classement cruciaux. 
              Une approche holistique combinant contenu de qualité et performance technique est indispensable.
            </p>

            <h2 className="text-2xl font-bold text-black dark:text-white mb-6 mt-10">
              Stratégies avancées pour 2025
            </h2>
            
            <ul className="list-disc pl-6 text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 space-y-2">
              <li>Optimisation pour la recherche vocale et l'IA générative</li>
              <li>Création de contenu orienté E-A-T (Expertise, Authoritativeness, Trustworthiness)</li>
              <li>Utilisation stratégique des données structurées</li>
              <li>Optimisation pour les featured snippets et les réponses directes</li>
              <li>Focus sur l'intent de recherche plutôt que sur les mots-clés seuls</li>
            </ul>

            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              La clé du succès réside dans une approche patiente et méthodique, 
              en gardant toujours l'utilisateur au centre de votre stratégie SEO.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Close Icon Component
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

// Social sharing icons
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
  </svg>
)

const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)

export default BlogGrid
export type { BlogPost, BlogGridProps }
