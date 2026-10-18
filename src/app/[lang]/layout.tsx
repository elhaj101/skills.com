import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "../fonts";
import { alternates, dirFor, getDictionary, isLocale, locales, ogLocale } from "@/i18n";
import { chapterHref, chapterText, chapters } from "@/lib/content";
import { asset } from "@/lib/paths";
import { site } from "@/site.config";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header, type NavChapter } from "@/components/Header";
import { ThemeBackground, themeScript } from "@/components/ThemeBackground";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: `skills | ${dict.site.tagline}`, template: "%s | skills" },
    description: dict.site.description,
    alternates: alternates(lang),
    openGraph: {
      siteName: "skills",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: asset("/brand/temp-mark.png"), apple: asset("/brand/temp-mark.png") },
  };
}

export const viewport: Viewport = {
  themeColor: "#0f0e17",
  colorScheme: "dark light",
};

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const navChapters: NavChapter[] = chapters.map((c) => ({
    number: c.number,
    title: chapterText(c, lang).title,
    href: chapterHref(lang, c),
    accent: c.accent,
  }));

  return (
    <html lang={lang} dir={dirFor(lang)} data-theme="dark" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.a11y.skip}
        </a>
        <ThemeBackground />
        <Header lang={lang} dict={dict} chapters={navChapters} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <Effects />
      </body>
    </html>
  );
}
