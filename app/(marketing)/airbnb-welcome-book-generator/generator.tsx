"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LocalFavoriteSearch from "@/components/LocalFavoriteSearch";
import LocalFavoritesGallery from "@/components/LocalFavoritesGallery";
import GeneratorAccess, { generatorRequest } from "./GeneratorAccess";
import FocusedGuide from "./FocusedGuide";
import GuidePreviewPanel from "./GuidePreviewPanel";
import { DEMO_WELCOME } from "./demo";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  FileText,
  ImagePlus,
  Loader2,
  Lock,
  MapPin,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Star,
  X,
  ZoomIn,
} from "lucide-react";
import {
  WelcomeScreen,
  type WelcomePick,
  type WelcomeScreenData,
} from "@/components/welcome-screen";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { track, trackCta } from "@/lib/analytics";
import { hostSignupUrl } from "@/lib/signup-links";
import { parseWelcomeHandoff } from "@/lib/welcome-handoff";
import {
  GENERATOR_PATH,
  RESULT_PATH,
  readDraft,
  saveDraft,
  type Generated,
  type GuideDraft,
} from "./draft";
import {
  BOOK_THEMES,
  availableKitPages,
  guideReview,
  type BookTheme,
  type PaperSize,
  CHECKOUT_STEPS,
  DEFAULT_KIT,
  HOUSE_RULES,
  KIT_PAGES,
  PAGE_H,
  PAGE_W,
  buildKitPdf,
  guestMessages,
  type KitData,
  type KitDetails,
} from "./kit";
import styles from "./generator.module.css";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://api.piads.co"
).replace(/\/$/, "");
const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"
).replace(/\/$/, "");
const NEEDS_CAPTCHA = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_MESSAGE =
  "Make yourself at home. Explore these places nearby during your stay.";
const DEFAULT_CHECKOUT =
  "Thank you for staying with us. Please check your booking for checkout instructions.";
function phoneValid(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return raw.trim().startsWith("+")
    ? digits.length >= 8 && digits.length <= 15
    : digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}
function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}
function errorMessage(body: any) {
  return (
    body?.detail?.message ||
    body?.error?.message ||
    "Something went wrong. Please try again."
  );
}

export function WelcomeBookGenerator({
  workspace = false,
}: {
  workspace?: boolean;
}) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(!workspace);
  const [demoPaused, setDemoPaused] = useState(false);
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<Generated | null>(null);
  const [createdAt, setCreatedAt] = useState(0);
  const [picks, setPicks] = useState<WelcomePick[]>([]);
  const [guestName, setGuestName] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [checkout, setCheckout] = useState(DEFAULT_CHECKOUT);
  const [photo, setPhoto] = useState<string | null>(null);
  const [neutralBackground, setNeutralBackground] = useState(false);
  const [kit, setKit] = useState<KitDetails>({
    ...DEFAULT_KIT,
    rules: [],
    checkoutSteps: [],
  });
  const [bookTheme, setBookTheme] = useState<BookTheme>("forest");
  const [paperSize, setPaperSize] = useState<PaperSize>("letter");
  const [excludedPages, setExcludedPages] = useState<string[]>([]);
  const [step, setStep] = useState(4);
  const [propertySection, setPropertySection] = useState(0);
  const [guestSection, setGuestSection] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [captchaReset, setCaptchaReset] = useState(0);
  const [deliveryToken, setDeliveryToken] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [pendingAction, setPendingAction] = useState<"art" | "kit" | "png" | null>(null);
  const [artwork, setArtwork] = useState<string | null>(null);
  const [useArtwork, setUseArtwork] = useState(true);
  const [artDescription, setArtDescription] = useState("");
  const [artBusy, setArtBusy] = useState(false);
  const [deliverySent, setDeliverySent] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactState, setContactState] = useState<
    "idle" | "sending" | "saved" | "error"
  >("idle");
  const [contactError, setContactError] = useState("");
  const [exportKind, setExportKind] = useState<"kit" | "png" | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [previewPage, setPreviewPage] = useState<number | null>(null);
  const [handoffState, setHandoffState] = useState<"idle" | "waiting" | "sent">(
    "idle",
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const handoffWindow = useRef<Window | null>(null);
  const handoffCleanup = useRef<(() => void) | null>(null);
  const onToken = useCallback((value: string | null) => setToken(value), []);

  useEffect(() => {
    const draft = readDraft();
    if (draft) {
      setResult(draft.result);
      setCreatedAt(draft.createdAt);
      setPicks(draft.picks);
      setGuestName(draft.guestName);
      setPropertyName(draft.propertyName);
      setMessage(draft.message);
      setCheckout(draft.checkout);
      setNeutralBackground(draft.neutralBackground);
      setAddress(draft.result.location.formatted_address);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!workspace || !loaded || !result) return;
    saveDraft({
      version: 2,
      createdAt,
      result,
      guestName,
      propertyName,
      message,
      checkout,
      picks,
      neutralBackground,
    });
  }, [
    workspace,
    loaded,
    result,
    createdAt,
    guestName,
    propertyName,
    message,
    checkout,
    picks,
    neutralBackground,
  ]);
  useEffect(
    () => () => {
      if (photo) URL.revokeObjectURL(photo);
    },
    [photo],
  );
  useEffect(() => () => handoffCleanup.current?.(), []);

  function goStep(next: number) {
    setStep(next);
    if (next === 0 || next === 1) setHandoffState("idle");
    setError("");
    track("welcome_generator_step_viewed", { step: next + 1 });
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  async function generate(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (address.trim().length < 3) {
      setError("Enter your rental’s street address and city.");
      return;
    }
    if (NEEDS_CAPTCHA && !token) {
      setError("Please complete the quick check below.");
      return;
    }
    setBusy(true);
    setError("");
    track("welcome_generator_submitted");
    try {
      const res = await fetch(`${API_URL}/api/v1/guests/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(45000),
        body: JSON.stringify({
          address: address.trim(),
          turnstile_token: token,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(errorMessage(body));
      const data: Generated = body.data;
      if (!data?.location?.formatted_address || !Array.isArray(data.picks))
        throw new Error("We couldn’t prepare this address. Please try again.");
      const draft: GuideDraft = {
        version: 2,
        createdAt: Date.now(),
        result: data,
        guestName: "",
        propertyName: data.location.city
          ? `Your stay in ${data.location.city}`
          : "Your rental",
        message: DEFAULT_MESSAGE,
        checkout: DEFAULT_CHECKOUT,
        picks: data.picks,
        neutralBackground: false,
      };
      if (!saveDraft(draft))
        throw new Error(
          "Allow browser storage for this site so we can open your guide. Your address stays out of the URL.",
        );
      track("welcome_generator_generated", { picks: data.picks.length });
      router.push(RESULT_PATH);
    } catch (err) {
      setError(
        err instanceof Error && err.name !== "TimeoutError"
          ? err.message
          : "This is taking longer than expected. Please try again.",
      );
      track("welcome_generator_failed");
    } finally {
      setBusy(false);
      setToken(null);
      setCaptchaReset((n) => n + 1);
    }
  }
  async function onPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!PHOTO_TYPES.includes(file.type) || file.size > 20 * 1024 * 1024) {
      setPhotoError("Choose a JPG, PNG or WebP photo under 20 MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      setPhoto(url);
      setPhotoError("");
      track("welcome_generator_photo_added");
    } catch {
      URL.revokeObjectURL(url);
      setPhotoError(
        "That photo couldn’t be opened. Please choose another image.",
      );
    }
  }
  function toggle(list: "rules" | "checkoutSteps", item: string) {
    setKit((k) => ({
      ...k,
      [list]: k[list].includes(item)
        ? k[list].filter((x) => x !== item)
        : [...k[list], item],
    }));
  }
  const screen: WelcomeScreenData = {
    guest_name: guestName.trim(),
    property_name: propertyName.trim(),
    welcome_message: message.trim(),
    checkout_text: checkout.trim(),
    background_url:
      (useArtwork && artwork) || photo || (neutralBackground ? null : (result?.background_url ?? null)),
    picks,
    utc_offset_minutes: result?.utc_offset_minutes,
    weather: result?.weather,
  };
  const kitData: KitData = {
    propertyName: propertyName.trim(),
    address: result?.location.formatted_address || address,
    photo: (useArtwork && artwork) || photo,
    artwork: useArtwork ? artwork : null,
    theme: bookTheme,
    message: message.trim(),
    checkout: checkout.trim(),
    city: result?.location.city || "",
    picks,
    details: { ...kit, wifiName: kit.wifiName, wifiPassword: kit.wifiPassword },
  };
  const availablePages = availableKitPages(kitData);
  const selectedPages = availablePages.filter(
    (p) => !excludedPages.includes(p.key),
  );
  const review = guideReview(kitData);
  const removed = (result?.picks || []).filter(
    (p) => !picks.some((selected) => selected.place_id === p.place_id),
  );
  async function createArtwork(verifiedToken = deliveryToken) {
    if (!verifiedToken) { setPendingAction("art"); return; }
    if (artBusy) return;
    setArtBusy(true); setError("");
    try {
      const form = new FormData();
      form.append("theme", bookTheme);
      form.append("city", result?.location.city || "");
      form.append("description", artDescription);
      if (photo) form.append("photo", await (await fetch(photo)).blob(), "property.jpg");
      const data = await generatorRequest("artwork", { method: "POST", headers: { Authorization: `Bearer ${verifiedToken}` }, body: form });
      setArtwork(data.url); setUseArtwork(true); setBookTheme(data.theme);
      track("welcome_generator_art_created");
    } catch (cause) { if ((cause as {status?: number})?.status === 401) setDeliveryToken(""); setError(cause instanceof Error ? cause.message : "We couldn’t create the artwork."); }
    finally { setArtBusy(false); }
  }
  async function download(kind: "kit" | "png", verifiedToken = deliveryToken) {
    if (!verifiedToken) { setPendingAction(kind); return; }
    if (exportKind) return;
    setExportKind(kind); setError(""); setDeliverySent(false);
    try {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await document.fonts.ready;
      const stage = stageRef.current;
      if (!stage) throw new Error("Missing export");
      let blob: Blob;
      if (kind === "kit") blob = await buildKitPdf(Array.from(stage.children) as HTMLElement[], {
        paper: paperSize, title: `${propertyName || "Your stay"} | Guest welcome book`,
      });
      else {
        await Promise.all(Array.from(stage.querySelectorAll("img")).map(img => img.decode().catch(() => undefined)));
        const { toPng } = await import("html-to-image");
        blob = await (await fetch(await toPng(stage, { includeQueryParams: true, width: 1920, height: 1080, pixelRatio: 1, backgroundColor: "#17130F" }))).blob();
      }
      const form = new FormData(); form.append("kind", kind);
      form.append("file", blob, kind === "kit" ? "guest-book.pdf" : "welcome-screen.png");
      await generatorRequest("delivery", { method: "POST", headers: { Authorization: `Bearer ${verifiedToken}` }, body: form });
      setDeliverySent(true);
      track("welcome_generator_download_emailed", { kind, picks: picks.length });
    } catch (cause) { if ((cause as {status?: number})?.status === 401) setDeliveryToken(""); setError(cause instanceof Error ? cause.message : "We couldn’t email the download. Your edits are still here."); }
    finally { setExportKind(null); }
  }
  async function submitContact(event: React.FormEvent) {
    event.preventDefault();
    if (contactState === "sending") return;
    const e = email.trim(),
      p = phone.trim();
    if (!e && !p) {
      setContactError(
        "Add an email or phone number so we can help you. This help request is separate from your download.",
      );
      return;
    }
    if (e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      setContactError("Please check your email address.");
      return;
    }
    if (p && !phoneValid(p)) {
      setContactError(
        "Include your area code, or use + and your country code.",
      );
      return;
    }
    if (NEEDS_CAPTCHA && !token) {
      setContactError("Please complete the quick check below.");
      return;
    }
    setContactState("sending");
    setContactError("");
    try {
      const res = await fetch(`${API_URL}/api/v1/guests/generator-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          email: e || null,
          phone: p || null,
          city: result?.location.city || null,
          picks: picks.length,
          intent: "setup_help",
          turnstile_token: token,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.data?.recorded !== true)
        throw new Error("not recorded");
      setContactState("saved");
      track("welcome_generator_lead", { shared_email: !!e, shared_phone: !!p });
    } catch {
      setContactState("error");
      setContactError(
        "We couldn’t save your request. Please try again, or email yohanes@piads.co. You can still download your guide.",
      );
    } finally {
      setToken(null);
      setCaptchaReset((n) => n + 1);
    }
  }
  function connectTv() {
    if (!result || handoffState === "waiting") return;
    if (
      handoffState === "sent" &&
      handoffWindow.current &&
      !handoffWindow.current.closed
    ) {
      handoffWindow.current.focus();
      return;
    }
    handoffCleanup.current?.();
    setError("");
    const draft = parseWelcomeHandoff({
      version: 1,
      guideStyle:
        bookTheme === "coast"
          ? "postcard"
          : bookTheme === "clay"
            ? "journal"
            : "illustrated",
      createdAt: Date.now(),
      address: result.location.formatted_address,
      propertyName: propertyName.trim(),
      guestName: guestName.trim(),
      message: message.trim(),
      checkout: checkout.trim(),
      picks: picks.map((p) => ({
        place_id: p.place_id,
        name: p.name,
        blurb: p.blurb || "",
      })),
    });
    if (!draft) {
      setError("Please check your property details before continuing.");
      return;
    }
    const app = new URL(APP_URL);
    const nonce = crypto.randomUUID();
    const url = new URL("/welcome-import", app);
    url.searchParams.set("source", window.location.origin);
    url.searchParams.set("request", nonce);
    const popup = window.open(url.toString(), "_blank");
    if (!popup) {
      setError(
        "Allow a new tab for PiAds, then select Continue again. Your guide is still here.",
      );
      return;
    }
    handoffWindow.current = popup;
    setHandoffState("waiting");
    const timeout = window.setTimeout(() => {
      cleanup();
      setHandoffState("idle");
      setError(
        "The app didn’t receive your guide. Keep this page open and try again.",
      );
    }, 30000);
    function receive(event: MessageEvent) {
      if (
        event.origin !== app.origin ||
        event.source !== popup ||
        event.data?.request !== nonce
      )
        return;
      if (event.data.type === "piads:welcome-ready")
        popup!.postMessage(
          { type: "piads:welcome-draft", request: nonce, draft },
          app.origin,
        );
      if (event.data.type === "piads:welcome-saved") {
        cleanup();
        setHandoffState("sent");
        trackCta("Continue with my guide", "welcome-generator", {
          picks: picks.length,
        });
      }
      if (event.data.type === "piads:welcome-error") {
        cleanup();
        setHandoffState("idle");
        setError(
          "The app couldn’t save your guide in this browser. Allow browser storage and try again.",
        );
      }
    }
    function cleanup() {
      window.clearTimeout(timeout);
      window.removeEventListener("message", receive);
      handoffCleanup.current = null;
    }
    window.addEventListener("message", receive);
    handoffCleanup.current = cleanup;
  }

  if (!workspace)
    return (
      <section className={styles.hero} aria-labelledby="generator-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <Sparkles size={14} aria-hidden /> Free host starter kit
          </p>
          <h1 id="generator-title" className={styles.title}>
            A warmer welcome.
            <br />
            <em>One address away.</em>
          </h1>
          <p className={styles.lede}>
            Start with your rental’s address. Choose a design, add your details
            and favorite places, then get your finished guide by email.
          </p>
          <form className={styles.form} onSubmit={generate}>
            <label className={styles.inputWrap}>
              <MapPin size={18} aria-hidden />
              <span className="sr-only">Rental address</span>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, city and state"
                autoComplete="street-address"
                maxLength={200}
                required
                disabled={busy}
              />
            </label>
            <button type="submit" className={styles.generate} disabled={busy}>
              {busy ? (
                <>
                  <Loader2 size={18} className={styles.spin} /> Creating your
                  guide…
                </>
              ) : (
                <>
                  Create with AI <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          <TurnstileWidget onToken={onToken} resetKey={captchaReset} />
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          {busy && (
            <p role="status" className={styles.tvCaption}>
              Finding your location and nearby places. This may take a few
              moments.
            </p>
          )}
          <ul className={styles.heroPoints}>
            <li>
              <Check size={15} /> Free to create · downloads by email
            </li>
            <li>
              <Check size={15} /> A complete guest welcome book
            </li>
            <li>
              <Check size={15} /> A preview for your TV
            </li>
          </ul>
          {loaded && result && (
            <Link href={RESULT_PATH} className={styles.textButton}>
              Continue editing my guide <ArrowRight size={15} />
            </Link>
          )}
        </div>
        <div className={styles.landingPreview}>
          <div className={styles.tv}>
            <div className={styles.tvScreen}>
              <WelcomeScreen data={DEMO_WELCOME} paused={demoPaused} />
            </div>
          </div>
          <div className={styles.demoFooter}>
            <p className={styles.tvCaption}>
              This is how your TV welcome works. Example places and weather;
              your guide uses your property’s details.
            </p>
            <button type="button" className={styles.demoPause}
              aria-pressed={demoPaused} onClick={() => setDemoPaused((value) => !value)}>
              {demoPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
              {demoPaused ? "Resume scrolling" : "Pause scrolling"}
            </button>
          </div>
        </div>
      </section>
    );

  if (!loaded)
    return (
      <section className={styles.empty}>
        <Loader2 className={styles.spin} />
        <p role="status">Opening your guide…</p>
      </section>
    );
  if (!result)
    return (
      <section className={styles.empty}>
        <MapPin size={32} />
        <h1>Let’s start with your address</h1>
        <p>
          Your guide is kept in this browser tab for one hour. Create a new one
          to continue.
        </p>
        <Link href={GENERATOR_PATH} className={styles.primary}>
          Create with AI <ArrowRight size={18} />
        </Link>
      </section>
    );

  return (
    <>
      <section
        className={styles.workspace}
        aria-label="Welcome guide workspace"
        data-editing={step >= 0 && step < 2}
      >
        <div className={styles.workspaceHead}>
          <Link href={GENERATOR_PATH} className={styles.textButton}>
            <ArrowLeft size={16} /> Change address
          </Link>
          <span className={styles.privacyNote}>
            <Lock size={12} /> Free to edit · email your download
          </span>
        </div>
        <nav className={styles.creationSteps} aria-label="Create with AI progress">
          {[
            { id: 4, label: "Design" },
            { id: 0, label: "Your place & favorites" },
            { id: 1, label: "Guest details" },
            { id: 2, label: "Review & email" },
          ].map((stage, index) => (
            <button key={stage.id} type="button" aria-current={step === stage.id ? "step" : undefined}
              onClick={() => goStep(stage.id)} disabled={artBusy || !!exportKind}>
              <span>{index + 1}</span>{stage.label}
            </button>
          ))}
        </nav>
        <h2 ref={headingRef} tabIndex={-1} className={styles.stepHeading}>
          {({ 4: "Make the design yours", 0: "A welcome that feels like your place", 1: "The details guests need", 2: "Your guide, ready to share", 3: "Connect your TV" } as Record<number, string>)[step]}
        </h2>
        <p className={styles.stepDescription}>
          {step === 4 ? "Choose your look. We’ll help you personalize the whole guide, one step at a time."
            : step === 2 ? "Review your guide, then we’ll email you a private download link. No account needed."
            : step === 3 ? "Bring your welcome to your TV with PiAds."
            : "Add what you know now. You can move back and forth without losing your edits."}
        </p>
        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}
        {step === 0 && (
          <div className={styles.editingWorkspace}>
            <GuidePreviewPanel
              className={styles.previewColumn}
              label="Preview your TV welcome"
            >
              <div className={styles.tv}>
                <div className={styles.tvScreen}>
                  <WelcomeScreen data={screen} />
                </div>
              </div>
              <p className={styles.tvCaption}>
                TV layout preview. The guide QR is a sample; your connected
                screen gets its own code.
              </p>
              <div className={styles.tip}>
                Your design and local favorites appear together here. You can change
                the artwork in the Design step at any time.
              </div>
            </GuidePreviewPanel>
            <aside className={styles.panel} aria-label="Welcome screen details">
              <FocusedGuide
                onDone={() => goStep(1)}
                doneLabel="Continue to guest details"
                onBack={() => goStep(4)}
                activeSection={propertySection}
                onSectionChange={setPropertySection}
                sectionLabel="Your place & favorites"
                titles={[
                  "Your property",
                  "Welcome & checkout",
                  "Local suggestions",
                ]}
              >
                <div>
                  <Field label="Property name">
                    <input
                      value={propertyName}
                      maxLength={60}
                      onChange={(e) => setPropertyName(e.target.value)}
                    />
                  </Field>
                  <Field
                    label="Guest name (optional)"
                    hint="Leave blank for a welcome that works for every stay."
                  >
                    <input
                      value={guestName}
                      maxLength={40}
                      placeholder="e.g. Maya"
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                  </Field>
                </div>
                <div>
                  <Field label="Welcome message">
                    <textarea
                      rows={3}
                      value={message}
                      maxLength={140}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Field>
                  <Field label="Checkout note">
                    <textarea
                      rows={3}
                      value={checkout}
                      maxLength={120}
                      onChange={(e) => setCheckout(e.target.value)}
                    />
                  </Field>
                </div>
                <div>
                  <p className={styles.privacyNote}>
                    Review these suggestions before sharing with guests. Hours
                    may change.
                  </p>
                  <LocalFavoriteSearch
                    address={result.location.formatted_address}
                    picks={picks}
                    onAdd={(pick) =>
                      setPicks((current) =>
                        current.length < 12 &&
                        !current.some(
                          (existing) => existing.place_id === pick.place_id,
                        )
                          ? [...current, pick]
                          : current,
                      )
                    }
                  />
                  <LocalFavoritesGallery
                    picks={picks}
                    onChangeTip={(id, blurb) =>
                      setPicks((current) =>
                        current.map((pick) =>
                          pick.place_id === id ? { ...pick, blurb } : pick,
                        ),
                      )
                    }
                    onRemove={(id) => {
                      setPicks((current) =>
                        current.filter((pick) => pick.place_id !== id),
                      );
                      track("welcome_generator_pick_removed");
                    }}
                  />
                  {removed.length > 0 && (
                    <details className={styles.restore}>
                      <summary>
                        Restore removed places ({removed.length})
                      </summary>
                      {removed.map((p) => (
                        <button
                          key={p.place_id}
                          type="button"
                          disabled={picks.length >= 12}
                          onClick={() =>
                            setPicks((current) =>
                              current.length < 12 &&
                              !current.some(
                                (pick) => pick.place_id === p.place_id,
                              )
                                ? [...current, p]
                                : current,
                            )
                          }
                        >
                          <RotateCcw size={14} /> {p.name}
                        </button>
                      ))}
                    </details>
                  )}
                </div>
              </FocusedGuide>
            </aside>
          </div>
        )}

        {step === 4 && (
          <div className={styles.designWorkspace}>
            <div className={styles.designPage} aria-label="Your cover preview">
              <div style={{width:PAGE_W,height:PAGE_H,transform:"scale(.42)",transformOrigin:"top left"}}>{(() => { const Cover = KIT_PAGES[0].Page; return <Cover data={kitData} />; })()}</div>
            </div>
            <div>
              <fieldset className={styles.stylePicker}>
                <legend>Choose your book’s style</legend>
                <div>
                  {BOOK_THEMES.map((theme) => (
                    <button
                      key={theme.key}
                      type="button"
                      aria-pressed={bookTheme === theme.key}
                      onClick={() => setBookTheme(theme.key)}
                      disabled={artBusy}
                    >
                      <span
                        style={{
                          background: theme.paper,
                          borderColor: theme.ink,
                          color: theme.ink,
                        }}
                      >
                        Aa
                      </span>
                      {theme.name}
                    </button>
                  ))}
                </div>
              </fieldset>
              <section className={styles.aiDesign} aria-label="AI design personalization">
                <span><Sparkles size={18} /> MADE FOR YOUR PROPERTY</span>
                <h3>Create your own artwork</h3>
                <p>Turn your property photo into artwork, or create a scene inspired by your location. Your selected style guides the colors and finish.</p>
                <Field label="What does your place feel like?" hint="Optional. No guest names, door codes or private details.">
                  <textarea rows={3} maxLength={500} value={artDescription} onChange={e => setArtDescription(e.target.value)} placeholder="A cozy cedar cabin, pine trees, warm light and sage-green interiors…" />
                </Field>
                <label className={styles.photoButton}>
                  <ImagePlus size={17} /> {photo ? "Change property photo" : "Add a property photo (optional)"}
                  <input type="file" accept={PHOTO_TYPES.join(",")} onChange={onPhoto} className="sr-only" disabled={artBusy} />
                </label>
                {photoError && <p role="alert" className={styles.error}>{photoError}</p>}
                {photo && <button className={styles.textButton} onClick={() => setPhoto(null)} type="button" disabled={artBusy}>Remove uploaded photo</button>}
                <small>{photo ? "Your uploaded photo will be sent to our AI image provider when you create artwork." : "Without a photo, artwork is inspired by your city and description."}</small>
                {artwork ? <><p role="status">Your AI artwork is ready. You can still change text and layout.</p><label><input type="checkbox" checked={useArtwork} onChange={e => setUseArtwork(e.target.checked)} /> Use my AI artwork on the cover and TV preview</label></> : <button className={styles.primary} type="button" disabled={artBusy} onClick={() => createArtwork()}>{artBusy ? <Loader2 size={18} className={styles.spin} /> : <Sparkles size={18} />}{artBusy ? "Creating your artwork…" : "Create my free AI artwork"}</button>}
                <small>One free artwork per verified email and phone. AI artwork is decorative; review it before sharing. Your guide text stays editable.</small>
              </section>
              <label className={styles.checkLabel}><input type="checkbox" checked={neutralBackground} onChange={e => setNeutralBackground(e.target.checked)} /> Use a neutral TV background when no artwork or photo is selected</label>
              <p className={styles.privacyNote}>{artwork && useArtwork ? "Your artwork is included. Next, add your property details and favorite local places." : "You can continue with this style now, or create your free artwork above. We’ll verify your email once for artwork and downloads."}</p>
              <button type="button" className={styles.primary} disabled={artBusy} onClick={() => goStep(0)}>Continue to your place <ArrowRight size={18} /></button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.editingWorkspace}>
            <GuidePreviewPanel
              className={styles.bookPreview}
              label="Preview your book pages"
            >
              <div
                className={styles.pagePreviews}
                role="region"
                aria-label="Guest book page previews"
                tabIndex={0}
              >
                {availablePages.map(({ key, label, Page }) => (
                  <article key={key} className={styles.pagePreview}>
                    <div
                      className={styles.thumb}
                      style={{ width: 200, height: (PAGE_H * 200) / PAGE_W }}
                    >
                      <div
                        style={{
                          width: PAGE_W,
                          height: PAGE_H,
                          transform: `scale(${200 / PAGE_W})`,
                          transformOrigin: "top left",
                        }}
                      >
                        <Page data={kitData} />
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.textButton}
                      onClick={() =>
                        setPreviewPage(
                          KIT_PAGES.findIndex((p) => p.key === key),
                        )
                      }
                      aria-label={`Preview ${label}`}
                    >
                      {label} <ZoomIn size={15} />
                    </button>
                  </article>
                ))}
              </div>
              <p className={styles.tvCaption}>
                Your guest book updates as you edit. House essentials and rules
                appear when you add them. Your AI artwork or uploaded property photo appears
                on the cover; suggested city photos are not included in the PDF.
              </p>
            </GuidePreviewPanel>
            <aside className={styles.panel} aria-label="Printable details">
              <p className={styles.privacyNote}>
                Your edits stay in this tab until you email a download. The finished file is then stored privately for delivery. Guide details are not sent to HubSpot. Keep entry codes in your private booking messages.
              </p>
              <FocusedGuide
                onDone={() => goStep(2)}
                doneLabel="Review & email my guide"
                onBack={() => goStep(0)}
                activeSection={guestSection}
                onSectionChange={setGuestSection}
                sectionLabel="Guest details"
                titles={[
                  "Your host",
                  "Arrival & parking",
                  "House essentials",
                  "Wi-Fi",
                  "House rules",
                  "Checkout",
                  "Custom notes",
                ]}
              >
                <div>
                  <Field label="Host name">
                    <input
                      value={kit.hostName}
                      maxLength={60}
                      placeholder="e.g. Alex & Sam"
                      onChange={(e) =>
                        setKit((k) => ({ ...k, hostName: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="How guests can contact you">
                    <input
                      value={kit.hostContact}
                      maxLength={100}
                      placeholder="e.g. Message us through your booking app"
                      onChange={(e) =>
                        setKit((k) => ({ ...k, hostContact: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Check-in time">
                    <input
                      value={kit.checkIn}
                      maxLength={60}
                      placeholder="e.g. From 3 PM"
                      onChange={(e) =>
                        setKit((k) => ({ ...k, checkIn: e.target.value }))
                      }
                    />
                  </Field>
                </div>
                <div>
                  <Field label="Arrival instructions">
                    <textarea
                      value={kit.arrival}
                      rows={3}
                      maxLength={220}
                      placeholder="How to find the entrance and collect keys. Send access codes separately."
                      onChange={(e) =>
                        setKit((k) => ({ ...k, arrival: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Parking & getting around">
                    <textarea
                      value={kit.parking}
                      rows={3}
                      maxLength={220}
                      placeholder="Where to park, any restrictions, or a useful transit stop."
                      onChange={(e) =>
                        setKit((k) => ({ ...k, parking: e.target.value }))
                      }
                    />
                  </Field>
                </div>
                <div>
                  <Field label="TV, heating, appliances & amenities">
                    <textarea
                      value={kit.homeTips}
                      rows={3}
                      maxLength={600}
                      placeholder="The useful things guests usually ask you about."
                      onChange={(e) =>
                        setKit((k) => ({ ...k, homeTips: e.target.value }))
                      }
                    />
                  </Field>
                  <Field
                    label="Safety information"
                    hint="Add only details you have checked for this property."
                  >
                    <textarea
                      value={kit.safety}
                      rows={3}
                      maxLength={400}
                      placeholder="Where guests can find first aid supplies, the fire extinguisher, and exit information."
                      onChange={(e) =>
                        setKit((k) => ({ ...k, safety: e.target.value }))
                      }
                    />
                  </Field>
                </div>
                <div>
                  <Field label="Wi-Fi network (optional)">
                    <input
                      value={kit.wifiName}
                      maxLength={32}
                      autoComplete="off"
                      onChange={(e) =>
                        setKit((k) => ({ ...k, wifiName: e.target.value }))
                      }
                    />
                  </Field>
                  <Field
                    label="Wi-Fi password (optional)"
                    hint="Included in your privately stored PDF when you request email delivery. Keep door codes in private booking messages."
                  >
                    <input
                      value={kit.wifiPassword}
                      maxLength={63}
                      autoComplete="off"
                      spellCheck={false}
                      onChange={(e) =>
                        setKit((k) => ({ ...k, wifiPassword: e.target.value }))
                      }
                    />
                  </Field>
                </div>
                <div>
                  <fieldset className={styles.checks}>
                    <legend>House rules</legend>
                    {HOUSE_RULES.map((rule) => (
                      <label key={rule}>
                        <input
                          type="checkbox"
                          checked={kit.rules.includes(rule)}
                          onChange={() => toggle("rules", rule)}
                        />
                        {rule}
                      </label>
                    ))}
                  </fieldset>
                </div>
                <div>
                  <fieldset className={styles.checks}>
                    <legend>Checkout steps</legend>
                    {CHECKOUT_STEPS.map((item) => (
                      <label key={item}>
                        <input
                          type="checkbox"
                          checked={kit.checkoutSteps.includes(item)}
                          onChange={() => toggle("checkoutSteps", item)}
                        />
                        {item}
                      </label>
                    ))}
                  </fieldset>
                </div>
                <div>
                  <Field
                    label="Your own house rules"
                    hint="One per line, up to four."
                  >
                    <textarea
                      rows={2}
                      value={kit.customRules}
                      maxLength={280}
                      onChange={(e) =>
                        setKit((k) => ({
                          ...k,
                          customRules: e.target.value
                            .split("\n")
                            .slice(0, 4)
                            .join("\n"),
                        }))
                      }
                    />
                  </Field>
                  <Field
                    label="Your own checkout steps"
                    hint="One per line, up to four."
                  >
                    <textarea
                      rows={2}
                      maxLength={280}
                      value={kit.customCheckout}
                      onChange={(e) =>
                        setKit((k) => ({
                          ...k,
                          customCheckout: e.target.value
                            .split("\n")
                            .slice(0, 4)
                            .join("\n"),
                        }))
                      }
                    />
                  </Field>
                </div>
              </FocusedGuide>
              <p className={styles.privacyNote}>
                <Lock size={13} /> These details stay in your browser and
                downloads.
              </p>
            </aside>
          </div>
        )}

        {step === 2 && (
          <>
            <section
              className={styles.bookReview}
              aria-label="Review your guest book"
            >
              <div>
                <h3>Make it guest-ready</h3>
                <p>
                  These are reminders, not requirements. Review every page
                  before sharing. Your file contains any Wi-Fi and host contact
                  details you entered.
                </p>
              </div>
              <ul>
                {review.map((item) => (
                  <li key={item.label} data-ready={item.ready}>
                    {item.ready ? (
                      <Check size={16} />
                    ) : (
                      <span aria-hidden>○</span>
                    )}
                    {item.label}
                    <span>{item.ready ? "Added" : "Not added"}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.textButton}
                onClick={() => goStep(1)}
              >
                Edit property details <ArrowRight size={16} />
              </button>
            </section>
            <div className={styles.downloadCards}>
              <article>
                <FileText size={28} />
                <h3>Your guest welcome book</h3>
                <p>
                  A coordinated book for your property, with working Wi-Fi codes
                  and clickable Google Maps cards. Choose the pages you want to
                  share.
                </p>
                <fieldset className={styles.pageChoices}>
                  <legend>Include in your PDF</legend>
                  {availablePages.map((p) => (
                    <label key={p.key}>
                      <input
                        type="checkbox"
                        checked={!excludedPages.includes(p.key)}
                        onChange={(e) =>
                          setExcludedPages((old) =>
                            e.target.checked
                              ? old.filter((key) => key !== p.key)
                              : [...old, p.key],
                          )
                        }
                      />
                      {p.label}
                    </label>
                  ))}
                </fieldset>
                <Field label="Paper size">
                  <select
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value as PaperSize)}
                  >
                    <option value="letter">US Letter (8.5 × 11 in)</option>
                    <option value="a4">A4 (210 × 297 mm)</option>
                  </select>
                </Field>
                <button
                  type="button"
                  className={styles.primary}
                  onClick={() => download("kit")}
                  disabled={!!exportKind || !selectedPages.length}
                >
                  {exportKind === "kit" ? (
                    <Loader2 className={styles.spin} size={18} />
                  ) : (
                    <Download size={18} />
                  )}{" "}
                  {exportKind === "kit" ? "Preparing & emailing your PDF…" : `Email my ${selectedPages.length}-page PDF`}
                </button>
                <small>
                  Your finished file is stored privately and emailed as a link valid for 7 days. Print at actual size on your selected paper. Or send the PDF
                  privately through your booking app. Test Wi-Fi and map links
                  before sharing. Host message templates below stay out of the
                  guest book.
                </small>
              </article>
              <article>
                <Monitor size={28} />
                <h3>Save your TV image</h3>
                <p>
                  A 1920 × 1080 still image with your first four local picks.
                  Use your TV’s photo app or a USB drive if supported.
                </p>
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={() => download("png")}
                  disabled={!!exportKind}
                >
                  {exportKind === "png" ? (
                    <Loader2 className={styles.spin} size={18} />
                  ) : (
                    <Download size={18} />
                  )}{" "}
                  {exportKind === "png" ? "Preparing & emailing your image…" : "Email my TV image"}
                </button>
                <small>
                  The downloaded image leaves out the live clock, weather and
                  sample QR. Use the printable Wi-Fi sign for a working Wi-Fi
                  code.
                </small>
              </article>
            </div>
            {deliverySent && (
              <div className={styles.success} role="status">
                <Check size={20} />
                <div>
                  <strong>Your download link is on its way.</strong>
                  <p>Check {deliveryEmail}, including your spam folder. Your private link works for 7 days. Anyone you share it with can open it.</p>
                </div>
              </div>
            )}
            <h3 className={styles.kitSubhead}>Copy your guest messages</h3>
            <ul className={styles.messages}>
              {guestMessages(kitData).map((m) => (
                <li key={m.title}>
                  <div className={styles.messageHead}>
                    <strong>{m.title}</strong>
                    <span>{m.when}</span>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(m.text);
                          setCopied(m.title);
                          track("welcome_generator_message_copied", {
                            message: m.title,
                          });
                        } catch {
                          setError(
                            "Copy isn’t available in this browser. Select the message text and copy it instead.",
                          );
                        }
                      }}
                    >
                      {copied === m.title ? (
                        <Check size={14} />
                      ) : (
                        <Copy size={14} />
                      )}
                      {copied === m.title ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p>{m.text}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === 3 && (
          <div className={styles.kitGrid}>
            <div className={styles.connectCard}>
              <Monitor size={30} />
              <h3>Your guide is the starting point.</h3>
              <ol>
                <li>
                  <strong>Create your PiAds account</strong>
                  <p>
                    Your property name, address, welcome text, checkout note and
                    selected places come with you.
                  </p>
                </li>
                <li>
                  <strong>Confirm your property</strong>
                  <p>
                    Review your details and create your first screen. Add your
                    photo and Wi-Fi securely in the app.
                  </p>
                </li>
                <li>
                  <strong>Connect your TV</strong>
                  <p>
                    Open the PiAds player on a supported TV or streaming device,
                    then enter its pairing code in the app. You can try a
                    browser player first.
                  </p>
                </li>
              </ol>
              <button
                type="button"
                onClick={connectTv}
                className={styles.primary}
                disabled={handoffState === "waiting"}
              >
                {handoffState === "waiting" ? (
                  <>
                    <Loader2 className={styles.spin} size={18} /> Opening PiAds…
                  </>
                ) : (
                  <>
                    Continue with my guide <ArrowRight size={18} />
                  </>
                )}
              </button>
              {handoffState === "sent" && (
                <p role="status" className={styles.success}>
                  Your guide is ready in the PiAds tab. Continue there to sign
                  up.
                </p>
              )}
              <p className={styles.fineprint}>
                No card to start. Ongoing service is $10 per screen per month
                without ads, or free when your screen qualifies for ad-supported
                service.
              </p>
              <p className={styles.privacyNote}>
                Your AI artwork, uploaded photos, Wi-Fi details and printable checklists
                are in your emailed files. Add these in the app after signup. Your account won’t be created until you sign up.
              </p>
              <a
                className={styles.textButton}
                href={hostSignupUrl(APP_URL, "short_term_rental")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start without importing my guide
              </a>
            </div>
            <aside className={styles.panel}>
              <h3>Want help getting set up?</h3>
              <p className={styles.stepDescription}>
                Optional. Share a way to reach you and the PiAds team can follow
                up about your TV setup.
              </p>
              {contactState === "saved" ? (
                <p role="status" className={styles.success}>
                  <Check size={18} /> Your request is saved. We’ll follow up
                  using the details you shared.
                </p>
              ) : (
                <form
                  onSubmit={submitContact}
                  noValidate
                  className={styles.contactForm}
                >
                  <Field label="Email (optional)">
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={254}
                    />
                  </Field>
                  <Field label="Phone (optional)">
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={32}
                    />
                  </Field>
                  <TurnstileWidget onToken={onToken} resetKey={captchaReset} />
                  <button
                    type="submit"
                    className={styles.secondary}
                    disabled={contactState === "sending"}
                  >
                    {contactState === "sending"
                      ? "Saving your request…"
                      : "Request setup help"}
                  </button>
                  {contactError && (
                    <p role="alert" className={styles.error}>
                      {contactError}
                    </p>
                  )}
                  <p className={styles.privacyNote}>
                    By requesting help, you’re asking PiAds to contact you about
                    setup. This is separate from downloading your kit.
                  </p>
                </form>
              )}
            </aside>
          </div>
        )}
        {step === 2 && (
          <footer className={styles.flowFooter}>
            <button
              type="button"
              className={styles.textButton}
              onClick={() => goStep(1)}
            >
              <ArrowLeft size={16} /> Back to guest details
            </button>
            <button
              type="button"
              className={styles.secondary}
              onClick={() => goStep(3)}
            >
              Next: put this on my TV{" "}
              <ArrowRight size={18} />
            </button>
          </footer>
        )}
      </section>
      <GeneratorAccess open={pendingAction !== null} onClose={() => setPendingAction(null)} onVerified={(verifiedToken, verifiedEmail) => {
        const action = pendingAction; setDeliveryToken(verifiedToken); setDeliveryEmail(verifiedEmail); setPendingAction(null);
        if (action === "art") void createArtwork(verifiedToken);
        else if (action) void download(action, verifiedToken);
      }} />
      <Dialog.Root
        open={previewPage !== null}
        onOpenChange={(open) => {
          if (!open) setPreviewPage(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className={styles.previewOverlay} />
          <Dialog.Content className={styles.previewDialog}>
            <div className={styles.previewDialogHeader}>
              <Dialog.Title>
                {previewPage !== null
                  ? KIT_PAGES[previewPage].label
                  : "Page preview"}
              </Dialog.Title>
              <Dialog.Close
                className={styles.textButton}
                aria-label="Close page preview"
              >
                <X size={22} />
              </Dialog.Close>
            </div>
            <Dialog.Description className={styles.privacyNote}>
              Preview of the page included in your PDF. Scroll to see the full
              page.
            </Dialog.Description>
            <div className={styles.fullPage}>
              {previewPage !== null &&
                (() => {
                  const Page = KIT_PAGES[previewPage].Page;
                  return <Page data={kitData} />;
                })()}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {exportKind && (
        <div
          aria-hidden
          className={styles.exportStage}
          style={{
            width: exportKind === "kit" ? PAGE_W : 1920,
            height: "auto",
          }}
        >
          <div
            ref={stageRef}
            style={
              exportKind === "png"
                ? { position: "relative", width: 1920, height: 1080 }
                : undefined
            }
          >
            {exportKind === "kit" ? (
              selectedPages.map(({ key, Page }) => (
                <Page key={key} data={kitData} />
              ))
            ) : (
              <WelcomeScreen data={screen} frozen />
            )}
          </div>
        </div>
      )}
    </>
  );
}
