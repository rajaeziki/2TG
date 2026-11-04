import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cairo, Playfair_Display } from "next/font/google";
import "../globals.css";
import { LangProvider } from "@/i18n/LangProvider";
import { DICT, LANG_IDS, isLang } from "@/i18n/dictionary";
import { SITE_URL } from "@/data/trust";
import Analytics from "@/components/Analytics";

const cairo = Cairo({ subsets: ["latin", "arabic"], variable: "--font-cairo", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_IDS.map((lang) => ({ lang }));
}

const LOCALE = { en: "en_US", fr: "fr_FR", ar: "ar_MA" } as const;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLang(params.lang)) return {};
  const { title, description } = DICT[params.lang].seo;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${params.lang}`,
      languages: { en: "/en", fr: "/fr", ar: "/ar", "x-default": "/en" },
    },
    openGraph: { title, description, type: "website", locale: LOCALE[params.lang], url: `/${params.lang}`, siteName: "2TG Business Services" },
  };
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  if (!isLang(params.lang)) notFound();
  return (
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : "ltr"} className={`${cairo.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <LangProvider lang={params.lang}>{children}</LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
