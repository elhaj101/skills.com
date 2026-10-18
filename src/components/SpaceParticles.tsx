"use client";

// Full-page space particles on one fixed canvas, behind all content.
//  - drifting, twinkling stars in three depth layers (a few tinted violet,
//    lime or cyan), with depth parallax while scrolling
//  - hover: stars near the pointer swell and brighten, and faint lines link
//    them to the pointer
//  - click/tap: nearby stars are pushed away, then drift back to their pace
//  - an occasional lime shooting star
// The background colour itself stays in CSS (.starfield). Pauses in
// background tabs; draws one still frame when reduced motion is preferred.

import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Extra velocity from a click, decays back to zero */
  kx: number;
  ky: number;
  r: number;
  depth: number;
  phase: number;
  twinkle: number;
  tint: string | null;
  grow: number;
};
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

const HOVER_RADIUS = 150;
const PUSH_RADIUS = 180;
const TINTS = ["123 92 255", "200 255 77", "41 245 255"];

export function SpaceParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    const particles: P[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = performance.now() + 4000;
    const pointer = { x: -9999, y: -9999, active: false };
    let base = "255 255 255";
    let light = false;
    let raf = 0;
    let lastScroll = window.scrollY;

    const readTheme = () => {
      light = document.documentElement.dataset.theme === "light";
      base = light ? "91 63 224" : "255 255 255";
    };

    const make = (): P => {
      const roll = Math.random();
      const depth = roll < 0.55 ? 0.35 : roll < 0.85 ? 0.65 : 1;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.04 + Math.random() * 0.16) * (0.5 + depth);
      const tinted = Math.random() < 0.12;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        kx: 0,
        ky: 0,
        r: 0.35 + depth * (0.6 + Math.random() * 1.1),
        depth,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.4 + Math.random() * 1.6,
        tint: tinted ? TINTS[Math.floor(Math.random() * TINTS.length)] : null,
        grow: 0,
      };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(w < 640 ? 110 : 240, (w * h) / 5200));
      if (particles.length > target) particles.length = target;
      while (particles.length < target) particles.push(make());
    };

    const wrap = (p: P) => {
      const m = 10;
      if (p.x < -m) p.x = w + m;
      else if (p.x > w + m) p.x = -m;
      if (p.y < -m) p.y = h + m;
      else if (p.y > h + m) p.y = -m;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Scroll parallax: nearer stars move further
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;

      for (const p of particles) {
        if (!still) {
          p.x += p.vx + p.kx;
          p.y += p.vy + p.ky - dy * 0.12 * p.depth;
          p.kx *= 0.94;
          p.ky *= 0.94;
          wrap(p);
        }

        // Hover bubble: swell and brighten near the pointer
        let near = 0;
        if (pointer.active) {
          const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          near = d < HOVER_RADIUS ? 1 - d / HOVER_RADIUS : 0;
        }
        p.grow += (near - p.grow) * 0.12;

        const tw = still ? 0.85 : 0.55 + 0.45 * Math.sin(p.phase + (t / 1000) * p.twinkle);
        const alpha = Math.min(1, (0.3 + 0.6 * p.depth) * tw + p.grow * 0.5);
        const radius = p.r * (1 + p.grow * 1.6);
        const color = p.tint ?? base;

        if (p.depth === 1 || p.grow > 0.05 || p.tint) {
          // Soft halo on near, tinted or hovered stars
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${color} / ${alpha * (light ? 0.08 : 0.12)})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${color} / ${alpha})`;
        ctx.fill();

        // Faint link from the pointer to nearby stars
        if (near > 0.15) {
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgb(${light ? "91 63 224" : "169 150 255"} / ${near * 0.35})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      if (still) return;

      if (!meteor && t > nextMeteor) {
        const leftToRight = Math.random() < 0.5;
        meteor = {
          x: leftToRight ? Math.random() * w * 0.5 : w * (0.5 + Math.random() * 0.5),
          y: Math.random() * h * 0.35,
          vx: (leftToRight ? 1 : -1) * (6 + Math.random() * 3),
          vy: 2.5 + Math.random() * 1.5,
          life: 1,
        };
        nextMeteor = t + 7000 + Math.random() * 8000;
      }
      if (meteor) {
        const m = meteor;
        const tail = 16;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
        grad.addColorStop(0, `rgb(200 255 77 / ${m.life})`);
        grad.addColorStop(1, "rgb(200 255 77 / 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
        ctx.stroke();
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.012;
        if (m.life <= 0 || m.y > h + 50 || m.x < -100 || m.x > w + 100) meteor = null;
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = document.hidden ? 0 : requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && !still) raf = requestAnimationFrame(loop);
    };

    readTheme();
    resize();
    draw(performance.now());
    start();

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = finePointer;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    // Click/tap: push nearby stars away from the point
    const onDown = (e: PointerEvent) => {
      if (still) return;
      for (const p of particles) {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const d = Math.hypot(dx, dy);
        if (d < PUSH_RADIUS && d > 0.1) {
          const force = (1 - d / PUSH_RADIUS) * 9;
          p.kx += (dx / d) * force;
          p.ky += (dy / d) * force;
        }
      }
    };
    const onResize = () => {
      resize();
      if (still) draw(0);
    };
    const onVisibility = () => !document.hidden && start();
    const mo = new MutationObserver(() => {
      readTheme();
      if (still) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0" aria-hidden="true" />;
}
