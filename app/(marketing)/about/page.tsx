import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Users, Shield, Handshake, Building2, TrendingUp } from "lucide-react"

export const metadata = {
  title: "About | Keeping Advertising Local",
  description: "Learn why we built PiAds - a community-first platform where local businesses advertise to each other, and big corporations aren't welcome.",
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const values = [
  {
    icon: Heart,
    title: "Community-First",
    description: "No big corporations. Only Arlington & Falls Church businesses advertising to local customers. Money stays in the neighborhood.",
    color: "bg-coral",
  },
  {
    icon: Handshake,
    title: "Cooperation Over Competition",
    description: "Venues and advertisers succeed together. When one wins, everyone wins.",
    color: "bg-teal",
  },
  {
    icon: Shield,
    title: "Venue Control",
    description: "Your screens, your rules. Full approval power over every ad that displays.",
    color: "bg-blue",
  },
  {
    icon: Users,
    title: "Fair Revenue",
    description: "Venues keep 75% of ad revenue. We believe in sharing success, not hoarding it.",
    color: "bg-orange",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-coral/20 border border-coral/30 px-4 py-2 rounded-full mb-8">
            <Heart className="h-4 w-4 text-coral" />
            <span className="text-sm font-medium text-coral">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            Keeping Advertising
            <br />
            <span className="text-coral">Local</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We built PiAds because we believe advertising dollars should stay in the community.
            From Clarendon to Columbia Pike, no big corporations — just neighbors supporting neighbors.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 md:py-32 bg-coral text-white">
        <div className="container max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-8">
              <span className="text-sm font-medium">From the Founder</span>
            </div>

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium font-display mb-8 leading-relaxed">
              &ldquo;I saw how big media companies put profit and control over people.
              PiAds is the antidote. A platform where local businesses support
              each other, and advertising dollars stay in the community.&rdquo;
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

      {/* Why We're Different */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium">Why PiAds Exists</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                The Problem We Saw
              </h2>
              <p className="text-muted-foreground mb-4 text-lg">
                Small coffee shops on Clarendon Blvd, CrossFit boxes in Ballston, and restaurants along Columbia Pike
                have screens that could connect them with their neighbors.
                Local personal trainers, plumbers, and yoga studios want to advertise
                but can&apos;t afford $10K billboard campaigns.
              </p>
              <p className="text-muted-foreground mb-4 text-lg">
                Meanwhile, big platforms treat venues as inventory for corporate advertisers.
                Money flows out of the community into the pockets of massive media companies.
              </p>
              <p className="text-muted-foreground text-lg font-medium">
                We flipped the model. On PiAds, venues run their own content first,
                then open slots for local advertisers only. No big corporations welcome.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-coral mb-2">$0</div>
                <div className="font-medium mb-1">stays local with traditional ads</div>
                <div className="text-sm text-muted-foreground">
                  Billboard companies take your money and run national campaigns
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-teal mb-2">100%</div>
                <div className="font-medium mb-1">stays local with PiAds</div>
                <div className="text-sm text-muted-foreground">
                  Local venues earn from local advertisers reaching local customers
                </div>
              </div>
            </div>
          </div>
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
                <value.icon className={`h-10 w-10 mb-6 ${
                  value.color === "bg-blue" || value.color === "bg-teal"
                    ? "text-white/80"
                    : "text-foreground/60"
                }`} />
                <h3 className="text-xl font-semibold font-display mb-2">{value.title}</h3>
                <p className={`text-sm ${
                  value.color === "bg-blue" || value.color === "bg-teal"
                    ? "text-white/80"
                    : "text-muted-foreground"
                }`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works for Both */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Everyone Benefits
            </h2>
            <p className="text-xl text-muted-foreground">
              A marketplace where local businesses help each other grow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-semibold font-display mb-6">Venues Earn</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Run YOUR content: announcements, promos, member spotlights
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Open slots for local advertisers when you want
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Keep 75% of every booking with weekly payouts
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Approve every ad before it goes live
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Turn a cost (screens) into a profit center
                </li>
              </ul>
            </div>
            <div className="bg-teal rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-semibold font-display mb-6">Advertisers Grow</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Reach customers at local gyms, coffee shops, and coworking spaces across Arlington
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Start at $50-75/week with no $10K minimums
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Feel like a &quot;real business&quot; when people say &quot;I saw your ad!&quot;
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Track performance with QR codes and analytics
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Support your neighbors instead of big corporations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Community Promise */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl text-center">
          <Heart className="h-12 w-12 text-coral mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            Our Promise
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We will never allow big corporations on PiAds. No national chains
            drowning out local voices. No venture-backed advertisers outbidding
            the yoga studio down the street.
          </p>
          <p className="text-xl text-muted-foreground">
            This is a platform for the community, by the community.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-blue text-white">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Venues across Ballston, Clarendon, and Falls Church are already keeping advertising local.
            Be part of building something different.
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
