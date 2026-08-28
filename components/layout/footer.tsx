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
      { name: "All Supported Devices", href: "/devices" },
      { name: "Raspberry Pi vs Fire TV vs Android", href: "/blog/raspberry-pi-vs-fire-tv-vs-android-digital-signage" },
      { name: "Getting Started with PiAds", href: "/blog/getting-started-with-piads" },
    ],
  },
  {
    heading: "Digital Signage For",
    links: [
      { name: "Coffee Shops & Cafes", href: "/blog/digital-signage-for-coffee-shops-and-cafes" },
      { name: "Gyms & Fitness Studios", href: "/blog/digital-signage-for-gyms-and-fitness-studios" },
      { name: "Salons & Barbershops", href: "/blog/digital-signage-for-salons-and-barbershops" },
      { name: "Restaurants & Menus", href: "/blog/digital-menu-boards-increase-restaurant-sales" },
      { name: "Breweries & Taprooms", href: "/blog/digital-signage-for-breweries-and-taprooms" },
      { name: "Medical & Dental Offices", href: "/blog/digital-signage-for-dental-and-medical-offices" },
      { name: "Auto Repair Shops", href: "/blog/digital-signage-for-auto-repair-shops" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { name: "What Digital Signage Costs", href: "/blog/how-much-does-digital-signage-cost" },
      { name: "Earn From Your Screens", href: "/blog/earn-money-from-your-venue-screens" },
      { name: "Digital Signage vs Paper Signs", href: "/blog/digital-signage-vs-paper-signs" },
      { name: "Content Ideas", href: "/blog/digital-signage-content-ideas" },
      { name: "Blog", href: "/blog" },
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
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
              Turn your screens into revenue. The digital signage advertising
              marketplace connecting venues with advertisers.
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
