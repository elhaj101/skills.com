import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { chapterText, chapters, episodeHref, episodesOf, episodeTitle } from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
  const { lang, chapter: slug } = await params;
  const chapter = findChapter(slug);
  if (!chapter) return {};
  const text = chapterText(chapter, lang);
  return { title: text.title, description: text.description, alternates: alternates(lang as Locale, `chapters/${slug}/`) };
}

export default async function ChapterPage({ params }: PageProps<"/[lang]/chapters/[chapter]">) {
  const { lang: rawLang, chapter: slug } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);
  const chapter = findChapter(slug);
  if (!chapter) notFound();
  const text = chapterText(chapter, lang);

  // Episodes not yet in episodes.json still get a slot, so every chapter
  // shows its full run of 10.
  const listed = episodesOf(chapter.number);
  const slots = Array.from({ length: Math.max(EPISODES_PER_CHAPTER, listed.length) }, (_, i) => {
    const found = listed.find((e) => e.number === i + 1);
    const card: EpisodeCardData = found
      ? { ...found, title: episodeTitle(found, lang) }
      : { number: i + 1, title: dict.episode.comingSoon, tool: "", type: "tool" };
    return { card, href: found ? episodeHref(lang, found) : undefined };
  });

  const num = String(chapter.number).padStart(2, "0");

  return (
    <article className={`accent-${chapter.accent}`} aria-labelledby="chapter-title">
      <Breadcrumbs
        label={dict.a11y.breadcrumb}
        items={[
          { label: dict.a11y.home, href: `/${lang}/` },
          { label: dict.chapter.allTitle, href: `/${lang}/chapters/` },
          { label: text.title, href: `/${lang}/chapters/${chapter.slug}/` },
        ]}
      />
      <header className="container-x relative overflow-hidden py-10 sm:py-16">
        <ChapterMotif
          theme={chapter.theme}
          id={`hero-${chapter.number}`}
          className="float pointer-events-none absolute -end-10 top-1/2 h-64 w-96 -translate-y-1/2 opacity-40 sm:h-80 sm:w-[30rem] sm:opacity-70"
        />
        <div className="relative max-w-2xl">
          <p className="kicker">
            <bdi dir="ltr">
              {chapter.theme} {num}
            </bdi>
          </p>
          <p className="mt-2 font-bold text-accent-text">
            {dict.chapter.label} <bdi dir="ltr">{chapter.number}</bdi>
          </p>
          <h1 id="chapter-title" className="glow mt-2 text-4xl sm:text-6xl">
            <Mixed text={text.title} split={lang === "ar"} latinClassName={lang === "ar" ? "glow-latin" : ""} />
          </h1>
          <p className="mt-4 text-lg text-muted">{text.description}</p>
        </div>
      </header>

      <section aria-labelledby="episodes-title" className="container-x">
        <h2 id="episodes-title" data-reveal className="mb-6 text-2xl">
          {dict.chapter.episodesTitle}
        </h2>
        <ol data-stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {slots.map(({ card, href }) => (
            <li key={card.number} data-reveal>
              <EpisodeCard episode={card} accent={chapter.accent} href={href} dict={dict} />
            </li>
          ))}
        </ol>
      </section>

      <div data-reveal className="container-x mt-16">
        <ConsultCTA dict={dict} lang={lang} />
      </div>
    </article>
  );
}
