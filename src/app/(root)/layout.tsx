import type { ReactNode } from "react";
import { basePath, rootTarget } from "@/lib/paths";

// Root URL only: static hosting has no server redirects. A visitor who chose
// a language before goes back to it; everyone else gets Arabic. The meta
// refresh covers browsers without JavaScript.
const pickLanguage = `try{var l=localStorage.getItem("skills-lang");if(l==="ar"||l==="en")location.replace("${basePath}/"+l+"/")}catch(e){}`;

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script dangerouslySetInnerHTML={{ __html: pickLanguage }} />
        <meta httpEquiv="refresh" content={`0; url=${rootTarget}`} />
        <meta name="robots" content="noindex" />
      </head>
      <body style={{ background: "#0f0e17", color: "#f7f5ff" }}>{children}</body>
    </html>
  );
}
