import type { Metadata } from "next";
import Link from "next/link";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { chapterHref, chapters, episodeHref, episodes, episodeTitle, getChapter, isPublished, publishedCount } from "@/lib/content";
import { site } from "@/site.config";
import { Button } from "@/components/Button";
import { ChapterCard } from "@/components/ChapterCard";
import { ConsentGate } from "@/components/ConsentGate";
import { ConsultCTA } from "@/components/ConsultCTA";
import { EpisodeCard } from "@/components/EpisodeCard";
import { HeroCanvas } from "@/components/HeroCanvas";
import { Icon, type IconName } from "@/components/Icon";
import { Mark } from "@/components/Logo";
import { Mixed } from "@/components/Mixed";
import { Placeholder } from "@/components/Placeholder";
import { RotatingWord } from "@/components/RotatingWord";
import { Section } from "@/components/Section";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return { alternates: alternates(lang) };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.home;

  const latest = episodes
    .filter(isPublished)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <HeroCanvas />
        <div className="container-x relative grid items-center gap-10 pb-14 pt-12 sm:pt-20 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <p className="chip chip-accent accent-lime text-sm">
              <Icon name="spark" size={14} />
              <span>{t.rotatingPrefix}</span>
              <RotatingWord words={t.rotating} separator={lang === "ar" ? "، " : ", "} />
            </p>
            <h1 id="hero-title" className="glow accent-violet text-4xl leading-tight sm:text-6xl">
              {t.titleLine1}
              <br />
              <span className="hl">{t.titleHighlight}</span>
            </h1>
            <p className="max-w-xl text-lg text-muted sm:text-xl">{t.intro}</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href={`/${lang}/consulting/`}>
                <Icon name="calendar" size={18} />
                {dict.cta.consult}
              </Button>
              <Button href={`/${lang}/chapters/`} variant="secondary">
                {dict.cta.watch}
                <Icon name="arrow-forward" size={18} />
              </Button>
            </div>
          </div>
          <div className="relative mx-auto hidden aspect-square w-72 place-items-center sm:grid lg:w-80" aria-hidden="true">
            <div className="orbit-ring absolute inset-0 rounded-full border border-dashed border-line">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-lime shadow-[0_0_16px_rgb(200_255_77/0.9)]" />
            </div>
            <div className="orbit-ring reverse absolute inset-10 rounded-full border border-line">
              <span className="absolute -bottom-1 left-1/3 h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_rgb(41_245_255/0.9)]" />
            </div>
            <div
              className="absolute inset-16 rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle, rgb(123 92 255 / .5), transparent 70%)" }}
            />
            <div className="float relative">
              <div data-tilt>
                <Mark size={150} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <Section id="learn" title={t.pillarsTitle}>
        <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.pillars.map((p) => (
            <li key={p.title} data-reveal className="card card-hover accent-violet p-5">
              <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-link">
                <Icon name={p.icon as IconName} />
              </span>
              <h3 className="text-lg">
                <Mixed text={p.title} />
              </h3>
              <p className="mt-1 text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Chapters */}
      <Section
        id="chapters"
        title={t.chaptersTitle}
        intro={t.chaptersIntro}
        action={
          <Link href={`/${lang}/chapters/`} className="btn btn-ghost">
            {dict.cta.allChapters} <Icon name="arrow-forward" size={18} />
          </Link>
        }
      >
        <ul data-stagger className="grid gap-4 md:grid-cols-2">
          {chapters.map((c) => (
            <li key={c.slug} data-reveal>
              <ChapterCard chapter={c} href={chapterHref(lang, c)} published={publishedCount(c.number)} dict={dict} lang={lang} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Latest episodes */}
      <Section id="latest" title={t.latestTitle}>
        {latest.length > 0 ? (
          <ul data-stagger className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6">
            {latest.map((e) => (
              <li key={`${e.chapter}-${e.number}`} data-reveal className="w-44 shrink-0 snap-start sm:w-auto">
                <EpisodeCard
                  episode={{ ...e, title: episodeTitle(e, lang) }}
                  accent={getChapter(e.chapter)!.accent}
                  href={episodeHref(lang, e)}
                  dict={dict}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div data-reveal className="card flex flex-col items-start gap-4 p-6">
            <p>{t.latestEmpty}</p>
            <Button href={site.tiktokUrl} external variant="secondary" size="sm">
              {dict.cta.follow}
            </Button>
          </div>
        )}
      </Section>

      {/* How consulting works */}
      <Section id="how-consulting-works" title={t.consultTitle} intro={t.consultIntro}>
        <ol data-stagger className="grid gap-4 md:grid-cols-3">
          {t.steps.map((s, i) => (
            <li key={s.title} data-reveal className="card card-hover accent-lime p-6">
              <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-lime font-bold text-ink" aria-hidden="true">
                <bdi dir="ltr">{i + 1}</bdi>
              </span>
              <h3 className="text-lg">{s.title}</h3>
              <p className="mt-1 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-6">
          <Button href={`/${lang}/consulting/`}>{dict.cta.consult}</Button>
        </div>
      </Section>

      {/* About (short) */}
      <Section id="about" title={t.aboutTitle}>
        <article data-reveal className="card grid gap-6 p-6 sm:grid-cols-[160px_1fr] sm:items-center">
          <figure>
            <Placeholder className="grid aspect-square w-40 place-items-center text-center text-sm">{dict.placeholders.photo}</Placeholder>
          </figure>
          <div className="flex flex-col items-start gap-3">
            <p className="text-lg">{t.aboutBody}</p>
            <Placeholder className="text-sm">{dict.placeholders.draft}</Placeholder>
            <Link href={`/${lang}/about/`} className="btn btn-ghost px-0">
              {dict.cta.aboutMore} <Icon name="arrow-forward" size={18} />
            </Link>
          </div>
        </article>
      </Section>

      {/* TikTok */}
      <Section id="tiktok" title={t.tiktokTitle} intro={t.tiktokIntro}>
        <div data-reveal className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col items-start gap-4">
            <p className="text-3xl font-bold">
              <bdi dir="ltr">{site.tiktokHandle}</bdi>
            </p>
            <Placeholder className="text-sm">{dict.placeholders.handle}</Placeholder>
            <Button href={site.tiktokUrl} external>
              {dict.cta.follow}
            </Button>
          </div>
          <ConsentGate title={dict.consent.embedTitle} labels={dict.consent} privacyHref={`/${lang}/privacy/`} />
        </div>
      </Section>

      <div data-reveal className="container-x">
        <ConsultCTA dict={dict} lang={lang} />
      </div>
    </>
  );
}
