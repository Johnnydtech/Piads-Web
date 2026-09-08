import Link from "next/link";
import styles from "./site-shell.module.css";

/** The original PiAds wordmark, from the supplied brand assets. */
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`${styles.brand} ${light ? styles.brandLight : ""}`}
      aria-label="PiAds home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/piads-logo-text.png"
        alt="PiAds"
        width={1536}
        height={1024}
      />
    </Link>
  );
}
