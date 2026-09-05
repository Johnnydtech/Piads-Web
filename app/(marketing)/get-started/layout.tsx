import type { Metadata } from "next"

// get-started/page.tsx is a client component; metadata must come from a
// server file. This layout only wraps /get-started, so nothing inherits it.
export const metadata: Metadata = {
  title: "Get Started with PiAds",
  description: "Connect a screen, publish your first playlist, and enable approved ad slots so the software is free. Step-by-step for venues and advertisers.",
  alternates: { canonical: "/get-started" },
}

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children
}
