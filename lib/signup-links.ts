// Keep these values aligned with the CMS allowlist in lib/signupContext.ts.
export const INDUSTRY_SIGNUP = {
  'short-term-rentals': { useCase: 'short_term_rental', label: 'Create your guest welcome screen' },
  'cafes-coffee-shops': { useCase: 'cafe', label: 'Create your café display' },
  'gyms-fitness-studios': { useCase: 'gym', label: 'Create your gym display' },
  restaurants: { useCase: 'restaurant', label: 'Create your restaurant display' },
  'retail-stores': { useCase: 'retail', label: 'Create your store display' },
  'salons-barbershops': { useCase: 'salon', label: 'Create your salon display' },
  'medical-dental-offices': { useCase: 'medical', label: 'Create your practice display' },
} as const

export function industrySignup(slug: string) {
  return Object.prototype.hasOwnProperty.call(INDUSTRY_SIGNUP, slug)
    ? INDUSTRY_SIGNUP[slug as keyof typeof INDUSTRY_SIGNUP]
    : null
}
export function signupUseCaseForPath(pathname: string): string | undefined {
  const match = pathname.match(/^\/digital-signage-for\/([^/]+)\/?$/)
  if (match) return industrySignup(match[1])?.useCase
  if (pathname === '/blog/digital-signage-for-short-term-rentals') return 'short_term_rental'
  return undefined
}
export function hostSignupUrl(appUrl: string, useCase?: string): string {
  const params = new URLSearchParams({ role: 'venue_owner' })
  if (useCase && Object.values(INDUSTRY_SIGNUP).some(item => item.useCase === useCase)) params.set('use_case', useCase)
  return `${appUrl.replace(/\/$/, '')}/sign-up?${params}`
}
