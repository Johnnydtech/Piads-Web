'use client'

import { useEffect, useMemo, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

// The Guest Welcome screen, as the TV renders it. A port of the CMS preview
// (PiAds components/GuestWelcomePreview.tsx), which mirrors the web player's
// GuestWelcomeRenderer - keep the visual language in sync with both, because
// the generator's whole promise is "this is what your guests will see".
//
// Differences from the CMS copy, all because the generator works from a bare
// address rather than a saved venue:
// - the clock takes the place's UTC offset (from Google) instead of a venue
//   timezone, and is empty until mount so SSR and hydration agree;
// - `frozen` lays the first picks out in a still row instead of the marquee,
//   for the PNG export (a frame grabbed mid-scroll looks broken);
// - fonts come from the site's next/font variables instead of loading again;
// - radii, QR padding and borders are in container units equal to their 1080p
//   pixel size (22px at 1920 wide = 1.146cqw), so the PNG export matches the
//   TV exactly and a phone-sized preview scales instead of turning tiles into pills.

export interface WelcomePick {
  place_id: string
  name: string
  blurb?: string
  rating?: number | null
  closes_at?: string | null
  photo_url?: string | null
  inset_photo_url?: string | null
}

export interface WelcomeScreenData {
  guest_name: string
  welcome_message: string
  property_name: string
  checkout_text: string
  background_url: string | null
  picks: WelcomePick[]
  utc_offset_minutes?: number | null
  weather?: { temp_f?: number; condition?: string } | null
}

const SECONDS_PER_PICK = 14
const FROZEN_PICKS = 4

/** Warm, boutique-hotel palette - identical to the player's renderer. */
const INK = '#17130F'
const CARD = '#FBF9F6'
const BRASS = '#B08D57'
const MUTED = '#6E6259'
const WARM_WHITE = '#FFF8F0'
const FALLBACK_BG = 'linear-gradient(150deg, #2A2118 0%, #4A3B2C 55%, #7C6A56 100%)'

const SERIF = 'var(--font-editorial), "Instrument Serif", Georgia, "Times New Roman", serif'
const SANS = 'var(--font-sans), "Instrument Sans", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const CARD_SHADOW =
  '0 1px 2px rgba(23,19,15,.12), 0 10px 24px -8px rgba(23,19,15,.22), 0 40px 72px -28px rgba(23,19,15,.50)'
const CARD_EDGE = 'inset 0 0 0 1px rgba(255,255,255,.75)'

const QR_LOGO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">` +
      `<rect width="48" height="48" rx="13" fill="${BRASS}"/>` +
      `<path d="M24 12.5 12.5 22h3.2v13.5h6.1v-7.4h4.4v7.4h6.1V22h3.2z" fill="${CARD}"/>` +
      `</svg>`
  )

// On a real screen the code is minted per screen; here it is a stable sample.
const SAMPLE_QR_VALUE = 'https://piads.co/guest-guide/sample'

function formatters(offsetKnown: boolean) {
  const zone = offsetKnown ? 'UTC' : undefined
  return {
    time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: zone }),
    date: new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: zone }),
  }
}

/** The property's local day and time, re-read every 20 seconds. With a UTC
 *  offset, shift the instant and format it as UTC, which is exact for the
 *  offset Google reported (including half-hour zones). */
function useLocalNow(utcOffsetMinutes?: number | null): { time: string; date: string } {
  const offsetKnown = typeof utcOffsetMinutes === 'number'
  const format = useMemo(() => formatters(offsetKnown), [offsetKnown])
  const [value, setValue] = useState({ time: '', date: '' })

  useEffect(() => {
    const read = () => {
      const now = new Date()
      const at = offsetKnown ? new Date(now.getTime() + (utcOffsetMinutes as number) * 60_000) : now
      setValue({ time: format.time.format(at), date: format.date.format(at) })
    }
    read()
    const t = setInterval(read, 20_000)
    return () => clearInterval(t)
  }, [format, offsetKnown, utcOffsetMinutes])

  return value
}

/** One short line under the name: the host's own words when they wrote some,
 *  otherwise today's closing time. Never both, so the strip stays scannable. */
function detailFor(p: WelcomePick): string {
  if (p.blurb) return p.blurb
  if (!p.closes_at) return ''
  if (p.closes_at === 'Closed') return 'closed today'
  if (p.closes_at === 'Open 24 hours') return 'open 24 hours'
  return `open till ${p.closes_at}`
}

function PickTile({ pick }: { pick: WelcomePick }) {
  const detail = detailFor(pick)
  return (
    <div style={styles.tile}>
      <div style={styles.tilePhotoWrap}>
        {pick.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pick.photo_url} alt="" crossOrigin="anonymous" style={styles.tilePhoto} />
        ) : (
          <div style={{ ...styles.tilePhoto, background: '#3A3129' }} />
        )}
        {pick.inset_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pick.inset_photo_url} alt="" crossOrigin="anonymous" style={styles.tileInset} />
        ) : null}
      </div>
      <div style={styles.tileCaption}>
        <span style={styles.tileName}>{pick.name}</span>
        {detail ? <span style={styles.tileDetail}> · {detail}</span> : null}
      </div>
    </div>
  )
}

export function WelcomeScreen({ data, frozen = false, paused = false, sampleGuideUrl }: { data: WelcomeScreenData; frozen?: boolean; paused?: boolean; sampleGuideUrl?: string }) {
  const now = useLocalNow(data.utc_offset_minutes)
  const picks = data.picks || []
  const greeting = data.guest_name ? `Welcome, ${data.guest_name}` : 'Welcome'

  return (
    <div style={styles.root}>
      <style>{`@keyframes gw-roll { from { transform: translate3d(0,0,0) } to { transform: translate3d(-50%,0,0) } } @media (prefers-reduced-motion: reduce) { [data-welcome-marquee] { animation: none !important; } }`}</style>
      {data.background_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={data.background_url} alt="" crossOrigin="anonymous" style={styles.bg} />
      ) : (
        <div style={{ ...styles.bg, background: FALLBACK_BG }} />
      )}
      <div style={styles.wash} />
      <div style={styles.vignette} />

      <div style={styles.content}>
        <div style={styles.top}>
          <div style={styles.greetingBlock}>
            <div style={styles.greeting}>{greeting}</div>
            {data.welcome_message ? <div style={styles.message}>{data.welcome_message}</div> : null}
            {data.property_name ? (
              <div style={styles.propertyRow}>
                <span style={styles.propertyRule} />
                <span style={styles.property}>{data.property_name}</span>
              </div>
            ) : null}

            {!frozen && <div style={styles.nowBlock}>
              <div style={styles.nowLine}>
                <span>{now.time}</span>
                {typeof data.weather?.temp_f === 'number' ? (
                  <>
                    <span style={styles.nowSep} />
                    <span>{data.weather.temp_f}&deg;</span>
                  </>
                ) : null}
              </div>
              <div style={styles.nowMeta}>
                {now.date}
                {data.weather?.condition ? <span style={styles.nowMetaDim}> &middot; {data.weather.condition}</span> : null}
              </div>
            </div>}
          </div>

          <div style={styles.column}>
            {!frozen && <div style={styles.card}>
              <div style={styles.cardEyebrow}>Scan for</div>
              <div style={styles.cardTitle}>Wi-Fi &amp; house guide</div>
              <div style={styles.qrWrap}>
                <div style={styles.qrFrame}>
                  <QRCodeSVG
                    value={sampleGuideUrl || SAMPLE_QR_VALUE}
                    size={220}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    level="H"
                    marginSize={0}
                    fgColor={INK}
                    bgColor={CARD}
                    imageSettings={{ src: QR_LOGO, height: 46, width: 46, excavate: true }}
                  />
                  <span style={{ ...styles.bracket, ...styles.bracketTL }} />
                  <span style={{ ...styles.bracket, ...styles.bracketTR }} />
                  <span style={{ ...styles.bracket, ...styles.bracketBL }} />
                  <span style={{ ...styles.bracket, ...styles.bracketBR }} />
                </div>
              </div>
              <div style={styles.cardHint}>{sampleGuideUrl ? 'Scan to open this sample guide' : 'Sample — the real code is generated per screen'}</div>
            </div>}

            {data.checkout_text ? (
              <div style={styles.cardSmall}>
                <div style={styles.cardLabel}>Checkout</div>
                <div style={styles.cardBody}>{data.checkout_text}</div>
              </div>
            ) : null}
          </div>
        </div>

        {picks.length > 0 ? (
          <div style={styles.picksRow}>
            <div style={styles.picksLabel}>Local picks from your host</div>
            {frozen ? (
              <div style={styles.frozenRow}>
                {picks.slice(0, FROZEN_PICKS).map((p) => (
                  <PickTile key={p.place_id} pick={{ ...p, closes_at: null }} />
                ))}
              </div>
            ) : (
              <div style={styles.marquee}>
                <div data-welcome-marquee style={{ ...styles.track, animationDuration: `${picks.length * SECONDS_PER_PICK}s`, animationPlayState: paused ? 'paused' : 'running' }}>
                  {/* Rendered twice so the -50% translate loops with no seam. */}
                  {[...picks, ...picks].map((p, i) => (
                    <PickTile key={`${i}-${p.place_id}`} pick={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: 'absolute',
    inset: 0,
    ['containerType' as any]: 'size',
    overflow: 'hidden',
    background: INK,
    color: WARM_WHITE,
    fontFamily: SERIF,
    textAlign: 'left',
  },
  bg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  wash: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(102deg, rgba(15,11,8,.78) 0%, rgba(15,11,8,.52) 32%, rgba(15,11,8,.18) 58%, rgba(15,11,8,.06) 78%)',
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(120% 90% at 50% 40%, rgba(0,0,0,0) 45%, rgba(12,9,6,.42) 100%), linear-gradient(0deg, rgba(12,9,6,.55) 0%, rgba(12,9,6,0) 32%)',
  },
  content: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '5.5cqh 4.2cqw',
  },
  top: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '3cqw' },
  greetingBlock: { maxWidth: '54cqw', paddingTop: '1.5cqh' },
  greeting: {
    fontSize: '5.6cqw',
    fontWeight: 400,
    lineHeight: 0.96,
    letterSpacing: '-0.018em',
    color: WARM_WHITE,
    textShadow: '0 2px 30px rgba(0,0,0,.35)',
  },
  message: {
    fontFamily: SANS,
    fontSize: '1.65cqw',
    fontWeight: 400,
    marginTop: '2.4cqh',
    lineHeight: 1.4,
    color: 'rgba(255,248,240,.84)',
    maxWidth: '42cqw',
    textShadow: '0 1px 16px rgba(0,0,0,.35)',
  },
  nowBlock: { marginTop: '4.5cqh' },
  nowLine: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1.1cqw',
    fontSize: '3.1cqw',
    lineHeight: 1,
    color: WARM_WHITE,
    letterSpacing: '-0.01em',
    textShadow: '0 2px 24px rgba(0,0,0,.4)',
    minHeight: '3.1cqw',
  },
  nowSep: {
    width: '0.42cqw',
    height: '0.42cqw',
    minWidth: 3,
    minHeight: 3,
    borderRadius: '50%',
    background: BRASS,
    alignSelf: 'center',
    opacity: 0.9,
  },
  nowMeta: {
    fontFamily: SANS,
    fontSize: '0.95cqw',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.24em',
    color: 'rgba(255,248,240,.72)',
    marginTop: '1.4cqh',
    textShadow: '0 1px 14px rgba(0,0,0,.4)',
  },
  nowMetaDim: { color: 'rgba(255,248,240,.5)' },
  propertyRow: { display: 'flex', alignItems: 'center', gap: '0.9cqw', marginTop: '3cqh' },
  propertyRule: { display: 'block', width: '3.2cqw', height: 1, background: 'rgba(255,248,240,.45)' },
  property: {
    fontFamily: SANS,
    fontSize: '0.88cqw',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.28em',
    color: 'rgba(255,248,240,.62)',
  },
  column: { display: 'flex', flexDirection: 'column', gap: '1.8cqh', width: '25cqw' },
  card: {
    background: CARD,
    color: INK,
    borderRadius: '1.146cqw',
    padding: '2.6cqh 1.6cqw 2.2cqh',
    boxShadow: `${CARD_SHADOW}, ${CARD_EDGE}`,
    textAlign: 'center',
  },
  cardEyebrow: {
    fontFamily: SANS,
    fontSize: '0.62cqw',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.3em',
    color: BRASS,
  },
  cardTitle: { fontSize: '1.5cqw', lineHeight: 1.15, marginTop: '0.5cqh', color: INK },
  qrWrap: { display: 'flex', justifyContent: 'center', margin: '2cqh 0 1.6cqh' },
  qrFrame: { position: 'relative', padding: '0.729cqw', borderRadius: '0.833cqw', background: CARD, width: '13cqw' },
  bracket: { position: 'absolute', width: '0.9375cqw', height: '0.9375cqw', borderColor: BRASS, borderStyle: 'solid', borderWidth: 0 },
  bracketTL: { top: 0, left: 0, borderTopWidth: 'max(1px, 0.104cqw)', borderLeftWidth: 'max(1px, 0.104cqw)', borderTopLeftRadius: '0.3125cqw' },
  bracketTR: { top: 0, right: 0, borderTopWidth: 'max(1px, 0.104cqw)', borderRightWidth: 'max(1px, 0.104cqw)', borderTopRightRadius: '0.3125cqw' },
  bracketBL: { bottom: 0, left: 0, borderBottomWidth: 'max(1px, 0.104cqw)', borderLeftWidth: 'max(1px, 0.104cqw)', borderBottomLeftRadius: '0.3125cqw' },
  bracketBR: { bottom: 0, right: 0, borderBottomWidth: 'max(1px, 0.104cqw)', borderRightWidth: 'max(1px, 0.104cqw)', borderBottomRightRadius: '0.3125cqw' },
  cardHint: { fontFamily: SANS, fontSize: '0.78cqw', lineHeight: 1.5, color: MUTED },
  cardSmall: {
    background: 'rgba(251,249,246,.94)',
    color: INK,
    borderRadius: '0.833cqw',
    padding: '1.8cqh 1.4cqw',
    boxShadow: `${CARD_SHADOW}, ${CARD_EDGE}`,
  },
  cardLabel: {
    fontFamily: SANS,
    fontSize: '0.62cqw',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.3em',
    color: BRASS,
  },
  cardBody: { fontFamily: SANS, fontSize: '1.02cqw', marginTop: '0.3125cqw', lineHeight: 1.45, color: '#2C2620' },
  picksRow: { display: 'flex', flexDirection: 'column', gap: '1.6cqh' },
  picksLabel: {
    fontFamily: SANS,
    fontSize: '0.8cqw',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.28em',
    color: 'rgba(255,248,240,.72)',
    textShadow: '0 1px 10px rgba(0,0,0,.5)',
  },
  // No card behind a pick: the photograph sits on the backdrop with its own
  // radius and the caption reads on the scrim.
  marquee: {
    overflow: 'hidden',
    width: '100%',
    maskImage: 'linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%)',
  },
  track: {
    display: 'flex',
    gap: '1.6cqw',
    width: 'max-content',
    animationName: 'gw-roll',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    willChange: 'transform',
  },
  frozenRow: { display: 'flex', gap: '1.6cqw' },
  tile: { width: '21cqw', flex: '0 0 auto' },
  tilePhotoWrap: { position: 'relative', width: '100%', height: '15.5cqh' },
  tilePhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '0.833cqw',
    boxShadow: '0 10px 28px -10px rgba(12,9,6,.65)',
  },
  tileInset: {
    position: 'absolute',
    left: '1cqw',
    bottom: '-1.6cqh',
    width: '4.4cqw',
    height: '4.4cqw',
    objectFit: 'cover',
    borderRadius: '50%',
    border: 'max(1px, 0.156cqw) solid rgba(255,248,240,.92)',
    boxShadow: '0 6px 16px -4px rgba(12,9,6,.6)',
  },
  tileCaption: {
    fontFamily: SANS,
    marginTop: '2.6cqh',
    fontSize: '0.95cqw',
    lineHeight: 1.35,
    color: 'rgba(255,248,240,.72)',
    textShadow: '0 1px 10px rgba(0,0,0,.55)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tileName: { fontWeight: 700, color: WARM_WHITE },
  tileDetail: { fontWeight: 400 },
}
