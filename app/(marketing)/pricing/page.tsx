import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Building2, TrendingUp, ArrowRight, Sparkles } from "lucide-react"

export const metadata = {
  title: "Pricing",
  description: "PiAds pricing for venue owners and advertisers. Free for venues, pay-per-campaign for advertisers.",
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const venuePlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "1 screen",
      "Basic analytics",
      "Ad approval workflow",
      "Community support",
      "Standard payouts (weekly)",
    ],
    cta: "Get Started Free",
    highlighted: false,
    color: "bg-cyan",
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "For growing venues",
    features: [
      "Up to 5 screens",
      "Advanced analytics",
      "Priority ad matching",
      "Email support",
      "Faster payouts (daily)",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    color: "bg-blue",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited screens",
      "White-label solution",
      "Dedicated account manager",
      "SLA guarantee",
      "API access",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
    color: "bg-teal",
  },
]

const advertiserFeatures = [
  "Pay only for booked dayparts",
  "No monthly subscription",
  "Transparent per-slot pricing",
  "Real-time availability",
  "Performance tracking included",
  "QR code analytics",
]

const faqs = [
  {
    question: "How do venues get paid?",
    answer: "Venues receive 70% of the advertising revenue. Payments are processed weekly for Starter plans and daily for Professional plans via Stripe.",
  },
  {
    question: "What is a daypart?",
    answer: "A daypart is a time slot during the day: Breakfast (6-11am), Lunch (11am-2pm), or Evening (5-10pm). Advertisers book specific dayparts to target their ideal audience.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes! There are no long-term contracts. You can upgrade, downgrade, or cancel your venue subscription at any time.",
  },
  {
    question: "What hardware do I need?",
    answer: "You need a display screen and a Raspberry Pi (we provide setup guides). Our software runs on the Pi and connects your screen to the platform.",
  },
  {
    question: "How does ad approval work?",
    answer: "Every ad campaign must be approved by you before it goes live on your screens. You have full control over what content displays in your venue.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-blue" />
            <span className="text-sm font-medium">Pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            Simple, Transparent
            <br />
            <span className="text-blue">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Free for venue owners to start. Advertisers pay per campaign with no hidden fees.
          </p>
        </div>
      </section>

      {/* Venue Pricing */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display">For Venues</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
            Choose the plan that fits your venue size.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {venuePlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 ${
                  plan.highlighted
                    ? "bg-blue text-white relative"
                    : "bg-white shadow-sm"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-orange text-foreground text-sm font-medium px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-semibold font-display mb-1">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? "text-white/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold font-display">{plan.price}</span>
                  {plan.period && (
                    <span className={plan.highlighted ? "text-white/70" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? "text-white" : "text-blue"}`} />
                      <span className={`text-sm ${plan.highlighted ? "text-white/90" : ""}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-xl h-12 ${
                    plan.highlighted
                      ? "bg-white text-blue hover:bg-white/90"
                      : ""
                  }`}
                  variant={plan.highlighted ? "secondary" : "default"}
                  asChild
                >
                  <Link href={plan.name === "Enterprise" ? "/contact" : `${APP_URL}/sign-up?role=venue`}>
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advertiser Pricing */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-display">For Advertisers</h2>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Pay Per Campaign
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                No monthly subscription required. Browse our marketplace, select the
                screens and dayparts you want, and pay only for what you book.
              </p>
              <ul className="space-y-3 mb-8">
                {advertiserFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-teal" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="h-14 px-8 text-base rounded-xl bg-teal hover:bg-teal/90" asChild>
                <Link href={`${APP_URL}/sign-up?role=advertiser`}>
                  Browse Venues
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-secondary/50 rounded-3xl p-8">
              <h4 className="text-xl font-semibold font-display mb-6">Example Pricing</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <div className="font-medium">Coffee Shop Screen</div>
                    <div className="text-sm text-muted-foreground">Breakfast daypart</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue text-xl">$15</div>
                    <div className="text-sm text-muted-foreground">per day</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <div className="font-medium">Gym Display</div>
                    <div className="text-sm text-muted-foreground">Evening daypart</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue text-xl">$20</div>
                    <div className="text-sm text-muted-foreground">per day</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Restaurant Screen</div>
                    <div className="text-sm text-muted-foreground">Lunch daypart</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue text-xl">$12</div>
                    <div className="text-sm text-muted-foreground">per day</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                *Prices vary by venue, location, and demand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold font-display text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-teal text-white">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Create your free account today and start monetizing your screens or reaching new customers.
          </p>
          <Button size="lg" variant="secondary" className="h-14 px-8 text-base rounded-xl" asChild>
            <Link href={`${APP_URL}/sign-up`}>
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
