import { Inter, Readex_Pro, Space_Grotesk } from "next/font/google";

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

// Body text for the English site
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
  // Only the English pages use it, so don't preload it on Arabic pages
  preload: false,
});

export const fontVariables = `${readex.variable} ${grotesk.variable} ${inter.variable}`;
