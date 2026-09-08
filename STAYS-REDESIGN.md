# PiAds complete marketing redesign

The homepage leads with short-term rentals, explicitly addressing individual
hosts and property managers. All use cases, comparison guides, blog posts,
product pages, device/setup guides, legal pages, and printable flyers remain in
the original Next.js application.

## Design and media

- The shared navigation and footer use the supplied PiAds wordmark.
- The new forest-green, lime, and editorial typography system applies throughout
  the marketing routes. Use-case and comparison indexes have dedicated layouts.
- The homepage and rental page include a portfolio section with example property
  selection. Guest names and status in this demo are illustrative local state.
- Coastal hero video was generated through fal.ai from the approved hero image.
  The MP4 is muted, looping, and optimized for streaming. A pause/play control is
  provided; reduced-motion and data-saving users receive the original image.
- Existing social-preview imagery and content data are preserved.
- No PMS integration, automated booking sync, revenue, or performance claims are
  introduced by the property-manager section.

## Development and production

Use `npm run dev`. An isolated local preview can use
`PIADS_BUILD_DIR=.next-development npm run dev -- --port 3017`.
`npm run build` builds the entire normal Next.js application and its original APIs.
No production piads.co deployment is changed by this review checkout.

## Private full-site review

`npm run build:preview` creates temporary page/layout aliases, exports all pages
from the original sources, removes the aliases, and stages the site in `dist/`.
All internal navigation stays within the review site.

The small ESM Worker in `hosting/review-worker.mjs` serves exported assets and
forwards existing contact/newsletter submissions only to their matching PiAds
production API. Viewer credentials are not forwarded. These features depend on
the existing production endpoint behavior; this redesign does not replace the
existing email provider integration. The Worker also preserves the legacy guide
redirects and serves the original machine-readable feeds through PiAds.

Run `node --test hosting/review-worker.test.mjs` for forwarding, validation,
upstream failure, static-asset delegation, and redirect checks. Outbound
submissions are mocked in these tests; no real emails or subscriptions are sent.
