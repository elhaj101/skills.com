// Locale setup. To add a language: add its code here, create a matching
// JSON file with the same keys, and add translated fields to /content.
import ar from "./ar.json";
import en from "./en.json";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export type Dictionary = typeof ar;

// en.json must have the same shape as ar.json (checked by TypeScript)
const dictionaries: Record<Locale, Dictionary> = { ar, en };

const rtlLocales: readonly Locale[] = ["ar"];

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export const dirFor = (locale: Locale) => (rtlLocales.includes(locale) ? "rtl" : "ltr");

export const ogLocale: Record<Locale, string> = { ar: "ar_AR", en: "en_US" };

/** Replaces {name} tokens in a dictionary string */
export const format = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));

/**
 * hreflang alternates for a page, given its path without the language
 * prefix (e.g. "chapters/"). Used in each page's generateMetadata.
 */
export function alternates(lang: Locale, path = "") {
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}/${path}`]));
  return {
    canonical: `/${lang}/${path}`,
    languages: { ...languages, "x-default": `/${defaultLocale}/${path}` },
  };
}
