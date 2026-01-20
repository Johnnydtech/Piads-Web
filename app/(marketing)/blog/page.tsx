import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react"
import { format } from "date-fns"

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
        <div className="container max-w-4xl">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-3xl p-12">
                <p className="text-muted-foreground">
                  No posts yet. Check back soon!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => {
                const colors = ["bg-blue", "bg-teal", "bg-coral", "bg-orange", "bg-cyan"]
                const bgColor = colors[index % colors.length]
                const isWhiteText = bgColor === "bg-blue" || bgColor === "bg-teal"

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <article
                      className={`${bgColor} rounded-3xl p-8 md:p-10 group cursor-pointer transition-transform hover:scale-[1.02] ${
                        isWhiteText ? "text-white" : "text-foreground"
                      }`}
                    >
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-3 py-1 rounded-full ${
                              isWhiteText
                                ? "bg-white/20 text-white"
                                : "bg-foreground/10 text-foreground"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
                        {post.title}
                      </h2>
                      <p className={`mb-6 text-lg ${isWhiteText ? "text-white/80" : "text-muted-foreground"}`}>
                        {post.description}
                      </p>
                      <div className={`flex items-center gap-4 text-sm ${isWhiteText ? "text-white/70" : "text-muted-foreground"}`}>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(post.publishedAt), "MMM d, yyyy")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readingTime}
                        </div>
                        <div className={`flex items-center gap-1 ml-auto ${isWhiteText ? "text-white" : "text-blue"}`}>
                          Read more
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
