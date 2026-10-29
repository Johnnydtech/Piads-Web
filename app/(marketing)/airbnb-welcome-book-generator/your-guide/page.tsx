import type { Metadata } from 'next'
import { WelcomeBookGenerator } from '../generator'
import styles from '../generator.module.css'
export const metadata: Metadata = {
  title: 'Your welcome guide',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}
export default function YourGuidePage() {
  return <div className={styles.page}><WelcomeBookGenerator workspace /></div>
}
