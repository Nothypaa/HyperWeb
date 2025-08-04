import BlogGrid from '@/components/ui/blog-grid'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-end mb-12">
          <h1 className="text-8xl lg:text-[10rem] xl:text-[12rem] font-black tracking-tighter text-black dark:text-white">
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