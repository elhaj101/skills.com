import type { Dictionary } from "@/i18n";
import { ConsultCTA } from "./ConsultCTA";
import { Placeholder } from "./Placeholder";

// Temporary body for pages that are planned but not built yet.
export function UnderConstruction({ title, dict, lang }: { title: string; dict: Dictionary; lang: string }) {
  return (
    <div className="container-x py-12 sm:py-16">
      <h1 className="glow accent-violet mb-6 text-3xl sm:text-5xl">{title}</h1>
      <Placeholder className="mb-12 max-w-xl">{dict.pages.underConstruction}</Placeholder>
      <ConsultCTA dict={dict} lang={lang} />
    </div>
  );
}
