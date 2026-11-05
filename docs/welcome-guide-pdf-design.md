# Welcome guide PDF design repair — November 3, 2026

## Problem and changes
The address/style/email flow did not supply a property photo. The Retreat Journal cover only rendered its designed photo layout when a photo existed, falling back to a monogram. Shared marketing h1 rules also overrode the fixed PDF typography at desktop and mobile widths.

- Default covers now use the existing original collection art for the selected style. Captions identify decorative art; uploaded photos/custom artwork take precedence.
- Shared marketing headline rules exclude book pages. PDF typography is independent of viewport size.
- Added an opening section, arrival map link/QR, a local directory, and one large-photo page for each selected place (up to 12). No-photo places use clearly labeled decorative art.
- Eight places produce 13 pages before optional Wi-Fi/house sections. Private host details remain omitted until supplied.
- Letter and A4 exports use high-quality JPEG raster pages at 2x resolution, retaining link annotations. The previous PNG test reached 37.6 MB; the equivalent photo guide is 4.62 MB, below the API's 20 MB limit.
- Sample preview counts are derived from the real page selection. API sample assets are regenerated from the same renderer (12 pages each).

## Verification
- `node scripts/test-welcome-book.cjs`
- `node --experimental-strip-types scripts/test-welcome-kit.mjs`
- `node --experimental-strip-types scripts/test-welcome-handoff.mjs`
- Production Next build passed (158 generated pages).
- API `tests/test_generator_delivery.py`: 23 passed; no email was sent.
- Browser: all three styles, no-upload flow, full host details, 12 places, long local names; no content overflow. Mobile heading font remained 46px at a 390px viewport.
- Exported all three sample PDFs and inspected every page. Decoded all five QR codes per sample from rendered PDF pages. Sizes: Journal 3.65 MB, Postcard 4.35 MB, Illustrated 5.33 MB.
- Temporary local review page and save route were removed before the production build.

## Release scope
Marketing repo changes plus only `assets/guest-book-samples/{forest,coast,clay}.pdf` in the API repo. No database, configuration, CMS, player, pairing or API logic changes. Deployment has not been performed for this change. Deploy the API sample assets and marketing frontend together. Existing private emailed PDF files are immutable; customers regenerate to receive the updated design.

## Design research
https://www.etsy.com/listing/1575245205/airbnb-welcome-book-canva-template-100 offers 100 mix-and-match templates, including multiple alternative covers and section layouts. The generated guide uses relevant populated sections rather than duplicate or unfilled templates.
