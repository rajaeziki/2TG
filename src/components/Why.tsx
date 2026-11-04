"use client";

import { useLang } from "@/i18n/LangProvider";
import { CONFIRMED, isDraftMode, visible } from "@/data/trust";

// Hidden on the live site until 2TG confirms the wording (CONFIRMED.why in src/data/trust.ts).
export default function Why() {
  const { t } = useLang();
  if (!visible(CONFIRMED.why)) return null;
  return (
    <section id="why" className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 h-px w-12 bg-gold" />
        <h2 className="font-display text-3xl font-semibold sm:text-5xl">{t.why.title}</h2>
        <p className="mt-3 text-white/60">{t.why.sub}</p>
        {isDraftMode && !CONFIRMED.why && (
          <p className="mt-4 inline-block rounded-full border border-dashed border-gold/60 px-4 py-1 text-xs text-gold">{t.why.draft}</p>
        )}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.why.items.map((item, i) => (
            <div key={item.title} className="glass p-7">
              <span className="font-display text-3xl text-gold/40">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
