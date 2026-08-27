"use client"

// Walkthrough showcase — the centerpiece of the landing page. One large
// video player in browser chrome with step tabs (Screens → Media →
// Playlists → Schedules). Plays the real in-app How-To recordings and
// auto-advances through the steps like a guided tour.

import { useEffect, useRef, useState } from "react"
import { Monitor, ImageIcon, ListVideo, Calendar, Play, Pause, CheckCircle2 } from "lucide-react"
import { ScrollAnimate } from "@/components/ui/scroll-animate"

const TUTORIALS_BASE =
  "https://svujlvlusjpuldrbtzzp.supabase.co/storage/v1/object/public/venue-content/tutorials"

const STEPS = [
  {
    id: "screens",
    icon: Monitor,
    label: "Connect a screen",
    title: "Pair any TV in under a minute",
    description:
      "Enter the pairing code shown on your TV (or the free web player) and watch it come online.",
    bullets: ["Works with the TV you already own", "Web, Fire TV, Android, or Raspberry Pi"],
    videoUrl: `${TUTORIALS_BASE}/howto-screens.mp4`,
    posterUrl: `${TUTORIALS_BASE}/howto-screens-poster.jpg`,
  },
  {
    id: "media",
    icon: ImageIcon,
    label: "Upload media",
    title: "Drop in your images and videos",
    description:
      "Drag-and-drop uploads land in one library, ready to use the moment they arrive.",
    bullets: ["Usable immediately — optimization runs behind the scenes", "Reuse everything across playlists"],
    videoUrl: `${TUTORIALS_BASE}/howto-media.mp4`,
    posterUrl: `${TUTORIALS_BASE}/howto-media-poster.jpg`,
  },
  {
    id: "playlists",
    icon: ListVideo,
    label: "Build a playlist",
    title: "Stack content into loops",
    description:
      "Mix images, video, YouTube, websites, and social embeds. Set durations and save.",
    bullets: ["Your content always plays first", "Ads only fill the gaps you open"],
    videoUrl: `${TUTORIALS_BASE}/howto-playlists.mp4`,
    posterUrl: `${TUTORIALS_BASE}/howto-playlists-poster.jpg`,
  },
  {
    id: "schedules",
    icon: Calendar,
    label: "Schedule it",
    title: "Right content at the right time",
    description:
      "Drag a block on the weekly grid, pick a playlist, and your screens switch automatically.",
    bullets: ["Breakfast, lunch, and evening dayparts", "Set it once — it runs itself"],
    videoUrl: `${TUTORIALS_BASE}/howto-schedules.mp4`,
    posterUrl: `${TUTORIALS_BASE}/howto-schedules-poster.jpg`,
  },
]

export function ProductTour() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const step = STEPS[active]

  // Start the tour when scrolled into view; pause out of view.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current
        if (!video) return
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Switching steps loads and plays the new video.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.load()
    video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [active])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) { video.play(); setPlaying(true) } else { video.pause(); setPlaying(false) }
  }

  return (
    <div ref={sectionRef} id="product-tour" className="scroll-mt-24">
      {/* Step tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            className={`inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-sm md:text-base font-bold transition-all ${
              i === active
                ? "bg-blue text-white shadow-sm"
                : "bg-white text-gray-600 hover:text-blue border border-gray-200 hover:border-blue/40"
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              i === active ? "bg-white/20" : "bg-gray-100"
            }`}>
              {i + 1}
            </span>
            <s.icon className="h-4 w-4" />
            {s.label}
          </button>
        ))}
      </div>

      {/* Big player in browser chrome */}
      <div className="relative max-w-4xl mx-auto">
        <div className="rounded-2xl overflow-hidden bg-white border border-border shadow-lg">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-3 flex-1 max-w-[260px] bg-white rounded-md px-3 py-0.5 text-[11px] text-gray-400 truncate">
                app.piads.co/venue/{step.id}
              </span>
              <span className="hidden sm:inline-flex bg-white border border-border text-gray-500 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                Real app · not a mockup
              </span>
            </div>
            <div className="relative aspect-video bg-gray-950 cursor-pointer" onClick={togglePlay}>
              <video
                key={step.id}
                ref={videoRef}
                muted
                playsInline
                preload="metadata"
                poster={step.posterUrl}
                className="w-full h-full object-cover"
                onEnded={() => setActive((active + 1) % STEPS.length)}
              >
                <source src={step.videoUrl} type="video/mp4" />
              </video>
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="w-20 h-20 rounded-full bg-white/95 shadow-xl flex items-center justify-center">
                    <Play className="h-8 w-8 text-blue ml-1" fill="currentColor" />
                  </span>
                </div>
              )}
              {playing && (
                <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Pause className="h-4 w-4 text-white" />
                </span>
              )}
            </div>
        </div>

        {/* Caption for the active step */}
        <ScrollAnimate key={step.id}>
          <div className="text-center mt-6 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold font-display mb-2">{step.title}</h3>
            <p className="text-lg text-muted-foreground mb-3">{step.description}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5">
              {step.bullets.map((bullet) => (
                <span key={bullet} className="inline-flex items-center gap-2 text-sm md:text-base text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  {bullet}
                </span>
              ))}
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </div>
  )
}
