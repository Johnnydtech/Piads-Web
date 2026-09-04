import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Tv,
  Zap,
  DollarSign,
  Wifi,
  Check,
  ArrowRight,
  ShoppingCart,
  Play,
  Sparkles,
} from "lucide-react"

export const metadata = {
  title: "Fire TV Digital Signage",
  description:
    "Run free digital signage on the Fire TV Stick you already own. Pair in minutes, enable approved marketplace ad slots, and keep 70% of cleared ad revenue.",
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

// Live Amazon Appstore listing (approved Aug 2026; APK + Vega in one listing)
const AMAZON_APPSTORE_URL = "https://www.amazon.com/dp/B0GTRC4JTN"
const FIRE_STICK_BUY_URL = "https://www.amazon.com/all-new-amazon-fire-tv-stick-4k-max/dp/B0BP9SNVH9"

const benefits = [
  {
    icon: DollarSign,
    title: "Low cost",
    description: "A $30–60 stick you may already own — no $200+ proprietary signage player.",
  },
  {
    icon: Zap,
    title: "Live in minutes",
    description: "Install PiAds from the Amazon Appstore, enter the pairing code, done.",
  },
  {
    icon: Wifi,
    title: "Managed remotely",
    description: "Update menus, playlists, and schedules from any browser. The stick just plays.",
  },
  {
    icon: Sparkles,
    title: "It pays for itself",
    description: "PiAds screens can run local ads — you keep 70% of every booking.",
  },
]

const steps = [
  {
    n: "1",
    title: "Plug in your Fire TV Stick",
    body: "Any Fire TV Stick (4K recommended) or Fire TV built-in television works. Connect it to Wi-Fi.",
  },
  {
    n: "2",
    title: "Install the PiAds app",
    body: "Search “PiAds” in the Amazon Appstore on the device. Open it and a 6-character pairing code appears on screen.",
  },
  {
    n: "3",
    title: "Pair from your dashboard",
    body: "In app.piads.co, go to Screens → Connect screen, enter the code, and name the screen.",
  },
  {
    n: "4",
    title: "Your content is live",
    body: "Playlists and schedules you set in the dashboard start playing immediately — and keep playing through network hiccups.",
  },
]

const faqs = [
  {
    q: "Which Fire TV devices does PiAds support?",
    a: "Fire TV Stick (Lite, HD, 4K, 4K Max), Fire TV Cube, Fire TV built-in televisions, and the newest generation of Vega-based Fire TV devices. One app, the whole family.",
  },
  {
    q: "Do I need to buy special signage hardware?",
    a: "No. If there's already a Fire TV Stick behind your TV, you're one app install away from digital signage. If not, a stick costs $30–60 on Amazon — compare that to $200–500 proprietary players other platforms require.",
  },
  {
    q: "What happens if the internet drops?",
    a: "The player caches your content and keeps playing. When the connection returns, it syncs any changes automatically.",
  },
  {
    q: "Can the TV still be used as a normal TV?",
    a: "Yes — PiAds is just an app. Exit it and the Fire TV works exactly as before. Most venues leave it running full-time.",
  },
  {
    q: "How does my screen earn money?",
    a: "Local advertisers book slots on your screen through the PiAds marketplace. Your own content always comes first — ads fill the gaps you allow — and you keep 70% of every booking.",
  },
  {
    q: "What does it cost?",
    a: "$0 for participating Partner screens that enable approved marketplace ad slots. You keep 70% of cleared ad revenue.",
  },
]

export default function FireTvPlayerPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-orange/10 text-orange text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Tv className="h-4 w-4" />
            Native Fire TV app
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Digital signage on the Fire TV Stick you already own
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            PiAds runs natively on the entire Fire TV family — sticks, cubes,
            built-in TVs, and the newest Vega devices. Plug in, pair with a
            6-character code, and your screen is live in minutes. Then let it
            earn: PiAds screens run local ads and you keep 70%.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-xl h-14 px-7" asChild>
              <Link href={`${APP_URL}/sign-up?role=venue`}>
                Try PiAds Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl h-14 px-7" asChild>
              <a href={FIRE_STICK_BUY_URL} target="_blank" rel="noopener noreferrer">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Buy a Fire TV Stick 4K
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Already have the stick?{" "}
            <a
              href={AMAZON_APPSTORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline underline-offset-2"
            >
              Get the PiAds app on the Amazon Appstore
            </a>
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-10">
            Why Fire TV is the smartest signage player
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-blue/10 text-blue flex items-center justify-center mb-4">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold font-display mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="container py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-10">
          From box to broadcasting in four steps
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue text-white flex items-center justify-center font-semibold">
                {s.n}
              </div>
              <div>
                <h3 className="font-semibold font-display mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-teal/10 border border-teal/20 rounded-2xl p-6 max-w-4xl">
          <div className="flex items-start gap-3">
            <Play className="h-5 w-5 text-teal mt-1 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">No TV handy to test?</span>{" "}
              PiAds also has a browser-based web player — open it on any laptop,
              pair it the same way, and see your content playing before your
              hardware even arrives.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-10">
            Fire TV signage, answered
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold font-display mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 md:py-24">
        <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Your TV. Your content. Your revenue.
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
            $0 for participating screens with approved ad slots — and your venue
            keeps 70% of cleared revenue.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-xl h-14 px-7" asChild>
              <Link href={`${APP_URL}/sign-up?role=venue`}>
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl h-14 px-7 border-background/30 text-background hover:bg-background/10"
              asChild
            >
              <Link href="/devices">
                <Check className="mr-2 h-5 w-5" />
                See all supported devices
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
