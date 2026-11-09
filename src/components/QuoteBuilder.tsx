"use client";

import { useState } from "react";
import { SERVICE_IDS, CITY_IDS, INDICATIVE_MAD, type ServiceId, type PlanId, type CityId } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LangProvider";
import Tilt from "./Tilt";
import { track } from "@/lib/analytics";
import { CONFIRMED, isDraftMode, visible } from "@/data/trust";

export default function QuoteBuilder() {
  const { t } = useLang();
  const [service, setService] = useState<ServiceId>("cleaner");
  const [plan, setPlan] = useState<PlanId>("full");
  const [staff, setStaff] = useState(1);
  const [city, setCity] = useState<CityId>("agadir");
  const [name, setName] = useState("");

  // Prices are placeholders until CONFIRMED.prices is true: shown only in development, hidden live.
  const showPrice = visible(CONFIRMED.prices);
  const total = INDICATIVE_MAD[service][plan] * staff;
  const totalText = total.toLocaleString("en-US");
  const message = t.quote.msg(
    name || "-",
    t.cities[city],
    staff,
    t.services.items[service].label.toLowerCase(),
    t.services.plans[plan].label.toLowerCase(),
    CONFIRMED.prices ? totalText : null
  );

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition ${
      active ? "border-gold bg-gold/15 text-gold" : "border-ink-950/15 text-ink-950/70 hover:border-ink-950/40"
    }`;
  const field = "mt-1 w-full rounded-lg border border-ink-950/15 bg-white px-3 py-2 text-ink-950";

  return (
    <section id="quote" className="relative px-4 py-20 sm:px-8">
      <Tilt max={3} className="mx-auto max-w-3xl">
        <div className="glass p-6 sm:p-10">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{t.quote.title}</h2>
          <p className="mt-2 text-ink-950/60">{t.quote.sub}</p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-2 text-sm text-ink-950/60">{t.quote.who}</p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_IDS.map((s) => (
                  <button key={s.id} type="button" onClick={() => setService(s.id)} className={chip(service === s.id)}>
                    {t.services.items[s.id].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-ink-950/60">{t.quote.schedule}</p>
              <div className="flex flex-wrap gap-2">
                {(["full", "part"] as const).map((id) => (
                  <button key={id} type="button" onClick={() => setPlan(id)} className={chip(plan === id)}>
                    {t.services.plans[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="text-sm text-ink-950/60">
                {t.quote.staff}
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={staff}
                  onChange={(e) => setStaff(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
                  className={field}
                />
              </label>
              <label className="text-sm text-ink-950/60">
                {t.quote.city}
                <select value={city} onChange={(e) => setCity(e.target.value as CityId)} className={field}>
                  {CITY_IDS.map((c) => (
                    <option key={c} value={c}>
                      {t.cities[c]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-ink-950/60">
                {t.quote.name}
                <input value={name} onChange={(e) => setName(e.target.value)} className={field} />
              </label>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-cream-100 p-5 sm:flex-row sm:items-center">
            <div>
              {showPrice ? (
                <>
                  <p className="text-sm text-ink-950/60">
                    {t.quote.estimate}
                    {isDraftMode && !CONFIRMED.prices && <span className="ms-2 rounded-full border border-dashed border-gold/60 px-2 text-[10px] text-gold">DRAFT price</span>}
                  </p>
                  <p className="text-3xl font-bold text-gold">
                    <span className="text-base font-normal text-ink-950/60">{t.quote.from} </span>~{totalText} {t.mad}
                    <span className="text-base font-normal text-ink-950/60"> {t.quote.perMonth}</span>
                  </p>
                  <p className="mt-1 text-xs text-ink-950/45">{t.quote.note}</p>
                </>
              ) : (
                <p className="max-w-sm text-sm text-ink-950/70">{t.quote.onRequest}</p>
              )}
            </div>
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("quote_whatsapp_click", { service, plan, staff })}
              className="btn-primary"
            >
              {t.quote.send}
            </a>
          </div>
        </div>
      </Tilt>
    </section>
  );
}
