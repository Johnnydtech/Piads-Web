import type { WelcomePick, WelcomeScreenData } from '@/components/welcome-screen'
import type { KitDetails } from './kit-text'
export const GENERATOR_PATH = '/airbnb-welcome-book-generator'
export const RESULT_PATH = `${GENERATOR_PATH}/your-guide`
const KEY = 'piads:welcome-generator:key:v3'
const TTL = 24 * 60 * 60 * 1000
export interface Generated {
  location: { formatted_address: string; city: string }
  utc_offset_minutes: number | null
  background_url: string | null
  weather?: WelcomeScreenData['weather']
  picks: WelcomePick[]
}
export interface GuideDraft {
  version: 3
  createdAt: number
  result: Generated
  guestName: string
  propertyName: string
  message: string
  checkout: string
  picks: WelcomePick[]
  neutralBackground: boolean
  kit?: KitDetails
  photo?: string | null
  artwork?: string | null
  useArtwork?: boolean
  artDescription?: string
  bookTheme?: 'forest' | 'coast' | 'clay'
  paperSize?: 'letter' | 'a4'
  excludedPages?: string[]
  step?: number
  propertySection?: number
  guestSection?: number
  deliveryToken?: string
  deliveryEmail?: string
}
// Private details and images are encrypted at rest. The key lives only in this tab.
// This protects stored drafts, not a compromised script running on our own origin.
async function key(create: boolean) {
  let raw = sessionStorage.getItem(KEY)
  if (!raw && create) {
    raw = JSON.stringify({ id: crypto.randomUUID(), bytes: Array.from(crypto.getRandomValues(new Uint8Array(32))) })
    sessionStorage.setItem(KEY, raw)
  }
  if (!raw) return null
  const saved = JSON.parse(raw)
  return { id: saved.id as string, key: await crypto.subtle.importKey('raw', new Uint8Array(saved.bytes), 'AES-GCM', false, ['encrypt', 'decrypt']) }
}
async function database() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('piads-private-guide-drafts', 1)
    request.onupgradeneeded = () => request.result.createObjectStore('drafts')
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
let writes: Promise<boolean> = Promise.resolve(true)
export function saveDraft(draft: GuideDraft): Promise<boolean> {
  // Serialize encryption and writes so an older save cannot overwrite a newer edit.
  const snapshot = JSON.stringify(draft)
  writes = writes.then(async () => {
    let db: IDBDatabase | undefined
    try {
      if (snapshot.length > 12 * 1024 * 1024) return false
      const access = await key(true)
      if (!access) return false
      const iv = crypto.getRandomValues(new Uint8Array(12))
      const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, access.key, new TextEncoder().encode(snapshot))
      db = await database()
      await new Promise<void>((resolve, reject) => {
        const tx = db!.transaction('drafts', 'readwrite')
        const store = tx.objectStore('drafts')
        store.put({ iv, ciphertext, expires: draft.createdAt + TTL }, access.id)
        const cursor = store.openCursor()
        cursor.onsuccess = () => {
          const item = cursor.result
          if (!item) return
          if (item.value.expires < Date.now()) item.delete()
          item.continue()
        }
        tx.oncomplete = () => resolve()
        tx.onerror = tx.onabort = () => reject(tx.error)
      })
      sessionStorage.removeItem('piads:welcome-generator:v2')
      return true
    } catch { return false } finally { db?.close() }
  })
  return writes
}
export async function readDraft(): Promise<GuideDraft | null> {
  let db: IDBDatabase | undefined
  try {
    const access = await key(false)
    if (!access) return null
    db = await database()
    const row = await new Promise<any>((resolve, reject) => {
      const request = db!.transaction('drafts').objectStore('drafts').get(access.id)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    if (!row || row.expires < Date.now()) return null
    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: row.iv }, access.key, row.ciphertext)
    const d = JSON.parse(new TextDecoder().decode(plaintext))
    if (d.version !== 3 || !Number.isFinite(d.createdAt) || d.createdAt > Date.now() + 60000 || Date.now() - d.createdAt > TTL ||
        !d.result?.location?.formatted_address || !Array.isArray(d.result.picks) || !Array.isArray(d.picks) || d.picks.length > 12 ||
        !['guestName', 'propertyName', 'message', 'checkout'].every(k => typeof d[k] === 'string')) return null
    return d
  } catch { return null } finally { db?.close() }
}

export async function persistentImage(blob: Blob): Promise<string> {
  const url = URL.createObjectURL(blob)
  try {
    const image = new Image()
    image.src = url
    await image.decode()
    const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(image.naturalWidth * scale)
    canvas.height = Math.round(image.naturalHeight * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Image unavailable')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.9)
  } finally { URL.revokeObjectURL(url) }
}
