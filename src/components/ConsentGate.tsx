"use client";

// Click-to-load wrapper for third-party embeds (TikTok, booking tool).
// Nothing is requested from the third party until the visitor agrees.
// The stored choice uses the same key the cookie banner will use.

import Link from "next/link";
import { useSyncExternalStore, useState } from "react";
import { Icon } from "./Icon";

export const CONSENT_KEY = "skills-consent";

type Consent = { embeds?: boolean };

function readConsent(): Consent {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}");
  } catch {
    return {};
  }
}

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

export function ConsentGate({
  src,
  title,
  labels,
  privacyHref,
  aspect = "9 / 16",
  maxWidth = 340,
}: {
  /** Embed URL; when empty the gate explains the video is not added yet */
  src?: string;
  title: string;
  labels: { embedTitle: string; embedBody: string; load: string; remember: string; privacy: string; missing: string };
  privacyHref: string;
  aspect?: string;
  maxWidth?: number;
}) {
  const stored = useSyncExternalStore(subscribe, () => readConsent().embeds === true, () => false);
  const [clicked, setClicked] = useState(false);
  const [remember, setRemember] = useState(false);
  const loaded = stored || clicked;

  const load = () => {
    if (remember) {
      try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...readConsent(), embeds: true }));
      } catch {
        // Storage blocked: load for this page view only.
      }
    }
    setClicked(true);
  };

  return (
    <div className="mx-auto w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface" style={{ aspectRatio: aspect, maxWidth }}>
      {loaded && src ? (
        <iframe src={src} title={title} className="h-full w-full" loading="lazy" allow="encrypted-media; fullscreen" allowFullScreen />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-surface-2 text-link">
            <Icon name={loaded ? "spark" : "lock"} size={24} />
          </span>
          <p className="font-bold">{labels.embedTitle}</p>
          {loaded ? (
            <p className="text-sm text-muted">{labels.missing}</p>
          ) : (
            <>
              <p className="text-sm text-muted">
                {labels.embedBody}{" "}
                <Link href={privacyHref} className="link">
                  {labels.privacy}
                </Link>
              </p>
              <button type="button" onClick={load} className="btn btn-primary btn-sm">
                <Icon name="play" size={16} />
                {labels.load}
              </button>
              <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-5 w-5 accent-[var(--link)]" />
                {labels.remember}
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
}
