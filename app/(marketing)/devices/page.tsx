import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignupLink } from "@/components/signup-link";
import { JsonLd, graph, breadcrumbs, faqPage } from "@/components/seo/json-ld";
import { DEVICE_ANSWER } from "@/lib/product-answers";
import {
  Monitor,
  Tv,
  Smartphone,
  CircuitBoard,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  alternates: { canonical: "/devices" },
  title: "Supported Devices & Player Setup",
  description:
    "Choose a PiAds player for Fire TV, Android TV, Google TV, Raspberry Pi, or a compatible browser. Manage your screens from the web, iPhone, or iPad.",
};
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co";
const players = [
  {
    icon: Tv,
    name: "Fire TV",
    body: "Install the PiAds player from the Amazon Appstore on a compatible Fire TV device. Use the pairing code to connect it to your screen in the dashboard.",
    href: "https://www.amazon.com/dp/B0GTRC4JTN",
    label: "Open Amazon Appstore",
    guide: "/players/fire-tv",
  },
  {
    icon: Tv,
    name: "Android TV & Google TV",
    body: "Install PiAds Player from Google Play on a compatible device, open the player, and enter its pairing code in your PiAds dashboard.",
    href: "https://play.google.com/store/apps/details?id=co.piads.kiosk",
    label: "Open Google Play",
  },
  {
    icon: Monitor,
    name: "Web browser",
    body: "Use Play preview on a screen card to check content inside the dashboard. For browser playback as a connected screen, use the browser player option in the screen connection flow. Keep the browser open and the device awake.",
    href: "/get-started",
    label: "Read the browser setup guide",
  },
  {
    icon: CircuitBoard,
    name: "Raspberry Pi",
    body: "PiAds offers a Raspberry Pi player for dedicated displays. Confirm the supported board and installation image with PiAds before buying or configuring a device.",
    href: "/contact",
    label: "Ask about Raspberry Pi setup",
  },
];
const faqs = [
  {
    question: "Do I need a new TV?",
    answer:
      "Usually you can use an existing display with a compatible player. Check the TV’s inputs and your player’s app availability. A smart TV browser alone is not a guarantee that every content type will work.",
  },
  {
    question: "Does PiAds work on every smart TV?",
    answer:
      "Compatibility depends on the TV platform, browser, and available apps. If your TV cannot run a suitable player, a compatible external Fire TV or Android TV device is an option. Check its app-store listing before purchasing.",
  },
  {
    question: "Does the iPhone app play content on my TV?",
    answer:
      "The PiAds iPhone and iPad app is for managing screens, content, playlists, and schedules. A compatible player connected to your TV handles the display playback.",
  },
  {
    question: "Can PiAds play offline?",
    answer:
      "Players with offline caching can continue showing downloaded content. Initial setup, remote updates, and live online content need a connection. Browser and device capabilities vary.",
  },
  {
    question: "What resolution and video formats should I use?",
    answer:
      "Match your content to your display’s size and orientation, and follow the requirements shown when uploading or booking. Resolution, codec support, and smooth playback depend on the player hardware as well as the file; test on the actual device.",
  },
];

export default function DevicesPage() {
  return (
    <div>
      <JsonLd
        data={graph(
          faqPage(faqs),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Devices", path: "/devices" },
          ]),
        )}
      />
      <section className="container max-w-4xl py-20 md:py-28">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Choose your player
        </p>
        <h1 className="mb-7 font-display text-5xl md:text-7xl">
          Start with the TV you have.
        </h1>
        <p className="text-lg text-muted-foreground">{DEVICE_ANSWER}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Hardware and internet service are separate from your PiAds plan. Check
          current app-store compatibility before purchasing a device.
        </p>
      </section>
      <section className="container grid gap-6 pb-16 md:grid-cols-2">
        {players.map(({ icon: Icon, name, body, href, label, guide }) => (
          <article
            key={name}
            className="flex flex-col rounded-3xl border bg-white p-7 md:p-9"
          >
            <Icon className="mb-5 h-8 w-8" />
            <h2 className="mb-4 font-display text-3xl">{name}</h2>
            <p className="mb-6 text-muted-foreground">{body}</p>
            <div className="mt-auto flex flex-wrap gap-4">
              <Link
                className="font-semibold underline underline-offset-4"
                href={href}
              >
                {label}
              </Link>
              {guide && (
                <Link
                  className="font-semibold underline underline-offset-4"
                  href={guide}
                >
                  Setup details
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>
      <section className="bg-secondary/50 py-16">
        <div className="container max-w-4xl">
          <Smartphone className="mb-5 h-8 w-8" />
          <h2 className="mb-4 font-display text-4xl">
            Manage from your phone or tablet.
          </h2>
          <p className="mb-6 text-muted-foreground">
            Use the PiAds iPhone and iPad app to manage your screens, playlists,
            and schedules, including guest welcome content for short-term
            rentals. You can also manage your screens through the web dashboard.
          </p>
          <Button variant="outline" asChild>
            <Link href="https://apps.apple.com/us/app/piads/id6759892788">
              Get PiAds for iPhone & iPad
            </Link>
          </Button>
        </div>
      </section>
      <section className="container max-w-4xl py-16">
        <h2 className="mb-8 font-display text-4xl">Before you connect.</h2>
        <div className="divide-y rounded-3xl border bg-white px-6 md:px-9">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="py-6">
              <h3 className="text-lg font-semibold">{question}</h3>
              <p className="mt-3 text-muted-foreground">{answer}</p>
            </div>
          ))}
        </div>
        <Button className="mt-8" size="lg" asChild>
          <SignupLink href={`${APP_URL}/sign-up?role=venue_owner`}>
            Prepare your first screen <ArrowRight className="ml-2 h-4 w-4" />
          </SignupLink>
        </Button>
      </section>
    </div>
  );
}
