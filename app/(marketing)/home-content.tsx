"use client";

import { useRef, useState } from "react";
import { trackCta } from "@/lib/analytics";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Wifi,
  MapPin,
  Clock3,
  Monitor,
  Smartphone,
  Play,
  Home,
  ShieldCheck,
  Coffee,
  Sun,
  Plus,
  Minus,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import styles from "./stays.module.css";
import { CoastalHeroMedia } from "@/components/coastal-hero-media";
import { PortfolioSection } from "@/components/portfolio-section";
import { INDUSTRIES } from "@/lib/industries";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co";
const SIGN_UP = `${APP_URL}/sign-up?role=venue`;
const PHOTO = "/stays/coastal-retreat.webp";
const tabs = ["Welcome", "House guide", "Local favorites"] as const;
type ScreenTab = (typeof tabs)[number];

const faqs = [
  [
    "Will it work with the TV I already have?",
    "PiAds works with Fire TV Stick, Android TV, Google TV, Raspberry Pi, and supported browsers. Connect your device, open the player, and enter the pairing code in your PiAds dashboard. You can check the full device list before getting started.",
  ],
  [
    "Can my guests still watch their favorite shows?",
    "Yes. PiAds runs as an app on your device. Guests can switch to their usual streaming apps whenever they like. Their own streaming subscriptions and the device’s normal controls still apply.",
  ],
  [
    "Do I have to update it for every booking?",
    "You can save a standing welcome screen or personalize names, dates, and house details from your phone before each arrival. Changes appear on your connected screen when you save. Booking details are managed by you.",
  ],
  [
    "Can I manage more than one property?",
    "Yes. Your screens live together in one dashboard, with online status and content controls. Give each property its own welcome and local recommendations, and manage your portfolio from the same account.",
  ],
  [
    "How does the free plan work?",
    "Participating screens that enable approved marketplace ad slots can use PiAds for $0. You choose the ad inventory and approve each campaign, and keep 70% of cleared ad revenue. Earnings depend on campaigns, availability, and advertiser demand; revenue is not guaranteed. See the full pricing page for current plan details.",
  ],
  [
    "What happens if the internet drops?",
    "The player can continue showing cached content and sync again when connectivity returns. New changes and online content need a connection, so keep important house information in your saved screen content.",
  ],
];

export function HomeContent() {
  const [tab, setTab] = useState<ScreenTab>("Welcome");
  const [guest, setGuest] = useState("Maya & Jordan");
  const [property, setProperty] = useState("The Coastal House");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const changeTab = (index: number) => {
    setTab(tabs[index]);
    tabRefs.current[index]?.focus();
  };

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
            Turn every property’s TV into a personal welcome, a local guide, and
            your most thoughtful hosting touch. One stay or a whole portfolio.
          </p>
          <div className={styles.heroButtons}>
            <a className={styles.buttonLime} href={SIGN_UP} onClick={() => trackCta("Create your first welcome", "hero")}>
              Create your first welcome <ArrowUpRight size={19} />
            </a>
            <a className={styles.heroDemo} href="#experience" onClick={() => trackCta("See it in action", "hero")}>
              <span>
                <Play size={13} fill="currentColor" />
              </span>
              See it in action
            </a>
          </div>
          <p className={styles.heroNote}>
            <Check size={14} /> Your TV. Your content. No card required.
          </p>
        </div>
        <a
          className={styles.arrivalCard}
          href="#experience"
          aria-label="Explore the welcome screen demo"
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
                value="https://www.piads.co/digital-signage-for/short-term-rentals"
                size={45}
                fgColor="#183d32"
                title="Learn about PiAds for short-term rentals"
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

      <section
        className={`${styles.section} ${styles.experience}`}
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>01 / THE GUEST EXPERIENCE</p>
            <h2 id="experience-title">
              The little things.
              <br />
              <em>All taken care of.</em>
            </h2>
          </div>
          <p>
            A warm hello. The Wi-Fi password. That coffee spot only locals know.
            Everything guests need, right where they’ll see it.
          </p>
        </div>
        <div className={styles.experienceLayout}>
          <div className={styles.experienceControls}>
            <div
              className={styles.tabList}
              role="tablist"
              aria-label="Explore guest screen content"
              aria-orientation="vertical"
            >
              {tabs.map((item, index) => {
                const Icon = [Home, Wifi, MapPin][index];
                return (
                  <button
                    key={item}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    id={`guest-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={tab === item}
                    aria-controls="guest-screen"
                    tabIndex={tab === item ? 0 : -1}
                    className={`${styles.experienceTab} ${tab === item ? styles.tabActive : ""}`}
                    onClick={() => setTab(item)}
                    onKeyDown={(event) => {
                      if (
                        ["ArrowDown", "ArrowUp", "Home", "End"].includes(
                          event.key,
                        )
                      ) {
                        event.preventDefault();
                        changeTab(
                          event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? 2
                              : (index + (event.key === "ArrowDown" ? 1 : 2)) %
                                3,
                        );
                      }
                    }}
                  >
                    <Icon size={20} />
                    <span>
                      <strong>{item}</strong>
                      <small>
                        {
                          [
                            "A first impression that feels personal.",
                            "The answers, before they ask.",
                            "Your neighborhood. Their next discovery.",
                          ][index]
                        }
                      </small>
                    </span>
                    <ArrowUpRight size={17} />
                  </button>
                );
              })}
            </div>
            <div className={styles.personalize}>
              <span className={styles.tryLabel}>
                <span className={styles.liveDot} /> TRY YOUR OWN WELCOME
              </span>
              <label htmlFor="guest-name">Guest names</label>
              <input
                id="guest-name"
                value={guest}
                maxLength={32}
                onChange={(event) => setGuest(event.target.value)}
                placeholder="Maya & Jordan"
              />
              <label htmlFor="property-name">Property name</label>
              <input
                id="property-name"
                value={property}
                maxLength={32}
                onChange={(event) => setProperty(event.target.value)}
                placeholder="The Coastal House"
              />
              <p>Your edits appear in the example screen.</p>
            </div>
          </div>
          <div className={styles.demoWrap}>
            <div className={styles.demoToolbar}>
              <span>
                <span className={styles.liveDot} />{" "}
                {property.trim() || "Your property"}
              </span>
              <span>
                INTERACTIVE DEMO <Monitor size={15} />
              </span>
            </div>
            <div
              className={styles.guestScreen}
              id="guest-screen"
              role="tabpanel"
              aria-labelledby={`guest-tab-${tabs.indexOf(tab)}`}
              tabIndex={0}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTO}
                alt="Coastal retreat backdrop"
                width="1672"
                height="941"
                className={styles.screenPhoto}
              />
              <div className={styles.screenShade} />
              <div className={styles.screenHeader}>
                <span>{property.trim() || "Your property"}</span>
                <span>
                  <Sun size={16} /> MAKE YOURSELF AT HOME
                </span>
              </div>
              <div className={styles.screenContent} key={tab}>
                {tab === "Welcome" && (
                  <>
                    <span className={styles.screenEyebrow}>
                      YOUR STAY STARTS HERE
                    </span>
                    <h3>
                      Welcome,
                      <br />
                      <em>{guest.trim() || "lovely guests"}.</em>
                    </h3>
                    <p>
                      Drop your bags. Take a breath.
                      <br />
                      We’re so happy you’re here.
                    </p>
                    <div className={styles.screenPills}>
                      <span>
                        <Wifi size={15} /> Wi-Fi ready
                      </span>
                      <span>
                        <Clock3 size={15} /> Check-out at 11 AM
                      </span>
                    </div>
                  </>
                )}
                {tab === "House guide" && (
                  <>
                    <span className={styles.screenEyebrow}>
                      SETTLE RIGHT IN
                    </span>
                    <h3>
                      A few little
                      <br />
                      <em>things to know.</em>
                    </h3>
                    <div className={styles.houseNotes}>
                      <div>
                        <Wifi size={20} />
                        <span>
                          Wi-Fi network<strong>CoastalHouse_Guest</strong>
                        </span>
                      </div>
                      <div>
                        <Clock3 size={20} />
                        <span>
                          Check-out
                          <strong>11:00 AM · Leave keys on the table</strong>
                        </span>
                      </div>
                      <div>
                        <Home size={20} />
                        <span>
                          Quiet hours<strong>10:00 PM – 8:00 AM</strong>
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {tab === "Local favorites" && (
                  <>
                    <span className={styles.screenEyebrow}>
                      A LITTLE LOCAL KNOWLEDGE
                    </span>
                    <h3>
                      Go where
                      <br />
                      <em>the locals go.</em>
                    </h3>
                    <div className={styles.localPicks}>
                      <div>
                        <Coffee size={22} />
                        <span>
                          Morning coffee
                          <strong>The little café on the corner</strong>
                          <small>5-minute walk · Host’s pick</small>
                        </span>
                      </div>
                      <div>
                        <Sun size={22} />
                        <span>
                          Your sunset spot<strong>The west-facing beach</strong>
                          <small>12-minute walk · Bring a blanket</small>
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.screenBottom}>
                <span>CURATED BY YOUR HOST</span>
                <span>
                  Powered by <strong>piads</strong>
                </span>
              </div>
              {tab === "Welcome" && (
                <a
                  className={styles.screenQr}
                  href="/digital-signage-for/short-term-rentals"
                  aria-label="Learn how the PiAds guest guide works"
                >
                  <QRCodeSVG
                    value="https://www.piads.co/digital-signage-for/short-term-rentals"
                    size={62}
                    fgColor="#173d32"
                    title="PiAds guest guide information"
                  />
                  <span>Explore PiAds</span>
                </a>
              )}
            </div>
            <div className={styles.demoFootnote}>
              <span>
                Example guest screen · Your names, your place, your style.
              </span>
              <span>
                <Smartphone size={14} /> Update from anywhere
              </span>
            </div>
          </div>
        </div>
      </section>

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
                You choose the content and approve every ad. Guests can switch
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
              icon: Monitor,
              title: "Connect your TV",
              text: "Open PiAds on a supported device. Enter the pairing code, and your screen is ready.",
            },
            {
              icon: Home,
              title: "Make it feel like you",
              text: "Add your welcome, Wi-Fi, house notes, and favorite local spots. Give every stay its own personality.",
            },
            {
              icon: Check,
              title: "Put your welcome to work",
              text: "Publish to your screen. Refresh it for new guests, and add approved local offers when you choose.",
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
            Enable approved marketplace ad slots, use PiAds free, and keep 70%
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
          <p>With approved marketplace ad slots.</p>
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
              <Check size={17} /> You approve every campaign
            </li>
            <li>
              <Check size={17} /> You choose when ads run
            </li>
            <li>
              <Check size={17} /> Your own content stays the priority
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
          {faqs.map(([question, answer], index) => (
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
                {index === 0 && (
                  <a href="/devices">
                    See supported devices <ArrowUpRight size={14} />
                  </a>
                )}
                {index === 4 && (
                  <a href="/pricing">
                    View pricing <ArrowUpRight size={14} />
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
        <a className={styles.buttonDark} href={SIGN_UP}>
          Make your first welcome <ArrowUpRight size={19} />
        </a>
        <p className={styles.ctaNote}>Start with the TV you already have.</p>
      </section>
    </div>
  );
}
