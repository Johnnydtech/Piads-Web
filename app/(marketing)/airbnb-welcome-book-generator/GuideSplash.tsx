"use client";

import { ArrowRight, Check, Loader2, Mail, MapPin } from "lucide-react";
import { BookCollection } from "./sample-experience";
import { BOOK_THEMES, type BookTheme } from "./kit";
import { TurnstileWidget } from "@/components/turnstile-widget";
import s from "./splash.module.css";

type Props = {
  address: string; email: string; theme: BookTheme; busy: boolean; error: string;
  onAddress: (value: string) => void; onEmail: (value: string) => void;
  onTheme: (value: BookTheme) => void; onSubmit: (event: React.FormEvent) => void;
  onToken: (value: string | null) => void; captchaReset: number;
};

export default function GuideSplash(p: Props) {
  return <section className={s.splash} aria-labelledby="generator-title">
    <div className={s.copy}>
      <p className={s.eyebrow}>FREE AIRBNB & SHORT-TERM RENTAL GUIDE</p>
      <h1 id="generator-title">Get your free<br/><em>Airbnb welcome guide.</em></h1>
      <p className={s.intro}>Enter your address. Pick a style. Get a ready-to-download PDF with local places already added.</p>
      <form onSubmit={p.onSubmit} className={s.form}>
        <fieldset disabled={p.busy}>
          <legend className="sr-only">Create your free welcome guide</legend>
          <label className={s.label}>Rental address
            <span className={s.input}><MapPin size={18} aria-hidden/><input name="address" type="text" inputMode="text" enterKeyHint="next" autoCapitalize="words" spellCheck={false} autoComplete="street-address" required minLength={3} maxLength={200} placeholder="Street address, city and state" value={p.address} onChange={e => p.onAddress(e.target.value)} /></span>
          </label>
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
        {p.busy && <p className={s.note} role="status">Finding your location and nearby favorites. Keep this page open.</p>}
        <p className={s.note}>No account. No card. Verify your email to get your download.<br/>Edit anything afterward. Wi-Fi and private house details are optional.</p>
      </form>
    </div>
    <figure className={s.product}>
      <div className={s.productLabel}>YOUR GUIDE, IN YOUR STYLE</div>
      <BookCollection style={p.theme}/>
      <figcaption>Style example with optional artwork and Wi-Fi details.<br/>Your guide starts with your address and nearby places.</figcaption>
    </figure>
  </section>;
}
