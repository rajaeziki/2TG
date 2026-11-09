"use client";

import dynamic from "next/dynamic";
import stock from "@/data/images.json";
import { TEAM_PHOTOS } from "@/data/trust";
import { useLang } from "@/i18n/LangProvider";

const Ring = dynamic(() => import("./Ring"), { ssr: false });

// Real team photos (src/data/trust.ts) replace the stock images as soon as any are added.
const hasTeam = TEAM_PHOTOS.length > 0;
const images = hasTeam ? TEAM_PHOTOS.map((url, i) => ({ id: i + 1, url })) : stock.map(({ id, url }) => ({ id, url }));

export default function Gallery() {
  const { t } = useLang();
  return (
    <section id="gallery" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 h-px w-12 bg-gold" />
        <h2 className="font-display text-3xl font-semibold sm:text-5xl">{t.gallery.title}</h2>
        {!hasTeam && <p className="mt-2 text-ink-950/60">{t.gallery.note}</p>}
        <div className="mt-6">
          <Ring images={images} />
        </div>
      </div>
    </section>
  );
}
