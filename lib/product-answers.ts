// Shared public facts: keep visible answers, structured data, and llms.txt aligned.
// Reviewed against CMS signup/setup and billing components on this date.
export const PRODUCT_REVIEWED_AT = "2026-10-04";

export const PRODUCT_SUMMARY =
  "PiAds is cloud digital signage software for guest welcome screens and business displays. Hosts, property managers, and local businesses use one dashboard to manage welcome messages, house guides, images, videos, playlists, and schedules. An optional marketplace lets advertisers book available venue screens.";

export const PLAN_ANSWER =
  "New accounts can start with a 14-day trial for up to two screens, with no ads required. After the trial, screens with qualifying marketplace ad slots can use the Partner plan for $0. Ad-free signage is $10 per screen per month or $100 per screen per year. Your dashboard shows each screen’s eligibility and billing.";

export const APPROVAL_ANSWER =
  "Advertising is optional. If you offer ad slots, you choose your prices, available times, and content guidelines. Review bookings yourself, or enable optional Instant Book to approve bookings automatically. Ads rotate with other content during booked time windows; they do not appear as pop-ups.";

export const REVENUE_ANSWER =
  "Venues keep 70% of cleared ad revenue and PiAds retains 30%. A cleared $100 booking means $70 for the venue and $30 for PiAds. Earnings depend on advertiser demand and campaign delivery; enabling ad slots does not guarantee bookings or income.";

export const SETUP_ANSWER =
  "Create your account, then enter your space name, type, and address. PiAds prepares your first screen and starter playlist. On the Screens page, customize your content, use Play preview to check it in the dashboard, and choose Connect to TV to pair the prepared screen using the code on your player.";

export const DEVICE_ANSWER =
  "PiAds has player options for compatible Fire TV, Android TV and Google TV devices, Raspberry Pi, and web browsers. The iPhone and iPad app manages your screens and content. Check the device guide and app-store compatibility before buying hardware; playback depends on the device and content.";

export const PRODUCT_FAQS = [
  {
    question: "What is PiAds?",
    answer: PRODUCT_SUMMARY,
    href: "/about",
    linkLabel: "Meet PiAds",
  },
  {
    question: "Can I use PiAds for my Airbnb or vacation rental?",
    answer:
      "Yes. Use guest welcome screens to share Wi-Fi details, house notes, checkout instructions, and local recommendations on a compatible TV. You manage the content in PiAds; having a guest welcome screen does not require an Airbnb account connection.",
    href: "/digital-signage-for/short-term-rentals",
    linkLabel: "Explore guest welcome screens",
  },
  {
    question: "Is PiAds free, and do I have to show ads?",
    answer: PLAN_ANSWER,
    href: "/pricing",
    linkLabel: "See plans and pricing",
  },
  {
    question: "How do I set up my first screen?",
    answer: SETUP_ANSWER,
    href: "/get-started",
    linkLabel: "Read the setup guide",
  },
  {
    question: "Will PiAds work with the TV I already have?",
    answer: DEVICE_ANSWER,
    href: "/devices",
    linkLabel: "Check supported devices",
  },
  {
    question: "Can guests still watch their usual shows?",
    answer:
      "Yes. On supported TV devices, guests can exit the PiAds player and use their usual streaming apps. Their streaming subscriptions and device controls still apply. PiAds content returns when the player is reopened.",
  },
  {
    question: "Can I manage several properties or venues?",
    answer:
      "Yes. Manage screens across your venues from one account. Give each property or business its own content and schedules, and check screen status from the dashboard. Screen charges and Partner eligibility apply per screen.",
  },
  {
    question: "Who decides which ads appear?",
    answer: APPROVAL_ANSWER,
    href: "/digital-signage-ad-revenue",
    linkLabel: "Understand ad controls",
  },
  {
    question: "How much can I earn from ads?",
    answer: REVENUE_ANSWER,
    href: "/pricing",
    linkLabel: "See the revenue split",
  },
  {
    question: "What happens if the internet drops?",
    answer:
      "Players with offline caching can continue showing content already downloaded. New content, live websites, and remote updates need an internet connection. Browser playback and individual devices have different limits; test your chosen setup before relying on it.",
  },
];
