import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/ui/scroll-animate"
import {
  ArrowRight,
  MapPin,
  QrCode,
  TrendingUp,
  Check,
  Target,
  Radius,
  Store,
  Sparkles,
} from "lucide-react"

export const metadata = {
  title: "Local Ads on Short-Term Rental Screens",
  description:
    "Reach travelers the moment they arrive. Your business appears as a Recommended Nearby card on PiAds guest screens in short-term rentals around you — quarterly radius tiers from $450, measurable with QR scans. First market: DC / Arlington / DMV.",
  alternates: { canonical: "/advertisers" },
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const tiers = [
  {
    name: "Starter",
    price: "$450",
    period: "/quarter",
    plays: "~4,000 plays",
    radius: "Up to 3 km radius",
    description: "Get on the screens closest to your door.",
    color: "border-gray-200",
    button: "bg-gray-900 hover:bg-gray-800 text-white",
    popular: false,
  },
  {
    name: "Growth",
    price: "$1,200",
    period: "/quarter",
    plays: "~12,000 plays",
    radius: "Up to 5 km radius",
    description: "Cover your whole neighborhood and the ones next door.",
    color: "border-teal ring-2 ring-teal/30",
    button: "bg-teal hover:bg-teal/90 text-white",
    popular: true,
  },
  {
    name: "Dominate",
    price: "$2,750",
    period: "/quarter",
    plays: "~30,000 plays",
    radius: "Up to 8 km radius",
    description: "Own the area. Maximum reach across every screen in range.",
    color: "border-gray-200",
    button: "bg-blue hover:bg-blue/90 text-white",
    popular: false,
  },
]

const steps = [
  {
    title: "Drop a pin",
    description: "Set your business location in the PiAds advertiser dashboard.",
    icon: MapPin,
  },
  {
    title: "Set your radius",
    description:
      "Choose a tier. Your spots appear as \"Recommended Nearby\" cards on every PiAds guest screen in range.",
    icon: Radius,
  },
  {
    title: "Measure with QR scans",
    description:
      "Every card carries a QR code. See exactly how many guests scanned — no guesswork, no vanity metrics.",
    icon: QrCode,
  },
]

export default function AdvertisersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-blue/10 rounded-full blur-3xl" />
        </div>
        <div className="container max-w-4xl text-center">
          <ScrollAnimate>
            <span className="inline-flex items-center gap-2 bg-teal/10 text-teal font-semibold text-sm px-4 py-2 rounded-full mb-8">
              <Store className="h-4 w-4" />
              For local businesses
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
              Reach travelers
              <br />
              <span className="text-teal">the moment they arrive</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              PiAds screens live inside short-term rentals — Airbnbs and VRBOs
              near you. Your business appears as a{" "}
              <span className="text-foreground font-semibold">
                &ldquo;Recommended Nearby&rdquo;
              </span>{" "}
              card right when guests are deciding where to eat, shop, and go.
            </p>
            <Button
              size="lg"
              className="h-16 px-10 text-lg rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 bg-teal hover:bg-teal/90 font-bold"
              asChild
            >
              <Link href={`${APP_URL}/advertiser/tiers`}>
                Get Started
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4" />
              First market: DC · Arlington · the DMV
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container max-w-6xl">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Pin. Radius. Screens.
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                No creative agencies, no media buyers. Three steps and your
                business is on guest screens across the area.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <ScrollAnimate key={step.title} delay={index * 150}>
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-md border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mb-6">
                    <step.icon className="h-7 w-7 text-teal" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3">{step.title}</h3>
                  <p className="text-lg text-muted-foreground">{step.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>

          {/* Auto-growing reach callout */}
          <ScrollAnimate delay={200}>
            <div className="mt-12 bg-blue rounded-3xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-3">
                    Your reach grows on its own
                  </h3>
                  <p className="text-lg text-white/85">
                    Every new PiAds screen that joins your radius automatically
                    starts showing your spots — at no extra cost. As more hosts
                    in the area turn on screens, your campaign reaches more
                    travelers without you lifting a finger.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Simple quarterly tiers
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Pick a radius, pay per quarter. Estimated plays are based on
                screens currently in range and grow as the network grows.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier, index) => (
              <ScrollAnimate key={tier.name} delay={index * 150} className="h-full">
                <div
                  className={`bg-white rounded-3xl p-8 border-2 ${tier.color} shadow-md h-full flex flex-col relative`}
                >
                  {tier.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold font-display mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold font-display">{tier.price}</span>
                    <span className="text-muted-foreground text-lg">{tier.period}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal/15 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 text-teal" />
                      </div>
                      <span className="font-medium">{tier.plays} per quarter</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal/15 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 text-teal" />
                      </div>
                      <span className="font-medium">{tier.radius}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal/15 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 text-teal" />
                      </div>
                      <span>QR scan tracking</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal/15 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 text-teal" />
                      </div>
                      <span>New screens in range added automatically</span>
                    </li>
                  </ul>
                  <Button
                    className={`w-full rounded-xl h-14 text-lg font-semibold ${tier.button}`}
                    asChild
                  >
                    <Link href={`${APP_URL}/advertiser/tiers`}>
                      Choose {tier.name}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Why guest screens */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container max-w-4xl text-center">
          <ScrollAnimate>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-12">
              Why a screen inside the rental?
            </h2>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimate delay={0}>
              <div className="bg-white rounded-2xl p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-teal/15 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-teal" />
                </div>
                <h3 className="font-semibold font-display mb-2">High-intent audience</h3>
                <p className="text-sm text-muted-foreground">
                  Travelers who just arrived are actively looking for places to
                  eat, drink, and explore — and they don&apos;t know the area yet.
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate delay={150}>
              <div className="bg-white rounded-2xl p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue/15 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-blue" />
                </div>
                <h3 className="font-semibold font-display mb-2">Next to host picks</h3>
                <p className="text-sm text-muted-foreground">
                  Your card sits in the host&apos;s Local Guide — the screen guests
                  check for recommendations, not an ad break they tune out.
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate delay={300}>
              <div className="bg-white rounded-2xl p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-coral/30 flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-6 w-6 text-gray-800" />
                </div>
                <h3 className="font-semibold font-display mb-2">Provable results</h3>
                <p className="text-sm text-muted-foreground">
                  QR scans tell you exactly how many guests responded. Judge
                  the spend on data, not on gut feel.
                </p>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-teal text-white">
        <div className="container text-center max-w-3xl">
          <ScrollAnimate>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Be on the screen when they walk in
            </h2>
            <p className="text-xl text-white/85 mb-4">
              We&apos;re launching in the DC / Arlington / DMV area — early
              advertisers lock in the neighborhood screens around them.
            </p>
            <p className="text-white/70 mb-10">
              Quarterly tiers from $450.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-16 px-10 text-lg rounded-2xl font-bold"
              asChild
            >
              <Link href={`${APP_URL}/advertiser/tiers`}>
                Choose Your Tier
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </ScrollAnimate>
        </div>
      </section>
    </div>
  )
}
