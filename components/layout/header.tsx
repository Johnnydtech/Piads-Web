"use client";

import { SignupLink } from "@/components/signup-link";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { footerColumns } from "@/lib/navigation";
import styles from "./site-shell.module.css";
import { trackCta } from "@/lib/analytics";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co";
const groups = [
  {
    label: "Platform",
    intro: "Every screen. More possibilities.",
    links: [
      ...footerColumns[0].links.filter((link) => link.name !== "Pricing"),
      ...footerColumns[1].links.slice(0, 4),
    ],
  },
  {
    label: "Use cases",
    intro: "A personal touch, in every space.",
    links: [
      {
        name: "For property managers",
        href: "/digital-signage-for/short-term-rentals#property-managers",
      },
      ...footerColumns[2].links,
    ],
  },
  {
    label: "Compare",
    intro: "Find the right fit for your screens.",
    links: [
      { name: "All comparisons", href: "/alternative-to" },
      ...footerColumns[4].links,
    ],
  },
  {
    label: "Resources",
    intro: "A little know-how goes a long way.",
    links: [...footerColumns[3].links, ...footerColumns[5].links.slice(0, 2)],
  },
];

export function Header() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    setActive(null);
    setMobileOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        setActive(null);
        setMobileOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (active) triggers.current[active]?.focus();
        setActive(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [active]);
  const close = () => {
    setActive(null);
    setMobileOpen(false);
  };
  return (
    <header
      className={styles.header}
      ref={header}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setActive(null);
      }}
    >
      <a className={styles.skip} href="#main-content">
        Skip to content
      </a>
      <div className={styles.announcement}>
        <span>One property or a whole portfolio.</span>
        <Link href="/pricing">
          Free with approved ad slots <ArrowUpRight size={13} />
        </Link>
      </div>
      <div className={styles.headerRow}>
        <Brand />
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {groups.map((group) => (
            <div key={group.label}>
              <button
                type="button"
                ref={(el) => {
                  triggers.current[group.label] = el;
                }}
                aria-expanded={active === group.label}
                aria-controls={`navigation-${group.label}`}
                onClick={() =>
                  setActive(active === group.label ? null : group.label)
                }
              >
                {group.label}
                <ChevronDown size={13} />
              </button>
              {active === group.label && (
                <div
                  id={`navigation-${group.label}`}
                  className={styles.dropdown}
                >
                  <div className={styles.dropdownIntro}>
                    <span>EXPLORE PIADS</span>
                    <p>{group.intro}</p>
                    <Link href="/get-started" onClick={close}>
                      Find your starting point <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  <div className={styles.dropdownLinks}>
                    {group.links.map((link) => (
                      <Link
                        key={`${link.href}-${link.name}`}
                        href={link.href}
                        onClick={close}
                      >
                        {link.name}
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/pricing"
            aria-current={pathname === "/pricing" ? "page" : undefined}
          >
            Pricing
          </Link>
        </nav>
        <div className={styles.actions}>
          <Link className={styles.login} href={APP_URL} onClick={() => trackCta("Log in", "header")}>
            Log in <ArrowUpRight size={14} />
          </Link>
          <SignupLink className={styles.start} href={`${APP_URL}/sign-up?role=venue_owner`} onClick={() => trackCta("Start free", "header")}>
            Start free <ArrowUpRight size={16} />
          </SignupLink>
          <button
            className={styles.menuToggle}
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setActive(null);
            }}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          className={styles.mobileNav}
          aria-label="Mobile navigation"
        >
          {groups.map((group) => (
            <details key={group.label}>
              <summary>
                {group.label}
                <ChevronDown size={17} />
              </summary>
              <div>
                {group.links.map((link) => (
                  <Link
                    key={`${link.href}-${link.name}`}
                    href={link.href}
                    onClick={close}
                  >
                    {link.name}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Link href="/pricing" onClick={close}>
            Pricing <ArrowUpRight size={16} />
          </Link>
          <Link href={APP_URL}>
            Log in <ArrowUpRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}
