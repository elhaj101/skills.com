import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/consulting">): Promise<Metadata> {
  const dict = getDictionary((await params).lang as Locale);
  return { title: dict.pages.consulting, robots: { index: false } };
}

export default async function ConsultingPage({ params }: PageProps<"/[lang]/consulting">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.consulting} dict={dict} lang={lang} />;
}
