/* eslint-disable @next/next/no-img-element */
import { toolText, type Tool } from "@/lib/content";
import type { Dictionary } from "@/i18n";
import { asset } from "@/lib/paths";
import { Icon } from "./Icon";
import { Mixed } from "./Mixed";

export function ToolCard({ tool, episodeCount, dict, lang }: { tool: Tool; episodeCount: number; dict: Dictionary; lang: string }) {
  const text = toolText(tool, lang);
  return (
    <article className="card card-hover accent-violet flex h-full flex-col gap-3 p-5">
      <div className="flex items-center gap-3">
        {tool.logo ? (
          // Tool logos identify the tool only (nominative use)
          <img src={asset(tool.logo)} alt="" width={44} height={44} className="h-11 w-11 rounded-xl bg-white object-contain p-1.5" />
        ) : (
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-lg font-bold text-accent-text" aria-hidden="true">
            {tool.name.charAt(0)}
          </span>
        )}
        <div>
          <h3 className="text-lg">
            <bdi dir="ltr">{tool.name}</bdi>
          </h3>
          {/* Fixed-height row so cards with and without pricing line up */}
          <div className="h-7">{tool.pricing && <span className="chip">{dict.tool.pricing[tool.pricing]}</span>}</div>
        </div>
      </div>
      <p className="line-clamp-2 h-[2lh] text-muted">
        <Mixed text={text.description} />
      </p>
      <p className="line-clamp-2 h-[2lh] text-sm">
        <strong>{dict.tool.bestFor}</strong> <Mixed text={text.bestFor} />
      </p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2 text-sm">
        <span className="chip chip-accent">
          <bdi dir="ltr">{episodeCount}</bdi> {dict.tool.episodes}
        </span>
        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
          {dict.tool.officialSite}
          <Icon name="external-link" size={16} />
        </a>
      </div>
      {tool.affiliateUrl && (
        <a href={tool.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="link text-sm">
          {dict.tool.affiliate}
        </a>
      )}
    </article>
  );
}
