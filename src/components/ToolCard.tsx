/* eslint-disable @next/next/no-img-element */
import type { Tool } from "@/lib/content";
import type { Dictionary } from "@/i18n";
import { asset } from "@/lib/paths";
import { Icon } from "./Icon";
import { Mixed } from "./Mixed";

export function ToolCard({ tool, episodeCount, dict }: { tool: Tool; episodeCount: number; dict: Dictionary }) {
  return (
    <article className="card card-hover accent-violet flex flex-col gap-3 p-5">
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
          <h3 className="text-lg" dir="ltr" style={{ textAlign: "start" }}>
            {tool.name}
          </h3>
          {tool.pricing && <span className="chip">{dict.tool.pricing[tool.pricing]}</span>}
        </div>
      </div>
      <p className="text-muted">
        <Mixed text={tool.description} />
      </p>
      <p className="text-sm">
        <strong>{dict.tool.bestFor}</strong> <Mixed text={tool.bestFor} />
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
