import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Handshake, Shield, MapPin, ArrowRight, Megaphone } from "lucide-react"

export const metadata = {
  title: "About | Better Stays, Local Money Kept Local",
  description:
    "Why we built PiAds — a digital concierge for short-term rentals that answers guests' questions, showcases local businesses, and keeps advertising dollars in the neighborhood.",
  alternates: { canonical: "/about" },
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const values = [
  {
    icon: Heart,
    title: "Guests First",
    description:
      "The screen exists to make stays better: WiFi in seconds, clear house rules, and recommendations from someone who actually lives there.",
    color: "bg-coral",
  },
  {
    icon: Handshake,
    title: "Hosts & Local Businesses Win Together",
    description:
      "Local businesses reach travelers the moment they arrive, and hosts share in the ad revenue. Both sides do better because the other exists.",
    color: "bg-teal",
  },
  {
    icon: Shield,
    title: "Your Screen, Your Guide",
    description:
      "The Local Guide is built on your own picks. Ads are clearly labeled 'Recommended Nearby' — never pretending to be your recommendation.",
    color: "bg-blue",
  },
  {
    icon: MapPin,
    title: "Local Money Stays Local",
    description:
      "Ad dollars go from neighborhood businesses to the hosts whose screens carry them — not to national ad networks.",
    color: "bg-orange",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-coral/20 border border-coral/30 px-4 py-2 rounded-full mb-8">
            <Heart className="h-4 w-4 text-coral" />
            <span className="text-sm font-medium text-coral">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            Better stays.
            <br />
            <span className="text-coral">Local money kept local.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            PiAds puts a digital concierge in short-term rentals — so guests get
            answers and great local recommendations, hosts get fewer repeat
            questions and a screen that can pay for itself, and neighborhood
            businesses reach travelers the moment they arrive.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 md:py-32 bg-coral text-white">
        <div className="container max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-8">
              <span className="text-sm font-medium">From the Founder</span>
            </div>

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium font-display mb-8 leading-relaxed">
              &ldquo;Big ad platforms move money out of neighborhoods. PiAds
              moves it back in — local businesses reaching real visitors, on
              screens owned by local hosts.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 p-0.5">
                <Image
                  src="/founder.png"
                  alt="Yohanes Woldegerima"
                  width={64}
                  height={64}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Yohanes Woldegerima</div>
                <div className="text-white/70">Founder, PiAds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PiAds exists */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">Why PiAds Exists</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            The gap we saw
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            Every short-term rental host answers the same questions on repeat —
            the WiFi password, the checkout time, where to get coffee. The
            answers live in binders nobody opens and message threads guests
            don&apos;t reread.
          </p>
          <p className="text-muted-foreground mb-4 text-lg">
            Meanwhile, the restaurants and shops around those rentals have no
            good way to reach travelers — the people most likely to walk in
            tonight — without handing budgets to big ad platforms that keep the
            money and can&apos;t prove results.
          </p>
          <p className="text-muted-foreground text-lg font-medium">
            One screen solves both: a digital concierge that answers guests&apos;
            questions and carries a Local Guide where nearby businesses can be
            discovered — measurably, with a share of the revenue going to the
            host. We&apos;re starting in the DC / Arlington / DMV area, where
            we&apos;re based.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-muted-foreground">
              These aren&apos;t just words. They&apos;re how we build and run PiAds.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className={`${value.color} rounded-3xl p-8 ${
                  value.color === "bg-blue" || value.color === "bg-teal"
                    ? "text-white"
                    : "text-foreground"
                }`}
              >
                <value.icon
                  className={`h-10 w-10 mb-6 ${
                    value.color === "bg-blue" || value.color === "bg-teal"
                      ? "text-white/80"
                      : "text-foreground/60"
                  }`}
                />
                <h3 className="text-xl font-semibold font-display mb-2">{value.title}</h3>
                <p
                  className={`text-sm ${
                    value.color === "bg-blue" || value.color === "bg-teal"
                      ? "text-white/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-blue text-white">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Be part of it
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Set up a guest screen for your rental, or put your business in
            front of the travelers arriving nearby.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-base rounded-xl" asChild>
              <Link href={`${APP_URL}/sign-up`}>
                Start Free 14-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base rounded-xl bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/advertisers">
                Explore Local Ads
                <Megaphone className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
