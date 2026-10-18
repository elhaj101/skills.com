import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";
import { navItems } from "@/lib/nav";
import { site } from "@/site.config";
import { Icon } from "./Icon";
import { LangSwitch } from "./LangSwitch";
import { Lockup } from "./Logo";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const socials = [
    { label: "TikTok", href: site.tiktokUrl },
    { label: "Instagram", href: site.socials.instagram },
    { label: "YouTube", href: site.socials.youtube },
    { label: "LinkedIn", href: site.socials.linkedin },
  ].filter((s) => s.href);

  const explore = [
    { href: `/${lang}/chapters/`, label: dict.nav.episodes },
    ...navItems(lang, dict),
    { href: `/${lang}/contact/`, label: dict.nav.contact },
  ];

  return (
    <footer className="mt-24 border-t border-line" style={{ background: "var(--header-bg)" }}>
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link href={`/${lang}/`} aria-label={`skills: ${dict.a11y.home}`} className="w-fit rounded-lg">
            <Lockup height={36} />
          </Link>
          <p className="font-bold" style={{ color: "var(--tagline)" }}>
            {dict.site.tagline}
          </p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="mb-3 text-sm text-muted">
            {dict.footer.explore}
          </h2>
          <ul className="flex flex-col gap-1">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="footer-follow">
          <h2 id="footer-follow" className="mb-3 text-sm text-muted">
            {dict.footer.follow}
          </h2>
          <ul className="flex flex-col gap-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:underline" dir="ltr">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="mb-3 text-sm text-muted">
            {dict.footer.legal}
          </h2>
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
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Icon name="globe" size={18} className="text-muted" />
            <span className="text-muted">{dict.footer.language}:</span>
            <span className="font-bold">{dict.lang[lang]}</span>
            <span aria-hidden="true" className="text-muted">·</span>
            <LangSwitch current={lang} label={dict.lang.switchLabel} text={dict.lang.switchTo} />
          </div>
        </section>
      </div>
      <div className="container-x border-t border-line py-6 text-sm text-muted">
        <p>{dict.footer.disclaimer}</p>
        <p>{dict.footer.logos}</p>
        <p className="mt-2">
          <small>
            © <bdi dir="ltr">{new Date().getFullYear()}</bdi> skills
          </small>
        </p>
      </div>
    </footer>
  );
}
