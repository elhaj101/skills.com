import type { ReactNode } from "react";
import { rootTarget } from "@/lib/paths";

// Root URL only: static hosting has no server redirects, so "/" forwards to
// the Arabic site with a meta refresh. With more languages this can pick one
// from the browser language.

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${rootTarget}`} />
        <meta name="robots" content="noindex" />
      </head>
      <body style={{ background: "#0f0e17", color: "#f7f5ff" }}>{children}</body>
    </html>
  );
}
