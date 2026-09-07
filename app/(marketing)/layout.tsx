import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ConsentBanner } from "@/components/consent-banner"
import { StickyCta } from "@/components/sticky-cta"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ConsentBanner />
      {/* The newsletter popup was the most-clicked element on the site
          (dismissed by ~21 of 34 visitors in 30 days, mostly on mobile) while
          every CTA combined got ~8 clicks. It now runs on blog pages only. */}
      <StickyCta />
    </>
  )
}
