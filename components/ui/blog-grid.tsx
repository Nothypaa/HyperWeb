'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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

// Content type definitions
interface ParagraphItem {
  type: 'paragraph'
  text: string
}

interface HeadingItem {
  type: 'heading'
  text: string
}

interface ListItem {
  type: 'list'
  items: string[]
}

interface TableItem {
  type: 'table'
  headers: string[]
  rows: string[][]
}

interface CalloutItem {
  type: 'callout'
  text: string
}

type ContentItem = ParagraphItem | HeadingItem | ListItem | TableItem | CalloutItem

interface BlogContent {
  introduction: string
  content: ContentItem[]
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
  
  // Default posts for demonstration
  const defaultPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Comment être #1 sur Google en 2025',
      date: '20 septembre 2025',
      category: 'LECTURE RAPIDE',
      image: '/seo-google-2025-strategies-referencement-naturel-france.webp'
    },
    {
      id: '2',
      title: 'Combien coûte un site internet en France en 2025 ? (Guide agence web)',
      date: '16 septembre 2025',
      category: 'GUIDE TARIFS',
      image: '/prix-cout-site-internet-france-2025-tarifs-agence-web.webp'
    }
  ]

  // SEO-optimized alt text for blog images
  const getOptimizedAltText = (post: BlogPost): string => {
    switch (post.id) {
      case '1':
        return 'Stratégies SEO Google 2025 - agence web France création site internet optimisé référencement'
      case '2':
        return 'Prix création site internet France 2025 - développement web professionnel tarifs agence web'
      default:
        return post.title
    }
  }

  const displayPosts = posts || defaultPosts

  // Generate BlogPosting schema for SEO
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Blog HyperWeb - Articles Développement Web",
    "description": "Articles de blog sur la création de sites internet, le SEO et le développement web par HyperWeb agence web France",
    "itemListElement": displayPosts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "headline": post.title,
        "author": {
          "@type": "Organization",
          "name": "HyperWeb",
          "url": "https://agencehyperweb.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "HyperWeb",
          "logo": {
            "@type": "ImageObject",
            "url": "https://agencehyperweb.com/HyperWeb-logo/Hyperweb-nobg.svg"
          }
        },
        "image": {
          "@type": "ImageObject",
          "url": `https://agencehyperweb.com${post.image}`,
          "caption": getOptimizedAltText(post)
        },
        "datePublished": "2025-09-20",
        "dateModified": "2025-09-20",
        "description": post.id === '1' 
          ? "Stratégies avancées pour atteindre et maintenir la première position sur Google en 2025"
          : "Guide complet des tarifs pour la création d'un site internet professionnel en France en 2025",
        "keywords": post.id === '1'
          ? "SEO, référencement Google, agence web France, optimisation site internet"
          : "prix site internet, tarif création site web, agence web France, coût développement web",
        "articleSection": post.category,
        "wordCount": post.id === '1' ? 800 : 1200
      }
    }))
  }

  return (
    <>
      {/* Blog Schema Markup for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayPosts.map((post) => (
          <BlogCard key={post.id} post={post} onReadMore={() => setSelectedPost(post)} getOptimizedAltText={getOptimizedAltText} />
        ))}
      </div>
      
      {selectedPost && (
        <BlogModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)}
          getOptimizedAltText={getOptimizedAltText}
        />
      )}
    </>
  )
}

interface BlogCardProps {
  post: BlogPost
  onReadMore: () => void
  getOptimizedAltText: (post: BlogPost) => string
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore, getOptimizedAltText }) => {
  return (
    <div className="bg-white dark:bg-black rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 relative group w-full border border-gray-50 dark:border-gray-800 overflow-hidden">
      {/* Image Area - Edge to edge */}
      {post.image && (
        <div className="w-full aspect-[16/10] overflow-hidden">
          <Image 
            src={post.image} 
            alt={getOptimizedAltText(post)}
            width={800}
            height={500}
            className="w-full h-full object-cover"
            quality={90}
            priority={false}
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

      {/* Plus Button - Link for posts 1 and 2, modal for others */}
      {post.id === '1' || post.id === '2' ? (
        <Link
          href={post.id === '1' ? "/blog/comment-etre-premier-sur-google-2025" : "/blog/combien-coute-site-internet-france-2025"}
          className="absolute bottom-6 right-6 w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 transform"
          aria-label="Lire l'article complet"
        >
          <PlusIcon className="w-6 h-6 text-gray-500 dark:text-gray-500" />
        </Link>
      ) : (
        <button
          onClick={onReadMore}
          className="absolute bottom-6 right-6 w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 transform"
          aria-label="Lire la suite"
        >
          <PlusIcon className="w-6 h-6 text-gray-500 dark:text-gray-500" />
        </button>
      )}
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
  getOptimizedAltText: (post: BlogPost) => string
}

const BlogModal: React.FC<BlogModalProps> = ({ post, onClose, getOptimizedAltText }) => {
  const lenis = useLenis()
  const modalContentRef = React.useRef<HTMLDivElement>(null)

  // Get blog content based on post ID
  const getBlogContent = (postId: string): BlogContent => {
    switch (postId) {
      case '1':
        return {
          introduction: "Le référencement naturel est devenu l'élément clé pour dominer les résultats de recherche en 2025. Découvrez les stratégies avancées qui permettent d'atteindre et de maintenir la première position sur Google.",
          content: [
            {
              type: 'paragraph',
              text: "Le référencement naturel (SEO) est devenu l'un des piliers essentiels du marketing digital en 2025. Avec l'évolution constante des algorithmes de Google et l'émergence de l'intelligence artificielle, les stratégies pour atteindre la première position ont considérablement évolué."
            },
            {
              type: 'heading',
              text: "Les fondamentaux du SEO en 2025"
            },
            {
              type: 'paragraph',
              text: "Google privilégie désormais l'expérience utilisateur avant tout. Les Core Web Vitals, l'optimisation mobile et la vitesse de chargement sont devenus des facteurs de classement cruciaux. Une approche holistique combinant contenu de qualité et performance technique est indispensable."
            },
            {
              type: 'heading',
              text: "Stratégies avancées pour 2025"
            },
            {
              type: 'list',
              items: [
                "Optimisation pour la recherche vocale et l'IA générative",
                "Création de contenu orienté E-A-T (Expertise, Authoritativeness, Trustworthiness)",
                "Utilisation stratégique des données structurées",
                "Optimisation pour les featured snippets et les réponses directes",
                "Focus sur l'intent de recherche plutôt que sur les mots-clés seuls"
              ]
            },
            {
              type: 'paragraph',
              text: "La clé du succès réside dans une approche patiente et méthodique, en gardant toujours l'utilisateur au centre de votre stratégie SEO."
            }
          ]
        }
      case '2':
        return {
          introduction: "En 2025, investir dans un site internet performant est un choix stratégique pour toute entreprise en France. Mais le prix d'un site internet en France dépend de nombreux facteurs : objectifs, design, fonctionnalités et ambition digitale. Chez HyperWeb, nous concevons des sites sur-mesure pensés pour convertir vos visiteurs en clients et dominer les résultats Google.",
          content: [
            {
              type: 'heading',
              text: "1. Fourchette de prix d'un site internet en France en 2025"
            },
            {
              type: 'table',
              headers: ["Type de site professionnel", "Prix moyen en France (2025)", "Délai moyen"],
              rows: [
                ["Site vitrine (image de marque & visibilité)", "1 000 € – 3 000 €", "2 à 4 semaines"],
                ["Site corporate premium (image haut de gamme)", "3 000 € – 7 000 €", "4 à 8 semaines"],
                ["Site e-commerce (vente en ligne optimisée)", "4 000 € – 12 000 €", "6 à 10 semaines"],
                ["Projet sur-mesure (plateforme, web app)", "10 000 € – 25 000 €+", "Sur devis"]
              ]
            },
            {
              type: 'callout',
              text: "💡 Chez HyperWeb, nous intégrons toujours une optimisation SEO native et des performances maximales dès la conception."
            },
            {
              type: 'heading',
              text: "2. Facteurs qui influencent le prix d'un site internet"
            },
            {
              type: 'list',
              items: [
                "Design sur-mesure – Chaque interface est pensée pour votre image de marque.",
                "Fonctionnalités avancées – Réservation en ligne, paiement sécurisé, espace client, etc.",
                "Optimisation SEO avancée – Pour atteindre la première page de Google.",
                "Performances techniques – Rapidité, sécurité, et compatibilité multi-supports.",
                "Accompagnement stratégique – Analyse de marché, conseil en conversion, suivi post-lancement."
              ]
            },
            {
              type: 'heading',
              text: "3. Pourquoi investir dans un site haut de gamme ?"
            },
            {
              type: 'list',
              items: [
                "Attirer et convaincre : un design unique capte l'attention.",
                "Dominer Google : chaque page est optimisée pour vos mots-clés stratégiques.",
                "Maximiser la conversion : chaque élément est pensé pour générer des clients.",
                "Investissement durable : un site pensé pour évoluer avec votre activité."
              ]
            },
            {
              type: 'heading',
              text: "4. Conclusion"
            },
            {
              type: 'paragraph',
              text: "Le prix d'un site internet en France en 2025 varie généralement entre 1 000 € et 25 000 €, selon la complexité et les objectifs. Un site créé par une agence web experte comme HyperWeb n'est pas une dépense, mais un investissement rentable qui travaille pour vous 24h/24."
            }
          ]
        }
      default:
        return {
          introduction: "Contenu par défaut",
          content: []
        }
    }
  }

  const blogContent = getBlogContent(post.id)

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
              <Image 
                src={post.image} 
                alt={getOptimizedAltText(post)}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                quality={90}
                priority={true}
              />
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-normal">
              {blogContent.introduction}
            </p>
            
            {blogContent.content.map((item, index) => {
              switch (item.type) {
                case 'paragraph':
                  return (
                    <p key={index} className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {(item as ParagraphItem).text}
                    </p>
                  )
                case 'heading':
                  return (
                    <h2 key={index} className="text-2xl font-bold text-black dark:text-white mb-6 mt-10">
                      {(item as HeadingItem).text}
                    </h2>
                  )
                case 'list':
                  return (
                    <ul key={index} className="list-disc pl-6 text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 space-y-2">
                      {(item as ListItem).items.map((listItem, listIndex) => (
                        <li key={listIndex}>{listItem}</li>
                      ))}
                    </ul>
                  )
                case 'table':
                  return (
                    <div key={index} className="overflow-x-auto mb-8">
                      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            {(item as TableItem).headers.map((header, headerIndex) => (
                              <th key={headerIndex} className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(item as TableItem).rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="even:bg-gray-50 dark:even:bg-gray-800">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                case 'callout':
                  return (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
                      <p className="text-blue-800 dark:text-blue-200 font-medium whitespace-pre-line">
                        {(item as CalloutItem).text}
                      </p>
                    </div>
                  )
                default:
                  return null
              }
            })}
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
