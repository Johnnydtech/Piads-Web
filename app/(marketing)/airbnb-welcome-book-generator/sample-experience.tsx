'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CoverPage, WelcomeSignPage } from './kit'
import GuestGuide from './sample-guest-guide'
import type { GuestGuideData } from './sample-guest-data'
import { sampleBook, SAMPLE_STYLES, type SampleStyle } from './samples/sample-data'
import styles from './showcase.module.css'

export function sampleGuest(style: SampleStyle): GuestGuideData {
  const book = sampleBook(style)
  const design = SAMPLE_STYLES.find(s => s.key === style) || SAMPLE_STYLES[0]
  return {
    guest_name: 'Maya', property_name: book.propertyName, welcome_message: book.message,
    design: { style: design.phoneStyle, artwork_url: design.art },
    wifi: { ssid: book.details.wifiName, password: book.details.wifiPassword, security: 'WPA' },
    checkout_text: book.checkout, house_notes: book.details.rules,
    picks: book.picks,
  }
}

// Render the real templates at their native dimensions, then scale the display.
// The decorative versions are inert; their adjacent links open interactive demos.
function ScaledCanvas({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.inert = true
    const resize = () => setScale(node.clientWidth / width)
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(node)
    return () => observer.disconnect()
  }, [width])
  return <div ref={ref} aria-hidden="true" style={{ width: '100%', aspectRatio: `${width}/${height}`, overflow: 'hidden', pointerEvents: 'none' }}>
    <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden' }}>{children}</div>
  </div>
}

export function PhoneMockup({ style }: { style: SampleStyle }) {
  return <div className={styles.phone}>
    <div className={styles.phoneBar} aria-hidden="true"><span>9:41</span><span>● ▰</span></div>
    <div className={styles.phoneIsland} aria-hidden="true" />
    <ScaledCanvas width={375} height={760}><GuestGuide guide={sampleGuest(style)} /></ScaledCanvas>
    <div className={styles.homeIndicator} aria-hidden="true" />
  </div>
}

export function BookCollection({ style }: { style: SampleStyle }) {
  const book = sampleBook(style)
  return <div className={styles.collection} data-theme={style}>
    <span className={styles.collectionLabel}>A little book. A pocket guide.</span>
    <div className={styles.backPage}><ScaledCanvas width={816} height={1056}><WelcomeSignPage data={book} /></ScaledCanvas></div>
    <div className={styles.cover}><ScaledCanvas width={816} height={1056}><CoverPage data={book} /></ScaledCanvas></div>
    <div className={styles.collectionPhone}><PhoneMockup style={style} /></div>
    <span className={styles.paperTag}>Print it. Keep it.</span><span className={styles.phoneTag}>Scan it. Take it along.</span>
  </div>
}
