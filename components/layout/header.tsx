"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Devices", href: "/devices" },
  { name: "Use cases", href: "/digital-signage-for" },
]

const resources = [
  { name: "Blog", href: "/blog", description: "Ideas for better venue screens" },
  { name: "Get started", href: "/get-started", description: "Connect and publish your first screen" },
  { name: "About", href: "/about", description: "Why we built PiAds" },
  { name: "Contact", href: "/contact", description: "Talk with our team" },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setResourcesOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Link
        href="/pricing"
        className="flex h-9 items-center justify-center gap-2 bg-coral px-4 text-center text-xs font-semibold text-gray-950 transition-colors hover:bg-coral/90 sm:text-sm"
      >
        Free digital signage with approved ad slots · Keep 70%
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>

      <div className="px-3 pt-2 md:px-5">
        <div
          className={cn(
            "mx-auto border border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-xl transition-all duration-300",
            scrolled ? "max-w-6xl rounded-2xl shadow-lg shadow-gray-950/5" : "max-w-7xl rounded-2xl"
          )}
        >
          <div className="flex h-[72px] items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex shrink-0 items-center" aria-label="PiAds home">
              <Image src="/logo/piads-logo-text.png" alt="PiAds" width={180} height={54} className="h-12 w-auto" priority />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.href) ? "bg-gray-100 text-gray-950" : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
                <button
                  type="button"
                  onClick={() => setResourcesOpen((value) => !value)}
                  className="flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-950"
                  aria-expanded={resourcesOpen}
                >
                  Resources
                  <ChevronDown className={cn("h-4 w-4 transition-transform", resourcesOpen && "rotate-180")} />
                </button>
                <div className={cn("absolute left-0 top-full pt-2 transition-all", resourcesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0")}>
                  <div className="w-72 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-950/10">
                    {resources.map((item) => (
                      <Link key={item.href} href={item.href} className="block rounded-xl px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm font-semibold text-gray-950">{item.name}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" className="h-11 rounded-xl px-5 text-gray-700" asChild>
                <Link href={APP_URL}>Sign in</Link>
              </Button>
              <Button className="h-11 rounded-xl bg-gray-950 px-5 font-semibold text-white hover:bg-gray-800" asChild>
                <Link href={`${APP_URL}/sign-up?role=venue`}>Start free</Link>
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 md:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className={cn("overflow-hidden transition-all duration-300 md:hidden", mobileOpen ? "max-h-[620px] border-t border-gray-100 opacity-100" : "max-h-0 opacity-0")}>
            <nav className="space-y-1 p-4" aria-label="Mobile navigation">
              {[...navigation, ...resources].map((item) => (
                <Link key={item.href} href={item.href} className={cn("block rounded-xl px-4 py-3 text-sm font-medium", isActive(item.href) ? "bg-blue/10 text-blue" : "text-gray-700 hover:bg-gray-50")}>
                  {item.name}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                <Button variant="outline" className="h-12 rounded-xl" asChild><Link href={APP_URL}>Sign in</Link></Button>
                <Button className="h-12 rounded-xl bg-gray-950 hover:bg-gray-800" asChild><Link href={`${APP_URL}/sign-up?role=venue`}>Start free</Link></Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
