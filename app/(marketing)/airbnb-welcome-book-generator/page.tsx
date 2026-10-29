import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { JsonLd, graph, faqPage, breadcrumbs } from '@/components/seo/json-ld'
import { SignupLink } from '@/components/signup-link'
import { hostSignupUrl } from '@/lib/signup-links'
import { SITE_URL } from '@/lib/site'
import { WelcomeBookGenerator } from './generator'
import styles from './generator.module.css'

const PATH = '/airbnb-welcome-book-generator'

export const metadata: Metadata = {
  title: 'Free Airbnb Welcome Book Generator (TV-Ready)',
  description:
    'Type your rental’s address and get a TV welcome screen plus a free printable host starter kit: Wi-Fi sign with QR code, checkout card, local guide and guest messages. Free, no signup.',
  alternates: { canonical: PATH },
  openGraph: {
    title: 'Free Airbnb Welcome Book Generator',
    description: 'Your address in, a TV-ready welcome book out. Real local picks with today’s hours. Free, no signup.',
    url: PATH,
  },
}

const FAQS = [
  {
    question: 'Is the welcome book generator really free?',
    answer:
      'Yes. Generating, editing and downloading your welcome screen and starter kit is free and needs no account. If you want it on your TV and keeping itself current, PiAds is free for hosts who enable approved local ad slots, or $10 per screen per month without ads.',
  },
  {
    question: 'What is in the free host starter kit?',
    answer:
      'A customizable guest book with three coordinated styles: a welcome cover, arrival and host contact details, a Wi-Fi sign with a working QR code, house guidance and rules, local places with Google Maps links, and checkout steps. Choose your pages and download in Letter or A4. Copyable host messages and a TV-sized welcome image are also included.',
  },
  {
    question: 'Is my Wi-Fi password safe?',
    answer:
      'Your Wi-Fi password and your photo never leave your device. The kit is built in your browser and downloaded straight to you; PiAds never receives either one.',
  },
  {
    question: 'Where do the local recommendations come from?',
    answer:
      'Google Maps. We look near your address for the best-rated coffee, restaurants, bars and things to do: four stars and up, enough reviews to trust the rating, and a photo. Hours are shown when available and may change. Review the suggestions, search by business name to add your own favorites, and keep up to 12 places. You can remove suggestions or restore them later.',
  },
  {
    question: 'How do I get it onto my TV?',
    answer:
      'Two ways. Download the image and show it from a USB stick or your TV’s photo app. That works on almost any TV, but it is a still picture you update by hand. Or put it on PiAds: the screen updates itself, greets each guest by name, and shows a QR code guests scan for your Wi-Fi and house guide.',
  },
  {
    question: 'Which TVs does PiAds work with?',
    answer:
      'PiAds runs on Fire TV, Android and Google TV, and any TV with a web browser. Most hosts use a streaming stick that is already plugged into the TV.',
  },
  {
    question: 'Do you save my address?',
    answer:
      'We use your address to find nearby places. Your guide is kept in this browser tab for up to one hour so you can edit it. Choosing Continue with my guide sends the property details and selected places to PiAds for you to confirm during signup. Requesting setup help is optional; downloads do not require contact details.',
  },
  {
    question: 'Why a TV instead of a printed welcome book?',
    answer:
      'Guests rarely open the binder on the counter or the PDF in the booking app. The TV is the first screen they look at when they walk in, so the Wi-Fi, checkout time and your favorite spots are in front of them before they think to ask.',
  },
]

export default function WelcomeBookGeneratorPage() {
  return (
    <div className={styles.page}>
      <JsonLd
        data={graph(
          faqPage(FAQS),
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Airbnb welcome book generator', path: PATH },
          ]),
          {
            '@type': 'WebApplication',
            name: 'Airbnb Welcome Book Generator',
            url: `${SITE_URL}${PATH}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            publisher: { '@id': `${SITE_URL}/#organization` },
          }
        )}
      />

      <WelcomeBookGenerator />

      <section className={styles.section} aria-labelledby="how-title">
        <div className={styles.sectionInner}>
          <p className={styles.kicker}>How it works</p>
          <h2 id="how-title" className={styles.sectionTitle}>
            From an address to a welcome screen, <em>without the busywork.</em>
          </h2>
          <ol className={styles.steps}>
            <li className={styles.step}>
              <span className={styles.stepNumber}>1</span>
              <h3>Type your address</h3>
              <p>Just the street and city of your rental. Nothing to sign up for.</p>
            </li>
            <li className={styles.step}>
              <span className={styles.stepNumber}>2</span>
              <h3>See your welcome</h3>
              <p>See your finished TV welcome and nearby recommendations. Personalize it if you like, or use it as it is.</p>
            </li>
            <li className={styles.step}>
              <span className={styles.stepNumber}>3</span>
              <h3>Put it on your TV</h3>
              <p>Create your account with your welcome already prepared, then enter the code from your TV. A free download is always available too.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="why-title">
        <div className={`${styles.sectionInner} ${styles.why}`}>
          <div>
            <p className={styles.kicker}>Why the TV</p>
            <h2 id="why-title" className={styles.sectionTitle}>
              A welcome book your guests <em>actually see.</em>
            </h2>
            <p>
              The questions hosts answer most, the Wi-Fi password, checkout time, where to get coffee, are already
              written down somewhere. The problem is where. A binder on the counter and a link in the booking app
              both wait for the guest to go looking. The TV doesn’t.
            </p>
          </div>
          <ul className={styles.compare}>
            <li>
              <strong>Printed welcome book</strong>
              <span>Looks nice, gets skipped, and goes stale the day a café changes its hours.</span>
            </li>
            <li>
              <strong>PDF or link in the app</strong>
              <span>Sent days before arrival and buried under the rest of the conversation.</span>
            </li>
            <li className={styles.compareWinner}>
              <strong>The TV, with PiAds</strong>
              <span>On when they walk in, greets them by name, and keeps today’s hours current on its own.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="faq-title">
        <div className={styles.sectionInner}>
          <p className={styles.kicker}>Questions</p>
          <h2 id="faq-title" className={styles.sectionTitle}>
            Welcome book generator FAQ
          </h2>
          <div className={styles.faq}>
            {FAQS.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>
          Put it on your TV <em>today.</em>
        </h2>
        <p>Pair the stick that’s already in your TV, and your welcome screen greets the next guest by name.</p>
        <SignupLink
          href={hostSignupUrl(process.env.NEXT_PUBLIC_APP_URL || 'https://app.piads.co', 'short_term_rental')}
          className={styles.finalButton}
        >
          Create your welcome screen <ArrowUpRight size={18} aria-hidden />
        </SignupLink>
      </section>
    </div>
  )
}
