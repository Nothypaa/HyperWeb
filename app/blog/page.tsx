import BlogGrid from '@/components/ui/blog-grid'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto mb-8">
          <Breadcrumb currentPage="Blog" />
        </div>
        
        <div className="flex justify-center mb-32">
          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-black dark:text-white">
            BLOG
          </h1>
        </div>
        
        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto">
          <BlogGrid />
        </div>
      </div>
    </main>
  )
}