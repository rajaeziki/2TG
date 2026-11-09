"use client";

import Link from "next/link";
import { PHONES, TEL } from "@/data/site";
import { useLang } from "@/i18n/LangProvider";
import { track } from "@/lib/analytics";

export default function SiteFooter() {
  const { t, lang } = useLang();
  return (
    <footer className="bg-ink-950 px-4 py-12 text-center text-sm text-cream/70">
      <p className="font-display text-lg tracking-[0.18em] text-cream">2TG</p>
      <p className="mt-2">{t.footer.line}</p>
      <p className="mt-2 space-x-4" dir="ltr">
        {PHONES.map((p, i) => (
          <a key={p} href={`tel:${TEL[i]}`} onClick={() => track("call_click", { place: "footer" })} className="transition hover:text-gold-light">
            {p}
          </a>
        ))}
      </p>
      <p className="mt-4">
        <Link href={`/${lang}/privacy`} className="underline-offset-4 transition hover:text-gold-light hover:underline">
          {t.footer.privacy}
        </Link>
      </p>
    </footer>
  );
}
