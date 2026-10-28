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
}

export const DEFAULT_KIT: KitDetails = {
  wifiName: '',
  wifiPassword: '',
  rules: HOUSE_RULES.slice(0, 3),
  checkoutSteps: [...CHECKOUT_STEPS],
}

export interface KitData {
  propertyName: string
  message: string
  checkout: string
  city: string
  picks: WelcomePick[]
  details: KitDetails
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
  const named = /^your stay in /i.test(data.propertyName) ? '' : data.propertyName
  const place = named || 'our place'
  const { wifiName, wifiPassword } = data.details
  const wifi = wifiName
    ? ` The Wi-Fi is ${wifiName}${wifiPassword ? ` and the password is ${wifiPassword}` : ''}. It is also on the sign inside.`
    : ''
  const names = data.picks.slice(0, 3).map((p) => p.name)
  const favorites =
    names.length > 1
      ? ` A few places we love nearby: ${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}.`
      : names.length === 1
        ? ` One place we love nearby: ${names[0]}.`
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
      text: `Hi [guest name], we hope you're enjoying ${data.city || 'your stay'}! A quick reminder for tomorrow: ${data.checkout || 'checkout is at 11 AM.'} Safe travels!`,
    },
    {
      title: 'Review request',
      when: 'After checkout',
      text: `Thank you so much for staying at ${place}, [guest name]! If you have a minute, a review would mean a lot to us. You're welcome back anytime.`,
    },
  ]
}
