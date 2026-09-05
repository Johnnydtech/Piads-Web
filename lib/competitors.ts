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
  /** Overrides the default "no one else pays you" wedge — required for
   *  ad-funded competitors (Trillboards, Loop TV), where that claim is false. */
  wedge?: { title: string; body: string }
}

const SHARED_COST_NOTE =
  "Software list prices only, billed monthly, as published on each vendor's pricing page. PiAds is $0 for partner screens that enable approved ad slots, and venues keep 70% of cleared local ad bookings on those screens."

const PIADS_STRENGTHS_ROWS: CompareRow[] = [
  { label: "Price per screen", them: "", piads: "$0 with approved ad slots — every feature included" },
  { label: "Earn from your screens", them: "No", piads: "Built-in local ad marketplace, 70% to you" },
  { label: "Fire TV", them: "", piads: "Native app — Stick, Cube, TVs, new Vega devices" },
  { label: "Screen health", them: "", piads: "Live online/offline, last-seen, last frame" },
]

export const COMPETITORS: Competitor[] = [
  {
    slug: "yodeck-alternative",
    name: "Yodeck",
    metaTitle: "Yodeck Alternative Without the Raspberry Pi",
    metaDescription:
      "PiAds is a Yodeck alternative for local venues: no Raspberry Pi to maintain, native Fire TV app, $0 with approved ad slots — and your screens earn from local advertisers.",
    heroAdjectives: "with no Pi to babysit — and screens that earn",
    heroSub:
      "Yodeck is built around Raspberry Pi players you image, mount, and maintain. PiAds runs natively on the Fire TV Stick already behind your TV — and adds something no signage tool has: local ad revenue, 70% to you.",
    attack:
      "Yodeck is a capable, mature platform — but its center of gravity is the Raspberry Pi player: SD cards to image, hardware to source, and re-flashing when a card wears out. Its per-screen price also climbed across 2026. If you're a local venue with a TV and a Fire TV Stick, PiAds gets you live in minutes with hardware you already own, for $0 with nothing feature-gated when you enable approved ad slots — and your screens earn from local ad bookings on top.",
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
      { label: "Price per screen", them: "Tiered — climbs with the plan", piads: "$0 with approved ad slots, everything included" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 70%" },
      { label: "Setup", them: "Image SD card, mount Pi, register", piads: "Install app, enter 6-character code" },
      { label: "Screen health", them: "Basic status", piads: "Live online/offline, last-seen, last frame" },
    ],
    costRows: [
      { screens: 1, them: "~$8–16", piads: "$0" },
      { screens: 5, them: "~$40–80", piads: "$0" },
      { screens: 20, them: "~$160–320", piads: "$0" },
    ],
    costNote: SHARED_COST_NOTE,
    faqs: [
      { q: "How is PiAds different from Yodeck?", a: "Two big ways: hardware and revenue. PiAds runs natively on Fire TV (no Raspberry Pi to image or maintain), and PiAds screens can earn money — local advertisers book slots you approve, and you keep 70%. Yodeck screens are purely a cost." },
      { q: "Will my content transfer?", a: "Your images and videos re-upload directly. Playlists and schedules are recreated in PiAds' editor — for a typical venue that's under an hour, and our guided onboarding builds your first playlist and schedule automatically." },
      { q: "Do I need to buy new hardware?", a: "Probably not. If there's a Fire TV Stick behind your TV, install the PiAds app and pair. Otherwise a stick is $30–60 — less than a Raspberry Pi kit with case, card, and power supply. We also support Android, Raspberry Pi, and plain browsers." },
      { q: "Is PiAds really cheaper?", a: "Yes. The software is $0 for partner screens that enable approved ad slots, with every feature included. Add the 70% you keep on cleared local bookings and the screen goes from a cost line to an income line." },
      { q: "Can I try it side by side?", a: "Yes — PiAds is free for partner screens and doesn't need a card. Pair one screen (or just the web player, no hardware), run it next to Yodeck for a week, then decide." },
    ],
    pricingAsOf: "August 2026",
  },
  {
    slug: "optisigns-alternative",
    name: "OptiSigns",
    metaTitle: "OptiSigns Alternative for Local Venues",
    metaDescription:
      "PiAds is an OptiSigns alternative built for local venues: simpler dashboard, native Fire TV app, $0 with approved ad slots and nothing gated — and your screens earn local ad revenue.",
    heroAdjectives: "that's simpler — and pays you back",
    heroSub:
      "OptiSigns packs in 160+ apps and enterprise add-ons most local venues never touch. PiAds keeps the parts a venue actually uses — menus, playlists, schedules, screen health — and adds the one thing nobody else has: your screens earning local ad revenue.",
    attack:
      "OptiSigns is a feature-heavy platform that grew toward enterprise: kiosk modes, AI add-ons, and app counts in the hundreds — with the matching interface density and per-feature tiering. Most cafes, gyms, and shops use five of those features. PiAds is built for exactly those venues: everything you need for $0 with approved ad slots and nothing gated, a dashboard your staff learns in minutes, and a local ad marketplace that turns the screen into an income line.",
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
      { label: "Price per screen", them: "Tiered; features unlock as you pay more", piads: "$0 with approved ad slots, everything included" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 70%" },
      { label: "Learning curve", them: "Hundreds of apps and options", piads: "Staff-ready in minutes; guided onboarding" },
      { label: "Fire TV", them: "Supported via app", piads: "Native app incl. new Vega devices" },
    ],
    costRows: [
      { screens: 1, them: "~$10–25", piads: "$0" },
      { screens: 5, them: "~$50–125", piads: "$0" },
      { screens: 20, them: "~$200–500", piads: "$0" },
    ],
    costNote: SHARED_COST_NOTE,
    faqs: [
      { q: "How is PiAds different from OptiSigns?", a: "Focus and revenue. OptiSigns is a broad enterprise-leaning toolkit; PiAds is purpose-built for local venues and includes everything for $0 on partner screens with approved ad slots. And only PiAds lets your screens earn — local advertisers book slots you approve, and 70% of the money is yours." },
      { q: "Does PiAds have the apps I need?", a: "If your screens run menus, promos, images, videos, playlists, and schedules — yes, fully. If you rely on OptiSigns' niche apps or kiosk modes, check our features page first; we deliberately keep the product lean." },
      { q: "Is switching hard?", a: "Media re-uploads directly, and playlists/schedules are recreated in a guided flow. A single-screen venue is typically done in under an hour." },
      { q: "What hardware does PiAds support?", a: "Fire TV (native, including the new Vega devices), Android, Raspberry Pi, and any web browser. Most venues just use the stick already in their TV." },
      { q: "What does PiAds cost at 10 screens?", a: "$0 — every partner screen with approved ad slots is free, however many you run. Ten screens of local ad inventory in an active neighborhood is meaningful income at 70% to you." },
    ],
    pricingAsOf: "August 2026",
  },
  {
    slug: "screencloud-alternative",
    name: "ScreenCloud",
    metaTitle: "ScreenCloud Alternative That Doesn't Cost $20+/Screen",
    metaDescription:
      "PiAds is a ScreenCloud alternative for local venues: $0 with approved ad slots instead of $20+/screen, native Fire TV app, guided setup — and your screens earn from local advertisers.",
    heroAdjectives: "for $0 — that pays you back",
    heroSub:
      "ScreenCloud is polished, enterprise-focused, and priced like it. PiAds gives a local venue the parts that matter for $0 with approved ad slots — and then flips the economics entirely with local ad revenue, 70% to you.",
    attack:
      "ScreenCloud is genuinely well-made software aimed at employee comms and multi-site enterprises — with per-screen pricing north of $20 and features like dashboards-on-screens that matter to head offices, not counter-service venues. If you're paying ScreenCloud rates to run a menu and promos, you're funding features you'll never open. PiAds does the venue job for $0 with approved ad slots, sets you up in minutes on the Fire TV Stick you already own, and its ad marketplace can make the screen net-positive.",
    concede:
      "Being honest: ScreenCloud's product polish is real, its employee-comms features (dashboards, internal channels, SSO) are excellent for corporate deployments, and its support is well-reviewed. For a 200-office enterprise, it's a fine choice.",
    theirWeaknesses: [
      "Per-screen pricing around $20+ — while PiAds is $0 for partner screens",
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
      { label: "Price per screen", them: "~$20+/mo", piads: "$0 with approved ad slots" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 70%" },
      { label: "Setup", them: "Solid, IT-friendly", piads: "6-character pairing code, guided onboarding" },
      { label: "Fire TV", them: "Supported", piads: "Native app incl. new Vega devices" },
    ],
    costRows: [
      { screens: 1, them: "~$20–24", piads: "$0" },
      { screens: 5, them: "~$100–120", piads: "$0" },
      { screens: 20, them: "~$400–480", piads: "$0" },
    ],
    costNote: SHARED_COST_NOTE,
    faqs: [
      { q: "How is PiAds different from ScreenCloud?", a: "Price and purpose. ScreenCloud is enterprise employee-comms software at $20+/screen; PiAds is venue signage at $0 with approved ad slots — and the only platform where your screens earn local ad revenue, with 70% going to you." },
      { q: "Is PiAds really free?", a: "For partner screens, yes — enable approved ad slots and the software is $0 versus ~$20+ per screen monthly on ScreenCloud. Every ad still needs your approval, and you keep 70% of cleared bookings." },
      { q: "What am I giving up?", a: "ScreenCloud's corporate features: secure internal dashboards, comms channels, SSO. If your screens face customers rather than employees, you won't miss them." },
      { q: "How fast can I switch?", a: "Media re-uploads directly; the guided onboarding rebuilds your first playlist and schedule automatically. Most single-venue setups finish inside an hour." },
      { q: "Do ads have to run on my screens?", a: "No — every ad requires your approval, and you can run 100% your own content. Screens without approved ad slots are billed at $10 per screen per month; enable slots and the fee drops to $0." },
    ],
    pricingAsOf: "August 2026",
  },
  {
    slug: "raydiant-alternative",
    name: "Raydiant (Displai)",
    metaTitle: "Raydiant / Displai Alternative Without the Hardware Bill",
    metaDescription:
      "PiAds is a Raydiant (now Displai) alternative: no proprietary player, no demo call, no contract — $0 with approved ad slots on the Fire TV Stick you own, plus local ad revenue.",
    heroAdjectives: "with no hardware bill and no sales call",
    heroSub:
      "Raydiant — now Displai — sells proprietary players, annual contracts, and demo-first pricing. PiAds is the opposite: sign up yourself, pair the Fire TV Stick you already own, pay $0 with approved ad slots, and keep 70% of any ad revenue your screens generate.",
    attack:
      "Raydiant's model is enterprise sales: a demo call before you see pricing, proprietary hardware per screen, bundled 'experience platform' features (HR tools, employee TV) and annual contracts sized for chains. For an independent venue that just wants its menu, promos, and a bit of income from the screen, that's a lot of process and CapEx. PiAds is self-serve from minute one — free for partner screens without a card, hardware you already own, month-to-month, and a marketplace that pays you rather than the other way around.",
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
      { label: "Getting started", them: "Book a demo, get a quote, sign a contract", piads: "Self-serve, free for partner screens, no card" },
      { label: "Hardware", them: "Proprietary player per screen", piads: "Fire TV Stick you own — native app" },
      { label: "Pricing", them: "Quote-based, annual", piads: "$0 with approved ad slots, public, cancel anytime" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 70%" },
      { label: "Best for", them: "Chains wanting managed rollout", piads: "Independent venues & small groups" },
    ],
    costRows: [
      { screens: 1, them: "Quote + player hardware", piads: "$0" },
      { screens: 5, them: "Quote + 5× player hardware", piads: "$0" },
      { screens: 20, them: "Quote + 20× player hardware", piads: "$0" },
    ],
    costNote:
      "Raydiant/Displai pricing is quote-based and typically bundles proprietary player hardware per screen; published third-party estimates put all-in first-year costs several times a software-only subscription. PiAds is $0 for partner screens that enable approved ad slots — and venues keep 70% of local ad bookings.",
    faqs: [
      { q: "How is PiAds different from Raydiant / Displai?", a: "PiAds is self-serve where Raydiant is sales-led: public pricing, no contract, no proprietary hardware. And PiAds screens earn — the local ad marketplace pays you 70% of every booking, which no 'experience platform' offers." },
      { q: "Do I need to buy any hardware?", a: "No. PiAds runs natively on Fire TV (including the new Vega devices), on Android, Raspberry Pi, or any browser. If your TV has a stick, you're minutes from live." },
      { q: "Can I leave whenever I want?", a: "Yes — month to month, cancel anytime. Your media stays exportable; there's no contract cliff." },
      { q: "Is PiAds enough for multiple locations?", a: "Yes — manage every screen across venues from one dashboard with live health status. What PiAds doesn't do is send technicians; installation is plugging in a stick." },
      { q: "What does it actually cost?", a: "$0 for partner screens that enable approved ad slots, everything included, published right on our pricing page — no demo required." },
    ],
    pricingAsOf: "August 2026",
  },
  {
    slug: "juuno-alternative",
    name: "Juuno",
    metaTitle: "Juuno Alternative Where Screens Earn Money",
    metaDescription:
      "PiAds is a Juuno alternative for local venues: comparable simplicity and price — plus a local ad marketplace that pays you 70%, native Fire TV support, and live screen health.",
    heroAdjectives: "where your screens actually earn",
    heroSub:
      "Juuno made signage simple and cheap — genuinely. PiAds matches the simplicity, runs natively on the Fire TV family Juuno steers you away from, and adds the thing no signage-only tool can: local advertisers paying for your spare screen time, 70% to you.",
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
      "If you never want ads on your screens, PiAds is $10/screen — Juuno's $5 tier is cheaper for that case",
      "Juuno offers a white-label reseller program PiAds doesn't have yet",
      "Juuno's app grid covers a few niche content types PiAds doesn't",
    ],
    compareRows: [
      { label: "Price per screen", them: "$5–9/mo depending on tier", piads: "$0 with approved ad slots — every feature, incl. reporting" },
      { label: "Earn from your screens", them: "No", piads: "Local ad marketplace — you keep 70%" },
      { label: "Fire TV", them: "Deprecated in their hardware guide", piads: "Native app — Stick, Cube, TVs, Vega devices" },
      { label: "Screen health", them: "None visible", piads: "Live online/offline, last-seen, last frame" },
      { label: "Onboarding", them: "Video + docs", piads: "Guided 4-step: venue → pair → content → live" },
    ],
    costRows: [
      { screens: 1, them: "$5–9", piads: "$0" },
      { screens: 5, them: "$25–45", piads: "$0" },
      { screens: 20, them: "$100–180", piads: "$0" },
    ],
    costNote:
      "Juuno list prices (Business $5, Growth $9 per screen) as published August 2026. PiAds is $0 for partner screens that enable approved ad slots, every feature included — and venues keep 70% of cleared local ad bookings.",
    faqs: [
      { q: "How is PiAds different from Juuno?", a: "Revenue, hardware, and visibility. PiAds screens earn through a local ad marketplace (70% to you); PiAds runs natively on the Fire TV devices Juuno steers you away from; and PiAds shows live screen health — online status, last-seen, and the last frame each screen displayed." },
      { q: "Juuno is $5 — how is PiAds free?", a: "Partner screens enable approved ad slots and advertising funds the platform, so the software is $0 with every feature included, reporting too. Juuno's $5 tier excludes reporting, and no Juuno tier can earn anything — on PiAds you keep 70% of every cleared booking." },
      { q: "I own Fire TV Sticks — which platform fits?", a: "PiAds, without much debate: our player is a native Fire TV app across the whole family including the new Vega OS devices. Juuno's guidance points you to buying their recommended stick instead." },
      { q: "Is switching from Juuno hard?", a: "Media re-uploads directly and the guided onboarding rebuilds your playlist and schedule in minutes. Run PiAds' web player side by side before moving your TVs." },
      { q: "Do I have to run ads on PiAds?", a: "No. Every ad needs your approval, and you can run your own content only — those screens are billed at $10 per screen per month. Enable approved ad slots and the screen is free, plus you keep 70% of what it earns." },
    ],
    pricingAsOf: "August 2026",
  },
  {
    slug: "trillboards-alternative",
    name: "Trillboards",
    metaTitle: "Trillboards Alternative: Local Advertisers You Approve, 70% to You",
    metaDescription:
      "PiAds vs Trillboards: both are free, ad-funded signage. The difference is who advertises and who decides — programmatic fill with category blocking, or local businesses you approve one by one with a published 70% split.",
    heroAdjectives: "where you approve every ad — and the split is published",
    heroSub:
      "Trillboards and PiAds both make signage free by selling your screen time. Trillboards fills it from a programmatic exchange with category controls; PiAds sells it to local businesses you approve campaign by campaign, and pays a fixed 70%.",
    attack:
      "Trillboards is the most direct comparison to PiAds: free CMS, free device management, ad revenue instead of a subscription. Where it differs is the ad supply. Trillboards plugs your screen into an open programmatic exchange — hundreds of demand partners bidding for impressions — and your control is category-level: block alcohol, block gambling, allow-list verticals. You don't see or approve the individual creative before it airs, and the venue's share of each dollar isn't published. PiAds sells your slots to businesses near you, each campaign waits for your approval, and the split is a fixed 70% on every cleared booking. If you want your screen to feel like part of the neighborhood rather than a programmatic endpoint, that's the line.",
    concede:
      "Credit where due: Trillboards' 'triple-free' bundle (CMS, device management, curated content) is generous, programmatic demand can fill slots in places local advertisers haven't discovered yet, and their earnings claims for high-traffic venues are attractive if they hold. For an airport lounge or a chain with real programmatic scale, it may out-earn a local marketplace.",
    theirWeaknesses: [
      "Programmatic fill — you block categories, you don't approve the specific ads your customers will see",
      "The venue's revenue share isn't published; earnings depend on exchange CPMs and fill rate",
      "Advertisers are whoever bids on the exchange, not businesses in your neighborhood",
      "Launched March 2026; the ad-funded free model has a mixed track record (Framen pivoted to paid)",
    ],
    ourWeaknesses: [
      "PiAds has no programmatic demand — if no local business books your screen, it earns nothing that month",
      "Trillboards' curated content library is bigger; PiAds expects you to bring your own menus, promos, and media",
      "The PiAds marketplace is strongest in the US metros where we have advertisers today",
    ],
    compareRows: [
      { label: "Software cost", them: "$0, ad-funded", piads: "$0 for partner screens with approved ad slots; $10/mo if ad-free" },
      { label: "Who advertises", them: "Programmatic exchange — hundreds of demand partners", piads: "Local businesses near your venue" },
      { label: "Your control", them: "Category blocking and allow-lists", piads: "Approve or decline every campaign, plus category controls" },
      { label: "Revenue share", them: "Not published", piads: "70% of every cleared booking, published" },
      { label: "Hardware", them: "Android TV incl. Fire TV Stick, smart TVs, Chromecast", piads: "Native Fire TV app, Android TV, Raspberry Pi, browser — plus a free iOS app" },
      { label: "Screen health", them: "Device management included", piads: "Live online/offline, last-seen, last frame" },
    ],
    costRows: [
      { screens: 1, them: "$0 (ad-funded)", piads: "$0" },
      { screens: 5, them: "$0 (ad-funded)", piads: "$0" },
      { screens: 20, them: "$0 (ad-funded)", piads: "$0" },
    ],
    costNote:
      "Both platforms are free to run on partner screens; the comparison is what plays and what you keep. Trillboards does not publish the venue's share of ad revenue; its site cites typical earnings of $100–$300 per screen per month for medium-traffic venues and $400–$600 for high-traffic ones (their figures, September 2026). PiAds pays 70% of each cleared booking.",
    faqs: [
      { q: "How is PiAds different from Trillboards?", a: "Both are free, ad-funded signage. Trillboards sells your screen time on a programmatic exchange and gives you category-level controls. PiAds sells it to local businesses, every campaign needs your approval before it plays, and the split is a published 70% to the venue." },
      { q: "Which earns more?", a: "It depends on your venue. Programmatic demand can fill a screen anywhere; local demand depends on businesses near you booking. PiAds doesn't promise a monthly figure — you set slot prices, approve bookings, and keep 70% of what clears." },
      { q: "Can I see the ads before they run?", a: "On PiAds, yes — every creative waits for your approval. On Trillboards you control which categories can run, not the individual ads." },
      { q: "Do I need new hardware?", a: "No. Both run on a Fire TV Stick or Android TV device you own. PiAds also runs on Raspberry Pi and in any browser, and has a native iOS app for managing screens from your phone." },
      { q: "Can I use PiAds without ads?", a: "Yes — ad-free screens are $10 per screen per month or $100 per year. Enable approved ad slots and the screen becomes free." },
    ],
    pricingAsOf: "September 2026",
    wedge: {
      title: "The difference is who's on your screen",
      body: "Both platforms pay you. On Trillboards the buyer is an exchange bidding on impressions; on PiAds it's the gym, dentist, or shop down the street booking a daypart you priced and approved. Your content plays first, every campaign needs your sign-off, and 70% of each cleared booking is yours. The software is $0 for partner screens on both — so choose on control, not price.",
    },
  },
  {
    slug: "loop-tv-alternative",
    name: "Loop TV",
    metaTitle: "Loop TV Alternative for Venues: Your Content First, Local Ads You Approve",
    metaDescription:
      "Loop TV gives you a free player and music-video channels with your promos as banners. PiAds makes your own content the program, sells the gaps to local businesses you approve, and pays 70% — free for partner screens.",
    heroAdjectives: "where your content is the program, not the banner",
    heroSub:
      "Loop TV is ad-supported entertainment for businesses: a free Loop Player, 150+ music video and branded channels, and your specials as banners around it. PiAds is signage first — your menus and promos are the show — with local advertisers you approve filling the gaps, and 70% of every booking to you.",
    attack:
      "Loop TV solves a real problem — something watchable on the bar TV without a cable bill — and it does it well. But it's an entertainment channel that lets you decorate the edges, not signage. Your specials run as banners around Loop's programming, the ads come from Loop's managed network, and the venue reward is modest: Loop's program paid about $20 a month for running the player 240 hours. PiAds inverts it. Your content fills the screen; ad slots open only where you allow them; the advertisers are local businesses that booked your screen and waited for your approval; and the split is 70% of each cleared booking. If the TV is there to sell your stuff and pay you for the gaps, that's the model.",
    concede:
      "Being fair: if what you actually want is licensed music videos and branded entertainment playing all day with zero effort, Loop TV is built for exactly that, the player is free, and PiAds doesn't offer an entertainment library. Plenty of bars want a channel, not a menu board.",
    theirWeaknesses: [
      "Entertainment-first: your promos are banners around Loop's channels, not the program",
      "Ads come from Loop's managed network — you don't choose or approve the advertisers",
      "Venue earnings are a small fixed reward (about $20/month for 240 player-hours in Loop's program), not a share of what your screen sells for",
      "Requires the Loop Player box rather than the stick already behind your TV",
    ],
    ourWeaknesses: [
      "PiAds has no licensed music-video or entertainment channels — you supply the content",
      "No programmatic or network ad fill: if no local business books, the screen earns nothing that month",
      "The PiAds marketplace is strongest in the US metros where we have advertisers today",
    ],
    compareRows: [
      { label: "What's on screen", them: "Loop's music video / branded channels; your promos as banners", piads: "Your playlists and schedules; ads only in slots you open" },
      { label: "Who advertises", them: "Loop's managed ad network", piads: "Local businesses near your venue" },
      { label: "Your control", them: "Choose channels; upload banners", piads: "Approve or decline every campaign; set dayparts and prices" },
      { label: "What you earn", them: "Rewards program — about $20/mo for 240 player-hours", piads: "70% of every cleared booking" },
      { label: "Software cost", them: "$0 with the free Loop Player", piads: "$0 for partner screens; $10/mo if ad-free" },
      { label: "Hardware", them: "Loop Player box", piads: "Fire TV Stick, Android TV, Raspberry Pi, or browser you own" },
    ],
    costRows: [
      { screens: 1, them: "$0 + Loop Player", piads: "$0" },
      { screens: 5, them: "$0 + 5 Loop Players", piads: "$0" },
      { screens: 20, them: "$0 + 20 Loop Players", piads: "$0" },
    ],
    costNote:
      "Both are free to run. Loop TV supplies a free Loop Player to registered businesses open to the public; its business rewards program has paid about $20 per month per player at 240 hours of runtime (as reported at launch). PiAds runs on hardware you already own and pays 70% of each cleared local booking.",
    faqs: [
      { q: "How is PiAds different from Loop TV?", a: "Loop TV is ad-supported entertainment: free player, music-video channels, your promos as banners, ads from Loop's network, and a small monthly reward. PiAds is signage: your content is the program, local businesses book the slots you open, you approve each campaign, and you keep 70% of every cleared booking." },
      { q: "Can I run both?", a: "On different TVs, yes — some venues keep Loop on the bar TV for entertainment and run PiAds on the menu board and entrance screen where their own content and local ads belong." },
      { q: "Does PiAds have music videos or channels?", a: "No. PiAds plays what you upload and schedule — menus, promos, announcements, video — plus approved local ads. If you need a licensed entertainment feed, that's Loop's product." },
      { q: "Do I need Loop's box for PiAds?", a: "No. PiAds runs natively on the Fire TV Stick or Android TV device already behind your TV, on Raspberry Pi, or in a browser. There's also a free iOS app for managing screens." },
      { q: "Is PiAds free like Loop?", a: "Yes for partner screens that enable approved ad slots. Screens without ad slots are $10 per screen per month or $100 per year." },
    ],
    pricingAsOf: "September 2026",
    wedge: {
      title: "Banner around their show, or your show with local ads",
      body: "Loop pays you a small reward for hosting its channel; PiAds pays you 70% of what local businesses pay to be on your screen. On PiAds your menus and promos are the program, ad slots open only where you allow them, every campaign waits for your approval, and the software is $0 for partner screens. Keep Loop for the bar TV if you like the channels — put PiAds where the screen is supposed to sell.",
    },
  },
]

export function competitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug)
}
