import type { KitData } from '../kit-text'
import { DEMO_WELCOME } from '../demo'

export const SAMPLE_BOOK: KitData = {
  sample: true,
  propertyName: 'The Willow House',
  message: 'A slower morning. A little adventure. A place to feel at home.',
  city: 'Austin, Texas',
  photo: '/guest-demo/art/illustrated-stay.jpg',
  address: 'Your property address appears here.',
  checkout: 'Checkout is at 11 AM. Enjoy one last coffee before you go.',
  picks: DEMO_WELCOME.picks,
  details: {
    hostName: 'Alex, your host',
    hostContact: 'Send your host a message through your booking app.',
    wifiName: 'WillowHouse-Sample',
    wifiPassword: 'sample-only',
    checkIn: 'From 3 PM. Take your time getting settled.',
    arrival: 'Follow the garden path to the blue front door. Your host will send your personal entry code before arrival.',
    parking: 'One space is reserved beside the house. Please keep the shared path clear for our neighbors.',
    homeTips: 'Coffee & tea\nFind the coffee maker, mugs and tea on the kitchen shelf.\n\nMake yourself comfortable\nExtra blankets are in the bedroom cupboard. Fresh towels are in the basket by the door.\n\nA quiet evening\nUse the TV remote to choose your own streaming app. Remember to sign out before leaving.',
    safety: 'The first-aid kit is in the kitchen drawer. Ask your host for the location of emergency supplies and exits.',
    rules: ['Please keep our home smoke-free.', 'Quiet hours are from 10 PM to 8 AM.', 'Registered guests only; no parties or events.', 'Please leave shoes by the door.'],
    customRules: '',
    checkoutSteps: ['Put used dishes in the dishwasher.', 'Leave used towels in the bathroom.', 'Check drawers and outlets for belongings.', 'Turn off lights and close the windows.', 'Leave the keys on the entry table and lock the door.'],
    customCheckout: '',
  },
}

export type SampleStyle = 'forest' | 'coast' | 'clay'
export const SAMPLE_STYLES = [
  { key: 'forest', title: 'Illustrated Stay', art: '/guest-demo/art/illustrated-stay.jpg', phoneStyle: 'illustrated', description: 'An oak-shaded cottage, delicate ink drawings and the charm of a little storybook.' },
  { key: 'coast', title: 'Weekend Postcard', art: '/guest-demo/art/weekend-postcard.jpg', phoneStyle: 'postcard', description: 'A painted blue door, sunny paper and a playful invitation to explore.' },
  { key: 'clay', title: 'Retreat Journal', art: '/guest-demo/art/retreat-journal.jpg', phoneStyle: 'journal', description: 'Golden afternoon light, quiet typography and a stay worth slowing down for.' },
] as const
export function sampleBook(style: SampleStyle): KitData {
  const selected = SAMPLE_STYLES.find(s => s.key === style) || SAMPLE_STYLES[0]
  return { ...SAMPLE_BOOK, theme: style, photo: selected.art, picks: SAMPLE_BOOK.picks.map((pick, index) => ({ ...pick, name: ['Oak & Bean', 'The Morning Bakery', 'Garden Table', 'Lakeside Walk'][index] || pick.name })) }
}
