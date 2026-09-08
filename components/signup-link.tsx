'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, type ComponentProps } from 'react'
import { hostSignupUrl, signupUseCaseForPath } from '@/lib/signup-links'

// Shared chrome keeps the same introduction as the current industry page.
export const SignupLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(function SignupLink(props, ref) {
  const pathname = usePathname()
  const href = hostSignupUrl(process.env.NEXT_PUBLIC_APP_URL || 'https://app.piads.co', signupUseCaseForPath(pathname || ''))
  return <Link {...props} ref={ref} href={href} />
})
