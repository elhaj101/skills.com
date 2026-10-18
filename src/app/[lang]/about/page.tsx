import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const dict = getDictionary((await params).lang as Locale);
  return { title: dict.pages.about, robots: { index: false } };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.about} dict={dict} lang={lang} />;
}
