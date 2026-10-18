import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return { title: dict.pages.privacy, robots: { index: false }, alternates: alternates(lang, "privacy/") };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.privacy} path="privacy/" dict={dict} lang={lang} />;
}
