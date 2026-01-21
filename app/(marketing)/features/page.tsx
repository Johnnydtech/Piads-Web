import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Monitor,
  Palette,
  Calendar,
  Image,
  CheckCircle,
  BarChart3,
  Building2,
  TrendingUp,
  Search,
  Target,
  CreditCard,
  LineChart,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export const metadata = {
  title: "Features",
  description: "Explore PiAds features for venue owners and advertisers. Easy screen management, real-time analytics, and powerful advertising tools.",
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const venueFeatures = [
  {
    icon: Monitor,
    title: "Screen Management",
    description: "Add unlimited screens across multiple venues. Works with Raspberry Pi, Android devices, and Fire TV.",
    color: "bg-blue",
  },
  {
    icon: Palette,
    title: "Playlist Builder",
    description: "Create engaging content playlists with drag-and-drop simplicity. Support for images, videos, and more.",
    color: "bg-teal",
  },
  {
    icon: Calendar,
    title: "Daypart Scheduling",
    description: "Set different pricing for breakfast, lunch, and evening slots. Maximize revenue during peak hours.",
    color: "bg-orange",
  },
  {
    icon: Image,
    title: "Media Library",
    description: "Upload and organize your content. Automatic optimization for different screen sizes.",
    color: "bg-coral",
  },
  {
    icon: CheckCircle,
    title: "Ad Approval Workflow",
    description: "Review and approve every ad before it goes live. Maintain brand consistency.",
    color: "bg-cyan",
  },
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    description: "Track earnings, impressions, and performance across all your screens in real-time.",
    color: "bg-blue",
  },
]

const advertiserFeatures = [
  {
    icon: Search,
    title: "Marketplace Discovery",
    description: "Browse hundreds of venue screens filtered by location, audience type, and price.",
    color: "bg-teal",
  },
  {
    icon: Target,
    title: "Audience Targeting",
    description: "Reach customers at coffee shops, gyms, restaurants, and more. Target by demographics and location.",
    color: "bg-orange",
  },
  {
    icon: Calendar,
    title: "Flexible Booking",
    description: "Book by the day or daypart. Choose breakfast for commuters, lunch for professionals, or evening for diners.",
    color: "bg-coral",
  },
  {
    icon: Image,
    title: "Creative Management",
    description: "Upload and manage your ad creatives. Support for images, videos, and dynamic content.",
    color: "bg-cyan",
  },
  {
    icon: CreditCard,
    title: "Simple Checkout",
    description: "Transparent pricing with no hidden fees. Pay per booking with Stripe-secured payments.",
    color: "bg-blue",
  },
  {
    icon: LineChart,
    title: "Performance Tracking",
    description: "Monitor impressions, reach, and engagement. QR code tracking for direct response.",
    color: "bg-teal",
  },
]

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-blue" />
            <span className="text-sm font-medium">Features</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            Powerful Tools for
            <br />
            <span className="text-blue">Venues & Advertisers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Everything you need to manage screens, run campaigns, and track performance
            in one integrated platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 text-base rounded-xl" asChild>
              <Link href={`${APP_URL}/sign-up`}>Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Venues */}
      <section id="venues" className="py-24 md:py-32 bg-secondary/50">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display">For Venues</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
            Turn your screens into a revenue stream. Our platform handles everything
            from advertiser matching to payment processing.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venueFeatures.map((feature) => (
              <div
                key={feature.title}
                className={`${feature.color} rounded-3xl p-8 ${
                  feature.color === "bg-blue" || feature.color === "bg-teal"
                    ? "text-white"
                    : "text-foreground"
                }`}
              >
                <feature.icon className={`h-10 w-10 mb-6 ${
                  feature.color === "bg-blue" || feature.color === "bg-teal"
                    ? "text-white/80"
                    : "text-foreground/60"
                }`} />
                <h3 className="text-xl font-semibold font-display mb-2">{feature.title}</h3>
                <p className={`${
                  feature.color === "bg-blue" || feature.color === "bg-teal"
                    ? "text-white/80"
                    : "text-muted-foreground"
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button size="lg" className="h-14 px-8 text-base rounded-xl" asChild>
              <Link href={`${APP_URL}/sign-up?role=venue`}>
                Start as Venue Owner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Advertisers */}
      <section id="advertisers" className="py-24 md:py-32">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display">For Advertisers</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
            Reach customers at the point of decision. Advertise on screens in coffee shops,
            gyms, restaurants, and more.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertiserFeatures.map((feature) => (
              <div
                key={feature.title}
                className={`${feature.color} rounded-3xl p-8 ${
                  feature.color === "bg-blue" || feature.color === "bg-teal"
                    ? "text-white"
                    : "text-foreground"
                }`}
              >
                <feature.icon className={`h-10 w-10 mb-6 ${
                  feature.color === "bg-blue" || feature.color === "bg-teal"
                    ? "text-white/80"
                    : "text-foreground/60"
                }`} />
                <h3 className="text-xl font-semibold font-display mb-2">{feature.title}</h3>
                <p className={`${
                  feature.color === "bg-blue" || feature.color === "bg-teal"
                    ? "text-white/80"
                    : "text-muted-foreground"
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button size="lg" className="h-14 px-8 text-base rounded-xl bg-teal hover:bg-teal/90" asChild>
              <Link href={`${APP_URL}/sign-up?role=advertiser`}>
                Start as Advertiser
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-blue text-white">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Join the PiAds platform today. Free for venues, pay-per-campaign for advertisers.
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
