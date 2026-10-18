import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/tools">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return { title: dict.pages.tools, robots: { index: false }, alternates: alternates(lang, "tools/") };
}

export default async function ToolsPage({ params }: PageProps<"/[lang]/tools">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.tools} path="tools/" dict={dict} lang={lang} />;
}
