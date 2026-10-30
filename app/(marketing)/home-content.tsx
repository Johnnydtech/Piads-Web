"use client";

import { useState } from "react";
import { trackCta } from "@/lib/analytics";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Wifi,
  MapPin,
  Monitor,
  Smartphone,
  Play,
  Home,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import styles from "./stays.module.css";
import { CoastalHeroMedia } from "@/components/coastal-hero-media";
import { PortfolioSection } from "@/components/portfolio-section";
import { INDUSTRIES } from "@/lib/industries";
import { HomeGuidePreview } from "@/components/home-guide-preview";
import { PRODUCT_FAQS } from "@/lib/product-answers";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co";
const SIGN_UP = `${APP_URL}/sign-up?role=venue_owner`;
const GUIDE_URL = "/airbnb-welcome-book-generator";

export function HomeContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className={styles.site} id="top">
      <section className={styles.hero} aria-labelledby="hero-title">
        <CoastalHeroMedia />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <span className={styles.liveDot} /> FOR HOSTS & PROPERTY MANAGERS
          </p>
          <h1 id="hero-title">
            A better stay
            <br />
            starts with <em>hello.</em>
          </h1>
          <p className={styles.heroDescription}>
            PiAds turns your TVs into digital guest welcome screens, with house
            guides and local recommendations. Manage one stay or a whole
            portfolio from one simple dashboard.
          </p>
          <div className={styles.heroButtons}>
            <a className={styles.buttonLime} href={GUIDE_URL} onClick={() => trackCta("Create your free welcome guide", "hero")}>
              Create your free welcome guide <ArrowUpRight size={19} />
            </a>
            <a className={styles.heroDemo} href="#experience" onClick={() => trackCta("See it in action", "hero")}>
              <span>
                <Play size={13} fill="currentColor" />
              </span>
              See it in action
            </a>
          </div>
          <p className={styles.heroNote}>
            <Check size={14} /> Free guide. No account needed. Connect a TV when you’re ready.
          </p>
        </div>
        <a
          className={styles.arrivalCard}
          href="#experience"
          aria-label="Explore the welcome guide preview"
        >
          <div className={styles.arrivalTop}>
            <span>
              <span className={styles.liveDot} /> A LITTLE PREVIEW
            </span>
            <ArrowUpRight size={18} />
          </div>
          <p>
            Make yourself
            <br />
            <em>right at home.</em>
          </p>
          <div className={styles.arrivalBottom}>
            <div>
              <Wifi size={18} />
              <span>
                Wi-Fi, house notes
                <br />& your local favorites
              </span>
            </div>
            <div className={styles.miniQr}>
              <QRCodeSVG
                value="https://www.piads.co/airbnb-welcome-book-generator/guest-demo?style=forest"
                size={45}
                fgColor="#183d32"
                title="Open the sample phone guide"
              />
            </div>
          </div>
        </a>
        <div className={styles.heroCaption}>
          <MapPin size={13} /> A better guest experience, wherever you host.
        </div>
        <a
          href="#experience"
          className={styles.scrollCue}
          aria-label="Scroll to explore"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown size={18} />
        </a>
      </section>

      <div className={styles.compatibility}>
        <span>
          Great hospitality.
          <br />
          <strong>On the TV you already own.</strong>
        </span>
        <div>
          <Monitor size={23} /> Fire TV
        </div>
        <div>
          <Play size={21} /> Android TV
        </div>
        <div>
          <Monitor size={23} /> Google TV
        </div>
        <div>
          <span className={styles.piSymbol}>π</span> Raspberry Pi
        </div>
        <a href="/devices">
          And your browser <ArrowUpRight size={16} />
        </a>
      </div>

      <HomeGuidePreview />

      <PortfolioSection />
      <section
        className={styles.hostingSection}
        id="for-hosts"
        aria-labelledby="hosting-title"
      >
        <div className={styles.hostingIntro}>
          <p className={styles.kicker}>MADE FOR THE WAY YOU HOST</p>
          <h2 id="hosting-title">
            Less managing.
            <br />
            <em>More hosting.</em>
          </h2>
          <p>
            One welcoming cabin or a whole collection of stays. Give every
            property the personal touch, without being everywhere at once.
          </p>
          <a className={styles.textLink} href={SIGN_UP}>
            Meet your new hosting sidekick <ArrowUpRight size={19} />
          </a>
        </div>
        <div className={styles.hostingGrid}>
          <article>
            <span className={styles.featureIcon}>
              <Smartphone />
            </span>
            <h3>
              A fresh welcome.
              <br />
              Before every arrival.
            </h3>
            <p>
              Change guest names and house details from your phone. Save, and
              your connected screen updates.
            </p>
            <div className={styles.updateChip}>
              <Check size={15} />
              <span>New guests. Same thoughtful welcome.</span>
            </div>
          </article>
          <article>
            <span className={styles.featureIcon}>
              <Monitor />
            </span>
            <h3>
              Every property.
              <br />
              One place.
            </h3>
            <p>
              Manage screens, playlists, and schedules from a single dashboard,
              wherever your next check-in takes you.
            </p>
            <div className={styles.propertyRows}>
              <div>
                <span>
                  <span className={styles.liveDot} /> The Coastal House
                </span>
                <small>Online</small>
              </div>
              <div>
                <span>
                  <span className={styles.liveDot} /> The Woodland Cabin
                </span>
                <small>Online</small>
              </div>
              <span className={styles.exampleLabel}>Example properties</span>
            </div>
          </article>
          <article className={styles.wideFeature}>
            <ShieldCheck size={26} />
            <div>
              <h3>Your space. Your standards.</h3>
              <p>
                You choose your content and ad approval settings. Guests can switch
                to their favorite streaming apps whenever they’re ready.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.setup}`}
        id="how-it-works"
        aria-labelledby="setup-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>02 / FROM TV TO THOUGHTFUL</p>
            <h2 id="setup-title">
              Ready before
              <br />
              <em>they check in.</em>
            </h2>
          </div>
          <a className={styles.buttonOutline} href="/get-started">
            See the setup guide <ArrowUpRight size={18} />
          </a>
        </div>
        <div className={styles.steps}>
          {[
            {
              icon: Home,
              title: "Tell us about your space",
              text: "Create your account and enter your space details. PiAds prepares your first screen and starter playlist.",
            },
            {
              icon: Check,
              title: "Make it feel like you",
              text: "Add your welcome, Wi-Fi, house notes, and favorite local spots. Use Play preview to check it in your dashboard.",
            },
            {
              icon: Monitor,
              title: "Connect your TV",
              text: "Open the player on a supported device. Choose Connect to TV in your dashboard and enter the player's pairing code.",
            },
          ].map((step, index) => (
            <article key={step.title}>
              <div className={styles.stepTop}>
                <span>0{index + 1}</span>
                <step.icon size={25} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.revenue}
        id="pricing"
        aria-labelledby="revenue-title"
      >
        <div className={styles.revenueCopy}>
          <p className={styles.kicker}>03 / A LITTLE EXTRA FROM EVERY SCREEN</p>
          <h2 id="revenue-title">
            Good for your guests.
            <br />
            <em>Good for your business.</em>
          </h2>
          <p>
            Introduce guests to local businesses you’re happy to recommend.
            Offer qualifying marketplace ad slots, use PiAds free, and keep 70%
            of cleared ad revenue.
          </p>
          <a className={styles.buttonLime} href={SIGN_UP}>
            Put your screen to work <ArrowUpRight size={19} />
          </a>
          <a className={styles.revenueDetails} href="/pricing">
            Explore all pricing options <ArrowUpRight size={15} />
          </a>
        </div>
        <div className={styles.revenueCard}>
          <div className={styles.revenueCardTop}>
            <span>THE PARTNER PLAN</span>
            <ShieldCheck size={21} />
          </div>
          <div className={styles.price}>
            $0<span>/ participating screen</span>
          </div>
          <p>With qualifying marketplace ad slots.</p>
          <div className={styles.revenueSplit}>
            <span>You keep</span>
            <strong>
              70<em>%</em>
            </strong>
          </div>
          <div className={styles.splitBar}>
            <span />
            <span />
          </div>
          <div className={styles.splitLabels}>
            <span>
              <i /> Your venue · 70%
            </span>
            <span>
              <i /> PiAds · 30%
            </span>
          </div>
          <ul>
            <li>
              <Check size={17} /> Manual approval or optional Instant Book
            </li>
            <li>
              <Check size={17} /> You choose when ads run
            </li>
            <li>
              <Check size={17} /> Schedule ads alongside your content
            </li>
          </ul>
          <small>
            Revenue depends on approved campaigns, availability, and advertiser
            demand. Earnings aren’t guaranteed.
          </small>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.faq}`}
        aria-labelledby="faq-title"
      >
        <div>
          <p className={styles.kicker}>A FEW THINGS YOU MIGHT BE WONDERING</p>
          <h2 id="faq-title">
            Good questions.
            <br />
            <em>Straight answers.</em>
          </h2>
          <a className={styles.textLink} href="/contact">
            Talk to a real person <ArrowUpRight size={18} />
          </a>
        </div>
        <div className={styles.faqItems}>
          {PRODUCT_FAQS.map(({ question, answer, href, linkLabel }, index) => (
            <div className={styles.faqItem} key={question}>
              <h3>
                <button
                  type="button"
                  id={`question-${index}`}
                  aria-expanded={openFaq === index}
                  aria-controls={`answer-${index}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {question}
                  {openFaq === index ? <Minus size={19} /> : <Plus size={19} />}
                </button>
              </h3>
              <div
                id={`answer-${index}`}
                role="region"
                aria-labelledby={`question-${index}`}
                hidden={openFaq !== index}
              >
                <p>{answer}</p>
                {href && (
                  <a href={href}>
                    {linkLabel} <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.allSpaces}`}
        aria-labelledby="all-spaces-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>
              MORE SPACES. THE SAME PERSONAL TOUCH.
            </p>
            <h2 id="all-spaces-title">
              Wherever people gather,
              <br />
              <em>make your screen matter.</em>
            </h2>
          </div>
          <a className={styles.buttonOutline} href="/digital-signage-for">
            Explore all use cases <ArrowUpRight size={18} />
          </a>
        </div>
        <div className={styles.spaceLinks}>
          {INDUSTRIES.map((ind) => (
            <a href={`/digital-signage-for/${ind.slug}`} key={ind.slug}>
              <span>{ind.name}</span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
        <a className={styles.textLink} href="/alternative-to">
          See how PiAds compares <ArrowUpRight size={18} />
        </a>
      </section>
      <section className={styles.finalCta}>
        <span className={styles.ctaIcon}>
          <Monitor size={28} />
        </span>
        <p className={styles.kicker}>THE NEXT CHECK-IN COULD FEEL DIFFERENT</p>
        <h2>
          They’ll remember
          <br />
          <em>how you made them feel.</em>
        </h2>
        <a className={styles.buttonDark} href={GUIDE_URL} onClick={() => trackCta("Create your free welcome guide", "homepage_footer")}>
          Create your free welcome guide <ArrowUpRight size={19} />
        </a>
        <p className={styles.ctaNote}>Start with a free guide. Bring it to your TV when you’re ready.</p>
      </section>
    </div>
  );
}
