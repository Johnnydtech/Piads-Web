// Run: node --experimental-strip-types scripts/test-welcome-kit.mjs
import assert from 'node:assert/strict'
import { DEFAULT_KIT, listingParagraphs, bookArtwork, guestMessages, mapsUrl, wifiQrValue } from '../app/(marketing)/airbnb-welcome-book-generator/kit-text.ts'

// Phones parse "WIFI:T:<auth>;S:<ssid>;P:<password>;;". The separators must be
// escaped inside values, or a password with ";" joins the wrong network.
assert.equal(wifiQrValue('Coastal House', 'sun&sea'), 'WIFI:T:WPA;S:Coastal House;P:sun&sea;;')
assert.equal(wifiQrValue('a;b', 'p:a"s\\s,'), 'WIFI:T:WPA;S:a\\;b;P:p\\:a\\"s\\\\s\\,;;')
assert.equal(wifiQrValue('OpenNet', ''), 'WIFI:T:nopass;S:OpenNet;;')

const url = new URL(mapsUrl({ place_id: 'ChIJ123', name: 'Blue Bottle & Co' }))
assert.equal(url.origin + url.pathname, 'https://www.google.com/maps/search/')
assert.equal(url.searchParams.get('api'), '1')
assert.equal(url.searchParams.get('query'), 'Blue Bottle & Co')
assert.equal(url.searchParams.get('query_place_id'), 'ChIJ123')

const base = {
  propertyName: 'The Coastal House',
  message: '',
  checkout: 'Checkout is at 11 AM.',
  city: 'Arlington',
  picks: [{ place_id: 'a', name: 'Cafe A' }, { place_id: 'b', name: 'Bar B' }, { place_id: 'c', name: 'Park C' }, { place_id: 'd', name: 'Not Listed' }],
  details: { ...DEFAULT_KIT, wifiName: 'CoastalHouse', wifiPassword: 'hunter22' },
}
const [checkIn, checkout, review] = guestMessages(base)
assert.match(checkIn.text, /The Wi-Fi is CoastalHouse and the password is hunter22\./)
assert.match(checkIn.text, /Cafe A, Bar B and Park C\./)
assert.ok(!checkIn.text.includes('Not Listed'), 'only the top three picks')
assert.match(checkout.text, /enjoying Arlington! A quick reminder for tomorrow: Checkout is at 11 AM\./)
assert.match(review.text, /staying at The Coastal House/)

// No Wi-Fi and no picks: the sentences drop out instead of reading "The Wi-Fi is ."
const [bare] = guestMessages({ ...base, propertyName: '', picks: [], details: DEFAULT_KIT })
assert.equal(bare.text, "Hi [guest name]! We're looking forward to hosting you at our place. Message us anytime if you need anything.")

// The pre-filled TV caption is not a place name.
const [auto] = guestMessages({ ...base, propertyName: 'Your stay in Arlington' })
assert.match(auto.text, /hosting you at our place\./)

// The copy never uses dashes as punctuation.
for (const m of guestMessages(base)) assert.ok(!/ [–—-] /.test(m.text), m.title)

console.log('All welcome kit checks passed.')

// The address-only flow gets finished art in every style without private host details.
for (const [theme, name] of Object.entries({forest:'illustrated-stay',coast:'weekend-postcard',clay:'retreat-journal'})) {
  const result = bookArtwork({theme})
  assert.equal(result.src, `/guest-demo/art/${name}.jpg`)
  assert.match(result.caption, /not a photo of this property/)
}
assert.deepEqual(bookArtwork({photo:'https://example.com/my-house.jpg'}), {src:'https://example.com/my-house.jpg',caption:''})
assert.match(bookArtwork({photo:'old.jpg',artwork:'new.jpg'}).caption, /AI artwork/)
assert.equal(bookArtwork({photo:'old.jpg',artwork:'new.jpg'}).src, 'new.jpg')

// Long imported prose must survive pagination without loss or oversized pages.
const prose = ('A comfortable home with useful details. '.repeat(450)).trim()
const chunks = listingParagraphs(prose)
assert.equal(chunks.join(' '), prose)
assert.ok(chunks.every(chunk => chunk.length <= 950))
assert.deepEqual(listingParagraphs('   '), [])
