"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Apple, ArrowRight, Monitor, Smartphone } from "lucide-react"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"
const APP_STORE_URL = "https://apps.apple.com/us/app/piads/id6759892788"

// Platforms the Devices page already lists — keep this in step with it.
const PLATFORMS = ["Fire TV Stick", "Android TV", "Raspberry Pi", "Any browser"]

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 2)

/**
 * Hero visual: the web dashboard (browser frame) and the iOS app (phone
 * frame) side by side. Both cards are driven by scroll progress — the
 * browser slides in from the left and the phone from the right, converging
 * as the section scrolls into view — so the pair reads as one product on
 * two surfaces rather than two unrelated screenshots.
 */
export function HeroDevices() {
  const ref = useRef<HTMLDivElement>(null)
  // 0 = section just entering at the bottom of the viewport, 1 = settled.
  const [p, setP] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) { setP(1); return }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Start when the top of the block crosses the bottom of the viewport,
      // finish once it has travelled ~75% of the way up — long enough that
      // the two cards visibly converge while the reader scrolls.
      const raw = (vh - rect.top) / (vh * 0.75)
      setP(easeOut(clamp(raw, 0, 1)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const rest = 1 - p
  const browserStyle = {
    transform: `translate3d(${-140 * rest}px, ${40 * rest}px, 0) rotate(${-3 * rest}deg)`,
    opacity: 0.35 + 0.65 * p,
  }
  const phoneStyle = {
    transform: `translate3d(${200 * rest}px, ${60 * rest}px, 0) rotate(${5 * rest}deg)`,
    opacity: 0.35 + 0.65 * p,
  }
  const introStyle = {
    transform: `translate3d(0, ${24 * rest}px, 0)`,
    opacity: 0.2 + 0.8 * p,
  }

  return (
    <div ref={ref} className="overflow-x-clip">
      <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-[minmax(0,1.7fr)_minmax(0,0.65fr)] md:gap-6 lg:gap-10">
        <div className="min-w-0">
          {/* Fills the space beside the taller phone and says what the pair is. */}
          <div className="mb-6 max-w-xl md:mb-8" style={introStyle}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue">One venue, two ways to run it</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
              Manage from your desk. Fix it from the floor.
            </h2>
            <p className="mt-2 text-base leading-relaxed text-gray-600 md:text-lg">
              Change a playlist on the web or from your phone and every screen updates in seconds.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Plays on">
              <li className="rounded-full bg-gray-950 px-3 py-1 text-xs font-semibold text-white">Plays on</li>
              {PLATFORMS.map((name) => (
                <li key={name} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div style={browserStyle} className="will-change-transform">
            <div className="rounded-[28px] border border-gray-200 bg-white p-2.5 shadow-[0_30px_90px_rgba(17,24,39,0.14)] md:p-4">
              <div className="flex items-center gap-2 rounded-t-2xl border-b border-gray-100 bg-gray-50 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="mx-auto rounded-md border border-gray-200 bg-white px-8 py-1 text-[11px] text-gray-400 md:px-24">
                  app.piads.co/venue/screens
                </span>
              </div>
              <div className="overflow-hidden rounded-b-2xl bg-gray-50">
                <Image src="/cms-screenshots/screens-dashboard-2026.jpg" alt="PiAds web dashboard with a connected live screen" width={2160} height={1216} priority className="h-auto w-full" />
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Monitor className="h-4 w-4 text-gray-400" />
                Web dashboard <span className="text-gray-400">·</span> any browser
              </span>
              <Link href={APP_URL} className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:border-gray-950">
                Open the dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div style={phoneStyle} className="mx-auto w-full max-w-[250px] will-change-transform md:max-w-none">
          <div className="rounded-[2.75rem] border-[6px] border-gray-950 bg-gray-950 p-[3px] shadow-[0_30px_90px_rgba(17,24,39,0.22)]">
            <div className="overflow-hidden rounded-[2.25rem] bg-[#F2F1EC]">
              <Image src="/cms-screenshots/ios-screens-2026.jpg" alt="The PiAds iOS app showing a venue's screens on a phone" width={804} height={1748} className="h-auto w-full" />
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Smartphone className="h-4 w-4 text-gray-400" />
              iOS app <span className="text-gray-400">·</span> free
            </span>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-gray-800"
            >
              <Apple className="h-4 w-4" />
              <span className="flex flex-col leading-none">
                <span className="text-[10px] font-medium text-gray-300">Download on the</span>
                <span>App Store</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
