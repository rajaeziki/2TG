"use client";

import { motion } from "framer-motion";
import { SERVICE_IDS } from "@/data/site";
import { useLang } from "@/i18n/LangProvider";
import Tilt from "./Tilt";

export default function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 h-px w-12 bg-gold" />
        <h2 className="font-display text-3xl font-semibold sm:text-5xl">{t.services.title}</h2>
        <p className="mt-3 text-white/60">{t.services.sub}</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_IDS.map((s, i) => {
            const item = t.services.items[s.id];
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                style={{ transformPerspective: 900 }}
              >
                <Tilt max={5} className="glass h-full p-7 transition-colors hover:border-gold/40">
                  <span className="font-display text-5xl text-gold/35 [transform:translateZ(40px)]">0{i + 1}</span>
                  <h3 className="mt-6 font-display text-2xl font-semibold [transform:translateZ(28px)]">{item.label}</h3>
                  <div className="my-4 h-px w-10 bg-gold/60" />
                  <p className="text-sm leading-relaxed text-white/65 [transform:translateZ(14px)]">{item.blurb}</p>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {(["full", "part"] as const).map((id) => (
            <Tilt key={id} max={3} className="glass p-6">
              <h3 className="font-display text-xl font-semibold text-gold">{t.services.plans[id].label}</h3>
              <p className="mt-1 text-sm text-white/65">{t.services.plans[id].detail}</p>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
