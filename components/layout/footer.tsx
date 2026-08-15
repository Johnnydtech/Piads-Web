import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  product: [
    { name: "For Hosts", href: "/" },
    { name: "Local Ads", href: "/advertisers" },
    { name: "Pricing", href: "/pricing" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
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
              The digital concierge for short-term rentals. An always-on guest
              screen with WiFi, house rules, and a local guide — plus local
              ads that help it pay for itself.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold font-display mb-5">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
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

          {/* Company Links */}
          <div>
            <h3 className="font-semibold font-display mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold font-display mb-5">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
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
