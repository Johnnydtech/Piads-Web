import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/mdx'

// Public JSON feed of recent blog posts — consumed by the API's weekly
// client digest (and available for anything else that wants it).
export async function GET() {
  const posts = getAllPosts()
    .slice(0, 10)
    .map((p: any) => ({
      title: p.title,
      description: p.description,
      slug: p.slug,
      url: `https://piads.co/blog/${p.slug}`,
      publishedAt: p.publishedAt,
    }))
  return NextResponse.json(
    { posts },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
  )
}
