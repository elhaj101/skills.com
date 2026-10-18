import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/tools">): Promise<Metadata> {
  const dict = getDictionary((await params).lang as Locale);
  return { title: dict.pages.tools, robots: { index: false } };
}

export default async function ToolsPage({ params }: PageProps<"/[lang]/tools">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.tools} dict={dict} lang={lang} />;
}
