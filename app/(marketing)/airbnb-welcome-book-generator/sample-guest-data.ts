// Sample-only adapter, mirroring the CMS guest guide. All content is fictional.
export const GUIDE_STYLES = [
  {
    id: 'illustrated',
    name: 'Illustrated stay',
    description: 'Forest green · warm ivory',
  },
  {
    id: 'journal',
    name: 'Retreat journal',
    description: 'Soft white · charcoal',
  },
  {
    id: 'postcard',
    name: 'Weekend postcard',
    description: 'Cobalt · butter yellow',
  },
] as const
export type GuideStyle = (typeof GUIDE_STYLES)[number]['id']
export interface GuestGuideData {
  guest_name: string
  property_name: string
  welcome_message?: string
  design?: { style: GuideStyle; artwork_url: string }
  wifi: { ssid: string; password: string; security: string }
  checkout_text: string
  house_notes: string[]
  manual_url?: string
  manual_name?: string
  picks: Array<{
    place_id: string
    name: string
    blurb?: string
    rating?: number | null
    closes_at?: string | null
    photo_url?: string | null
    map_url?: string
  }>
}
export function safeGuestUrl(value?: string | null): string | undefined {
  if (!value) return undefined
  // Only these bundled sample assets may use relative URLs.
  if (/^\/guest-demo\/[a-z0-9/_.-]+$/i.test(value) && !value.includes('..')) return value
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password
      ? url.href
      : undefined
  } catch {
    return undefined
  }
}
export function wifiQrValue(wifi: GuestGuideData['wifi']): string {
  const escape = (value: string) => value.replace(/[\\;,:"]/g, '\\$&')
  const security =
    wifi.security === 'nopass'
      ? 'nopass'
      : wifi.security === 'WEP'
        ? 'WEP'
        : 'WPA'
  return `WIFI:T:${security};S:${escape(wifi.ssid)};${security === 'nopass' ? '' : `P:${escape(wifi.password)};`};`
}
