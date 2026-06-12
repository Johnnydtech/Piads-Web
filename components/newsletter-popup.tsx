"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const SEEN_KEY = "piads_popup_seen"
const CONSENT_KEY = "piads_consent"

/**
 * One-time marketing popup: newsletter capture + Get Started CTA.
 * Shows once per visitor, after the cookie banner has been decided and the
 * visitor has either spent ~12s on the page or scrolled 40% — i.e. shown to
 * people actually reading, not bouncers.
 */
export function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")
  const armedRef = useRef(false)

  useEffect(() => {
    if (localStorage.getItem(SEEN_KEY)) return

    let timer: ReturnType<typeof setTimeout> | null = null
    const consentDecided = () => !!localStorage.getItem(CONSENT_KEY)

    const show = () => {
      if (armedRef.current || localStorage.getItem(SEEN_KEY)) return
      armedRef.current = true
      setVisible(true)
    }

    const arm = () => {
      // Time trigger
      timer = setTimeout(() => {
        if (consentDecided()) show()
      }, 12_000)
      // Scroll trigger (40% of the page)
      const onScroll = () => {
        const scrolled = window.scrollY + window.innerHeight
        if (consentDecided() && scrolled > document.body.scrollHeight * 0.4) {
          show()
          window.removeEventListener("scroll", onScroll)
        }
      }
      window.addEventListener("scroll", onScroll, { passive: true })
      return () => {
        if (timer) clearTimeout(timer)
        window.removeEventListener("scroll", onScroll)
      }
    }

    const cleanup = arm()
    // Re-check when the consent banner resolves
    window.addEventListener("piads-consent-decided", arm as EventListener)
    return () => {
      cleanup()
      window.removeEventListener("piads-consent-decided", arm as EventListener)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem(SEEN_KEY, "1")
    setVisible(false)
  }

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus("sending")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), page: window.location.pathname }),
      })
      if (!res.ok) throw new Error()
      setStatus("done")
      window.posthog?.capture("newsletter_signup", { page: window.location.pathname })
      setTimeout(dismiss, 2200)
    } catch {
      setStatus("error")
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      {/* Scrim */}
      <button
        aria-label="Close"
        onClick={dismiss}
        className="absolute inset-0 bg-gray-950/40 backdrop-blur-[2px]"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Brand header */}
        <div className="relative bg-gradient-to-br from-[#7a5cff] to-[#5234c9] px-7 pb-7 pt-8 text-white">
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            ✕
          </button>
          <p className="text-xs font-bold uppercase tracking-widest text-white/70">PiAds</p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
            Turn your screens into revenue
          </h2>
          <p className="mt-1.5 text-sm text-white/80">
            Digital signage that pays for itself — keep 75% of ad revenue from your displays.
          </p>
        </div>

        <div className="px-7 py-6">
          {status === "done" ? (
            <div className="py-2 text-center">
              <p className="text-base font-bold text-gray-900">You&apos;re on the list! 🎉</p>
              <p className="mt-1 text-sm text-gray-600">We&apos;ll keep you posted — no spam, ever.</p>
            </div>
          ) : (
            <>
              <Link
                href="/get-started"
                onClick={dismiss}
                className="block w-full rounded-xl bg-[#6C4BF5] px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#6C4BF5]/25 transition hover:bg-[#5a3fd6]"
              >
                Get started free →
              </Link>

              <div className="my-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-medium text-gray-400">or get updates</span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>

              <form onSubmit={subscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#6C4BF5] focus:outline-none focus:ring-2 focus:ring-[#6C4BF5]/20"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  {status === "sending" ? "…" : "Subscribe"}
                </button>
              </form>
              {status === "error" && (
                <p className="mt-2 text-xs text-red-600">Something went wrong — please try again.</p>
              )}
              <p className="mt-3 text-center text-[11px] text-gray-400">
                Product updates and signage tips, about once a month.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
