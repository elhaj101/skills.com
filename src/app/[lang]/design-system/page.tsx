import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/i18n";
import { chapterHref, chapters, type Accent, type Tool } from "@/lib/content";
import { site } from "@/site.config";
import { Button } from "@/components/Button";
import { ChapterCard } from "@/components/ChapterCard";
import { ConsentGate } from "@/components/ConsentGate";
import { ConsultCTA } from "@/components/ConsultCTA";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Icon, type IconName } from "@/components/Icon";
import { Lockup, Mark } from "@/components/Logo";
import { Mixed } from "@/components/Mixed";
import { Placeholder } from "@/components/Placeholder";
import { ToolCard } from "@/components/ToolCard";

// Internal reference page for the design system. Not linked from the
// navigation and not indexed.
export const metadata: Metadata = { title: "Design system", robots: { index: false, follow: false } };

const brand = [
  { name: "Ink", hex: "#0F0E17", note: "Backgrounds, text on light" },
  { name: "Violet", hex: "#7B5CFF", note: "Brand. As text on dark use #A996FF (7.7:1); pure violet is 4.4:1" },
  { name: "Lime", hex: "#C8FF4D", note: "Primary button on dark, highlights. Ink on lime 16:1" },
  { name: "Paper", hex: "#F7F5FF", note: "Light backgrounds, text on dark" },
];
const neons = [
  { name: "Cyan", hex: "#29F5FF", light: "#006B73" },
  { name: "Pink", hex: "#FF2E97", light: "#A8005C" },
  { name: "Gold", hex: "#FFD25C", light: "#7A4F00" },
];

// Sample covers from the brand material: the same episode in five themes.
const samples: { cover: string; accent: Accent; label: string }[] = [
  { cover: "/covers/samples/orbit.webp", accent: "cyan", label: "Orbit" },
  { cover: "/covers/samples/constellation.webp", accent: "lime", label: "Constellation" },
  { cover: "/covers/samples/nebula.webp", accent: "pink", label: "Nebula" },
  { cover: "/covers/samples/wormhole.webp", accent: "violet", label: "Wormhole" },
  { cover: "/covers/samples/eclipse.webp", accent: "gold", label: "Eclipse" },
];

const sampleTool: Tool = {
  slug: "google-maps",
  name: "Google Maps",
  description: "خرائط Google: ملف مشروعك يظهر لمن يبحث عن خدمتك في منطقتك.",
  bestFor: "المحلات والمطاعم والخدمات المحلية.",
  url: "https://www.google.com/maps",
};

const icons: IconName[] = ["arrow-forward", "chevron-forward", "play", "spark", "apps", "automation", "landmark", "calendar", "search", "mail", "message", "lock", "check", "external-link", "sun", "moon", "menu", "close"];

function DsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="kicker mb-6 text-sm" dir="ltr" style={{ textAlign: "start" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function DesignSystemPage({ params }: PageProps<"/[lang]/design-system">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);

  return (
    <div className="container-x py-12">
      <header className="mb-10">
        <p className="kicker" dir="ltr" style={{ textAlign: "start" }}>
          skills · design system v0.1
        </p>
        <h1 className="glow accent-violet mt-2 text-3xl sm:text-5xl">نظام التصميم</h1>
        <p className="mt-3 max-w-2xl text-muted">
          الألوان والخطوط والأزرار والبطاقات التي تُبنى منها كل صفحات الموقع. جرّب زر الوضع الفاتح في الأعلى لترى الوضعين.
        </p>
      </header>

      <DsSection title="Logo (temporary crops of the supplied files)">
        <div className="flex flex-wrap items-center gap-10">
          <Lockup height={64} />
          <Mark size={96} />
        </div>
      </DsSection>

      <DsSection title="Colour">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brand.map((c) => (
            <li key={c.name} className="card overflow-hidden">
              <div className="h-20 border-b border-line" style={{ background: c.hex }} />
              <div className="p-4" dir="ltr" style={{ textAlign: "left" }}>
                <p className="font-bold">
                  {c.name} <span className="font-normal text-muted">{c.hex}</span>
                </p>
                <p className="text-sm text-muted">{c.note}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {neons.map((c) => (
            <li key={c.name} className="card flex items-center gap-4 p-4" dir="ltr">
              <span className="h-12 w-12 shrink-0 rounded-xl" style={{ background: c.hex, boxShadow: `0 0 24px ${c.hex}66` }} />
              <div className="text-sm" style={{ textAlign: "left" }}>
                <p className="font-bold">
                  {c.name} {c.hex}
                </p>
                <p className="text-muted">Chapter accents only. Text in light mode: {c.light}</p>
              </div>
            </li>
          ))}
        </ul>
      </DsSection>

      <DsSection title="Typography: Readex Pro (Arabic) + Space Grotesk (Latin, digits)">
        <div className="flex flex-col gap-4">
          <p className="text-5xl font-bold">عنوان كبير <bdi dir="ltr">Claude</bdi></p>
          <p className="text-3xl font-bold">عنوان القسم</p>
          <p className="text-xl font-bold">عنوان البطاقة</p>
          <p className="max-w-2xl text-lg">
            <Mixed text="نص عادي بخط واضح ومريح للقراءة على الهاتف. أسماء الأدوات مثل Google Maps و n8n تبقى بالحروف اللاتينية، والأرقام مثل 3 / 10 تظهر بالترتيب الصحيح." />
          </p>
          <p className="text-sm text-muted">نص صغير للملاحظات والتفاصيل.</p>
        </div>
      </DsSection>

      <DsSection title="Glowing titles and highlight (large titles only)">
        <div className="grid gap-8 md:grid-cols-2">
          {(["cyan", "pink", "lime", "gold"] as Accent[]).map((a) => (
            <p key={a} className={`glow accent-${a} text-4xl font-bold sm:text-5xl`}>
              <Mixed text="زبائن من Google" split latinClassName="glow-latin" />
            </p>
          ))}
        </div>
        <p className="mt-8 text-2xl font-bold">
          كلمة مهمة على <span className="hl">خلفية ليمونية</span> كما في الأغلفة
        </p>
      </DsSection>

      <DsSection title="Buttons (min. 48px tall)">
        <div className="flex flex-wrap items-center gap-3">
          <Button href={`/${lang}/consulting/`}>
            <Icon name="calendar" size={18} />
            {dict.cta.consult}
          </Button>
          <Button href={`/${lang}/chapters/`} variant="secondary">
            {dict.cta.watch} <Icon name="arrow-forward" size={18} />
          </Button>
          <Button href={`/${lang}/chapters/`} variant="ghost">
            {dict.cta.allChapters} <Icon name="arrow-forward" size={18} />
          </Button>
          <Button href={`/${lang}/consulting/`} size="sm">
            {dict.cta.consult}
          </Button>
        </div>
      </DsSection>

      <DsSection title="Icons (arrows mirror in RTL)">
        <ul className="flex flex-wrap gap-3">
          {icons.map((n) => (
            <li key={n} className="icon-btn" title={n}>
              <Icon name={n} />
            </li>
          ))}
        </ul>
      </DsSection>

      <DsSection title="Chapter cards: one accent and space motif per chapter">
        <ul className="grid gap-4 md:grid-cols-2">
          {chapters.map((c) => (
            <li key={c.slug}>
              <ChapterCard chapter={c} href={chapterHref(lang, c)} published={0} dict={dict} />
            </li>
          ))}
        </ul>
      </DsSection>

      <DsSection title="Episode cards (sample covers from the brand material, demo only)">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {samples.map((s, i) => (
            <li key={s.label}>
              <EpisodeCard
                episode={{ number: i + 1, title: "زبائن من Google", tool: "Google Maps", type: "correct-use", cover: s.cover, tiktokUrl: site.tiktokUrl }}
                accent={s.accent}
                href={`/${lang}/design-system/`}
                dict={dict}
              />
            </li>
          ))}
          <li>
            <EpisodeCard
              episode={{ number: 6, title: "حلقة لم تُنشر بعد", tool: "Canva", type: "tool", cover: samples[0].cover }}
              accent="cyan"
              dict={dict}
            />
          </li>
        </ul>
      </DsSection>

      <DsSection title="Tool card (sample)">
        <div className="grid gap-4 md:grid-cols-3">
          <ToolCard tool={sampleTool} episodeCount={1} dict={dict} />
          <ToolCard tool={{ ...sampleTool, slug: "n8n", name: "n8n", description: "مثال لبطاقة أداة مع سعر مؤكَّد.", bestFor: "الأتمتة.", url: "https://n8n.io", pricing: "freemium" }} episodeCount={0} dict={dict} />
        </div>
      </DsSection>

      <DsSection title="Consulting call to action">
        <ConsultCTA dict={dict} lang={lang} />
      </DsSection>

      <DsSection title="Consent gate for embeds (nothing loads before consent)">
        <ConsentGate title={dict.consent.embedTitle} labels={dict.consent} privacyHref={`/${lang}/privacy/`} />
      </DsSection>

      <DsSection title="Placeholder marker">
        <Placeholder className="max-w-md">كل محتوى يجب أن تزوّدني به يظهر بهذا الشكل حتى يُستبدل.</Placeholder>
      </DsSection>
    </div>
  );
}
