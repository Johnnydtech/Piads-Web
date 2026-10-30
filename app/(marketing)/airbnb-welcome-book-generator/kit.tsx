'use client'

import type { CSSProperties, ReactNode } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  BOOK_THEMES,
  customLines,
  guestMessages,
  mapsUrl,
  wifiQrValue,
  type KitData,
  type PaperSize,
} from './kit-text'
export * from './kit-text'

export const PAGE_W = 816
export const PAGE_H = 1056
const SERIF = 'var(--font-editorial), "Instrument Serif", Georgia, serif'
const SANS = 'var(--font-sans), "Instrument Sans", Arial, sans-serif'
const INK = 'var(--book-ink)'
const ACCENT = 'var(--book-accent)'
const PAPER = 'var(--book-paper)'
const MUTED = '#5e6660'
const LINE = '#dce2d9'
const eyebrow: CSSProperties = {
  fontSize: 12,
  letterSpacing: '.2em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: ACCENT,
}
const copy: CSSProperties = {
  fontSize: 19,
  lineHeight: 1.55,
  color: MUTED,
  whiteSpace: 'pre-line',
  overflowWrap: 'anywhere',
}
const box: CSSProperties = {
  background: PAPER,
  padding: '24px 28px',
  borderRadius: 14,
  border: `1px solid ${LINE}`,
}

function Sheet({
  data,
  section,
  title,
  intro,
  children,
}: {
  data: KitData
  section: string
  title: string
  intro?: string
  children: ReactNode
}) {
  const theme = BOOK_THEMES.find((t) => t.key === data.theme) || BOOK_THEMES[0]
  const postcard = theme.key === 'coast'
  const journal = theme.key === 'clay'
  return (
    <div
      data-book-page={section}
      style={
        {
          '--book-ink': theme.ink,
          '--book-accent': theme.accent,
          '--book-paper': theme.paper,
          position: 'relative',
          width: PAGE_W,
          height: PAGE_H,
          boxSizing: 'border-box',
          padding: '52px 64px 34px',
          background: journal ? '#f9f8f5' : theme.paper,
          borderLeft: postcard ? '10px solid #233f89' : undefined,
          borderRight: postcard ? '10px solid #233f89' : undefined,
          color: INK,
          fontFamily: SANS,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        } as CSSProperties
      }
    >
      {theme.key === 'forest' && <img src="/guest-demo/botanical-frame.png" alt="" style={{ position: 'absolute', inset: 16, width: 'calc(100% - 32px)', height: 'calc(100% - 32px)', opacity: postcard ? .08 : .18, pointerEvents: 'none' }} />}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          paddingBottom: 20,
          borderBottom: `1px solid ${LINE}`,
          ...eyebrow,
        }}
      >
        <span style={{ flex: 1, overflowWrap: 'anywhere' }}>
          {data.propertyName || 'Your stay'}
        </span>
        <span style={{ color: MUTED, letterSpacing: '.08em', flexShrink: 0 }}>
          {section}
        </span>
      </div>
      <div data-book-content style={{ flex: 1, minHeight: 0, paddingTop: 30, position: 'relative' }}>
        <h1
          style={{
            fontFamily: SERIF,
            fontSize: 60,
            fontWeight: postcard ? 700 : 400,
            color: INK,
            fontStyle: theme.key === 'forest' ? 'italic' : 'normal',
            lineHeight: 1.05,
            letterSpacing: '-.02em',
            margin: '0 0 18px',
            overflowWrap: 'anywhere',
          }}
        >
          {title}
        </h1>
        {intro && (
          <p style={{ ...copy, margin: '0 0 28px', fontSize: 17 }}>{intro}</p>
        )}
        {children}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
          borderTop: `1px solid ${LINE}`,
          paddingTop: 14,
          marginTop: 20,
          fontSize: 11,
          color: MUTED,
        }}
      >
        <span>{data.city}</span>
        <span>{data.sample ? 'Sample guide · Fictional property · ' : ''}Made with PiAds · piads.co</span>
      </div>
    </div>
  )
}
function Detail({ title, children }: { title: string; children?: string }) {
  if (!children?.trim()) return null
  return (
    <section style={{ marginTop: 22 }}>
      <h2 style={{ ...eyebrow, margin: '0 0 8px' }}>{title}</h2>
      <p style={{ ...copy, margin: 0 }}>{children}</p>
    </section>
  )
}
function Checklist({
  items,
  numbered = false,
}: {
  items: string[]
  numbered?: boolean
}) {
  return (
    <ul
      style={{
        margin: '24px 0',
        padding: 0,
        listStyle: 'none',
        display: 'grid',
        gap: 18,
      }}
    >
      {items.map((item, i) => (
        <li
          key={`${i}-${item}`}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            fontSize: 20,
            lineHeight: 1.45,
            overflowWrap: 'anywhere',
          }}
        >
          <span
            style={{
              border: `1px solid ${LINE}`,
              color: ACCENT,
              width: 30,
              height: 30,
              borderRadius: numbered ? '50%' : 7,
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              fontSize: 14,
            }}
          >
            {numbered ? String(i + 1).padStart(2, '0') : '✓'}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
export function CoverPage({ data }: { data: KitData }) {
  if (data.theme === 'clay' && data.photo) return (
    <div data-book-page="Your guest guide" style={{ width: PAGE_W, height: PAGE_H, position: 'relative', overflow: 'hidden', background: '#292823', color: '#fff9ee', fontFamily: SANS }}>
      <img src={data.photo} alt="Your property" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
      <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(20,19,16,.72),rgba(20,19,16,.18))'}} />
      <div data-book-content style={{position:'absolute',inset:'70px 64px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <p style={{...eyebrow,color:'#fff9ee'}}>A journal for your stay / {data.city}</p>
        <div><h1 style={{color:'#fff9ee',fontFamily:SERIF,fontSize:104,fontWeight:400,lineHeight:.94,overflowWrap:'anywhere',maxWidth:520,margin:'0 0 32px'}}>{data.propertyName}</h1><p style={{fontFamily:SERIF,fontSize:30,fontStyle:'italic',maxWidth:440,lineHeight:1.3}}>{data.message}</p></div>
        <div style={{borderTop:'1px solid #ffffff70',paddingTop:24,fontSize:13,letterSpacing:'.12em'}}>SETTLE IN. SLOW DOWN. STAY A WHILE.<br/><span style={{fontSize:10,letterSpacing:0}}>{data.sample ? 'Sample guide · Fictional property · ' : ''}Made with PiAds · piads.co</span></div>
      </div>
    </div>
  )
  return (
    <Sheet
      data={data}
      section="Your guest guide"
      title={data.propertyName || 'Make yourself at home.'}
      intro={
        data.message ||
        'A little guide to settling in and exploring the neighborhood.'
      }
    >
      <div
        style={{
          height: 350,
          borderRadius: data.theme === 'coast' ? 4 : '150px 150px 14px 14px',
          border: data.theme === 'coast' ? '8px solid white' : undefined,
          transform: data.theme === 'coast' ? 'rotate(-2deg)' : undefined,
          overflow: 'hidden',
          background: PAPER,
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
          margin: '28px 0',
        }}
      >
        {data.photo ? (
          <img
            alt="Your property"
            src={data.photo}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: 220,
              height: 250,
              border: `1px solid ${ACCENT}`,
              borderRadius: '110px 110px 0 0',
              display: 'grid',
              placeItems: 'center',
              color: INK,
            }}
          >
            <span style={{ fontFamily: SERIF, fontSize: 100 }}>
              {data.propertyName.replace(/^the\s+/i, '').trim().charAt(0) || 'W'}
            </span>
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 20,
            right: 20,
            background: '#fffffff2',
            padding: '12px 18px',
            borderRadius: 8,
            fontSize: 14,
            color: INK,
          }}
        >
          Settle in. Slow down. Explore a little.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <Detail title="Your neighborhood">{data.city}</Detail>
        <Detail title="Your host">{data.details.hostName}</Detail>
      </div>
      {data.details.hostContact && (
        <Detail title="Need something during your stay?">
          {data.details.hostContact}
        </Detail>
      )}
    </Sheet>
  )
}
export function ArrivalPage({ data }: { data: KitData }) {
  const d = data.details
  return (
    <Sheet
      data={data}
      section="Arriving"
      title="A smooth arrival."
      intro="The details you need to find your way and settle in."
    >
      <div style={box}>
        <Detail title="Property address">{data.address}</Detail>
        <Detail title="Check-in">{d.checkIn}</Detail>
      </div>
      <Detail title="Finding your way in">{d.arrival}</Detail>
      <Detail title="Parking & getting around">{d.parking}</Detail>
      {d.hostContact && (
        <div style={{ ...box, marginTop: 30 }}>
          <div style={eyebrow}>Your host is here to help</div>
          <p style={{ ...copy, margin: '10px 0 0', color: INK }}>
            {[d.hostName, d.hostContact].filter(Boolean).join('\n')}
          </p>
        </div>
      )}
    </Sheet>
  )
}
export function WelcomeSignPage({ data }: { data: KitData }) {
  const { wifiName, wifiPassword } = data.details
  const blank = (
    <span
      style={{
        display: 'block',
        borderBottom: `1px solid ${LINE}`,
        height: 28,
        width: '100%',
      }}
    />
  )
  return (
    <Sheet
      data={data}
      section="Wi-Fi"
      title="Stay connected."
      intro="Your Wi-Fi details, all in one place."
    >
      <div style={{ ...box, padding: 34 }}>
        <div style={eyebrow}>Network</div>
        <div
          style={{
            fontSize: 30,
            margin: '12px 0 30px',
            fontWeight: 600,
            overflowWrap: 'anywhere',
          }}
        >
          {wifiName || blank}
        </div>
        <div style={eyebrow}>Password</div>
        <div
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: 22,
            lineHeight: 1.4,
            marginTop: 12,
            overflowWrap: 'anywhere',
            whiteSpace: 'pre-wrap',
          }}
        >
          {wifiName ? wifiPassword || 'No password needed' : blank}
        </div>
      </div>
      {wifiName ? (
        <div style={{ textAlign: 'center', marginTop: 38 }}>
          <div
            style={{
              display: 'inline-block',
              padding: 18,
              border: `1px solid ${LINE}`,
              borderRadius: 18,
            }}
          >
            <QRCodeSVG
              value={wifiQrValue(wifiName, wifiPassword)}
              size={220}
              level="M"
              fgColor="#183d32"
              bgColor="#fff"
            />
          </div>
          <p style={{ ...copy, fontSize: 16 }}>
            Open your camera and scan to join.
          </p>
        </div>
      ) : (
        <p style={{ ...copy, marginTop: 36 }}>
          Ask your host for the Wi-Fi details.
        </p>
      )}
    </Sheet>
  )
}
export function HomePage({ data }: { data: KitData }) {
  return (
    <Sheet
      data={data}
      section="At home"
      title="The little things."
      intro="A few helpful details for a comfortable stay."
    >
      <Detail title="Around the house">{data.details.homeTips}</Detail>
      <Detail title="Safety & useful locations">{data.details.safety}</Detail>
      <Detail title="Need a hand?">{data.details.hostContact}</Detail>
    </Sheet>
  )
}
export function RulesPage({ data }: { data: KitData }) {
  return (
    <Sheet
      data={data}
      section="House notes"
      title="A little care goes a long way."
      intro="Thank you for looking after our home and being considerate of our neighbors."
    >
      <Checklist
        items={[
          ...data.details.rules,
          ...customLines(data.details.customRules),
        ]}
      />
    </Sheet>
  )
}
function Places({ data, offset }: { data: KitData; offset: number }) {
  return (
    <Sheet
      data={data}
      section={offset ? 'More nearby' : 'The neighborhood'}
      title={offset ? 'Keep exploring.' : 'Step outside.'}
      intro={
        data.sample ? 'Your host’s favorite places. Illustrative recommendations for this sample.' : data.city
          ? `A few places to explore in ${data.city}. Tap a card in the PDF or scan its code for Google Maps.`
          : 'Tap a card in the PDF or scan its code for Google Maps.'
      }
    >
      <div style={{ display: 'grid', gap: 12 }}>
        {data.picks.slice(offset, offset + 4).map((p, i) => (
          <a
            key={p.place_id}
            href={data.sample ? undefined : mapsUrl(p)}
            style={{
              ...box,
              display: 'flex',
              gap: 24,
              alignItems: 'center',
              color: INK,
              textDecoration: 'none',
              padding: 12,
            }}
          >
            <div
              style={{
                background: '#fff',
                padding: 6,
                borderRadius: 8,
                flexShrink: 0,
              }}
            >
              {p.photo_url ? <img src={p.photo_url} alt="" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 6 }} /> : <QRCodeSVG
                value={mapsUrl(p)}
                size={84}
                level="M"
                fgColor="#183d32"
                bgColor="#fff"
              />}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={eyebrow}>
                {String(offset + i + 1).padStart(2, '0')} / Explore nearby
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 29,
                  color: INK,
                  lineHeight: 1.1,
                  marginTop: 7,
                  overflowWrap: 'anywhere',
                }}
              >
                {p.name}
              </div>
              {p.blurb && (
                <p style={{ ...copy, fontSize: 14, margin: '6px 0 0' }}>
                  {p.blurb}
                </p>
              )}
              <div style={{ fontSize: 12, color: MUTED, marginTop: 8 }}>
                {data.sample ? 'Example host recommendation' : 'Open in Google Maps ↗'}
                {!data.sample && p.photo_url && <QRCodeSVG value={mapsUrl(p)} size={44} level="M" style={{ float: 'right', marginLeft: 8 }} />}
              </div>
            </div>
          </a>
        ))}
      </div>
      <p style={{ ...copy, fontSize: 12, marginTop: 20 }}>
        {data.sample ? 'Sample names and photographs. Your guide can include real places and Google Maps directions.' : 'Places from Google Maps. Check current hours and availability before visiting.'}
      </p>
    </Sheet>
  )
}
export function LocalGuidePage({ data }: { data: KitData }) {
  return <Places data={data} offset={0} />
}
export function MorePlacesPage({ data }: { data: KitData }) {
  return <Places data={data} offset={4} />
}
export function ExtraPlacesPage({ data }: { data: KitData }) {
  return <Places data={data} offset={8} />
}
export function CheckoutPage({ data }: { data: KitData }) {
  return (
    <Sheet
      data={data}
      section="Until next time"
      title="Before you go."
      intro={
        data.checkout || 'Please check your booking for your checkout time.'
      }
    >
      <Checklist
        numbered
        items={[
          ...data.details.checkoutSteps,
          ...customLines(data.details.customCheckout),
        ]}
      />
      <div style={{ ...box, marginTop: 40 }}>
        <div style={{ fontFamily: SERIF, fontSize: 40, lineHeight: 1.1 }}>
          Thank you for staying.
        </div>
        <p style={copy}>
          We hope you’re taking home a few good memories. Safe travels, and
          you’re welcome back anytime.
        </p>
        {data.details.hostContact && (
          <Detail title="Left something behind?">
            {data.details.hostContact}
          </Detail>
        )}
      </div>
    </Sheet>
  )
}
export function MessagesPage({ data }: { data: KitData }) {
  return (
    <Sheet
      data={data}
      section="Host copy / keep separate"
      title="A thoughtful message goes a long way."
      intro="For you, the host. Replace [guest name] and review each message before sending."
    >
      <div style={{ display: 'grid', gap: 20 }}>
        {guestMessages(data).map((m) => (
          <div key={m.title} style={box}>
            <div style={eyebrow}>{m.when}</div>
            <h2 style={{ fontSize: 20, margin: '8px 0' }}>{m.title}</h2>
            <p style={{ ...copy, fontSize: 16, margin: 0 }}>{m.text}</p>
          </div>
        ))}
      </div>
    </Sheet>
  )
}
export const KIT_PAGES = [
  { key: 'cover', label: 'Welcome cover', Page: CoverPage },
  { key: 'arrival', label: 'Arrival & host contact', Page: ArrivalPage },
  { key: 'welcome', label: 'Wi-Fi sign', Page: WelcomeSignPage },
  { key: 'home', label: 'House essentials', Page: HomePage },
  { key: 'rules', label: 'House rules', Page: RulesPage },
  { key: 'guide', label: 'Local guide', Page: LocalGuidePage },
  { key: 'more', label: 'More local places', Page: MorePlacesPage },
  { key: 'extra', label: 'Host favorites', Page: ExtraPlacesPage },
  { key: 'checkout', label: 'Checkout card', Page: CheckoutPage },
] as const
export function availableKitPages(data: KitData) {
  return KIT_PAGES.filter((p) => {
    if (p.key === 'home')
      return !!(data.details.homeTips.trim() || data.details.safety.trim())
    if (p.key === 'rules')
      return (
        data.details.rules.length > 0 ||
        customLines(data.details.customRules).length > 0
      )
    if (p.key === 'guide') return data.picks.length > 0
    if (p.key === 'more') return data.picks.length > 4
    if (p.key === 'extra') return data.picks.length > 8
    return true
  })
}

/** Raster pages retain link annotations, so the same PDF works in print and on a phone. */
export async function buildKitPdf(
  pages: HTMLElement[],
  options: { paper?: PaperSize; title?: string } = {},
): Promise<Blob> {
  if (!pages.length) throw new Error('Choose at least one page to download.')
  const [{ toPng }, { PDFDocument, PDFName, PDFString }] = await Promise.all([
    import('html-to-image'),
    import('pdf-lib'),
  ])
  await document.fonts.ready
  const pdf = await PDFDocument.create()
  pdf.setTitle(options.title || 'Guest welcome book')
  pdf.setCreator('PiAds (piads.co)')
  for (const node of pages) {
    await Promise.all(
      Array.from(node.querySelectorAll('img')).map((img) => img.decode()),
    )
    const content = node.querySelector<HTMLElement>('[data-book-content]')
    if (content && content.scrollHeight > content.clientHeight + 2)
      throw new Error(
        'One page has too much text. Shorten your notes and try again.',
      )
    const dataUrl = await toPng(node, {
      width: PAGE_W,
      height: PAGE_H,
      pixelRatio: 2.5,
      backgroundColor: node.style?.backgroundColor || '#fff',
    })
    const png = await pdf.embedPng(dataUrl)
    const [width, height] =
      options.paper === 'a4' ? [595.28, 841.89] : [612, 792]
    const sheet = pdf.addPage([width, height])
    const scale = Math.min(width / PAGE_W, height / PAGE_H)
    const left = (width - PAGE_W * scale) / 2
    const bottom = (height - PAGE_H * scale) / 2
    sheet.drawImage(png, {
      x: left,
      y: bottom,
      width: PAGE_W * scale,
      height: PAGE_H * scale,
    })
    const bounds = node.getBoundingClientRect()
    const links = Array.from(
      node.querySelectorAll<HTMLAnchorElement>('a[href]'),
    ).flatMap((link) => {
      const href = link.href
      if (!href.startsWith('https://www.google.com/maps/')) return []
      const r = link.getBoundingClientRect()
      const rect = [
        left + (r.left - bounds.left) * scale,
        height - bottom - (r.bottom - bounds.top) * scale,
        left + (r.right - bounds.left) * scale,
        height - bottom - (r.top - bounds.top) * scale,
      ]
      return [
        pdf.context.register(
          pdf.context.obj({
            Type: 'Annot',
            Subtype: 'Link',
            Rect: rect,
            Border: [0, 0, 0],
            A: { Type: 'Action', S: 'URI', URI: PDFString.of(href) },
          }),
        ),
      ]
    })
    if (links.length)
      sheet.node.set(PDFName.of('Annots'), pdf.context.obj(links))
  }
  return new Blob([(await pdf.save()) as Uint8Array<ArrayBuffer>], {
    type: 'application/pdf',
  })
}
