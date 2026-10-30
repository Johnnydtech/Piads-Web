import type { Metadata } from 'next'
import { GuestDemo } from './preview'
export const metadata: Metadata = { title: 'Try a sample guest guide', robots: { index: false, follow: false } }
export default function Page({ searchParams }: { searchParams: { style?: string } }) {
  const style = searchParams.style === 'coast' || searchParams.style === 'clay' ? searchParams.style : 'forest'
  return <GuestDemo style={style} />
}
