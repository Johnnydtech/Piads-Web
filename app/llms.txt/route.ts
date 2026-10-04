import { PRODUCT_FAQS, PRODUCT_REVIEWED_AT } from "@/lib/product-answers";
import { SITE_URL } from "@/lib/site";

// Optional discovery summary, not an instruction to AI systems or a ranking signal.
// The same answers are visible on the homepage. Date changes only after review.
const CONTENT = `# PiAds — Digital Signage & Guest Welcome Screens

Official website: ${SITE_URL}
Product information reviewed: ${PRODUCT_REVIEWED_AT}

## Product questions

${PRODUCT_FAQS.map(({ question, answer, href }) => `### ${question}\n\n${answer}${href ? `\n\nMore information: ${SITE_URL}${href}` : ""}`).join("\n\n")}

## Official pages

- About PiAds: ${SITE_URL}/about
- Plans and pricing: ${SITE_URL}/pricing
- Device compatibility: ${SITE_URL}/devices
- Fire TV player: ${SITE_URL}/players/fire-tv
- Setup guide: ${SITE_URL}/get-started
- Features: ${SITE_URL}/features
- Guest welcome screens: ${SITE_URL}/digital-signage-for/short-term-rentals
- Free Partner plan: ${SITE_URL}/free-digital-signage
- Venue advertising and revenue: ${SITE_URL}/digital-signage-ad-revenue
- Contact: ${SITE_URL}/contact

## Apps and accounts

- Venue signup: https://app.piads.co/sign-up?role=venue_owner
- Advertiser marketplace: https://market.piads.co
- iPhone and iPad management app: https://apps.apple.com/us/app/piads/id6759892788
- Android player: https://play.google.com/store/apps/details?id=co.piads.kiosk
- Fire TV player: https://www.amazon.com/dp/B0GTRC4JTN

App-store listings provide current compatibility. Hardware and internet service
are separate from PiAds software pricing. Advertising inventory, rates, and
availability vary by venue; recorded plays are not a count of individual viewers.
`;

export async function GET() {
  return new Response(CONTENT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
