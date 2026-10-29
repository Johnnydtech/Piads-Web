"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import styles from "./focused-guide.module.css";

export default function GuidePreviewPanel({
  children,
  label,
  className,
  breakpoint = 900,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  breakpoint?: number;
}) {
  const [wide, setWide] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${breakpoint + 1}px)`);
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [breakpoint]);
  return (
    <div className={className}>
      {!wide && (
        <button
          className={styles.previewToggle}
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide preview" : label}
        </button>
      )}
      <div id={id} hidden={!wide && !expanded}>
        {children}
      </div>
    </div>
  );
}
