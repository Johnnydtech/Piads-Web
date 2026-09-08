"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { trackCta, track } from "@/lib/analytics"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"
const DISMISS_KEY = "piads_sticky_cta_dismissed"

/**
 * Mobile-only sticky signup bar.
 *
 * Most marketing visitors are on mobile, where the hero CTA scrolls out of
 * view immediately and never comes back until the footer. This keeps one
 * primary action reachable without covering the page like a modal.
 */
export function StickyCta() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return
    } catch {
      // Private mode: just show it.
    }
    setDismissed(false)
    // Appear once the hero (roughly one viewport) has scrolled past.
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[80] border-t border-gray-800 bg-gray-950/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">Free for partner screens</p>
          <p className="truncate text-xs text-white/60">No card. Keep 70% of ad revenue.</p>
        </div>
        <Link
          href={`${APP_URL}/sign-up?role=venue`}
          onClick={() => trackCta("Start free", "sticky_mobile")}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-950"
        >
          Start free <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            try {
              sessionStorage.setItem(DISMISS_KEY, "1")
            } catch {
              // ignore
            }
            setDismissed(true)
            track("sticky_cta_dismissed")
          }}
          className="shrink-0 p-1 text-white/40 hover:text-white/80"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
