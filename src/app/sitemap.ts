import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/trust";
import { LANG_IDS } from "@/i18n/dictionary";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy"].flatMap((page) =>
    LANG_IDS.map((lang) => ({
      url: `${SITE_URL}/${lang}${page}`,
      lastModified: new Date(),
      alternates: { languages: Object.fromEntries(LANG_IDS.map((l) => [l, `${SITE_URL}/${l}${page}`])) },
    }))
  );
}
