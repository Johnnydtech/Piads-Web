import type { Metadata } from "next";
import { Instrument_Sans, Pacifico, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./marketing-theme.css";
import { SITE_URL } from "@/lib/site";
import { SITE_SHARE_IMAGE } from "@/lib/brand";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PiAds — Digital Signage & Guest Welcome Screens",
    template: "%s | PiAds",
  },
  description:
    "Beautiful guest guides, welcoming TVs, and digital signage. Manage screens, content and local recommendations from one simple dashboard.",
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
    title: "PiAds — Digital Signage & Guest Welcome Screens",
    description:
      "Beautiful guest guides, welcoming TVs, and digital signage. Start with a free welcome book and connect your TV when ready.",
    images: [SITE_SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "PiAds — Digital Signage & Guest Welcome Screens",
    description:
      "Beautiful guest guides, welcoming TVs, and digital signage. Start with a free welcome book and connect your TV when ready.",
    images: [SITE_SHARE_IMAGE],
  },
  icons: {
    icon: [
      { url: "/brand/piads-icon-v2.ico", sizes: "16x16 32x32 48x48" },
      { url: "/brand/piads-icon-32-v2.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/piads-icon-v2.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/brand/piads-icon-v2.ico",
    apple: { url: "/brand/piads-icon-180-v2.png", sizes: "180x180" },
  },
  manifest: "/brand/site-v2.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${pacifico.variable} ${instrumentSerif.variable}`}
    >
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
  );
}
