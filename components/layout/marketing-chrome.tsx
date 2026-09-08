"use client";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { ConsentBanner } from "@/components/consent-banner";

export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";
  return (
    <>
      <Header />
      <main
        id="main-content"
        className={isHome ? "min-h-screen" : "min-h-screen marketing-page"}
      >
        {children}
      </main>
      <Footer />
      <ConsentBanner />
    </>
  );
}
