import Link from "next/link";
import { SignupLink } from "@/components/signup-link";
import { Button } from "@/components/ui/button";
import { JsonLd, graph, faqPage, breadcrumbs } from "@/components/seo/json-ld";
import {
  PLAN_ANSWER,
  APPROVAL_ANSWER,
  REVENUE_ANSWER,
  DEVICE_ANSWER,
} from "@/lib/product-answers";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Free Digital Signage: PiAds Trial & Partner Plan",
  description:
    "Try PiAds without ads for 14 days. Keep qualifying Partner screens free, or choose ad-free signage for $10 per screen per month or $100 per year.",
  alternates: { canonical: "/free-digital-signage" },
};
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co";
const faqs = [
  { question: "Is PiAds really free?", answer: PLAN_ANSWER },
  { question: "Will ads take over my screen?", answer: APPROVAL_ANSWER },
  {
    question: "Does opening ad slots guarantee income?",
    answer: REVENUE_ANSWER,
  },
  { question: "What hardware do I need?", answer: DEVICE_ANSWER },
  {
    question: "What makes a screen eligible for the Partner plan?",
    answer:
      "A screen needs qualifying ad availability and pricing. Opening a single setting does not necessarily make it eligible. Your dashboard shows which screens qualify and guides you through the required ad-slot settings.",
  },
];
const plans = [
  {
    title: "Try PiAds",
    price: "$0",
    term: "14-day trial",
    body: "Up to two screens across your venues, with no ads required. Prepare your content and try playback before choosing your ongoing plan.",
  },
  {
    title: "Partner screens",
    price: "$0",
    term: "per qualifying screen",
    body: "Offer qualifying marketplace ad slots. You control your prices, availability, and approval preferences. Revenue depends on bookings and delivery.",
  },
  {
    title: "Ad-free screens",
    price: "$10",
    term: "per screen per month",
    body: "Keep your screens ad-free with a paid plan. Annual billing is $100 per screen per year. Hardware and internet are separate.",
  },
];
export default function FreeDigitalSignagePage() {
  return (
    <div>
      <JsonLd
        data={graph(
          faqPage(faqs),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Free digital signage", path: "/free-digital-signage" },
          ]),
        )}
      />
      <section className="container max-w-4xl py-20 md:py-28">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Free digital signage, explained
        </p>
        <h1 className="mb-7 font-display text-5xl md:text-7xl">
          Start free. Choose what works for your space.
        </h1>
        <p className="text-lg text-muted-foreground">{PLAN_ANSWER}</p>
        <Button className="mt-8" size="lg" asChild>
          <SignupLink href={`${APP_URL}/sign-up?role=venue_owner`}>
            Start your trial <ArrowRight className="ml-2 h-4 w-4" />
          </SignupLink>
        </Button>
      </section>
      <section className="bg-secondary/50 py-16">
        <div className="container">
          <h2 className="mb-8 font-display text-4xl">
            Three ways to use PiAds.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.title}
                className="rounded-3xl border bg-white p-7"
              >
                <h3 className="text-xl font-semibold">{plan.title}</h3>
                <p className="mt-5 text-4xl font-semibold">{plan.price}</p>
                <p className="mb-5 text-sm text-muted-foreground">
                  {plan.term}
                </p>
                <p className="text-muted-foreground">{plan.body}</p>
              </article>
            ))}
          </div>
          <Link
            className="mt-7 inline-block font-semibold underline"
            href="/pricing"
          >
            Read the full pricing details
          </Link>
        </div>
      </section>
      <section className="container max-w-4xl py-16">
        <h2 className="mb-8 font-display text-4xl">
          Know what you’re choosing.
        </h2>
        <div className="divide-y rounded-3xl border bg-white px-6 md:px-9">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="py-6">
              <h3 className="text-lg font-semibold">{question}</h3>
              <p className="mt-3 text-muted-foreground">{answer}</p>
            </div>
          ))}
        </div>
        <Link
          className="mt-7 inline-block font-semibold underline"
          href="/get-started"
        >
          Prepare and connect your first screen
        </Link>
      </section>
    </div>
  );
}
