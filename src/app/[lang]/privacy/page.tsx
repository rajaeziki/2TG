import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrivacyView from "@/components/PrivacyView";
import { DICT, isLang } from "@/i18n/dictionary";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLang(params.lang)) return {};
  return {
    title: `${DICT[params.lang].privacy.title} | 2TG Business Services`,
    alternates: {
      canonical: `/${params.lang}/privacy`,
      languages: { en: "/en/privacy", fr: "/fr/privacy", ar: "/ar/privacy", "x-default": "/en/privacy" },
    },
  };
}

export default function Privacy({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang)) notFound();
  return <PrivacyView />;
}
