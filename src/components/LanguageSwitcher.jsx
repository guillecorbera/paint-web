// src/components/LanguageSwitcher.jsx
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';

import React from 'react'; // ✅ Añade esta línea

// Importa las imágenes
import esFlag from '../assets/images/es.png';
import caFlag from '../assets/images/ca.png';
import enFlag from '../assets/images/en.png';

const LanguageSwitcher = ({ small }) => {
  const { lang, setLang } = useContext(LangContext);

  const flags = {
    es: { src: esFlag, label: 'Castellano' },
    ca: { src: caFlag, label: 'Català' },
    en: { src: enFlag, label: 'English' },
  };

  const flagStyle = small
    ? 'w-6 h-4 object-cover rounded'
    : 'w-8 h-5 object-cover rounded';

  return (
 <div className={`flex rounded-full ${small ? 'w-20' : 'w-32'}`}>
  {Object.keys(flags).map((lng) => (
    <button
      key={lng}
      onClick={() => setLang(lng)}
      className={`relative group p-1 transition
      ${lang === lng ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
      aria-label={flags[lng].label}
    >
      {/* Bandera */}
      <img
        src={flags[lng].src}
        alt={flags[lng].label}
        className={flagStyle}
      />

      {/* Tooltip */}
      <span className="
  absolute top-full mt-2 left-1/2 -translate-x-1/2
  whitespace-nowrap px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700
  rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible
  transition-all duration-200 ease-in-out z-50 pointer-events-none
  before:content-[''] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2
  before:border-4 before:border-b-gray-900 dark:before:border-b-gray-700 before:border-transparent
">
        {flags[lng].label}
      </span>
    </button>
  ))}
</div>

  );
};

export default LanguageSwitcher;