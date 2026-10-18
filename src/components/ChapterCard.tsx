import Link from "next/link";
import type { Chapter } from "@/lib/content";
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
}: {
  chapter: Chapter;
  href: string;
  published: number;
  total?: number;
  dict: Dictionary;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const num = String(chapter.number).padStart(2, "0");
  return (
    <article className={`card card-hover accent-${chapter.accent} overflow-hidden`}>
      <ChapterMotif
        theme={chapter.theme}
        id={`ch${chapter.number}`}
        className="pointer-events-none absolute end-0 top-0 h-28 w-44 opacity-90 sm:-end-6 sm:top-1/2 sm:h-48 sm:w-72 sm:-translate-y-1/2"
      />
      {/* Phones: motif sits in the top corner above the title.
          Wider screens: motif on the end side, text kept clear of it. */}
      <div className="relative flex min-h-44 flex-col gap-2 p-5 sm:p-6 sm:pe-56">
        <p className="kicker min-h-16 sm:min-h-0" dir="ltr" style={{ textAlign: "end" }}>
          {chapter.theme} {num}
        </p>
        <Heading className="text-xl sm:text-2xl">
          <Link href={href} className="stretched-link">
            <Mixed text={chapter.title} split latinClassName="glow-latin" />
          </Link>
        </Heading>
        <p className="text-sm text-muted sm:text-base">{chapter.description}</p>
        <p className="mt-auto flex items-center gap-2 pt-2 text-sm font-bold">
          <span className="chip chip-accent">
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
