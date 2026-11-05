'use client'

import { useEffect, useRef, useState } from 'react'

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

/** A fresh widget issues a single-use token. Failed verification never unlocks submission. */
export function TurnstileWidget({ onToken, resetKey = 0 }: { onToken: (token: string | null) => void; resetKey?: number }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const host = useRef<HTMLDivElement>(null)
  const onTokenRef = useRef(onToken)
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState<'loading' | 'ready' | 'retry'>('loading')

  useEffect(() => { onTokenRef.current = onToken }, [onToken])

  useEffect(() => {
    if (!siteKey || !host.current) return
    let cancelled = false
    let widgetId: string | null = null
    let frame = 0
    let readinessTimer: ReturnType<typeof setTimeout> | undefined
    setStatus('loading')
    onTokenRef.current(null)
    const stalledTimer = setTimeout(() => {
      clearTimeout(readinessTimer)
      if (!cancelled) setStatus(current => current === 'ready' ? current : 'retry')
    }, 15000)
    const failed = () => {
      if (cancelled) return
      onTokenRef.current(null)
      setStatus('retry')
    }
    const render = () => {
      if (cancelled || !host.current || widgetId) return
      // A dialog portal or a client-side navigation can mount before the shared
      // script is ready. Wait for both the API and the visible container.
      if (!window.turnstile || host.current.getBoundingClientRect().width === 0) {
        readinessTimer = setTimeout(render, 100)
        return
      }
      try {
        widgetId = window.turnstile.render(host.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            if (cancelled) return
            clearTimeout(stalledTimer)
            setStatus('ready')
            onTokenRef.current(token)
          },
          'expired-callback': failed,
          'error-callback': failed,
          'timeout-callback': failed,
          'unsupported-callback': failed,
          theme: 'light',
          size: 'flexible',
        })
      } catch { failed() }
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    // Retry a failed script download; leave a healthy shared script in place.
    if (script?.dataset.loadFailed === 'true' && !window.turnstile) {
      script.remove()
      script = null
    }
    if (!script && !window.turnstile) {
      script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      document.head.appendChild(script)
    }
    const scriptFailed = () => {
      if (script) script.dataset.loadFailed = 'true'
      clearTimeout(readinessTimer)
      failed()
    }
    script?.addEventListener('error', scriptFailed)
    frame = requestAnimationFrame(render)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      clearTimeout(readinessTimer)
      clearTimeout(stalledTimer)
      script?.removeEventListener('error', scriptFailed)
      if (widgetId && window.turnstile?.remove) {
        try { window.turnstile.remove(widgetId) } catch {}
      }
    }
  }, [siteKey, resetKey, attempt])

  if (!siteKey) return null
  return <div style={{ marginTop: 12 }}>
    <div ref={host} />
    {status !== 'ready' && <p role="status" style={{ fontSize: 13, marginTop: 8 }}>
      {status === 'loading' ? 'Checking your browser…' : <>Verification is taking longer than expected. <button type="button" onClick={() => setAttempt(n => n + 1)} style={{ textDecoration: 'underline', fontWeight: 600 }}>Retry verification</button></>}
    </p>}
  </div>
}
