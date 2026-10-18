// Typed access to the editable data files in /content.
// Content is edited in JSON; validate() fails the build with a clear message
// when an entry is malformed, so mistakes never reach the live site.

import chaptersData from "@content/chapters.json";
import episodesData from "@content/episodes.json";
import toolsData from "@content/tools.json";

export const accents = ["violet", "lime", "cyan", "pink", "gold"] as const;
export type Accent = (typeof accents)[number];

export const themes = [
  "orbit",
  "constellation",
  "supernova",
  "nebula",
  "wormhole",
  "eclipse",
  "horizon",
  "ringed",
  "galaxy",
  "aurora",
] as const;
export type ChapterTheme = (typeof themes)[number];

export type Chapter = {
  number: number;
  slug: string;
  title: string;
  titleEn: string;
  theme: ChapterTheme;
  accent: Accent;
  description: string;
  descriptionEn?: string;
};

export const episodeTypes = ["tool", "method", "correct-use"] as const;
export type EpisodeType = (typeof episodeTypes)[number];

export type Episode = {
  chapter: number;
  number: number;
  title: string;
  /** Tool or method name as shown, e.g. "Google Maps" */
  tool: string;
  /** Slug in tools.json, when the episode covers a listed tool */
  toolSlug?: string;
  type: EpisodeType;
  /** One line: what the video shows */
  shows: string;
  /** Empty until published; the episode shows as «قريبًا» */
  tiktokUrl?: string;
  /** Path under /public, e.g. "/covers/ch01-ep03.webp" */
  cover?: string;
  publishedAt?: string;
  summary?: string;
  steps?: string[];
  /** English versions; the Arabic text is shown when missing */
  titleEn?: string;
  showsEn?: string;
};

export type Pricing = "free" | "paid" | "freemium";

export type Tool = {
  slug: string;
  name: string;
  description: string;
  bestFor: string;
  /** Only set once confirmed; hidden otherwise */
  pricing?: Pricing;
  url: string;
  /** Path under /public; a monogram is shown when missing */
  logo?: string;
  /** Only with explicit approval; always labelled on the site */
  affiliateUrl?: string;
  descriptionEn?: string;
  bestForEn?: string;
};

function fail(file: string, index: number, message: string): never {
  throw new Error(`content/${file} entry #${index + 1}: ${message}`);
}

function validateChapters(data: unknown[]): Chapter[] {
  return data.map((raw, i) => {
    const c = raw as Chapter;
    if (!Number.isInteger(c.number)) fail("chapters.json", i, "number must be an integer");
    if (!c.slug || !c.title) fail("chapters.json", i, "slug and title are required");
    if (!themes.includes(c.theme)) fail("chapters.json", i, `unknown theme "${c.theme}"`);
    if (!accents.includes(c.accent)) fail("chapters.json", i, `unknown accent "${c.accent}"`);
    return c;
  });
}

function validateEpisodes(data: unknown[], chapterNumbers: number[]): Episode[] {
  const seen = new Set<string>();
  return data.map((raw, i) => {
    const e = raw as Episode;
    if (!chapterNumbers.includes(e.chapter)) fail("episodes.json", i, `chapter ${e.chapter} does not exist`);
    if (!Number.isInteger(e.number) || e.number < 1) fail("episodes.json", i, "number must be 1 or more");
    if (!e.title || !e.tool) fail("episodes.json", i, "title and tool are required");
    if (!episodeTypes.includes(e.type)) fail("episodes.json", i, `type must be one of ${episodeTypes.join(", ")}`);
    const key = `${e.chapter}-${e.number}`;
    if (seen.has(key)) fail("episodes.json", i, `duplicate episode ${e.number} in chapter ${e.chapter}`);
    seen.add(key);
    return e;
  });
}

function validateTools(data: unknown[]): Tool[] {
  return data.map((raw, i) => {
    const t = raw as Tool;
    if (!t.slug || !t.name || !t.url) fail("tools.json", i, "slug, name and url are required");
    return t;
  });
}

export const chapters = validateChapters(chaptersData).sort((a, b) => a.number - b.number);
export const episodes = validateEpisodes(
  episodesData,
  chapters.map((c) => c.number),
).sort((a, b) => a.chapter - b.chapter || a.number - b.number);
export const tools = validateTools(toolsData);

export const isPublished = (e: Episode) => Boolean(e.tiktokUrl);

export const getChapter = (n: number) => chapters.find((c) => c.number === n);
export const episodesOf = (n: number) => episodes.filter((e) => e.chapter === n);
export const publishedCount = (n: number) => episodesOf(n).filter(isPublished).length;

// Localised fields. English falls back to Arabic until a translation exists.
export const chapterText = (c: Chapter, lang: string) =>
  lang === "en"
    ? { title: c.titleEn, description: c.descriptionEn ?? c.description }
    : { title: c.title, description: c.description };

export const episodeTitle = (e: Episode, lang: string) => (lang === "en" ? (e.titleEn ?? e.title) : e.title);

export const toolText = (t: Tool, lang: string) =>
  lang === "en"
    ? { description: t.descriptionEn ?? t.description, bestFor: t.bestForEn ?? t.bestFor }
    : { description: t.description, bestFor: t.bestFor };

export const episodeHref = (lang: string, e: Episode) =>
  `/${lang}/chapters/${getChapter(e.chapter)?.slug}/episode-${e.number}/`;
export const chapterHref = (lang: string, c: Chapter) => `/${lang}/chapters/${c.slug}/`;
