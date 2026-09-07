import { NewsletterPopup } from "@/components/newsletter-popup"

// Blog readers are the audience the newsletter is for; it stays here and
// nowhere else.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NewsletterPopup />
    </>
  )
}
