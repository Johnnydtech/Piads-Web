"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "@/app/(marketing)/stays.module.css";

export function CoastalHeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
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
        paused ||
        preference.matches ||
        connection?.saveData ||
        document.hidden ||
        !inView
      )
        player.pause();
      else void player.play().catch(() => setPlaying(false));
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
  }, [paused, failed]);
  return (
    <>
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
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src="/stays/coastal-retreat.mp4" type="video/mp4" />
        </video>
      )}
      {!failed && (
        <button
          type="button"
          className={styles.videoControl}
          aria-label={
            playing ? "Pause background video" : "Play background video"
          }
          onClick={() => {
            if (playing) {
              setPaused(true);
            } else {
              setPaused(false);
              void video.current?.play().catch(() => setPlaying(false));
            }
          }}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
          <span>{playing ? "Pause motion" : "Play motion"}</span>
        </button>
      )}
    </>
  );
}
