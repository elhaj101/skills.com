import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { UnderConstruction } from "@/components/UnderConstruction";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return { title: dict.pages.contact, robots: { index: false }, alternates: alternates(lang, "contact/") };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  return <UnderConstruction title={dict.pages.contact} path="contact/" dict={dict} lang={lang} />;
}
