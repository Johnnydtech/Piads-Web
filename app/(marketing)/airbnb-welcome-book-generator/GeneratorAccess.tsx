"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, X } from "lucide-react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import styles from "./generator.module.css";
import access from "./access.module.css";
import { SAMPLE_STYLES, type SampleStyle } from "./samples/sample-data";
const API = (process.env.NEXT_PUBLIC_API_URL || "https://api.piads.co").replace(/\/$/, "");
export async function generatorRequest(path: string, init: RequestInit) {
  const response = await fetch(`${API}/api/v1/guests/generator/${path}`, init);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) { const error = new Error(body?.detail?.message || "We couldn’t complete that request. Please try again."); Object.assign(error, { status: response.status }); throw error; }
  return body.data;
}
export default function GeneratorAccess({ open, onClose, onVerified, sampleStyle }: {
  sampleStyle?: SampleStyle;
  open: boolean; onClose: () => void; onVerified: (token: string, email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [session, setSession] = useState("");
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [reset, setReset] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError("");
    try {
      if (!session) {
        const data = await generatorRequest("contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), phone: phone.trim(), turnstile_token: captcha }) });
        setSession(data.token);
      } else {
        await generatorRequest("verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: session, code, sample_style: sampleStyle }) });
        onVerified(session, email.trim());
      }
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); }
    finally { setBusy(false); setCaptcha(null); setReset(n => n + 1); }
  }
  return <Dialog.Root open={open} onOpenChange={value => !value && !busy && onClose()}><Dialog.Portal>
    <Dialog.Overlay className={access.overlay} />
    <Dialog.Content className={access.dialog}>
      <Dialog.Close className={access.close} aria-label="Close" disabled={busy}><X size={20} /></Dialog.Close>
      <span className={access.eyebrow}>{sampleStyle ? "YOUR SAMPLE, DELIVERED" : "YOUR GUIDE, DELIVERED"}</span>
      <Dialog.Title>{session ? "Check your inbox" : sampleStyle ? "Where should we send your sample?" : "Where should we send your guide?"}</Dialog.Title>
      <Dialog.Description>{session ? `Enter the six-digit code we sent to ${email}. It expires in 15 minutes.` : sampleStyle ? `We’ll email the complete ${SAMPLE_STYLES.find(s => s.key === sampleStyle)?.title} sample PDF. Add your email and phone, then verify your email. No PiAds account needed.` : "Add your email and phone to unlock your free AI artwork and receive your download link. No PiAds account needed."}</Dialog.Description>
      <form onSubmit={submit}>
        {session ? <label>Verification code<input autoFocus inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ""))} required /></label> : <>
          <label>Email<input autoFocus type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required maxLength={254} /></label>
          <label>Phone<input type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} required maxLength={32} placeholder="+1 (555) 123-4567" /></label>
          <p className={access.note}>{sampleStyle ? "We save your email and phone with your sample request. We’ll send a private download link after verification. This does not subscribe you to marketing emails, calls or texts." : "We’ll email your download link. Your phone helps us limit free artwork to one per person; it does not subscribe you to calls or texts."} <a href="/privacy" target="_blank" rel="noreferrer">Privacy policy</a></p>
          <TurnstileWidget key={reset} onToken={setCaptcha} />
        </>}
        {error && <p role="alert" className={styles.error}>{error}</p>}
        <button type="submit" className={styles.primary} disabled={busy || (!session && !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !captcha)}>{busy && <Loader2 size={18} className={styles.spin} />}{session ? "Verify & continue" : "Send verification code"}</button>
        {session && <button className={styles.textButton} type="button" disabled={busy} onClick={() => { setSession(""); setCode(""); setError(""); }}>Change details or request a new code</button>}
      </form>
    </Dialog.Content>
  </Dialog.Portal></Dialog.Root>;
}
