import type { Metadata } from "next";
import { HomeContent } from "./home-content";
import {
  JsonLd,
  graph,
  ORGANIZATION,
  SOFTWARE_APPLICATION,
  WEBSITE,
  faqPage,
} from "@/components/seo/json-ld";
import { PRODUCT_FAQS } from "@/lib/product-answers";
import { SITE_URL } from "@/lib/site";
import { SITE_SHARE_IMAGE } from "@/lib/brand";

const title = "PiAds | Digital Signage & Guest Welcome Screens";
const description =
  "PiAds turns TVs into digital signage and guest welcome screens. Share house guides, local recommendations, and business content from one simple dashboard.";

// Server wrapper: the homepage body is a client component (scroll-driven hero),
// and client components cannot export metadata. Canonical + JSON-LD live here.
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "PiAds",
    title,
    description,
    images: [SITE_SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SITE_SHARE_IMAGE],
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(WEBSITE, ORGANIZATION, SOFTWARE_APPLICATION, faqPage(PRODUCT_FAQS))} />
      <HomeContent />
    </>
  );
}
