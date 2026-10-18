import type { Dictionary } from "@/i18n";
import { Breadcrumbs } from "./Breadcrumbs";
import { ConsultCTA } from "./ConsultCTA";
import { Placeholder } from "./Placeholder";

// Temporary body for pages that are planned but not built yet.
export function UnderConstruction({ title, path, dict, lang }: { title: string; path: string; dict: Dictionary; lang: string }) {
  return (
    <>
      <Breadcrumbs
        label={dict.a11y.breadcrumb}
        items={[
          { label: dict.a11y.home, href: `/${lang}/` },
          { label: title, href: `/${lang}/${path}` },
        ]}
      />
      <div className="container-x py-10 sm:py-14">
        <h1 className="glow accent-violet mb-6 text-3xl sm:text-5xl">{title}</h1>
        <Placeholder className="mb-12 max-w-xl">{dict.pages.underConstruction}</Placeholder>
        <ConsultCTA dict={dict} lang={lang} />
      </div>
    </>
  );
}
