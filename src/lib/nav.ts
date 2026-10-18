import type { Dictionary } from "@/i18n";

// Main navigation links, shared by the header (client) and footer (server).
export function navItems(lang: string, dict: Dictionary) {
  return [
    { href: `/${lang}/tools/`, label: dict.nav.tools },
    { href: `/${lang}/consulting/`, label: dict.nav.consulting },
    { href: `/${lang}/about/`, label: dict.nav.about },
  ];
}
