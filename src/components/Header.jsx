// src/components/Header.jsx
import { useState, useEffect, useContext, useRef } from "react";
import { LangContext } from "../context/LangContext";
import { ThemeContext } from "../context/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

import React from "react"; // ✅ Añade esta línea

const Header = () => {
  const { t, lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();

  // Detectar scroll: si > 50px, activa isScrolled (para efectos visuales)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300); // Mostrar botón después de 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para volver al inicio suavemente
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cerrar menú móvil al hacer clic en un enlace
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header fijo con difuminado y sombra siempre activos */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl md:text-3xl font-display font-bold text-teal-600 dark:text-teal-400 truncate"
            onClick={closeMobileMenu}
          >
            <img
              src="/images/logo.png"
              alt="Logo de Cantero Sanchez Consultores S.L."
              className="h-10 sm:h-14 w-auto object-contain flex-shrink-0"
            />
            <span className="hidden sm:inline">
              CCS Consultores S.L.
            </span>
          </a>

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#home"
              className="nav-link text-lg font-medium text-secondary hover:text-secondary-inverted transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-secondary"
            >
              {t.nav.home}
            </a>
            <a
              href="#services"
              className="nav-link text-lg font-medium text-secondary  hover:text-secondary-inverted transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-secondary"
            >
              {t.nav.services}
            </a>
            <a
              href="#gallery"
              className="nav-link text-lg font-medium text-secondary hover:text-secondary-inverted transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-secondary"
            >
              {t.nav.gallery}
            </a>
            <a
              href="#blog"
              className="nav-link text-lg font-medium text-secondary hover:text-secondary-inverted transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-secondary"
            >
              {t.nav.blog}
            </a>
            <a
              href="#contact"
              className="bg-secondary hover:bg-yellow-500 text-primary-content font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow"
            >
              {t.nav.contact}
            </a>

            {/* Switchers */}
            <div className="flex items-center space-x-4 ml-6">
              {/*    <ThemeToggle />  */}
              <LanguageSwitcher />
            </div>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex items-center space-x-4 lg:hidden">
            {/*       <ThemeToggle small /> */}
            <LanguageSwitcher />
            <button
              id="mobile-menu-button"
              ref={buttonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 dark:text-gray-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Menú Móvil */}
        {!mobileMenuOpen ? null : (
          <div
            id="mobile-menu"
            ref={menuRef}
            className="lg:hidden bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-b-xl overflow-hidden backdrop-blur-md transition-all duration-300"
          >
            <ul className="flex flex-col items-center py-4 space-y-4">
              <li>
                <a
                  href="#home"
                  className="text-gray-800 dark:text-gray-200 hover:text-secondary font-medium mobile-nav-link p-3 w-full block text-center"
                  onClick={closeMobileMenu}
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-800 dark:text-gray-200 hover:text-secondary font-medium mobile-nav-link p-3 w-full block text-center"
                  onClick={closeMobileMenu}
                >
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-800 dark:text-gray-200 hover:text-secondary font-medium mobile-nav-link p-3 w-full block text-center"
                  onClick={closeMobileMenu}
                >
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-800 dark:text-gray-200 hover:text-secondary font-medium mobile-nav-link p-3 w-full block text-center"
                  onClick={closeMobileMenu}
                >
                  {t.nav.blog}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="bg-secondary hover:bg-yellow-500 text-primary-content font-semibold px-6 py-2 rounded-full transition-all duration-300 mobile-nav-link w-full max-w-xs text-center"
                  onClick={closeMobileMenu}
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Botón flotante "Volver arriba" */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-40 flex items-center justify-center focus:outline-none"
          aria-label="Volver al inicio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default Header;
