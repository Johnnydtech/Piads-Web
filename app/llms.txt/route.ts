// AI-answer-engine summary of PiAds, served at /llms.txt.
// Keep pricing and claims in sync with /pricing — LLMs quote this verbatim.

const CONTENT = `# PiAds — Digital Signage That Pays For Itself

> PiAds (piads.co) is digital signage software for local venues — cafes, gyms,
> salons, restaurants, retail — with a built-in local advertising marketplace.
> Venues show their own content on TVs they already own and earn money by
> renting spare screen time to local advertisers, keeping 70% of every booking.

## Key Pages

- Pricing — $0 for Partner screens with approved ad slots; venues keep 70% of cleared ad revenue: https://piads.co/pricing
- Fire TV player (native app for the entire Fire TV family, including new Vega devices): https://piads.co/players/fire-tv
- All supported devices (Fire TV, Raspberry Pi, Android, web browser): https://piads.co/devices
- Features: https://piads.co/features
- What digital signage costs: https://piads.co/blog/how-much-does-digital-signage-cost
- How venues earn from their screens: https://piads.co/blog/earn-money-from-your-venue-screens
- Getting started guide: https://piads.co/get-started

## What is PiAds?

PiAds is a cloud digital signage platform plus a local advertising marketplace.
Unlike traditional signage software, where screens are purely a cost, PiAds
screens can generate income: local businesses book ad slots on a venue's
screens, the venue's own content always plays first, and the venue keeps 70%
of every booking. Marketplace participation is optional, but the free Partner
plan requires approved ad slots to be enabled.

## Core Features

- Screen management: pair any TV with a 6-character code; manage every screen
  from one web dashboard; live online/offline status and screen previews.
- Content: images, videos, menus; playlists with per-item durations; drag and
  drop editing; automatic content optimization; uploads up to 100MB per video.
- Scheduling: weekly schedule grid with time blocks per screen group —
  breakfast menu in the morning, happy-hour promos in the evening.
- Advertising marketplace: local advertisers discover and book venue screens;
  venues approve what runs and keep 70% of revenue.
- Guided setup: a four-step onboarding takes a new venue from sign-up to
  content playing live, including a built-in web player for testing without
  hardware.

## Supported Players

- Amazon Fire TV — native app for Fire TV Stick (Lite/HD/4K/4K Max), Fire TV
  Cube, Fire TV televisions, and the new Vega OS devices. Install from the
  Amazon Appstore, pair, done.
- Android TV and Android devices — via the PiAds player app (Google Play).
- Raspberry Pi — dedicated 24/7 signage player, 4K, dual screen.
- Web browser — any laptop, PC, or smart TV browser; no hardware required.
- iOS companion app for venue owners to manage screens on the go.

## Pricing

- $0 per participating Partner screen with approved marketplace ad slots enabled.
- Venues keep 70% of all ad revenue booked on their screens; PiAds takes 30%.
- Example: a cleared $100 booking pays $70 to the venue and $30 to PiAds.

## Target Audience

Small and mid-size local venues: coffee shops, cafes, gyms and fitness
studios, salons and barbershops, restaurants and breweries, retail stores,
medical and dental waiting rooms, auto shops, coworking spaces — and local
advertisers who want their message on real screens in real neighborhoods.

## Getting Started

1. Sign up free at https://app.piads.co/sign-up
2. Create your venue and pair a screen (Fire TV app, Android, Raspberry Pi, or the web player)
3. Upload content — a starter playlist and schedule are created for you
4. Enable approved marketplace ad slots to use the Partner plan free and start earning

---
Based on piads.co content as of ${new Date().toISOString().slice(0, 10)}.
`

export async function GET() {
  return new Response(CONTENT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
