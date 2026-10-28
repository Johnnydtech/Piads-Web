'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Download, ImagePlus, Loader2, MapPin, Sparkles, Star, X } from 'lucide-react'
import { WelcomeScreen, type WelcomePick, type WelcomeScreenData } from '@/components/welcome-screen'
import { TurnstileWidget } from '@/components/turnstile-widget'
import { track, trackCta } from '@/lib/analytics'
import { hostSignupUrl } from '@/lib/signup-links'
import styles from './generator.module.css'

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.piads.co').replace(/\/$/, '')
const SIGN_UP = hostSignupUrl(process.env.NEXT_PUBLIC_APP_URL || 'https://app.piads.co', 'short_term_rental')
const NEEDS_CAPTCHA = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const DEFAULT_GUEST = 'Maya'
const DEFAULT_MESSAGE = 'Make yourself at home. Here are a few of our favorite spots nearby.'
const DEFAULT_CHECKOUT = 'Checkout is at 11 AM. Just lock up and leave the keys on the counter.'

interface Generated {
  location: { formatted_address: string; city: string }
  utc_offset_minutes: number | null
  weather: WelcomeScreenData['weather']
  picks: WelcomePick[]
}

type Status = 'idle' | 'loading' | 'ready' | 'error'

function errorMessage(body: any): { message: string; code: string } {
  const err = body?.detail || body?.error || {}
  return {
    message: err.message || 'Something went wrong. Please try again.',
    code: err.code || 'unknown',
  }
}

export function WelcomeBookGenerator() {
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [result, setResult] = useState<Generated | null>(null)
  const [picks, setPicks] = useState<WelcomePick[]>([])

  const [guestName, setGuestName] = useState(DEFAULT_GUEST)
  const [propertyName, setPropertyName] = useState('')
  const [propertyTouched, setPropertyTouched] = useState(false)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const [checkout, setCheckout] = useState(DEFAULT_CHECKOUT)
  const [photo, setPhoto] = useState<string | null>(null)

  const [token, setToken] = useState<string | null>(null)
  const [captchaReset, setCaptchaReset] = useState(0)

  const [gateOpen, setGateOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [gateError, setGateError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [exporting, setExporting] = useState(false)

  const addressRef = useRef<HTMLInputElement>(null)
  const workspaceRef = useRef<HTMLElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  // The photo never leaves the browser: it is an object URL, released when
  // replaced or when the page goes away.
  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo) }, [photo])

  const onToken = useCallback((t: string | null) => setToken(t), [])

  async function generate(e?: React.FormEvent) {
    e?.preventDefault()
    const value = address.trim()
    if (value.length < 3) {
      setError('Enter your rental’s street address and city.')
      setStatus('error')
      return
    }
    if (NEEDS_CAPTCHA && !token) {
      setError('One moment, the quick check is still loading.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setError('')
    track('welcome_generator_submitted')
    try {
      const res = await fetch(`${API_URL}/api/v1/guests/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: value, turnstile_token: token }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        const { message: msg, code } = errorMessage(body)
        throw Object.assign(new Error(msg), { code })
      }
      const data: Generated = body.data
      setResult(data)
      setPicks(data.picks || [])
      if (!propertyTouched) setPropertyName(data.location.city ? `Your stay in ${data.location.city}` : '')
      setStatus('ready')
      track('welcome_generator_generated', { picks: (data.picks || []).length, city: data.location.city || '' })
      requestAnimationFrame(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.')
      setStatus('error')
      track('welcome_generator_failed', { code: err?.code || 'network' })
    } finally {
      // Turnstile tokens are single-use; ask for a fresh one for the next try.
      setCaptchaReset((n) => n + 1)
    }
  }

  function changeAddress() {
    addressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    addressRef.current?.focus()
    addressRef.current?.select()
  }

  function removePick(placeId: string) {
    setPicks((current) => (current.length > 1 ? current.filter((p) => p.place_id !== placeId) : current))
    track('welcome_generator_pick_removed')
  }

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    setPhoto(URL.createObjectURL(file))
    track('welcome_generator_photo_added')
  }

  const screen: WelcomeScreenData = {
    guest_name: guestName.trim(),
    welcome_message: message.trim(),
    property_name: propertyName.trim(),
    checkout_text: checkout.trim(),
    background_url: photo,
    picks: status === 'ready' ? picks : [],
    utc_offset_minutes: result?.utc_offset_minutes ?? null,
    weather: result?.weather ?? null,
  }

  async function exportPng() {
    setExporting(true)
    try {
      // Let React mount the 1920x1080 export copy, then wait for its photos.
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      const node = exportRef.current
      if (!node) throw new Error('export node missing')
      await Promise.all(
        Array.from(node.querySelectorAll('img')).map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined)))
      )
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(node, { width: 1920, height: 1080, pixelRatio: 1, backgroundColor: '#17130F' })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `welcome-screen-${(result?.location.city || 'piads').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`
      a.click()
      track('welcome_generator_downloaded', { picks: picks.length })
    } finally {
      setExporting(false)
    }
  }

  async function submitGate(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setGateError('Enter a valid email address.')
      return
    }
    setGateError('')
    setDownloading(true)
    // Record the lead, but never let a failed notification block the download.
    fetch('/api/welcome-generator-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: value, city: result?.location.city || '', picks: picks.length }),
    }).catch(() => undefined)
    track('welcome_generator_lead')
    try {
      await exportPng()
      setGateOpen(false)
    } catch {
      setGateError('We couldn’t build the image. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const ready = status === 'ready' && result

  return (
    <>
      <section className={styles.hero} aria-labelledby="generator-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <Sparkles size={14} aria-hidden /> Free tool &middot; No signup
          </p>
          <h1 id="generator-title" className={styles.title}>
            Your Airbnb welcome book,
            <br />
            <em>done in ten seconds.</em>
          </h1>
          <p className={styles.lede}>
            Type your rental’s address. We pick the best-rated coffee, food, drinks and things to do nearby,
            with photos and today’s hours, and lay it out on the welcome screen your guests see on the TV.
          </p>

          <form className={styles.form} onSubmit={generate} noValidate>
            <label htmlFor="wg-address" className="sr-only">
              Rental address
            </label>
            <div className={styles.inputWrap}>
              <MapPin size={18} aria-hidden />
              <input
                id="wg-address"
                ref={addressRef}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Scottsdale, AZ"
                autoComplete="street-address"
                maxLength={200}
              />
            </div>
            <button type="submit" className={styles.generate} disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className={styles.spin} aria-hidden /> Finding places…
                </>
              ) : (
                <>
                  Generate <ArrowUpRight size={18} aria-hidden />
                </>
              )}
            </button>
          </form>
          <TurnstileWidget onToken={onToken} resetKey={captchaReset} />
          {status === 'error' ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}

          <ul className={styles.heroPoints}>
            <li><Check size={15} aria-hidden /> Free, no account</li>
            <li><Check size={15} aria-hidden /> Real places, today’s hours</li>
            <li><Check size={15} aria-hidden /> Download it or put it on your TV</li>
          </ul>
        </div>
      </section>

      <section className={styles.workspace} ref={workspaceRef} aria-label="Your welcome screen">
        {ready ? (
          <div className={styles.resolved}>
            <MapPin size={15} aria-hidden />
            <span>
              Picked for <strong>{result.location.formatted_address}</strong>
            </span>
            <button type="button" onClick={changeAddress}>
              Not your place? Change address
            </button>
          </div>
        ) : null}

        <div className={styles.grid}>
          <div>
            <div className={styles.tv}>
              <div className={styles.tvScreen}>
                <WelcomeScreen data={screen} />
                {status === 'loading' ? (
                  <div className={styles.tvLoading}>
                    <Loader2 size={22} className={styles.spin} aria-hidden /> Finding the best spots near you…
                  </div>
                ) : null}
                {status === 'idle' || status === 'error' ? (
                  <div className={styles.tvHint}>Your local picks appear here</div>
                ) : null}
              </div>
            </div>
            <p className={styles.tvCaption} aria-live="polite">
              {ready
                ? 'Live preview. This is exactly what your guests see on the TV.'
                : 'An example welcome screen. Add your address to fill in the local picks.'}
            </p>
          </div>

          <aside className={styles.panel}>
            <h2>Make it yours</h2>
            <div className={styles.field}>
              <label htmlFor="wg-guest">Guest’s name</label>
              <input id="wg-guest" value={guestName} maxLength={40} onChange={(e) => setGuestName(e.target.value)} />
              <small>On PiAds this changes for every booking.</small>
            </div>
            <div className={styles.field}>
              <label htmlFor="wg-property">Property name</label>
              <input
                id="wg-property"
                value={propertyName}
                maxLength={60}
                placeholder="e.g. The Coastal House"
                onChange={(e) => {
                  setPropertyName(e.target.value)
                  setPropertyTouched(true)
                }}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="wg-message">Welcome message</label>
              <textarea id="wg-message" rows={2} value={message} maxLength={140} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label htmlFor="wg-checkout">Checkout note</label>
              <textarea id="wg-checkout" rows={2} value={checkout} maxLength={120} onChange={(e) => setCheckout(e.target.value)} />
            </div>
            <label className={styles.photoButton}>
              <ImagePlus size={17} aria-hidden />
              {photo ? 'Change the background photo' : 'Add a photo of your place'}
              <input type="file" accept="image/*" onChange={onPhoto} className="sr-only" />
            </label>

            {ready ? (
              <>
                <div className={styles.picksHeader}>
                  <h3>Local picks</h3>
                  <span>{picks.length} chosen</span>
                </div>
                <ul className={styles.picks}>
                  {picks.map((p) => (
                    <li key={p.place_id}>
                      <div>
                        <strong>{p.name}</strong>
                        <span>
                          {typeof p.rating === 'number' ? (
                            <>
                              <Star size={12} aria-hidden fill="currentColor" /> {p.rating.toFixed(1)}
                            </>
                          ) : null}
                          {p.closes_at ? ` · ${p.closes_at === 'Closed' ? 'closed today' : p.closes_at === 'Open 24 hours' ? 'open 24 hours' : `open till ${p.closes_at}`}` : ''}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePick(p.place_id)}
                        disabled={picks.length <= 1}
                        aria-label={`Remove ${p.name}`}
                      >
                        <X size={15} aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className={styles.actions}>
                  <a
                    className={styles.primary}
                    href={SIGN_UP}
                    onClick={() => trackCta('Put it on my TV', 'welcome-generator', { picks: picks.length })}
                  >
                    Put it on my TV, free <ArrowUpRight size={18} aria-hidden />
                  </a>
                  {gateOpen ? (
                    <form className={styles.gate} onSubmit={submitGate} noValidate>
                      <label htmlFor="wg-email">Where should we send it? Enter your email to download.</label>
                      <div>
                        <input
                          id="wg-email"
                          type="email"
                          value={email}
                          autoComplete="email"
                          placeholder="you@example.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" disabled={downloading}>
                          {downloading ? <Loader2 size={16} className={styles.spin} aria-hidden /> : <Download size={16} aria-hidden />}
                          Download
                        </button>
                      </div>
                      {gateError ? <p role="alert">{gateError}</p> : null}
                    </form>
                  ) : (
                    <button type="button" className={styles.secondary} onClick={() => setGateOpen(true)}>
                      <Download size={17} aria-hidden /> Download for your TV (PNG)
                    </button>
                  )}
                  <p className={styles.fineprint}>
                    Free on PiAds when you enable approved local ad slots, or $10 per screen per month without ads.
                    No card to start.
                  </p>
                </div>
              </>
            ) : null}
          </aside>
        </div>
      </section>

      {exporting && ready ? (
        <div aria-hidden className={styles.exportStage}>
          <div ref={exportRef} style={{ position: 'relative', width: 1920, height: 1080 }}>
            <WelcomeScreen data={screen} frozen />
          </div>
        </div>
      ) : null}
    </>
  )
}
