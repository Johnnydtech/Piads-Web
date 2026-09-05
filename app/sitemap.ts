import { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/mdx"
import { INDUSTRIES } from "@/lib/industries"
import { COMPETITORS } from "@/lib/competitors"
import { SITE_URL } from "@/lib/site"

// Bump when a static page materially changes. A fresh Date() on every build
// told Google everything changed daily, which it learns to ignore.
const STATIC_UPDATED = new Date("2026-09-04")

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const posts = getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: STATIC_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-digital-signage`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/digital-signage-ad-revenue`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/devices`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/players/fire-tv`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/digital-signage-for`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/alternative-to`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...COMPETITORS.map((c) => ({
      url: `${baseUrl}/alternative-to/${c.slug}`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...INDUSTRIES.map((i) => ({
      url: `${baseUrl}/digital-signage-for/${i.slug}`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/privacy`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: STATIC_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPosts]
}
