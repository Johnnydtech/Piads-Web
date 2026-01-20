import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Target, Users, Zap, Heart, ArrowRight, Sparkles } from "lucide-react"

export const metadata = {
  title: "About",
  description: "Learn about PiAds - the digital signage advertising marketplace connecting venues with advertisers.",
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const values = [
  {
    icon: Target,
    title: "Simplicity",
    description: "We believe powerful tools should be easy to use. No complex setups or confusing interfaces.",
    color: "bg-blue",
  },
  {
    icon: Users,
    title: "Transparency",
    description: "Clear pricing, honest metrics, and open communication. What you see is what you get.",
    color: "bg-teal",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We're constantly improving our platform to help venues and advertisers succeed.",
    color: "bg-orange",
  },
  {
    icon: Heart,
    title: "Community",
    description: "We're building a marketplace where local businesses thrive together.",
    color: "bg-coral",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-blue" />
            <span className="text-sm font-medium">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            Connecting Screens
            <br />
            <span className="text-blue">with Brands</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            PiAds is the digital signage advertising marketplace that helps
            venue owners monetize their screens while giving advertisers
            access to high-traffic, real-world locations.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Making Digital Advertising Accessible to Everyone
              </h2>
              <p className="text-muted-foreground mb-4 text-lg">
                We started PiAds because we saw an opportunity to democratize
                out-of-home advertising. Small coffee shops, gyms, and restaurants
                have screens that sit idle or show generic content. Meanwhile,
                local businesses struggle to reach customers in their community.
              </p>
              <p className="text-muted-foreground mb-4 text-lg">
                Our platform bridges this gap. We make it easy for any venue to
                turn their displays into a revenue stream, and we give advertisers
                of all sizes access to targeted, location-based advertising.
              </p>
              <p className="text-muted-foreground text-lg">
                Built on affordable Raspberry Pi technology, PiAds brings
                enterprise-level digital signage capabilities to businesses
                of all sizes.
              </p>
            </div>
            <div className="bg-teal rounded-3xl p-10 text-white">
              <blockquote className="text-2xl md:text-3xl font-medium font-display mb-6 leading-relaxed">
                &ldquo;Every screen is an opportunity. Every location is an audience.
                We&apos;re here to connect them.&rdquo;
              </blockquote>
              <p className="text-white/70">— The PiAds Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              What We Believe In
            </h2>
            <p className="text-xl text-muted-foreground">
              Our core values drive everything we do.
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

      {/* How We Help */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Built for Both Sides
            </h2>
            <p className="text-xl text-muted-foreground">
              Benefits for venues and advertisers alike.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-semibold font-display mb-6">For Venue Owners</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Generate passive income from existing screens
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Full control over what ads appear in your venue
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Simple setup with Raspberry Pi technology
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Automated payouts and transparent reporting
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Keep your own content playing between ads
                </li>
              </ul>
            </div>
            <div className="bg-teal rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-semibold font-display mb-6">For Advertisers</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Access to hyper-local advertising opportunities
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Target customers at the point of decision
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Flexible booking by day or daypart
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  Real-time performance tracking
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/60">•</span>
                  No long-term contracts or commitments
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-blue text-white">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Join the PiAds Community
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Whether you&apos;re a venue owner or an advertiser, we&apos;d love to have you
            on the platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-base rounded-xl" asChild>
              <Link href={`${APP_URL}/sign-up`}>
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
