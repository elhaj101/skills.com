import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { getDictionary } from "@/i18n";
import { basePath } from "@/lib/paths";
import { ThemeBackground, themeScript } from "@/components/ThemeBackground";

// 404 for any unknown URL, in both languages. Bypasses the layouts, so it
// brings its own fonts, styles and theme.
const ar = getDictionary("ar");
const en = getDictionary("en");

export const metadata: Metadata = { title: `${en.pages.notFoundTitle} | skills` };

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeBackground />
        <main className="container-x flex flex-1 flex-col justify-center gap-12 py-24">
          <p className="kicker">
            <bdi dir="ltr">404</bdi>
          </p>
          <section className="flex flex-col items-start gap-4">
            <h1 className="glow accent-violet text-4xl">{ar.pages.notFoundTitle}</h1>
            <p className="text-muted">{ar.pages.notFoundBody}</p>
            <a href={`${basePath}/ar/`} className="btn btn-primary">
              {ar.pages.backHome}
            </a>
          </section>
          <section lang="en" dir="ltr" className="flex flex-col items-start gap-4">
            <h2 className="text-2xl">{en.pages.notFoundTitle}</h2>
            <p className="text-muted">{en.pages.notFoundBody}</p>
            <a href={`${basePath}/en/`} className="btn btn-secondary">
              {en.pages.backHome}
            </a>
          </section>
        </main>
      </body>
    </html>
  );
}
