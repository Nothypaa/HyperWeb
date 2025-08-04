import React from 'react'

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
  // Default single post for demonstration
  const defaultPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Building Modern Web Applications with Next.js',
      date: 'August 4, 2025',
      category: 'QUICK READ',
      image: '/blog.webp'
    }
  ]

  const displayPosts = posts || defaultPosts

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {displayPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 relative group w-full border border-gray-50 dark:border-gray-800">
      {/* Card Content Container */}
      <div className="p-6">
        {/* Image Area - Hidden when no image */}
        {post.image && (
          <div className="w-full aspect-[16/10] rounded-2xl mb-6 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Category with Lightning Icon */}
        <div className="flex items-center gap-2 mb-4">
          <LightningIcon className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 leading-snug">
          {post.title}
        </h3>

        {/* Date */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {post.date}
        </p>
      </div>

      {/* Plus Button */}
      <button 
        className="absolute bottom-6 right-6 w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 transform"
        aria-label="Read more"
      >
        <PlusIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
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
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export default BlogGrid
export type { BlogPost, BlogGridProps }