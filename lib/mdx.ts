import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const POSTS_PATH = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug: string
  title: string
  description: string
  publishedAt: string
  author: string
  image?: string
  tags?: string[]
  readingTime: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  // Ensure the directory exists
  if (!fs.existsSync(POSTS_PATH)) {
    return []
  }

  const files = fs.readdirSync(POSTS_PATH)

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(POSTS_PATH, file)
      const source = fs.readFileSync(filePath, "utf-8")
      const { data, content } = matter(source)
      const slug = file.replace(".mdx", "")

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        publishedAt: data.publishedAt || new Date().toISOString(),
        author: data.author || "PiAds Team",
        image: data.image,
        tags: data.tags || [],
        readingTime: readingTime(content).text,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(source)

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    publishedAt: data.publishedAt || new Date().toISOString(),
    author: data.author || "PiAds Team",
    image: data.image,
    tags: data.tags || [],
    readingTime: readingTime(content).text,
    content,
  }
}
