"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/(marketing)/stays.module.css";

export function CoastalHeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    player.muted = true;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let inView = true;
    const update = () => {
      if (
        preference.matches ||
        connection?.saveData ||
        document.hidden ||
        !inView
      )
        player.pause();
      else void player.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(player);
    document.addEventListener("visibilitychange", update);
    preference.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      preference.removeEventListener("change", update);
      player.pause();
    };
  }, [failed]);

  useEffect(() => {
    const player = video.current;
    const hero = player?.closest("section") as HTMLElement | null;
    if (!hero) return;
    let frame = 0;
    const updatePan = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.72)));
      hero.style.setProperty("--coastal-pan", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updatePan);
    };
    updatePan();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      hero.style.removeProperty("--coastal-pan");
    };
  }, [failed]);

  return (
    <div className={styles.heroMedia}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.heroPhoto}
        src="/stays/coastal-retreat.webp"
        alt="Sunlit coastal holiday home overlooking the sea"
        width={1672}
        height={941}
        fetchPriority="high"
      />
      {!failed && (
        <video
          ref={video}
          className={styles.heroVideo}
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/stays/coastal-retreat.webp"
          onError={() => setFailed(true)}
        >
          <source src="/stays/coastal-retreat.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
