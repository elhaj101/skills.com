import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/impressum">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return { title: dict.pages.impressum, robots: { index: false }, alternates: alternates(lang, "impressum/") };
}

export default async function ImpressumPage({ params }: PageProps<"/[lang]/impressum">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.impressum} path="impressum/" dict={dict} lang={lang} />;
}
