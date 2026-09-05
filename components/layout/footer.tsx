import Link from "next/link"
import Image from "next/image"

// The footer is the site's internal-linking engine: every column below is an
// SEO cluster. As new template pages ship (industry pages, alternative-to
// pages), add their columns here so every page on the site links to them.
const footerColumns: { heading: string; links: { name: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "For Venues", href: "/features#venues" },
      { name: "For Advertisers", href: "/features#advertisers" },
      { name: "Get Started", href: "/get-started" },
    ],
  },
  {
    heading: "Players & Setup",
    links: [
      { name: "Fire TV Stick", href: "/players/fire-tv" },
      { name: "Fire TV Setup Guide", href: "/blog/fire-tv-stick-digital-signage-setup-guide" },
      { name: "Browser-Based Signage", href: "/blog/browser-based-digital-signage" },
      { name: "All Supported Devices", href: "/devices" },
      { name: "Raspberry Pi vs Fire TV vs Android", href: "/blog/raspberry-pi-vs-fire-tv-vs-android-digital-signage" },
      { name: "Getting Started with PiAds", href: "/blog/getting-started-with-piads" },
    ],
  },
  {
    heading: "Digital Signage For",
    links: [
      { name: "Cafes & Coffee Shops", href: "/digital-signage-for/cafes-coffee-shops" },
      { name: "Gyms & Fitness Studios", href: "/digital-signage-for/gyms-fitness-studios" },
      { name: "Salons & Barbershops", href: "/digital-signage-for/salons-barbershops" },
      { name: "Restaurants & Menus", href: "/digital-signage-for/restaurants" },
      { name: "Retail Stores", href: "/digital-signage-for/retail-stores" },
      { name: "Medical & Dental Offices", href: "/digital-signage-for/medical-dental-offices" },
      { name: "All Industries", href: "/digital-signage-for" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { name: "Free Digital Signage", href: "/free-digital-signage" },
      { name: "Earn Ad Revenue From Screens", href: "/digital-signage-ad-revenue" },
      { name: "What Is Digital Signage?", href: "/blog/what-is-digital-signage" },
      { name: "What Digital Signage Costs", href: "/blog/how-much-does-digital-signage-cost" },
      { name: "Canva on Your TV", href: "/blog/canva-digital-signage-display-on-tv" },
      { name: "Earn From Your Screens", href: "/blog/earn-money-from-your-venue-screens" },
      { name: "Digital Signage vs Paper Signs", href: "/blog/digital-signage-vs-paper-signs" },
      { name: "Content Ideas", href: "/blog/digital-signage-content-ideas" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Compare",
    links: [
      { name: "vs Yodeck", href: "/alternative-to/yodeck-alternative" },
      { name: "vs OptiSigns", href: "/alternative-to/optisigns-alternative" },
      { name: "vs ScreenCloud", href: "/alternative-to/screencloud-alternative" },
      { name: "vs Raydiant", href: "/alternative-to/raydiant-alternative" },
      { name: "vs Juuno", href: "/alternative-to/juuno-alternative" },
      { name: "vs Trillboards", href: "/alternative-to/trillboards-alternative" },
      { name: "vs Loop TV", href: "/alternative-to/loop-tv-alternative" },
      { name: "Best Signage Software 2026", href: "/blog/best-digital-signage-software-small-business" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
]

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo/piads-logo-text.png"
                alt="PiAds"
                width={180}
                height={55}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Free digital signage for partner venues. Run your own content,
              approve local ad slots, and keep 70% of cleared revenue.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-semibold font-display mb-5">{col.heading}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-blue transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PiAds. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href={APP_URL}
              className="text-sm text-muted-foreground hover:text-blue transition-colors"
            >
              Sign In
            </Link>
            <Link
              href={`${APP_URL}/sign-up`}
              className="text-sm text-blue hover:text-blue/80 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
