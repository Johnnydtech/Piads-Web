"use client";

import { ArrowRight, Check, Loader2, Mail, MapPin } from "lucide-react";
import { BookCollection } from "./sample-experience";
import { BOOK_THEMES, type BookTheme } from "./kit";
import { TurnstileWidget } from "@/components/turnstile-widget";
import s from "./splash.module.css";

const LISTING_IMPORT = process.env.NEXT_PUBLIC_GUEST_LISTING_IMPORT_ENABLED === "true";

type Props = {
  listingAuthorized: boolean; onListingAuthorized: (value: boolean) => void;
  address: string; email: string; theme: BookTheme; busy: boolean; error: string;
  onAddress: (value: string) => void; onEmail: (value: string) => void;
  onTheme: (value: BookTheme) => void; onSubmit: (event: React.FormEvent) => void;
  onToken: (value: string | null) => void; captchaReset: number;
};

export default function GuideSplash(p: Props) {
  const isListing = LISTING_IMPORT && /:\/\/|^(www\.|airbnb\.)/i.test(p.address.trim());
  return <section className={s.splash} aria-labelledby="generator-title">
    <div className={s.copy}>
      <p className={s.eyebrow}>FREE AIRBNB & SHORT-TERM RENTAL GUIDE</p>
      <h1 id="generator-title">Get your free<br/><em>Airbnb welcome guide.</em></h1>
      <p className={s.intro}>{LISTING_IMPORT ? "Copy and paste your Airbnb listing link, or enter your full rental address. Pick a style. We’ll add nearby places for your guests." : "Enter your address. Pick a style. Get a ready-to-download PDF with local places already added."}</p>
      <form onSubmit={p.onSubmit} className={s.form}>
        <fieldset disabled={p.busy}>
          <legend className="sr-only">Create your free welcome guide</legend>
          <label className={s.label}>{LISTING_IMPORT ? "Airbnb listing link or street address" : "Rental address"}
            <span className={s.input}><MapPin size={18} aria-hidden/><input name="address" type="text" inputMode="text" enterKeyHint="next" autoCapitalize={LISTING_IMPORT ? "none" : "words"} spellCheck={false} autoComplete="street-address" required minLength={3} maxLength={LISTING_IMPORT ? 2048 : 200} placeholder={LISTING_IMPORT ? "Paste an Airbnb link or type a full address" : "Street address, city and state"} aria-describedby={LISTING_IMPORT ? "listing-source-help" : undefined} value={p.address} onChange={e => p.onAddress(e.target.value)} /></span>
          </label>
          {LISTING_IMPORT && <p id="listing-source-help" className={s.sourceHelp}>Airbnb link: imports your listing photos and details.<br/>Street address: creates a guide with nearby recommendations; add your property photos anytime.</p>}
          {isListing && <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, lineHeight: 1.5 }}>
            <input type="checkbox" required checked={p.listingAuthorized} onChange={e => p.onListingAuthorized(e.target.checked)} style={{ marginTop: 3, flexShrink: 0 }}/>
            <span>I manage this property and have permission to use its listing text and photos.</span>
          </label>}
          <fieldset className={s.styles}>
            <legend>Choose your style</legend>
            <div>{BOOK_THEMES.map(theme => <label key={theme.key} data-selected={p.theme === theme.key}>
              <input type="radio" name="guide-style" value={theme.key} checked={p.theme === theme.key} onChange={() => p.onTheme(theme.key)} />
              <span className={s.swatch} style={{ background: theme.paper, color: theme.ink }} aria-hidden>Aa</span>
              <span>{theme.name}</span>{p.theme === theme.key && <Check size={13} aria-hidden/>}
            </label>)}</div>
          </fieldset>
          <label className={s.label}>Email for your free guide
            <span className={s.input}><Mail size={18} aria-hidden/><input name="email" type="email" inputMode="email" autoComplete="email" enterKeyHint="go" required maxLength={254} placeholder="you@example.com" value={p.email} onChange={e => p.onEmail(e.target.value)} /></span>
          </label>
          <TurnstileWidget onToken={p.onToken} resetKey={p.captchaReset}/>
          <button className={s.submit} type="submit" disabled={p.busy}>{p.busy ? <><Loader2 size={18} className={s.spin}/> Creating your guide…</> : <>Create & email my free guide <ArrowRight size={18}/></>}</button>
        </fieldset>
        {p.error && <p className={s.error} role="alert">{p.error}</p>}
        {p.busy && <p className={s.note} role="status">{isListing ? "Importing your property photos and details, then finding nearby favorites. This can take up to two minutes." : "Finding your location and nearby favorites. Keep this page open."}</p>}
        <p className={s.note}>No account. No card. Verify your email to get your download.<br/>Edit anything afterward. Wi-Fi and private house details are optional.</p>
      </form>
    </div>
    <figure className={s.product}>
      <div className={s.productLabel}>YOUR GUIDE, IN YOUR STYLE</div>
      <BookCollection style={p.theme}/>
      <figcaption>Style example with optional artwork and Wi-Fi details.<br/>{LISTING_IMPORT ? "Your listing or address makes it yours, with places to explore nearby." : "Your guide starts with your address and nearby places."}</figcaption>
    </figure>
  </section>;
}
