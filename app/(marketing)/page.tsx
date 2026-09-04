"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  LayoutDashboard,
  MonitorSmartphone,
  PlayCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react"

import { ProductTour } from "@/components/product-tour"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/ui/scroll-animate"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const benefits = [
  {
    icon: LayoutDashboard,
    title: "One calm dashboard",
    description: "See every screen, playlist, schedule, and campaign without digging through enterprise menus.",
  },
  {
    icon: CalendarClock,
    title: "Schedule once",
    description: "Daypart menus, promotions, announcements, and events across one screen or every location.",
  },
  {
    icon: ShieldCheck,
    title: "Approve every ad",
    description: "You choose the inventory, categories, and campaigns. Nothing runs without your approval.",
  },
]

const testimonials = [
  {
    quote: "My members love seeing our WOD and PR board on the screen. It keeps the energy high and everyone engaged.",
    author: "Coach Bobby K",
    company: "Ballston CrossFit",
  },
  {
    quote: "We display our coworking events and community highlights on the TV. Members actually stop and watch. Engagement is way up!",
    author: "Hope",
    company: "Venture X Coworking",
  },
  {
    quote: "Now our customers see our discounts and services right when they walk in. It has been great for upselling repairs and accessories.",
    author: "Yoseph",
    company: "Millennium Mobile",
  },
]

const setupSteps = [
  ["01", "Connect a screen", "Pair a TV, Fire TV, browser, Android device, or Raspberry Pi in minutes."],
  ["02", "Publish your content", "Build playlists and schedules from images, videos, websites, and social content."],
  ["03", "Turn on ad slots", "Choose when ads may run, approve each campaign, and keep 70% of cleared revenue."],
]

export default function HomePage() {
  return (
    <div className="flex flex-col bg-background">
      <section className="relative overflow-hidden pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_50%_0%,rgba(215,241,113,0.48),transparent_60%)]" />

        <div className="container relative z-10 max-w-5xl text-center">
          <ScrollAnimate animation="up">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/5 px-4 py-2 text-sm font-semibold text-blue">
              <Sparkles className="h-4 w-4" />
              Free digital signage for partner venues
            </span>
            <h1 className="mx-auto mb-7 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-gray-950 md:text-7xl lg:text-[82px]">
              Your screens should do more than display content.
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl">
              Manage every TV from one simple dashboard. Enable approved local ad slots,
              use PiAds <strong className="font-semibold text-gray-950">free</strong>, and keep{" "}
              <strong className="font-semibold text-gray-950">70% of the revenue.</strong>
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="up" delay={150}>
            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" className="h-14 rounded-xl bg-gray-950 px-8 text-base font-semibold hover:bg-gray-800" asChild>
                <Link href={`${APP_URL}/sign-up?role=venue`}>
                  Start free with ad slots
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 rounded-xl border-gray-300 bg-white px-8 text-base font-semibold hover:bg-gray-50" asChild>
                <a href="#product-tour">See the platform</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 md:text-base">
              {["Use the screens you own", "No card required", "You approve every ad"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </ScrollAnimate>
        </div>

        <div className="container relative z-10 mt-16 max-w-7xl md:mt-20">
          <ScrollAnimate animation="up" delay={250}>
            <div className="relative mx-auto rounded-[28px] border border-gray-200 bg-white p-2.5 shadow-[0_30px_90px_rgba(17,24,39,0.14)] md:p-4">
              <div className="flex items-center gap-2 rounded-t-2xl border-b border-gray-100 bg-gray-50 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="mx-auto rounded-md border border-gray-200 bg-white px-8 py-1 text-[11px] text-gray-400 md:px-24">
                  app.piads.co/venue/screens
                </span>
              </div>
              {/* Split view: the dashboard on the left, the same venue in the
                  iOS app on the right — one venue, both surfaces. */}
              <div className="grid grid-cols-1 overflow-hidden rounded-b-2xl bg-gray-50 md:grid-cols-2">
                {/* The dashboard is 16:9 and the phone is tall — cover-crop the
                    dashboard from its top-left so both halves share a height
                    instead of leaving a dead band under the desktop shot. */}
                <div className="relative min-h-[260px] md:min-h-0 md:border-r md:border-gray-200">
                  <Image src="/cms-screenshots/screens-dashboard-2026.jpg" alt="PiAds screen management dashboard with a connected live screen" width={2160} height={1216} priority className="h-full w-full object-cover object-left-top" />
                </div>
                <div className="relative flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-7 md:px-10">
                  <Image src="/cms-screenshots/ios-screens-2026.jpg" alt="The PiAds iOS app showing the same venue screens on a phone" width={804} height={1748} className="h-auto w-full max-w-[240px] rounded-[2rem] shadow-[0_18px_50px_rgba(17,24,39,0.22)] md:max-w-[268px]" />
                </div>
              </div>
            </div>

            {/* Stat cards sit below the frame — overlaid they clipped the
                dashboard's screen card. */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["Platform cost", "$0 with ad slots"],
                ["Your revenue share", "70%"],
                ["Campaign approval", "Always yours"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <p className="text-lg font-bold text-gray-950">{value}</p>
                </div>
              ))}
            </div>
          </ScrollAnimate>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50/70 py-8">
        <div className="container">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">Built for the places people already gather</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-base font-semibold text-gray-500 md:text-lg">
            <span>Restaurants</span><span>Cafes</span><span>Gyms</span><span>Retail</span><span>Offices</span><span>Waiting rooms</span>
          </div>
        </div>
      </section>

      <section className="bg-[#EFEDE7] py-24 md:py-32">
        <div className="container max-w-7xl">
          <ScrollAnimate>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue">Simple at every scale</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">Everything your screens need. Nothing they don&apos;t.</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600 md:text-xl">The ease of a modern SaaS tool, built around real venue workflows instead of enterprise complexity.</p>
            </div>
          </ScrollAnimate>

          <div className="grid gap-6 lg:grid-cols-[1.55fr_0.75fr]">
            <ScrollAnimate animation="left">
              <div className="h-full overflow-hidden rounded-[32px] border border-gray-200 bg-white p-7 shadow-sm md:p-10">
                <div className="mb-8 max-w-xl">
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10 text-blue"><MonitorSmartphone className="h-5 w-5" /></span>
                  <h3 className="mb-3 text-3xl font-bold tracking-tight text-gray-950">Every screen, from one place</h3>
                  <p className="text-lg leading-relaxed text-gray-600">Know what is playing, what is scheduled, and which screens need attention at a glance.</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-[0_20px_50px_rgba(17,24,39,0.08)]">
                  <Image src="/cms-screenshots/playlist-editor-2026.jpg" alt="PiAds playlist editor with current content controls" width={2160} height={1216} className="h-auto w-full" />
                </div>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="right" delay={120}>
              <div className="flex h-full min-h-[520px] flex-col justify-between overflow-hidden rounded-[32px] bg-gray-950 p-8 text-white shadow-sm md:p-10">
                <div>
                  <span className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-coral"><Wallet className="h-5 w-5" /></span>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Partner plan</p>
                  <p className="font-display text-7xl font-bold tracking-[-0.05em]">$0</p>
                  <p className="mt-3 text-lg text-white/60">per partner screen</p>
                </div>
                <div>
                  <div className="mb-8 h-px bg-white/10" />
                  <p className="text-2xl font-semibold leading-snug">Enable marketplace ad slots. Keep 70% of every cleared booking.</p>
                  <Link href="/pricing" className="mt-8 inline-flex items-center gap-2 font-semibold text-coral transition-all hover:gap-3">See how pricing works <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </ScrollAnimate>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <ScrollAnimate key={benefit.title} delay={index * 100}>
                <div className="h-full rounded-[26px] border border-gray-200 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <benefit.icon className="mb-7 h-7 w-7 text-blue" />
                  <h3 className="mb-3 text-xl font-bold text-gray-950">{benefit.title}</h3>
                  <p className="leading-relaxed text-gray-600">{benefit.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      <section id="product-tour" className="scroll-mt-32 bg-white py-24 md:py-32">
        <div className="container max-w-6xl">
          <ScrollAnimate>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-2 text-sm font-semibold text-blue"><PlayCircle className="h-4 w-4" /> Captured from the live product.</span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">From blank TV to live playlist in minutes.</h2>
              <p className="mt-5 text-lg text-gray-600 md:text-xl">Click through the connected-screen workflow captured from app.piads.co.</p>
            </div>
          </ScrollAnimate>
          <ProductTour />
        </div>
      </section>

      <section className="overflow-hidden bg-gray-950 py-24 text-white md:py-32">
        <div className="container max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <ScrollAnimate animation="left">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-coral">A better business model</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">The screen stays yours. The upside does too.</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">Your content is always the priority. You decide how much inventory to open, review every campaign, and can pause ads whenever you need the screen back.</p>
              <ul className="mt-9 space-y-4">
                {["Free signage software on participating screens", "70% of cleared ad revenue goes to your venue", "Category controls and campaign-by-campaign approval", "Clear reporting for every play and payout"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-white/85"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-coral" />{item}</li>
                ))}
              </ul>
            </ScrollAnimate>

            <ScrollAnimate animation="right" delay={120}>
              <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur md:p-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div><p className="text-sm text-white/50">Example cleared booking</p><p className="mt-1 text-3xl font-bold">$100.00</p></div>
                  <CircleDollarSign className="h-10 w-10 text-coral" />
                </div>
                <div className="space-y-6 py-8">
                  <div className="flex items-center justify-between"><span className="text-white/60">Your venue keeps</span><span className="text-2xl font-bold text-coral">$70</span></div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[70%] rounded-full bg-coral" /></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-white/50">Venue share · 70%</span><span className="text-white/50">PiAds · 30%</span></div>
                </div>
                <p className="rounded-2xl bg-white/[0.06] p-4 text-sm leading-relaxed text-white/55">Ad earnings depend on approved campaigns, audience, availability, and advertiser demand. PiAds never guarantees revenue.</p>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container max-w-7xl">
          <ScrollAnimate>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue">Three steps to live</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">Setup without the setup call.</h2>
            </div>
          </ScrollAnimate>
          <div className="grid gap-5 md:grid-cols-3">
            {setupSteps.map(([number, title, description], index) => (
              <ScrollAnimate key={number} delay={index * 100}>
                <div className="h-full rounded-[26px] border border-gray-200 p-8">
                  <p className="mb-12 text-sm font-bold text-blue">{number}</p>
                  <h3 className="mb-3 text-2xl font-bold text-gray-950">{title}</h3>
                  <p className="leading-relaxed text-gray-600">{description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EFEDE7] py-24 md:py-32">
        <div className="container max-w-7xl">
          <ScrollAnimate><h2 className="mx-auto mb-14 max-w-3xl text-center font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Built for busy venues, not IT departments.</h2></ScrollAnimate>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimate key={testimonial.company} delay={index * 100}>
                <figure className="flex h-full flex-col rounded-[26px] border border-gray-200 bg-white p-8 shadow-sm">
                  <Quote className="mb-8 h-7 w-7 text-blue/35" />
                  <blockquote className="flex-1 text-lg leading-relaxed text-gray-700">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-8 border-t border-gray-100 pt-5"><p className="font-bold text-gray-950">{testimonial.author}</p><p className="text-sm text-gray-500">{testimonial.company}</p></figcaption>
                </figure>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container max-w-6xl">
          <ScrollAnimate>
            <div className="overflow-hidden rounded-[36px] bg-blue px-7 py-16 text-center text-white shadow-[0_30px_80px_rgba(107,122,63,0.25)] md:px-16 md:py-24">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Your TV is ready</p>
              <h2 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight md:text-6xl">Start managing your screens for free.</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">Enable approved ad slots, publish your first playlist, and put your venue&apos;s screens to work.</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg" className="h-14 rounded-xl bg-white px-8 text-base font-semibold text-gray-950 hover:bg-white/90" asChild><Link href={`${APP_URL}/sign-up?role=venue`}>Start free <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
                <Button size="lg" variant="outline" className="h-14 rounded-xl border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10" asChild><Link href="/contact">Talk to us</Link></Button>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </div>
  )
}
