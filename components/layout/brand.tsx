import Link from "next/link";
import { SeasonalLogo } from "@/components/seasonal-brand";
import styles from "./site-shell.module.css";

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={styles.brand} aria-label="PiAds home"><SeasonalLogo light={light} /></Link>;
}
