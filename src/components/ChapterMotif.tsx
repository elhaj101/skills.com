// Light, simple space motif per chapter theme, drawn in SVG with
// currentColor (set to the chapter's --accent-motif by the parent).

import type { ChapterTheme } from "@/lib/content";

// Archimedean spiral with two arms, for the galaxy motif
function spiralPath(cx: number, cy: number, phase: number) {
  const pts: string[] = [];
  for (let t = 0; t <= Math.PI * 3.2; t += 0.15) {
    const r = 4 + 9 * t;
    const x = cx + r * Math.cos(t + phase);
    const y = cy + 0.55 * r * Math.sin(t + phase);
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

function Shapes({ theme, glow }: { theme: ChapterTheme; glow: string }) {
  const f = `url(#${glow})`;
  switch (theme) {
    case "orbit":
      return (
        <g>
          <ellipse cx="150" cy="80" rx="82" ry="30" fill="none" stroke="currentColor" strokeOpacity=".45" strokeDasharray="3 5" transform="rotate(-12 150 80)" />
          <ellipse cx="150" cy="80" rx="54" ry="19" fill="none" stroke="currentColor" strokeOpacity=".3" transform="rotate(-12 150 80)" />
          <circle cx="150" cy="80" r="17" fill="currentColor" filter={f} />
          <circle cx="226" cy="64" r="4.5" fill="currentColor" />
        </g>
      );
    case "constellation": {
      const pts = [[30, 128], [72, 76], [112, 100], [152, 42], [196, 60], [214, 118]];
      return (
        <g>
          <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="currentColor" strokeOpacity=".55" strokeDasharray="2 4" />
          {pts.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="currentColor" filter={f} />
          ))}
        </g>
      );
    }
    case "supernova":
      return (
        <g>
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const len = i % 2 ? 26 : 48;
            return (
              <line
                key={i}
                x1={(160 + 18 * Math.cos(a)).toFixed(1)}
                y1={(80 + 18 * Math.sin(a)).toFixed(1)}
                x2={(160 + (18 + len) * Math.cos(a)).toFixed(1)}
                y2={(80 + (18 + len) * Math.sin(a)).toFixed(1)}
                stroke="currentColor"
                strokeOpacity={i % 2 ? 0.35 : 0.6}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx="160" cy="80" r="11" fill="currentColor" filter={f} />
        </g>
      );
    case "nebula":
      return (
        <g filter={f}>
          <ellipse cx="140" cy="70" rx="60" ry="30" fill="currentColor" opacity=".28" />
          <ellipse cx="185" cy="98" rx="42" ry="24" fill="currentColor" opacity=".22" />
          <ellipse cx="110" cy="102" rx="32" ry="18" fill="currentColor" opacity=".18" />
        </g>
      );
    case "wormhole":
      return (
        <g>
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx="160" cy="80" rx={88 - i * 11} ry={40 - i * 5} fill="none" stroke="currentColor" strokeOpacity={0.15 + i * 0.09} />
          ))}
          <ellipse cx="160" cy="80" rx="6" ry="3" fill="currentColor" filter={f} />
        </g>
      );
    case "eclipse":
      return (
        <g>
          <circle cx="160" cy="80" r="44" fill="none" stroke="currentColor" strokeWidth="8" opacity=".55" filter={f} />
          <circle cx="160" cy="80" r="44" fill="#07060c" stroke="currentColor" strokeWidth="2" />
          <line x1="128" y1="82" x2="192" y2="82" stroke="currentColor" strokeOpacity=".5" />
        </g>
      );
    case "horizon":
      return (
        <g>
          <path d="M-20 175 Q120 70 260 175 Z" fill="currentColor" opacity=".16" />
          <path d="M-20 175 Q120 70 260 175" fill="none" stroke="currentColor" strokeWidth="2.5" filter={f} />
          <circle cx="196" cy="48" r="5" fill="currentColor" />
        </g>
      );
    case "ringed":
      return (
        <g>
          <circle cx="160" cy="78" r="26" fill="currentColor" opacity=".9" filter={f} />
          <ellipse cx="160" cy="78" rx="62" ry="14" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(-16 160 78)" />
        </g>
      );
    case "galaxy":
      return (
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d={spiralPath(160, 80, 0)} strokeOpacity=".55" />
          <path d={spiralPath(160, 80, Math.PI)} strokeOpacity=".35" />
          <circle cx="160" cy="80" r="6" fill="currentColor" filter={f} />
        </g>
      );
    case "aurora":
      return (
        <g fill="none" stroke="currentColor" strokeLinecap="round" filter={f}>
          <path d="M0 96 C40 62 80 116 120 82 S200 46 240 88" strokeWidth="14" strokeOpacity=".3" />
          <path d="M0 116 C50 86 90 128 136 100 S206 76 240 108" strokeWidth="9" strokeOpacity=".22" />
          <path d="M0 76 C46 50 92 92 130 64 S204 34 240 62" strokeWidth="5" strokeOpacity=".4" />
        </g>
      );
  }
}

export function ChapterMotif({ theme, id, className = "" }: { theme: ChapterTheme; id: string; className?: string }) {
  const glow = `glow-${id}`;
  return (
    <svg viewBox="0 0 240 160" className={className} aria-hidden="true" focusable="false" style={{ color: "var(--accent-motif)" }}>
      <defs>
        <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <Shapes theme={theme} glow={glow} />
    </svg>
  );
}
