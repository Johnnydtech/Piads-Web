import { getAllPosts } from "@/lib/mdx"
import { Sparkles } from "lucide-react"
import { BlogGrid } from "@/components/blog-grid"

export const metadata = {
  title: "Blog",
  description: "Tips, tutorials, and insights about digital signage advertising from the PiAds team.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-blue" />
            <span className="text-sm font-medium">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            Insights &
            <span className="text-blue"> Resources</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, tutorials, and insights about digital signage advertising
            for venue owners and advertisers.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="container max-w-6xl">
          <BlogGrid posts={posts} />
        </div>
      </section>
    </div>
  )
}
