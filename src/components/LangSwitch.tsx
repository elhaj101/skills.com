"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n";
import { basePath } from "@/lib/paths";
import { Icon } from "./Icon";

export const LANG_KEY = "skills-lang";

/** Same page in the other language: /ar/chapters/ ↔ /en/chapters/ */
export function otherLangPath(pathname: string, target: Locale) {
  const parts = pathname.split("/");
  parts[1] = target;
  return parts.join("/") || `/${target}/`;
}

export function LangSwitch({
  current,
  label,
  text,
  variant = "compact",
}: {
  current: Locale;
  /** Accessible name, written in the target language */
  label: string;
  text: string;
  variant?: "compact" | "full";
}) {
  const pathname = usePathname() ?? `/${current}/`;
  const target: Locale = current === "ar" ? "en" : "ar";
  // A full page load: direction, fonts and <html lang> all change
  const href = `${basePath}${otherLangPath(pathname, target)}`;

  const remember = () => {
    try {
      localStorage.setItem(LANG_KEY, target);
    } catch {
      // Storage blocked: the switch still works for this visit.
    }
  };

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      title={label}
      onClick={remember}
      className={variant === "compact" ? "lang-switch" : "btn btn-secondary btn-sm"}
    >
      {variant === "compact" && <Icon name="globe" size={16} />}
      {text}
    </a>
  );
}
