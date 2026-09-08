// Run: node --experimental-strip-types scripts/test-signup-links.mjs
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { INDUSTRY_SIGNUP, hostSignupUrl, signupUseCaseForPath, industrySignup } from '../lib/signup-links.ts'
for (const [slug, entry] of Object.entries(INDUSTRY_SIGNUP)) {
  assert.equal(signupUseCaseForPath(`/digital-signage-for/${slug}`), entry.useCase)
  assert.equal(signupUseCaseForPath(`/digital-signage-for/${slug}/`), entry.useCase)
  const url = new URL(hostSignupUrl('https://app.piads.co/', entry.useCase))
  assert.equal(url.searchParams.get('role'), 'venue_owner')
  assert.equal(url.searchParams.get('use_case'), entry.useCase)
  // Verify the actual built page, including shared header/footer CTAs.
  const html = fs.readFileSync(`out/digital-signage-for/${slug}.html`, 'utf8')
  const links = [...html.matchAll(/href="([^"]*\/sign-up[^\"]*)"/g)].map(m=>m[1].replaceAll('&amp;', '&'))
  assert.ok(links.length >= 3, `${slug}: hero, header, and footer signup links`)
  for (const link of links) {
    const parsed = new URL(link)
    assert.equal(parsed.searchParams.get('role'), 'venue_owner', link)
    assert.equal(parsed.searchParams.get('use_case'), entry.useCase, link)
  }
  console.log('PASS built signup links', slug, links.length)
}
assert.equal(signupUseCaseForPath('/'), undefined)
assert.equal(signupUseCaseForPath('/pricing'), undefined)
assert.equal(industrySignup('__proto__'), null)
assert.equal(new URL(hostSignupUrl('https://app.piads.co','unknown')).searchParams.has('use_case'),false)
console.log('All industry and general signup link checks passed.')
