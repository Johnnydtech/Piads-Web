import Link from "next/link";
import { SignupLink } from "@/components/signup-link";
import { Button } from "@/components/ui/button";
import { JsonLd, graph, breadcrumbs } from "@/components/seo/json-ld";
import {
  PRODUCT_SUMMARY,
  PLAN_ANSWER,
  APPROVAL_ANSWER,
  REVENUE_ANSWER,
  SETUP_ANSWER,
} from "@/lib/product-answers";
import { ArrowRight, Home, Store, ShieldCheck } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/about" },
  title: "About PiAds: Guest Welcome Screens & Digital Signage",
  description:
    "Meet PiAds: digital signage for hosts, property managers, and local businesses, with guest welcome screens and an optional advertising marketplace.",
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co";
const audiences = [
  {
    icon: Home,
    title: "For hosts and property managers",
    body: "Welcome guests with Wi-Fi details, house notes, checkout instructions, and local recommendations. Manage each property’s content from the same account.",
    href: "/digital-signage-for/short-term-rentals",
    label: "Guest welcome screens",
  },
  {
    icon: Store,
    title: "For local businesses",
    body: "Show menus, promotions, announcements, images, and videos. Use playlists and schedules to change what appears during the day.",
    href: "/digital-signage-for",
    label: "Explore uses for your business",
  },
  {
    icon: ShieldCheck,
    title: "For advertisers",
    body: "Find available venue screens, choose dates and time windows, attach an ad, and review the price before payment. Follow approval, recorded plays, and QR scans in your account.",
    href: "https://market.piads.co",
    label: "Explore the ad marketplace",
  },
];

export default function AboutPage() {
  return (
    <div>
      <JsonLd
        data={graph(
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
      />
      <section className="container max-w-4xl py-20 md:py-28">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          About PiAds
        </p>
        <h1 className="mb-7 font-display text-5xl md:text-7xl">
          Your space. Your screens. Your story.
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {PRODUCT_SUMMARY}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg" asChild>
            <SignupLink href={`${APP_URL}/sign-up?role=venue_owner`}>
              Create your first screen <ArrowRight className="ml-2 h-4 w-4" />
            </SignupLink>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/get-started">See how setup works</Link>
          </Button>
        </div>
      </section>
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container">
          <h2 className="mb-8 font-display text-4xl">
            One platform, different spaces.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map(({ icon: Icon, title, body, href, label }) => (
              <article
                key={title}
                className="flex flex-col rounded-3xl border bg-white p-7"
              >
                <Icon className="mb-5 h-7 w-7" />
                <h3 className="mb-3 text-xl font-semibold">{title}</h3>
                <p className="mb-6 text-muted-foreground">{body}</p>
                <Link
                  className="mt-auto font-semibold underline underline-offset-4"
                  href={href}
                >
                  {label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container grid gap-10 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="mb-5 font-display text-4xl">How do I get started?</h2>
          <p className="text-muted-foreground">{SETUP_ANSWER}</p>
          <Link
            className="mt-5 inline-block font-semibold underline"
            href="/devices"
          >
            Find a player for your TV
          </Link>
        </div>
        <div>
          <h2 className="mb-5 font-display text-4xl">Do I need to run ads?</h2>
          <p className="text-muted-foreground">{PLAN_ANSWER}</p>
          <Link
            className="mt-5 inline-block font-semibold underline"
            href="/pricing"
          >
            Compare the plans
          </Link>
        </div>
      </section>
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="mb-5 font-display text-4xl">
            Advertising on your terms.
          </h2>
          <p className="text-muted-foreground">{APPROVAL_ANSWER}</p>
          <p className="mt-5 text-muted-foreground">{REVENUE_ANSWER}</p>
          <Link
            className="mt-6 inline-block font-semibold underline"
            href="/digital-signage-ad-revenue"
          >
            Learn how venue advertising works
          </Link>
        </div>
      </section>
    </div>
  );
}
