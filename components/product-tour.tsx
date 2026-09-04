"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, CheckCircle2, ListVideo, Monitor, Tv } from "lucide-react"

import { ScrollAnimate } from "@/components/ui/scroll-animate"

const STEPS = [
  {
    id: "screens",
    icon: Monitor,
    label: "Screens",
    title: "See every screen at a glance",
    description: "Online status, active content, device health, and screen controls stay together in one calm dashboard.",
    bullets: ["Real connected web player", "Live status and now-playing view"],
    image: "/cms-screenshots/screens-dashboard-2026.jpg",
    width: 1375,
    height: 760,
  },
  {
    id: "playlists",
    icon: ListVideo,
    label: "Playlists",
    title: "Build the loop visually",
    description: "Arrange content, set durations, and add everything from images and video to websites and live feeds.",
    bullets: ["Twelve built-in content types", "Drag, reorder, preview, and publish"],
    image: "/cms-screenshots/playlist-editor-2026.jpg",
    width: 1375,
    height: 760,
  },
  {
    id: "schedules",
    icon: Calendar,
    label: "Schedules",
    title: "Put the right content on at the right time",
    description: "Run an all-day playlist or schedule different content around breakfast, lunch, events, and closing time.",
    bullets: ["Simple weekly timeline", "One schedule or every screen"],
    image: "/cms-screenshots/schedules-dashboard-2026.jpg",
    width: 1375,
    height: 760,
  },
  {
    id: "live",
    icon: Tv,
    label: "Live output",
    title: "What you publish appears on the screen",
    description: "The same starter playlist shown in the dashboard is playing on the connected PiAds web player.",
    bullets: ["Captured from the live player", "Works on web, Fire TV, Android, and Raspberry Pi"],
    image: "/cms-screenshots/player-live-2026.jpg",
    width: 1375,
    height: 997,
  },
]

export function ProductTour() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <div id="product-tour" className="scroll-mt-24">
      <div className="mb-6 flex flex-wrap justify-center gap-2 md:gap-3">
        {STEPS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all md:px-5 md:text-base ${
              index === active
                ? "border-gray-950 bg-gray-950 text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-600 hover:border-blue/50 hover:text-blue"
            }`}
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${index === active ? "bg-coral text-gray-950" : "bg-gray-100"}`}>
              {index + 1}
            </span>
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[26px] border border-border bg-white shadow-[0_24px_70px_rgba(26,26,26,0.14)]">
          <div className="flex items-center gap-1.5 border-b border-gray-200 bg-[#EAE7E0] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C98A72]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4E3C0]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#A3B18A]" />
            <span className="ml-3 max-w-[320px] flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-gray-400">
              app.piads.co/venue/{step.id}
            </span>
            <span className="hidden rounded-full border border-border bg-white px-2.5 py-1 text-[10px] font-semibold text-gray-500 sm:inline-flex">
              Captured from the live app
            </span>
          </div>
          <div className="flex aspect-[16/8.3] items-start justify-center overflow-hidden bg-[#F3F1EC]">
            <Image
              key={step.id}
              src={step.image}
              alt={`${step.title} in PiAds`}
              width={step.width}
              height={step.height}
              className="h-full w-full object-contain object-top"
            />
          </div>
        </div>

        <ScrollAnimate key={step.id}>
          <div className="mx-auto mt-7 max-w-2xl text-center">
            <h3 className="mb-2 font-display text-2xl font-bold md:text-3xl">{step.title}</h3>
            <p className="mb-4 text-lg text-muted-foreground">{step.description}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {step.bullets.map((bullet) => (
                <span key={bullet} className="inline-flex items-center gap-2 text-sm text-foreground md:text-base">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-blue" />
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
