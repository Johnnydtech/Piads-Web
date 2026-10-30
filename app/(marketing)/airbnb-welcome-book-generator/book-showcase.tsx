'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { WelcomeScreen } from '@/components/welcome-screen'
import { DEMO_WELCOME } from './demo'
import { BookCollection, PhoneMockup } from './sample-experience'
import { SAMPLE_STYLES, sampleBook, type SampleStyle } from './samples/sample-data'
import styles from './showcase.module.css'
import { SampleDownload } from './sample-download'

const base = '/airbnb-welcome-book-generator'
export function BookShowcase() {
  const [style, setStyle] = useState<SampleStyle>('forest')
  const [paused, setPaused] = useState(false)
  const [origin, setOrigin] = useState('')
  useEffect(() => setOrigin(window.location.origin), [])
  const book = sampleBook(style)
  const demoUrl = `${base}/guest-demo?style=${style}`
  return <section className={styles.showcase} aria-labelledby="book-samples-title" id="sample-books">
    <div className={styles.inner}>
      <p className={styles.eyebrow}>A little more you. A lot more welcome.</p>
      <h2 id="book-samples-title">Not just a guide.<br/><em>A feeling of being somewhere.</em></h2>
      <p className={styles.intro}>A storybook cottage. A sunny postcard. A quiet retreat. Explore three finished examples, from the printed pages to the guide in your guest’s pocket.</p>
      <div className={styles.cards}>
        {SAMPLE_STYLES.map((book, index) => <article className={styles.card} key={book.key}>
          <BookCollection style={book.key} />
          <div className={styles.cardBody}>
            <span className={styles.styleNumber}>0{index + 1} / The collection</span>
            <h3>{book.title}</h3><p>{book.description}</p>
            <a className={styles.tryPhone} href={`${base}/guest-demo?style=${book.key}`}>Try the phone guide <span aria-hidden>↗</span></a>
            <div className={styles.links}>
              <a href={`${base}/samples?style=${book.key}`}>Browse 7 pages ↗</a>
              <SampleDownload style={book.key} />
            </div>
          </div>
        </article>)}
      </div>
      <p className={styles.note}>Original AI artwork · Real guide templates · Fictional property and local favorites<br/>Your own photo, details and artwork make it yours.</p>
      <div className={styles.scanStory}>
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>From the big screen to their next adventure</p>
          <h2>A warm welcome.<br/>Then, one little scan.</h2>
          <p>Welcome them on the TV. Let them scan for Wi-Fi, house notes and your favorite places—all in a guide made for their phone.</p>
          <div className={styles.tabs} aria-label="TV and phone sample style">
            {SAMPLE_STYLES.map(s => <button key={s.key} aria-pressed={style === s.key} onClick={() => setStyle(s.key)}>{s.title}</button>)}
          </div>
          <div className={styles.scanAction}>{origin && <QRCodeSVG value={origin + demoUrl} size={144} level="M" marginSize={4} title="Scan to open this sample guest guide" />}<div><span className={styles.eyebrow}>Give it a little scan</span><a className={styles.tryPhone} href={demoUrl}>Or open the phone guide ↗</a><span className={styles.qrHint}>Wi-Fi, house notes & local favorites.</span></div></div>
        </div>
        <div className={styles.devices}>
          <div className={styles.tv}>
            <WelcomeScreen data={{ ...DEMO_WELCOME, property_name: book.propertyName, background_url: book.photo || null, picks: book.picks }} paused={paused} sampleGuideUrl={origin ? origin + demoUrl : undefined} />
          </div>
          <div className={styles.storyPhone}><PhoneMockup style={style} /></div>
          <span className={styles.scanLabel}>TV → QR → phone</span>
        </div>
        <button className={styles.pausePreview} type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Resume TV preview' : 'Pause TV preview'}</button>
        <p className={styles.storyNote}>Try the QR code: it opens this fictional sample. For a live guest guide, connect a TV in PiAds and add your artwork, Wi-Fi and house details in the app.</p>
      </div>
      <a href="#generator-title" className={styles.primary}>Create with AI →</a>
      <p className={styles.note}>Personalize your free book, then get the download by email.<br/>Connect a TV in PiAds when you’re ready.</p>
    </div>
  </section>
}
