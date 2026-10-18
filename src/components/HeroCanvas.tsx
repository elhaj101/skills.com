"use client";

// Small canvas star field for the hero: three depth layers that twinkle,
// drift with the pointer (parallax), and an occasional shooting star.
// Pauses when off screen or in a background tab; draws one still frame
// when the visitor prefers reduced motion.

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; depth: number; phase: number; speed: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = performance.now() + 3000;
    let pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let color = "255 255 255";
    let raf = 0;
    let visible = true;

    const readColor = () => {
      const light = document.documentElement.dataset.theme === "light";
      color = light ? "91 63 224" : "255 255 255";
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(160, (w * h) / 6000));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() < 0.6 ? 0.3 : Math.random() < 0.75 ? 0.6 : 1;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + depth * 1.1,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.4,
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      eased.x += (pointer.x - eased.x) * 0.05;
      eased.y += (pointer.y - eased.y) * 0.05;
      for (const s of stars) {
        const twinkle = still ? 0.8 : 0.55 + 0.45 * Math.sin(s.phase + (t / 1000) * s.speed);
        const x = s.x + eased.x * 18 * s.depth;
        const y = s.y + eased.y * 18 * s.depth;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${color} / ${(0.35 + 0.55 * s.depth) * twinkle})`;
        ctx.fill();
      }
      if (still) return;

      if (!meteor && t > nextMeteor) {
        const fromEnd = document.documentElement.dir === "rtl";
        meteor = {
          x: fromEnd ? w * (0.2 + Math.random() * 0.4) : w * (0.4 + Math.random() * 0.4),
          y: h * Math.random() * 0.3,
          vx: (fromEnd ? 1 : -1) * (5 + Math.random() * 3),
          vy: 2.5 + Math.random() * 1.5,
          life: 1,
        };
        nextMeteor = t + 6000 + Math.random() * 6000;
      }
      if (meteor) {
        const m = meteor;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        grad.addColorStop(0, `rgb(200 255 77 / ${m.life})`);
        grad.addColorStop(1, "rgb(200 255 77 / 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.015;
        if (m.life <= 0 || m.y > h || m.x < -50 || m.x > w + 50) meteor = null;
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf && !still) raf = requestAnimationFrame(loop);
    };

    readColor();
    resize();
    draw(performance.now());
    start();

    const onPointer = (e: PointerEvent) => {
      pointer = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
    };
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readColor();
      if (still) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onVisibility = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
