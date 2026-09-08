
import { SignupLink } from "@/components/signup-link";
import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES } from "@/lib/industries";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Digital Signage for Every Local Venue",
  description:
    "Digital signage for short-term rentals, property managers, cafes, gyms, salons, restaurants, retail, and medical offices. Free with approved ad slots.",
  alternates: { canonical: "/digital-signage-for" },
};
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co";
export default function IndustryIndexPage() {
  const industries = [...INDUSTRIES].sort(
    (a, b) =>
      Number(b.slug === "short-term-rentals") -
      Number(a.slug === "short-term-rentals"),
  );
  return (
    <div>
      <section className="catalog-intro">
        <p className="eyebrow">PIADS / SPACES & PEOPLE</p>
        <h1>
          Different spaces.
          <br />
          <em>The same thoughtful touch.</em>
        </h1>
        <p>
          From a collection of vacation homes to the neighborhood coffee shop.
          Keep your content personal, your screens connected, and your local
          community close.
        </p>
      </section>
      <section className="container">
        <div className="use-case-grid">
          {industries.map((ind, index) => (
            <Link
              key={ind.slug}
              href={`/digital-signage-for/${ind.slug}`}
              className={`use-case-card ${index === 0 ? "use-case-featured" : ""}`}
            >
              <div className="case-photo">
                <Image
                  src={
                    index === 0 ? "/stays/coastal-retreat.webp" : ind.heroImage
                  }
                  alt={ind.heroAlt}
                  width={1600}
                  height={900}
                  priority={index === 0}
                />
              </div>
              <div className="case-caption">
                <p className="eyebrow">
                  {index === 0
                    ? "FOR HOSTS & PROPERTY MANAGERS"
                    : `SPACE 0${index + 1}`}
                </p>
                <h2>{ind.name}</h2>
                <p>{ind.teaser}</p>
                <span>
                  Explore the possibilities <ArrowUpRight size={19} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="catalog-cta">
          <div>
            <h2>Your space belongs here.</h2>
            <p>
              If there’s a TV and people who look at it, PiAds fits. Use the
              hardware you already own, show your own content, and choose the
              local ads you approve.
            </p>
          </div>
          <SignupLink href={`${APP_URL}/sign-up?role=venue_owner`}>
            Find your starting point <ArrowUpRight size={18} />
          </SignupLink>
        </div>
      </section>
    </div>
  );
}
