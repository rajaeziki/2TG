import { notFound } from "next/navigation";
import HomeView from "@/components/HomeView";
import { DICT, isLang } from "@/i18n/dictionary";
import { PHONES } from "@/data/site";
import { SITE_URL } from "@/data/trust";

export default function Home({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang)) notFound();
  const t = DICT[params.lang];

  // Structured data so search engines understand the business and show FAQ rich results.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EmploymentAgency",
      name: "2TG Business Services",
      url: `${SITE_URL}/${params.lang}`,
      telephone: PHONES.map((p) => `+212${p.replace(/\s/g, "").slice(1)}`),
      areaServed: ["Agadir", "Dar Bouazza"],
      knowsLanguage: ["en", "fr", "ar"],
      description: t.seo.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeView />
    </>
  );
}
