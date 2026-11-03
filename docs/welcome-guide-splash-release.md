# Welcome guide splash release

Release prepared November 3, 2026. Production migration applied and verified; API commit e0fe23c pushed to main. Marketing deploys from main after API health verification.

The generator entry page now asks for address, style and email, opens a completed guide, and starts email verification for PDF delivery. Editing is optional afterward. Main marketing navigation and extra landing-page sections are removed from this route only. Mobile pages can still scroll naturally; the form comes before the preview.

## Release order

1. Apply API migration `20261103170000_generator_email_only_delivery.sql` to the target environment. It permits null phone numbers on delivery sessions; free artwork still requires a phone in both the service and reservation RPC.
2. Deploy the API contact-schema and artwork-guard changes.
3. Deploy the marketing frontend using its normal environment configuration (never the local fixture build).
4. Verify production Turnstile, a real verified email delivery, and CRM synchronization with an authorized test contact. Check email-only sessions cannot request artwork and that existing phone-verified artwork still works.

## Validation completed locally

- 67 API tests passed across delivery, leads, transfer and generator suites.
- Migration applied to isolated local PostgreSQL; email-only file reservation succeeds, artwork requires a phone, duplicate artwork and anonymous RPC access remain blocked.
- Marketing build and welcome-kit/handoff scripts passed.
- Browser fixture: address/style/email submit, automatic verification prompt, invalid-code feedback, verified PDF delivery, refresh without duplicate send, optional editing and artwork phone gate.
- Four-page generated PDF visually inspected; desktop and 390px mobile layouts inspected.

Local browser delivery used a fixture, not real customer email or HubSpot writes. Wi-Fi, access codes, house rules and other private property details are not inferred from an address. Custom AI artwork remains optional; the one-submit result uses the selected existing template and local recommendations.
