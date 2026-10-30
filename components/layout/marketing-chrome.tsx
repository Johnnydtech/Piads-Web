"use client";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
import { Header } from "./header";
import { Footer } from "./footer";
import { ConsentBanner } from "@/components/consent-banner";

export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/airbnb-welcome-book-generator/guest-demo") return <main id="main-content">{children}</main>;
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
