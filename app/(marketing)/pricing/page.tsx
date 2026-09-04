import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CircleDollarSign,
  HandCoins,
  ShieldCheck,
  Store,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Pricing | Free Digital Signage for Partner Venues",
  description: "Enable approved marketplace ad slots, use PiAds digital signage free, and keep 70% of cleared ad revenue.",
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const venueFeatures = [
  "Unlimited content and playlists",
  "Scheduling and dayparts",
  "Screen health and remote management",
  "Marketplace access",
  "Campaign-by-campaign approval",
  "Ad category controls",
  "Proof-of-play reporting",
  "Clear payout reporting",
]

const advertiserFeatures = [
  "Browse local venue inventory",
  "Book by location and daypart",
  "Upload and reuse creative",
  "Track campaign delivery",
  "See QR engagement",
  "No enterprise minimums",
]

const faqs = [
  {
    question: "What makes the Partner plan free?",
    answer: "Partner screens enable approved marketplace ad slots. Advertising funds the platform, so the signage software costs the venue $0 while the screen remains eligible and participating.",
  },
  {
    question: "What if I don't want ads on my screens?",
    answer: "You can still use PiAds. Screens that don't enable approved ad slots are billed at $10 per screen per month, or $100 per screen per year. Switch a screen to the Partner plan at any time and its fee drops to $0.",
  },
  {
    question: "How much ad space do I have to enable?",
    answer: "You choose the inventory you make available and can change it as your venue needs evolve. Your own menus, announcements, promotions, and programming stay in your control.",
  },
  {
    question: "Can I reject an ad?",
    answer: "Yes. Every campaign requires your approval before it can play. You can also control categories and decline ads that do not fit your venue.",
  },
  {
    question: "How does the 70% share work?",
    answer: "For a cleared $100 ad booking, your venue receives $70 and PiAds retains $30 for marketplace operations, payments, support, and the signage platform.",
  },
  {
    question: "Is ad revenue guaranteed?",
    answer: "No. Earnings depend on advertiser demand, your location, audience, available inventory, and the campaigns you approve.",
  },
  {
    question: "Do I need special hardware?",
    answer: "No proprietary player is required. PiAds supports common options including Fire TV, a web browser, Android, and Raspberry Pi, so you can usually use hardware you already own.",
  },
]

export default function PricingPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pb-20 pt-44 text-center md:pb-28 md:pt-52">
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(215,241,113,0.48),transparent_60%)]" />
        <div className="container relative max-w-4xl">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/5 px-4 py-2 text-sm font-semibold text-blue">
            <HandCoins className="h-4 w-4" /> Pricing that works for your venue
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1] tracking-[-0.045em] text-gray-950 md:text-7xl">Your signage is free when your screen earns.</h1>
          <p className="mx-auto mt-7 max-w-2xl text-xl leading-relaxed text-gray-600">Enable approved local ad slots, pay $0 for PiAds, and keep 70% of cleared advertising revenue.</p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container max-w-6xl">
          <div className="overflow-hidden rounded-[34px] border border-gray-200 bg-gray-950 text-white shadow-[0_35px_100px_rgba(17,24,39,0.16)]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
                <div className="mb-12 flex items-center justify-between">
                  <span className="rounded-full bg-coral px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-950">Partner plan</span>
                  <Building2 className="h-6 w-6 text-white/45" />
                </div>
                <div>
                  <p className="font-display text-8xl font-bold tracking-[-0.06em]">$0</p>
                  <p className="mt-3 text-lg text-white/55">per participating screen</p>
                </div>
                <p className="mt-8 max-w-md text-xl leading-relaxed text-white/80">The complete signage platform, funded by ad slots you control.</p>
                <Button className="mt-10 h-14 w-full rounded-xl bg-white text-base font-semibold text-gray-950 hover:bg-white/90" asChild>
                  <Link href={`${APP_URL}/sign-up?role=venue`}>Start free <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <p className="mt-4 text-center text-sm text-white/45">No card required · Cancel participation anytime</p>
              </div>

              <div className="bg-white/[0.04] p-8 md:p-12">
                <p className="mb-7 text-sm font-semibold uppercase tracking-[0.18em] text-white/45">Everything included</p>
                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {venueFeatures.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-white/85"><Check className="mt-0.5 h-5 w-5 shrink-0 text-coral" /><span>{feature}</span></div>
                  ))}
                </div>
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.06] p-6">
                  <div className="flex items-center justify-between gap-5">
                    <div><p className="text-sm text-white/50">Venue revenue share</p><p className="mt-1 text-4xl font-bold text-coral">70%</p></div>
                    <p className="max-w-xs text-right text-sm leading-relaxed text-white/55">You approve the campaign. Your venue receives the majority of every cleared booking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EFEDE7] py-24 md:py-32">
        <div className="container max-w-6xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue">Transparent by design</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">You keep the bigger piece.</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">PiAds funds the signage platform through its share of marketplace bookings. Your venue keeps 70% because your location, audience, and screen make the campaign valuable.</p>
              <div className="mt-8 space-y-4">
                {["Your content stays first", "You choose when ad slots exist", "You approve every campaign", "You see each play and payout"].map((item) => (
                  <div key={item} className="flex items-center gap-3 font-medium text-gray-800"><BadgeCheck className="h-5 w-5 text-blue" />{item}</div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-gray-200 bg-white p-8 shadow-sm md:p-10">
              <div className="mb-8 flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Example cleared booking</p><p className="mt-1 text-4xl font-bold text-gray-950">$100</p></div><CircleDollarSign className="h-10 w-10 text-blue" /></div>
              <div className="h-4 overflow-hidden rounded-full bg-gray-100"><div className="h-full w-[70%] rounded-full bg-blue" /></div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-blue/5 p-5"><p className="text-sm text-gray-500">Your venue · 70%</p><p className="mt-1 text-3xl font-bold text-blue">$70</p></div>
                <div className="rounded-2xl bg-gray-100 p-5"><p className="text-sm text-gray-500">PiAds · 30%</p><p className="mt-1 text-3xl font-bold text-gray-700">$30</p></div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-gray-500">Illustrative only. Ad fill and revenue vary with demand, venue traffic, available slots, and campaign approvals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal"><Store className="h-6 w-6" /></span>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal">For advertisers</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Reach real customers in the places they visit.</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">Book selected screens by venue, location, and daypart. Start locally without a billboard-sized commitment.</p>
              <Button className="mt-8 h-12 rounded-xl bg-gray-950 px-7 font-semibold hover:bg-gray-800" asChild><Link href={`${APP_URL}/sign-up?role=advertiser`}>Browse venues <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {advertiserFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5"><Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" /><span className="font-medium text-gray-800">{feature}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EFEDE7] py-24 md:py-32">
        <div className="container max-w-4xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue">The details</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Questions, answered plainly.</h2>
          </div>
          <div className="divide-y divide-gray-200 rounded-[28px] border border-gray-200 bg-white px-6 md:px-9">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-7"><h3 className="text-lg font-bold text-gray-950">{faq.question}</h3><p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container max-w-6xl">
          <div className="rounded-[36px] bg-blue px-7 py-16 text-center text-white shadow-[0_30px_80px_rgba(107,122,63,0.24)] md:px-16 md:py-24">
            <ShieldCheck className="mx-auto mb-7 h-9 w-9 text-white/70" />
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">Free software. Your screen. Your call.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">Launch your first screen, choose your ad availability, and keep 70% when an approved campaign runs.</p>
            <Button size="lg" className="mt-9 h-14 rounded-xl bg-white px-8 text-base font-semibold text-gray-950 hover:bg-white/90" asChild><Link href={`${APP_URL}/sign-up?role=venue`}>Start free <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
          </div>
        </div>
      </section>
    </div>
  )
}
