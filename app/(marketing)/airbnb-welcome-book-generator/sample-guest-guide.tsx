'use client'

import { useId, useState, type ReactNode } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowUpRight, Check, Copy, Home, MapPin, Wifi } from 'lucide-react'
import {
  safeGuestUrl,
  wifiQrValue,
  type GuestGuideData,
} from './sample-guest-data'
import s from './sample-guest.module.css'

export default function GuestGuide({
  guide,
  children,
  preview = false,
}: {
  guide: GuestGuideData
  children?: ReactNode
  preview?: boolean
}) {
  const id = useId().replace(/:/g, '')
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle')
  const [failedArtwork, setFailedArtwork] = useState<string | undefined>()
  const artwork = safeGuestUrl(guide.design?.artwork_url)
  const manual = safeGuestUrl(guide.manual_url)
  const hasHouse = !!(guide.checkout_text || guide.house_notes.length || manual)
  const copy = async () => {
    const value =
      guide.wifi.security === 'nopass' ? guide.wifi.ssid : guide.wifi.password
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(value)
      setCopied('ok')
    } catch {
      setCopied('fail')
    }
  }
  return (
    <article
      className={s.guide}
      data-style={guide.design?.style || 'illustrated'}
      aria-label="Your guest guide"
    >
      {preview && (
        <div className={s.previewLabel}>
          Phone preview · your unsaved changes
        </div>
      )}
      <header className={s.header}>
        <div className={s.eyebrow}>A little guide to your stay</div>
        <h1>{guide.property_name || 'Make yourself at home'}</h1>
        <p>
          {guide.welcome_message ||
            (guide.guest_name
              ? `Welcome, ${guide.guest_name}. Settle in and enjoy your stay.`
              : 'Settle in. Everything you need is right here.')}
        </p>
        {artwork && failedArtwork !== artwork && (
          <img
            className={s.artwork}
            src={artwork}
            alt=""
            onError={() => setFailedArtwork(artwork)}
            referrerPolicy="no-referrer"
          />
        )}
      </header>
      <nav className={s.nav} aria-label="Guide sections">
        <a href={`#${id}-wifi`}>
          <Wifi size={16} /> Wi-Fi
        </a>
        {hasHouse && (
          <a href={`#${id}-house`}>
            <Home size={16} /> Your stay
          </a>
        )}
        {!!guide.picks.length && (
          <a href={`#${id}-explore`}>
            <MapPin size={16} /> Explore
          </a>
        )}
      </nav>
      <div className={s.body}>
        <section id={`${id}-wifi`} className={s.wifi} data-ph-mask>
          <div className={s.sectionTop}>
            <span className={s.eyebrow}>First, get connected</span>
            <Wifi size={22} />
          </div>
          <h2>Your Wi-Fi</h2>
          {guide.wifi.ssid ? (
            <>
              <dl>
                <dt>Network</dt>
                <dd>{guide.wifi.ssid}</dd>
                <dt>
                  {guide.wifi.security === 'nopass' ? 'Access' : 'Password'}
                </dt>
                <dd className={s.password}>
                  {guide.wifi.security === 'nopass'
                    ? 'No password needed'
                    : guide.wifi.password || 'Ask your host for the password'}
                </dd>
              </dl>
              {(guide.wifi.password || guide.wifi.security === 'nopass') && (
                <button className={s.primary} type="button" onClick={copy}>
                  {copied === 'ok' ? <Check size={17} /> : <Copy size={17} />}
                  {copied === 'ok'
                    ? 'Copied'
                    : guide.wifi.security === 'nopass'
                      ? 'Copy network name'
                      : 'Copy password'}
                </button>
              )}
              <div role="status" className={s.fine}>
                {copied === 'fail'
                  ? 'Touch and hold the text above to copy it.'
                  : copied === 'ok'
                    ? 'Open your device’s Wi-Fi settings to connect.'
                    : ''}
              </div>
              {(guide.wifi.password || guide.wifi.security === 'nopass') && (
                <details className={s.details}>
                  <summary>Connect another device</summary>
                  <div className={s.qr}>
                    <QRCodeSVG
                      value={wifiQrValue(guide.wifi)}
                      size={128}
                      level="M"
                      marginSize={4}
                    />
                    <p>
                      Scan this code with the other device’s camera to join the
                      Wi-Fi.
                    </p>
                  </div>
                </details>
              )}
            </>
          ) : (
            <p>
              Your host hasn’t added Wi-Fi details yet. Please ask them how to
              connect.
            </p>
          )}
        </section>
        {hasHouse && (
          <section id={`${id}-house`} className={s.section}>
            <span className={s.eyebrow}>Good to know</span>
            <h2>A comfortable stay</h2>
            {guide.checkout_text && (
              <div className={s.checkout}>
                <h3>Before you leave</h3>
                <p>{guide.checkout_text}</p>
              </div>
            )}
            {guide.house_notes.length > 0 && (
              <div>
                <h3>A few house notes</h3>
                <ul className={s.notes}>
                  {guide.house_notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
            {manual && (
              <a
                className={s.manual}
                href={manual}
                target="_blank"
                rel="noopener noreferrer"
              >
                {guide.manual_name || 'Open the house manual'}
                <ArrowUpRight size={18} />
                <span className={s.srOnly}> (opens in a new tab)</span>
              </a>
            )}
          </section>
        )}
        {guide.picks.length > 0 && (
          <section id={`${id}-explore`} className={s.section}>
            <span className={s.eyebrow}>Step outside</span>
            <h2>Around the neighborhood</h2>
            <p className={s.intro}>A few local favorites from your host.</p>
            <div className={s.picks}>
              {guide.picks.map((pick, index) => {
                const map = safeGuestUrl(pick.map_url)
                const photo = safeGuestUrl(pick.photo_url)
                return (
                  <div key={pick.place_id} className={s.pick}>
                    {photo ? (
                      <img
                        src={photo}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className={s.pickNumber}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    )}
                    <div>
                      <h3>{pick.name}</h3>
                      {pick.blurb && <p>{pick.blurb}</p>}
                      {typeof pick.rating === 'number' && (
                        <p className={s.fine}>
                          ★ {pick.rating.toFixed(1)} · Google
                        </p>
                      )}
                      {map && (
                        <a href={map} target="_blank" rel="noopener noreferrer">
                          Get directions <ArrowUpRight size={14} />
                          <span className={s.srOnly}>
                            {' '}
                            to {pick.name} (opens in a new tab)
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
        {children && <section className={s.section}>{children}</section>}
        <footer className={s.footer}>
          Made for your stay <span aria-hidden>·</span> Powered by PiAds
        </footer>
      </div>
    </article>
  )
}
