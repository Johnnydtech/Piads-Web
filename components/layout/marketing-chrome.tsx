"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { ConsentBanner } from "@/components/consent-banner";
import { NewsletterPopup } from "@/components/newsletter-popup";

export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";
  return (
    <>
      {!isHome && <Header />}
      <main className="min-h-screen">{children}</main>
      {!isHome && <Footer />}
      <ConsentBanner />
      {!isHome && <NewsletterPopup />}
    </>
  );
}
