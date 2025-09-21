// src/components/DeveloperModal.jsx
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import React from 'react'; // ✅ Añade esta línea


const DeveloperModal = ({ isOpen, onClose }) => {
  const { t } = useContext(LangContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Evita scroll en body cuando modal abierto
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsVisible(true), 10);
    } else {
      document.body.style.overflow = '';
      setIsVisible(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Botón cerrar (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center"
          aria-label="Cerrar modal"
        >
          ×
        </button>

        {/* Contenido */}
        <div className="text-center pt-6 px-6 pb-4">
          {/* Foto */}
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&rounded=true"
            alt="Guillermo Martínez"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-light"
          />

          {/* Nombre */}
          <h3 className="text-2xl font-bold text-primary-light dark:text-white">
            Guillermo Martínez
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">Full Stack Developer</p>

          {/* Contacto */}
          <div className="space-y-3 text-left max-w-xs mx-auto mb-6">
            <p><strong>Teléfono:</strong> <a href="tel:+5491112345678" className="text-secondary-light hover:underline">{t.footer?.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:guille.mtz@example.com" className="text-secondary-light hover:underline">{t.footer?.email}</a></p>
            <p>
              <strong>{t.footer?.whatsapp}:</strong>{' '}
              <a
                href="https://wa.me/5491112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                Enviar mensaje
              </a>
            </p>
          </div>

          {/* Bio */}
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed px-4 mb-6">
            {t.footer?.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperModal;