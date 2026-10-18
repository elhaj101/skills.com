import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const dict = getDictionary((await params).lang as Locale);
  return { title: dict.pages.contact, robots: { index: false } };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.contact} dict={dict} lang={lang} />;
}
