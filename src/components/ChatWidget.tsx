"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/i18n/LangProvider";
import { whatsappLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import Link from "next/link";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, loading, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(next);
    setInput("");
    setFailed(false);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error("chat failed");
      setMsgs([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="glass fixed bottom-36 end-5 z-50 flex h-[480px] max-h-[70vh] w-[min(92vw,380px)] flex-col overflow-hidden !bg-ink-900/90"
            role="dialog"
            aria-label={t.chat.title}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="font-display text-lg font-semibold text-gold">{t.chat.title}</p>
                <p className="text-xs text-white/50">{t.chat.subtitle}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label={t.gallery.close} className="text-2xl leading-none text-white/60 hover:text-white">
                ×
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              <div className="max-w-[85%] rounded-2xl rounded-ss-sm bg-white/10 px-3 py-2 text-white/90">{t.chat.greeting}</div>
              {msgs.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.chat.suggestions.map((s) => (
                    <button key={s} onClick={() => send(s)} className="rounded-full border border-gold/40 px-3 py-1.5 text-xs text-gold transition hover:bg-gold/10">
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 ${
                    m.role === "user" ? "ms-auto rounded-ee-sm bg-gold text-ink-950" : "rounded-ss-sm bg-white/10 text-white/90"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="flex w-14 gap-1 rounded-2xl bg-white/10 px-3 py-3" aria-label="...">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              )}
              {failed && (
                <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-3 py-2 text-red-100">
                  {t.chat.error}{" "}
                  <a href={whatsappLink(t.wa.general)} target="_blank" rel="noreferrer" className="underline">
                    {t.chat.whatsapp}
                  </a>
                </div>
              )}
              <div ref={end} />
            </div>

            <p className="border-t border-white/10 px-4 pt-2 text-[11px] text-white/40">
              {t.chat.privacy}{" "}
              <Link href={`/${lang}/privacy`} className="underline">
                {t.footer.privacy}
              </Link>
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder={t.chat.placeholder}
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-ink-950 px-4 py-2 text-sm text-white placeholder:text-white/35 focus:border-gold focus:outline-none"
              />
              <button type="submit" disabled={loading || !input.trim()} className="btn-primary !px-4 !py-2 text-sm disabled:opacity-50">
                {t.chat.send}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          if (!open) track("chat_open");
          setOpen((o) => !o);
        }}
        aria-label={t.chat.title}
        aria-expanded={open}
        className="fixed bottom-20 end-5 z-50 grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-ink-900 text-gold shadow-[0_8px_30px_rgba(217,181,107,0.25)] transition hover:scale-105"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
          <path d="M9 11h.01M12 11h.01M15 11h.01" />
        </svg>
      </button>
    </>
  );
}
