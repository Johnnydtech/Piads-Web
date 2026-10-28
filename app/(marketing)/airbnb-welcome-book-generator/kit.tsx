'use client'

// The free host starter kit: printable pages (welcome + Wi-Fi sign, checkout
// card, local guide, guest messages) built from what the host typed into the
// generator, plus copy-ready guest messages.
//
// Everything here runs in the browser. The Wi-Fi password and the host's photo
// are never sent to PiAds: the pages are drawn to images on the device and
// packed into a PDF on the device.
//
// The local guide uses place names and a Google Maps link per place, not
// Google's photos or ratings: a printout is kept indefinitely, and Places
// photos and details may not be stored. The live TV screen fetches them fresh.

import { QRCodeSVG } from 'qrcode.react'
import { guestMessages, mapsUrl, wifiQrValue, type KitData } from './kit-text'

export * from './kit-text'

/** Letter paper at 96 CSS px per inch; exported at 2.5x for ~240 dpi prints. */
export const PAGE_W = 816
export const PAGE_H = 1056
const EXPORT_SCALE = 2.5

const SERIF = 'var(--font-editorial), "Instrument Serif", Georgia, "Times New Roman", serif'
const SANS = 'var(--font-sans), "Instrument Sans", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
const INK = '#17130F'
const BRASS = '#B08D57'
const MUTED = '#6E6259'
const PAPER = '#FBF9F6'
const LINE = 'rgba(23,19,15,.14)'

// ---- pages -----------------------------------------------------------------

const page: React.CSSProperties = {
  position: 'relative',
  width: PAGE_W,
  height: PAGE_H,
  background: '#fff',
  color: INK,
  fontFamily: SANS,
  padding: '72px 80px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}
const kicker: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '.22em',
  textTransform: 'uppercase',
  color: BRASS,
}
const heading: React.CSSProperties = { fontFamily: SERIF, fontWeight: 400, fontSize: 72, lineHeight: 1, margin: '14px 0 0', letterSpacing: '-.01em' }
const lede: React.CSSProperties = { fontSize: 19, lineHeight: 1.55, color: MUTED, margin: '20px 0 0', maxWidth: 600 }
const rule: React.CSSProperties = { width: 64, height: 2, background: BRASS, margin: '36px 0' }
const footer: React.CSSProperties = { marginTop: 'auto', fontSize: 11.5, color: MUTED, letterSpacing: '.04em', display: 'flex', justifyContent: 'space-between' }

function Footer({ note }: { note?: string }) {
  return (
    <div style={footer}>
      <span>{note || ''}</span>
      <span>Made free with PiAds &middot; piads.co</span>
    </div>
  )
}

function Bullet() {
  return <span style={{ width: 7, height: 7, borderRadius: 999, background: BRASS, flex: 'none', marginTop: 10 }} />
}

export function WelcomeSignPage({ data }: { data: KitData }) {
  const { wifiName, wifiPassword, rules } = data.details
  const blank = <span style={{ display: 'inline-block', width: 260, borderBottom: `1.5px solid ${LINE}`, height: 30 }} />
  return (
    <div style={page}>
      <div style={kicker}>{data.propertyName || 'Welcome'}</div>
      <h1 style={heading}>Welcome</h1>
      {data.message ? <p style={lede}>{data.message}</p> : null}
      <div style={rule} />

      <div style={{ display: 'flex', gap: 40, alignItems: 'center', background: PAPER, border: `1px solid ${LINE}`, borderRadius: 20, padding: '34px 38px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={kicker}>Wi-Fi</div>
          <div style={{ marginTop: 18, fontSize: 13, color: MUTED, letterSpacing: '.08em', textTransform: 'uppercase' }}>Network</div>
          <div style={{ fontSize: 30, fontWeight: 600, marginTop: 4, wordBreak: 'break-word' }}>{wifiName || blank}</div>
          <div style={{ marginTop: 18, fontSize: 13, color: MUTED, letterSpacing: '.08em', textTransform: 'uppercase' }}>Password</div>
          <div style={{ fontSize: 30, fontWeight: 600, marginTop: 4, fontFamily: 'ui-monospace, Menlo, Consolas, monospace', wordBreak: 'break-all' }}>
            {wifiName ? wifiPassword || 'No password needed' : blank}
          </div>
        </div>
        {wifiName ? (
          <div style={{ textAlign: 'center', flex: 'none' }}>
            <div style={{ background: '#fff', padding: 12, borderRadius: 14, border: `1px solid ${LINE}` }}>
              <QRCodeSVG value={wifiQrValue(wifiName, wifiPassword)} size={168} level="M" fgColor={INK} bgColor="#ffffff" />
            </div>
            <div style={{ marginTop: 10, fontSize: 13, fontWeight: 600, color: MUTED }}>Scan with your camera to join</div>
          </div>
        ) : null}
      </div>

      {rules.length ? (
        <div style={{ marginTop: 48 }}>
          <div style={kicker}>A few house rules</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'grid', gap: 14 }}>
            {rules.map((r) => (
              <li key={r} style={{ display: 'flex', gap: 14, fontSize: 21 }}>
                <Bullet />
                {r}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Footer />
    </div>
  )
}

export function CheckoutPage({ data }: { data: KitData }) {
  return (
    <div style={page}>
      <div style={kicker}>{data.propertyName || 'Checkout'}</div>
      <h1 style={heading}>Before you go</h1>
      {data.checkout ? <p style={{ ...lede, color: INK, fontSize: 24 }}>{data.checkout}</p> : null}
      <div style={rule} />
      {data.details.checkoutSteps.length ? (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 22 }}>
          {data.details.checkoutSteps.map((s) => (
            <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 24 }}>
              <span style={{ width: 28, height: 28, border: `2px solid ${BRASS}`, borderRadius: 7, flex: 'none' }} />
              {s}
            </li>
          ))}
        </ul>
      ) : null}
      <div style={{ marginTop: 64, fontFamily: SERIF, fontSize: 40, lineHeight: 1.15 }}>
        Thank you for staying with us.
        <div style={{ fontFamily: SANS, fontSize: 18, color: MUTED, marginTop: 14, lineHeight: 1.5 }}>
          If you enjoyed your stay, a review means the world to us.
        </div>
      </div>
      <Footer />
    </div>
  )
}

export function LocalGuidePage({ data }: { data: KitData }) {
  const picks = data.picks.slice(0, 8)
  return (
    <div style={page}>
      <div style={kicker}>Local guide</div>
      <h1 style={{ ...heading, fontSize: 60 }}>Our favorite spots{data.city ? ` in ${data.city}` : ''}</h1>
      <p style={lede}>Scan a code with your phone’s camera to open the place in Google Maps.</p>
      <div style={{ ...rule, margin: '30px 0' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {picks.map((p, i) => (
          <div key={p.place_id} style={{ display: 'flex', alignItems: 'center', gap: 16, border: `1px solid ${LINE}`, borderRadius: 16, padding: 14, background: PAPER }}>
            <div style={{ background: '#fff', padding: 6, borderRadius: 10, flex: 'none' }}>
              <QRCodeSVG value={mapsUrl(p)} size={84} level="L" fgColor={INK} bgColor="#ffffff" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: SERIF, fontSize: 18, color: BRASS }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.25, marginTop: 2 }}>{p.name}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer note="Places from Google Maps" />
    </div>
  )
}

export function MessagesPage({ data }: { data: KitData }) {
  return (
    <div style={page}>
      <div style={kicker}>For you, the host</div>
      <h1 style={{ ...heading, fontSize: 60 }}>Messages to send your guests</h1>
      <p style={lede}>Copy these into Airbnb’s scheduled messages and replace [guest name].</p>
      <div style={{ ...rule, margin: '30px 0' }} />
      <div style={{ display: 'grid', gap: 22 }}>
        {guestMessages(data).map((m) => (
          <div key={m.title} style={{ border: `1px solid ${LINE}`, borderRadius: 16, padding: '20px 24px', background: PAPER }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 19, fontWeight: 650 }}>{m.title}</span>
              <span style={{ fontSize: 13, color: MUTED }}>{m.when}</span>
            </div>
            <p style={{ margin: '10px 0 0', fontSize: 16.5, lineHeight: 1.55 }}>{m.text}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export const KIT_PAGES = [
  { key: 'welcome', label: 'Welcome & Wi-Fi sign', Page: WelcomeSignPage },
  { key: 'checkout', label: 'Checkout card', Page: CheckoutPage },
  { key: 'guide', label: 'Local guide', Page: LocalGuidePage },
  { key: 'messages', label: 'Guest messages', Page: MessagesPage },
] as const

/** Draws each rendered page to a PNG and packs them into one Letter-size PDF. */
export async function buildKitPdf(pages: HTMLElement[]): Promise<Blob> {
  const [{ toPng }, { PDFDocument }] = await Promise.all([import('html-to-image'), import('pdf-lib')])
  const pdf = await PDFDocument.create()
  pdf.setTitle('Host starter kit')
  pdf.setCreator('PiAds (piads.co)')
  for (const node of pages) {
    const dataUrl = await toPng(node, { width: PAGE_W, height: PAGE_H, pixelRatio: EXPORT_SCALE, backgroundColor: '#ffffff' })
    const png = await pdf.embedPng(dataUrl)
    const sheet = pdf.addPage([612, 792]) // Letter, in points
    sheet.drawImage(png, { x: 0, y: 0, width: 612, height: 792 })
  }
  const bytes = await pdf.save()
  return new Blob([bytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' })
}
