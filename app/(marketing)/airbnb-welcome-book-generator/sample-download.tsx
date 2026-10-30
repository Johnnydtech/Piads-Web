'use client'

import { useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Loader2, X } from 'lucide-react'
import GeneratorAccess, { generatorRequest } from './GeneratorAccess'
import { SAMPLE_STYLES, type SampleStyle } from './samples/sample-data'
import access from './access.module.css'
import styles from './generator.module.css'
import showcase from './showcase.module.css'

export function SampleDownload({ style, className }: { style: SampleStyle; className?: string }) {
  const [verifyOpen, setVerifyOpen] = useState(false)
  const [deliveryOpen, setDeliveryOpen] = useState(false)
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const sending = useRef(false)
  const title = SAMPLE_STYLES.find(sample => sample.key === style)!.title

  async function send(verifiedToken: string) {
    if (sending.current) return
    sending.current = true
    setVerifyOpen(false); setDeliveryOpen(true); setBusy(true); setError(''); setSent(false)
    try {
      await generatorRequest('sample', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${verifiedToken}` },
        body: JSON.stringify({ style }),
      })
      setSent(true)
    } catch (cause) {
      if ((cause as { status?: number })?.status === 401) setToken('')
      setError(cause instanceof Error ? cause.message : 'We couldn’t email your sample. Please try again.')
    } finally { sending.current = false; setBusy(false) }
  }

  function request() {
    if (sent) { setDeliveryOpen(true); return }
    if (token) void send(token)
    else { setDeliveryOpen(false); setVerifyOpen(true) }
  }

  return <>
    <button type="button" className={className || showcase.sampleButton} onClick={request}>Email me this sample</button>
    {verifyOpen && <GeneratorAccess open onClose={() => setVerifyOpen(false)} sampleStyle={style}
      onVerified={(verifiedToken, verifiedEmail) => { setToken(verifiedToken); setEmail(verifiedEmail); void send(verifiedToken) }} />}
    <Dialog.Root open={deliveryOpen} onOpenChange={open => { if (!busy) setDeliveryOpen(open) }}><Dialog.Portal>
      <Dialog.Overlay className={access.overlay} />
      <Dialog.Content className={access.dialog}>
        <Dialog.Close className={access.close} disabled={busy} aria-label="Close"><X size={20}/></Dialog.Close>
        <span className={access.eyebrow}>{title}</span>
        <Dialog.Title>{busy ? 'Sending your sample…' : sent ? 'Your sample is on its way.' : 'Let’s try that again.'}</Dialog.Title>
        <Dialog.Description>{sent ? `We emailed all seven pages to ${email}. Your private download link is valid for seven days. Check your spam folder if it doesn’t arrive.` : busy ? 'Preparing a private link to your sample PDF. This may take a moment.' : 'Your sample is still available. Please try sending it again.'}</Dialog.Description>
        {busy && <Loader2 className={styles.spin} aria-hidden />}
        {error && <p className={styles.error} role="alert">{error}</p>}
        {sent ? <><p className={access.note}>Your sample includes an example Wi-Fi QR code. Create your own free guide with your network and password to give guests a QR code they can scan to join your Wi-Fi.</p><a className={styles.primary} style={{ marginTop: 24 }} href="/airbnb-welcome-book-generator#generator-title">Create my own with AI →</a></> : !busy && <button className={styles.primary} onClick={request}>{token ? 'Try sending again' : 'Verify email again'}</button>}
      </Dialog.Content>
    </Dialog.Portal></Dialog.Root>
  </>
}
