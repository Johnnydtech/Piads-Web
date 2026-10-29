"use client";

import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye } from "lucide-react";
import styles from "./focused-guide.module.css";

export default function GuidePreviewPanel({ children, label, className }: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className={styles.previewToggle} type="button"><Eye size={18} aria-hidden="true" />{label}</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.previewOverlay} />
          <Dialog.Content className={styles.previewDialog}>
            <div className={styles.previewHeader}>
              <Dialog.Title className={styles.previewTitle}>{label}</Dialog.Title>
              <Dialog.Close className={styles.previewClose}>Back to editing</Dialog.Close>
            </div>
            <Dialog.Description className={styles.previewDescription}>See your latest changes, then return to where you left off.</Dialog.Description>
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
