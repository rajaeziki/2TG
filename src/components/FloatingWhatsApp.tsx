"use client";

import { whatsappLink } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LangProvider";
import { track } from "@/lib/analytics";

export default function FloatingWhatsApp() {
  const { t } = useLang();
  return (
    <a
      href={whatsappLink(t.wa.general)}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("whatsapp_click", { place: "floating" })}
      aria-label="WhatsApp"
      className="fixed bottom-5 end-5 z-50 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-ink-950 shadow-lg transition hover:scale-105"
    >
      {t.wa.float}
    </a>
  );
}
