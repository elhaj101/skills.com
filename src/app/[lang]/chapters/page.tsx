import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { chapterHref, chapters, publishedCount } from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChapterCard } from "@/components/ChapterCard";
import { ConsultCTA } from "@/components/ConsultCTA";

export async function generateMetadata({ params }: PageProps<"/[lang]/chapters">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return { title: dict.chapter.allTitle, description: dict.chapter.allIntro, alternates: alternates(lang, "chapters/") };
}

export default async function ChaptersPage({ params }: PageProps<"/[lang]/chapters">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return (
    <>
      <Breadcrumbs
        label={dict.a11y.breadcrumb}
        items={[
          { label: dict.a11y.home, href: `/${lang}/` },
          { label: dict.chapter.allTitle, href: `/${lang}/chapters/` },
        ]}
      />
      <div className="container-x py-10 sm:py-14">
        <header className="mb-10 max-w-2xl">
          <h1 className="glow accent-violet text-3xl sm:text-5xl">{dict.chapter.allTitle}</h1>
          <p className="mt-3 text-lg text-muted">{dict.chapter.allIntro}</p>
        </header>
        <ol data-stagger className="grid gap-5 md:grid-cols-2">
          {chapters.map((c) => (
            <li key={c.slug} data-reveal>
              <ChapterCard chapter={c} href={chapterHref(lang, c)} published={publishedCount(c.number)} dict={dict} headingLevel="h2" lang={lang} />
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-16">
          <ConsultCTA dict={dict} lang={lang} />
        </div>
      </div>
    </>
  );
}
