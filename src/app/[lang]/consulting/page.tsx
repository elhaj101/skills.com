import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/consulting">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return { title: dict.pages.consulting, robots: { index: false }, alternates: alternates(lang, "consulting/") };
}

export default async function ConsultingPage({ params }: PageProps<"/[lang]/consulting">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.consulting} path="consulting/" dict={dict} lang={lang} />;
}
