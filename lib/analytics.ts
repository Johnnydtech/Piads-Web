"use client"

/**
 * Conversion instrumentation for the marketing site.
 *
 * Autocapture alone couldn't answer "which CTA converts" — analysis had to
 * key off $el_text, which changes with copy. These named events keep the
 * funnel measurable across redesigns.
 */
type Props = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    // The PostHog snippet in app/layout.tsx defines these; the consent banner
    // uses the opt-in/out pair. Declared once here so the types don't clash.
    posthog?: {
      capture?: (event: string, props?: Props) => void
      opt_in_capturing?: () => void
      opt_out_capturing?: () => void
    }
  }
}

export function track(event: string, props?: Props) {
  try {
    window.posthog?.capture?.(event, {
      path: typeof window !== "undefined" ? window.location.pathname : undefined,
      ...props,
    })
  } catch {
    // Analytics must never break a click.
  }
}

/** A click on a primary conversion CTA. `location` says where on the page. */
export function trackCta(label: string, location: string, props?: Props) {
  track("cta_click", { label, location, ...props })
}
