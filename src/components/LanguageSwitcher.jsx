// src/components/LanguageSwitcher.jsx
import { useContext }  from 'react';
import { LangContext } from '../context/LangContext';
import React from 'react';

const LanguageSwitcher = () => {
  const { lang, setLang } = useContext(LangContext);

  const languages = {
    es: { label: 'ESP', fullName: 'Castellano' },
    ca: { label: 'CAT', fullName: 'Català' },
    en: { label: 'ENG', fullName: 'English' },
  };

  return (
    <div className="flex items-center justify-center space-x-2 rounded-full bg-gray-200 dark:bg-gray-700 p-1">
      {Object.keys(languages).map((lng, index) => (
        <React.Fragment key={lng}>
          <button
            onClick={() => setLang(lng)}
            className={`
              px-3 py-1 text-sm font-semibold rounded-full transition-all duration-300
              ${lang === lng
                ? 'bg-blue-500 text-white scale-110 shadow-md'
                : 'text-gray-600 dark:text-gray-300 opacity-70 hover:opacity-100'
              }
            `}
            aria-label={`Cambiar a ${languages[lng].fullName}`}
          >
            {languages[lng].label}
          </button>
          {index < Object.keys(languages).length - 1 && (
            <span className="text-gray-300 dark:text-gray-500">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LanguageSwitcher;