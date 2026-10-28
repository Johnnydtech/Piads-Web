'use client'

import { useEffect, useRef } from 'react'

// Ported from the CMS (PiAds components/TurnstileWidget.tsx) so both apps
// talk to the same Cloudflare widget the same way.

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove?: (id: string) => void
    }
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

/**
 * Cloudflare Turnstile. Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is
 * absent, so the form keeps working where the API does not enforce it (dev).
 * `resetKey` re-issues a token: Turnstile tokens are single-use, so a form that
 * submits more than once must ask for a fresh one each time.
 */
export function TurnstileWidget({ onToken, resetKey = 0 }: { onToken: (token: string | null) => void; resetKey?: number }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const host = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    if (!siteKey || !host.current) return
    let cancelled = false

    const render = () => {
      if (cancelled || !host.current || !window.turnstile || widgetId.current) return
      widgetId.current = window.turnstile.render(host.current, {
        sitekey: siteKey,
        callback: (t: string) => onToken(t),
        'expired-callback': () => onToken(null),
        'error-callback': () => onToken(null),
        theme: 'light',
        size: 'flexible',
      })
    }

    if (window.turnstile) {
      render()
    } else {
      let s = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
      if (!s) {
        s = document.createElement('script')
        s.src = SCRIPT_SRC
        s.async = true
        document.head.appendChild(s)
      }
      s.addEventListener('load', render)
    }

    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile?.remove) {
        try { window.turnstile.remove(widgetId.current) } catch {}
        widgetId.current = null
      }
    }
  }, [siteKey, onToken])

  useEffect(() => {
    if (resetKey && widgetId.current && window.turnstile) {
      onToken(null)
      try { window.turnstile.reset(widgetId.current) } catch {}
    }
  }, [resetKey, onToken])

  if (!siteKey) return null
  return <div ref={host} style={{ marginTop: 12 }} />
}
