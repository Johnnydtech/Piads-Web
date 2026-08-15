import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/ui/scroll-animate"
import { GuestScreenPreview } from "@/components/guest-screen-preview"
import {
  ArrowRight,
  Wifi,
  ClipboardList,
  MapPin,
  Sparkles,
  QrCode,
  Tablet,
  CheckCircle2,
  UserCheck,
  Clock,
  Store,
  CircleDollarSign,
  ListChecks,
  Link2,
  Megaphone,
} from "lucide-react"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const guestCards = [
  {
    title: "WiFi, Solved",
    description:
      "A WiFi card with a scan-to-join QR code. Guests connect in seconds — no more \"what's the password?\" messages.",
    color: "bg-blue",
    textColor: "text-white",
    icon: Wifi,
  },
  {
    title: "House Rules & Checkout",
    description:
      "Rules and checkout instructions, always visible. The screen is checkout-day aware, so instructions surface exactly when guests need them.",
    color: "bg-teal",
    textColor: "text-white",
    icon: ClipboardList,
  },
  {
    title: "Your Local Guide",
    description:
      "Your favorite nearby spots — the coffee shop, the taco place, the trail. The recommendations guests actually ask for, on screen.",
    color: "bg-orange",
    textColor: "text-gray-800",
    icon: MapPin,
  },
  {
    title: "Host Extras That Sell",
    description:
      "Offer late checkout or a mid-stay clean with a booking QR right on the screen. Guests scan, you earn.",
    color: "bg-coral",
    textColor: "text-gray-800",
    icon: Sparkles,
  },
]

const howItWorks = [
  {
    step: "1",
    title: "Create your property",
    description: "Sign up and add your rental in the PiAds dashboard.",
    icon: ListChecks,
  },
  {
    step: "2",
    title: "Fill the 4 cards",
    description: "WiFi, house rules, your local guide, and any extras you offer.",
    icon: ClipboardList,
  },
  {
    step: "3",
    title: "Pair your tablet",
    description:
      "Install the PiAds app on a Fire or Android tablet, enter the pairing code, and you're live.",
    icon: Tablet,
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-28 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-teal/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-coral/10 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-12 items-center">
            {/* Left — copy + CTAs */}
            <div>
              <ScrollAnimate animation="up">
                <span className="inline-flex items-center gap-2 bg-blue/10 text-blue font-semibold text-sm px-4 py-2 rounded-full mb-6">
                  <Tablet className="h-4 w-4" />
                  Built for Airbnb &amp; VRBO hosts
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-display">
                  The digital concierge for{" "}
                  <span className="text-blue relative inline-block">
                    your rental
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-blue/30"
                      viewBox="0 0 200 12"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,8 Q50,0 100,8 T200,8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="animate-draw-curve"
                      />
                    </svg>
                  </span>
                </h1>
              </ScrollAnimate>

              <ScrollAnimate animation="up" delay={200}>
                <p className="text-2xl md:text-3xl text-foreground mb-3 leading-snug font-display font-medium">
                  An always-on guest screen by the door — WiFi, house rules,
                  your local guide, and extras guests can book.
                </p>
                <p className="text-xl text-muted-foreground mb-8 font-display">
                  And local businesses pay to appear in your guide, so{" "}
                  <span className="text-foreground font-semibold">
                    your screen can pay for itself.
                  </span>
                </p>
              </ScrollAnimate>

              <ScrollAnimate animation="up" delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    size="lg"
                    className="h-16 px-8 sm:px-10 text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold bg-blue hover:bg-blue/90"
                    asChild
                  >
                    <Link href={`${APP_URL}/sign-up`}>
                      Start Free 14-Day Trial
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-16 px-8 sm:px-10 text-lg rounded-2xl font-bold"
                    asChild
                  >
                    <Link href="/advertisers">
                      <Megaphone className="mr-3 h-5 w-5" />
                      I&apos;m a Local Business
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>
                      <strong className="text-foreground">$10</strong>/month per screen after trial
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Works on your own Fire or Android tablet
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Setup in about 10 minutes
                  </span>
                </div>
              </ScrollAnimate>
            </div>

            {/* Right — guest screen mockup */}
            <ScrollAnimate animation="scale" delay={300}>
              <GuestScreenPreview />
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* What guests see — 4 cards */}
      <section className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.06] -z-10 pointer-events-none animate-drift-full">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={600}
            height={600}
            className="w-[400px] md:w-[500px] h-auto"
          />
        </div>
        <div className="container">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Everything guests ask, answered on screen
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Four cards cover the questions every host answers over and over
                — set them once, done.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guestCards.map((card, index) => (
              <ScrollAnimate key={card.title} delay={index * 100}>
                <div
                  className={`${card.color} rounded-3xl p-8 hover-lift cursor-default h-full min-h-[260px] flex flex-col justify-end`}
                >
                  <card.icon className={`h-10 w-10 mb-4 ${card.textColor} opacity-80`} />
                  <h3 className={`text-2xl font-bold font-display mb-3 ${card.textColor}`}>
                    {card.title}
                  </h3>
                  <p className={`text-base ${card.textColor} opacity-80`}>
                    {card.description}
                  </p>
                </div>
              </ScrollAnimate>
            ))}
          </div>

          {/* Personalization strip */}
          <ScrollAnimate delay={200}>
            <div className="mt-12 bg-gray-900 text-white rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                <div className="w-16 h-16 rounded-2xl bg-blue flex items-center justify-center shrink-0">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-3">
                    &ldquo;Welcome, Sarah&rdquo; — automatically
                  </h3>
                  <p className="text-lg text-white/80 mb-4">
                    Connect Hostaway and the screen greets each guest by name
                    and switches modes around the stay on its own: welcome on
                    arrival, checkout instructions on checkout day, and a calm
                    idle screen between stays.
                  </p>
                  <p className="text-sm text-white/50">
                    Hostaway today — more PMS integrations coming.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* How it works — 3 steps */}
      <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden scroll-mt-24">
        <div className="absolute left-0 bottom-0 opacity-[0.08] -z-10 pointer-events-none animate-drift-full-reverse">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={800}
            height={800}
            className="w-[500px] md:w-[700px] h-auto"
          />
        </div>
        <div className="container max-w-6xl">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Live in about 10 minutes
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                No special hardware to buy. The PiAds app runs on the Fire or
                Android tablet you already have — it&apos;s on the Amazon
                Appstore and Google Play.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((item, index) => (
              <ScrollAnimate key={item.step} delay={index * 150}>
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-md border border-gray-100 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue text-white flex items-center justify-center text-xl font-bold font-display shrink-0">
                      {item.step}
                    </div>
                    <item.icon className="h-8 w-8 text-blue/60" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-3">{item.title}</h3>
                  <p className="text-lg text-muted-foreground">{item.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>

          <ScrollAnimate delay={300}>
            <p className="text-center text-muted-foreground mt-10 text-lg">
              Managing a larger portfolio? Pre-configured tablet kits are
              available for larger accounts —{" "}
              <Link href="/contact" className="text-blue font-medium hover:underline">
                get in touch
              </Link>
              .
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* Revenue share strip */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <ScrollAnimate animation="left">
              <span className="inline-flex items-center gap-2 bg-teal/10 text-teal font-semibold text-sm px-4 py-2 rounded-full mb-6">
                <CircleDollarSign className="h-4 w-4" />
                Revenue share for hosts
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                Your screen can{" "}
                <span className="text-teal">pay for itself</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Local businesses buy ad space in your Local Guide — the
                &ldquo;Recommended Nearby&rdquo; cards guests see alongside your
                own picks. You get a share of that revenue, on every screen you
                run.
              </p>
              <ul className="space-y-3 mb-8 text-lg">
                <li className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-teal shrink-0" />
                  <span>Ads come from nearby businesses, not random brands</span>
                </li>
                <li className="flex items-center gap-3">
                  <QrCode className="h-5 w-5 text-teal shrink-0" />
                  <span>Guests scan QR codes to act on offers — measurable, not guesswork</span>
                </li>
                <li className="flex items-center gap-3">
                  <CircleDollarSign className="h-5 w-5 text-teal shrink-0" />
                  <span>Your revenue share offsets the $10/month screen fee</span>
                </li>
              </ul>
              <Button
                size="lg"
                className="h-14 px-8 text-base rounded-xl bg-teal hover:bg-teal/90 font-bold"
                asChild
              >
                <Link href="/pricing">
                  See How the Math Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </ScrollAnimate>

            <ScrollAnimate animation="right">
              <div className="bg-teal rounded-3xl p-8 md:p-12 text-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Megaphone className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-display">
                    Own a local business?
                  </h3>
                </div>
                <p className="text-lg text-white/85 mb-6">
                  Put your restaurant, cafe, or shop in front of travelers the
                  moment they arrive. Drop a pin, set a radius, and your spot
                  appears on every PiAds guest screen in range — starting in
                  the DC / Arlington area.
                </p>
                <ul className="space-y-2 mb-8 text-white/90">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    Quarterly radius tiers from $450
                  </li>
                  <li className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 shrink-0" />
                    New screens in your radius join automatically
                  </li>
                  <li className="flex items-center gap-2">
                    <QrCode className="h-4 w-4 shrink-0" />
                    Track results with QR scans
                  </li>
                </ul>
                <Button
                  variant="secondary"
                  className="rounded-full h-12 px-6 text-base font-bold"
                  asChild
                >
                  <Link href="/advertisers">
                    Explore Local Ads
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Between-stays note + trial CTA */}
      <section className="py-28 md:py-36 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-teal blur-3xl" />
        </div>
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none animate-drift-full-reverse">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={500}
            height={500}
            className="w-[300px] md:w-[400px] h-auto"
          />
        </div>

        <div className="container text-center max-w-4xl relative">
          <ScrollAnimate>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-8">
              Give your guests a better stay
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={100}>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-medium">
              Fewer repeat questions. Better local recommendations. A screen
              that earns its keep.
            </p>
            <div className="flex flex-wrap justify-center gap-4 my-8">
              <span className="bg-white/10 border border-white/20 text-white font-bold text-xl px-6 py-3 rounded-full">
                14-day free trial
              </span>
              <span className="bg-white/10 border border-white/20 text-white font-bold text-xl px-6 py-3 rounded-full">
                Then $10/month per screen
              </span>
            </div>
            <p className="text-xl text-white/60 mb-10 flex items-center justify-center gap-2">
              <Clock className="h-5 w-5" />
              Setup takes about 10 minutes
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-16 px-10 text-lg rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 bg-blue hover:bg-blue/90 font-bold"
                asChild
              >
                <Link href={`${APP_URL}/sign-up`}>
                  Start Free 14-Day Trial
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="h-16 px-10 text-lg rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 bg-teal hover:bg-teal/90 font-bold"
                asChild
              >
                <Link href="/advertisers">
                  <Megaphone className="mr-3 h-6 w-6" />
                  Advertise on PiAds
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </div>
  )
}
