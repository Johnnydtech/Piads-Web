"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, X } from "lucide-react";
import styles from "./LocalFavoritesGallery.module.css";

type Favorite = {
  place_id: string;
  name: string;
  blurb?: string;
  photo_url?: string | null;
};

function PlacePhoto({ url, name }: { url?: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  const photo = url && /^https?:\/\//i.test(url) ? url : null;
  return (
    <div className={styles.photo}>
      {photo && !failed ? (
        // External place photos are served by the existing PiAds photo proxy.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={styles.placeholder}>
          <MapPin size={28} aria-hidden="true" />
          <span>Photo unavailable</span>
        </div>
      )}
    </div>
  );
}

export default function LocalFavoritesGallery({
  picks,
  onChangeTip,
  onRemove,
}: {
  picks: Favorite[];
  onChangeTip: (id: string, tip: string) => void;
  onRemove: (id: string) => void;
}) {
  const rail = useRef<HTMLUListElement>(null);
  const galleryId = useId();
  const [position, setPosition] = useState(0);
  const [hasMore, setHasMore] = useState(picks.length > 1);
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      setPosition(element.scrollLeft);
      setHasMore(
        element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [picks.length]);
  const scroll = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    const first = element.firstElementChild as HTMLElement | null;
    const distance = (first?.offsetWidth || element.clientWidth) + 16;
    element.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };
  if (!picks.length)
    return (
      <p className={styles.empty}>
        No favorites yet. You can add places whenever you like.
      </p>
    );
  return (
    <div className={styles.gallery}>
      <div className={styles.toolbar}>
        <p>
          {picks.length} {picks.length === 1 ? "favorite" : "favorites"} · Swipe
          or use the arrows
        </p>
        <div className={styles.arrows}>
          <button
            type="button"
            aria-label="Previous favorites"
            aria-controls={galleryId}
            disabled={position <= 1}
            onClick={() => scroll(-1)}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next favorites"
            aria-controls={galleryId}
            disabled={!hasMore}
            onClick={() => scroll(1)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <ul
        ref={rail}
        id={galleryId}
        className={styles.rail}
        aria-label="Local favorites"
        tabIndex={0}
      >
        {picks.map((pick, index) => (
          <li key={pick.place_id} className={styles.card}>
            <div className={styles.cover}>
              <PlacePhoto
                key={pick.photo_url || "no-photo"}
                url={pick.photo_url}
                name={pick.name}
              />
              <button
                className={styles.remove}
                type="button"
                aria-label={`Remove ${pick.name}`}
                onClick={() => onRemove(pick.place_id)}
              >
                <X size={18} />
              </button>
              <span className={styles.number}>
                {index + 1} / {picks.length}
              </span>
            </div>
            <div className={styles.details}>
              <h4>{pick.name}</h4>
              <label>
                <span>
                  Your tip for guests <small>Optional</small>
                </span>
                <textarea
                  aria-label={`Your recommendation for ${pick.name}`}
                  rows={2}
                  maxLength={80}
                  value={pick.blurb || ""}
                  onChange={(event) =>
                    onChangeTip(pick.place_id, event.target.value.slice(0, 80))
                  }
                  placeholder="Try the pastries, or ask for a patio table…"
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
