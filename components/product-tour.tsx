"use client"

// AdCreative.ai-style product tour: alternating numbered rows, each pairing
// benefit copy with a real in-app walkthrough recording (same videos shown
// in the app's How-To popups — scripted Playwright captures of real flows).

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Play } from "lucide-react"
import { ScrollAnimate } from "@/components/ui/scroll-animate"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"
const TUTORIALS_BASE =
  "https://svujlvlusjpuldrbtzzp.supabase.co/storage/v1/object/public/venue-content/tutorials"

interface TourStep {
  id: string
  eyebrow: string
  title: string
  highlight: string
  description: string
  bullets: string[]
  videoUrl: string
  posterUrl: string
  cta: string
  ctaHref: string
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "screens",
    eyebrow: "Step 1 · Screens",
    title: "Turn any TV into a",
    highlight: "smart screen",
    description:
      "Pair a TV, Fire TV stick, or the free web player with a simple pairing code and watch it come online in seconds.",
    bullets: [
      "Works with the TV you already own — no proprietary hardware",
      "Pairing code connects a screen in under a minute",
      "Live device health: connection, uptime, and what's playing",
    ],
    videoUrl: `${TUTORIALS_BASE}/howto-screens.mp4`,
    posterUrl: `${TUTORIALS_BASE}/howto-screens-poster.jpg`,
    cta: "Connect your first screen",
    ctaHref: `${APP_URL}/sign-up?role=venue`,
  },
  {
    id: "media",
    eyebrow: "Step 2 · Media Library",
    title: "Upload once, play",
    highlight: "everywhere",
    description:
      "Drop in your images and videos and they're ready to use immediately — optimization happens behind the scenes.",
    bullets: [
      "Drag-and-drop uploads for images and video",
      "Media is usable the moment it lands",
      "Organize everything in one library, reuse it across playlists",
    ],
    videoUrl: `${TUTORIALS_BASE}/howto-media.mp4`,
    posterUrl: `${TUTORIALS_BASE}/howto-media-poster.jpg`,
    cta: "Upload your content",
    ctaHref: `${APP_URL}/sign-up?role=venue`,
  },
  {
    id: "playlists",
    eyebrow: "Step 3 · Playlists",
    title: "Build content loops in",
    highlight: "minutes",
    description:
      "Stack your announcements, promos, and member spotlights into playlists that loop across your screens.",
    bullets: [
      "Mix images, video, YouTube, websites, and social embeds",
      "Set per-item durations with a click",
      "Your content first — ads only fill the gaps you open",
    ],
    videoUrl: `${TUTORIALS_BASE}/howto-playlists.mp4`,
    posterUrl: `${TUTORIALS_BASE}/howto-playlists-poster.jpg`,
    cta: "Build a playlist",
    ctaHref: `${APP_URL}/sign-up?role=venue`,
  },
  {
    id: "schedules",
    eyebrow: "Step 4 · Schedules",
    title: "Right content at the",
    highlight: "right time",
    description:
      "Drag a block on the weekly grid, pick a playlist, and your screens switch content automatically — breakfast, lunch, and evening.",
    bullets: [
      "Visual weekly grid — drag, drop, done",
      "Different playlists for different dayparts",
      "Set it once and it runs itself",
    ],
    videoUrl: `${TUTORIALS_BASE}/howto-schedules.mp4`,
    posterUrl: `${TUTORIALS_BASE}/howto-schedules-poster.jpg`,
    cta: "Start scheduling",
    ctaHref: `${APP_URL}/sign-up?role=venue`,
  },
]

function TourVideo({ step }: { step: TourStep }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  // Autoplay muted when scrolled into view, pause when out (AdCreative-style demos)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-blue/20 via-teal/10 to-coral/10 p-2 md:p-3 shadow-2xl">
      {/* Browser chrome frame */}
      <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-3 flex-1 max-w-[240px] bg-white rounded-md px-3 py-0.5 text-[11px] text-gray-400 truncate">
            app.piads.co/venue/{step.id}
          </span>
        </div>
        <div className="relative aspect-video bg-gray-950">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={step.posterUrl}
            className="w-full h-full object-cover"
            onClick={() => {
              const v = videoRef.current
              if (!v) return
              if (v.paused) { v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
            }}
          >
            <source src={step.videoUrl} type="video/mp4" />
          </video>
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-16 h-16 rounded-full bg-white/90 shadow-xl flex items-center justify-center">
                <Play className="h-7 w-7 text-blue ml-1" fill="currentColor" />
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Real-app badge */}
      <span className="absolute -top-3 left-6 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
        Real app · not a mockup
      </span>
    </div>
  )
}

export function ProductTour() {
  return (
    <section id="product-tour" className="py-24 md:py-32 relative overflow-hidden scroll-mt-24">
      <div className="container">
        <ScrollAnimate>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 bg-blue/10 text-blue text-sm font-bold px-4 py-2 rounded-full mb-5">
              <Play className="h-4 w-4" fill="currentColor" />
              Watch it work — recorded in the real app
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
              From blank TV to earning screen
              <br className="hidden md:block" />
              <span className="text-blue"> in 4 steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These are the exact walkthroughs venues see inside PiAds. No staged
              demos — this is the product.
            </p>
          </div>
        </ScrollAnimate>

        <div className="flex flex-col gap-24 md:gap-32 max-w-6xl mx-auto">
          {TOUR_STEPS.map((step, index) => (
            <ScrollAnimate key={step.id} delay={100}>
              <div
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Copy */}
                <div>
                  <span className="inline-block text-sm font-bold uppercase tracking-wider text-teal mb-4">
                    {step.eyebrow}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
                    {step.title} <span className="text-blue">{step.highlight}</span>
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                  <ul className="space-y-3 mb-8">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-base text-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={step.ctaHref}
                    className="inline-flex items-center gap-2 text-blue font-bold text-lg hover:gap-3 transition-all"
                  >
                    {step.cta}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>

                {/* Video */}
                <TourVideo step={step} />
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  )
}
