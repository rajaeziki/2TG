"use client";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/i18n/LangProvider";

export default function PrivacyView() {
  const { t } = useLang();
  return (
    <main className="relative">
      <Header />
      <article className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-8">
        <div className="mb-4 h-px w-12 bg-gold" />
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">{t.privacy.title}</h1>
        <p className="mt-3 text-sm text-ink-950/50">{t.privacy.updated}</p>
        <div className="mt-10 space-y-8">
          {t.privacy.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl font-semibold text-gold">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-ink-950/75">{s.p}</p>
            </section>
          ))}
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
