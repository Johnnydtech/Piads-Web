"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

declare global {
  interface Window {
    posthog?: {
      opt_in_capturing: () => void
      opt_out_capturing: () => void
      capture: (event: string, props?: Record<string, unknown>) => void
    }
  }
}

const CONSENT_KEY = "piads_consent"

/**
 * Analytics consent banner. PostHog initializes with
 * opt_out_capturing_by_default, so nothing is captured until the visitor
 * accepts here. The choice persists in localStorage; the banner only shows
 * while no choice has been made.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      // Small delay so it doesn't compete with the page paint
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const decide = (accepted: boolean) => {
    localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "declined")
    if (accepted) {
      window.posthog?.opt_in_capturing()
      window.posthog?.capture("consent_accepted")
    } else {
      window.posthog?.opt_out_capturing()
    }
    setVisible(false)
    // Let the newsletter popup know a decision was made
    window.dispatchEvent(new Event("piads-consent-decided"))
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[90] rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10"
    >
      <p className="text-sm font-semibold text-gray-900">We value your privacy</p>
      <p className="mt-1 text-sm text-gray-600">
        We use analytics cookies to understand how visitors use PiAds and improve the product.
        See our{" "}
        <Link href="/privacy" className="font-medium text-[#6C4BF5] hover:underline">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => decide(true)}
          className="flex-1 rounded-xl bg-[#6C4BF5] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6C4BF5]/25 transition hover:bg-[#5a3fd6]"
        >
          Accept
        </button>
        <button
          onClick={() => decide(false)}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
