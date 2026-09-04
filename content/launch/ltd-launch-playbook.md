# PiAds LTD Launch Playbook

The 10-step LTD strategy, adapted to PiAds. Key adaptation: **lifetime applies to the signage CMS only, with hard caps per tier; the ad-marketplace revenue share stays recurring forever** — LTD venues are not a cost sink, they're permanent ad inventory earning us 30% of every booking.

## Steps & status
1. **Done-before idea** — ✅ Digital signage is proven (Yodeck, OptiSigns, ScreenCloud); our angle is the local ad marketplace. OptiSigns and Fugo both ran successful AppSumo deals.
2. **Good-enough MVP** — ✅ Pairing, media, playlists, schedules, walkthrough videos, iOS app, trials.
3. **Private LTD + Facebook groups** — Offer page live at **piads.co/ltd** (unlisted, noindex). Tiers: $59 / 2 screens / 5GB · $149 / 5 screens / 15GB · $299 / 12 screens / 40GB. Stackable. 60-day refund.
   - To activate checkout: create three Stripe **payment links** (one-time price each) and set `NEXT_PUBLIC_LTD_TIER1_URL/TIER2/TIER3` in Vercel. Until then buttons fall back to support@ email.
   - Target groups: "SaaS Lifetime Deals", "Lifetime Deal Fans", "LTD Hunters", Martin's "SaaS Founders & LTDs". Offer admins 2–3 giveaway licenses to run a post.
4. **Never free, always charge** — ✅ Already policy (no-card trial, no free plan). Giveaway licenses only as group-admin promos, capped.
5. **Sell the private LTD hard** — every blog post gets a one-line LTD banner while the private deal runs; email past trial signups; pin it in the founder's LinkedIn/X.
6. **Write content, lots of it** — ✅ ongoing (niche blog series). Cadence: 2 posts/week; every "digital signage for X" niche gets a post.
7. **Launch on AppSumo** — listing draft: `appsumo-listing.md`. Apply via sell.appsumo.com (Marketplace listing is self-serve). Needed first: LTD plan enforcement in the backend (see spec in PiAds repo `docs/ltd-plan-spec.md`) and redemption codes.
8. **One last private LTD** — after AppSumo ends, re-open /ltd for 2 weeks at +20% prices ("final lifetime offer").
9. **Reviews** — template: `review-request-email.md`. Set up Trustpilot profile first; AppSumo reviews happen on their marketplace.
10. **Reddit & Quora** — answer bank: `reddit-quora-answers.md`. Cadence: 2 answers/week, always disclosed, never copy-pasted.

## Guardrails (why we won't get burned)
- LTD = CMS seats only; caps bound worst-case storage/bandwidth cost per license.
- Ad-marketplace split (75/25) is explicitly recurring and demand-dependent — never marketed as guaranteed income.
- Every tier's storage cap priced above expected 3-year Supabase cost for that tier.
- Non-transferable, one business per purchase, resale prohibited (stated on /ltd).

## Owner to-dos (can't be done by the site)
- [ ] Create 3 Stripe payment links; set the three env vars in Vercel
- [ ] Backend: implement `docs/ltd-plan-spec.md` (PiAds repo) before AppSumo
- [ ] Claim Trustpilot profile
- [ ] Join the LTD Facebook groups (personal account) and contact admins
- [ ] Apply at sell.appsumo.com with the listing draft
