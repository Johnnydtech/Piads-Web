// Content for /digital-signage-for/{industry} template pages.
// Adding an industry = adding an entry here; the template renders the rest.
// Use-case blocks follow the feature-as-noun pattern (name the artifact the
// venue owner recognizes, not the underlying software feature).

export interface UseCase {
  name: string
  body: string
  screenshot: string // /use-cases/<slug>/<name>.jpg — fal-generated venue photo
  alt: string
}

export interface Faq {
  q: string
  a: string
}

export interface Industry {
  slug: string
  name: string // "Cafes & Coffee Shops"
  shortName: string // "cafes"
  persona: string // "baristas and owners"
  metaTitle: string
  metaDescription: string
  h1: string
  subhead: string
  teaser: string // index card copy
  heroImage: string // /use-cases/<slug>/wide.jpg — wide venue photo used in the hero and index card
  heroAlt: string
  useCases: UseCase[]
  /** Ordered setup steps, rendered as a numbered "How it works" band. Optional:
   *  only industries with a documented end-to-end flow define it. */
  setupSteps?: { title: string; body: string }[]
  earnAngle: string // the screens-that-earn paragraph, industry-specific
  faqs: Faq[]
  relatedPosts: { title: string; slug: string }[]
}

// fal-generated venue photography (see ~/Desktop/Piads-videos/src/site-images.ts).
// One image per hero and per use-case block; never reused within a page; no dashboard screenshots.
const img = (slug: string, name: string) => `/use-cases/${slug}/${name}.jpg`

export const INDUSTRIES: Industry[] = [
  {
    slug: "cafes-coffee-shops",
    name: "Cafes & Coffee Shops",
    shortName: "cafes",
    persona: "baristas and owners",
    metaTitle: "Digital Signage for Cafes & Coffee Shops",
    metaDescription:
      "Turn the TV behind your counter into a menu board that updates in seconds — and earns from local advertisers. PiAds is free for cafes that enable approved ad slots.",
    h1: "Digital signage for cafes and coffee shops",
    subhead:
      "Your menu, your specials, your Instagram — on the TV behind the counter. Updated from your phone in seconds, and earning from local advertisers between your own promos.",
    teaser:
      "Menu boards that update in seconds, daily specials without the whiteboard, and a screen that earns while it pours.",
    heroImage: img("cafes-coffee-shops", "wide"),
    heroAlt: "Coffee shop counter with a PiAds menu board above the espresso machine",
    useCases: [
      {
        name: "Daily Specials Board",
        body: "Type today's special once and it's on screen before the espresso machine warms up. No more whiteboard handwriting at 6am — swap items, prices, and photos from your phone or laptop.",
        screenshot: img("cafes-coffee-shops", "detail"),
        alt: "Cafe owner updating the specials board from a phone behind the counter",
      },
      {
        name: "Time-Based Menu Switcher",
        body: "Breakfast menu until 11, lunch until 3, pastry-case push in the afternoon lull. Set the schedule once and the screen changes itself every day — you never touch it again.",
        screenshot: img("cafes-coffee-shops", "menu-switcher"),
        alt: "Cafe screen showing the lunch menu that switched over automatically at 11 AM",
      },
      {
        name: "Counter Promo Loop",
        body: "Loyalty program, seasonal drinks, retail beans, gift cards — build a playlist of the things you want ordered more, and let it rotate all day with per-item timing you control.",
        screenshot: img("cafes-coffee-shops", "promo-loop"),
        alt: "Cafe screen rotating a loyalty card, a seasonal latte, and gift cards",
      },
      {
        name: "Local Ad Slots",
        body: "The yoga studio next door and the bookshop across the street want to reach your regulars. Approve their ads, set when they run, and keep 70% of every booking — most cafes cover the subscription with a single ad.",
        screenshot: img("cafes-coffee-shops", "closeup"),
        alt: "Cafe screen with this week's specials and a local yoga studio ad card",
      },
      {
        name: "Every Screen, One Dashboard",
        body: "Front-window display, menu board, and the corner TV — see them all in one place with live online status, so you know the menu is actually up before the morning rush.",
        screenshot: img("cafes-coffee-shops", "every-screen"),
        alt: "Coffee shop with three screens showing different content: window, menu board, and seating area",
      },
    ],
    earnAngle:
      "A cafe screen has spare minutes between your own promos — and local businesses will pay for them. PiAds is the only signage platform with a built-in local advertising marketplace: you approve every ad, decide when they run, and keep 70% of the revenue. For most cafes, one ad booking a month turns the menu board from a cost into a profit line.",
    faqs: [
      { q: "Can I show a menu that changes by time of day?", a: "Yes — build one playlist per daypart (breakfast, lunch, afternoon) and schedule them on the weekly grid. The screen switches automatically at the times you set, every day." },
      { q: "What hardware do I need?", a: "A TV and either the Fire TV Stick you may already own (PiAds is a native Fire TV app), an Android device, a Raspberry Pi, or just a browser. No proprietary player to buy." },
      { q: "How do I update the menu when a price changes?", a: "Edit the image or item in your dashboard from any device — the screen updates within seconds. Most owners do it from their phone." },
      { q: "Can I design my menu in Canva?", a: "Yes. Design in Canva (or any tool), export the image, and drop it into your playlist. TVs are 1920×1080 — use a landscape template and it fills the screen edge to edge." },
      { q: "Do I have to run ads?", a: "No. Ads are entirely optional and every ad requires your approval. Many cafes start with their own content only and open ad slots later once they see how it works." },
      { q: "How much does it cost?", a: "$0 for participating screens that enable approved marketplace ad slots. Cafes keep 70% of cleared ad revenue." },
      { q: "What happens if the Wi-Fi drops?", a: "The player keeps playing from its cache and re-syncs when the connection returns. Your menu never goes dark during service." },
      { q: "Can I show my Instagram on the screen?", a: "You can add social content and image posts into any playlist alongside your menu — a great way to show off latte art and bring the feed into the room." },
    ],
    relatedPosts: [
      { title: "Digital Signage for Coffee Shops and Cafes", slug: "digital-signage-for-coffee-shops-and-cafes" },
      { title: "How Digital Menu Boards Increase Restaurant Sales", slug: "digital-menu-boards-increase-restaurant-sales" },
      { title: "Your Venue TV Is Wasting Your Money", slug: "your-venue-tv-is-wasting-your-money" },
    ],
  },
  {
    slug: "gyms-fitness-studios",
    name: "Gyms & Fitness Studios",
    shortName: "gyms",
    persona: "gym owners and coaches",
    metaTitle: "Digital Signage for Gyms & Fitness Studios",
    metaDescription:
      "Class schedules, workout of the day, and member promos on every screen — managed from one dashboard. PiAds is free for gyms that enable approved ad slots.",
    h1: "Digital signage for gyms and fitness studios",
    subhead:
      "Class times, the day's WOD, membership promos, and community shout-outs — on every TV in the building, managed from one dashboard, earning from local advertisers between sets.",
    teaser:
      "WOD boards, class timetables, and member promos across every screen — plus ad revenue from local businesses your members already shop at.",
    heroImage: img("gyms-fitness-studios", "hero"),
    heroAlt: "Gym lobby with a PiAds screen showing today's class schedule",
    useCases: [
      {
        name: "Workout-of-the-Day Board",
        body: "Post the WOD to every screen at once from your phone — before you even get to the gym. Members walk in, see the work, and start warming up instead of crowding the whiteboard.",
        screenshot: img("gyms-fitness-studios", "detail"),
        alt: "Coach posting the workout of the day to the gym screen from a phone",
      },
      {
        name: "Class Timetable Display",
        body: "Today's classes, times, and coaches on the lobby screen, updating automatically from your weekly schedule. Cancel or move a class and the screen reflects it in seconds.",
        screenshot: img("gyms-fitness-studios", "closeup"),
        alt: "Close-up of a gym screen with today's classes and a bring-a-friend promo",
      },
      {
        name: "Membership Promo Rotator",
        body: "New-member offers, PT packages, retail supplements, referral bonuses — a rotating loop of the things that grow revenue, running between your schedules without a designer on staff.",
        screenshot: img("gyms-fitness-studios", "promo"),
        alt: "Gym lobby screen with a new-member offer and personal training package",
      },
      {
        name: "Multi-Zone Screen Manager",
        body: "Lobby, main floor, studio room — each screen gets its own content. The lobby sells, the floor motivates, the studio shows the class plan. All from one dashboard, with live status for each.",
        screenshot: img("gyms-fitness-studios", "multi-zone"),
        alt: "Gym with a lobby screen and a training-floor screen showing different content",
      },
      {
        name: "Local Sponsor Slots",
        body: "The smoothie bar, the physio clinic, the running store — businesses your members already use will pay to be on your screens. You approve everything and keep 70% of each booking.",
        screenshot: img("gyms-fitness-studios", "sponsor"),
        alt: "Gym screen running an approved local physio sponsor slot",
      },
    ],
    earnAngle:
      "Gym screens have captive, repeat attention — exactly what local advertisers want. With PiAds' built-in marketplace, the physio next door or the meal-prep service down the street books slots on your screens, you approve what runs, and 70% of the money is yours. Many gyms cover all their screens with one or two sponsors.",
    faqs: [
      { q: "Can each room show different content?", a: "Yes — every screen is managed individually. Give the lobby a promo loop, the main floor the WOD, and the studio its class plan, all scheduled independently." },
      { q: "How do I update the WOD every day?", a: "Upload it from your phone or laptop — a photo, a designed image, or a slide. It's on every screen you choose within seconds." },
      { q: "What hardware works?", a: "Any TV with a Fire TV Stick (native PiAds app), Android device, Raspberry Pi, or a browser. Most gyms use the sticks already plugged into their TVs." },
      { q: "Can I schedule class-time content automatically?", a: "Yes. The weekly schedule grid runs different playlists at different times — morning classes, open-gym hours, evening promos — hands-free after you set it." },
      { q: "Do members' distractions worry you — can I keep it minimal?", a: "You control every second of the loop and every screen. Many owners run a single clean board on the floor and save promos for the lobby." },
      { q: "How does ad revenue work?", a: "Local businesses request slots through PiAds, you approve or decline each one, and you keep 70% of the booking. Ads only run where and when you allow them." },
      { q: "What does it cost?", a: "$0 for participating screens that enable approved marketplace ad slots. Gyms keep 70% of cleared ad revenue." },
      { q: "What if the internet cuts out mid-class?", a: "Screens keep playing cached content and re-sync automatically. The WOD stays up." },
    ],
    relatedPosts: [
      { title: "Digital Signage for Gyms and Fitness Studios", slug: "digital-signage-for-gyms-and-fitness-studios" },
      { title: "Earn Money From Your Venue Screens", slug: "earn-money-from-your-venue-screens" },
      { title: "Digital Signage Content Ideas", slug: "digital-signage-content-ideas" },
    ],
  },
  {
    slug: "salons-barbershops",
    name: "Salons & Barbershops",
    shortName: "salons",
    persona: "stylists and shop owners",
    metaTitle: "Digital Signage for Salons & Barbershops",
    metaDescription:
      "Service menus, before-and-afters, and retail promos on your waiting-area TV — plus local ad revenue. PiAds is free for salons that enable approved ad slots.",
    h1: "Digital signage for salons and barbershops",
    subhead:
      "Your service menu, your best work, and your retail shelf — on the screen every waiting client is already looking at. Updated in seconds, earning between appointments.",
    teaser:
      "Service menus, before-and-after showcases, and retail promos on the waiting-area TV — the screen your clients already stare at.",
    heroImage: img("salons-barbershops", "wide"),
    heroAlt: "Hair salon with a PiAds screen near the reception desk",
    useCases: [
      {
        name: "Service Menu Board",
        body: "Cuts, color, treatments, prices — a clean menu on screen instead of a laminated sheet. Change a price or add a seasonal service from your phone between clients.",
        screenshot: img("salons-barbershops", "closeup"),
        alt: "Close-up of a salon screen with the service menu and prices",
      },
      {
        name: "Before & After Showcase",
        body: "Your best fades, balayage, and transformations rotating on the waiting-area screen. Clients book bigger services when they can see the work — no printed portfolio needed.",
        screenshot: img("salons-barbershops", "detail"),
        alt: "Stylist and client looking at a before-and-after on the salon screen",
      },
      {
        name: "Retail Shelf Promoter",
        body: "The products on your shelf sell better when the screen explains them. Rotate product spotlights and bundle offers during waiting time — the highest-margin minutes in your day.",
        screenshot: img("salons-barbershops", "retail-shelf"),
        alt: "Salon screen above the retail shelf promoting a product and bundle",
      },
      {
        name: "Slow-Day Scheduler",
        body: "Tuesday-special pricing on Tuesdays, bridal packages before wedding season, gift cards in December. Schedule promos by day and time once — the screen runs the calendar for you.",
        screenshot: img("salons-barbershops", "slow-day"),
        alt: "Salon waiting-area screen showing a Tuesday color special",
      },
      {
        name: "Neighbor Ad Slots",
        body: "The nail studio, the boutique, the juice bar nearby — they want your chair time's attention. Approve their ads, and keep 70% of every booking. Waiting-room screens are prime local inventory.",
        screenshot: img("salons-barbershops", "neighbor-ad"),
        alt: "Salon screen running an approved ad for the nail studio next door",
      },
    ],
    earnAngle:
      "A salon waiting area is one of the few places people sit and look at a screen with time to spare. PiAds turns that attention into income: local businesses book ad slots through the marketplace, you approve each one, and 70% of the revenue is yours. One booking usually covers the screen's cost for the month.",
    faqs: [
      { q: "Can I update prices without reprinting anything?", a: "Yes — edit your menu image or item in the dashboard and the screen updates in seconds. No more laminate, no more stickers over old prices." },
      { q: "What do I need to get started?", a: "The TV in your waiting area plus a Fire TV Stick, Android device, Raspberry Pi, or a browser. If there's already a stick in the TV, you're minutes away." },
      { q: "Can I show my Instagram work?", a: "Yes — add your posts and photos into playlists alongside the menu. Before-and-after content is the strongest booking driver salons see." },
      { q: "Do ads make my shop look cluttered?", a: "You approve every single ad and control how often they appear. Most salons run 80% their own content with a couple of tasteful local spots mixed in." },
      { q: "Can I schedule seasonal promotions ahead of time?", a: "Yes — build the promo now and schedule it for the season. Holiday gift-card pushes and wedding-season packages can be set up months early." },
      { q: "How much does it cost?", a: "$0 for participating screens that enable approved marketplace ad slots. Shops keep 70% of cleared ad revenue." },
      { q: "Who updates it day to day?", a: "Anyone you invite — it's as simple as posting a photo. Most owners update from their phone between clients." },
      { q: "Does it work with the TV I already have?", a: "Any TV with an HDMI port works. The screen doesn't need to be 'smart' — the stick or player does the work." },
    ],
    relatedPosts: [
      { title: "Digital Signage for Salons and Barbershops", slug: "digital-signage-for-salons-and-barbershops" },
      { title: "Digital Signage for Pet Stores and Grooming Salons", slug: "digital-signage-for-pet-stores-and-grooming-salons" },
      { title: "Earn Money From Your Venue Screens", slug: "earn-money-from-your-venue-screens" },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants & Menus",
    shortName: "restaurants",
    persona: "restaurant owners and managers",
    metaTitle: "Digital Menu Boards for Restaurants",
    metaDescription:
      "Digital menu boards that switch by daypart, promote your highest-margin dishes, and earn from local advertisers. PiAds is free for restaurants that enable approved ad slots.",
    h1: "Digital menu boards for restaurants",
    subhead:
      "Menus that switch from brunch to dinner on their own, specials you update from the pass, and screens that earn from local advertisers when you're closed.",
    teaser:
      "Menu boards that change by daypart, 86'd items gone in seconds, and high-margin dishes front and center.",
    heroImage: img("restaurants", "wide"),
    heroAlt: "Neighborhood restaurant with digital menu boards over the counter",
    useCases: [
      {
        name: "Daypart Menu Switcher",
        body: "Brunch until 2, happy hour at 4, dinner at 5:30. Build each menu once, schedule it on the weekly grid, and the boards change themselves — every day, on the dot.",
        screenshot: img("restaurants", "daypart"),
        alt: "Restaurant menu board showing the brunch menu until 2 PM",
      },
      {
        name: "86 Board",
        body: "Sold out of the special? Pull it from the screen in seconds from the phone in your apron pocket — before the next table orders it and gets disappointed.",
        screenshot: img("restaurants", "detail"),
        alt: "Line cook pulling a sold-out item from the menu board with a phone",
      },
      {
        name: "High-Margin Spotlight",
        body: "The dishes you want ordered more get the biggest, brightest slots. Rotate appetizers, cocktails, and desserts with per-item timing — a quiet upsell running all service.",
        screenshot: img("restaurants", "spotlight"),
        alt: "Bar screen spotlighting tonight's cocktail and dessert",
      },
      {
        name: "Multi-Screen Line-Up",
        body: "Menu boards over the counter, specials by the door, the bar screen running cocktails. Each screen has its own content and schedule, all managed from one dashboard with live status.",
        screenshot: img("restaurants", "lineup"),
        alt: "Restaurant with two menu boards over the counter and a bar screen",
      },
      {
        name: "Off-Hours Ad Revenue",
        body: "Your screens face the street even when the kitchen's closed. Local businesses book those hours through the PiAds marketplace — you approve every ad and keep 70%.",
        screenshot: img("restaurants", "closeup"),
        alt: "Menu board with tonight's specials and a local brewery ad card",
      },
    ],
    earnAngle:
      "Restaurant screens work long hours — including hours when you're not selling. PiAds' built-in local ad marketplace fills the gaps you choose with paid spots from neighborhood businesses. You approve everything, schedule when ads may run, and keep 70% of each booking. The menu board becomes a second till.",
    faqs: [
      { q: "Can menus change automatically between breakfast, lunch, and dinner?", a: "Yes — that's the core of it. One playlist per daypart, scheduled on the weekly grid; the boards switch on your clock, every day, without anyone touching them." },
      { q: "How fast can I remove a sold-out item?", a: "Seconds. Edit from any phone or laptop and every board you choose updates immediately." },
      { q: "What hardware do menu boards need?", a: "Any TV plus a Fire TV Stick (PiAds runs natively), Android device, or Raspberry Pi. For a multi-screen menu wall, Pi players give you 24/7 reliability." },
      { q: "Can I design menus in Canva?", a: "Yes — design at 1920×1080, export, and drop into the playlist. Update the design any time and the boards refresh in seconds." },
      { q: "Will ads show during dinner service?", a: "Only if you allow it. You control ad windows completely — many restaurants run ads only during off-hours or on the street-facing screen." },
      { q: "What does it cost per board?", a: "$0 for participating screens that enable approved marketplace ad slots. Restaurants keep 70% of cleared ad revenue." },
      { q: "What if the internet goes down during service?", a: "Boards keep playing cached menus and re-sync when the connection returns. Service never sees it." },
      { q: "Can my manager update it without me?", a: "Yes — invite your team, and anyone you trust can update specials and menus from their own login." },
    ],
    relatedPosts: [
      { title: "How Digital Menu Boards Increase Restaurant Sales", slug: "digital-menu-boards-increase-restaurant-sales" },
      { title: "Digital Signage for Breweries and Taprooms", slug: "digital-signage-for-breweries-and-taprooms" },
      { title: "Digital Signage vs Paper Signs", slug: "digital-signage-vs-paper-signs" },
    ],
  },
  {
    slug: "retail-stores",
    name: "Retail Stores",
    shortName: "retail",
    persona: "store owners and managers",
    metaTitle: "Digital Signage for Retail Stores",
    metaDescription:
      "Window displays, in-store promos, and sale countdowns on screens you already own — plus local ad revenue. PiAds is free for retailers that enable approved ad slots.",
    h1: "Digital signage for retail stores",
    subhead:
      "Window screens that stop foot traffic, in-store promos that move inventory, and sale changeovers done from the back office — no ladder, no vinyl, no reprints.",
    teaser:
      "Window displays that stop foot traffic and promo screens that move inventory — updated from the back office in seconds.",
    heroImage: img("retail-stores", "wide"),
    heroAlt: "Boutique storefront with a PiAds window display facing the street",
    useCases: [
      {
        name: "Window Traffic-Stopper",
        body: "A bright, moving window display outperforms any poster. Run new arrivals, offers, and brand video facing the street — and change the whole window from your desk in seconds.",
        screenshot: img("retail-stores", "closeup"),
        alt: "Close-up of a window screen showing a weekend sale and new arrivals",
      },
      {
        name: "Sale Changeover Button",
        body: "When the sale starts, every screen in the store switches at once — schedule it in advance and the Friday 9am changeover happens without a single ladder or printed sign.",
        screenshot: img("retail-stores", "changeover"),
        alt: "Two store screens switching to the sale at once on Friday morning",
      },
      {
        name: "New-Arrivals Loop",
        body: "This week's products, styled and rotating near the entrance. Keep the loop fresh with per-item timing, and retire items as they sell through — all from one media library.",
        screenshot: img("retail-stores", "new-arrivals"),
        alt: "Store screen showing this week's new arrivals with prices",
      },
      {
        name: "Aisle-End Promoter",
        body: "Every screen can carry its own message: clearance at the back, premium up front, seasonal by the door. One dashboard shows them all with live online status.",
        screenshot: img("retail-stores", "detail"),
        alt: "Store manager scheduling content from the back office",
      },
      {
        name: "Local Ad Partnerships",
        body: "Complementary local businesses — the tailor, the cafe next door, the framer — will pay to be on your screens. Approve what fits your brand and keep 70% of every booking.",
        screenshot: img("retail-stores", "partner-ad"),
        alt: "Store screen running an approved ad for the tailor next door",
      },
    ],
    earnAngle:
      "Retail screens see real foot traffic, and PiAds is built to monetize it: the local ad marketplace lets nearby businesses book time on your screens, with every ad subject to your approval and 70% of revenue staying with you. A single window screen facing a busy sidewalk is genuinely valuable inventory.",
    faqs: [
      { q: "Can I run a screen facing the street window?", a: "Yes — a standard TV behind the glass with brightness turned up works well for most storefronts. Schedule street-facing content separately from in-store screens." },
      { q: "How do sale changeovers work?", a: "Build the sale content ahead of time and schedule it. At the start time, every screen you selected switches together — and switches back when the sale ends." },
      { q: "What hardware do I need?", a: "TVs you own plus a Fire TV Stick, Android device, Raspberry Pi, or browser per screen. No proprietary players." },
      { q: "Can head office manage multiple locations?", a: "Yes — all screens across locations live in one dashboard, each with live status, and you can update any of them from anywhere." },
      { q: "Do I need a designer?", a: "No — most stores use Canva templates or supplier-provided assets. Upload an image and it's on screen." },
      { q: "What does it cost?", a: "$0 for participating screens that enable approved marketplace ad slots. Retailers keep 70% of cleared ad revenue." },
      { q: "Can I control exactly which ads appear?", a: "Every ad requires your approval before it runs, and you choose which screens and hours are open to ads at all." },
      { q: "What happens if a screen loses connection?", a: "It keeps playing cached content and reconnects automatically — and the dashboard shows you the moment any screen goes offline." },
    ],
    relatedPosts: [
      { title: "Your Venue TV Is Wasting Your Money", slug: "your-venue-tv-is-wasting-your-money" },
      { title: "Digital Signage vs Paper Signs", slug: "digital-signage-vs-paper-signs" },
      { title: "Digital Signage Content Ideas", slug: "digital-signage-content-ideas" },
    ],
  },
  {
    slug: "medical-dental-offices",
    name: "Medical & Dental Offices",
    shortName: "medical offices",
    persona: "practice managers",
    metaTitle: "Digital Signage for Medical & Dental Waiting Rooms",
    metaDescription:
      "Calmer waiting rooms: service education, appointment reminders, and practice news on your waiting-room TV. PiAds is free for participating practices that enable approved ad slots.",
    h1: "Digital signage for medical and dental waiting rooms",
    subhead:
      "Replace daytime TV with content that works for your practice: treatment education, insurance reminders, seasonal health pushes — and a calmer room while patients wait.",
    teaser:
      "Waiting-room screens that educate patients, promote treatments, and calm the room — instead of cable news.",
    heroImage: img("medical-dental-offices", "wide"),
    heroAlt: "Dental office waiting room with a calm PiAds screen on the wall",
    useCases: [
      {
        name: "Treatment Education Loop",
        body: "Whitening, aligners, preventive care, new services — patients decide on treatments while they wait. A rotating education loop answers questions before they reach the front desk.",
        screenshot: img("medical-dental-offices", "education"),
        alt: "Waiting-room screen explaining clear aligners",
      },
      {
        name: "Practice News Board",
        body: "New providers, changed hours, flu-shot season, insurance updates — the announcements your front desk repeats all day, on screen where every patient sees them.",
        screenshot: img("medical-dental-offices", "detail"),
        alt: "Front-desk staff updating the practice news board",
      },
      {
        name: "Seasonal Health Scheduler",
        body: "Allergy season content in spring, back-to-school checkups in August, benefits-deadline reminders in December. Schedule the year once; the screen follows the calendar.",
        screenshot: img("medical-dental-offices", "seasonal"),
        alt: "Waiting-room screen with a flu-season reminder",
      },
      {
        name: "Multi-Room Manager",
        body: "Waiting room, hygiene bays, checkout — each screen carries what fits the moment, from calming content to checkout-time promotions, all in one dashboard.",
        screenshot: img("medical-dental-offices", "multi-room"),
        alt: "Dental practice with a waiting-room screen and a hygiene-bay screen",
      },
      {
        name: "Trusted Local Partners",
        body: "The pharmacy, the optician, the physical therapist nearby — practices you'd refer to anyway can book screen time you approve. You keep 70% of each booking.",
        screenshot: img("medical-dental-offices", "closeup"),
        alt: "Waiting-room screen with a now-seeing notice and a trusted local pharmacy card",
      },
    ],
    earnAngle:
      "Waiting rooms hold attention longer than almost any other venue — 15 quiet minutes on average. PiAds lets you use that time for the practice first (education, reminders, services), and optionally open approved slots to trusted local health businesses, keeping 70% of the revenue. Every ad is your call; nothing runs without approval.",
    faqs: [
      { q: "Is this appropriate for a healthcare setting?", a: "You control 100% of what appears. Most practices run their own education and announcements, with ads either off entirely or limited to approved local health partners." },
      { q: "Can we replace cable TV entirely?", a: "Yes — most practices do. A curated loop of practice content and calming visuals reads as more professional than daytime TV, and there's no awkward news channel in the room." },
      { q: "How hard is it for the front desk to update?", a: "As easy as posting a photo. Anyone you invite can update announcements from their computer — no IT ticket needed." },
      { q: "What hardware do we need?", a: "The waiting-room TV you have plus a Fire TV Stick, Android device, Raspberry Pi, or browser. Installation is plugging in a stick." },
      { q: "Can different rooms show different content?", a: "Yes — every screen is independent. Waiting room, hygiene bays, and checkout can each run their own loop and schedule." },
      { q: "What does it cost?", a: "$0 for participating screens that enable approved marketplace ad slots. Practices keep 70% of cleared ad revenue." },
      { q: "Does patient privacy come into play?", a: "The screens only play content you publish — nothing patient-specific. It's one-way signage, not a patient-data system." },
      { q: "Can we schedule content by season?", a: "Yes — build seasonal campaigns in advance and schedule them for the right months. The screen follows your calendar automatically." },
    ],
    relatedPosts: [
      { title: "Digital Signage for Dental and Medical Offices", slug: "digital-signage-for-dental-and-medical-offices" },
      { title: "Digital Signage Content Ideas", slug: "digital-signage-content-ideas" },
      { title: "Digital Signage vs Paper Signs", slug: "digital-signage-vs-paper-signs" },
    ],
  },
  {
    slug: "short-term-rentals",
    name: "Short-Term Rentals & Airbnbs",
    shortName: "short-term rentals",
    persona: "hosts and property managers",
    metaTitle: "Digital Signage for Airbnbs & Short-Term Rentals",
    metaDescription:
      "Turn the living-room TV into a guest welcome screen: Wi-Fi QR code, house rules, checkout time, and local recommendations — updated per booking, earning from nearby businesses. Free for hosts that enable approved ad slots.",
    h1: "Digital signage for Airbnbs and short-term rentals",
    subhead:
      "The TV your guests turn on first becomes the welcome screen: their names, the Wi-Fi QR code, house rules, checkout time, and the best spots nearby — updated for every booking from your phone, and earning from local restaurants and tours between stays.",
    teaser:
      "A welcome screen on the living-room TV: Wi-Fi QR code, house rules, and local picks for every guest — plus revenue from the businesses you already recommend.",
    heroImage: img("short-term-rentals", "hero"),
    heroAlt: "Guests arriving at a short-term rental greeted by a welcome screen on the living-room TV",
    useCases: [
      {
        name: "Guest Welcome Screen",
        body: "Guests walk in, the TV says hello by name, and the Wi-Fi QR code is right there — no laminated card, no 'what's the password' text at 11pm. Update the names from your phone before each check-in, or reuse a standing template.",
        screenshot: img("short-term-rentals", "closeup"),
        alt: "Rental welcome screen with the guests' names, a Wi-Fi QR code, and local recommendations",
      },
      {
        name: "Wi-Fi & House Rules Card",
        body: "Scan-to-join Wi-Fi, quiet hours, trash day, checkout time, and how the thermostat works — the questions that generate 80% of your messages, answered on the screen before anyone asks.",
        screenshot: img("short-term-rentals", "house-rules"),
        alt: "Rental screen with house notes: Wi-Fi QR code, quiet hours, trash day, and checkout",
      },
      {
        name: "Local Picks Rotator",
        body: "Your favorite taco spot, the coffee place that opens early, the kayak rental down the road. A rotating loop of recommendations makes the stay better — and the five-star review more likely.",
        screenshot: img("short-term-rentals", "local-picks"),
        alt: "Rental screen rotating the host's favorite nearby spots",
      },
      {
        name: "Turnover Refresh",
        body: "New guest name, new dates, new checkout time — edit the welcome screen on the Guests page and it changes on the TV as soon as you save. A turnover takes about as long as reading the booking.",
        screenshot: img("short-term-rentals", "detail"),
        alt: "Host updating the welcome screen from a phone on turnover day",
      },
      {
        name: "Recommended-Business Slots",
        body: "The restaurants and tours you already recommend will pay to be on your screen. Approve each one, decide when they show, and keep 70% of every booking — across every property you manage.",
        screenshot: img("short-term-rentals", "sponsor"),
        alt: "Rental screen running an approved local kayak tour offer for guests",
      },
    ],
    setupSteps: [
      {
        title: "Put PiAds on your TV",
        body: "Install the PiAds Player on a Fire TV Stick, an Android TV or Google TV, or open it in the TV's browser. The TV shows a short code — type it into the Guests page and the screen is yours.",
      },
      {
        title: "Set up the welcome screen",
        body: "Fill in the guest's name, your welcome message, the Wi-Fi details, checkout time, house notes, and local picks chosen from real Google listings. A live preview shows the TV as you type. Save and it's up.",
      },
      {
        title: "Collect guest emails",
        body: "The TV shows a QR code. Guests scan it, give a name and email, and then see the Wi-Fi and house guide. You get an email for each new guest and can export the whole list as CSV. PiAds never emails them — that's yours.",
      },
    ],
    earnAngle:
      "A rental TV is the most-trusted screen a guest sees all trip — they act on what it recommends. PiAds turns that into income: local restaurants, tours, and rentals book slots through the marketplace, you approve each one, and 70% of the revenue is yours. For managers with several units, one sponsor across all properties adds up fast.",
    faqs: [
      { q: "Can the welcome screen change for each guest?", a: "Yes — update names and dates from your phone before check-in, or run a standing welcome template that doesn't need touching. Many hosts do a 30-second edit on turnover day." },
      { q: "How do guests join the Wi-Fi?", a: "Put a Wi-Fi QR code on the welcome screen. Guests scan it with their phone camera and connect without typing a password. Generate the code once and it lives in your media library." },
      { q: "What hardware do I need?", a: "The TV already in the unit plus a Fire TV Stick (PiAds runs natively), an Android TV, a Raspberry Pi, or a browser. Most rentals already have a stick plugged in." },
      { q: "Can guests still watch Netflix?", a: "Yes. PiAds runs as an app on the stick — guests switch to it or back to their streaming apps like any other input. Many hosts set the welcome screen as the default on power-on." },
      { q: "I manage multiple properties — can I see them all?", a: "Every unit's screen lives in one dashboard with live online status. Update one property or push a change to all of them at once." },
      { q: "Will ads bother my guests?", a: "You approve every ad and choose when they appear. Most hosts run their own content 90% of the time with a couple of genuinely useful local partners mixed in — the same places they'd recommend anyway." },
      { q: "What does it cost?", a: "$0 for participating screens that enable approved marketplace ad slots. Hosts keep 70% of cleared ad revenue." },
      { q: "What if the unit's Wi-Fi drops?", a: "The player keeps showing cached content and re-syncs when the connection returns. The Wi-Fi card stays on screen — which is exactly when guests need it." },
    ],
    relatedPosts: [
      { title: "Digital Signage for Short-Term Rentals", slug: "digital-signage-for-short-term-rentals" },
      { title: "Earn Money From Your Venue Screens", slug: "earn-money-from-your-venue-screens" },
      { title: "Content Scheduling for Venue Screens", slug: "content-scheduling-for-venue-screens" },
    ],
  },
]

export function industryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}
