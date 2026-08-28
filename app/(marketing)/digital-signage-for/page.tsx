import Link from "next/link"
import { Button } from "@/components/ui/button"
import { INDUSTRIES } from "@/lib/industries"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Digital Signage for Every Local Venue",
  description:
    "How cafes, gyms, salons, restaurants, retail stores, and medical offices use PiAds digital signage — and earn from their screens. From $10/screen/month.",
  alternates: { canonical: "/digital-signage-for" },
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

export default function IndustryIndexPage() {
  return (
    <div className="pt-24">
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Digital signage for every local venue
          </h1>
          <p className="text-xl text-muted-foreground">
            The screens are different, but the story is the same: your content
            first, updated in seconds, on hardware you already own — and earning
            from local advertisers when you allow it.
          </p>
        </div>
      </section>

      <section className="container pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/digital-signage-for/${ind.slug}`}
              className="bg-white rounded-3xl border p-8 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h2 className="text-xl font-bold font-display mb-2 group-hover:text-accent transition-colors">
                {ind.name}
              </h2>
              <p className="text-muted-foreground text-sm mb-4">{ind.teaser}</p>
              <span className="text-sm font-medium text-accent">
                Read more <ArrowRight className="inline h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 bg-foreground text-background rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Don&apos;t see your venue? It still works.
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
            If there&apos;s a TV and people who look at it, PiAds fits — $10 per
            screen per month, on hardware you already own.
          </p>
          <Button size="lg" variant="secondary" className="rounded-xl h-13 px-7" asChild>
            <Link href={`${APP_URL}/sign-up?role=venue`}>
              Try PiAds Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
