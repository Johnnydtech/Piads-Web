import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { COMPETITORS, competitorBySlug } from "@/lib/competitors"
import {
  ArrowRight,
  Check,
  X,
  Scale,
  Sparkles,
  ListChecks,
  ThumbsUp,
} from "lucide-react"

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ competitor: c.slug }))
}

export function generateMetadata({ params }: { params: { competitor: string } }) {
  const c = competitorBySlug(params.competitor)
  if (!c) return {}
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/alternative-to/${c.slug}` },
  }
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const migration = [
  { n: "1", text: "Sign up free — no card. The guided setup creates your venue in a minute." },
  { n: "2", text: "Pair ONE screen (or just the built-in web player — no hardware needed to test)." },
  { n: "3", text: "Re-upload your media and let onboarding build your first playlist and schedule." },
  { n: "4", text: "Run both platforms side by side for a week." },
  { n: "5", text: "Move your remaining screens — pairing each takes about a minute." },
  { n: "6", text: "Cancel the old subscription. Optionally open ad slots and start earning." },
]

export default function CompetitorPage({ params }: { params: { competitor: string } }) {
  const c = competitorBySlug(params.competitor)
  if (!c) notFound()

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Scale className="h-4 w-4" />
            {c.name} vs PiAds
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            A {c.name} alternative {c.heroAdjectives}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">{c.heroSub}</p>
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

      {/* Honest framing */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container max-w-3xl space-y-6">
          <p className="text-lg text-muted-foreground">{c.attack}</p>
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <ThumbsUp className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{c.concede}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="container py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-8">
          {c.name} vs PiAds at a glance
        </h2>
        <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm max-w-4xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="text-left font-semibold p-4"></th>
                <th className="text-left font-semibold p-4">{c.name}</th>
                <th className="text-left font-semibold p-4 text-accent">PiAds</th>
              </tr>
            </thead>
            <tbody>
              {c.compareRows.map((r) => (
                <tr key={r.label} className="border-b last:border-0">
                  <td className="p-4 font-medium">{r.label}</td>
                  <td className="p-4 text-muted-foreground">{r.them}</td>
                  <td className="p-4">{r.piads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cost at scale */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-8">
            What it costs as you grow
          </h2>
          <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="text-left font-semibold p-4">Screens</th>
                  <th className="text-left font-semibold p-4">{c.name} / month</th>
                  <th className="text-left font-semibold p-4 text-accent">PiAds / month</th>
                </tr>
              </thead>
              <tbody>
                {c.costRows.map((r) => (
                  <tr key={r.screens} className="border-b last:border-0">
                    <td className="p-4 font-medium">{r.screens}</td>
                    <td className="p-4 text-muted-foreground">{r.them}</td>
                    <td className="p-4">{r.piads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4 max-w-2xl">
            {c.costNote} Pricing as of {c.pricingAsOf}.
          </p>
        </div>
      </section>

      {/* Honesty blocks */}
      <section className="container py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-white rounded-2xl border p-7 shadow-sm">
            <h3 className="font-bold font-display mb-4 flex items-center gap-2">
              <X className="h-5 w-5 text-destructive" />
              Where {c.name} falls short
            </h3>
            <ul className="space-y-3">
              {c.theirWeaknesses.map((w) => (
                <li key={w} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border p-7 shadow-sm">
            <h3 className="font-bold font-display mb-4 flex items-center gap-2">
              <Check className="h-5 w-5 text-accent" />
              Where {c.name} beats PiAds — honestly
            </h3>
            <ul className="space-y-3">
              {c.ourWeaknesses.map((w) => (
                <li key={w} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Earning wedge */}
      <section className="container pb-16 md:pb-20">
        <div className="bg-accent text-white rounded-3xl p-10 md:p-14 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              The comparison {c.name} can&apos;t enter
            </h2>
          </div>
          <p className="text-white/85 text-lg">
            Every signage platform — {c.name} included — treats your screens as a
            cost. PiAds is the only one with a built-in local advertising
            marketplace: nearby businesses book slots on your screens, you
            approve every ad, and you keep 75% of the revenue. For a venue with
            real foot traffic, that regularly turns the software fee negative.
          </p>
        </div>
      </section>

      {/* Migration plan */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3 flex items-center gap-3">
            <ListChecks className="h-8 w-8 text-accent" />
            The 30-minute switch
          </h2>
          <p className="text-muted-foreground mb-8">
            Most single-venue migrations from {c.name} finish inside an hour —
            here&apos;s the low-risk order.
          </p>
          <div className="space-y-4">
            {migration.map((s) => (
              <div key={s.n} className="flex gap-4 bg-white rounded-2xl border p-5 shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold">
                  {s.n}
                </div>
                <p className="text-sm text-muted-foreground pt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-10">
            Switching from {c.name}, answered
          </h2>
          <div className="space-y-5">
            {c.faqs.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl border p-6 shadow-sm">
                <h3 className="font-semibold font-display mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-16 md:pb-24">
        <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Try the alternative that pays you back
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
            Free trial, no card. Pair one screen — or just the web player — and
            run it next to {c.name} for a week.
          </p>
          <Button size="lg" variant="secondary" className="rounded-xl h-13 px-7" asChild>
            <Link href={`${APP_URL}/sign-up?role=venue`}>
              Start Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
