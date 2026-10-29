"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Search, Check } from "lucide-react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import type { WelcomePick } from "@/components/welcome-screen";
import styles from "./LocalFavoriteSearch.module.css";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://api.piads.co"
).replace(/\/$/, "");
const NEEDS_CAPTCHA = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const MAX_FAVORITES = 12;
type SearchResult = WelcomePick & { address?: string | null };

export default function LocalFavoriteSearch({
  address,
  picks,
  onAdd,
}: {
  address: string;
  picks: WelcomePick[];
  onAdd: (pick: WelcomePick) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [reset, setReset] = useState(0);
  const request = useRef<AbortController | null>(null);
  const full = picks.length >= MAX_FAVORITES;
  useEffect(() => () => request.current?.abort(), []);

  async function search() {
    if (query.trim().length < 2 || full || busy) return;
    if (NEEDS_CAPTCHA && !token) {
      setError("Complete the quick check below, then search.");
      return;
    }
    const controller = new AbortController();
    request.current?.abort();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 20000);
    setBusy(true);
    setError("");
    setNotice("");
    setResults([]);
    setSearched(false);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/guests/favorites/search`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query.trim(),
            address,
            turnstile_token: token,
          }),
          signal: controller.signal,
        },
      );
      const body = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          body?.detail?.message ||
            "We couldn't search places. Please try again.",
        );
      if (!Array.isArray(body.data))
        throw new Error("Place search is unavailable. Please try again.");
      setResults(body.data);
      setSearched(true);
    } catch (error) {
      setError(
        controller.signal.aborted
          ? "The search took too long. Please try again."
          : error instanceof Error
            ? error.message
            : "Please try again.",
      );
    } finally {
      clearTimeout(timeout);
      setBusy(false);
      setToken(null);
      setReset((value) => value + 1);
    }
  }

  return (
    <section className={styles.search} aria-label="Add a local favorite">
      <label htmlFor="favorite-place-name">Have a favorite place?</label>
      <p>Search by name near your property, then choose the right location.</p>
      <div className={styles.controls}>
        <input
          id="favorite-place-name"
          value={query}
          maxLength={120}
          disabled={busy || full}
          placeholder="Business name, e.g. a favorite café"
          onChange={(event) => {
            setQuery(event.target.value);
            setResults([]);
            setSearched(false);
            setError("");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void search();
            }
          }}
        />
        <button
          type="button"
          onClick={() => void search()}
          disabled={busy || full || query.trim().length < 2}
        >
          <Search size={16} aria-hidden="true" />
          {busy ? "Searching…" : "Search"}
        </button>
      </div>
      <TurnstileWidget onToken={setToken} resetKey={reset} />
      {full && (
        <p role="status">
          You have 12 favorites. Remove one from the gallery to add another.
        </p>
      )}
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
      {searched && !results.length && (
        <p role="status">
          No matches nearby. Try the full business name or include its city.
        </p>
      )}
      {results.length > 0 && (
        <ul aria-label="Matching places" className={styles.results}>
          {results.map((place) => {
            const added = picks.some(
              (pick) => pick.place_id === place.place_id,
            );
            return (
              <li key={place.place_id}>
                <div>
                  <strong>{place.name}</strong>
                  <p>
                    {place.address ||
                      "Address unavailable — check the place name before adding."}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={added || full}
                  aria-label={
                    added ? `${place.name} added` : `Add ${place.name}`
                  }
                  onClick={() => {
                    onAdd(place);
                    setNotice(`${place.name} added to your favorites.`);
                  }}
                >
                  {added ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    <Plus size={16} aria-hidden="true" />
                  )}
                  {added ? "Added" : "Add"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
