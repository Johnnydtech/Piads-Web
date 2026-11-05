# Airbnb listing import (local verification, 2026-11-05)

The existing public `POST /api/v1/guests/generate` accepts either an address or a full HTTPS Airbnb `/rooms/<id>` URL. Listing requests additionally require `listing_authorized: true`. Turnstile and the existing visitor limits run before the import. Address generation is unchanged.

## Configuration

API: `GUEST_LISTING_IMPORT_ENABLED=true`, `GUEST_LISTING_APIFY_TOKEN` (dedicated server secret, with `APIFY_API_TOKEN` as a fallback), `GUEST_LISTING_IMPORT_DAILY_CAP` (default 100). Existing `GOOGLE_PLACES_API_KEY` is also required. Without the flag/token the listing importer stays disabled. The provided credential is in a local Gitignored `.env.apify-dev`, mode 0600; do not commit or copy it to frontend configuration.

Marketing frontend: `NEXT_PUBLIC_GUEST_LISTING_IMPORT_ENABLED=true` at build time. This is only a feature flag, never an API credential. Enable the backend first. No database migration is required.

Actor: `tri_angle/airbnb-rooms-urls-scraper`. One canonical listing per run; 90-second run timeout, requested maximum charge $0.02. Creation is not automatically retried. Cached results last six hours, failures two minutes. Duplicate concurrent requests share a task; at most two different imports run per process. The local daily cap and cache are process-local, not a global billing guarantee; configure an Apify account spending limit before a public rollout.

## Returned data and boundaries

Public title, description, up to six allowlisted Airbnb CDN photos, available amenities, any returned structured house rules, and an explicitly approximate area. Provider credentials, host contact/profile data, and raw coordinates are excluded from the browser response. Nearby searches use the returned listing coordinates rather than a city-center geocode. Unsupported/short listing URLs, missing map coordinates, unavailable listings and provider errors return actionable messages without exposing provider responses.

Airbnb does not supply the exact arrival address, private Wi-Fi password or entry codes. Hosts may add these voluntarily. TV handoff requires a host-entered exact address; approximate listing locations are not silently used as addresses. Listing descriptions and amenities can be reviewed/edited in the optional property details. Hosts must confirm permission to use the photos and text. This checkbox is an attestation, not ownership verification.

The PDF applies the selected existing theme to property-story, amenity and gallery pages. Content is paginated without manufacturing facts or padding to a fixed page count. Private host details remain optional. This change adds listing information to the generator/PDF; it does not extend the CMS handoff schema to carry the complete listing gallery or amenity pages.

## Verification

- Live Apify call with the provided credential: Nantes listing imported successfully, six selected photos, 26 available amenities and full normalized description.
- Both supplied sample results inspected; descriptions include important stay-length restrictions that must remain visible.
- Marketing production build, TypeScript validation and existing PDF/page-selection checks pass.
- 35 importer/generator tests pass, including canonical URL validation, cache/single-flight, uncertain POST handling, redacted errors, consent/Turnstile gates, and listing-coordinate nearby searches.
- Local 390px mobile input/permission UI checked.
- All three PDF styles checked in the browser with no content overflow on the sample. Exported and visually inspected a 12-page PDF containing the real imported property information. Nearby suggestions were omitted from that rendering fixture.
- Full live Places + email-delivery flow was not run: this local API checkout has no Places credential. Existing Places integration was tested with mocks. No test email was sent.
- Temporary local review/save routes removed after verification. Production and cloud Dev configuration have not been changed; this work is uncommitted locally.

## Rollout

Deploy API and frontend to Dev with their respective flags and secrets, verify full generation + email delivery there, then separately promote reviewed changes. Never put the Apify token in a URL, public env variable, browser bundle, log, or source control.

## Production release — November 5, 2026

Approved for Production. The listing token is isolated from the existing shared Apify integration. Frontend wording explicitly distinguishes listing photos/details from the address-only nearby recommendations. Backend, delivery and import checks: 58 passed. PDF, handoff and frontend production build checks passed. Live deployment and smoke results are recorded in the release handoff.
