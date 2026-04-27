import { createContext, useContext, useState, ReactNode } from "react";
import { Lang } from "../types";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, fr: string) => string;
}

const LangContext = createContext<LangContextType>({} as LangContextType);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  const t = (en: string, fr: string) => (lang === "en" ? en : fr);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
