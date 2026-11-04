"use client";

import { useLang } from "@/i18n/LangProvider";
import { TESTIMONIALS, isDraftMode } from "@/data/trust";

// Renders only real testimonials added to TESTIMONIALS in src/data/trust.ts.
export default function Testimonials() {
  const { t } = useLang();
  if (TESTIMONIALS.length === 0) {
    if (!isDraftMode) return null;
    return (
      <section className="relative px-4 py-12 sm:px-8">
        <p className="mx-auto max-w-3xl rounded-2xl border border-dashed border-gold/50 p-6 text-center text-sm text-gold">
          DRAFT slot: add real customer testimonials to TESTIMONIALS in src/data/trust.ts. This section stays hidden on the live site until you do.
        </p>
      </section>
    );
  }
  return (
    <section id="testimonials" className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 h-px w-12 bg-gold" />
        <h2 className="font-display text-3xl font-semibold sm:text-5xl">{t.testimonials.title}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((q) => (
            <figure key={q.name + q.text} className="glass p-7">
              <blockquote className="leading-relaxed text-white/80">“{q.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-gold">
                {q.name} <span className="text-white/50">· {q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
