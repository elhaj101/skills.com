"use client";

// "How consulting works" as an animated timeline. A track connects the step
// badges and fills as the section scrolls through the viewport, with a
// glowing comet at its tip. Each step lights up when the fill reaches it:
// the badge pulses, its icon draws itself, the card glows.
// Works in both directions (RTL/LTR) and layouts (row on desktop, column on
// phones and tablets) because the track is measured from the badges themselves.
// With reduced motion every step is simply shown as active.

import { useEffect, useRef } from "react";
import { Icon, type IconName } from "./Icon";

type Step = { icon: string; title: string; body: string };

export function ConsultSteps({ steps }: { steps: Step[] }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const track = el.querySelector<HTMLElement>(".steps-track")!;
    const badges = Array.from(el.querySelectorAll<HTMLElement>(".step-badge"));
    const items = Array.from(el.querySelectorAll<HTMLElement>(".step"));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Position the track from the first to the last badge centre
    const measure = () => {
      const box = el.getBoundingClientRect();
      const c = badges.map((b) => {
        const r = b.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      const first = c[0];
      const last = c[c.length - 1];
      const horizontal = Math.abs(first.y - last.y) < 4;
      el.dataset.axis = horizontal ? "x" : "y";
      if (horizontal) {
        Object.assign(track.style, {
          left: `${Math.min(first.x, last.x)}px`,
          top: `${first.y}px`,
          width: `${Math.abs(last.x - first.x)}px`,
          height: "",
        });
        // Fill grows from step 1, whichever side it is on
        const fromRight = first.x > last.x;
        track.style.setProperty("--origin", fromRight ? "right" : "left");
        track.style.setProperty("--start", fromRight ? "1" : "0");
        track.style.setProperty("--fill-angle", fromRight ? "-90deg" : "90deg");
      } else {
        Object.assign(track.style, {
          left: `${first.x}px`,
          top: `${first.y}px`,
          height: `${last.y - first.y}px`,
          width: "",
        });
        track.style.setProperty("--origin", "top");
      }
    };

    const setProgress = (p: number) => {
      el.style.setProperty("--p", p.toFixed(3));
      const n = items.length;
      items.forEach((item, i) => {
        const threshold = n > 1 ? i / (n - 1) : 0;
        item.toggleAttribute("data-active", p >= threshold - 0.02);
      });
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    if (still) {
      setProgress(1);
      return () => ro.disconnect();
    }

    // Progress: 0 when the timeline's top reaches 85% of the viewport,
    // 1 once its bottom is on screen (90%)
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.9;
      const p = (start - r.top) / (r.height + start - end);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrap} className="steps relative">
      <div className="steps-track" aria-hidden="true">
        <span className="steps-fill" />
        <span className="steps-comet" />
      </div>
      {/* role="list": keeps list semantics in Safari with list-style: none */}
      <ol role="list" className="relative grid gap-5 lg:grid-cols-3 lg:gap-8">
        {steps.map((s) => (
          <li key={s.title} className="step">
            <span className="step-badge" aria-hidden="true" />
            <div className="step-card card flex h-full flex-col gap-3 p-6 sm:p-7">
              <span className="step-icon grid h-14 w-14 place-items-center rounded-2xl bg-surface-2">
                <Icon name={s.icon as IconName} size={28} draw />
              </span>
              {/* Short copy, large type: one line of title, up to two of text */}
              <h3 className="step-title line-clamp-1 text-[1.375rem] sm:text-3xl lg:text-[1.75rem] xl:text-3xl">{s.title}</h3>
              <p className="line-clamp-2 h-[2lh] text-lg font-bold leading-snug">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
