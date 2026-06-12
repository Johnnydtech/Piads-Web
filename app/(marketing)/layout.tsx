import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ConsentBanner } from "@/components/consent-banner"
import { NewsletterPopup } from "@/components/newsletter-popup"

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
      <NewsletterPopup />
    </>
  )
}
