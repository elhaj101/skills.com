"use client";

import { Icon } from "./Icon";

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the theme still switches for this page view.
    }
  };

  return (
    <button type="button" onClick={toggle} className="icon-btn" aria-label={label} title={label}>
      <span className="only-dark">
        <Icon name="sun" />
      </span>
      <span className="only-light">
        <Icon name="moon" />
      </span>
    </button>
  );
}
