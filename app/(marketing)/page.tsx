import type { Metadata } from "next"
import { HomeContent } from "./home-content"
import { JsonLd, graph, ORGANIZATION, SOFTWARE_APPLICATION } from "@/components/seo/json-ld"

// Server wrapper: the homepage body is a client component (scroll-driven hero),
// and client components cannot export metadata. Canonical + JSON-LD live here.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(ORGANIZATION, SOFTWARE_APPLICATION)} />
      <HomeContent />
    </>
  )
}
