"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollAnimate, StaggerChildren } from "@/components/ui/scroll-animate"
import {
  Monitor,
  TrendingUp,
  Building2,
  ArrowRight,
  Play,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const rotatingHeadlines = [
  "Into Revenue",
  "Into Opportunities",
  "Into Engagement",
  "Into Impact",
]

const stats = [
  { label: "Active Screens", value: "10+", color: "text-blue" },
  { label: "Monthly Impressions", value: "50K+", color: "text-teal" },
  { label: "Partner Venues", value: "4", color: "text-blue" },
]

const partnerVenues = [
  { name: "Ballston CrossFit", location: "Arlington", logo: "/logos/partners/ballston-crossfit.png" },
  { name: "Venture X", location: "Arlington", logo: "/logos/partners/venture-x.png" },
  { name: "Millennium Mobile", location: "Falls Church", logo: "/logos/partners/millennium-mobile.png" },
  { name: "The Lux Scents", location: "Arlington", logo: "/logos/partners/the-lux-scents.png" },
]

const features = [
  {
    title: "Easy Setup",
    description: "Connect your screen in minutes. No technical expertise required.",
    color: "bg-blue",
    textColor: "text-white",
  },
  {
    title: "Real-Time Analytics",
    description: "Track impressions, engagement, and revenue instantly.",
    color: "bg-teal",
    textColor: "text-white",
  },
  {
    title: "Content Control",
    description: "Approve every ad before it goes live on your screens.",
    color: "bg-orange",
    textColor: "text-gray-800",
  },
  {
    title: "Flexible Scheduling",
    description: "Set pricing by daypart. Maximize peak hour revenue.",
    color: "bg-coral",
    textColor: "text-gray-800",
  },
  {
    title: "Location Targeting",
    description: "Advertisers find you by location and audience type.",
    color: "bg-cyan",
    textColor: "text-gray-800",
  },
  {
    title: "Audience Insights",
    description: "Understand who sees your ads with traffic data.",
    color: "bg-blue",
    textColor: "text-white",
  },
]

const howItWorks = {
  venues: [
    { step: "01", title: "Set Up Your Screen", description: "Connect your display with our simple setup guide" },
    { step: "02", title: "Configure Pricing", description: "Set rates for breakfast, lunch, and evening slots" },
    { step: "03", title: "Start Earning", description: "Advertisers book, you approve, money flows in" },
  ],
  advertisers: [
    { step: "01", title: "Browse Venues", description: "Find screens that match your target audience" },
    { step: "02", title: "Book Campaigns", description: "Select dates and upload your creative" },
    { step: "03", title: "Track Results", description: "Monitor impressions and engagement live" },
  ],
}

const testimonials = [
  {
    quote: "PiAds transformed our waiting room into a revenue stream. Setup took 10 minutes.",
    author: "Sarah Chen",
    role: "Operations Manager",
    company: "CopperBeam Coffee",
  },
  {
    quote: "Finally, an advertising platform that lets us reach customers at the point of decision.",
    author: "Mike Rodriguez",
    role: "Marketing Director",
    company: "Local Fitness Co",
  },
  {
    quote: "The approval workflow gives us complete control. Only ads that fit our brand.",
    author: "Emily Park",
    role: "Owner",
    company: "Park's Bistro",
  },
]

const useCases = [
  { name: "Cafes", image: "/images/usecase-cafe.jpg" },
  { name: "Gyms", image: "/images/usecase-gym.jpg" },
  { name: "Restaurants", image: "/images/usecase-restaurant.jpg" },
  { name: "Offices", image: "/images/usecase-office.jpg" },
]

export default function HomePage() {
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setHeadlineIndex((prev) => (prev + 1) % rotatingHeadlines.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue/5 via-transparent to-teal/5 -z-10" />

        {/* Large background logo */}
        <div className="absolute -right-32 md:-right-20 top-20 opacity-[0.03] -z-10 pointer-events-none">
          <Image
            src="/logo/piads-logo-text.png"
            alt=""
            width={800}
            height={300}
            className="w-[500px] md:w-[700px] lg:w-[900px] h-auto rotate-[-15deg]"
          />
        </div>

        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <ScrollAnimate animation="up">
              <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-8">
                <Sparkles className="h-4 w-4 text-blue animate-pulse-soft" />
                <span className="text-sm font-medium">Digital Signage Made Simple</span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="up" delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-display">
                Turn Your Screens
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
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Connect venue screens with advertisers. Simple setup, real-time analytics,
                and full control over what plays on your displays.
              </p>
            </ScrollAnimate>

            <ScrollAnimate animation="up" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-14 px-8 text-base rounded-xl shadow-lg shadow-blue/25 hover:shadow-xl hover:shadow-blue/30 hover:scale-105 transition-all duration-300 btn-glow" asChild>
                  <Link href={`${APP_URL}/sign-up`}>
                    Sign Up For Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl hover:scale-105 transition-all duration-300 group" asChild>
                  <Link href="/contact">
                    <Play className="mr-2 h-5 w-5 text-blue group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </ScrollAnimate>
          </div>

          {/* Hero Image/Video Mockup */}
          <ScrollAnimate animation="scale" delay={400}>
            <div className="relative mt-16">
              <div className="video-wrapper mx-auto max-w-4xl">
                {/* Dashboard mockup placeholder - replace with actual image/video */}
                <div className="aspect-[16/10] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden relative">
                  {/* Fake browser bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-slate-800 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-slate-700 rounded-lg h-6 w-64 mx-auto" />
                    </div>
                  </div>

                  {/* Dashboard content mockup */}
                  <div className="absolute top-10 inset-x-0 bottom-0 p-6">
                    <div className="grid grid-cols-4 gap-4 h-full">
                      {/* Sidebar */}
                      <div className="col-span-1 bg-slate-700/50 rounded-xl p-4 space-y-3">
                        <div className="h-8 bg-blue/30 rounded-lg" />
                        <div className="h-6 bg-slate-600 rounded w-3/4" />
                        <div className="h-6 bg-slate-600 rounded w-2/3" />
                        <div className="h-6 bg-slate-600 rounded w-3/4" />
                        <div className="h-6 bg-slate-600 rounded w-1/2" />
                      </div>

                      {/* Main content */}
                      <div className="col-span-3 space-y-4">
                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-blue/20 rounded-xl p-4 text-white">
                            <div className="h-4 bg-white/20 rounded w-1/2 mb-2" />
                            <div className="h-8 bg-white/30 rounded w-2/3" />
                          </div>
                          <div className="bg-teal/20 rounded-xl p-4 text-white">
                            <div className="h-4 bg-white/20 rounded w-1/2 mb-2" />
                            <div className="h-8 bg-white/30 rounded w-2/3" />
                          </div>
                          <div className="bg-orange/30 rounded-xl p-4 text-white">
                            <div className="h-4 bg-white/20 rounded w-1/2 mb-2" />
                            <div className="h-8 bg-white/30 rounded w-2/3" />
                          </div>
                        </div>

                        {/* Chart area */}
                        <div className="bg-slate-700/50 rounded-xl p-4 flex-1">
                          <div className="h-4 bg-slate-600 rounded w-1/4 mb-4" />
                          <div className="h-32 flex items-end gap-2">
                            {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 65, 80].map((h, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-blue to-teal rounded-t"
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -left-4 md:-left-10 top-1/4 animate-float">
                <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                    <div className="font-bold text-teal">+127%</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 md:-right-10 top-1/3 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue/20 flex items-center justify-center">
                    <Monitor className="h-5 w-5 text-blue" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Screens</div>
                    <div className="font-bold text-blue">12 Active</div>
                  </div>
                </div>
              </div>

              <div className="absolute right-10 -bottom-6 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-bold text-green-500">All Live</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Stats - Simple inline */}
      <section className="py-16 border-y bg-secondary/30">
        <div className="container">
          <ScrollAnimate>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className={`text-4xl md:text-5xl font-bold font-display ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Trusted By - Logo carousel */}
      <section className="py-12 overflow-hidden bg-white">
        <div className="container">
          <ScrollAnimate>
            <p className="text-center text-sm text-muted-foreground mb-8">
              Trusted by local businesses in Arlington & Falls Church
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
                      <span className="block text-xs text-muted-foreground mt-0.5">{venue.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Features - Colorful cards grid */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Large background logo */}
        <div className="absolute -left-40 bottom-0 opacity-[0.02] -z-10 pointer-events-none">
          <Image
            src="/logo/piads-logo-text.png"
            alt=""
            width={800}
            height={300}
            className="w-[600px] md:w-[800px] h-auto rotate-[10deg]"
          />
        </div>
        <div className="container">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful tools for venues and advertisers, wrapped in simplicity.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ScrollAnimate key={feature.title} delay={index * 100}>
                <div
                  className={`${feature.color} rounded-3xl p-8 hover-lift cursor-default h-full min-h-[200px] flex flex-col justify-end`}
                >
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

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground">
                Three simple steps to get started.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* For Venues */}
            <ScrollAnimate animation="left">
              <div className="bg-blue rounded-3xl p-8 md:p-10 text-white h-full">
                <h3 className="text-2xl font-semibold font-display mb-8">For Venues</h3>
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
                <Button variant="secondary" className="mt-8 rounded-full" asChild>
                  <Link href={`${APP_URL}/sign-up?role=venue`}>
                    Start as Venue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollAnimate>

            {/* For Advertisers */}
            <ScrollAnimate animation="right">
              <div className="bg-teal rounded-3xl p-8 md:p-10 text-white h-full">
                <h3 className="text-2xl font-semibold font-display mb-8">For Advertisers</h3>
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
                <Button variant="secondary" className="mt-8 rounded-full" asChild>
                  <Link href={`${APP_URL}/sign-up?role=advertiser`}>
                    Start as Advertiser
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-24 md:py-32">
        <div className="container max-w-5xl">
          <ScrollAnimate>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                See It In Action
              </h2>
              <p className="text-xl text-muted-foreground">
                Watch how easy it is to set up and manage your digital signage.
              </p>
            </div>
          </ScrollAnimate>

          <ScrollAnimate animation="scale" delay={200}>
            <div className="relative group cursor-pointer">
              <div className="video-wrapper aspect-video bg-gradient-to-br from-blue to-teal rounded-3xl overflow-hidden">
                {/* Video thumbnail placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 md:h-10 md:w-10 text-blue ml-1" fill="currentColor" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
                  </div>
                </div>

                {/* Video placeholder text */}
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm opacity-80">Product Demo</p>
                  <p className="font-semibold">2 min watch</p>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Loved by Businesses
              </h2>
              <p className="text-xl text-muted-foreground">
                See what our partners have to say.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimate key={testimonial.author} delay={index * 150}>
                <div className="bg-white rounded-3xl p-8 shadow-sm hover-lift h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
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

        <div className="container text-center max-w-3xl relative">
          <ScrollAnimate>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Ready to Get Started?
            </h2>
          </ScrollAnimate>
          <ScrollAnimate delay={100}>
            <p className="text-xl text-white/80 mb-10">
              Join hundreds of venues and advertisers already using PiAds.
              Free to start, no credit card required.
            </p>
          </ScrollAnimate>
          <ScrollAnimate delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-base rounded-xl shadow-lg hover:scale-105 transition-all duration-300" asChild>
                <Link href={`${APP_URL}/sign-up`}>
                  Sign Up For Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl bg-transparent border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300" asChild>
                <Link href="/contact">
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </div>
  )
}
