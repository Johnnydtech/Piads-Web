"use client";

import { useEffect, useState } from "react";
import styles from "./seasonal-brand.module.css";

// One seasonal campaign; existing tabs also return to normal after January 5.
export function useChristmasSeason() {
  const [active, setActive] = useState<boolean | null>(null);
  useEffect(() => {
    const update = () => {
      const now = Date.now();
      setActive(now >= Date.parse("2026-11-27T00:00:00-05:00") && now < Date.parse("2027-01-06T00:00:00-05:00"));
    };
    update();
    const timer = window.setInterval(update, 60_000);
    window.addEventListener("focus", update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", update);
    };
  }, []);
  return active;
}

/** Keep the original wordmark intact; seasonal artwork never changes its alt text. */
export function SeasonalLogo({ light = false, width, darkAware = false }: { light?: boolean; width?: number; darkAware?: boolean }) {
  const festive = useChristmasSeason();
  return (
    <span className={`${styles.logo} ${light ? styles.light : ""} ${darkAware ? styles.darkAware : ""}`} style={width ? { width, height: width * 55 / 140 } : undefined}>
      <span className={styles.crop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/piads-logo-text.png" alt="PiAds" width={1536} height={1024} />
      </span>
      {festive && <svg className={styles.hat} viewBox="0 0 90 68" fill="none" aria-hidden="true" focusable="false">
        <g className={styles.hatCrown}>
        <path d="M12 46C17 29 26 9 43 7C60 5 65 17 69 30L77 39L65 45C55 37 56 26 46 22C43 31 49 40 54 47Z" fill="#A72235" />
        <path d="M17 43C23 25 31 12 43 11C50 10 54 13 57 16C40 9 35 33 34 46Z" fill="#D54750" />
        <path d="M48 22C51 29 53 40 57 43" stroke="#761F2C" strokeWidth="3" strokeLinecap="round" />
        <g className={styles.pomPom}>
        <path d="M70 33C74 30 80 32 82 36C89 38 87 44 84 47C81 54 74 52 71 49C64 48 64 40 68 38Z" fill="#FFF9E8" stroke="#DED6C3" />
        <path d="M72 36C76 34 80 35 81 38" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </g>
        </g>
        <path d="M9 44Q31 35 54 43C60 45 59 52 54 54Q32 47 11 55C5 57 3 48 9 44Z" fill="#FFF9E8" stroke="#DED6C3" />
        <path d="M11 46L12 51M20 43L21 49M30 42L30 48M40 43L39 49M50 45L48 51" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>}
    </span>
  );
}

export function SeasonalMessage({ fallback }: { fallback: string }) {
  const festive = useChristmasSeason();
  return <span className={festive ? styles.greeting : undefined}>{festive && <span aria-hidden="true">✦</span>}{festive ? "Merry Christmas. Make every welcome magical." : fallback}</span>;
}

/** Fine evergreen branches and hanging ornaments, outside interactive content. */
export function ChristmasTrim() {
  const festive = useChristmasSeason();
  if (!festive) return null;
  return <div className={styles.trim} aria-hidden="true">
    {[false, true].map((right) => <svg key={String(right)} className={right ? styles.branchRight : styles.branchLeft} viewBox="0 0 210 90" fill="none" focusable="false">
      <path d="M-10 0C40 20 77 23 147 21M18 8L63 64M64 17L111 48" stroke="#536B47" strokeWidth="2" />
      {Array.from({length: 14}, (_, i) => <path key={i} d={`M${i*10} ${5+i}l8 -17m-8 17l10 19`} stroke={i%2 ? "#305342" : "#6E8060"} strokeWidth="2" />)}
      {Array.from({length: 7}, (_, i) => <path key={i} d={`M${25+i*5} ${19+i*6}l-16 -1m16 1l8 -12`} stroke="#48654B" strokeWidth="1.8" />)}
      <path d="M126 23V48M171 0V31" stroke="#B99A57" strokeWidth=".8" />
      <circle cx="126" cy="58" r="10" fill="#A53440" /><path d="M122 51C119 54 119 58 120 61" stroke="#DE8C83" strokeWidth="2" strokeLinecap="round" />
      <path d="M171 31L174 40L184 42L176 48L176 58L171 52L164 57L165 47L158 42L168 40Z" fill="#D4B87C" />
      <circle cx="65" cy="23" r="4" fill="#A53440" /><circle cx="74" cy="26" r="3" fill="#BD4B50" />
    </svg>)}
  </div>;
}
