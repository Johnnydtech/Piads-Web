
import { SignupLink } from "@/components/signup-link";
import Link from "next/link";
import { COMPETITORS } from "@/lib/competitors";
import { ArrowUpRight } from "lucide-react";
export const metadata = {
  title: "Digital Signage Alternatives Compared",
  description:
    "Compare PiAds with Yodeck, OptiSigns, ScreenCloud, Raydiant, Juuno, and more. Explore feature tables, pricing at scale, and migration guides.",
  alternates: { canonical: "/alternative-to" },
};
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co";
export default function AlternativesIndexPage() {
  return (
    <div>
      <section className="catalog-intro">
        <p className="eyebrow">PIADS / A CLOSER LOOK</p>
        <h1>
          A better fit for
          <br />
          <em>your kind of screen.</em>
        </h1>
        <p>
          Compare the features, the trade-offs, and the costs as you grow. Each
          guide explains where the other platform shines, and where PiAds takes
          a different approach.
        </p>
      </section>
      <section className="container">
        <div className="comparison-grid">
          {COMPETITORS.map((c, index) => (
            <Link
              href={`/alternative-to/${c.slug}`}
              className="comparison-card"
              key={c.slug}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>PiAds vs {c.name}</h2>
                <p>
                  A {c.name} alternative {c.heroAdjectives}.
                </p>
              </div>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
        <div className="catalog-cta">
          <div>
            <h2>
              The best comparison?
              <br />
              See it on your screen.
            </h2>
            <p>
              Try PiAds with your own content and hardware. Explore the
              dashboard, pair a screen, and see how it fits the way you work.
            </p>
          </div>
          <SignupLink href={`${APP_URL}/sign-up?role=venue_owner`}>
            Start free <ArrowUpRight size={18} />
          </SignupLink>
        </div>
      </section>
    </div>
  );
}
