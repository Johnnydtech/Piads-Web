"use client";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
import { Header } from "./header";
import { Footer } from "./footer";
import { ConsentBanner } from "@/components/consent-banner";

export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/airbnb-welcome-book-generator/guest-demo") return <main id="main-content">{children}</main>;
  if (pathname === "/airbnb-welcome-book-generator") return (
    <div style={{ background: "#f8f9f5", minHeight: "100svh" }}>
      <header style={{ maxWidth: 1200, margin: "auto", padding: "18px 24px 0" }}>
        <img src="/logo/piads-logo-text.png" alt="PiAds" style={{ width: 88, height: 48, objectFit: "contain" }} />
      </header>
      <main id="main-content">{children}</main>
      <footer style={{ textAlign: "center", padding: "10px 20px 16px", color: "#65786d", fontSize: 11 }}>
        Made with PiAds · <a href="/privacy" target="_blank" rel="noreferrer">Privacy</a>
      </footer>
      <ConsentBanner />
    </div>
  );
  const isHome = pathname === "/";
  if (pathname === "/airbnb-welcome-book-generator/your-guide") {
    return (
      <div style={{ background: "#f8f9f5", minHeight: "100dvh" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, maxWidth: 1280, margin: "auto", padding: "16px 20px", borderBottom: "1px solid #dce3d8" }}>
          <Brand />
          <span style={{ fontSize: 13, color: "#65786d" }}>Your host starter kit</span>
        </header>
        <main id="main-content">{children}</main>
        <ConsentBanner />
      </div>
    );
  }
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
