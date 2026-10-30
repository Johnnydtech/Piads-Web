"use client";

import { ArrowUpRight, FileText, Monitor } from "lucide-react";
import { trackCta } from "@/lib/analytics";
import styles from "./portfolio-section.module.css";

export function PortfolioSection() {
  return (
    <section id="property-managers" className={styles.section} aria-labelledby="portfolio-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>ONE HOME OR A WHOLE COLLECTION</p>
        <h2 id="portfolio-title">Start with one guide.<br /><em>Make every stay yours.</em></h2>
        <p>Try it with your next arrival. Create a guide that feels like your place, then bring it into PiAds when you’re ready to welcome guests on the TV.</p>
        <p>Managing more than one property? Keep each home’s welcome, Wi-Fi and local favorites personal, while managing your screens from one dashboard.</p>
        <a className={styles.contact} href="/contact" onClick={() => trackCta("Talk about your properties", "homepage_portfolio")}>Managing several properties? Let’s talk <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
      <div className={styles.options}>
        <article className={styles.guide}>
          <div className={styles.cardTop}><FileText size={22} aria-hidden="true" /><span>START HERE · FREE</span></div>
          <h3>Your place, in a little book.</h3>
          <p>Add your address, choose a style and make the details yours. Verify your email to receive the finished PDF, with a Wi-Fi QR code for your guests.</p>
          <a className={styles.primary} href="/airbnb-welcome-book-generator" onClick={() => trackCta("Create Free with Piads", "homepage_portfolio")}>Create Free with Piads <ArrowUpRight size={18} aria-hidden="true" /></a>
          <span className={styles.note}>No PiAds account or TV required.</span>
        </article>
        <article className={styles.tv}>
          <div className={styles.cardTop}><Monitor size={22} aria-hidden="true" /><span>WHEN YOU’RE READY · CONNECT A TV</span></div>
          <h3>Let the welcome come to life.</h3>
          <p>Bring your guide into your PiAds account. Pair a supported TV, share the phone guide through its QR code, and update guest details between stays.</p>
          <a className={styles.textLink} href="/pricing" onClick={() => trackCta("Explore screen plans", "homepage_portfolio")}>Explore screen plans <ArrowUpRight size={18} aria-hidden="true" /></a>
          <span className={styles.note}>Live TV service uses a PiAds screen plan.</span>
        </article>
      </div>
    </section>
  );
}
