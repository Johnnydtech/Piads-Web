"use client"

import { Children, useId, useRef, useState, type ReactNode } from 'react'
import styles from './focused-guide.module.css'

/** Keep fields mounted so uploads, search and partially entered notes survive navigation. */
export default function FocusedGuide({ titles, children }: { titles: string[]; children: ReactNode }) {
  const [step, setStep] = useState(0)
  const id = useId()
  const body = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const panels = Children.toArray(children)
  function go(next: number) {
    setStep(next)
    body.current?.scrollTo({ top: 0 })
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }))
  }
  return <div className={styles.wizard}>
    <div className={styles.header}>
      <label htmlFor={id}>Section {step + 1} of {titles.length}</label>
      <select id={id} value={step} onChange={e => go(Number(e.target.value))} aria-label="Choose guide section">
        {titles.map((title, index) => <option key={title} value={index}>{title}</option>)}
      </select>
    </div>
    <div className={styles.progress} aria-hidden="true">{titles.map((title, index) => <span key={title} data-current={index === step} />)}</div>
    <div className={styles.body} ref={body}>
      <h3 ref={heading} tabIndex={-1}>{titles[step]}</h3>
      {panels.map((panel, index) => <div key={titles[index]} hidden={step !== index}>{panel}</div>)}
    </div>
    <div className={styles.footer}>
      <button type="button" disabled={step === 0} onClick={() => go(step - 1)}>Back</button>
      {step < titles.length - 1 ? <button type="button" onClick={() => go(step + 1)}>Next section →</button> : <span>Ready to save or continue below.</span>}
    </div>
  </div>
}
