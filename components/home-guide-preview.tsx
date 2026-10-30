"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, FileText, Monitor, Smartphone } from "lucide-react";
import { BookCollection } from "@/app/(marketing)/airbnb-welcome-book-generator/sample-experience";
import { SAMPLE_STYLES, sampleBook, type SampleStyle } from "@/app/(marketing)/airbnb-welcome-book-generator/samples/sample-data";
import { DEMO_WELCOME } from "@/app/(marketing)/airbnb-welcome-book-generator/demo";
import { WelcomeScreen } from "./welcome-screen";
import { trackCta } from "@/lib/analytics";
import styles from "./home-guide-preview.module.css";

const GUIDE_URL = "/airbnb-welcome-book-generator";

export function HomeGuidePreview() {
  const [style, setStyle] = useState<SampleStyle>("forest");
  const [paused, setPaused] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectMotion = () => { if (preference.matches) setAutoRotate(false); };
    respectMotion();
    preference.addEventListener("change", respectMotion);
    return () => preference.removeEventListener("change", respectMotion);
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setStyle(current => SAMPLE_STYLES[(SAMPLE_STYLES.findIndex(item => item.key === current) + 1) % SAMPLE_STYLES.length].key);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [autoRotate]);
  const book = sampleBook(style);
  const selected = SAMPLE_STYLES.find(item => item.key === style)!;
  const phoneUrl = `${GUIDE_URL}/guest-demo?style=${style}`;

  return (
    <section id="experience" className={styles.section} aria-labelledby="guide-preview-title">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>01 / A LITTLE PREVIEW OF YOUR NEXT WELCOME</p>
        <h2 id="guide-preview-title">One thoughtful guide.<br /><em>Everywhere they feel at home.</em></h2>
        <p>A beautiful book to print. A little guide for their phone. A warm hello on the TV. Start free, and make it feel like your place.</p>
      </div>

      <div className={styles.showcase}>
        <div className={styles.collection} role="img" aria-label={`${selected.title}: matching printed welcome book and phone guide`}>
          <BookCollection style={style} />
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>YOUR PLACE HAS A PERSONALITY. SO SHOULD YOUR GUIDE.</p>
          <h3>Take a little look around.</h3>
          <div className={styles.styles} role="group" aria-label="Choose a preview style">
            {SAMPLE_STYLES.map(item => (
              <button key={item.key} type="button" aria-pressed={style === item.key} onClick={() => { setAutoRotate(false); setStyle(item.key); }}>
                <span className={styles.swatch} data-style={item.key} aria-hidden="true" />{item.title}
              </button>
            ))}
          </div>
          <div className={styles.rotationControl}>
            {autoRotate ? <button type="button" onClick={() => setAutoRotate(false)}>Pause style rotation</button> : <span>Your selected style stays in view.</span>}
          </div>
          <p className={styles.description}>{selected.description}</p>
          <ul className={styles.features}>
            <li><FileText size={22} /><div><strong>A complete welcome book</strong><span>Seven pages for arrival, Wi-Fi, house essentials, local favorites and checkout.</span></div></li>
            <li><Smartphone size={22} /><div><strong>A guide in their pocket</strong><span>Scan from the TV for Wi-Fi, house notes and local favorites in the same style.</span></div></li>
            <li><Monitor size={22} /><div><strong>A welcome on the big screen</strong><span>Bring your guide into PiAds and connect a TV when you’re ready.</span></div></li>
          </ul>
          <div className={styles.links}>
            <a href={`${GUIDE_URL}/samples?style=${style}`} onClick={() => trackCta("Browse the sample book", "homepage_preview", { style })}>Browse the sample book <ArrowUpRight size={16} /></a>
            <a href={phoneUrl} onClick={() => trackCta("Try the phone guide", "homepage_preview", { style })}>Try the phone guide <ArrowUpRight size={16} /></a>
          </div>
          <a className={styles.primary} href={GUIDE_URL} onClick={() => trackCta("Create your free welcome guide", "homepage_preview", { style })}>Create your free welcome guide <ArrowUpRight size={19} /></a>
          <p className={styles.note}><Check size={15} /> No account needed. Verify your email to get your PDF.</p>
        </div>
      </div>

      <div className={styles.tvStory}>
        <div className={styles.tvCopy}>
          <p className={styles.eyebrow}>FROM THEIR FIRST HELLO TO THEIR NEXT ADVENTURE</p>
          <h3>The TV welcomes.<br /><em>The guide goes with them.</em></h3>
          <p>A personal hello, checkout details and a scrolling row of local favorites. Try the QR code to open this sample on your phone.</p>
          <a href={phoneUrl}>Open the sample phone guide <ArrowUpRight size={16} /></a>
          <p className={styles.note}>The PDF is free. Live TV setup requires a PiAds account and a screen plan. <a href="/pricing">See screen options.</a></p>
        </div>
        <div className={styles.tvExample}>
          <div className={styles.tv}>
            <WelcomeScreen data={{ ...DEMO_WELCOME, property_name: book.propertyName, background_url: book.photo || null, picks: book.picks }} paused={paused} sampleGuideUrl={`https://www.piads.co${phoneUrl}`} />
          </div>
          <div className={styles.caption}>
            <span>Fictional property & local favorites · Real guide templates</span>
            <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Resume TV preview" : "Pause TV preview"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
