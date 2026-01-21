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
  Upload,
  ImageIcon,
  Clock,
  Youtube,
  CloudSun,
  Maximize,
  Minimize2,
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
    quote: "My members love seeing our WOD and PR board on the screen. It keeps the energy high and everyone engaged.",
    author: "Coach Bobby K",
    role: "Owner",
    company: "Ballston CrossFit",
    type: "venue",
  },
  {
    quote: "We display our coworking events and community highlights on the TV. Members actually stop and watch. Engagement is way up!",
    author: "Hope",
    role: "Front Desk",
    company: "Venture X Coworking",
    type: "venue",
  },
  {
    quote: "Now our customers see our discounts and services right when they walk in. It's been great for upselling repairs and accessories.",
    author: "Yoseph",
    role: "Owner",
    company: "Millennium Mobile",
    type: "venue",
  },
]


export default function HomePage() {
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [screenshotIndex, setScreenshotIndex] = useState(0)
  const [selectedRole, setSelectedRole] = useState<'venue' | 'advertiser'>('venue')
  const [isRoleAnimating, setIsRoleAnimating] = useState(false)
  const [userSelectedRole, setUserSelectedRole] = useState(false)

  // Demo section state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [imageFit, setImageFit] = useState<'contain' | 'cover'>('cover')
  const [weather, setWeather] = useState<{
    temp: number
    condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'partly-cloudy'
    location: string
  }>({ temp: 72, condition: 'sunny', location: 'Arlington, VA' })

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

  // Demo clock update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch real weather data
  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // Get location name
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        const geoData = await geoRes.json()
        const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || 'Your Location'
        const state = geoData.address?.state ? `, ${geoData.address.state.slice(0, 2).toUpperCase()}` : ''

        // Get weather from Open-Meteo
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
        )
        const weatherData = await weatherRes.json()
        const temp = Math.round(weatherData.current.temperature_2m)
        const code = weatherData.current.weather_code

        // Map weather codes to conditions
        let condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'partly-cloudy' = 'sunny'
        if (code === 0) condition = 'sunny'
        else if (code >= 1 && code <= 3) condition = 'partly-cloudy'
        else if (code >= 45 && code <= 48) condition = 'cloudy'
        else if (code >= 51 && code <= 67) condition = 'rainy'
        else if (code >= 71 && code <= 86) condition = 'snowy'
        else if (code >= 95) condition = 'rainy'

        setWeather({ temp, condition, location: `${city}${state}` })
      } catch (error) {
        console.log('Weather fetch failed, using defaults')
      }
    }

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude)
        },
        () => {
          // Default to Arlington, VA if location denied
          fetchWeather(38.8816, -77.0910)
        }
      )
    } else {
      fetchWeather(38.8816, -77.0910)
    }
  }, [])

  // Demo file handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => setUploadedImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => setUploadedImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

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
                <div className="relative bg-white rounded-b-2xl overflow-hidden shadow-2xl aspect-[1920/1080]">
                  {heroScreenshots.map((screenshot, index) => (
                    <div
                      key={screenshot.src}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === screenshotIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={screenshot.src}
                        alt={screenshot.label}
                        fill
                        className="object-contain"
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

      {/* How It Works + Interactive Demo - Combined Section */}
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
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload your ad and see it live. Three simple steps for venues and advertisers.
              </p>
            </div>
          </ScrollAnimate>

          {/* Interactive Demo - Centered */}
          <div className="max-w-4xl mx-auto mb-16">
            <ScrollAnimate>
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Screen Mockup */}
                <div className="relative flex-1 w-full">
                  {/* Ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue/20 via-transparent to-teal/20 blur-3xl -z-10 scale-110" />

                  {/* TV Frame */}
                  <div className="bg-gray-900 rounded-2xl p-3 md:p-4 shadow-2xl">
                    {/* Screen with zones */}
                    <div className="aspect-video bg-gray-950 rounded-lg overflow-hidden relative grid grid-cols-3 grid-rows-2 gap-1 p-1">
                      {/* Main content zone (2x2) */}
                      <div className="col-span-2 row-span-2 bg-black rounded-md overflow-hidden relative">
                        {uploadedImage ? (
                          <img
                            src={uploadedImage}
                            alt="Your preview"
                            className={`w-full h-full animate-fadeIn ${imageFit === 'cover' ? 'object-cover' : 'object-contain'}`}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-gradient-to-br from-gray-900 to-black">
                            <Tv className="h-8 md:h-10 w-8 md:w-10 mb-2 opacity-40" />
                            <p className="text-xs text-center opacity-60">Your Ad Here</p>
                          </div>
                        )}
                      </div>

                      {/* Side zone 1 - YouTube */}
                      <div className="bg-black rounded-md overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-black" />
                        <iframe
                          src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&loop=1&playlist=jfKfPfyJRdk"
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          title="YouTube Video"
                        />
                        <div className="absolute bottom-1 left-1 bg-red-600 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Youtube className="h-2.5 w-2.5 text-white" />
                          <span className="text-white text-[8px] font-semibold">LIVE</span>
                        </div>
                      </div>

                      {/* Side zone 2 - Weather (Apple-style) */}
                      <div className={`rounded-md flex flex-col items-center justify-center p-2 text-white relative overflow-hidden ${
                        weather.condition === 'sunny' ? 'bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600' :
                        weather.condition === 'partly-cloudy' ? 'bg-gradient-to-b from-sky-400 via-sky-500 to-slate-500' :
                        weather.condition === 'cloudy' ? 'bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600' :
                        weather.condition === 'rainy' ? 'bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700' :
                        'bg-gradient-to-b from-slate-300 via-blue-200 to-slate-400'
                      }`}>
                        {/* Animated Sun */}
                        {(weather.condition === 'sunny' || weather.condition === 'partly-cloudy') && (
                          <div className="absolute -top-2 -right-2 w-14 h-14">
                            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-lg opacity-60 animate-pulse" />
                            <div className="absolute inset-2 bg-yellow-200 rounded-full blur-md opacity-80" />
                          </div>
                        )}

                        {/* Animated Clouds */}
                        {(weather.condition === 'cloudy' || weather.condition === 'partly-cloudy' || weather.condition === 'rainy') && (
                          <>
                            <div className="absolute top-1 -left-4 w-12 h-4 bg-white/40 rounded-full blur-sm animate-cloud-drift" />
                            <div className="absolute top-3 left-2 w-8 h-3 bg-white/30 rounded-full blur-sm animate-cloud-drift-slow" />
                          </>
                        )}

                        {/* Rain drops */}
                        {weather.condition === 'rainy' && (
                          <div className="absolute inset-0 overflow-hidden">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-0.5 h-3 bg-gradient-to-b from-transparent via-blue-200/60 to-blue-300/80 rounded-full animate-rain"
                                style={{
                                  left: `${10 + i * 12}%`,
                                  animationDelay: `${i * 0.15}s`,
                                  animationDuration: `${0.6 + Math.random() * 0.3}s`
                                }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Snow flakes */}
                        {weather.condition === 'snowy' && (
                          <div className="absolute inset-0 overflow-hidden">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-80 animate-snow"
                                style={{
                                  left: `${15 + i * 14}%`,
                                  animationDelay: `${i * 0.3}s`,
                                  animationDuration: `${2 + Math.random()}s`
                                }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Weather icon */}
                        <div className="relative z-10">
                          {weather.condition === 'sunny' && (
                            <svg className="h-5 w-5 text-yellow-200 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="12" r="5" />
                              <g className="animate-spin-slow origin-center" style={{ animationDuration: '20s' }}>
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                  <rect key={angle} x="11" y="1" width="2" height="3" rx="1" transform={`rotate(${angle} 12 12)`} />
                                ))}
                              </g>
                            </svg>
                          )}
                          {weather.condition === 'partly-cloudy' && <CloudSun className="h-5 w-5 drop-shadow-lg" />}
                          {weather.condition === 'cloudy' && (
                            <svg className="h-5 w-5 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6.5 20q-2.275 0-3.887-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.037T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.313 3.188T18.5 20H6.5Z"/>
                            </svg>
                          )}
                          {weather.condition === 'rainy' && (
                            <svg className="h-5 w-5 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 21.5q-.425 0-.713-.288T11 20.5v-2q0-.425.288-.713T12 17.5q.425 0 .713.288t.288.712v2q0 .425-.288.713T12 21.5Zm-4 -2q-.425 0-.713-.288T7 18.5v-2q0-.425.288-.713T8 15.5q.425 0 .713.288t.288.712v2q0 .425-.288.713T8 19.5Zm8 0q-.425 0-.713-.288T15 18.5v-2q0-.425.288-.713T16 15.5q.425 0 .713.288t.288.712v2q0 .425-.288.713T16 19.5ZM6.5 14q-2.275 0-3.887-1.575T1 8.575q0-1.95 1.175-3.475T5.25 3.15Q5.875.85 7.75-.575 9.625-2 12-2q2.925 0 4.963 2.037T19 5q1.725.2 2.863 1.488T23 9.5q0 1.875-1.313 3.188T18.5 14H6.5Z"/>
                            </svg>
                          )}
                          {weather.condition === 'snowy' && <CloudSun className="h-5 w-5 drop-shadow-lg" />}
                        </div>
                        <span className="text-base font-bold leading-none mt-1 relative z-10 drop-shadow-md">{weather.temp}°F</span>
                        <span className="text-[7px] opacity-90 mt-0.5 relative z-10 truncate max-w-full px-1">{weather.location}</span>
                      </div>

                      {/* Clock overlay */}
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5 text-white/70" />
                        <span className="text-white text-[10px] font-mono">
                          {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Live indicator */}
                      <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        <span className="text-white text-[9px] font-semibold">LIVE</span>
                      </div>
                    </div>
                  </div>

                  {/* TV Stand */}
                  <div className="flex justify-center">
                    <div className="w-20 h-5 bg-gray-800 rounded-b-xl shadow-lg" />
                  </div>
                  <div className="flex justify-center -mt-1">
                    <div className="w-36 h-2 bg-gray-700 rounded-full shadow-md" />
                  </div>
                </div>

                {/* Upload Controls */}
                <div className="w-full lg:w-64 flex-shrink-0">
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer group bg-white ${
                      isDragging
                        ? 'border-blue bg-blue/5 scale-[1.02]'
                        : 'border-gray-300 hover:border-blue/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('demo-file-input')?.click()}
                  >
                    <input
                      id="demo-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-105'}`}>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue/10 flex items-center justify-center">
                        <Upload className="h-6 w-6 text-blue" />
                      </div>
                      <p className="font-semibold text-sm mb-1">Try it now!</p>
                      <p className="text-muted-foreground text-xs mb-3">Drop image or click</p>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-xs text-muted-foreground">
                        <ImageIcon className="h-3 w-3" />
                        JPG, PNG
                      </div>
                    </div>
                    {uploadedImage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setUploadedImage(null)
                        }}
                        className="absolute top-2 right-2 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Fit/Contain Toggle */}
                  {uploadedImage && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <div className="inline-flex rounded-full bg-white border p-0.5">
                        <button
                          onClick={() => setImageFit('cover')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            imageFit === 'cover' ? 'bg-blue text-white' : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Maximize className="h-3 w-3" />
                          Fill
                        </button>
                        <button
                          onClick={() => setImageFit('contain')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            imageFit === 'contain' ? 'bg-blue text-white' : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Minimize2 className="h-3 w-3" />
                          Fit
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-center text-xs text-muted-foreground mt-3">
                    {uploadedImage ? '✨ Looking great!' : 'Multi-zone layout'}
                  </p>
                </div>
              </div>
            </ScrollAnimate>
          </div>

          {/* Venue & Advertiser Cards */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* For Venues */}
            <ScrollAnimate animation="left">
              <div className="bg-blue rounded-3xl p-8 md:p-10 text-white h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-semibold font-display">For Venues</h3>
                </div>
                <div className="space-y-4">
                  {howItWorks.venues.map((item, index) => (
                    <div key={item.step} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-0.5">{item.title}</h4>
                        <p className="text-white/70 text-xs">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-white/70 text-sm">Platform fee</span>
                    <p className="font-bold text-lg">$10/screen/mo</p>
                  </div>
                  <Button variant="secondary" className="rounded-full" asChild>
                    <Link href={`${APP_URL}/sign-up?role=venue`}>
                      Start Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollAnimate>

            {/* For Advertisers */}
            <ScrollAnimate animation="right">
              <div className="bg-teal rounded-3xl p-8 md:p-10 text-white h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-semibold font-display">For Advertisers</h3>
                </div>
                <div className="space-y-4">
                  {howItWorks.advertisers.map((item, index) => (
                    <div key={item.step} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-0.5">{item.title}</h4>
                        <p className="text-white/70 text-xs">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-white/70 text-sm">Start from</span>
                    <p className="font-bold text-lg">$50/week</p>
                  </div>
                  <Button variant="secondary" className="rounded-full" asChild>
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

      {/* Wave Divider */}
      <div className="relative overflow-hidden bg-secondary/50">
        <svg
          className="w-[200%] h-12 md:h-16 text-white animate-wave"
          viewBox="0 0 2880 60"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,30 C360,60 1080,0 1440,30 C1800,60 2520,0 2880,30 L2880,60 L0,60 Z" />
        </svg>
      </div>

      {/* Testimonials */}
      <section className="pt-16 pb-24 md:pt-20 md:pb-32 relative overflow-hidden">
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
                Real stories from local venues in Arlington & Falls Church.
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
