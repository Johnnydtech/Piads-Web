import type { KitData } from '../kit-text'
import { DEMO_WELCOME } from '../demo'

export const SAMPLE_BOOK: KitData = {
  sample: true,
  propertyName: 'The Coastal Retreat',
  message: 'A slower pace. A little sea air. A place to feel at home.',
  city: 'By the coast',
  photo: '/stays/coastal-retreat.webp',
  address: 'Your property address appears here.',
  checkout: 'Checkout is at 11 AM. Enjoy one last coffee before you go.',
  picks: DEMO_WELCOME.picks,
  details: {
    hostName: 'Alex, your host',
    hostContact: 'Send your host a message through your booking app.',
    wifiName: 'CoastalRetreat-Sample',
    wifiPassword: 'sample-only',
    checkIn: 'From 3 PM. Take your time getting settled.',
    arrival: 'Follow the garden path to the blue front door. Your host will send your personal entry code before arrival.',
    parking: 'One space is reserved beside the house. Please keep the shared path clear for our neighbors.',
    homeTips: 'Coffee & tea\nFind the coffee maker, mugs and tea on the kitchen shelf.\n\nMake yourself comfortable\nExtra blankets are in the bedroom cupboard. Beach towels are in the basket by the door.\n\nA quiet evening\nUse the TV remote to choose your own streaming app. Remember to sign out before leaving.',
    safety: 'The first-aid kit is in the kitchen drawer. Ask your host for the location of emergency supplies and exits.',
    rules: ['Please keep our home smoke-free.', 'Quiet hours are from 10 PM to 8 AM.', 'Registered guests only; no parties or events.', 'Please leave sandy shoes by the door.'],
    customRules: '',
    checkoutSteps: ['Put used dishes in the dishwasher.', 'Leave used towels in the bathroom.', 'Check drawers and outlets for belongings.', 'Turn off lights and close the windows.', 'Leave the keys on the entry table and lock the door.'],
    customCheckout: '',
  },
}
