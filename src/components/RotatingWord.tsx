"use client";

// Cycles through tool names in place. All words share one grid cell, so the
// line never changes width. Screen readers get the full list once; the
// animation itself is hidden from them. Static when reduced motion is on.

import { useEffect, useState } from "react";

export function RotatingWord({ words, separator = ", ", interval = 2200 }: { words: string[]; separator?: string; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <>
      <span className="sr-only">{words.join(separator)}</span>
      <bdi dir="ltr" className="rotating" aria-hidden="true">
        {words.map((word, i) => (
          <span key={word} data-active={i === index || undefined}>
            {word}
          </span>
        ))}
      </bdi>
    </>
  );
}
