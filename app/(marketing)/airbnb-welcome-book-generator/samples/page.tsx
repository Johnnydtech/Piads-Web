import type { Metadata } from 'next'
import { SampleBookPreview } from './preview'
export const metadata: Metadata = {
  title: 'Preview the free guest welcome books',
  description: 'Browse three complete sample welcome books, then create your own free guest guide.',
  robots: { index: false, follow: true },
}
export default function SamplesPage({ searchParams }: { searchParams: { style?: string } }) {
  const style = searchParams.style === 'coast' || searchParams.style === 'clay' ? searchParams.style : 'forest'
  return <SampleBookPreview initialTheme={style} />
}
