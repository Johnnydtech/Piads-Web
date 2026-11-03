import type { Metadata } from 'next'
import { GENERATOR_SHARE_IMAGE } from '@/lib/brand'
import { JsonLd, graph, breadcrumbs } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/site'
import { WelcomeBookGenerator } from './generator'
import styles from './generator.module.css'

const PATH = '/airbnb-welcome-book-generator'

export const metadata: Metadata = {
  title: 'Free Welcome Guide for Your Airbnb or Short-Term Rental',
  description:
    'Enter your rental address, choose a style and get a free welcome guide with local places already included. Edit details afterward. No account needed.',
  alternates: { canonical: PATH },
  openGraph: {
    title: 'Free Airbnb Welcome Book Generator',
    description: 'Create a free welcome book with your own style, Wi-Fi QR code and local favorites. Verify your email to receive your PDF.',
    url: PATH,
    type: 'website',
    siteName: 'PiAds',
    images: [GENERATOR_SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Airbnb Welcome Book Generator',
    description: 'Create a free welcome book with your own style, Wi-Fi QR code and local favorites. Verify your email to receive your PDF.',
    images: [GENERATOR_SHARE_IMAGE],
  },
}

export default function WelcomeBookGeneratorPage() {
  return (
    <div className={styles.page}>
      <JsonLd
        data={graph(
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Airbnb welcome book generator', path: PATH },
          ]),
          {
            '@type': 'WebApplication',
            name: 'Airbnb Welcome Book Generator',
            url: `${SITE_URL}${PATH}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            publisher: { '@id': `${SITE_URL}/#organization` },
          }
        )}
      />

      <WelcomeBookGenerator />
    </div>
  )
}
