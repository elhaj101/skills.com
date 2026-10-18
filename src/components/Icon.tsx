// One line-icon set (Lucide-style, 24px grid, 2px stroke).
// Icons that point in the reading direction get `rtl-flip` so they mirror in RTL.

const paths = {
  "arrow-forward": ["M5 12h14", "m12 5 7 7-7 7"],
  "chevron-forward": ["m9 18 6-6-6-6"],
  "chevron-down": ["m6 9 6 6 6-6"],
  globe: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
  "external-link": ["M15 3h6v6", "M10 14 21 3", "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"],
  play: ["M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z"],
  spark: ["M12 3l1.8 5.4a2 2 0 0 0 1.3 1.3l5.4 1.8-5.4 1.8a2 2 0 0 0-1.3 1.3L12 20l-1.8-5.4a2 2 0 0 0-1.3-1.3L3.5 11.5l5.4-1.8a2 2 0 0 0 1.3-1.3Z"],
  apps: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M14 14h6v6h-6z", "M4 14h6v6H4z"],
  automation: ["M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M13 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z", "M7 11v4a2 2 0 0 0 2 2h4"],
  landmark: ["M3 21h18", "M6 18v-7", "M10 18v-7", "M14 18v-7", "M18 18v-7", "M12 3 20 8H4Z"],
  sun: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z", "M12 2v2", "M12 20v2", "m4.93 4.93 1.41 1.41", "m17.66 17.66 1.41 1.41", "M2 12h2", "M20 12h2", "m6.34 17.66-1.41 1.41", "m19.07 4.93-1.41 1.41"],
  moon: ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  close: ["M18 6 6 18", "m6 6 12 12"],
  calendar: ["M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z", "M16 2v4", "M8 2v4", "M3 10h18"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z", "m21 21-4.3-4.3"],
  lock: ["M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z", "M7 11V7a5 5 0 0 1 10 0v4"],
  check: ["M20 6 9 17l-5-5"],
  message: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"],
  mail: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z", "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"],
} as const;

export type IconName = keyof typeof paths;

const directional: IconName[] = ["arrow-forward", "chevron-forward"];

export function Icon({
  name,
  size = 20,
  className = "",
  label,
}: {
  name: IconName;
  size?: number;
  className?: string;
  /** Only for icons that carry meaning on their own; decorative otherwise */
  label?: string;
}) {
  const flip = directional.includes(name) ? "rtl-flip" : "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${flip} ${className}`.trim()}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
