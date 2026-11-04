"use client";

import { createContext, useContext } from "react";
import { DICT, type Dict, type Lang } from "./dictionary";

type Ctx = { lang: Lang; t: Dict; rtl: boolean };
const LangContext = createContext<Ctx | null>(null);

// The language comes from the URL (/en, /fr, /ar), so every language has its own indexable page.
export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={{ lang, t: DICT[lang], rtl: lang === "ar" }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
