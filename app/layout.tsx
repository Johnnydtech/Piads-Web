import type { Metadata } from "next"
import { Inter, Poppins, Pacifico } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
})

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://piads.co"),
  title: {
    default: "PiAds - Turn Your Screens Into Revenue",
    template: "%s | PiAds",
  },
  description:
    "Digital signage advertising marketplace. Venues monetize their screens while advertisers reach customers at high-traffic real-world locations.",
  keywords: [
    "digital signage",
    "advertising",
    "DOOH",
    "screen advertising",
    "venue monetization",
    "digital out-of-home",
  ],
  authors: [{ name: "PiAds Team" }],
  creator: "PiAds",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://piads.co",
    siteName: "PiAds",
    title: "PiAds - Turn Your Screens Into Revenue",
    description: "Digital signage advertising marketplace",
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PiAds - Turn Your Screens Into Revenue",
    description: "Digital signage advertising marketplace",
    images: ["/og/default.png"],
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
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${pacifico.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
