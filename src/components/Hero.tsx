"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { whatsappLink } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LangProvider";
import { SPLASH_MS } from "./Splash";
import { track } from "@/lib/analytics";

export default function Hero() {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wait for the opening logo screen to finish before revealing the hero.
      gsap.from("[data-hero]", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: SPLASH_MS / 1000 - 0.1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative px-4 pb-24 pt-[46vh] sm:px-8 lg:min-h-screen lg:pt-40">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div>
          <p data-hero className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold" />
            {t.hero.kicker}
          </p>
          <h1 data-hero className="font-display text-4xl font-semibold leading-[1.1] sm:text-6xl">
            {t.hero.title} <span className="text-shine">{t.hero.accent}</span>
          </h1>
          <p data-hero className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {t.hero.sub}
          </p>
          <div data-hero className="mt-9 flex flex-wrap gap-3">
            <a href="#quote" className="btn-primary">{t.hero.cta}</a>
            <a
              href={whatsappLink(t.hero.waMsg)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_click", { place: "hero" })}
              className="btn-ghost"
            >
              {t.hero.wa}
            </a>
          </div>
          <ul data-hero className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            {t.hero.chips.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
