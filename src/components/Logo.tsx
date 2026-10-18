/* eslint-disable @next/next/no-img-element */
// TEMPORARY: cropped from the supplied brand images (tile from the official
// lockup, wordmarks from the light and dark versions). Replace with the
// official skills-mark.svg and lockup files when supplied; see README.
// The logo is never redrawn or recoloured here.

import { asset } from "@/lib/paths";

// Proportions of the official lockup: tile 250px, gap 52px, wordmark 412×205
// starting 5px above the tile.
export function Lockup({ height = 36, className = "" }: { height?: number; className?: string }) {
  const s = height / 250;
  const wordH = Math.round(205 * s);
  const wordW = Math.round(412 * s);
  return (
    <span className={`inline-flex items-start ${className}`} dir="ltr" style={{ gap: 52 * s }}>
      <Mark size={height} />
      <span style={{ marginTop: -5 * s }}>
        <img src={asset("/brand/temp-wordmark-dark.png")} alt="skills" width={wordW} height={wordH} className="only-dark" />
        <img src={asset("/brand/temp-wordmark-light.png")} alt="skills" width={wordW} height={wordH} className="only-light" />
      </span>
    </span>
  );
}

export function Mark({ size = 96, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={asset("/brand/temp-mark.png")}
      alt=""
      width={size}
      height={size}
      className={`mark-tile ${className}`}
      style={{ borderRadius: size * 0.23 }}
    />
  );
}
