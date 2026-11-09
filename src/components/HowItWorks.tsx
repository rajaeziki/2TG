"use client";

import { motion } from "framer-motion";
import { useLang } from "@/i18n/LangProvider";

export default function HowItWorks() {
  const { t } = useLang();
  return (
    <section className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 h-px w-12 bg-gold" />
        <h2 className="font-display text-3xl font-semibold sm:text-5xl">{t.how.title}</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {t.how.steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative border-t border-gold/40 pt-6"
            >
              <span className="font-display text-4xl text-gold">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-950/65">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
