import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { site } from "@/site.config";
import { navItems } from "./Header";
import { Lockup } from "./Logo";

export function Footer({ lang, dict }: { lang: string; dict: Dictionary }) {
  const socials = [
    { label: "TikTok", href: site.tiktokUrl },
    { label: "Instagram", href: site.socials.instagram },
    { label: "YouTube", href: site.socials.youtube },
    { label: "LinkedIn", href: site.socials.linkedin },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 border-t border-line" style={{ background: "var(--header-bg)" }}>
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Lockup height={36} />
          <p className="font-bold" style={{ color: "var(--tagline)" }}>
            {dict.site.tagline}
          </p>
        </div>

        <nav aria-label={dict.footer.explore}>
          <h2 className="mb-3 text-sm text-muted">{dict.footer.explore}</h2>
          <ul className="flex flex-col gap-1">
            {[...navItems(lang, dict), { href: `/${lang}/contact/`, label: dict.nav.contact }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm text-muted">{dict.footer.follow}</h2>
          <ul className="flex flex-col gap-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:underline" dir="ltr">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm text-muted">{dict.footer.legal}</h2>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href={`/${lang}/impressum/`} className="inline-flex min-h-11 items-center hover:underline">
                {dict.footer.impressum}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/privacy/`} className="inline-flex min-h-11 items-center hover:underline">
                {dict.footer.privacy}
              </Link>
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted">
            {dict.footer.language}: <span lang="ar">العربية</span>
          </p>
        </div>
      </div>
      <div className="container-x border-t border-line py-6 text-sm text-muted">
        <p>{dict.footer.disclaimer}</p>
        <p>{dict.footer.logos}</p>
      </div>
    </footer>
  );
}
