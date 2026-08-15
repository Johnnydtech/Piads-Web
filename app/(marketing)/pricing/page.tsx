import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Check,
  Home,
  Megaphone,
  QrCode,
  CircleDollarSign,
  Package,
  Tablet,
} from "lucide-react"

export const metadata = {
  title: "Pricing | $10/month per screen, 14-day free trial",
  description:
    "PiAds pricing for short-term rental hosts: 14-day free trial, then $10/month per screen — and a revenue share from local ads that can cover the fee. Local businesses advertise with quarterly radius tiers from $450.",
  alternates: { canonical: "/pricing" },
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const hostFeatures = [
  "WiFi card with scan-to-join QR code",
  "House rules & checkout-day-aware instructions",
  "Local Guide with your favorite nearby spots",
  "Host extras with booking QRs (late checkout, mid-stay clean)",
  "Hostaway connection: greets guests by name, switches modes automatically",
  "Idle mode between stays",
  "Runs on your own Fire or Android tablet",
  "Revenue share from local ads in your guide",
]

const advertiserTiers = [
  {
    name: "Starter",
    price: "$450",
    plays: "~4,000 plays/qtr",
    radius: "Up to 3 km",
    popular: false,
  },
  {
    name: "Growth",
    price: "$1,200",
    plays: "~12,000 plays/qtr",
    radius: "Up to 5 km",
    popular: true,
  },
  {
    name: "Dominate",
    price: "$2,750",
    plays: "~30,000 plays/qtr",
    radius: "Up to 8 km",
    popular: false,
  },
]

const faqs = [
  {
    question: "What hardware do I need?",
    answer:
      "A Fire or Android tablet you already own — the PiAds app is on the Amazon Appstore and Google Play. Managing a larger portfolio? Pre-configured tablet kits are available for larger accounts.",
  },
  {
    question: "How long does setup take?",
    answer:
      "About 10 minutes: create your property, fill in the four cards (WiFi, house rules, local guide, extras), then pair the tablet with a code.",
  },
  {
    question: "How does the personalized greeting work?",
    answer:
      "Connect your Hostaway account and the screen greets each guest by name and switches modes around the stay automatically — welcome on arrival, checkout instructions on checkout day, idle between stays. More PMS integrations are coming.",
  },
  {
    question: "How do I earn from my screen?",
    answer:
      "Local businesses buy ad space in your Local Guide — the \"Recommended Nearby\" cards guests see next to your own picks. You get a revenue share, which can offset or cover the $10/month screen fee.",
  },
  {
    question: "When does billing start?",
    answer:
      "After your 14-day free trial. From then it's $10/month per screen — one flat fee, no tiers for hosts.",
  },
  {
    question: "What do guests see between stays?",
    answer:
      "The screen idles between stays, then switches back to welcome mode when your next guest arrives.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue px-4 py-2 rounded-full mb-8 shadow-md">
            <Home className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Host-first pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            $10 a month.
            <br />
            <span className="text-teal">Or less, once ads kick in.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One flat fee per screen after a 14-day free trial — and a revenue
            share from local ads that can pay it back.
          </p>
        </div>
      </section>

      {/* Host pricing */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display">For Hosts</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
            Everything the guest screen does — WiFi, rules, local guide,
            bookable extras, PMS personalization — in one plan.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main pricing card */}
            <div className="bg-blue text-white rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-orange text-foreground text-sm font-medium px-4 py-1.5 rounded-full">
                  14-day free trial
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
                    <CircleDollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Plus a revenue share on local ads</div>
                    <div className="text-sm text-white/70">
                      Your screen can pay for itself
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {hostFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 flex-shrink-0 text-white mt-1" />
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full rounded-xl h-14 bg-white text-blue hover:bg-white/90 text-lg font-semibold"
                asChild
              >
                <Link href={`${APP_URL}/sign-up`}>
                  Start Free 14-Day Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Rev-share explainer + kit note */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h4 className="text-xl font-semibold font-display mb-4 flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5 text-teal" />
                  How the revenue share works
                </h4>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal/15 text-teal flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-muted-foreground">
                      Local businesses near your rental buy ad space in the
                      Local Guide — shown as &ldquo;Recommended Nearby&rdquo;
                      cards.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal/15 text-teal flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-muted-foreground">
                      Their cards play on your screen alongside your own picks.
                      Guests scan QR codes to act on offers.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal/15 text-teal flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-muted-foreground">
                      You earn a share of that ad revenue — offsetting, and
                      potentially covering, your $10/month fee.
                    </p>
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h4 className="text-lg font-semibold font-display mb-3 flex items-center gap-2">
                  <Tablet className="h-5 w-5 text-blue" />
                  Bring your own tablet
                </h4>
                <p className="text-sm text-muted-foreground">
                  The PiAds app runs on the Fire or Android tablet you already
                  have — it&apos;s on the Amazon Appstore and Google Play.
                  Pre-configured tablet kits are available for larger accounts.
                </p>
              </div>

              <div className="bg-coral/10 border border-coral/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-gray-800 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">
                      Annual plan with tablet kit — coming soon
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pay annually and get a pre-configured tablet shipped to
                      your door. Join the trial now and we&apos;ll let you know
                      when it&apos;s live.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advertiser tiers */}
      <section className="py-24 md:py-32">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal flex items-center justify-center">
              <Megaphone className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              For Local Advertisers
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
            Quarterly radius tiers. Drop a pin, choose a radius, and your
            business appears on every PiAds guest screen in range — measurable
            with QR scans. First market: DC / Arlington / DMV.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {advertiserTiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-3xl p-8 border-2 shadow-sm relative ${
                  tier.popular ? "border-teal ring-2 ring-teal/30" : "border-gray-200"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold font-display mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold font-display">{tier.price}</span>
                  <span className="text-muted-foreground">/qtr</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal flex-shrink-0" />
                    {tier.plays}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal flex-shrink-0" />
                    {tier.radius} radius
                  </li>
                  <li className="flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-teal flex-shrink-0" />
                    QR scan tracking
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="h-14 px-8 text-base rounded-xl bg-teal hover:bg-teal/90 font-bold"
              asChild
            >
              <Link href="/advertisers">
                Learn More About Local Ads
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
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
              <div key={faq.question} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold font-display text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-gray-900 text-white">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Try it free for 14 days
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Set up your first screen in about 10 minutes. $10/month per screen
            after the trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-14 px-8 text-base rounded-xl bg-blue hover:bg-blue/90 font-bold"
              asChild
            >
              <Link href={`${APP_URL}/sign-up`}>
                Start as a Host
                <Home className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base rounded-xl bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href={`${APP_URL}/advertiser/tiers`}>
                Advertise on PiAds
                <Megaphone className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
