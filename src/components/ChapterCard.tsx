import Link from "next/link";
import { chapterText, type Chapter } from "@/lib/content";
import type { Dictionary } from "@/i18n";
import { ChapterMotif } from "./ChapterMotif";
import { Icon } from "./Icon";
import { Mixed } from "./Mixed";

export function ChapterCard({
  chapter,
  href,
  published,
  total = 10,
  dict,
  headingLevel = "h3",
  lang,
}: {
  chapter: Chapter;
  href: string;
  published: number;
  total?: number;
  dict: Dictionary;
  headingLevel?: "h2" | "h3";
  lang: string;
}) {
  const text = chapterText(chapter, lang);
  const Heading = headingLevel;
  const num = String(chapter.number).padStart(2, "0");
  return (
    <article className={`card card-hover accent-${chapter.accent} @container flex h-full flex-col overflow-hidden`}>
      <ChapterMotif
        theme={chapter.theme}
        id={`ch${chapter.number}`}
        className="pointer-events-none absolute end-0 top-0 h-28 w-44 opacity-90 @lg:-end-6 @lg:top-1/2 @lg:h-48 @lg:w-72 @lg:-translate-y-1/2"
      />
      {/* Narrow card (< 32rem): motif sits in the top corner above the title.
          Wide card: motif on the end side, text kept clear of it.
          Decided by the card's own width (container query), not the screen.
          Title and description always take the same number of lines, so
          every chapter card has the same size. */}
      <div className="relative flex flex-1 flex-col gap-2 p-5 @lg:p-6 @lg:pe-56">
        <p className="kicker min-h-16 @lg:min-h-0">
          <bdi dir="ltr">
            {chapter.theme} {num}
          </bdi>
        </p>
        <Heading className="line-clamp-2 h-[2lh] text-xl @lg:text-2xl">
          <Link href={href} className="stretched-link">
            <Mixed text={text.title} split={lang === "ar"} latinClassName={lang === "ar" ? "glow-latin" : ""} />
          </Link>
        </Heading>
        <p className="line-clamp-3 h-[3lh] text-sm text-muted @lg:text-base">{text.description}</p>
        <p className="mt-auto flex items-center gap-2 pt-2 text-sm font-bold">
          <span className="chip chip-accent whitespace-nowrap">
            <bdi dir="ltr">
              {published} / {total}
            </bdi>
            {dict.chapter.published}
          </span>
          <Icon name="arrow-forward" size={18} className="text-accent-text" />
        </p>
      </div>
    </article>
  );
}
