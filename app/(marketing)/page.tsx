"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollAnimate, StaggerChildren } from "@/components/ui/scroll-animate"
import { CountUp } from "@/components/ui/count-up"
import {
  Monitor,
  TrendingUp,
  Building2,
  ArrowRight,
  Play,
  Sparkles,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Users,
  DollarSign,
  Tv,
  Megaphone,
  ChevronDown,
  Ban,
  CircleDollarSign,
  Handshake,
  MapPin,
} from "lucide-react"
import { CurrencyCircleDollar, MapPinArea, PlayCircle } from "@phosphor-icons/react"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const rotatingHeadlines = [
  "Your Community",
  "Your Revenue",
  "Your Content",
  "Your Network",
]

// CMS Screenshots for hero
const heroScreenshots = [
  { src: "/cms-screenshots/hero-dashboard.png", label: "Manage Screens" },
  { src: "/cms-screenshots/hero-marketplace.png", label: "Browse Venues" },
]

const stats = [
  { label: "Active Screens", value: 10, suffix: "+", color: "text-blue" },
  { label: "Monthly Impressions", value: 50, suffix: "K+", color: "text-teal" },
  { label: "Kept Local", value: 100, suffix: "%", color: "text-coral" },
]

const partnerVenues = [
  { name: "Ballston CrossFit", location: "Arlington", type: "Gym" },
  { name: "Venture X", location: "Arlington", type: "Coworking" },
  { name: "Millennium Mobile", location: "Falls Church", type: "Retail" },
  { name: "The Lux Scents", location: "Arlington", type: "Restaurant" },
]

const features = [
  {
    title: "Your Content First",
    description: "Display your own announcements, promotions, and member spotlights. Ads fill the gaps.",
    color: "bg-blue",
    textColor: "text-white",
    icon: Tv,
  },
  {
    title: "75% Revenue Share",
    description: "You keep 75% of every ad booking. The highest in the industry.",
    color: "bg-teal",
    textColor: "text-white",
    icon: DollarSign,
  },
  {
    title: "Local Only",
    description: "Only local businesses can advertise. No big corporations drowning out your neighbors.",
    color: "bg-orange",
    textColor: "text-gray-800",
    icon: ShieldCheck,
  },
  {
    title: "Simple Pricing",
    description: "$10/screen/month. That's it. No tiers, no hidden fees, no surprises.",
    color: "bg-coral",
    textColor: "text-gray-800",
    icon: CheckCircle2,
  },
  {
    title: "Full Control",
    description: "Approve every ad before it goes live. Your venue, your rules.",
    color: "bg-cyan",
    textColor: "text-gray-800",
    icon: ShieldCheck,
  },
  {
    title: "Community Network",
    description: "Join venues supporting local businesses. Money stays in the neighborhood.",
    color: "bg-blue",
    textColor: "text-white",
    icon: Users,
  },
]

const howItWorks = {
  venues: [
    { step: "01", title: "Display Your Content", description: "Show your own announcements, schedules, and promotions" },
    { step: "02", title: "Open Slots for Locals", description: "Let local businesses advertise during available times" },
    { step: "03", title: "Keep 75%", description: "Earn passive income while supporting your community" },
  ],
  advertisers: [
    { step: "01", title: "Browse Local Venues", description: "Find screens at gyms, cafes, and shops near you" },
    { step: "02", title: "Book for $50-75/week", description: "Affordable entry with no $10K minimums like the big guys" },
    { step: "03", title: "Feel Legitimate", description: "\"I saw your ad!\" are the best words a business can hear" },
  ],
}

const testimonials = [
  {
    quote: "My members love seeing our WOD and PR board on the screen. The ad revenue covers my cleaning service each month.",
    author: "Marcus Chen",
    role: "Owner",
    company: "CrossFit Box",
    type: "venue",
  },
  {
    quote: "Someone came in and said 'I saw your ad at the gym!' That's when I knew my business was real.",
    author: "Jenna Park",
    role: "Health Coach",
    company: "Local Wellness",
    type: "advertiser",
  },
  {
    quote: "No algorithms, no complexity. My ad plays at the coworking space and I get calls. Simple.",
    author: "Ray Martinez",
    role: "Owner",
    company: "Local Plumbing Co",
    type: "advertiser",
  },
]


export default function HomePage() {
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [screenshotIndex, setScreenshotIndex] = useState(0)
  const [selectedRole, setSelectedRole] = useState<'venue' | 'advertiser'>('venue')
  const [isRoleAnimating, setIsRoleAnimating] = useState(false)
  const [userSelectedRole, setUserSelectedRole] = useState(false)

  // FIX #4: Slow down rotating headline to 4.5s (was 3s)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setHeadlineIndex((prev) => (prev + 1) % rotatingHeadlines.length)
        setIsAnimating(false)
      }, 500)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate role selector (synced with header badge at 4s)
  // Only auto-rotate if user hasn't manually selected
  useEffect(() => {
    if (userSelectedRole) return

    const interval = setInterval(() => {
      setIsRoleAnimating(true)
      setTimeout(() => {
        setSelectedRole((prev) => prev === 'venue' ? 'advertiser' : 'venue')
        setIsRoleAnimating(false)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [userSelectedRole])

  // Screenshot rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setScreenshotIndex((prev) => (prev + 1) % heroScreenshots.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleRoleSelect = (role: 'venue' | 'advertiser') => {
    setUserSelectedRole(true)
    setSelectedRole(role)
  }

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-teal/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-coral/10 rounded-full blur-3xl" />
        </div>

        {/* Large background logo */}
        <div className="absolute right-0 top-20 opacity-[0.08] -z-10 pointer-events-none animate-drift-full">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={800}
            height={800}
            className="w-[400px] md:w-[600px] lg:w-[800px] h-auto"
          />
        </div>

        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <ScrollAnimate animation="up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-display">
                Your Screens.
                <br />
                <span className="text-blue relative inline-block min-w-[280px] md:min-w-[380px]">
                  <span
                    className={`inline-block transition-all duration-500 ${
                      isAnimating
                        ? "opacity-0 translate-y-8"
                        : "opacity-100 translate-y-0"
                    }`}
                  >
                    {rotatingHeadlines[headlineIndex]}
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
            </ScrollAnimate>

            <ScrollAnimate animation="up" delay={200}>
              <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
                Run your own content <span className="font-semibold text-foreground">AND</span> earn from local advertisers.
              </p>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                No big corporations. Just neighbors supporting neighbors.
              </p>
            </ScrollAnimate>

            {/* FIX #5: Role-specific signup toggle */}
            <ScrollAnimate animation="up" delay={300}>
              <div className="flex flex-col items-center gap-4">
                {/* Role selector */}
                <div className="inline-flex rounded-full bg-white/80 backdrop-blur-sm p-1.5 mb-4 shadow-lg border border-gray-200/50">
                  <button
                    onClick={() => handleRoleSelect('venue')}
                    className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                      userSelectedRole && selectedRole === 'venue'
                        ? 'bg-blue text-white shadow-lg shadow-blue/30'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Building2 className="inline h-4 w-4 mr-2" />
                    I&apos;m a Venue
                  </button>
                  <button
                    onClick={() => handleRoleSelect('advertiser')}
                    className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                      userSelectedRole && selectedRole === 'advertiser'
                        ? 'bg-teal text-white shadow-lg shadow-teal/30'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Megaphone className="inline h-4 w-4 mr-2" />
                    I&apos;m an Advertiser
                  </button>
                </div>

                {/* Primary CTA based on role - only shows after user selects */}
                <div className={`transition-all duration-500 ${userSelectedRole ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none h-0'}`}>
                  <Button
                    size="lg"
                    className={`h-16 px-12 text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold ${
                      selectedRole === 'advertiser' ? 'bg-teal hover:bg-teal/90' : 'bg-blue hover:bg-blue/90'
                    }`}
                    asChild
                  >
                    <Link href={`${APP_URL}/sign-up?role=${selectedRole}`}>
                      {selectedRole === 'venue' ? 'Start Earning · $10/screen' : 'Browse Venues · from $50/week'}
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* See How It Works → anchor scroll */}
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue transition-all mt-4 group bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-gray-200/50 hover:border-blue/30 hover:shadow-md"
                >
                  <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  See how it works
                  <ChevronDown className="h-4 w-4 animate-bounce" />
                </a>
              </div>
            </ScrollAnimate>
          </div>

          {/* Product Screenshot */}
          <ScrollAnimate animation="scale" delay={400}>
            <div className="relative mt-16 mx-auto max-w-[1400px] px-4">
              <div className="animate-float-slow">
                {/* Browser Chrome */}
                <div className="bg-slate-800 rounded-t-2xl px-4 py-3 flex items-center gap-2 shadow-2xl">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-slate-700 rounded-lg h-7 px-4 flex items-center justify-center">
                      <span className="text-slate-400 text-sm">app.piads.co</span>
                    </div>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative bg-white rounded-b-2xl overflow-hidden shadow-2xl">
                  {heroScreenshots.map((screenshot, index) => (
                    <div
                      key={screenshot.src}
                      className={`transition-opacity duration-700 ${
                        index === screenshotIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                      }`}
                    >
                      <Image
                        src={screenshot.src}
                        alt={screenshot.label}
                        width={1920}
                        height={1080}
                        className="w-full h-auto"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Screenshot indicator dots - outside floating animation */}
              <div className="flex justify-center gap-2 mt-6">
                {heroScreenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setScreenshotIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === screenshotIndex
                        ? 'bg-blue w-8'
                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={screenshot.label}
                  />
                ))}
              </div>
            </div>
          </ScrollAnimate>

          {/* Value props below screenshot */}
          <ScrollAnimate animation="up" delay={500}>
            <div className="flex flex-wrap justify-center gap-4 mt-12 px-4">
              <div className="bg-coral rounded-full px-6 py-3 flex items-center gap-3 shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <CurrencyCircleDollar weight="fill" className="w-6 h-6 text-white" />
                <span className="text-white font-bold text-lg">75% Revenue</span>
              </div>

              <div className="bg-blue rounded-full px-6 py-3 flex items-center gap-3 shadow-lg shadow-blue/25 hover:shadow-xl hover:shadow-blue/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <MapPinArea weight="fill" className="w-6 h-6 text-white" />
                <span className="text-white font-bold text-lg">Local Only</span>
              </div>

              <div className="bg-teal rounded-full px-6 py-3 flex items-center gap-3 shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <PlayCircle weight="fill" className="w-6 h-6 text-white" />
                <span className="text-white font-bold text-lg">Your Content First</span>
              </div>
            </div>
          </ScrollAnimate>

        </div>
      </section>

      {/* Animated Wave Divider */}
      <div className="relative -mt-8 overflow-hidden">
        <svg
          className="w-[200%] h-12 md:h-16 text-secondary/30 animate-wave"
          viewBox="0 0 2880 60"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,30 C360,60 1080,0 1440,30 C1800,60 2520,0 2880,30 L2880,60 L0,60 Z" />
        </svg>
      </div>

      {/* Stats + Trusted By Section */}
      <section className="bg-secondary/30 pt-12 pb-16 overflow-hidden">
        <div className="container mb-12">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className={`text-4xl md:text-5xl font-bold font-display ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted By - Logo carousel */}
        <div className="container">
          <ScrollAnimate>
            <p className="text-center text-sm text-muted-foreground mb-8">
              Growing in Arlington & Falls Church
            </p>
          </ScrollAnimate>
        </div>
        <div className="relative">
          <div className="flex animate-slide-logos whitespace-nowrap">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-20 px-10">
                {partnerVenues.map((venue, i) => (
                  <div
                    key={`${setIndex}-${i}`}
                    className="flex items-center justify-center min-w-[180px] grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    <div className="text-center">
                      <span className="text-xl font-bold text-gray-800 whitespace-nowrap">{venue.name}</span>
                      <span className="block text-xs text-muted-foreground mt-0.5">{venue.type} • {venue.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Founder Quote */}
      <section className="py-16 md:py-24">
        <div className="container">
          <ScrollAnimate>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <blockquote className="text-lg md:text-xl text-center mb-6 leading-relaxed">
                  &ldquo;I saw how big media companies put profit before people.
                  PiAds flips that. Local businesses supporting each other.&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral via-blue to-teal p-0.5">
                    <Image
                      src="/founder.png"
                      alt="Yohanes Woldegerima"
                      width={56}
                      height={56}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Yohanes Woldegerima</div>
                    <div className="text-sm text-muted-foreground">Founder, PiAds</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Features - Colorful cards grid */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Large background logo */}
        <div className="absolute left-0 bottom-0 opacity-[0.10] -z-10 pointer-events-none animate-drift-full-reverse">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={800}
            height={800}
            className="w-[500px] md:w-[700px] h-auto"
          />
        </div>
        <div className="container">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Built for Local Businesses
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Simple tools for venues and advertisers. No enterprise complexity.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ScrollAnimate key={feature.title} delay={index * 100}>
                <div
                  className={`${feature.color} rounded-3xl p-8 hover-lift cursor-default h-full min-h-[200px] flex flex-col justify-end`}
                >
                  <feature.icon className={`h-8 w-8 mb-4 ${feature.textColor} opacity-80`} />
                  <h3 className={`text-xl font-semibold font-display mb-2 ${feature.textColor}`}>
                    {feature.title}
                  </h3>
                  <p className={`${feature.textColor} opacity-80`}>
                    {feature.description}
                  </p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - with anchor ID */}
      <section id="how-it-works" className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden scroll-mt-24">
        {/* Background logo */}
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
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground">
                Three simple steps for venues and advertisers.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* For Venues */}
            <ScrollAnimate animation="left">
              <div className="bg-blue rounded-3xl p-8 md:p-10 text-white h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-semibold font-display">For Venues</h3>
                </div>
                <div className="space-y-6">
                  {howItWorks.venues.map((item, index) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-white/70 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/70">Platform fee:</span>
                    <span className="font-bold text-xl">$10/screen/month</span>
                  </div>
                  <Button variant="secondary" className="w-full rounded-full" asChild>
                    <Link href={`${APP_URL}/sign-up?role=venue`}>
                      Start as Venue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollAnimate>

            {/* For Advertisers */}
            <ScrollAnimate animation="right">
              <div className="bg-teal rounded-3xl p-8 md:p-10 text-white h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-semibold font-display">For Advertisers</h3>
                </div>
                <div className="space-y-6">
                  {howItWorks.advertisers.map((item, index) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-white/70 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/70">Start advertising:</span>
                    <span className="font-bold text-xl">$50-75/week</span>
                  </div>
                  <Button variant="secondary" className="w-full rounded-full" asChild>
                    <Link href={`${APP_URL}/sign-up?role=advertiser`}>
                      Browse Venues
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background logo */}
        <div className="absolute right-10 bottom-10 opacity-[0.05] -z-10 pointer-events-none animate-drift-full">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={500}
            height={500}
            className="w-[300px] md:w-[400px] h-auto"
          />
        </div>
        <div className="container">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                From Our Community
              </h2>
              <p className="text-xl text-muted-foreground">
                Real stories from venues and advertisers.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimate key={testimonial.author} delay={index * 150}>
                <div className="bg-white rounded-3xl p-8 shadow-sm hover-lift h-full flex flex-col border border-gray-100">
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                      testimonial.type === 'venue'
                        ? 'bg-blue/10 text-blue'
                        : 'bg-teal/10 text-teal'
                    }`}>
                      {testimonial.type === 'venue' ? (
                        <>
                          <Building2 className="h-3 w-3" />
                          Venue
                        </>
                      ) : (
                        <>
                          <Megaphone className="h-3 w-3" />
                          Advertiser
                        </>
                      )}
                    </span>
                  </div>
                  <blockquote className="text-lg mb-6 leading-relaxed flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue to-teal flex items-center justify-center text-white font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-blue text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-teal blur-3xl" />
        </div>
        {/* Animated logo */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none animate-drift-full-reverse">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={500}
            height={500}
            className="w-[300px] md:w-[400px] h-auto"
          />
        </div>

        <div className="container text-center max-w-3xl relative">
          <ScrollAnimate>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Be Part of the Founding Community
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={100}>
            <p className="text-xl text-white/80 mb-4">
              Early venues are already keeping advertising local in Arlington & Falls Church.
            </p>
            <p className="text-lg text-white/60 mb-10">
              $10/screen for venues. $50-75/week for advertisers. No big corporations.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-base rounded-xl shadow-lg hover:scale-105 transition-all duration-300" asChild>
                <Link href={`${APP_URL}/sign-up?role=venue`}>
                  <Building2 className="mr-2 h-5 w-5" />
                  Join as Venue
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl bg-transparent border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300" asChild>
                <Link href={`${APP_URL}/sign-up?role=advertiser`}>
                  <Megaphone className="mr-2 h-5 w-5" />
                  Join as Advertiser
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </div>
  )
}
