'use client'
import GuestGuide from '../sample-guest-guide'
import { sampleGuest } from '../sample-experience'
import { SAMPLE_STYLES, type SampleStyle } from '../samples/sample-data'
import s from '../showcase.module.css'
export function GuestDemo({ style }: { style: SampleStyle }) {
  return <div className={s.guestDemo}>
    <header className={s.demoBanner}><a href="/airbnb-welcome-book-generator#sample-books">← Back to the collections</a><p>Try a guest’s view · Fictional sample</p></header>
    <div className={s.demoStyles} aria-label="Sample style">{SAMPLE_STYLES.map(item => <a key={item.key} href={`?style=${item.key}`} aria-current={item.key === style ? 'page' : undefined}>{item.title}</a>)}</div>
    <GuestGuide guide={sampleGuest(style)} />
    <footer className={s.demoFooter}><p>A little welcome, made for your place.</p><a className={s.primary} href="/airbnb-welcome-book-generator#generator-title">Create with AI →</a><p>Sample Wi-Fi and local favorites are for illustration only.</p></footer>
  </div>
}
