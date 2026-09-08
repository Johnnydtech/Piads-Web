
import { SignupLink } from "@/components/signup-link";
import Link from "next/link";
import { ArrowUpRight, Sun } from "lucide-react";
import { Brand } from "./brand";
import { footerColumns } from "@/lib/navigation";
import styles from "./site-shell.module.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co";
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerIntro}>
        <div>
          <Brand light />
          <p>
            A little screen. A more memorable experience.
            <br />
            For hosts, property managers, and places people gather.
          </p>
        </div>
        <SignupLink
          href={`${APP_URL}/sign-up?role=venue_owner`}
          className={styles.footerCta}
        >
          Make every screen matter <ArrowUpRight size={20} />
        </SignupLink>
      </div>
      <div className={styles.footerColumns}>
        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h2>{column.heading}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} PiAds. All rights reserved.</span>
        <div>
          <Link href={APP_URL}>Sign in</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <span>
            Made for a warmer welcome <Sun size={14} />
          </span>
        </div>
      </div>
    </footer>
  );
}
