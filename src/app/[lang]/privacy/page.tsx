import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const dict = getDictionary((await params).lang as Locale);
  return { title: dict.pages.privacy, robots: { index: false } };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.privacy} dict={dict} lang={lang} />;
}
