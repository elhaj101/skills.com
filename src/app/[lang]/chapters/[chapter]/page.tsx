import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/i18n";
import { chapters, episodeHref, episodesOf } from "@/lib/content";
import { ChapterMotif } from "@/components/ChapterMotif";
import { ConsultCTA } from "@/components/ConsultCTA";
import { EpisodeCard, type EpisodeCardData } from "@/components/EpisodeCard";
import { Mixed } from "@/components/Mixed";

const EPISODES_PER_CHAPTER = 10;

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((c) => ({ chapter: c.slug }));
}

const findChapter = (slug: string) => chapters.find((c) => c.slug === slug);

export async function generateMetadata({ params }: PageProps<"/[lang]/chapters/[chapter]">): Promise<Metadata> {
  const chapter = findChapter((await params).chapter);
  if (!chapter) return {};
  return { title: chapter.title, description: chapter.description };
}

export default async function ChapterPage({ params }: PageProps<"/[lang]/chapters/[chapter]">) {
  const { lang: rawLang, chapter: slug } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);
  const chapter = findChapter(slug);
  if (!chapter) notFound();

  // Episodes not yet in episodes.json still get a «قريبًا» slot, so every
  // chapter shows its full run of 10.
  const listed = episodesOf(chapter.number);
  const slots = Array.from({ length: Math.max(EPISODES_PER_CHAPTER, listed.length) }, (_, i) => {
    const found = listed.find((e) => e.number === i + 1);
    const card: EpisodeCardData = found ?? {
      number: i + 1,
      title: dict.episode.comingSoon,
      tool: "",
      type: "tool",
    };
    return { card, href: found ? episodeHref(lang, found) : undefined };
  });

  const num = String(chapter.number).padStart(2, "0");

  return (
    <div className={`accent-${chapter.accent}`}>
      <header className="container-x relative overflow-hidden py-12 sm:py-20">
        <ChapterMotif
          theme={chapter.theme}
          id={`hero-${chapter.number}`}
          className="pointer-events-none absolute -end-10 top-1/2 h-64 w-96 -translate-y-1/2 opacity-40 sm:h-80 sm:opacity-70 sm:w-[30rem]"
        />
        <div className="relative max-w-2xl">
          <p className="kicker" dir="ltr" style={{ textAlign: "end" }}>
            {chapter.theme} {num}
          </p>
          <p className="mt-2 font-bold text-accent-text">
            {dict.chapter.label} <bdi dir="ltr">{chapter.number}</bdi>
          </p>
          <h1 className="glow mt-2 text-4xl sm:text-6xl">
            <Mixed text={chapter.title} split latinClassName="glow-latin" />
          </h1>
          <p className="mt-4 text-lg text-muted">{chapter.description}</p>
        </div>
      </header>

      <section aria-labelledby="episodes-title" className="container-x">
        <h2 id="episodes-title" className="mb-6 text-2xl">
          {dict.chapter.episodesTitle}
        </h2>
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {slots.map(({ card, href }) => (
            <li key={card.number} className="reveal">
              <EpisodeCard episode={card} accent={chapter.accent} href={href} dict={dict} />
            </li>
          ))}
        </ol>
      </section>

      <div className="container-x mt-16">
        <ConsultCTA dict={dict} lang={lang} />
      </div>
    </div>
  );
}
