import { Readex_Pro, Space_Grotesk } from "next/font/google";

// Self-hosted at build time by next/font: no request to Google from the
// visitor's browser (GDPR-friendly).
export const readex = Readex_Pro({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-readex",
  display: "swap",
});

export const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const fontVariables = `${readex.variable} ${grotesk.variable}`;
