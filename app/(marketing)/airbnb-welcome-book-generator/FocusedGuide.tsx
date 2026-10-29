"use client";

import { Children, useId, useRef, useState, type ReactNode } from "react";
import styles from "./focused-guide.module.css";

const introductions: Record<string, string> = {
  Style: "Give your guide the same feel as your space.",
  "Your property": "Make guests feel at home from the moment they arrive.",
  "Welcome message": "A personal hello goes a long way. Keep it warm and simple.",
  "Welcome & checkout": "Welcome your guests and leave them a helpful reminder for departure.",
  "TV background": "Set the scene with a photo that feels like your property.",
  "Property photo": "Give your welcome screen a view of the place they’re staying.",
  "Wi-Fi": "The first thing most guests look for. Make connecting easy.",
  "Checkout & manual": "Put the useful details in one place, ready when guests need them.",
  "House notes": "Share the little things that make a stay go smoothly.",
  "Local favorites": "Help your guests discover the places you love nearby.",
  "Local suggestions": "Choose a few nearby places your guests will enjoy.",
  "Your host": "Let guests know who’s welcoming them and how to get in touch.",
  "Arrival & parking": "Help guests find their way in without the guesswork.",
  "House essentials": "A little local knowledge makes an unfamiliar home feel easy.",
  "House rules": "Choose the guidelines that matter for your property.",
  Checkout: "Make the last morning as easy as the first hello.",
  "Custom notes": "Add anything else you’d like guests to know.",
};

/** Keep fields mounted so moving between sections preserves work in progress. */
export default function FocusedGuide({ titles, children, action, onDone, doneLabel = "Done" }: {
  titles: string[];
  children: ReactNode;
  action?: ReactNode;
  onDone?: () => void;
  doneLabel?: string;
}) {
  const [step, setStep] = useState(0);
  const id = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const panels = Children.toArray(children);
  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      // Bring the new section into view only when navigation started below it.
      if (heading.current && heading.current.getBoundingClientRect().top < 0) {
        heading.current.scrollIntoView({ block: "start" });
      }
    });
  }
  return (
    <div className={styles.wizard}>
      <div className={styles.layout}>
        <nav className={styles.navigation} aria-label="Guide sections">
          <p className={styles.navTitle}>Make it yours</p>
          <p className={styles.navHint}>A few details. A warmer welcome.</p>
          {titles.map((title, index) => (
            <button key={title} type="button" aria-current={step === index ? "step" : undefined}
              aria-controls={`${id}-section-${index}`} onClick={() => go(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{title}
            </button>
          ))}
        </nav>
        <div className={styles.content}>
          <div className={styles.mobileNavigation}>
            <label htmlFor={id}>Jump to a section</label>
            <select id={id} value={step} onChange={(e) => go(Number(e.target.value))}>
              {titles.map((title, index) => <option key={title} value={index}>{title}</option>)}
            </select>
          </div>
          <div className={styles.body}>
            <p className={styles.eyebrow}>YOUR GUIDE / {String(step + 1).padStart(2, "0")} OF {String(titles.length).padStart(2, "0")}</p>
            <h3 ref={heading} tabIndex={-1}>{titles[step]}</h3>
            <p className={styles.introduction}>{introductions[titles[step]] || "Add the details that make this guide your own."}</p>
            {panels.map((panel, index) => (
              <div id={`${id}-section-${index}`} className={styles.fields} key={titles[index]} hidden={step !== index}>{panel}</div>
            ))}
          </div>
          <div className={styles.footer}>
            <button type="button" disabled={step === 0} onClick={() => go(step - 1)}>Back</button>
            <div className={styles.actions}>
              {step < titles.length - 1 ? (
                <button type="button" onClick={() => go(step + 1)}>Continue →</button>
              ) : action || (onDone && <button type="button" onClick={onDone}>{doneLabel} →</button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
