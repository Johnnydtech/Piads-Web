'use client'
import { useEffect, useRef, useState } from 'react'
import { availableKitPages, BOOK_THEMES, type KitData } from '../kit'
import { sampleBook } from './sample-data'
import styles from '../showcase.module.css'
import { SampleDownload } from '../sample-download'

export function SampleBookPreview({ initialTheme = 'forest' }: { initialTheme?: KitData['theme'] }) {
  const [theme, setTheme] = useState<KitData['theme']>(initialTheme)
  const firstPageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)
  useEffect(() => {
    const node = firstPageRef.current
    if (!node) return
    const resize = () => setScale(node.clientWidth / 816)
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  const data = sampleBook(theme || 'forest')
  const pages = availableKitPages(data)
  return <div className={styles.samplePage}>
    <a href="/airbnb-welcome-book-generator">← Back to the free generator</a>
    <p className={styles.eyebrow}>A complete sample · 7 pages</p>
    <h1>A little book. A warmer welcome.</h1>
    <p>Explore every page. These are the same templates you can personalize and download for free.</p>
    <div className={styles.tabs} aria-label="Book style">
      {BOOK_THEMES.map(t => <button key={t.key} aria-pressed={theme === t.key} onClick={() => setTheme(t.key)}>{t.name}</button>)}
    </div>
    <SampleDownload key={theme} style={theme || 'forest'} className={styles.primary} />
    <p className={styles.note}>Fictional property, sample Wi-Fi and illustrative local recommendations.</p>
    <div className={styles.sampleGrid}>
      {pages.map(({key,label,Page}, index) => <figure key={key}><div className={styles.pageFrame} ref={index === 0 ? firstPageRef : undefined}><div className={styles.pageScale} style={{transform:`scale(${scale})`}}><Page data={data}/></div></div><figcaption>{label}</figcaption></figure>)}
    </div>
    <a className={styles.primary} href="/airbnb-welcome-book-generator#generator-title">Create my free guide →</a>
  </div>
}
