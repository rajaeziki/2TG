"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

export default function Faq() {
  const { t, lang } = useLang();
  const last = t.faq.items.length - 1;
  return (
    <section id="faq" className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 h-px w-12 bg-gold" />
        <h2 className="font-display text-3xl font-semibold sm:text-5xl">{t.faq.title}</h2>
        <div className="mt-10 divide-y divide-ink-950/10 border-y border-ink-950/10">
          {t.faq.items.map((item, i) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold marker:content-none">
                {item.q}
                <span className="text-2xl leading-none text-gold transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink-950/70">
                {item.a}
                {i === last && (
                  <>
                    {" "}
                    <Link href={`/${lang}/privacy`} className="text-gold underline underline-offset-4">
                      {t.footer.privacy}
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
