'use client'

import type { CSSProperties, ReactNode } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  BOOK_THEMES,
  bookArtwork,
  neighborhoodPhotos,
  isLocationEdition,
  locationCoverTitle,
  customLines,
  guestMessages,
  mapsUrl,
  listingParagraphs,
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
  fontFamily: SANS,
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
  titleSize = 60,
}: {
  data: KitData
  section: string
  title: string
  intro?: string
  children: ReactNode
  titleSize?: number
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
      {theme.key === 'forest' && <img src="/guest-demo/botanical-frame.png" alt="" style={{ position: 'absolute', inset: 16, width: 'calc(100% - 32px)', height: 'calc(100% - 32px)', opacity: .24, pointerEvents: 'none' }} />}
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
            fontSize: titleSize,
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
/** Three designed local editions for hosts who have supplied only an address. */
function LocationCover({ data }: { data: KitData }) {
  const theme = BOOK_THEMES.find(t => t.key === data.theme) || BOOK_THEMES[0]
  const title = locationCoverTitle(data)
  const photos = neighborhoodPhotos(data)
  const art = bookArtwork(data)
  const secondary = photos[1]
  const journal = theme.key === 'clay'
  const postcard = theme.key === 'coast'
  const titleSize = title.length > 75 ? 46 : title.length > 45 ? 62 : title.length > 25 ? 80 : 112
  const photoCaption = photos[0] ? photos[0].name : 'Decorative collection artwork'
  const footer = <div style={{display:'flex',justifyContent:'space-between',gap:24,borderTop:`1px solid ${theme.ink}40`,paddingTop:18,fontSize:11,lineHeight:1.6}}>
    <span>{photos.length ? 'Neighborhood photographs via Google Maps' : 'Decorative artwork, not a property photograph'}<br/>Made with PiAds · piads.co</span>
    <span style={{textAlign:'right'}}>{data.picks.length ? `${data.picks.length} places to explore` : 'Your guest welcome guide'}<br/>ARRIVE / EXPLORE / SETTLE IN</span>
  </div>
  const heading = <h1 style={{fontFamily:SERIF,fontSize:titleSize,fontWeight:400,lineHeight:.96,letterSpacing:'-.035em',overflowWrap:'anywhere',margin:'16px 0 18px',color:'inherit',fontStyle:theme.key === 'forest' ? 'italic' : 'normal'}}>{title}</h1>
  return <div data-book-page="Your local welcome guide" style={{width:PAGE_W,height:PAGE_H,position:'relative',overflow:'hidden',boxSizing:'border-box',background:theme.paper,color:theme.ink,fontFamily:SANS}}>
    {theme.key === 'forest' && <img src="/guest-demo/botanical-frame.png" alt="" style={{position:'absolute',inset:12,width:792,height:1032,opacity:.18}}/>}
    {journal ? <>
      <div style={{height:650,position:'relative',background:'#292823'}}>
        <img src={art.src} alt={photoCaption} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(12,24,21,.35),transparent 30%,rgba(12,24,21,.85))'}}/>
        <div style={{position:'absolute',top:50,left:52,right:52,color:'#fff9ee',display:'flex',justifyContent:'space-between',fontSize:11,letterSpacing:'.2em'}}><span>THE LOCAL EDITION</span><span>A GUEST JOURNAL</span></div>
        <div style={{position:'absolute',bottom:38,left:52,right:52,color:'#fff9ee'}}><p style={{...eyebrow,color:'inherit'}}>Welcome to your stay in {data.city || 'the neighborhood'}</p>{heading}<p style={{fontSize:11,margin:'16px 0 0'}}>AROUND YOUR STAY / {photoCaption}</p></div>
      </div>
      <div data-book-content style={{height:406,boxSizing:'border-box',padding:'28px 52px 24px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div style={{display:'grid',gridTemplateColumns:secondary ? '1fr 180px' : '1fr',gap:32,alignItems:'start'}}>
          <div><p style={{...eyebrow,color:theme.accent,fontSize:10,margin:'0 0 12px'}}>A GOOD PLACE TO BEGIN</p><p style={{fontFamily:SERIF,fontSize:34,lineHeight:1.1,margin:'0 0 18px'}}>Settle in.<br/>Find a new favorite.</p><p style={{fontSize:13,lineHeight:1.5,margin:0,overflowWrap:'anywhere'}}>{data.address || data.city}</p></div>
          {secondary && <figure style={{margin:0}}><img src={secondary.photo_url!} alt={secondary.name} style={{width:180,height:150,objectFit:'cover'}}/><figcaption style={{fontSize:9,lineHeight:1.3,marginTop:7}}>NEARBY / {secondary.name}</figcaption></figure>}
        </div>{footer}
      </div>
    </> : <div data-book-content style={{position:'absolute',inset:postcard ? '28px' : '42px 52px',border:postcard ? `2px solid ${theme.ink}` : undefined,padding:postcard ? '28px 28px 20px' : 0,display:'flex',flexDirection:'column',boxSizing:'border-box'}}>
      <div style={{display:'flex',justifyContent:'space-between',borderBottom:`1px solid ${theme.ink}40`,paddingBottom:15,...eyebrow,color:theme.ink,fontSize:10}}><span>{postcard ? 'A POSTCARD FROM YOUR STAY' : 'A LITTLE GUIDE TO FEELING AT HOME'}</span><span>LOCAL EDITION</span></div>
      <div style={{position:'relative',zIndex:1,marginTop:16}}>{heading}<p style={{fontFamily:SERIF,fontSize:25,margin:'0 0 20px',lineHeight:1.2}}>Your welcome. Your neighborhood. Your next favorite.</p></div>
      <div style={{position:'relative',flex:1,minHeight:240,margin:'4px 0 22px'}}>
        <figure style={{margin:0,position:'absolute',top:0,left:0,right:secondary ? 90 : 0,bottom:secondary ? 52 : 0,transform:postcard ? 'rotate(-2deg)' : undefined,background:'#fffdf8',padding:postcard ? '12px 12px 36px' : '0 0 30px',boxShadow:postcard ? '0 8px 20px #233f8918' : undefined}}>
          <img src={art.src} alt={photoCaption} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:postcard ? 0 : '230px 230px 2px 2px'}}/>
          <figcaption style={{fontSize:10,lineHeight:1.3,paddingTop:8,overflowWrap:'anywhere'}}>AROUND YOUR STAY / {photoCaption}</figcaption>
        </figure>
        {secondary && <figure style={{position:'absolute',right:0,bottom:0,width:210,margin:0,padding:'10px 10px 14px',background:'#fffdf8',boxShadow:'0 8px 24px #17261d22',transform:`rotate(${postcard ? 5 : 3}deg)`}}><img src={secondary.photo_url!} alt={secondary.name} style={{width:'100%',height:150,objectFit:'cover'}}/><figcaption style={{fontSize:10,lineHeight:1.4,paddingTop:8,overflowWrap:'anywhere'}}>{secondary.name}</figcaption></figure>}
      </div>
      <div style={{margin:'0 0 20px',display:'flex',gap:22,alignItems:'center'}}><span style={{...eyebrow,color:theme.ink,fontSize:10,flexShrink:0}}>YOUR ADDRESS</span><p style={{fontSize:13,lineHeight:1.5,margin:0,overflowWrap:'anywhere'}}>{data.address || data.city}</p></div>{footer}
    </div>}
  </div>
}

export function CoverPage({ data }: { data: KitData }) {
  const art = bookArtwork(data)
  if (isLocationEdition(data)) return <LocationCover data={data} />
  if (data.theme === 'clay') return (
    <div data-book-page="Your guest guide" style={{ width: PAGE_W, height: PAGE_H, position: 'relative', overflow: 'hidden', background: '#292823', color: '#fff9ee', fontFamily: SANS }}>
      <img src={art.src} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
      <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(20,19,16,.72),rgba(20,19,16,.18))'}} />
      <div data-book-content style={{position:'absolute',inset:'70px 64px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <p style={{...eyebrow,color:'#fff9ee'}}>A journal for your stay / {data.city}</p>
        <div><h1 style={{color:'#fff9ee',fontFamily:SERIF,fontSize:data.propertyName.length > 50 ? 76 : 96,fontWeight:400,lineHeight:.94,overflowWrap:'anywhere',maxWidth:520,margin:'0 0 32px'}}>{data.propertyName}</h1><p style={{fontFamily:SERIF,fontSize:30,fontStyle:'italic',maxWidth:440,lineHeight:1.3}}>{data.message}</p></div>
        <div style={{borderTop:'1px solid #ffffff70',paddingTop:24,fontSize:13,letterSpacing:'.12em'}}>SETTLE IN. SLOW DOWN. STAY A WHILE.<br/><span style={{fontSize:10,letterSpacing:0}}>{data.sample ? 'Sample guide · Fictional property · ' : ''}Made with PiAds · piads.co{art.caption && <> · {art.caption}</>}</span></div>
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
        <img alt="" src={art.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
      {art.caption && <p style={{ fontSize: 10, color: MUTED, margin: '-18px 0 12px' }}>{art.caption}</p>}
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
function ArtRibbon({ data, height = 170 }: { data: KitData; height?: number }) {
  const art = bookArtwork(data)
  return <div style={{ margin: '26px 0 20px' }}>
    <img src={art.src} alt="" style={{ display: 'block', width: '100%', height, objectFit: 'cover', objectPosition: 'center 58%', borderRadius: data.theme === 'forest' ? '80px 80px 4px 4px' : 4 }} />
    {art.caption && <div style={{ fontSize: 9, color: MUTED, marginTop: 7 }}>{art.caption}</div>}
  </div>
}

export function OpeningPage({ data }: { data: KitData }) {
  const sections = [
    ...(data.listing ? [['property', 'Get to know your stay', 'Your property’s story, amenities and photos.']] : []),
    ['arrival', 'Arrive & settle in', 'Your address, arrival notes and a way to reach your host.'],
    ...(data.details.wifiName ? [['home', 'Make yourself at home', 'Your Wi-Fi connection and the details your host has shared.']] : []),
    ...(data.picks.length ? [['local', 'Explore the neighborhood', `${data.picks.length} local places, with individual pages and map links.`]] : []),
    ['checkout', 'Until next time', 'Your checkout notes and one last goodbye.'],
  ]
  return <Sheet data={data} section="Start here" title="A little book for your stay." intro={data.message || 'Settle in, find your bearings, and make a few new memories.'}>
    <ArtRibbon data={data} height={sections.length >= 4 ? 120 : 230} />
    <div style={{ display: 'grid', gap: 17, marginTop: 28 }}>
      {sections.map(([key, title, text], index) => <div key={key} style={{ display: 'flex', gap: 22, borderBottom: `1px solid ${LINE}`, paddingBottom: 17 }}>
        <span style={{ fontFamily: SERIF, fontSize: 32, color: ACCENT }}>{String(index + 1).padStart(2, '0')}</span>
        <div><div style={{ fontFamily: SERIF, fontSize: 28 }}>{title}</div><p style={{ ...copy, fontSize: 15, margin: '5px 0 0' }}>{text}</p></div>
      </div>)}
    </div>
    <p style={{ ...copy, fontSize: 13, marginTop: 22 }}>Keep this PDF on your phone or leave a printed copy for your guests. Map links work with a tap; printed codes open with your phone’s camera.</p>
  </Sheet>
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
      <ArtRibbon data={data} height={data.details.parking ? 70 : 150} />
      <div style={box}>
        <Detail title={data.listing && !data.address ? "Area · confirm the exact address with your host" : "Property address"}>{data.address || data.listing?.location}</Detail>
        <Detail title="Check-in">{d.checkIn}</Detail>
      </div>
      {data.address && !data.sample && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`} style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 20, textDecoration: 'none', color: INK }}>
        <QRCodeSVG value={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`} size={76} bgColor="#fff" fgColor="#173f33" marginSize={3} />
        <span style={{ fontSize: 15 }}>Find your way here ↗<br/><span style={{ fontSize: 12, color: MUTED }}>Tap or scan for Google Maps. Confirm entry details with your host.</span></span>
      </a>}
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
export function LocalGuidePage({ data }: { data: KitData }) {
  const compact = data.picks.length > 8
  const photoGrid = isLocationEdition(data) && !(compact && data.picks.some(p => p.name.length > 60))
  return <Sheet data={data} section="The neighborhood" title="Good places. New memories." intro={data.sample ? 'Illustrative recommendations for this sample.' : `Places to explore around ${data.city || 'your stay'}. Each has its own page, with a map to take you there.`}>
    {!isLocationEdition(data) && <ArtRibbon data={data} height={data.picks.length > 8 ? 70 : 100} />}
    <div style={{ display: 'grid', gridTemplateColumns: photoGrid ? '1fr 1fr' : '1fr', columnGap: 24, rowGap: 0, marginTop: 24 }}>
      {data.picks.map((pick, i) => <a key={pick.place_id} href={data.sample ? undefined : mapsUrl(pick)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: photoGrid ? '16px 0' : compact ? '6px 0' : '8px 0', borderBottom: `1px solid ${LINE}`, textDecoration: 'none', color: INK }}>
        {photoGrid && pick.photo_url && <img src={pick.photo_url} alt="" style={{width:64,height:data.picks.length > 8 ? 54 : 76,objectFit:'cover',borderRadius:data.theme === 'forest' ? '36px 36px 3px 3px' : 2,flexShrink:0}}/>}
        <span style={{ ...eyebrow, width: 20, flexShrink:0 }}>{String(i + 1).padStart(2, '0')}</span>
        <span style={{ fontFamily: SERIF, fontSize: photoGrid ? 20 : compact ? 17 : 22, lineHeight: 1.1 }}>{pick.name}</span>
        <span style={{ marginLeft: 'auto' }}>↗</span>
      </a>)}
    </div>
    <p style={{ ...copy, fontSize: 12, marginTop: 22 }}>{data.sample ? 'Sample names and photographs.' : 'Places from Google Maps. Check current hours and availability before visiting.'}</p>
  </Sheet>
}

function PlacePage({ data, index }: { data: KitData; index: number }) {
  const pick = data.picks[index]
  if (!pick) return null
  const art = bookArtwork(data)
  return <Sheet data={data} section={`Explore / ${String(index + 1).padStart(2, '0')}`} title={pick.name} titleSize={pick.name.length > 65 ? 38 : 46}>
    <div style={{ position: 'relative', margin: '26px 0', border: data.theme === 'coast' ? '8px solid white' : undefined, transform: data.theme === 'coast' ? 'rotate(-1deg)' : undefined }}>
      <img src={pick.photo_url || art.src} alt={pick.photo_url ? pick.name : ''} style={{ display: 'block', width: '100%', height: pick.name.length > 65 ? 350 : pick.blurb ? 350 : 470, objectFit: 'cover', borderRadius: data.theme === 'forest' ? '110px 110px 4px 4px' : 2 }} />
    </div>
    <p style={{ fontSize: 10, color: MUTED, margin: '-16px 0 24px' }}>{pick.photo_url ? (data.sample ? 'Sample photograph' : 'Place photo via Google Maps') : art.caption || 'Selected cover image · place photo unavailable'}</p>
    {pick.blurb && <p style={{ ...copy, fontFamily: SERIF, fontSize: 25, color: INK, margin: '0 0 24px' }}>{pick.blurb}</p>}
    <a href={data.sample ? undefined : mapsUrl(pick)} style={{ display: 'flex', gap: 24, alignItems: 'center', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, padding: '24px 0', textDecoration: 'none', color: INK }}>
      <QRCodeSVG value={mapsUrl(pick)} size={118} level="M" fgColor="#173f33" bgColor="#fff" marginSize={4} />
      <div><div style={eyebrow}>Take the next turn</div><div style={{ fontFamily: SERIF, fontSize: 30, margin: '8px 0' }}>Open in Google Maps ↗</div><p style={{ ...copy, fontSize: 14, margin: 0 }}>Directions, current hours and more photos.<br/>Tap here or scan with your camera.</p></div>
    </a>
    <p style={{ ...copy, fontSize: 12, marginTop: 20 }}>{data.sample ? 'Illustrative recommendation for this sample guide.' : 'Check opening hours, reservations and accessibility before you set out.'}</p>
  </Sheet>
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
      <ArtRibbon data={data} height={data.details.checkoutSteps.length > 2 ? 90 : 170} />
      <Checklist
        numbered
        items={[
          ...data.details.checkoutSteps,
          ...customLines(data.details.customCheckout),
        ]}
      />
      <div style={{ ...box, marginTop: 24 }}>
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
function PropertyStoryPage({ data, index }: { data: KitData; index: number }) {
  const text = listingParagraphs(data.listing?.description || '')[index]
  const photo = data.listing?.photos[index % (data.listing?.photos.length || 1)]
  return <Sheet data={data} section="Your property" title={index === 0 ? 'Get to know your stay.' : 'A little more about your stay.'} titleSize={48}>
    {photo && <img src={photo.url} alt={photo.caption} crossOrigin="anonymous" style={{ width: '100%', height: 210, objectFit: 'cover', borderRadius: 8, margin: '24px 0' }} />}
    <p style={{ ...copy, fontSize: 17, lineHeight: 1.55, marginTop: 20 }}>{text}</p>
    <p style={{ fontSize: 11, color: MUTED, marginTop: 'auto' }}>Property details from the listing. Your host can update these before sharing.</p>
  </Sheet>
}
function PropertyAmenitiesPage({ data, index }: { data: KitData; index: number }) {
  const amenities = data.listing?.amenities.slice(index * 16, (index + 1) * 16) || []
  return <Sheet data={data} section="At your stay" title="The comforts of home." intro="Amenities listed for this property." titleSize={48}>
    <ArtRibbon data={data} height={140}/>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 22px', marginTop: 14 }}>{amenities.map(item => <div key={item} style={{ fontSize: 16, lineHeight: 1.4, paddingBottom: 12, borderBottom: `1px solid ${LINE}`, overflowWrap: 'anywhere' }}>{item}</div>)}</div>
  </Sheet>
}
function PropertyGalleryPage({ data, index }: { data: KitData; index: number }) {
  const photos = data.listing?.photos.slice(index * 2, (index + 1) * 2) || []
  return <Sheet data={data} section="A look around" title="Make yourself at home." titleSize={48}>
    <div style={{ display: 'grid', gap: 20, marginTop: 26 }}>{photos.map(photo => <figure key={photo.url} style={{ margin: 0 }}><img src={photo.url} alt={photo.caption} crossOrigin="anonymous" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 8 }}/><figcaption style={{ fontSize: 12, color: MUTED, marginTop: 7 }}>{photo.caption}</figcaption></figure>)}</div>
  </Sheet>
}

export const KIT_PAGES = [
  { key: 'cover', label: 'Welcome cover', Page: CoverPage },
  { key: 'opening', label: 'Inside your guide', Page: OpeningPage },
  ...Array.from({ length: 27 }, (_, index) => ({ key: `property-story-${index + 1}`, label: `About your property ${index + 1}`, Page: ({ data }: { data: KitData }) => <PropertyStoryPage data={data} index={index} /> })),
  ...Array.from({ length: 4 }, (_, index) => ({ key: `property-amenities-${index + 1}`, label: `Property amenities ${index + 1}`, Page: ({ data }: { data: KitData }) => <PropertyAmenitiesPage data={data} index={index} /> })),
  ...Array.from({ length: 3 }, (_, index) => ({ key: `property-gallery-${index + 1}`, label: `Property photos ${index + 1}`, Page: ({ data }: { data: KitData }) => <PropertyGalleryPage data={data} index={index} /> })),
  { key: 'arrival', label: 'Arrival & host contact', Page: ArrivalPage },
  { key: 'welcome', label: 'Wi-Fi sign', Page: WelcomeSignPage },
  { key: 'home', label: 'House essentials', Page: HomePage },
  { key: 'rules', label: 'House rules', Page: RulesPage },
  { key: 'guide', label: 'Local guide', Page: LocalGuidePage },
  ...Array.from({ length: 12 }, (_, index) => ({ key: `place-${index + 1}`, label: `Local place ${index + 1}`, Page: ({ data }: { data: KitData }) => <PlacePage data={data} index={index} /> })),
  { key: 'checkout', label: 'Checkout card', Page: CheckoutPage },
] as const
export function availableKitPages(data: KitData) {
  return KIT_PAGES.filter((p) => {
    if (p.key.startsWith('property-story-')) return Number(p.key.split('-').pop()) <= listingParagraphs(data.listing?.description || '').length
    if (p.key.startsWith('property-amenities-')) return Number(p.key.split('-').pop()) <= Math.ceil((data.listing?.amenities.length || 0) / 16)
    if (p.key.startsWith('property-gallery-')) return Number(p.key.split('-').pop()) <= Math.ceil((data.listing?.photos.length || 0) / 2)
    if (p.key === 'welcome') return !!data.details.wifiName.trim()
    if (p.key === 'home')
      return !!(data.details.homeTips.trim() || data.details.safety.trim())
    if (p.key === 'rules')
      return (
        data.details.rules.length > 0 ||
        customLines(data.details.customRules).length > 0
      )
    if (p.key === 'guide') return data.picks.length > 0
    if (p.key.startsWith('place-')) return Number(p.key.slice(6)) <= data.picks.length
    return true
  }).map(p => p.key.startsWith('place-') ? { ...p, label: data.picks[Number(p.key.slice(6)) - 1].name } : p)
}

/** Raster pages retain link annotations, so the same PDF works in print and on a phone. */
export async function buildKitPdf(
  pages: HTMLElement[],
  options: { paper?: PaperSize; title?: string } = {},
): Promise<Blob> {
  if (!pages.length) throw new Error('Choose at least one page to download.')
  const [{ toJpeg }, { PDFDocument, PDFName, PDFString }] = await Promise.all([
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
    const dataUrl = await toJpeg(node, {
      // Places photos share an endpoint; their query strings identify different images.
      includeQueryParams: true,
      width: PAGE_W,
      height: PAGE_H,
      pixelRatio: 2,
      quality: 0.94,
      backgroundColor: node.style?.backgroundColor || '#fff',
    })
    const pageImage = await pdf.embedJpg(dataUrl)
    const [width, height] =
      options.paper === 'a4' ? [595.28, 841.89] : [612, 792]
    const sheet = pdf.addPage([width, height])
    const scale = Math.min(width / PAGE_W, height / PAGE_H)
    const left = (width - PAGE_W * scale) / 2
    const bottom = (height - PAGE_H * scale) / 2
    sheet.drawImage(pageImage, {
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
