import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { getDictionary, defaultLocale } from "@/i18n";
import { rootTarget } from "@/lib/paths";
import { ThemeBackground, themeScript } from "@/components/ThemeBackground";

// 404 for any unknown URL. Bypasses the layouts, so it brings its own
// fonts, styles and theme.
const dict = getDictionary(defaultLocale);

export const metadata: Metadata = { title: `${dict.pages.notFoundTitle} | skills` };

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeBackground />
        <main className="container-x flex flex-1 flex-col items-start justify-center gap-4 py-24">
          <p className="kicker" dir="ltr">
            404
          </p>
          <h1 className="glow accent-violet text-4xl">{dict.pages.notFoundTitle}</h1>
          <p className="text-muted">{dict.pages.notFoundBody}</p>
          <a href={rootTarget} className="btn btn-primary">
            {dict.pages.backHome}
          </a>
        </main>
      </body>
    </html>
  );
}
