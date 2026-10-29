/** Shared with the CMS. Only allowlisted guide fields cross the signup boundary. */
export interface WelcomeHandoff {
  version: 1
  createdAt: number
  address: string
  propertyName: string
  guestName: string
  message: string
  guideStyle?: 'illustrated' | 'journal' | 'postcard'
  checkout: string
  picks: { place_id: string; name: string; blurb: string }[]
}
export const HANDOFF_KEY = 'piads:welcome-import:v1'
export const HANDOFF_TTL = 60 * 60 * 1000
export function parseWelcomeHandoff(
  value: unknown,
  now = Date.now(),
): WelcomeHandoff | null {
  if (!value || typeof value !== 'object') return null
  const d = value as Record<string, unknown>
  if (
    d.version !== 1 ||
    typeof d.createdAt !== 'number' ||
    !Number.isFinite(d.createdAt) ||
    d.createdAt > now + 60000 ||
    now - d.createdAt > HANDOFF_TTL
  )
    return null
  if (d.guideStyle !== undefined && !['illustrated', 'journal', 'postcard'].includes(d.guideStyle as string)) return null
  const limits = {
    address: 1000,
    propertyName: 255,
    guestName: 40,
    message: 140,
    checkout: 120,
  } as const
  for (const [key, max] of Object.entries(limits)) {
    if (typeof d[key] !== 'string' || (d[key] as string).length > max)
      return null
  }
  if (
    !(d.address as string).trim() ||
    !Array.isArray(d.picks) ||
    d.picks.length > 12
  )
    return null
  const picks: WelcomeHandoff['picks'] = []
  for (const p of d.picks) {
    if (
      !p ||
      typeof p !== 'object' ||
      typeof p.place_id !== 'string' ||
      !/^[A-Za-z0-9_-]{1,255}$/.test(p.place_id) ||
      typeof p.name !== 'string' ||
      p.name.length > 255 ||
      typeof p.blurb !== 'string' ||
      p.blurb.length > 300
    )
      return null
    if (!picks.some((x) => x.place_id === p.place_id))
      picks.push({ place_id: p.place_id, name: p.name, blurb: p.blurb })
  }
  return {
    version: 1,
    createdAt: d.createdAt,
    address: (d.address as string).trim(),
    propertyName: d.propertyName as string,
    guestName: d.guestName as string,
    message: d.message as string,
    checkout: d.checkout as string,
    picks,
    ...(d.guideStyle ? { guideStyle: d.guideStyle as WelcomeHandoff['guideStyle'] } : {}),
  }
}
export function readWelcomeHandoff(): WelcomeHandoff | null {
  try {
    const raw = sessionStorage.getItem(HANDOFF_KEY)
    const draft =
      raw && raw.length < 20000 ? parseWelcomeHandoff(JSON.parse(raw)) : null
    if (!draft) sessionStorage.removeItem(HANDOFF_KEY)
    return draft
  } catch {
    return null
  }
}
export function clearWelcomeHandoff() {
  try {
    sessionStorage.removeItem(HANDOFF_KEY)
  } catch {
    /* Storage may be disabled. */
  }
}
