import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Building2, TrendingUp, ArrowRight, Heart, DollarSign, Users, Shield } from "lucide-react"

export const metadata = {
  title: "Pricing | One Price. 75% to You.",
  description: "Simple pricing for community-first advertising. $10/screen for venues, keep 75% of ad revenue. Advertisers start at $50-75/week.",
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const venueFeatures = [
  "Unlimited content playlists",
  "Full ad approval control",
  "Real-time analytics",
  "We recommend pricing (you can override)",
  "Weekly payouts via Stripe",
  "Local-only advertisers",
  "Priority support",
  "Mobile management app",
]

const advertiserBenefits = [
  "No monthly subscriptions",
  "Book by the week",
  "Real-time availability",
  "Performance tracking",
  "QR code analytics",
  "Local venues only",
]

const daypartPricing = [
  { name: "Breakfast", time: "7am - 11am", range: "$8 - $12", description: "Coffee shops, bakeries, gyms" },
  { name: "Lunch", time: "11am - 3pm", range: "$12 - $18", description: "Restaurants, cafés, coworking" },
  { name: "Evening", time: "5pm - 10pm", range: "$15 - $25", description: "Bars, gyms, entertainment" },
]

const faqs = [
  {
    question: "How do venues get paid?",
    answer: "Venues keep 75% of every ad booking. Payments are processed weekly via Stripe. We handle all the billing so you just approve ads and collect revenue.",
  },
  {
    question: "Why only local businesses?",
    answer: "We believe advertising dollars should stay in the community. That's why we only allow local businesses to advertise on PiAds. No big corporations drowning out local voices.",
  },
  {
    question: "What makes PiAds different?",
    answer: "Most digital signage platforms treat venues as inventory for big brands. We flip that. Venues run their own content first, and open slots for local advertisers. It's community-first, not corporate-first.",
  },
  {
    question: "What is a daypart?",
    answer: "A daypart is a time block during the day: Breakfast (7-11am), Lunch (11am-3pm), or Evening (5-10pm). Advertisers book specific dayparts to reach their ideal audience.",
  },
  {
    question: "Do I need special hardware?",
    answer: "You need a display screen and a Raspberry Pi ($50). We provide step-by-step setup guides and the software is free. Most venues are up and running in under an hour.",
  },
  {
    question: "Can I reject ads I don't like?",
    answer: "Absolutely. You have full control over what displays on your screens. Every ad campaign must be approved by you before it goes live.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue px-4 py-2 rounded-full mb-8 shadow-md">
            <Heart className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Community-First Pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            One Price.
            <br />
            <span className="text-teal">75% to You.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No confusing tiers. No hidden fees. Venues pay $10/screen and keep 75% of every ad booking.
          </p>
        </div>
      </section>

      {/* Venue Pricing - Single Plan */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display">For Venues</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
            One simple plan. Use your screens for your own content AND earn from local advertisers.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Pricing Card */}
            <div className="bg-blue text-white rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-orange text-foreground text-sm font-medium px-4 py-1.5 rounded-full">
                  Community Plan
                </span>
              </div>

              <h3 className="text-xl font-semibold font-display mb-2 mt-6">Per Screen</h3>

              <div className="mb-6">
                <span className="text-6xl font-bold font-display">$10</span>
                <span className="text-white/70 text-xl">/month</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Keep 75% of Ad Revenue</div>
                    <div className="text-sm text-white/70">We only take 25% commission</div>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {venueFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 flex-shrink-0 text-white" />
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full rounded-xl h-14 bg-white text-blue hover:bg-white/90 text-lg font-semibold"
                asChild
              >
                <Link href={`${APP_URL}/sign-up?role=venue`}>
                  Start Earning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Revenue Example */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h4 className="text-xl font-semibold font-display mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-teal" />
                  Monthly Revenue Example
                </h4>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-muted-foreground">Ad revenue (4 advertisers/month)</span>
                    <span className="font-semibold">$400</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-muted-foreground">Your share (75%)</span>
                    <span className="font-semibold text-teal">$300</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-muted-foreground">Platform fee</span>
                    <span className="font-semibold">-$10</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold">Net monthly profit</span>
                    <span className="text-2xl font-bold text-coral">$290</span>
                  </div>
                </div>
              </div>

              <div className="bg-coral/10 border border-coral/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-coral mt-1" />
                  <div>
                    <div className="font-semibold text-coral mb-1">Why We Charge $10</div>
                    <p className="text-sm text-muted-foreground">
                      It keeps the lights on and ensures we&apos;re accountable to venues, not advertisers.
                      Your success is our success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advertiser Pricing */}
      <section className="py-24 md:py-32">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display">For Advertisers</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Start at <span className="text-teal">$50-75/week</span>
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                No $10K minimums like the big billboard companies. Book a week at a local gym,
                coffee shop, or coworking space and see real results.
              </p>

              <ul className="space-y-3 mb-8">
                {advertiserBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-teal" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-teal/10 border border-teal/20 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-teal mt-1" />
                  <div>
                    <div className="font-semibold text-teal mb-1">Local Businesses Only</div>
                    <p className="text-sm text-muted-foreground">
                      We only accept local businesses. No big corporations competing for attention
                      on your neighbor&apos;s screens.
                    </p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="h-14 px-8 text-base rounded-xl bg-teal hover:bg-teal/90" asChild>
                <Link href={`${APP_URL}/sign-up?role=advertiser`}>
                  Browse Local Venues
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="bg-secondary/50 rounded-3xl p-8">
              <h4 className="text-xl font-semibold font-display mb-6">Daypart Pricing Guide</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Prices vary by venue and demand. Here&apos;s what to expect:
              </p>

              <div className="space-y-4">
                {daypartPricing.map((daypart) => (
                  <div key={daypart.name} className="bg-white rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold">{daypart.name}</div>
                        <div className="text-sm text-muted-foreground">{daypart.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-teal text-lg">{daypart.range}</div>
                        <div className="text-sm text-muted-foreground">per day</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Popular with: {daypart.description}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Typical weekly booking</span>
                  <span className="text-xl font-bold text-coral">$50 - $75</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Book 5-7 days at one daypart to get started
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Comparison */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-12">
            Why We&apos;re Different
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-coral" />
              </div>
              <h3 className="font-semibold font-display mb-2">Community-First</h3>
              <p className="text-sm text-muted-foreground">
                Only local businesses can advertise. Your money stays in the community.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-blue/20 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-blue" />
              </div>
              <h3 className="font-semibold font-display mb-2">Fair Revenue</h3>
              <p className="text-sm text-muted-foreground">
                Venues keep 75%. Most platforms take 40-50%. We think that&apos;s wrong.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-teal" />
              </div>
              <h3 className="font-semibold font-display mb-2">Your Control</h3>
              <p className="text-sm text-muted-foreground">
                Run your own content. Approve every ad. Your screens, your rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-secondary/50 rounded-2xl p-6">
                <h3 className="font-semibold font-display text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-coral text-white">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Join the Community
          </h2>
          <p className="text-xl text-white/80 mb-10">
            4 venues are already keeping advertising local. Be part of something different.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-base rounded-xl" asChild>
              <Link href={`${APP_URL}/sign-up?role=venue`}>
                Start as Venue
                <Building2 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl bg-transparent border-white/30 hover:bg-white/10" asChild>
              <Link href={`${APP_URL}/sign-up?role=advertiser`}>
                Start as Advertiser
                <TrendingUp className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
