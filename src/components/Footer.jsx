// src/components/Footer.jsx
import { useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import DeveloperModal from './DeveloperModal';
import React from 'react'; // ✅ Añade esta línea

const Footer = () => {
  const { t } = useContext(LangContext);

  const [showModal, setShowModal] = useState(false);

  return (
    <footer className="bg-primary text-gray-300 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          
          {/* Columna: Sobre nosotros */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#home" className="text-4xl font-display font-bold text-white block mb-4">
              PinturasPro
            </a>
            <p className=" max-w-xs">
              {t.footer.about}
            </p>
          </div>

          {/* Columna: Explorar */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              {t.footer.explore}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="hover:text-secondary transition duration-300">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-secondary transition duration-300">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-secondary transition duration-300">
                  {t.nav.blog}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna: Empresa */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              {t.footer.company}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-secondary transition duration-300">
                  {t.footer.links.about}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition duration-300">
                  {t.footer.links.press}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition duration-300">
                  {t.footer.links.careers}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna: Redes sociales */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              {t.footer.connect}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/pinturaspro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://facebook.com/pinturaspro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

{/* Copyright */}
<div className="mt-12 border-t border-primary/50 pt-8 text-sm text-gray-400 text-center">
  <p className="flex flex-wrap items-center justify-center gap-1 text-sm md:text-base">
    {t.footer.copyright}{' '}
    <span className="hidden md:inline">|</span>
    <button
      type="button"
      onClick={() => setShowModal(true)}
      className="text-secondary-light hover:text-amber-500 transition-colors duration-300 font-medium cursor-pointer"
    >
      {t.footer?.webDesign || 'Diseño Web'}
    </button>
  </p>

  {/* Modal */}
  <DeveloperModal isOpen={showModal} onClose={() => setShowModal(false)} />
</div>
      </div>
    </footer>
  );
};

export default Footer;