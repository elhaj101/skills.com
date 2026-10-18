import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Lockup } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function navItems(lang: string, dict: Dictionary) {
  return [
    { href: `/${lang}/chapters/`, label: dict.nav.episodes },
    { href: `/${lang}/tools/`, label: dict.nav.tools },
    { href: `/${lang}/consulting/`, label: dict.nav.consulting },
    { href: `/${lang}/about/`, label: dict.nav.about },
  ];
}

export function Header({ lang, dict }: { lang: string; dict: Dictionary }) {
  const items = navItems(lang, dict);
  return (
    <header className="sticky top-0 z-40 border-b border-line" style={{ background: "var(--header-bg)" }}>
      <div className="container-x flex h-16 items-center gap-3">
        <Link href={`/${lang}/`} aria-label={`skills: ${dict.a11y.home}`} className="flex shrink-0 items-center">
          <Lockup height={34} />
        </Link>

        <nav aria-label={dict.a11y.mainNav} className="ms-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-full px-4 py-2 font-bold hover:bg-surface-2">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <Button href={`/${lang}/consulting/`} size="sm" className="hidden sm:inline-flex">
            {dict.cta.consult}
          </Button>
          <ThemeToggle label={dict.a11y.theme} />

          {/* Mobile menu: <details> works without JavaScript */}
          <details className="group relative lg:hidden">
            <summary className="icon-btn cursor-pointer list-none [&::-webkit-details-marker]:hidden" aria-label={dict.nav.menu}>
              <span className="group-open:hidden">
                <Icon name="menu" />
              </span>
              <span className="hidden group-open:inline">
                <Icon name="close" />
              </span>
            </summary>
            <nav
              aria-label={dict.a11y.mainNav}
              className="card absolute end-0 top-14 w-64 p-2 shadow-2xl"
              style={{ background: "var(--surface)" }}
            >
              <ul className="flex flex-col">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="flex min-h-12 items-center rounded-xl px-4 font-bold hover:bg-surface-2">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="p-2">
                  <Button href={`/${lang}/consulting/`} className="w-full">
                    {dict.cta.consult}
                  </Button>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
