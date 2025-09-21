import { createContext, useState } from 'react';
import { translations } from '../data/data-lang';
import React from 'react'; // ✅ Añade esta línea

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('es');
  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};