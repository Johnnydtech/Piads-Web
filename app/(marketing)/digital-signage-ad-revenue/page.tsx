import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd, graph, faqPage, breadcrumbs } from "@/components/seo/json-ld"
import { ArrowRight, Check, CircleDollarSign, ShieldCheck, MapPin, Sparkles, Store, Clock, BadgeCheck } from "lucide-react"

// Pillar page for the "digital signage ad revenue / screens that pay you"
// cluster. Answer-first, then the money math, then how it differs from ad
// networks, then FAQ. No earnings promises — demand varies by venue.

export const metadata: Metadata = {
  title: "Digital Signage That Pays You: Earn Ad Revenue From Your Venue Screens",
  description:
    "Turn the TVs in your cafe, gym, salon, or shop into income. Local businesses book ad slots between your own content, you approve every ad, and you keep 70%. The software is free for partner screens.",
  alternates: { canonical: "/digital-signage-ad-revenue" },
  openGraph: {
    title: "Digital Signage That Pays You — Earn From Your Venue Screens",
    description: "Local advertisers book your screens, you approve every ad, you keep 70%. Free software for partner screens.",
    url: "/digital-signage-ad-revenue",
  },
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const STEPS = [
  { icon: Store, title: "Run your own content", text: "Menus, promos, announcements, the game. Your playlist always plays first. Ads only fill the gaps you open." },
  { icon: Clock, title: "Open the slots you choose", text: "Pick the dayparts and how much inventory to make available. Breakfast only, evenings only, or all day — and change it any time." },
  { icon: MapPin, title: "Local businesses book them", text: "Nearby gyms, salons, dentists, and shops find your screen on the PiAds marketplace and book by daypart. No national ad networks." },
  { icon: BadgeCheck, title: "You approve every ad", text: "Nothing plays without your sign-off. Decline a creative, block whole categories, or pause ads with one tap in the iOS app." },
  { icon: CircleDollarSign, title: "You get paid 70%", text: "For every cleared booking your venue receives 70%. Payouts and proof-of-play show up in your dashboard." },
]

const FAQS = [
  { question: "How much can a venue earn from digital signage ads?", answer: "It depends on foot traffic, location, the dayparts you open, and how many local advertisers book. Venues set their own slot prices on PiAds — many start around $8 to $25 per daypart per day. For every cleared booking the venue keeps 70%. Earnings are not guaranteed; they follow real advertiser demand." },
  { question: "What is the revenue split?", answer: "70% to the venue, 30% to PiAds. On a $100 cleared booking your venue receives $70. PiAds' share funds the marketplace, payments, support, and the signage software, which is why partner screens pay $0 for the platform." },
  { question: "Who are the advertisers?", answer: "Local businesses near your venue — not national ad networks. They browse venues on the PiAds marketplace, choose your screen and a daypart, and submit a campaign for your approval." },
  { question: "Do I have to run ads to use PiAds?", answer: "No. Screens that don't enable ad slots are billed $10 per screen per month or $100 per year. Enable approved ad slots and that screen's software is free, plus it earns." },
  { question: "Can I reject an ad or block a category?", answer: "Yes. Every campaign requires your approval before it plays. You can decline individual creatives and block categories such as alcohol, competitors, or anything that doesn't fit your venue." },
  { question: "How is this different from Loop TV, Atmosphere, or programmatic screen networks?", answer: "Ad-network products fill your TV from national or programmatic demand and share a slice of the revenue. PiAds is the reverse: your content is the program, local businesses you approve book the slots, and the venue keeps 70%. It is a marketplace you control, not a channel you host." },
  { question: "When and how do I get paid?", answer: "Bookings clear after the campaign runs and payments settle; payouts are tracked in your dashboard with proof-of-play for each spot. There is a minimum payout threshold before funds are sent." },
]

export default function AdRevenuePage() {
  return (
    <div className="bg-background">
      <JsonLd data={graph(faqPage(FAQS), breadcrumbs([{ name: "Home", path: "/" }, { name: "Digital signage ad revenue", path: "/digital-signage-ad-revenue" }]))} />

      <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(215,241,113,0.48),transparent_60%)]" />
        <div className="container relative max-w-4xl">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/5 px-4 py-2 text-sm font-semibold text-blue">
            <Sparkles className="h-4 w-4" /> Screens that pay you
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1] tracking-[-0.045em] text-gray-950 md:text-7xl">
            Earn ad revenue from the TVs you already own.
          </h1>
          {/* Direct answer, one paragraph, quotable. */}
          <p className="mt-7 max-w-3xl text-xl leading-relaxed text-gray-700">
            PiAds turns venue screens into income. Your own content plays first; local businesses book short ad slots in the gaps you open;
            you approve every ad; and your venue keeps <strong className="text-gray-950">70% of every cleared booking</strong>. Because advertising
            funds the platform, the signage software is <strong className="text-gray-950">free for partner screens</strong>.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-14 rounded-xl bg-gray-950 px-8 text-base font-semibold hover:bg-gray-800" asChild>
              <Link href={`${APP_URL}/sign-up?role=venue`}>Start earning — free <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 rounded-xl px-8 text-base font-semibold" asChild>
              <Link href="/pricing">See the 70% math</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#EFEDE7] py-20 md:py-28">
        <div className="container max-w-6xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue">How it works</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Five steps from a TV to a payout</h2>
          </div>
          <ol className="grid gap-5 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-950 text-sm font-bold text-white">{i + 1}</span>
                  <s.icon className="h-5 w-5 text-blue" />
                </div>
                <h3 className="font-semibold text-gray-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue">The math</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">70% to the venue. Every time.</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              You set slot prices for your own screens. When a local advertiser books and the campaign clears, the split is fixed:
              your venue receives 70%, PiAds retains 30% for marketplace operations, payments, support, and the software itself.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Venues typically price dayparts from about $8 to $25 per day, higher in busy locations.",
                "Earnings follow real local demand — we don't promise a monthly number, and neither should anyone.",
                "Partner screens pay $0 for the software. Ad-free screens are $10/month or $100/year.",
                "Proof-of-play shows every spot that ran; payouts are itemized per booking.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-gray-700"><Check className="mt-1 h-5 w-5 shrink-0 text-blue" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Example cleared booking</p><p className="mt-1 text-4xl font-bold text-gray-950">$100</p></div><CircleDollarSign className="h-10 w-10 text-blue" /></div>
            <div className="h-4 overflow-hidden rounded-full bg-gray-100"><div className="h-full w-[70%] rounded-full bg-blue" /></div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-blue/5 p-5"><p className="text-sm text-gray-500">Your venue · 70%</p><p className="mt-1 text-3xl font-bold text-blue">$70</p></div>
              <div className="rounded-2xl bg-gray-100 p-5"><p className="text-sm text-gray-500">PiAds · 30%</p><p className="mt-1 text-3xl font-bold text-gray-700">$30</p></div>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-gray-600"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />Nothing runs until you approve it. Your content stays first in the loop.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#EFEDE7] py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue">Marketplace, not ad network</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">How PiAds differs from screen ad networks</h2>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-5 py-4">&nbsp;</th><th className="px-5 py-4">Ad-network TV (Loop TV, Atmosphere, programmatic)</th><th className="px-5 py-4 text-gray-950">PiAds</th></tr></thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {[
                  ["What plays", "Their channel or programmatic fill, with your promos in between", "Your content first; ads only in slots you open"],
                  ["Who advertises", "National / programmatic demand", "Local businesses near you"],
                  ["Approval", "Category controls at best", "Every campaign approved by you"],
                  ["Your share", "A share of network revenue", "70% of each cleared booking"],
                  ["Software cost", "Usually free, ad-funded", "$0 for partner screens; $10/mo without ads"],
                  ["Hardware", "Often their box", "Fire TV Stick, Android TV, Pi, or browser you own"],
                ].map(([k, a, b]) => (
                  <tr key={k}><td className="px-5 py-4 font-medium text-gray-950">{k}</td><td className="px-5 py-4">{a}</td><td className="px-5 py-4 font-medium text-gray-950">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Ad revenue FAQ</h2>
          <dl className="mt-10 divide-y divide-gray-200">
            {FAQS.map((f) => (
              <div key={f.question} className="py-6"><dt className="text-lg font-semibold text-gray-950">{f.question}</dt><dd className="mt-2 leading-relaxed text-gray-600">{f.answer}</dd></div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <Link href="/free-digital-signage" className="rounded-full border border-gray-300 bg-white px-4 py-2 font-medium hover:border-gray-950">Why the software is free <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
            <Link href="/blog/earn-money-from-your-venue-screens" className="rounded-full border border-gray-300 bg-white px-4 py-2 font-medium hover:border-gray-950">Earn money from your venue screens (guide)</Link>
            <Link href="/digital-signage-for" className="rounded-full border border-gray-300 bg-white px-4 py-2 font-medium hover:border-gray-950">Signage by industry</Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-20 text-center text-white md:py-28">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">Your screens. Your rules. Your 70%.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75 md:text-xl">Pair one screen free, open a daypart, and approve your first local advertiser.</p>
          <Button size="lg" className="mt-9 h-14 rounded-xl bg-white px-8 text-base font-semibold text-gray-950 hover:bg-white/90" asChild>
            <Link href={`${APP_URL}/sign-up?role=venue`}>Start free <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
