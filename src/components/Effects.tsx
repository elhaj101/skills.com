"use client";

// Site-wide motion, attached once with delegated listeners (no per-card
// client components):
//  - scroll reveal for [data-reveal], with stagger for [data-stagger] children
//  - pointer spotlight on .card-hover (fine pointers only)
//  - 3D tilt for [data-tilt]
// Everything is skipped when the visitor prefers reduced motion.

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Effects() {
  const pathname = usePathname();

  // Scroll reveal: re-scan after every client navigation
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((list) => {
      Array.from(list.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(Math.min(i, 8))));
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Spotlight + tilt: one listener for the whole page
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let lastEvent: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;

    const apply = () => {
      frame = 0;
      const e = lastEvent;
      if (!e) return;
      const target = e.target as Element | null;

      const card = target?.closest<HTMLElement>(".card-hover");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilted && tilted !== tilt) tilted.style.removeProperty("--tilt");
      tilted = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--tilt", `rotateX(${(-y * 14).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`);
      }
    };

    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
