"use client"

// Simple, venue-first landing page. One message: turn the TVs you already
// own into screens you control, and earn when local businesses advertise.
// Proof = the real in-app walkthrough videos (ProductTour).

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/ui/scroll-animate"
import { ProductTour } from "@/components/product-tour"
import {
  ArrowRight,
  CheckCircle2,
  Tv,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Quote,
} from "lucide-react"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const pillars = [
  {
    icon: Tv,
    color: "bg-blue", text: "text-white",
    title: "Show your own content",
    description:
      "Announcements, menus, promos, member spotlights — you decide what plays on your screens, always first.",
  },
  {
    icon: DollarSign,
    color: "bg-teal", text: "text-white",
    title: "Earn from local ads",
    description:
      "Open the slots you choose to nearby businesses and keep 75% of every booking. Ads only fill the gaps you allow.",
  },
  {
    icon: ShieldCheck,
    color: "bg-coral", text: "text-gray-900",
    title: "Stay in control",
    description:
      "Local businesses only — no big corporations. You approve every ad before it ever appears on your TV.",
  },
]

const testimonials = [
  {
    quote:
      "My members love seeing our WOD and PR board on the screen. It keeps the energy high and everyone engaged.",
    author: "Coach Bobby K",
    company: "Ballston CrossFit",
  },
  {
    quote:
      "We display our coworking events and community highlights on the TV. Members actually stop and watch. Engagement is way up!",
    author: "Hope",
    company: "Venture X Coworking",
  },
  {
    quote:
      "Now our customers see our discounts and services right when they walk in. It's been great for upselling repairs and accessories.",
    author: "Yoseph",
    company: "Millennium Mobile",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero — one column, one message */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue/15 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-4xl text-center">
          <ScrollAnimate animation="up">
            <span className="inline-flex items-center gap-2 bg-blue/10 text-blue text-sm font-bold px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              Digital signage for local venues
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display leading-tight">
              Why do ads make you mad?
              <br />
              Because you&apos;re not making a dime from them.
              <br />
              <span className="text-blue">What if we told you we can change that?</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              PiAds turns the TVs already in your venue into screens you fully
              control — and pays you <strong className="text-foreground">75%</strong> when
              local businesses advertise on them.
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="up" delay={150}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="font-semibold px-8"
                asChild
              >
                <Link href={`${APP_URL}/sign-up?role=venue`}>
                  Start free
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-8"
                asChild
              >
                <a href="#product-tour">See how it works</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base text-muted-foreground">
              <Link href="/players/fire-tv" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Works on any TV — Fire TV native
              </Link>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span><strong className="text-foreground">$10</strong>/screen/month</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Free to try — no card needed
              </span>
            </div>
          </ScrollAnimate>
        </div>

        {/* Walkthrough showcase — the main event, right under the headline */}
        <div className="container mt-16 md:mt-20">
          <ScrollAnimate animation="up" delay={250}>
            <ProductTour />
          </ScrollAnimate>
        </div>
      </section>

      {/* What PiAds does — three pillars */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <ScrollAnimate key={pillar.title} delay={index * 100}>
                <div className={`${pillar.color} ${pillar.text} rounded-3xl p-10 h-full`}>
                  <pillar.icon className="h-9 w-9 mb-5 opacity-90" />
                  <h3 className="text-2xl font-bold font-display mb-3">{pillar.title}</h3>
                  <p className="text-base leading-relaxed opacity-90">
                    {pillar.description}
                  </p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing strip — one price, no tiers */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container max-w-4xl text-center">
          <ScrollAnimate>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              One price. No tiers, no surprises.
            </h2>
            <p className="text-5xl md:text-6xl font-bold font-display text-teal mb-4">
              $10<span className="text-2xl text-gray-400 font-medium">/screen/month</span>
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Everything included — unlimited content, playlists, schedules, and
              the ad marketplace. You keep 75% of every ad booking.
            </p>
            <Button
              size="lg"
              className="font-semibold px-8 bg-white text-gray-900 hover:bg-white/90"
              asChild
            >
              <Link href={`${APP_URL}/sign-up?role=venue`}>
                Try it free
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </ScrollAnimate>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl">
          <ScrollAnimate>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              Venues around Arlington already use it
            </h2>
          </ScrollAnimate>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <ScrollAnimate key={t.company} delay={index * 100}>
                <div className="bg-white border border-border rounded-2xl p-8 h-full shadow-sm flex flex-col">
                  <Quote className="h-8 w-8 text-blue/40 mb-4" />
                  <p className="text-base text-foreground leading-relaxed mb-6 flex-1">
                    {t.quote}
                  </p>
                  <div>
                    <p className="font-bold">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-blue text-white">
        <div className="container max-w-3xl text-center">
          <ScrollAnimate>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Put your TVs to work today
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Set up your first screen in minutes. Free to try — no card needed.
            </p>
            <Button
              size="lg"
              className="font-semibold px-8 bg-white text-blue hover:bg-white/90"
              asChild
            >
              <Link href={`${APP_URL}/sign-up?role=venue`}>
                Start free
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-6 text-white/70">
              A local business wanting to advertise on nearby screens?{" "}
              <Link href="/contact" className="underline font-semibold hover:text-white">
                Get in touch
              </Link>
            </p>
          </ScrollAnimate>
        </div>
      </section>
    </div>
  )
}
