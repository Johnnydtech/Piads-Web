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

export interface KitData {
  propertyName: string
  message: string
  checkout: string
  city: string
  picks: WelcomePick[]
  details: KitDetails
  address?: string
  photo?: string | null
  theme?: 'forest' | 'coast' | 'clay'
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
