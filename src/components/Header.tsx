"use client";

// Site header: desktop nav with a chapters dropdown, a native <dialog>
// drawer on mobile, active-page state and reading progress.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Accent } from "@/lib/content";
import type { Dictionary, Locale } from "@/i18n";
import { navItems } from "@/lib/nav";
import { Icon } from "./Icon";
import { LangSwitch } from "./LangSwitch";
import { Lockup } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export type NavChapter = { number: number; title: string; href: string; accent: Accent };

const isActive = (pathname: string, href: string) => pathname.startsWith(href);

function ChaptersMenu({ lang, dict, chapters, pathname }: { lang: Locale; dict: Dictionary; chapters: NavChapter[]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = isActive(pathname, `/${lang}/chapters/`);

  // Close on outside click, on Escape (focus back to the button), and when
  // focus leaves the menu
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onFocus = (e: FocusEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  return (
    <li ref={wrap} className="relative">
      <button
        ref={button}
        type="button"
        className="nav-link"
        aria-expanded={open}
        aria-controls={panelId}
        data-active={active || undefined}
        onClick={() => setOpen((o) => !o)}
      >
        {dict.nav.episodes}
        <Icon name="chevron-down" size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={panelId} hidden={!open} className="nav-panel">
        <p className="mb-2 px-3 text-sm text-muted">{dict.nav.chaptersMenu}</p>
        <ul className="grid grid-cols-2 gap-1">
          {chapters.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                onClick={() => setOpen(false)}
                className={`accent-${c.accent} nav-panel-link`}
                aria-current={pathname === c.href ? "page" : undefined}
              >
                <span className="nav-dot" aria-hidden="true" />
                <bdi dir="ltr" className="w-6 shrink-0 text-sm text-muted">
                  {String(c.number).padStart(2, "0")}
                </bdi>
                <span>{c.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={`/${lang}/chapters/`} onClick={() => setOpen(false)} className="btn btn-ghost mt-2">
          {dict.cta.allChapters} <Icon name="arrow-forward" size={18} />
        </Link>
      </div>
    </li>
  );
}

function Drawer({
  lang,
  dict,
  chapters,
  pathname,
  open,
  onClose,
}: {
  lang: Locale;
  dict: Dictionary;
  chapters: NavChapter[];
  pathname: string;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  // A modal <dialog> gives focus trapping, Escape and an inert page for free
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const items = [{ href: `/${lang}/chapters/`, label: dict.nav.episodes }, ...navItems(lang, dict), { href: `/${lang}/contact/`, label: dict.nav.contact }];

  return (
    <dialog
      ref={ref}
      className="drawer"
      aria-label={dict.a11y.mobileNav}
      onClose={onClose}
      // Click on the backdrop (outside the panel) closes the drawer
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex h-full flex-col gap-6 p-5">
        <div className="flex items-center justify-between">
          <Lockup height={32} />
          <button type="button" className="icon-btn" onClick={onClose} aria-label={dict.a11y.closeMenu}>
            <Icon name="close" />
          </button>
        </div>

        <nav aria-label={dict.a11y.mobileNav}>
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="drawer-link"
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                  <Icon name="chevron-forward" size={18} className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <details className="group mt-4">
            <summary className="drawer-link cursor-pointer list-none text-muted [&::-webkit-details-marker]:hidden">
              {dict.nav.chaptersMenu}
              <Icon name="chevron-down" size={18} className="transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-1 flex flex-col">
              {chapters.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} onClick={onClose} className={`accent-${c.accent} nav-panel-link`} aria-current={pathname === c.href ? "page" : undefined}>
                    <span className="nav-dot" aria-hidden="true" />
                    <span>{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <LangSwitch current={lang} label={dict.lang.switchLabel} text={dict.lang.switchTo} variant="full" />
            <ThemeToggle label={dict.a11y.theme} />
          </div>
          <Link href={`/${lang}/consulting/`} onClick={onClose} className="btn btn-primary w-full">
            <Icon name="calendar" size={18} />
            {dict.cta.consult}
          </Link>
          <p className="text-sm font-bold" style={{ color: "var(--tagline)" }}>
            {dict.site.tagline}
          </p>
        </div>
      </div>
    </dialog>
  );
}

export function Header({ lang, dict, chapters }: { lang: Locale; dict: Dictionary; chapters: NavChapter[] }) {
  const pathname = usePathname() ?? `/${lang}/`;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const header = useRef<HTMLElement>(null);

  // Scroll state: blur and shadow once scrolled, plus reading progress as a
  // CSS variable. The header always stays on screen, so the language switch,
  // theme toggle and menu are always reachable.
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--progress", max > 0 ? String(Math.min(1, y / max)) : "0");
      el.toggleAttribute("data-scrolled", y > 8);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = navItems(lang, dict);

  return (
    <header ref={header} className="site-header">
      <div className="container-x flex h-16 items-center gap-2">
        <Link href={`/${lang}/`} aria-label={`skills: ${dict.a11y.home}`} className="flex shrink-0 items-center rounded-lg">
          <Lockup height={34} />
        </Link>

        <nav aria-label={dict.a11y.mainNav} className="ms-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            <ChaptersMenu lang={lang} dict={dict} chapters={chapters} pathname={pathname} />
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link" aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <LangSwitch current={lang} label={dict.lang.switchLabel} text={dict.lang.switchToShort} />
          <ThemeToggle label={dict.a11y.theme} />
          <Link href={`/${lang}/consulting/`} className="btn btn-primary btn-sm hidden sm:inline-flex">
            {dict.cta.consult}
          </Link>
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-label={dict.a11y.openMenu}
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <div className="site-progress" aria-hidden="true" />
      <Drawer lang={lang} dict={dict} chapters={chapters} pathname={pathname} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
