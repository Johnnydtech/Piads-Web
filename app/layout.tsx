import type { Metadata } from "next"
import { Instrument_Sans, Pacifico } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { SITE_URL } from "@/lib/site"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PiAds - Free Digital Signage That Pays You",
    template: "%s | PiAds",
  },
  description:
    "Manage every venue screen from one simple dashboard. Enable approved local ad slots, use PiAds free, and keep 70% of cleared ad revenue.",
  keywords: [
    "free digital signage",
    "free digital signage software",
    "digital signage ad revenue",
    "digital signage that pays you",
    "earn money from venue screens",
    "local advertising marketplace",
    "Fire TV digital signage",
    "venue digital signage",
    "DOOH",
  ],
  authors: [{ name: "PiAds Team" }],
  creator: "PiAds",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "PiAds",
    title: "PiAds - Free Digital Signage That Pays You",
    description: "Enable approved local ad slots, use PiAds free, and keep 70% of cleared ad revenue.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PiAds - Free Digital Signage That Pays You",
    description: "Enable approved local ad slots, use PiAds free, and keep 70% of cleared ad revenue.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo/favicon.ico",
    shortcut: "/logo/favicon-16x16.png",
    apple: "/logo/apple-touch-icon.png",
  },
  manifest: "/logo/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${pacifico.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Script
          id="posthog"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init ss us bi os hs es ns capture Bi calculateEventProperties cs register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty ps vs createPersonProfile gs Zr ys opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing ds debug O fs getPageViewId captureTraceFeedback captureTraceMetric Yr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('phc_OJAQktE6qhe0fyJVdkl8eIaVvKyoDdko2OfV9Qzhm6V', {
                api_host: 'https://us.i.posthog.com',
                defaults: '2025-11-30',
                person_profiles: 'identified_only',
                // Consent-gated: nothing is captured until the visitor accepts
                // via the cookie banner (posthog.opt_in_capturing()).
                opt_out_capturing_by_default: true,
              })
              // Returning visitors who already accepted resume capturing
              if (localStorage.getItem('piads_consent') === 'accepted') {
                posthog.opt_in_capturing()
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
