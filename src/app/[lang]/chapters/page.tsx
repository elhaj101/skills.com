import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/i18n";
import { chapterHref, chapters, publishedCount } from "@/lib/content";
import { ChapterCard } from "@/components/ChapterCard";
import { ConsultCTA } from "@/components/ConsultCTA";

export async function generateMetadata({ params }: PageProps<"/[lang]/chapters">): Promise<Metadata> {
  const dict = getDictionary((await params).lang as Locale);
  return { title: dict.chapter.allTitle, description: dict.chapter.allIntro };
}

export default async function ChaptersPage({ params }: PageProps<"/[lang]/chapters">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return (
    <div className="container-x py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="glow accent-violet text-3xl sm:text-5xl">{dict.chapter.allTitle}</h1>
        <p className="mt-3 text-lg text-muted">{dict.chapter.allIntro}</p>
      </header>
      <ul className="grid gap-5 md:grid-cols-2">
        {chapters.map((c) => (
          <li key={c.slug} className="reveal">
            <ChapterCard chapter={c} href={chapterHref(lang, c)} published={publishedCount(c.number)} dict={dict} headingLevel="h2" />
          </li>
        ))}
      </ul>
      <div className="mt-16">
        <ConsultCTA dict={dict} lang={lang} />
      </div>
    </div>
  );
}
