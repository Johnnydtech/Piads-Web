"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Search, X } from "lucide-react"
import { format } from "date-fns"

interface PostMeta {
  slug: string
  title: string
  description: string
  publishedAt: string
  author: string
  image?: string
  tags?: string[]
  readingTime: string
}

const CARD_COLORS = [
  { bg: "bg-blue", text: "text-white", muted: "text-white/70", tag: "bg-white/20 text-white", link: "text-white" },
  { bg: "bg-teal", text: "text-white", muted: "text-white/70", tag: "bg-white/20 text-white", link: "text-white" },
  { bg: "bg-coral", text: "text-foreground", muted: "text-foreground/60", tag: "bg-foreground/10 text-foreground", link: "text-blue" },
  { bg: "bg-orange", text: "text-foreground", muted: "text-foreground/60", tag: "bg-foreground/10 text-foreground", link: "text-blue" },
  { bg: "bg-cyan", text: "text-foreground", muted: "text-foreground/60", tag: "bg-foreground/10 text-foreground", link: "text-blue" },
]

export function BlogGrid({ posts }: { posts: PostMeta[] }) {
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((post) => post.tags?.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(q))

      const matchesTag = !activeTag || post.tags?.includes(activeTag)

      return matchesSearch && matchesTag
    })
  }, [posts, search, activeTag])

  return (
    <div>
      {/* Search + Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border border-border text-base focus:outline-none focus:ring-2 focus:ring-blue/50 focus:border-blue transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-sm px-4 py-1.5 rounded-full transition-all ${
              !activeTag
                ? "bg-blue text-white"
                : "bg-white border border-border text-muted-foreground hover:border-blue hover:text-blue"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-sm px-4 py-1.5 rounded-full transition-all capitalize ${
                activeTag === tag
                  ? "bg-blue text-white"
                  : "bg-white border border-border text-muted-foreground hover:border-blue hover:text-blue"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(search || activeTag) && (
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"} found
          {search && <> for &ldquo;{search}&rdquo;</>}
          {activeTag && <> in <span className="capitalize font-medium">{activeTag}</span></>}
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white rounded-3xl p-12">
            <p className="text-muted-foreground text-lg">
              No articles match your search. Try a different term.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, index) => {
            const color = CARD_COLORS[index % CARD_COLORS.length]

            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article
                  className={`${color.bg} rounded-2xl p-6 h-full flex flex-col group cursor-pointer transition-all hover:scale-[1.03] hover:shadow-lg`}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full ${color.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {(post.tags?.length ?? 0) > 2 && (
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full ${color.tag}`}>
                        +{(post.tags?.length ?? 0) - 2}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className={`text-lg font-bold font-display mb-2 leading-snug ${color.text} line-clamp-3`}>
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className={`text-sm mb-4 leading-relaxed ${color.muted} line-clamp-3 flex-1`}>
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className={`flex items-center justify-between text-xs ${color.muted} mt-auto pt-3 border-t ${
                    color.bg === "bg-blue" || color.bg === "bg-teal"
                      ? "border-white/20"
                      : "border-foreground/10"
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(post.publishedAt), "MMM d")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <ArrowRight className={`h-4 w-4 ${color.link} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
