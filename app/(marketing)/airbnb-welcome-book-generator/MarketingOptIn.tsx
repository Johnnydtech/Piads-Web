"use client";
export const GUIDE_EMAIL_CONSENT = "Send me occasional PiAds tips and updates. Unsubscribe anytime.";
export default function MarketingOptIn({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, lineHeight: 1.5, fontWeight: 400, color: "#52665c", margin: "12px 0" }}>
    <input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} style={{ width: 18, height: 18, minWidth: 18, marginTop: 2, padding: 0, accentColor: "#173f33" }} />
    <span>{GUIDE_EMAIL_CONSENT} <a href="/privacy" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Privacy policy</a></span>
  </label>;
}
