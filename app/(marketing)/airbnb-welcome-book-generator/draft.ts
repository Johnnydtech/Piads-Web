import type {
  WelcomePick,
  WelcomeScreenData,
} from '@/components/welcome-screen'
export const GENERATOR_PATH = '/airbnb-welcome-book-generator'
export const RESULT_PATH = `${GENERATOR_PATH}/your-guide`
const KEY = 'piads:welcome-generator:v2'
export interface Generated {
  location: { formatted_address: string; city: string }
  utc_offset_minutes: number | null
  background_url: string | null
  weather?: WelcomeScreenData['weather']
  picks: WelcomePick[]
}
export interface GuideDraft {
  version: 2
  createdAt: number
  result: Generated
  guestName: string
  propertyName: string
  message: string
  checkout: string
  picks: WelcomePick[]
  neutralBackground: boolean
}
// Short-lived, tab-scoped draft. Wi-Fi, contact details and uploaded files are never stored.
export function saveDraft(draft: GuideDraft): boolean {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(draft))
    return true
  } catch {
    return false
  }
}
export function readDraft(): GuideDraft | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw || raw.length > 100000) return null
    const d = JSON.parse(raw)
    if (
      d.version !== 2 ||
      !Number.isFinite(d.createdAt) ||
      d.createdAt > Date.now() + 60000 ||
      Date.now() - d.createdAt > 3600000 ||
      !d.result?.location?.formatted_address ||
      !Array.isArray(d.result.picks) ||
      !Array.isArray(d.picks) ||
      d.picks.length > 12 ||
      !['guestName', 'propertyName', 'message', 'checkout'].every(
        (k) => typeof d[k] === 'string',
      )
    ) {
      sessionStorage.removeItem(KEY)
      return null
    }
    return d
  } catch {
    return null
  }
}
