import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { format } from "date-fns"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.image ? [post.image] : ["/og/default.png"],
    },
  }
}

// Custom MDX components with Juuno styling
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-3xl md:text-4xl font-bold font-display mb-6 mt-10" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl md:text-3xl font-semibold font-display mb-4 mt-10" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl md:text-2xl font-semibold font-display mb-3 mt-8" {...props} />
  ),
  p: (props: any) => <p className="mb-4 leading-relaxed text-lg" {...props} />,
  a: (props: any) => (
    <a className="text-blue hover:underline" {...props} />
  ),
  ul: (props: any) => <ul className="mb-4 pl-6 list-disc" {...props} />,
  ol: (props: any) => <ol className="mb-4 pl-6 list-decimal" {...props} />,
  li: (props: any) => <li className="mb-2 text-lg" {...props} />,
  pre: (props: any) => (
    <pre className="bg-secondary rounded-2xl p-6 overflow-x-auto mb-6" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-secondary px-2 py-1 rounded-lg text-sm font-mono" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue pl-6 italic my-6 text-lg" {...props} />
  ),
  img: (props: any) => (
    <img className="rounded-2xl my-8 w-full" {...props} />
  ),
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="py-12 md:py-20">
      <article className="container max-w-3xl">
        {/* Back Link */}
        <Button variant="ghost" size="sm" asChild className="mb-8 rounded-xl">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-sm px-4 py-1.5 rounded-full bg-blue/10 text-blue"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">{post.description}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground bg-secondary/50 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center">
                <User className="h-4 w-4 text-blue" />
              </div>
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-teal" />
              </div>
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center">
                <Clock className="h-4 w-4 text-foreground/60" />
              </div>
              {post.readingTime}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: "wrap" }],
                ],
              },
            }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex items-center justify-between">
            <Button variant="outline" className="rounded-xl" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                More Posts
              </Link>
            </Button>
          </div>
        </footer>
      </article>
    </div>
  )
}
