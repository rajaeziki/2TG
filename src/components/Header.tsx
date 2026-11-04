"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS } from "@/i18n/dictionary";
import { useLang } from "@/i18n/LangProvider";

export default function Header() {
  const { t, lang } = useLang();
  const path = usePathname() ?? `/${lang}`;
  const rest = path.split("/").slice(2).join("/");
  const home = `/${lang}`;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink-950/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-8">
        <Link href={home} className="flex items-center gap-2 sm:gap-3" dir="ltr">
          <span className="grid h-9 w-9 shrink-0 rotate-45 place-items-center rounded-md border border-gold/60">
            <span className="-rotate-45 font-display text-sm font-semibold text-gold">2T</span>
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-[0.18em]">2TG</span>
            <span className="hidden text-[9px] uppercase tracking-[0.3em] text-white/55 min-[420px]:block">Business Services</span>
          </span>
        </Link>
        <div className="hidden gap-7 text-sm text-white/70 lg:flex">
          <Link href={`${home}#services`} className="transition hover:text-gold">{t.nav.services}</Link>
          <Link href={`${home}#quote`} className="transition hover:text-gold">{t.nav.quote}</Link>
          <Link href={`${home}#gallery`} className="transition hover:text-gold">{t.nav.gallery}</Link>
          <Link href={`${home}#faq`} className="transition hover:text-gold">{t.nav.faq}</Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 rounded-full border border-white/15 p-0.5 sm:gap-1 sm:p-1" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <Link
                key={l.id}
                href={`/${l.id}${rest ? `/${rest}` : ""}`}
                hrefLang={l.id}
                aria-current={lang === l.id ? "true" : undefined}
                className={`rounded-full px-2 py-1 text-xs font-semibold transition sm:px-3 ${
                  lang === l.id ? "bg-gold text-ink-950" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
