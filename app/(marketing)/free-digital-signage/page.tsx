import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd, graph, faqPage, breadcrumbs } from "@/components/seo/json-ld"
import { ArrowRight, Check, X, Minus, Tv, ShieldCheck, Wallet, Sparkles } from "lucide-react"

// Pillar page for the "free digital signage" cluster. Answer-first: the
// direct answer sits above the fold so search and AI answer engines can quote
// it, then the honest comparison of what "free" means elsewhere.

export const metadata: Metadata = {
  title: "Free Digital Signage Software (Unlimited Screens, No Watermark)",
  description:
    "Most free digital signage is one screen with a watermark. PiAds is free for every screen that enables approved local ad slots — and pays you 70% of what those slots earn. Compare the free tiers honestly.",
  alternates: { canonical: "/free-digital-signage" },
  openGraph: {
    title: "Free Digital Signage Software — Unlimited Screens, No Watermark",
    description: "Free for every partner screen, and the screen pays you 70% of approved local ad bookings.",
    url: "/free-digital-signage",
  },
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

// Published free-tier limits as of September 2026. Re-verify before editing.
const FREE_TIERS = [
  { name: "PiAds (Partner plan)", screens: "Unlimited", watermark: false, features: "Everything", catch: "Screens must enable approved local ad slots. You approve every ad and keep 70%.", piads: true },
  { name: "Yodeck", screens: "1", watermark: true, features: "Full", catch: "Second screen starts the paid plan; Raspberry Pi-first hardware." },
  { name: "OptiSigns", screens: "1", watermark: true, features: "Limited", catch: "Advanced features and reporting sit in paid tiers." },
  { name: "DigitalSignage.com", screens: "3", watermark: false, features: "Core", catch: "Older interface; enterprise features paid." },
  { name: "EasySignage", screens: "1", watermark: true, features: "Core", catch: "Single screen forever; paid beyond that." },
]

const FAQS = [
  { question: "Is PiAds really free?", answer: "Yes, for partner screens. A partner screen enables approved local ad slots; advertising funds the platform, so the software costs the venue $0 with every feature included and no screen limit. Screens that never enable ad slots are billed $10 per screen per month or $100 per year." },
  { question: "Will ads take over my screen?", answer: "No. Your own content plays first. You choose how much inventory to open, you set the dayparts, and every campaign needs your approval before it can play. You can decline any ad and block whole categories." },
  { question: "Is there a watermark or PiAds branding on my TV?", answer: "No. Partner screens show your content and the approved ads you allowed, with no watermark or platform branding." },
  { question: "How is this different from other free digital signage tiers?", answer: "Most free tiers cap you at one screen, add a watermark, and hold features back for paid plans. PiAds' free plan has no screen cap and no feature gates because it is funded by the ad slots you approve, and those slots pay you 70% of cleared bookings." },
  { question: "What hardware do I need?", answer: "Any TV plus a Fire TV Stick, Android TV device, Raspberry Pi, or just a web browser. PiAds has a native Fire TV app, and most venues use a stick they already own. There is also a free iOS app for managing screens from your phone." },
  { question: "Can I try it without any hardware?", answer: "Yes. Sign up without a card, and the built-in web player lets you see your content playing in a browser tab before you pair a TV." },
]

export default function FreeDigitalSignagePage() {
  return (
    <div className="bg-background">
      <JsonLd data={graph(faqPage(FAQS), breadcrumbs([{ name: "Home", path: "/" }, { name: "Free digital signage", path: "/free-digital-signage" }]))} />

      <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(215,241,113,0.48),transparent_60%)]" />
        <div className="container relative max-w-4xl">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/5 px-4 py-2 text-sm font-semibold text-blue">
            <Sparkles className="h-4 w-4" /> Free digital signage, explained honestly
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1] tracking-[-0.045em] text-gray-950 md:text-7xl">
            Free digital signage software. Every screen, no watermark.
          </h1>
          {/* The direct answer. Keep it one paragraph — this is what gets quoted. */}
          <p className="mt-7 max-w-3xl text-xl leading-relaxed text-gray-700">
            Most &ldquo;free digital signage&rdquo; means one screen, a watermark, and a paid plan the moment you add a second TV.
            PiAds is different: the software is <strong className="text-gray-950">$0 for every screen that enables approved local ad slots</strong>,
            with every feature included. Local businesses book those slots, you approve each one, and you keep <strong className="text-gray-950">70%</strong> of
            what they pay. Your own content always plays first.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-14 rounded-xl bg-gray-950 px-8 text-base font-semibold hover:bg-gray-800" asChild>
              <Link href={`${APP_URL}/sign-up?role=venue`}>Start free — no card <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 rounded-xl px-8 text-base font-semibold" asChild>
              <Link href="/pricing">See how pricing works</Link>
            </Button>
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
            {[[Tv, "Unlimited partner screens"], [ShieldCheck, "You approve every ad"], [Wallet, "Keep 70% of ad revenue"]].map(([Icon, t]) => {
              const I = Icon as typeof Tv
              return <li key={t as string} className="flex items-center gap-2"><I className="h-4 w-4 text-blue" />{t as string}</li>
            })}
          </ul>
        </div>
      </section>

      <section className="bg-[#EFEDE7] py-20 md:py-28">
        <div className="container max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue">What &ldquo;free&rdquo; actually means</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Free tiers compared</h2>
            <p className="mt-5 text-lg text-gray-600">Published limits as of September 2026. Every vendor here is a real product; the question is what free costs you later.</p>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4">Platform</th><th className="px-5 py-4">Free screens</th><th className="px-5 py-4">Watermark</th><th className="px-5 py-4">Features on free</th><th className="px-5 py-4">The catch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {FREE_TIERS.map((t) => (
                  <tr key={t.name} className={t.piads ? "bg-blue/5 font-medium text-gray-950" : "text-gray-700"}>
                    <td className="px-5 py-4">{t.name}</td>
                    <td className="px-5 py-4">{t.screens}</td>
                    <td className="px-5 py-4">{t.watermark ? <span className="inline-flex items-center gap-1 text-coral"><X className="h-4 w-4" /> Yes</span> : <span className="inline-flex items-center gap-1 text-green-700"><Check className="h-4 w-4" /> None</span>}</td>
                    <td className="px-5 py-4">{t.features}</td>
                    <td className="px-5 py-4 text-gray-600">{t.catch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">Competitor details from each vendor&rsquo;s public pricing page. Tell us if something changed and we&rsquo;ll fix it.</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue">Why it can be free</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">The screen pays for the software. Then it pays you.</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              A TV in a busy cafe, gym, or salon is attention that nearby businesses want. PiAds lets them book short slots between your own
              content. Advertising covers the platform, which is why partner screens cost $0, and the venue keeps the larger share.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Your menus, promos, and announcements always come first — ads fill only the gaps you allow.",
                "Every campaign needs your approval. Decline anything that doesn't fit; block whole categories.",
                "A cleared $100 booking pays your venue $70. PiAds keeps $30 for the marketplace, payments, and the software.",
                "Don't want ads on a screen? Keep it ad-free for $10/month or $100/year.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-gray-700"><Check className="mt-1 h-5 w-5 shrink-0 text-blue" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-gray-500">What you get on the free plan</p>
            <ul className="mt-5 grid gap-3 text-gray-800 sm:grid-cols-2">
              {["Unlimited screens and playlists", "Weekly scheduling and dayparts", "Live screen health (online, last seen, last frame)", "Native Fire TV app, Android TV, Raspberry Pi, browser", "Free iOS app to manage from your phone", "Local ad marketplace with approval", "Proof-of-play and payout reporting", "Split-screen zone layouts"].map((f) => (
                <li key={f} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />{f}</li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-gray-950 p-4 text-white"><p className="text-3xl font-bold">$0</p><p className="text-xs text-white/70">partner screens</p></div>
              <div className="rounded-2xl bg-blue/10 p-4"><p className="text-3xl font-bold text-blue">70%</p><p className="text-xs text-gray-600">of ad revenue to you</p></div>
              <div className="rounded-2xl bg-gray-100 p-4"><p className="text-3xl font-bold text-gray-800">$10</p><p className="text-xs text-gray-600">/mo if ad-free</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EFEDE7] py-20 md:py-28">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Free digital signage FAQ</h2>
          <dl className="mt-10 divide-y divide-gray-200">
            {FAQS.map((f) => (
              <div key={f.question} className="py-6">
                <dt className="text-lg font-semibold text-gray-950">{f.question}</dt>
                <dd className="mt-2 leading-relaxed text-gray-600">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <Link href="/digital-signage-ad-revenue" className="rounded-full border border-gray-300 bg-white px-4 py-2 font-medium hover:border-gray-950">How screens earn ad revenue <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
            <Link href="/blog/free-digital-signage-software-compared" className="rounded-full border border-gray-300 bg-white px-4 py-2 font-medium hover:border-gray-950">Free signage software compared in depth</Link>
            <Link href="/alternative-to" className="rounded-full border border-gray-300 bg-white px-4 py-2 font-medium hover:border-gray-950">PiAds vs Yodeck, OptiSigns, ScreenCloud</Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-20 text-center text-white md:py-28">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">Put a free screen up today.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75 md:text-xl">No card, no watermark, no screen limit. Pair a Fire TV Stick or test in the browser first.</p>
          <Button size="lg" className="mt-9 h-14 rounded-xl bg-white px-8 text-base font-semibold text-gray-950 hover:bg-white/90" asChild>
            <Link href={`${APP_URL}/sign-up?role=venue`}>Start free <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
