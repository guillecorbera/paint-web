// src/components/Footer.jsx
import { useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import DeveloperModal from './DeveloperModal';
import PoliciesModal from './PoliciesModal';

import React from 'react'; // ✅ Añade esta línea



const Footer = () => {
  const { t } = useContext(LangContext);

  // Modal del desarrollador
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);

  // Modal de políticas
  const [showPoliciesModal, setShowPoliciesModal] = useState(false);
  const [policiesModalContent, setPoliciesModalContent] = useState({ title: '', body: '' });

  // Abrir modal de políticas
  const openPoliciesModal = (type) => {
    if (!t.footer?.modal?.[type]) return;
    setPoliciesModalContent({
      title: t.footer.modal[type].title,
      body: t.footer.modal[type].body
    });
    setShowPoliciesModal(true);
  };

  return (
    <footer className="bg-primary text-gray-300 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          
          {/* Columna: Sobre nosotros */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#home" className="text-4xl font-display font-bold text-white block mb-4">
              Cantero Sanchez Consultores S.L.
            </a>
            <p className="max-w-xs">
              {t.footer.about}
            </p>
          </div>

          {/* Columna: Explorar */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              {t.footer.explore}
            </h3>
            <ul className="space-y-3">
              <li><a href="#services" className="hover:text-secondary-light transition duration-300">{t.nav.services}</a></li>
              <li><a href="#gallery" className="hover:text-secondary-light transition duration-300">{t.nav.gallery}</a></li>
              <li><a href="#blog" className="hover:text-secondary-light transition duration-300">{t.nav.blog}</a></li>
            </ul>
          </div>

          {/* Columna: Empresa */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              {t.footer.company}
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-secondary-light transition duration-300">{t.footer.links.about}</a></li>
              <li><a href="#" className="hover:text-secondary-light transition duration-300">{t.footer.links.press}</a></li>
              <li><a href="#" className="hover:text-secondary-light transition duration-300">{t.footer.links.careers}</a></li>
            </ul>
          </div>

          {/* NUEVA COLUMNA: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              {t.footer.legal}
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => openPoliciesModal('legalNotice')}
                  className="text-gray-300 hover:text-amber-500 transition duration-300 text-left w-full"
                >
                  {t.footer.links.legalNotice}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPoliciesModal('privacyPolicy')}
                  className="text-gray-300 hover:text-amber-500 transition duration-300 text-left w-full"
                >
                  {t.footer.links.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPoliciesModal('cookiesPolicy')}
                  className="text-gray-300 hover:text-amber-500 transition duration-300 text-left w-full"
                >
                  {t.footer.links.cookiesPolicy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPoliciesModal('termsConditions')}
                  className="text-gray-300 hover:text-amber-500 transition duration-300 text-left w-full"
                >
                  {t.footer.links.termsConditions}
                </button>
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
                className="text-gray-300 hover:text-amber-500 transition duration-300"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://facebook.com/pinturaspro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition duration-300"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook text-2xl"></i>
              </a>

  
            </div>
          </div>
        </div>

        {/* Copyright + Diseño Web */}
        <div className="mt-12 border-t border-primary/50 pt-8 text-sm text-gray-400 text-center">
          <p className="flex flex-wrap items-center justify-center gap-1 text-sm md:text-base">
            {t.footer.copyright}{' '}
            <span className="hidden md:inline">|</span>
            <button
              type="button"
              onClick={() => setShowDeveloperModal(true)}
              className="text-secondary-light hover:text-amber-500 transition-colors duration-300 font-medium cursor-pointer"
            >
              {t.footer?.webDesign || 'Diseño Web'}
            </button>
          </p>
        </div>
      </div>

      {/* Modales */}
      <DeveloperModal 
        isOpen={showDeveloperModal} 
        onClose={() => setShowDeveloperModal(false)} 
      />

      <PoliciesModal 
        isOpen={showPoliciesModal} 
        onClose={() => setShowPoliciesModal(false)} 
        title={policiesModalContent.title}
        body={policiesModalContent.body}
      />
    </footer>
  );
};

export default Footer;