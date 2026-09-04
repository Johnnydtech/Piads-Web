import Link from "next/link"
import { Button } from "@/components/ui/button"
import { COMPETITORS } from "@/lib/competitors"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Digital Signage Alternatives Compared",
  description:
    "Honest comparisons of PiAds against Yodeck, OptiSigns, ScreenCloud, Raydiant, and Juuno — pricing at scale, feature tables, and 30-minute migration plans.",
  alternates: { canonical: "/alternative-to" },
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

export default function AlternativesIndexPage() {
  return (
    <div className="pt-24">
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Comparing digital signage platforms, honestly
          </h1>
          <p className="text-xl text-muted-foreground">
            Every comparison below names where the other platform wins — and the
            one place none of them can follow: PiAds screens earn local ad
            revenue, with 70% going to the venue.
          </p>
        </div>
      </section>

      <section className="container pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {COMPETITORS.map((c) => (
            <Link
              key={c.slug}
              href={`/alternative-to/${c.slug}`}
              className="bg-white rounded-3xl border p-8 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h2 className="text-xl font-bold font-display mb-2 group-hover:text-accent transition-colors">
                PiAds vs {c.name}
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                A {c.name} alternative {c.heroAdjectives}.
              </p>
              <span className="text-sm font-medium text-accent">
                Compare <ArrowRight className="inline h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 bg-foreground text-background rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            The shortest comparison: try both
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
            The PiAds trial is free with no card — pair the web player and see
            your content live in minutes, next to whatever you use today.
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
