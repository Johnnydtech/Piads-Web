"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, BookOpen, Tv, Building2, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const mainNavigation = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
]

const resourcesNavigation = [
  { name: "Get Started", href: "/get-started", icon: BookOpen, description: "Learn how to use PiAds" },
  { name: "Devices", href: "/devices", icon: Tv, description: "Supported hardware" },
  { name: "About", href: "/about", icon: Building2, description: "Our story & mission" },
  { name: "Contact", href: "/contact", icon: Mail, description: "Get in touch" },
]

const allNavigation = [
  ...mainNavigation,
  ...resourcesNavigation,
]

const badgeMessages = [
  { text: "Keep", bold: "75%", suffix: "of Revenue" },
  { text: "Only", bold: "$10", suffix: "/screen" },
]

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [badgeIndex, setBadgeIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Rotate badge messages
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setBadgeIndex((prev) => (prev + 1) % badgeMessages.length)
        setIsAnimating(false)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const isResourcesActive = resourcesNavigation.some(item => pathname === item.href)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6">
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-out",
          scrolled
            ? "mt-4 max-w-4xl bg-white/60 backdrop-blur-2xl rounded-full shadow-xl shadow-black/5 border border-white/40"
            : "mt-0 max-w-7xl"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16 px-6 md:px-8" : "h-24 px-4"
          )}
        >
          <Link
            href="/"
            className="flex-shrink-0 flex items-center transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/logo/piads-logo-text.png"
              alt="PiAds"
              width={200}
              height={60}
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={cn(
            "hidden md:flex items-center transition-all duration-500",
            scrolled ? "gap-1" : "gap-2"
          )}>
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative font-medium transition-all duration-300 rounded-full",
                  "hover:bg-gray-100 hover:text-blue",
                  scrolled ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-base",
                  pathname === item.href
                    ? "text-blue"
                    : "text-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                className={cn(
                  "relative font-medium transition-all duration-300 rounded-full flex items-center gap-1",
                  "hover:bg-gray-100 hover:text-blue",
                  scrolled ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-base",
                  isResourcesActive ? "text-blue" : "text-gray-700"
                )}
              >
                Resources
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  resourcesOpen && "rotate-180"
                )} />
              </button>

              {/* Dropdown Menu */}
              <div className={cn(
                "absolute top-full left-0 pt-2 transition-all duration-200",
                resourcesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              )}>
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[220px]">
                  {resourcesNavigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors",
                          "hover:bg-gray-50",
                          pathname === item.href ? "bg-blue/5 text-blue" : "text-gray-700"
                        )}
                      >
                        <Icon className="h-5 w-5 mt-0.5 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <span className={cn(
              "bg-coral/80 text-gray-900 font-medium rounded-full transition-all duration-300 whitespace-nowrap overflow-hidden text-center w-[175px]",
              scrolled ? "text-xs px-3 py-1" : "text-sm px-4 py-1.5"
            )}>
              <span className={cn(
                "inline-block transition-all duration-300",
                isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              )}>
                {badgeMessages[badgeIndex].text} <span className="font-bold">{badgeMessages[badgeIndex].bold}</span> {badgeMessages[badgeIndex].suffix}
              </span>
            </span>
            <Button
              variant="ghost"
              className={cn(
                "rounded-full transition-all duration-300 font-medium",
                scrolled ? "h-10 px-5 text-sm" : "h-12 px-6 text-base"
              )}
              asChild
            >
              <Link href={APP_URL}>Sign In</Link>
            </Button>
            <Button
              className={cn(
                "rounded-full transition-all duration-300 bg-gray-900 hover:bg-gray-800 font-medium",
                scrolled ? "h-10 px-5 text-sm" : "h-12 px-6 text-base"
              )}
              asChild
            >
              <Link href={`${APP_URL}/sign-up`}>Try For Free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-full transition-all duration-300",
              "hover:bg-gray-100 active:scale-95",
              mobileMenuOpen && "bg-gray-100"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu className={cn(
                "h-6 w-6 absolute inset-0 transition-all duration-300",
                mobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
              )} />
              <X className={cn(
                "h-6 w-6 absolute inset-0 transition-all duration-300",
                mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-500 ease-out mx-auto",
        scrolled ? "max-w-4xl mt-2" : "max-w-7xl",
        mobileMenuOpen
          ? "max-h-[500px] opacity-100"
          : "max-h-0 opacity-0"
      )}>
        <div className={cn(
          "bg-white/95 backdrop-blur-xl border border-gray-100",
          scrolled ? "rounded-3xl shadow-lg" : "rounded-2xl shadow-md"
        )}>
          <nav className="p-4 flex flex-col gap-1">
            {allNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-all duration-300 py-3 px-4 rounded-xl",
                  "hover:bg-gray-100 hover:text-blue",
                  pathname === item.href
                    ? "text-blue bg-blue/5"
                    : "text-gray-700"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-100">
              <p className="bg-coral/80 text-gray-900 font-medium rounded-full px-5 py-2 text-center overflow-hidden">
                <span className={cn(
                  "inline-block transition-all duration-300",
                  isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                )}>
                  {badgeMessages[badgeIndex].text} <span className="font-bold">{badgeMessages[badgeIndex].bold}</span> {badgeMessages[badgeIndex].suffix}
                </span>
              </p>
              <Button variant="outline" className="rounded-full h-12" asChild>
                <Link href={APP_URL}>Sign In</Link>
              </Button>
              <Button className="rounded-full h-12 bg-gray-900 hover:bg-gray-800" asChild>
                <Link href={`${APP_URL}/sign-up`}>Try For Free</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
