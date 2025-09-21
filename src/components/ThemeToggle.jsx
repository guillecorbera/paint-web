// src/components/ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LangContext } from '../context/LangContext';

import React from 'react'; // ✅ Añade esta línea

const ThemeToggle = ({ small }) => {
  const { lang, t } = useContext(LangContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Determinar texto del tooltip según el estado y el idioma
  const tooltipText = darkMode
    ? t.theme?.light || 'Light mode'  // Mostrará "Modo claro" (es), "Mode clar" (ca), etc.
    : t.theme?.dark || 'Dark mode';   // Mostrará "Modo oscuro", "Mode fosc", etc.


  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative group focus:outline-none focus:ring-0 border-none"
      aria-label={tooltipText}
    >
      {/* Icono */}
      <div
        className={`
          transition-colors duration-300 rounded-full flex items-center justify-center
          ${small ? 'p-1' : 'p-2'}
        `}
      >
        {darkMode ? (
          // 🌞 Sol (modo claro)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-amber-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 4.5a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm0 14a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm7.071-9.071a1 1 0 011.415 0h0a1 1 0 11-1.415 1.415h0a1 1 0 010-1.415zM4.929 16.485a1 1 0 011.415 0h0a1 1 0 11-1.415 1.415h0a1 1 0 010-1.415zM19.5 11a1 1 0 011 1h0a1 1 0 11-2 0h0a1 1 0 011-1zM4.5 11a1 1 0 011 1h0a1 1 0 11-2 0h0a1 1 0 011-1zm12.021 6.364a1 1 0 011.415 0h0a1 1 0 11-1.415 1.415h0a1 1 0 010-1.415zM6.05 6.05a1 1 0 011.415 0h0a1 1 0 11-1.415 1.415h0a1 1 0 010-1.415zM12 7a5 5 0 100 10 5 5 0 000-10z" />
          </svg>
        ) : (
          // 🌙 Luna (modo oscuro)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-amber-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        )}
      </div>

      {/* Tooltip - aparece arriba */}
      <span className="
  absolute top-full mt-2 left-1/2 -translate-x-1/2
  whitespace-nowrap px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700
  rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible
  transition-all duration-200 ease-in-out z-50 pointer-events-none
  before:content-[''] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2
  before:border-4 before:border-b-gray-900 dark:before:border-b-gray-700 before:border-transparent
">
        {tooltipText}
      </span>
    </button>
  );
};

export default ThemeToggle;