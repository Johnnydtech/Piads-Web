# PiAds hospitality landing page

The homepage is redesigned around short-term rental hosts and property managers.
All other marketing pages and server APIs are preserved in the normal build.

## Development

Use the existing npm dependencies and `npm run dev`. To run beside another PiAds
checkout, use `npm run dev -- --port 3017`.

## Production integration

`npm run build` builds the complete original Next.js application with the new
homepage. The homepage uses the existing application sign-up URL. No production
repository or piads.co deployment is changed by this review checkout.

## Private review build

`npm run build:preview` builds a static, homepage-only review version in `out/`.
The `preview.tsx` entry points reuse the production homepage, root layout, fonts,
metadata, and consent component. Links to other pages point to the existing live
PiAds site. This build deliberately exposes no API endpoints or newsletter form.
The normal build ignores these preview entry points.

The local `.openai/hosting.json` identifies the private Sites review destination.
Do not use the static review build to replace the full piads.co application.

## Content and assets

- Welcome screen tabs and editable names are illustrative, local page state.
  They do not publish to real property screens or collect guest data.
- QR codes resolve to the real PiAds short-term rental information page and are
  labeled accordingly. They do not pretend to join a real Wi-Fi network.
- Product facts and pricing are based on the supplied project and live PiAds
  pages. Revenue is contingent on approved campaigns and advertiser demand.
- The coastal hero is original AI-generated imagery, optimized to WebP.
- Existing social preview imagery and all non-home marketing routes are retained.
- Keyboard tab navigation, mobile navigation, FAQ disclosure, visible focus
  styles, reduced-motion behavior, and responsive layouts are included.
