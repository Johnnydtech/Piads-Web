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
  MoreVertical,
  Eye,
  ExternalLink,
  Activity,
  RefreshCw,
  Settings,
  Unplug,
  Trash2,
  Plus,
  X,
  Terminal,
  Wifi,
  Zap,
  HardDrive,
  Info,
  Check,
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
  { label: "Arlington Neighborhoods", value: 4, suffix: "+", color: "text-blue" },
  { label: "Local Businesses Connected", value: 10, suffix: "+", color: "text-teal" },
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
    description: "Join venues across Clarendon, Ballston, and Columbia Pike. Money stays in the neighborhood.",
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
  const [showDemoMenu, setShowDemoMenu] = useState(false)
  const [showDeviceHealth, setShowDeviceHealth] = useState(false)
  const [showConnectScreen, setShowConnectScreen] = useState(false)
  const [showWebPlayerHelp, setShowWebPlayerHelp] = useState(false)
  const [selectedPlayerType, setSelectedPlayerType] = useState<'web' | 'firetv' | 'android' | 'pi'>('web')
  const [showPairingPage, setShowPairingPage] = useState(false)
  const [demoPairingCode] = useState('ABC-123-XY')
  const [enteredPairingCode, setEnteredPairingCode] = useState('')
  const [isScreenConnected, setIsScreenConnected] = useState(false)
  const [showMediaUpload, setShowMediaUpload] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [imageFitMode, setImageFitMode] = useState<'cover' | 'contain'>('cover')

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
              <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed font-display">
                Run your own content <span className="font-semibold text-foreground">AND</span> earn from local advertisers.
              </p>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto font-display">
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
              Growing across Ballston, Clarendon, Columbia Pike & Falls Church
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

          {/* CMS-Style Screen Cards */}
          <div className="max-w-5xl mx-auto mb-16">
            <ScrollAnimate>
              <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
                {/* Screen Card - Shows different states based on connection */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg w-full max-w-md relative">
                  {/* Screen Preview */}
                  <div className="relative bg-gray-900 p-3 rounded-t-2xl overflow-hidden">
                    {/* Connection indicator */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`w-3 h-3 rounded-full block shadow-lg ${
                        isScreenConnected
                          ? 'bg-green-500 shadow-green-500/50'
                          : 'bg-orange-500 shadow-orange-500/50 animate-pulse'
                      }`} />
                    </div>
                    {/* Status badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${
                        isScreenConnected ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {isScreenConnected ? 'Active' : 'Offline'}
                      </span>
                    </div>

                    {/* TV Frame */}
                    <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                      {isScreenConnected && uploadedImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={uploadedImage} alt="Your content" className={`w-full h-full ${imageFitMode === 'cover' ? 'object-cover' : 'object-contain'}`} />
                      ) : isScreenConnected ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          <Upload className="h-10 w-10 mb-2 opacity-40" />
                          <span className="text-sm opacity-60">Upload media below</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          <Tv className="h-12 w-12 mb-2 opacity-30" />
                          <span className="text-sm opacity-50">Waiting for connection...</span>
                        </div>
                      )}
                      {/* Filename badge - only show when connected AND has image */}
                      {isScreenConnected && uploadedImage && (
                        <div className="absolute bottom-2 right-2 bg-blue/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          <span>your-image.jpg</span>
                        </div>
                      )}
                    </div>

                    {/* TV Stand */}
                    <div className="flex justify-center mt-2">
                      <div className="w-16 h-3 bg-gray-700 rounded-b-lg" />
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-4">
                    {/* Screen name row with menu */}
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Main Display</h4>
                      {isScreenConnected && (
                        <div className="relative">
                          <button
                            onClick={() => setShowDemoMenu(!showDemoMenu)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="h-5 w-5 text-gray-400" />
                          </button>

                          {/* Dropdown Menu - Opens upward */}
                          {showDemoMenu && (
                            <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 max-h-80 overflow-y-auto">
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                <Eye className="h-4 w-4 text-gray-400" />
                                Preview in CMS
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                <ExternalLink className="h-4 w-4 text-gray-400" />
                                Launch Web Player
                              </button>
                              <button
                                onClick={() => { setShowDemoMenu(false); setShowDeviceHealth(true); }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                              >
                                <Activity className="h-4 w-4 text-gray-400" />
                                Device Health
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                <RefreshCw className="h-4 w-4 text-gray-400" />
                                Refresh Screen
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                <Settings className="h-4 w-4 text-gray-400" />
                                Edit Settings
                              </button>
                              <div className="border-t border-gray-100 my-1" />
                              <div className="px-4 py-1.5">
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Image Fit</span>
                              </div>
                              <button
                                onClick={() => { setImageFitMode('cover'); setShowDemoMenu(false); }}
                                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 ${
                                  imageFitMode === 'cover' ? 'text-blue bg-blue/5' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <Maximize className="h-4 w-4" />
                                Fill (Cover)
                                {imageFitMode === 'cover' && <Check className="h-4 w-4 ml-auto" />}
                              </button>
                              <button
                                onClick={() => { setImageFitMode('contain'); setShowDemoMenu(false); }}
                                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 ${
                                  imageFitMode === 'contain' ? 'text-blue bg-blue/5' : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <Minimize2 className="h-4 w-4" />
                                Fit (Contain)
                                {imageFitMode === 'contain' && <Check className="h-4 w-4 ml-auto" />}
                              </button>
                              <div className="border-t border-gray-100 my-1" />
                              <button className="w-full px-4 py-2 text-left text-sm text-orange-500 hover:bg-orange-50 flex items-center gap-3">
                                <Unplug className="h-4 w-4" />
                                Release Device
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-3">
                                <Trash2 className="h-4 w-4" />
                                Delete Screen
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Media section - shows upload when connected */}
                    {isScreenConnected ? (
                      <>
                        {/* Media filename or upload */}
                        {uploadedImage ? (
                          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-gray-50 rounded-lg">
                            <ImageIcon className="h-4 w-4 text-blue" />
                            <span className="text-sm text-gray-600 truncate">your-image.jpg</span>
                          </div>
                        ) : (
                          <label className="flex items-center justify-center gap-2 mb-4 px-3 py-3 bg-blue/5 border-2 border-dashed border-blue/30 rounded-lg cursor-pointer hover:bg-blue/10 transition-colors">
                            <Upload className="h-4 w-4 text-blue" />
                            <span className="text-sm text-blue font-medium">Upload your media</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = () => setUploadedImage(reader.result as string)
                                  reader.readAsDataURL(file)
                                }
                              }}
                            />
                          </label>
                        )}

                        {/* Connection details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Connection</span>
                            <span className="text-green-500 font-medium">Connected</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Last Checked</span>
                            <span className="text-gray-700">Just now</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Browser</span>
                            <span className="text-gray-700">Chrome 143.0</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Needs connection state */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Connection</span>
                            <span className="text-orange-500 font-medium">Needs Connection</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Last Seen</span>
                            <span className="text-gray-400">Never</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Connect a Screen Card */}
                <div
                  className="bg-white rounded-2xl border-2 border-dashed border-gray-300 shadow-sm overflow-hidden w-full max-w-md cursor-pointer hover:border-blue/50 hover:shadow-md transition-all group"
                  onClick={() => setShowConnectScreen(true)}
                >
                  <div className="p-8 flex flex-col items-center justify-center min-h-[360px]">
                    <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-blue/10 flex items-center justify-center mb-4 transition-colors">
                      <Plus className="h-8 w-8 text-gray-400 group-hover:text-blue transition-colors" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Connect a Screen</h4>
                    <p className="text-sm text-gray-500 mb-4">Add a new display to your venue</p>
                    <p className="text-xs text-gray-400">Click to pair a device</p>
                  </div>
                </div>
              </div>
            </ScrollAnimate>

            {/* Device Health Modal */}
            {showDeviceHealth && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeviceHealth(false)}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-gray-600" />
                      <h3 className="font-semibold">Device Health: Screen name</h3>
                    </div>
                    <button onClick={() => setShowDeviceHealth(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b">
                    <button className="flex-1 px-4 py-3 text-sm font-medium bg-gray-900 text-white rounded-t-lg mx-2 mt-2 flex items-center justify-center gap-2">
                      <Activity className="h-4 w-4" />
                      Status
                    </button>
                    <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2">
                      <Monitor className="h-4 w-4" />
                      Device
                    </button>
                    <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2">
                      <Terminal className="h-4 w-4" />
                      Commands
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    {/* Connection Status */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Wifi className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-sm">Connection Status</p>
                          <p className="text-green-500 text-sm">Connected</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Last Heartbeat</p>
                        <p className="text-sm font-medium">16 seconds ago</p>
                      </div>
                    </div>

                    {/* Now Playing */}
                    <div className="border rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Play className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Now Playing</span>
                        </div>
                        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Playing</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded">IMAGE</span>
                        <span className="text-sm text-gray-600 truncate">menu-demo.png</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-gray-400">Uptime</p>
                          <p className="font-semibold">28m</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Switches</p>
                          <p className="font-semibold">0</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Errors (1h)</p>
                          <p className="font-semibold text-green-500">0</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border rounded-xl p-3">
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <Zap className="h-4 w-4" />
                          <span className="text-xs">FPS</span>
                        </div>
                        <p className="text-2xl font-bold">77 <span className="text-green-500 text-sm">✓</span></p>
                      </div>
                      <div className="border rounded-xl p-3">
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <HardDrive className="h-4 w-4" />
                          <span className="text-xs">Memory</span>
                        </div>
                        <p className="text-2xl font-bold">12 MB</p>
                      </div>
                    </div>

                    {/* WebSocket */}
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">WebSocket:</span>
                      <span className="text-sm font-medium text-green-600">Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Connect New Screen Modal */}
            {showConnectScreen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowConnectScreen(false)}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  {/* Header */}
                  <div className="flex items-center justify-between p-5 border-b">
                    <div>
                      <h3 className="font-semibold text-lg">Connect New Screen</h3>
                      <p className="text-sm text-gray-500 mt-1">Enter the pairing code shown on your screen to connect it to this venue.</p>
                    </div>
                    <button onClick={() => setShowConnectScreen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-5">
                    {/* Select Player Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Select Player Type</label>
                      <div className="grid grid-cols-4 gap-3">
                        <button
                          onClick={() => setSelectedPlayerType('web')}
                          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                            selectedPlayerType === 'web' ? 'border-blue bg-blue/5' : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-1 ${
                            selectedPlayerType === 'web' ? 'bg-blue/10' : 'bg-gray-100'
                          }`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/app_icon/Niconico-Logo-2--Streamline-Logos.svg"
                              alt="Web Player"
                              className="h-9 w-9"
                            />
                          </div>
                          <span className={`text-xs font-medium ${selectedPlayerType === 'web' ? 'text-blue' : 'text-gray-600'}`}>Web</span>
                        </button>
                        <button
                          onClick={() => setSelectedPlayerType('firetv')}
                          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                            selectedPlayerType === 'firetv' ? 'border-blue bg-blue/5' : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-1 ${
                            selectedPlayerType === 'firetv' ? 'bg-blue/10' : 'bg-gray-100'
                          }`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/app_icon/Amazon-Logo--Streamline-Logos.svg"
                              alt="Fire TV"
                              className="h-9 w-9"
                            />
                          </div>
                          <span className={`text-xs font-medium ${selectedPlayerType === 'firetv' ? 'text-blue' : 'text-gray-600'}`}>Fire TV</span>
                        </button>
                        <button
                          onClick={() => setSelectedPlayerType('android')}
                          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                            selectedPlayerType === 'android' ? 'border-blue bg-blue/5' : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-1 ${
                            selectedPlayerType === 'android' ? 'bg-blue/10' : 'bg-gray-100'
                          }`}>
                            <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
                            </svg>
                          </div>
                          <span className={`text-xs font-medium ${selectedPlayerType === 'android' ? 'text-blue' : 'text-gray-600'}`}>Android</span>
                        </button>
                        <button
                          onClick={() => setSelectedPlayerType('pi')}
                          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                            selectedPlayerType === 'pi' ? 'border-blue bg-blue/5' : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-1 ${
                            selectedPlayerType === 'pi' ? 'bg-blue/10' : 'bg-gray-100'
                          }`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/app_icon/Raspberry-Pi--Streamline-Font-Awesome.svg"
                              alt="Raspberry Pi"
                              className="h-9 w-9"
                            />
                          </div>
                          <span className={`text-xs font-medium ${selectedPlayerType === 'pi' ? 'text-blue' : 'text-gray-600'}`}>Pi</span>
                        </button>
                      </div>
                    </div>

                    {/* Selected Player Info - Compact */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {selectedPlayerType === 'web' && 'Web Player'}
                          {selectedPlayerType === 'firetv' && 'Fire TV Stick'}
                          {selectedPlayerType === 'android' && 'Android TV'}
                          {selectedPlayerType === 'pi' && 'Pi Player'}
                        </span>
                        <span className="text-xs font-semibold text-blue">
                          {selectedPlayerType === 'pi' ? 'Up to 4K' : 'Up to 1080p'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
                        {selectedPlayerType === 'web' && (
                          <>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Any browser
                            </span>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              No install
                            </span>
                          </>
                        )}
                        {selectedPlayerType === 'firetv' && (
                          <>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Easy setup
                            </span>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Affordable
                            </span>
                          </>
                        )}
                        {selectedPlayerType === 'android' && (
                          <>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Android TV
                            </span>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Kiosk mode
                            </span>
                          </>
                        )}
                        {selectedPlayerType === 'pi' && (
                          <>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              24/7 operation
                            </span>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Low power
                            </span>
                          </>
                        )}
                      </div>
                      {selectedPlayerType === 'web' && (
                        <p className="text-xs text-amber-600 mt-2">
                          ⚠️ Requires constant internet
                        </p>
                      )}
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <button className="text-blue text-xs font-medium flex items-center gap-1 hover:underline">
                          <Info className="h-3 w-3" />
                          View recommended devices
                        </button>
                      </div>
                    </div>

                    {/* Launch Web Player Section - Only for Web player */}
                    {selectedPlayerType === 'web' && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setShowWebPlayerHelp(!showWebPlayerHelp)}
                          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-blue" />
                            <span className="text-sm font-medium text-gray-700">Need help getting a pairing code?</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showWebPlayerHelp ? 'rotate-180' : ''}`} />
                        </button>
                        {showWebPlayerHelp && (
                          <div className="p-3 border-t border-gray-200 bg-white space-y-2">
                            <button
                              type="button"
                              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                              onClick={() => setShowPairingPage(true)}
                            >
                              <ExternalLink className="h-3 w-3" />
                              Launch Web Player
                            </button>
                            <div className="text-center">
                              <span className="text-xs text-gray-500">Or go to: </span>
                              <span className="text-xs font-mono text-gray-900 select-all">player.piads.co</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pairing Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pairing Code</label>
                      <input
                        type="text"
                        placeholder="XXX-XXX-XX"
                        value={enteredPairingCode}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
                          let formatted = ''
                          if (raw.length > 0) formatted += raw.slice(0, 3)
                          if (raw.length > 3) formatted += '-' + raw.slice(3, 6)
                          if (raw.length > 6) formatted += '-' + raw.slice(6, 8)
                          setEnteredPairingCode(formatted)
                        }}
                        maxLength={10}
                        className={`w-full px-4 py-3 border rounded-xl text-center text-lg tracking-widest font-mono placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue ${
                          enteredPairingCode === demoPairingCode ? 'border-green-500 bg-green-50' : 'border-gray-200'
                        }`}
                      />
                      {enteredPairingCode === demoPairingCode && (
                        <p className="text-xs text-green-600 mt-1 text-center">✓ Valid pairing code</p>
                      )}
                    </div>

                    {/* Screen Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Screen Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Main Display"
                        defaultValue="Main Display"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue"
                      />
                    </div>

                    {/* Screen Group */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Screen Group <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <select className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue">
                            <option>No Group</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                        <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                          <Plus className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end gap-3 p-5 border-t">
                    <button
                      onClick={() => {
                        setShowConnectScreen(false)
                        setEnteredPairingCode('')
                        setShowWebPlayerHelp(false)
                      }}
                      className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (enteredPairingCode === demoPairingCode) {
                          setIsConnecting(true)
                          setTimeout(() => {
                            setIsConnecting(false)
                            setIsScreenConnected(true)
                            setShowConnectScreen(false)
                            setEnteredPairingCode('')
                            setShowWebPlayerHelp(false)
                          }, 1500)
                        }
                      }}
                      disabled={enteredPairingCode !== demoPairingCode || isConnecting}
                      className={`px-5 py-2.5 text-sm font-medium text-white rounded-xl transition-colors flex items-center gap-2 ${
                        enteredPairingCode === demoPairingCode && !isConnecting
                          ? 'bg-blue hover:bg-blue/90'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {isConnecting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        'Connect Screen'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Web Player Pairing Page Modal */}
            {showPairingPage && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]" onClick={() => setShowPairingPage(false)}>
                <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
                  {/* Browser Chrome */}
                  <div className="bg-gray-800 px-4 py-2 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => setShowPairingPage(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 bg-gray-700 rounded-lg px-3 py-1 text-sm text-gray-300 font-mono">
                      player.piads.co
                    </div>
                  </div>

                  {/* Player Content */}
                  <div className="p-8 md:p-12 text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-blue flex items-center justify-center">
                        <Tv className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-white font-[Pacifico]">PiAds</span>
                    </div>

                    <h2 className="text-xl font-semibold text-white mb-2">Web Player</h2>
                    <p className="text-gray-400 mb-8">Enter this pairing code in your dashboard to connect this screen</p>

                    {/* Pairing Code Display */}
                    <div className="bg-gray-800 rounded-2xl p-6 mb-6 inline-block">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Pairing Code</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl md:text-5xl font-mono font-bold text-white tracking-widest">
                          {demoPairingCode}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(demoPairingCode)
                            // Auto-paste to input
                            setEnteredPairingCode(demoPairingCode)
                          }}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors group"
                          title="Copy to clipboard"
                        >
                          <svg className="h-6 w-6 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">
                      Waiting for connection...
                      <span className="inline-block ml-2">
                        <span className="animate-pulse">●</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
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
                Real stories from local venues across Ballston, Clarendon & Falls Church.
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
              Venues across Ballston, Clarendon, Columbia Pike & Falls Church are already keeping advertising local.
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
