// Locale setup. Only Arabic is built now; add "de" / "en" here plus a
// matching JSON file to switch on more languages.
import ar from "./ar.json";

export const locales = ["ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export type Dictionary = typeof ar;

const dictionaries: Record<Locale, Dictionary> = { ar };

const rtlLocales: readonly string[] = ["ar"];

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export const dirFor = (locale: Locale) => (rtlLocales.includes(locale) ? "rtl" : "ltr");
