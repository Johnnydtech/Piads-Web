import type { Metadata } from "next";
import { HomeContent } from "./home-content";
import {
  JsonLd,
  graph,
  ORGANIZATION,
  SOFTWARE_APPLICATION,
} from "@/components/seo/json-ld";

// Server wrapper: the homepage body is a client component (scroll-driven hero),
// and client components cannot export metadata. Canonical + JSON-LD live here.
export const metadata: Metadata = {
  title: { absolute: "PiAds — A Better Stay Starts With Hello" },
  description:
    "Turn your short-term rental TV into a personal welcome, house guide, and local recommendations. Free with approved ad slots. Keep 70% of cleared ad revenue.",
  openGraph: {
    title: "PiAds — A Better Stay Starts With Hello",
    description:
      "A personal welcome, a local guide, and your most thoughtful hosting touch. On the TV you already own.",
  },
  twitter: {
    title: "PiAds — A Better Stay Starts With Hello",
    description:
      "A personal welcome, a local guide, and your most thoughtful hosting touch.",
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(ORGANIZATION, SOFTWARE_APPLICATION)} />
      <HomeContent />
    </>
  );
}
