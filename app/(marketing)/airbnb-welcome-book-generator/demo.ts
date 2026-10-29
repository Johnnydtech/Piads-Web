import type { WelcomeScreenData } from '@/components/welcome-screen'

// Fictional host recommendations: no Places lookup, visitor location, or API
// spend is needed to show the complete TV layout before entering an address.
export const DEMO_WELCOME: WelcomeScreenData = {
  guest_name: 'Maya',
  property_name: 'The Coastal Retreat',
  welcome_message: 'Settle in, slow down, and make yourself at home. Here are a few of our favorite places nearby.',
  checkout_text: 'Checkout is at 11 AM. Please leave the keys on the entry table. Safe travels!',
  background_url: '/stays/coastal-retreat.webp',
  weather: { temp_f: 72, condition: 'Sunny' },
  picks: [
    { place_id: 'demo-cafe', name: 'Harbor Coffee', blurb: 'Our favorite morning stop', photo_url: '/guest-demo/cafe.jpg' },
    { place_id: 'demo-bakery', name: 'Coast Bakery', blurb: 'Try the fresh sourdough', photo_url: '/guest-demo/bakery.jpg' },
    { place_id: 'demo-kitchen', name: 'The Cove Kitchen', blurb: 'A lovely spot for dinner', photo_url: '/guest-demo/restaurant.jpg' },
    { place_id: 'demo-walk', name: 'Coastal Walk', blurb: 'Take the scenic route at sunset', photo_url: '/guest-demo/coast.jpg' },
  ],
}
