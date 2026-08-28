import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { INDUSTRIES, industryBySlug } from "@/lib/industries"
import {
  ArrowRight,
  Check,
  Sparkles,
  Clock,
  Wrench,
  Palette,
  Wallet,
  Tv,
} from "lucide-react"

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }))
}

export function generateMetadata({ params }: { params: { industry: string } }) {
  const ind = industryBySlug(params.industry)
  if (!ind) return {}
  return {
    title: ind.metaTitle,
    description: ind.metaDescription,
    alternates: { canonical: `/digital-signage-for/${ind.slug}` },
  }
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const reassurance = [
  { icon: Clock, text: "Set up in minutes, not weeks" },
  { icon: Wrench, text: "Works with TVs you already own" },
  { icon: Palette, text: "No design skills needed" },
  { icon: Wallet, text: "$10/screen — and it can earn that back" },
]

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const ind = industryBySlug(params.industry)
  if (!ind) notFound()

  // FAQ rich-result schema. Static, first-party data only (lib/industries.ts),
  // serialized with JSON.stringify — no user or remote input reaches this.
  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ind.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  })

  return (
    <div className="pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero */}
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Tv className="h-4 w-4" />
            Digital signage for {ind.shortName}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            {ind.h1}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">{ind.subhead}</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-xl h-13 px-7" asChild>
              <Link href={`${APP_URL}/sign-up?role=venue`}>
                Try PiAds Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl h-13 px-7" asChild>
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Use-case blocks */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container space-y-16 md:space-y-24">
          {ind.useCases.map((uc, i) => (
            <div
              key={uc.name}
              className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">{uc.name}</h2>
                <p className="text-muted-foreground text-lg">{uc.body}</p>
              </div>
              <div className="rounded-3xl overflow-hidden border shadow-sm bg-white">
                <Image
                  src={uc.screenshot}
                  alt={`${uc.name} — PiAds dashboard`}
                  width={1440}
                  height={900}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Earning angle */}
      <section className="container py-16 md:py-20">
        <div className="bg-accent text-white rounded-3xl p-10 md:p-14 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              The only signage that pays you back
            </h2>
          </div>
          <p className="text-white/85 text-lg">{ind.earnAngle}</p>
        </div>
      </section>

      {/* Reassurance band */}
      <section className="container pb-16 md:pb-20">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-8 text-center">
          Built for {ind.persona}, not IT teams
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {reassurance.map((r) => (
            <div key={r.text} className="bg-white rounded-2xl border p-5 flex items-start gap-3 shadow-sm">
              <r.icon className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm font-medium">{r.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-10">
            Digital signage for {ind.shortName}, answered
          </h2>
          <div className="space-y-5">
            {ind.faqs.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold font-display mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related reading */}
      <section className="container py-16">
        <h2 className="text-2xl font-bold font-display mb-6">Keep reading</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {ind.relatedPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <span className="font-semibold font-display group-hover:text-accent transition-colors">
                {p.title}
              </span>
              <span className="block text-sm text-muted-foreground mt-2">
                Read article <ArrowRight className="inline h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-16 md:pb-24">
        <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Screens up in minutes. Use the TV you already own.
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
            $10 per screen per month — with local ad revenue, it can pay for itself.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-xl h-13 px-7" asChild>
              <Link href={`${APP_URL}/sign-up?role=venue`}>
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl h-13 px-7 border-background/30 text-background hover:bg-background/10"
              asChild
            >
              <Link href="/players/fire-tv">
                <Check className="mr-2 h-5 w-5" />
                Runs on Fire TV
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
