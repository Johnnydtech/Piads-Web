import styles from './showcase.module.css'

const books = [
  { key: 'forest', title: 'Illustrated Stay', description: 'Botanical details, warm paper and a little storybook charm.' },
  { key: 'coast', title: 'Weekend Postcard', description: 'Cobalt blue, sunny cream and a playful postcard feel.' },
  { key: 'clay', title: 'Retreat Journal', description: 'A beautiful photo cover with quiet, editorial pages inside.' },
]

export function BookShowcase() {
  return <section className={styles.showcase} aria-labelledby="book-samples-title" id="sample-books">
    <div className={styles.inner}>
      <p className={styles.eyebrow}>See what you’ll take home</p>
      <h2 id="book-samples-title">A welcome worth keeping.</h2>
      <p className={styles.intro}>Three styles. A complete guest book. Preview the finished pages, then make them yours with your property photo, Wi-Fi and favorite local spots.</p>
      <div className={styles.cards}>
        {books.map(book => <article className={styles.card} key={book.key}>
          <a className={styles.art} href={`/airbnb-welcome-book-generator/samples?style=${book.key}`} aria-label={`Browse ${book.title} sample pages`}>
            <img src={`/guest-demo/books/${book.key}-showcase.webp`} width={900} height={1050} alt={`${book.title} sample: finished cover, Wi-Fi page and local recommendations`} loading="lazy" />
          </a>
          <div className={styles.cardBody}>
            <h3>{book.title}</h3><p>{book.description}</p>
            <div className={styles.links}>
              <a href={`/airbnb-welcome-book-generator/samples?style=${book.key}`}>Browse all 7 pages ↗</a>
              <a href={`/guest-demo/books/piads-${book.key}-sample.pdf`} download>Download PDF ↓</a>
            </div>
          </div>
        </article>)}
      </div>
      <p className={styles.note}>Arrival · Wi-Fi · House essentials · House rules · Local favorites · Checkout<br/>Finished examples for a fictional property. Your guide uses the same templates, with your own details.</p>
      <a href="#generator-title" className={styles.primary}>Create my free guide →</a>
      <p className={styles.note}>Free to personalize. Your finished download arrives by email.</p>
    </div>
  </section>
}
