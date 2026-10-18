/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Accent, EpisodeType } from "@/lib/content";
import type { Dictionary } from "@/i18n";
import { asset } from "@/lib/paths";
import { Icon } from "./Icon";
import { Mixed } from "./Mixed";

export type EpisodeCardData = {
  number: number;
  title: string;
  tool: string;
  type: EpisodeType;
  cover?: string;
  tiktokUrl?: string;
};

export function EpisodeCard({
  episode,
  accent,
  href,
  dict,
}: {
  episode: EpisodeCardData;
  accent: Accent;
  /** Episode detail page; omitted for unpublished episodes */
  href?: string;
  dict: Dictionary;
}) {
  const published = Boolean(episode.tiktokUrl);
  // A slot with no data yet: just the number and «قريبًا»
  const emptySlot = !episode.tool;
  return (
    <article className={`card ${published ? "card-hover" : ""} accent-${accent} overflow-hidden p-2`}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[0.9rem] bg-surface-2">
        {episode.cover ? (
          <img
            src={asset(episode.cover)}
            alt={`غلاف الحلقة ${episode.number}: ${episode.title}`}
            width={360}
            height={640}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover ${published ? "" : "opacity-45 grayscale-[60%]"}`}
          />
        ) : (
          <div className="grid h-full place-items-center text-muted">
            <Icon name="spark" size={40} />
          </div>
        )}

        {episode.tool && (
          <span className="chip absolute start-2 top-2 border-transparent bg-ink/75 text-paper backdrop-blur-sm" dir="ltr">
            {episode.tool}
          </span>
        )}

        {published ? (
          <a
            href={episode.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 end-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-lime text-ink shadow-[0_0_24px_rgb(200_255_77/0.5)]"
            aria-label={`${dict.episode.play}: ${episode.title}`}
          >
            <Icon name="play" size={20} />
          </a>
        ) : emptySlot ? null : (
          <span className="absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full bg-ink/80 px-4 py-1 text-sm font-bold text-paper">
            {dict.episode.comingSoon}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 px-2 pb-2 pt-3">
        <p className="flex items-center gap-2 text-xs font-bold text-accent-text">
          {dict.episode.label} <bdi dir="ltr">{episode.number}</bdi>
          {!emptySlot && (
            <>
              <span aria-hidden="true">·</span>
              {dict.episode.types[episode.type]}
            </>
          )}
        </p>
        <h3 className="text-base leading-snug">
          {published && href ? (
            <Link href={href} className="stretched-link">
              <Mixed text={episode.title} />
            </Link>
          ) : (
            <Mixed text={episode.title} />
          )}
        </h3>
      </div>
    </article>
  );
}
