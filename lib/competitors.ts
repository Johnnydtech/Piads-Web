// Content for /alternative-to/{competitor} pages. Pricing figures are
// public list prices as of August 2026 — re-verify when competitors change
// plans and update `pricingAsOf`.

export interface CompareRow {
  label: string
  them: string
  piads: string
}

export interface CostRow {
  screens: number
  them: string // monthly $
  piads: string
}

export interface AltFaq {
  q: string
  a: string
}

export interface Competitor {
  slug: string
  name: string // "Yodeck"
  metaTitle: string
  metaDescription: string
  heroAdjectives: string // "that's simpler — and pays you back"
  heroSub: string
  attack: string // one-paragraph honest positioning
  concede: string // what they're genuinely good at (trust device)
  theirWeaknesses: string[] // review-mined pain points
  ourWeaknesses: string[] // honesty block
  compareRows: CompareRow[]
  costRows: CostRow[]
  costNote: string
  faqs: AltFaq[]
  pricingAsOf: string
}

const SHARED_COST_NOTE =
  "Software list prices only, billed monthly, as published on each vendor's pricing page. PiAds venues additionally keep 75% of any local ad bookings on their screens — most single-screen venues offset the fee entirely."

const PIADS_STRENGTHS_ROWS: CompareRow[] = [
  { label: "Price per screen", them: "", piads: "$10/mo flat — every feature included" },
  { label: "Earn from your screens", them: "No", piads: "Built-in local ad marketplace, 75% to you" },
  { label: "Fire TV", them: "", piads: "Native app — Stick, Cube, TVs, new Vega devices" },
  { label: "Screen health", them: "", piads: "Live online/offline, last-seen, last frame" },
]

export const COMPETITORS: Competitor[] = [
  {
    slug: "yodeck-alternative",
    name: "Yodeck",
    metaTitle: "Yodeck Alternative Without the Raspberry Pi",
    metaDescription:
      "PiAds is a Yodeck alternative for local venues: no Raspberry Pi to maintain, native Fire TV app, $10/screen flat — and your screens earn from local advertisers.",
    heroAdjectives: "with no Pi to babysit — and screens that earn",
    heroSub:
      "Yodeck is built around Raspberry Pi players you image, mount, and maintain. PiAds runs natively on the Fire TV Stick already behind your TV — and adds something no signage tool has: local ad revenue, 75% to you.",
    attack:
      "Yodeck is a capable, mature platform — but its center of gravity is the Raspberry Pi player: SD cards to image, hardware to source, and re-flashing when a card wears out. Its per-screen price also climbed across 2026. If you're a local venue with a TV and a Fire TV Stick, PiAds gets you live in minutes with hardware you already own, at a flat $10/screen with nothing feature-gated — and your screens can pay that back through local ad bookings.",
    concede:
      "Credit where due: Yodeck's free single-screen plan is a genuinely generous way to try signage, its app library is large, and the platform is proven at scale. If you already run a fleet of healthy Pi players and don't want ad revenue, staying put is reasonable.",
    theirWeaknesses: [
      "Raspberry Pi-first: SD card imaging, hardware sourcing, and re-flashing worn cards are on you",
      "Per-screen pricing rose across 2026 tiers, and key features sit in higher plans",
      "Free plan is single-screen with Yodeck branding — real deployments start paying quickly",
      "Screens are purely a cost — there's no way to earn anything back",
    ],
    ourWeaknesses: [
      "PiAds' app library is smaller — we cover menus, media, playlists, and scheduling, not 100+ niche apps",
      "The ad marketplace is strongest for US local venues today",
      "Yodeck has more years of enterprise deployments behind it",
    ],
    compareRows: [
      { label: "Typical hardware", them: "Raspberry Pi player (imaged & maintained by you)", piads: "Fire TV Stick you may already own — native app" },
      { label: "Price per screen", them: "Tiered — climbs with the plan", piads: "$10/mo flat, everything included" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 75%" },
      { label: "Setup", them: "Image SD card, mount Pi, register", piads: "Install app, enter 6-character code" },
      { label: "Screen health", them: "Basic status", piads: "Live online/offline, last-seen, last frame" },
    ],
    costRows: [
      { screens: 1, them: "~$8–16", piads: "$10" },
      { screens: 5, them: "~$40–80", piads: "$50" },
      { screens: 20, them: "~$160–320", piads: "$200" },
    ],
    costNote: SHARED_COST_NOTE,
    faqs: [
      { q: "How is PiAds different from Yodeck?", a: "Two big ways: hardware and revenue. PiAds runs natively on Fire TV (no Raspberry Pi to image or maintain), and PiAds screens can earn money — local advertisers book slots you approve, and you keep 75%. Yodeck screens are purely a cost." },
      { q: "Will my content transfer?", a: "Your images and videos re-upload directly. Playlists and schedules are recreated in PiAds' editor — for a typical venue that's under an hour, and our guided onboarding builds your first playlist and schedule automatically." },
      { q: "Do I need to buy new hardware?", a: "Probably not. If there's a Fire TV Stick behind your TV, install the PiAds app and pair. Otherwise a stick is $30–60 — less than a Raspberry Pi kit with case, card, and power supply. We also support Android, Raspberry Pi, and plain browsers." },
      { q: "Is PiAds really cheaper?", a: "At list price they're comparable per screen — the difference is that PiAds includes every feature at $10 and adds ad revenue on top. One local booking a month typically flips a screen from a cost to a profit." },
      { q: "Can I try it side by side?", a: "Yes — the free trial doesn't need a card. Pair one screen (or just the web player, no hardware), run it next to Yodeck for a week, then decide." },
    ],
    pricingAsOf: "August 2026",
  },
  {
    slug: "optisigns-alternative",
    name: "OptiSigns",
    metaTitle: "OptiSigns Alternative for Local Venues",
    metaDescription:
      "PiAds is an OptiSigns alternative built for local venues: simpler dashboard, native Fire TV app, $10/screen with nothing gated — and your screens earn local ad revenue.",
    heroAdjectives: "that's simpler — and pays you back",
    heroSub:
      "OptiSigns packs in 160+ apps and enterprise add-ons most local venues never touch. PiAds keeps the parts a venue actually uses — menus, playlists, schedules, screen health — and adds the one thing nobody else has: your screens earning local ad revenue.",
    attack:
      "OptiSigns is a feature-heavy platform that grew toward enterprise: kiosk modes, AI add-ons, and app counts in the hundreds — with the matching interface density and per-feature tiering. Most cafes, gyms, and shops use five of those features. PiAds is built for exactly those venues: everything you need at $10/screen with nothing gated, a dashboard your staff learns in minutes, and a local ad marketplace that turns the screen into an income line.",
    concede:
      "To be fair: if you need deep kiosk/interactive features, hundreds of niche app integrations, or advanced enterprise controls, OptiSigns has breadth PiAds doesn't try to match. It's a strong product for complex deployments.",
    theirWeaknesses: [
      "Feature breadth brings interface density — a lot of product to learn for a menu board",
      "Meaningful features (advanced reporting, SSO, AI) sit in higher tiers and add-ons",
      "Per-screen cost rises quickly once you leave the basic tier",
      "No way for a venue to earn anything from its screens",
    ],
    ourWeaknesses: [
      "PiAds has far fewer app integrations — by design, but a real gap if you need niche apps",
      "No kiosk/interactive touch mode today",
      "The ad marketplace is strongest for US local venues today",
    ],
    compareRows: [
      { label: "Built for", them: "Feature-maximal, enterprise-leaning", piads: "Local venues — cafes, gyms, salons, shops" },
      { label: "Price per screen", them: "Tiered; features unlock as you pay more", piads: "$10/mo flat, everything included" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 75%" },
      { label: "Learning curve", them: "Hundreds of apps and options", piads: "Staff-ready in minutes; guided onboarding" },
      { label: "Fire TV", them: "Supported via app", piads: "Native app incl. new Vega devices" },
    ],
    costRows: [
      { screens: 1, them: "~$10–25", piads: "$10" },
      { screens: 5, them: "~$50–125", piads: "$50" },
      { screens: 20, them: "~$200–500", piads: "$200" },
    ],
    costNote: SHARED_COST_NOTE,
    faqs: [
      { q: "How is PiAds different from OptiSigns?", a: "Focus and revenue. OptiSigns is a broad enterprise-leaning toolkit; PiAds is purpose-built for local venues and includes everything at one price. And only PiAds lets your screens earn — local advertisers book slots you approve, and 75% of the money is yours." },
      { q: "Does PiAds have the apps I need?", a: "If your screens run menus, promos, images, videos, playlists, and schedules — yes, fully. If you rely on OptiSigns' niche apps or kiosk modes, check our features page first; we deliberately keep the product lean." },
      { q: "Is switching hard?", a: "Media re-uploads directly, and playlists/schedules are recreated in a guided flow. A single-screen venue is typically done in under an hour." },
      { q: "What hardware does PiAds support?", a: "Fire TV (native, including the new Vega devices), Android, Raspberry Pi, and any web browser. Most venues just use the stick already in their TV." },
      { q: "What does PiAds cost at 10 screens?", a: "$100/month, every feature included — and ten screens of local ad inventory typically earn well beyond that in a active neighborhood." },
    ],
    pricingAsOf: "August 2026",
  },
  {
    slug: "screencloud-alternative",
    name: "ScreenCloud",
    metaTitle: "ScreenCloud Alternative That Doesn't Cost $20+/Screen",
    metaDescription:
      "PiAds is a ScreenCloud alternative for local venues: $10/screen instead of $20+, native Fire TV app, guided setup — and your screens earn from local advertisers.",
    heroAdjectives: "at half the price — that earns it back",
    heroSub:
      "ScreenCloud is polished, enterprise-focused, and priced like it. PiAds gives a local venue the parts that matter at $10/screen — and then flips the economics entirely with local ad revenue, 75% to you.",
    attack:
      "ScreenCloud is genuinely well-made software aimed at employee comms and multi-site enterprises — with per-screen pricing north of $20 and features like dashboards-on-screens that matter to head offices, not counter-service venues. If you're paying ScreenCloud rates to run a menu and promos, you're funding features you'll never open. PiAds does the venue job at $10 flat, sets you up in minutes on the Fire TV Stick you already own, and its ad marketplace can make the screen net-positive.",
    concede:
      "Being honest: ScreenCloud's product polish is real, its employee-comms features (dashboards, internal channels, SSO) are excellent for corporate deployments, and its support is well-reviewed. For a 200-office enterprise, it's a fine choice.",
    theirWeaknesses: [
      "Per-screen pricing around $20+ — over 2× PiAds for a venue use case",
      "Product center of gravity is employee comms and enterprise, not customer-facing venues",
      "Enterprise features you pay for either way",
      "Screens are purely a cost — no earning mechanism",
    ],
    ourWeaknesses: [
      "PiAds doesn't do secure internal dashboards or corporate comms channels",
      "No SSO/SCIM today — PiAds targets venues, not IT departments",
      "The ad marketplace is strongest for US local venues today",
    ],
    compareRows: [
      { label: "Built for", them: "Enterprise & employee communications", piads: "Local venues — customer-facing screens" },
      { label: "Price per screen", them: "~$20+/mo", piads: "$10/mo flat" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 75%" },
      { label: "Setup", them: "Solid, IT-friendly", piads: "6-character pairing code, guided onboarding" },
      { label: "Fire TV", them: "Supported", piads: "Native app incl. new Vega devices" },
    ],
    costRows: [
      { screens: 1, them: "~$20–24", piads: "$10" },
      { screens: 5, them: "~$100–120", piads: "$50" },
      { screens: 20, them: "~$400–480", piads: "$200" },
    ],
    costNote: SHARED_COST_NOTE,
    faqs: [
      { q: "How is PiAds different from ScreenCloud?", a: "Price and purpose. ScreenCloud is enterprise employee-comms software at $20+/screen; PiAds is venue signage at $10 flat — and the only platform where your screens earn local ad revenue, with 75% going to you." },
      { q: "Is PiAds really half the price?", a: "At list price, yes — $10 vs ~$20+ per screen monthly. Factor in ad revenue and the comparison stops being close for a typical local venue." },
      { q: "What am I giving up?", a: "ScreenCloud's corporate features: secure internal dashboards, comms channels, SSO. If your screens face customers rather than employees, you won't miss them." },
      { q: "How fast can I switch?", a: "Media re-uploads directly; the guided onboarding rebuilds your first playlist and schedule automatically. Most single-venue setups finish inside an hour." },
      { q: "Do ads have to run on my screens?", a: "No — ads are optional and every one requires your approval. Run 100% your own content, or open slots and let the screen pay for itself." },
    ],
    pricingAsOf: "August 2026",
  },
  {
    slug: "raydiant-alternative",
    name: "Raydiant (Displai)",
    metaTitle: "Raydiant / Displai Alternative Without the Hardware Bill",
    metaDescription:
      "PiAds is a Raydiant (now Displai) alternative: no proprietary player, no demo call, no contract — $10/screen on the Fire TV Stick you own, plus local ad revenue.",
    heroAdjectives: "with no hardware bill and no sales call",
    heroSub:
      "Raydiant — now Displai — sells proprietary players, annual contracts, and demo-first pricing. PiAds is the opposite: sign up yourself, pair the Fire TV Stick you already own, pay $10/screen monthly, and keep 75% of any ad revenue your screens generate.",
    attack:
      "Raydiant's model is enterprise sales: a demo call before you see pricing, proprietary hardware per screen, bundled 'experience platform' features (HR tools, employee TV) and annual contracts sized for chains. For an independent venue that just wants its menu, promos, and a bit of income from the screen, that's a lot of process and CapEx. PiAds is self-serve from minute one — free trial without a card, hardware you already own, month-to-month, and a marketplace that pays you rather than the other way around.",
    concede:
      "In fairness: Raydiant's managed hardware and white-glove onboarding suit large franchises that want one throat to choke, and their bundled employee-experience products make sense at chain scale.",
    theirWeaknesses: [
      "Proprietary player hardware per screen — real upfront cost before anything plays",
      "Pricing behind a demo call; annual contracts the norm",
      "Bundled enterprise/HR features an independent venue never uses",
      "No way for the venue to earn from its screens",
    ],
    ourWeaknesses: [
      "No managed/white-glove deployment — PiAds is self-serve (that's the point, but it's a difference)",
      "No bundled employee-experience products",
      "The ad marketplace is strongest for US local venues today",
    ],
    compareRows: [
      { label: "Getting started", them: "Book a demo, get a quote, sign a contract", piads: "Self-serve free trial, no card" },
      { label: "Hardware", them: "Proprietary player per screen", piads: "Fire TV Stick you own — native app" },
      { label: "Pricing", them: "Quote-based, annual", piads: "$10/screen monthly, public, cancel anytime" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 75%" },
      { label: "Best for", them: "Chains wanting managed rollout", piads: "Independent venues & small groups" },
    ],
    costRows: [
      { screens: 1, them: "Quote + player hardware", piads: "$10" },
      { screens: 5, them: "Quote + 5× player hardware", piads: "$50" },
      { screens: 20, them: "Quote + 20× player hardware", piads: "$200" },
    ],
    costNote:
      "Raydiant/Displai pricing is quote-based and typically bundles proprietary player hardware per screen; published third-party estimates put all-in first-year costs several times a software-only subscription. PiAds figures are list price — and venues keep 75% of local ad bookings.",
    faqs: [
      { q: "How is PiAds different from Raydiant / Displai?", a: "PiAds is self-serve where Raydiant is sales-led: public pricing, no contract, no proprietary hardware. And PiAds screens earn — the local ad marketplace pays you 75% of every booking, which no 'experience platform' offers." },
      { q: "Do I need to buy any hardware?", a: "No. PiAds runs natively on Fire TV (including the new Vega devices), on Android, Raspberry Pi, or any browser. If your TV has a stick, you're minutes from live." },
      { q: "Can I leave whenever I want?", a: "Yes — month to month, cancel anytime. Your media stays exportable; there's no contract cliff." },
      { q: "Is PiAds enough for multiple locations?", a: "Yes — manage every screen across venues from one dashboard with live health status. What PiAds doesn't do is send technicians; installation is plugging in a stick." },
      { q: "What does it actually cost?", a: "$10 per screen per month, everything included, published right on our pricing page — no demo required." },
    ],
    pricingAsOf: "August 2026",
  },
  {
    slug: "juuno-alternative",
    name: "Juuno",
    metaTitle: "Juuno Alternative Where Screens Earn Money",
    metaDescription:
      "PiAds is a Juuno alternative for local venues: comparable simplicity and price — plus a local ad marketplace that pays you 75%, native Fire TV support, and live screen health.",
    heroAdjectives: "where your screens actually earn",
    heroSub:
      "Juuno made signage simple and cheap — genuinely. PiAds matches the simplicity, runs natively on the Fire TV family Juuno steers you away from, and adds the thing no signage-only tool can: local advertisers paying for your spare screen time, 75% to you.",
    attack:
      "Juuno's pitch is simplicity at $5/screen, and it delivers a clean product. But its recommended path is buying a $99 signage stick (it steers users away from the Fire TV Sticks millions of venues already own), several headline features are still marked 'coming soon', and — like every signage tool except PiAds — the screen is purely an expense. PiAds runs natively on Fire TV including the newest Vega devices, shows you live screen health Juuno lacks entirely, and turns the same screen into an income line through the local ad marketplace.",
    concede:
      "Respect where due: Juuno's $5 entry price is the lowest around, its interface is clean, and its white-label program is clever for agencies. As a pure minimal CMS, it's a good product.",
    theirWeaknesses: [
      "Steers venues to buy a $99 signage stick rather than the Fire TV hardware they already own",
      "No screen health monitoring — no online/offline status, no last-seen, no last frame",
      "Several advertised features still 'coming soon' (API, HD tier features, key apps)",
      "Proof-of-play and reporting gated behind the higher tier",
      "Screens can't earn anything",
    ],
    ourWeaknesses: [
      "Juuno's $5 entry tier is cheaper than PiAds' $10 if you never run ads",
      "Juuno offers a white-label reseller program PiAds doesn't have yet",
      "Juuno's app grid covers a few niche content types PiAds doesn't",
    ],
    compareRows: [
      { label: "Price per screen", them: "$5–9/mo depending on tier", piads: "$10/mo flat — every feature, incl. reporting" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 75%" },
      { label: "Fire TV", them: "Deprecated in their hardware guide", piads: "Native app — Stick, Cube, TVs, Vega devices" },
      { label: "Screen health", them: "None visible", piads: "Live online/offline, last-seen, last frame" },
      { label: "Onboarding", them: "Video + docs", piads: "Guided 4-step: venue → pair → content → live" },
    ],
    costRows: [
      { screens: 1, them: "$5–9", piads: "$10" },
      { screens: 5, them: "$25–45", piads: "$50" },
      { screens: 20, them: "$100–180", piads: "$200" },
    ],
    costNote:
      "Juuno list prices (Business $5, Growth $9 per screen) as published August 2026. PiAds is $10 with every feature included — and venues keep 75% of local ad bookings, which typically flips the comparison for any venue with real foot traffic.",
    faqs: [
      { q: "How is PiAds different from Juuno?", a: "Revenue, hardware, and visibility. PiAds screens earn through a local ad marketplace (75% to you); PiAds runs natively on the Fire TV devices Juuno steers you away from; and PiAds shows live screen health — online status, last-seen, and the last frame each screen displayed." },
      { q: "Juuno is $5 — isn't PiAds double?", a: "At the software line, yes. But Juuno's $5 tier excludes reporting, and no Juuno tier can earn anything. A single $100 local ad booking pays for a PiAds screen for months — the venues we serve care about the net, not the fee." },
      { q: "I own Fire TV Sticks — which platform fits?", a: "PiAds, without much debate: our player is a native Fire TV app across the whole family including the new Vega OS devices. Juuno's guidance points you to buying their recommended stick instead." },
      { q: "Is switching from Juuno hard?", a: "Media re-uploads directly and the guided onboarding rebuilds your playlist and schedule in minutes. Run PiAds' web player side by side before moving your TVs." },
      { q: "Do I have to run ads on PiAds?", a: "No. Ads are optional, every ad needs your approval, and plenty of venues run their own content only. The marketplace is there when you want the screen to start paying rent." },
    ],
    pricingAsOf: "August 2026",
  },
]

export function competitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug)
}
