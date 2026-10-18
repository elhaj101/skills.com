import type { Dictionary } from "@/i18n";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function ConsultCTA({ dict, lang, title }: { dict: Dictionary; lang: string; title?: string }) {
  return (
    <aside className="card accent-lime overflow-hidden p-6 sm:p-8">
      <div
        className="pointer-events-none absolute -top-24 end-[-4rem] h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-violet), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl">{title ?? dict.consultCta.title}</h2>
          <p className="mt-2 text-muted">{dict.consultCta.body}</p>
        </div>
        <Button href={`/${lang}/consulting/`} className="btn-shine shrink-0">
          <Icon name="calendar" size={18} />
          {dict.consultCta.button}
        </Button>
      </div>
    </aside>
  );
}
