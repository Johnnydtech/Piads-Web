// Canonical origin for absolute URLs (metadataBase, sitemap, robots, JSON-LD,
// llms.txt). www is canonical: the apex 308s to it on Vercel.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.piads.co"
