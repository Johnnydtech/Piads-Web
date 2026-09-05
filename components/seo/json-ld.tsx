import { SITE_URL } from "@/lib/site"

/** Renders a JSON-LD block. Pass a single schema object or an array. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; escape "<" so a "</script>" in
      // content can never terminate the block.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "PiAds",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/apple-touch-icon.png`,
  sameAs: ["https://apps.apple.com/us/app/piads/id6759892788", "https://play.google.com/store/apps/details?id=co.piads.kiosk"],
}

export const SOFTWARE_APPLICATION = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "PiAds",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Fire TV, Android TV, Raspberry Pi, iOS",
  description:
    "Digital signage for local venues with a built-in local advertising marketplace. Free for partner screens that enable approved ad slots; venues keep 70% of cleared ad revenue.",
  offers: [
    { "@type": "Offer", name: "Partner plan", price: "0", priceCurrency: "USD", description: "Free for screens that enable approved ad slots. Venue keeps 70% of cleared ad revenue." },
    { "@type": "Offer", name: "Ad-free screen", price: "10", priceCurrency: "USD", description: "$10 per screen per month, or $100 per screen per year, for screens without ad slots." },
  ],
  publisher: { "@id": `${SITE_URL}/#organization` },
}

export function faqPage(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  }
}

export function blogPosting(p: { slug: string; title: string; description: string; publishedAt: string; author: string; image?: string }) {
  return {
    "@type": "BlogPosting",
    mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
    headline: p.title,
    description: p.description,
    datePublished: p.publishedAt,
    dateModified: p.publishedAt,
    image: p.image ? `${SITE_URL}${p.image}` : `${SITE_URL}/og.png`,
    author: { "@type": "Organization", name: p.author || "PiAds Team", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

/** Wrap schemas in one @graph so a page emits a single block. */
export function graph(...items: object[]) {
  return { "@context": "https://schema.org", "@graph": items }
}
