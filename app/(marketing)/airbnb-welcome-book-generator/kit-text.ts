// The starter kit's words: the Wi-Fi QR payload, map links, and the guest
// messages. Plain TypeScript so scripts/test-welcome-kit.mjs can run it in Node.

import type { WelcomePick } from '../../../components/welcome-screen'

export const HOUSE_RULES = [
  'No smoking inside',
  'No parties or events',
  'Quiet hours 10 PM to 8 AM',
  'No pets',
  'Please take your shoes off inside',
] as const

export const CHECKOUT_STEPS = [
  'Start the dishwasher',
  'Take the trash out',
  'Turn off the lights and the AC',
  'Lock the door behind you',
] as const

export interface KitDetails {
  propertyAddress?: string
  wifiName: string
  wifiPassword: string
  rules: string[]
  checkoutSteps: string[]
  checkIn: string
  arrival: string
  parking: string
  hostName: string
  hostContact: string
  homeTips: string
  safety: string
  customRules: string
  customCheckout: string
}

export const DEFAULT_KIT: KitDetails = {
  propertyAddress: '',
  wifiName: '',
  wifiPassword: '',
  rules: [],
  checkoutSteps: [],
  checkIn: '',
  arrival: '',
  parking: '',
  hostName: '',
  hostContact: '',
  homeTips: '',
  safety: '',
  customRules: '',
  customCheckout: '',
}

export interface ImportedListing {
  listing_id: string
  source_url: string
  title: string
  description: string
  amenities: string[]
  rules: string[]
  photos: { url: string; caption: string }[]
  location: string
  city: string
  location_precision: 'approximate'
  warnings: string[]
}

/** Keep listing prose within fixed print pages, with no silently clipped text. */
export function listingParagraphs(text: string): string[] {
  const chunks: string[] = []
  let rest = text.replace(/\s+/g, ' ').trim()
  while (rest.length > 0) {
    let end = Math.min(rest.length, 950)
    if (end < rest.length) {
      const sentence = Array.from(rest.slice(0, end).matchAll(/[.!?](?:\s|$)/g)).at(-1)
      const boundary = sentence && sentence.index >= 600 ? sentence.index + 1 : rest.lastIndexOf(' ', end)
      if (boundary > 600) end = boundary
    }
    chunks.push(rest.slice(0, end).trim())
    rest = rest.slice(end).trim()
  }
  return chunks
}

export interface KitData {
  listing?: ImportedListing
  propertyName: string
  message: string
  checkout: string
  city: string
  picks: WelcomePick[]
  details: KitDetails
  address?: string
  photo?: string | null
  theme?: 'forest' | 'coast' | 'clay'
  artwork?: string | null
  sample?: boolean
}

/** The standard Wi-Fi QR payload phones understand (ZXing "WIFI:" format). */
export function wifiQrValue(name: string, password: string): string {
  const esc = (s: string) => s.replace(/([\\;,:"])/g, '\\$1')
  return password
    ? `WIFI:T:WPA;S:${esc(name)};P:${esc(password)};;`
    : `WIFI:T:nopass;S:${esc(name)};;`
}

export function mapsUrl(pick: WelcomePick): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pick.name)}&query_place_id=${encodeURIComponent(pick.place_id)}`
}

export interface GuestMessage {
  title: string
  when: string
  text: string
}

export function guestMessages(data: KitData): GuestMessage[] {
  // The generator pre-fills "Your stay in {city}" as the TV caption. As a
  // place name it would read "hosting you at Your stay in Arlington".
  const named = /^your stay in /i.test(data.propertyName)
    ? ''
    : data.propertyName
  const place = named || 'our place'
  const { wifiName, wifiPassword } = data.details
  const wifi = wifiName
    ? ` The Wi-Fi is ${wifiName}${wifiPassword ? ` and the password is ${wifiPassword}` : ''}. It is also on the sign inside.`
    : ''
  const names = data.picks.slice(0, 3).map((p) => p.name)
  const favorites =
    names.length > 1
      ? ` A few nearby places to explore: ${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}.`
      : names.length === 1
        ? ` One nearby place to explore: ${names[0]}.`
        : ''
  return [
    {
      title: 'Check-in',
      when: 'The day before arrival',
      text: `Hi [guest name]! We're looking forward to hosting you at ${place}.${wifi}${favorites} Message us anytime if you need anything.`,
    },
    {
      title: 'Checkout reminder',
      when: 'The evening before checkout',
      text: `Hi [guest name], we hope you're enjoying ${data.city || 'your stay'}! A quick reminder for tomorrow: ${data.checkout || 'please check your booking for the checkout time.'} Safe travels!`,
    },
    {
      title: 'Review request',
      when: 'After checkout',
      text: `Thank you so much for staying at ${place}, [guest name]! If you have a minute, a review would mean a lot to us. You're welcome back anytime.`,
    },
  ]
}

export const BOOK_THEMES = [
  {
    key: 'forest',
    name: 'Illustrated stay',
    ink: '#173f33',
    accent: '#7d8754',
    paper: '#faf7ef',
  },
  {
    key: 'coast',
    name: 'Weekend postcard',
    ink: '#233f89',
    accent: '#233f89',
    paper: '#fff9de',
  },
  {
    key: 'clay',
    name: 'Retreat journal',
    ink: '#292823',
    accent: '#666258',
    paper: '#f9f8f5',
  },
] as const
export type BookTheme = (typeof BOOK_THEMES)[number]['key']
export type PaperSize = 'letter' | 'a4'
export function customLines(value: string): string[] {
  return value
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 4)
}
export function guideReview(
  data: KitData,
): { label: string; ready: boolean }[] {
  return [
    {
      label: 'Property name',
      ready: !!data.propertyName && !/^your stay in /i.test(data.propertyName),
    },
    {
      label: 'Arrival and parking',
      ready: !!data.details.arrival.trim() && !!data.details.parking.trim(),
    },
    { label: 'Host contact', ready: !!data.details.hostContact.trim() },
    { label: 'Wi-Fi network', ready: !!data.details.wifiName },
    { label: 'Checkout note', ready: !!data.checkout.trim() },
  ]
}

/** Address-only books feature actual nearby places, never an invented rental. */
export function neighborhoodPhotos(data: Pick<KitData, 'picks'>) {
  const unique = new Set<string>()
  const photos = data.picks.filter(p => {
    if (!p.photo_url || unique.has(p.photo_url)) return false
    unique.add(p.photo_url)
    return true
  })
  // Lead with a different view from the directory's first recommendation.
  return photos.length > 1 ? [photos[photos.length - 1], ...photos.slice(0, -1)] : photos
}

export function isLocationEdition(data: Pick<KitData, 'photo' | 'artwork' | 'listing' | 'sample'>) {
  return !data.photo && !data.artwork && !data.listing && !data.sample
}

export function locationCoverTitle(data: Pick<KitData, 'propertyName' | 'city'>) {
  const name = data.propertyName.trim()
  return !name || /^your stay in /i.test(name) || /^your (rental|stay)$/i.test(name)
    ? data.city.trim() || 'A place to settle in'
    : name
}

/** Uploaded photos/custom artwork take priority over neighborhood photography.
 * The collection fallback remains explicitly decorative when there are no photos. */
export function bookArtwork(data: Pick<KitData, 'photo' | 'artwork' | 'theme' | 'sample'> & Partial<Pick<KitData, 'picks'>>) {
  if (data.artwork) return { src: data.artwork, caption: 'AI artwork · an artistic interpretation' }
  if (data.photo) return { src: data.photo, caption: data.sample ? 'Sample artwork · fictional property' : '' }
  const nearby = !data.sample && neighborhoodPhotos({picks: data.picks || []})[0]
  if (nearby) return { src: nearby.photo_url!, caption: `Around your stay · ${nearby.name} · Photo via Google Maps` }
  const art = { forest: 'illustrated-stay', coast: 'weekend-postcard', clay: 'retreat-journal' }
  return { src: `/guest-demo/art/${art[data.theme || 'forest']}.jpg`, caption: 'Collection artwork · not a photo of this property' }
}
