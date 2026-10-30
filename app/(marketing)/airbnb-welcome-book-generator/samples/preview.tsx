'use client'
import { useState } from 'react'
import { availableKitPages, BOOK_THEMES, type KitData } from '../kit'
import { SAMPLE_BOOK } from './sample-data'
import styles from '../showcase.module.css'

export function SampleBookPreview({ initialTheme = 'forest' }: { initialTheme?: KitData['theme'] }) {
  const [theme, setTheme] = useState<KitData['theme']>(initialTheme)
  const data = { ...SAMPLE_BOOK, theme }
  const pages = availableKitPages(data)
  return <div className={styles.samplePage}>
    <a href="/airbnb-welcome-book-generator">← Back to the free generator</a>
    <p className={styles.eyebrow}>A complete sample · 7 pages</p>
    <h1>A little book. A warmer welcome.</h1>
    <p>Explore every page. These are the same templates you can personalize and download for free.</p>
    <div className={styles.tabs} aria-label="Book style">
      {BOOK_THEMES.map(t => <button key={t.key} aria-pressed={theme === t.key} onClick={() => setTheme(t.key)}>{t.name}</button>)}
    </div>
    <a className={styles.primary} href={`/guest-demo/books/piads-${theme}-sample.pdf`} download>Download sample PDF</a>
    <p className={styles.note}>Fictional property, sample Wi-Fi and illustrative local recommendations.</p>
    <div className={styles.sampleGrid}>
      {pages.map(({key,label,Page}) => <figure key={key}><div className={styles.pageFrame}><div className={styles.pageScale}><Page data={data}/></div></div><figcaption>{label}</figcaption></figure>)}
    </div>
    <a className={styles.primary} href="/airbnb-welcome-book-generator#generator-title">Create my free guide →</a>
  </div>
}
