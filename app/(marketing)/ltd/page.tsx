import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

// Private lifetime-deal offer page for LTD-group giveaways and private LTDs.
// Deliberately unlisted: noindex + not linked from site nav. Checkout links
// come from env (Stripe payment links); until set, buttons fall back to email.

export const metadata: Metadata = {
  title: "PiAds Lifetime Deal",
  description: "Lifetime access to the PiAds digital signage CMS. Limited private offer.",
  robots: { index: false, follow: false },
}

const CHECKOUT = {
  tier1: process.env.NEXT_PUBLIC_LTD_TIER1_URL || "mailto:support@piads.co?subject=PiAds%20LTD%20Tier%201",
  tier2: process.env.NEXT_PUBLIC_LTD_TIER2_URL || "mailto:support@piads.co?subject=PiAds%20LTD%20Tier%202",
  tier3: process.env.NEXT_PUBLIC_LTD_TIER3_URL || "mailto:support@piads.co?subject=PiAds%20LTD%20Tier%203",
}

const tiers = [
  {
    name: "Tier 1",
    price: 59,
    screens: 2,
    storage: "5 GB",
    href: CHECKOUT.tier1,
    popular: false,
  },
  {
    name: "Tier 2",
    price: 149,
    screens: 5,
    storage: "15 GB",
    href: CHECKOUT.tier2,
    popular: true,
  },
  {
    name: "Tier 3",
    price: 299,
    screens: 12,
    storage: "40 GB",
    href: CHECKOUT.tier3,
    popular: false,
  },
]

const included = [
  "Full signage CMS — screens, playlists, schedules, media library",
  "Web, Fire TV, Android & Raspberry Pi players",
  "Images, video, YouTube, websites & social embeds",
  "In-app walkthroughs and email support",
  "All future CMS updates",
]

const faqs = [
  {
    q: "What does \"lifetime\" mean?",
    a: "Pay once, use the PiAds signage CMS for the life of the product on the screens included in your tier, without needing to enable marketplace ad slots.",
  },
  {
    q: "What are the limits?",
    a: "Each tier includes a fixed number of paired screens and media storage. You can stack tiers to raise your caps, or use the free Partner plan for additional screens that enable approved ad slots.",
  },
  {
    q: "Is the ad marketplace included?",
    a: "The venue side of the marketplace is included: where PiAds advertising is live in your area, you can open ad slots and you keep 70% of every booking — same split as every venue. Ad revenue availability depends on advertiser demand in your region and is not guaranteed.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes — 60 days, no questions asked.",
  },
  {
    q: "Can I resell or transfer the deal?",
    a: "Licenses are for your own venues and are non-transferable. One purchase covers one business.",
  },
]

export default function LtdPage() {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-blue/10 text-blue text-sm font-bold px-4 py-2 rounded-full mb-6">
            Private offer — limited seats
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-display mb-5">
            PiAds Lifetime Deal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pay once, run ad-free digital signage on the TVs you already own — forever.
            No marketplace ad-slot requirement.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-2xl border p-8 flex flex-col shadow-sm ${
                tier.popular ? "border-blue ring-1 ring-blue" : "border-border"
              }`}
            >
              <div className="flex items-baseline justify-between mb-1">
                <h2 className="text-lg font-bold font-display">{tier.name}</h2>
                {tier.popular && (
                  <span className="bg-blue text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Most popular
                  </span>
                )}
              </div>
              <p className="text-4xl font-bold font-display mb-1">
                ${tier.price}
                <span className="text-base text-muted-foreground font-medium"> once</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {tier.screens} screens · {tier.storage} media storage
              </p>
              <Button className="font-semibold w-full mb-6" asChild>
                <a href={tier.href}>
                  Get {tier.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <ul className="space-y-2.5 text-sm">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-16">
          60-day refund policy · Stack multiple tiers to raise your caps ·
          Questions? <a href="mailto:support@piads.co" className="underline">support@piads.co</a>
        </p>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-border rounded-2xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">Want to see the product first?</p>
            <Button variant="outline" className="font-semibold" asChild>
              <Link href="/#product-tour">Watch the walkthrough</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
