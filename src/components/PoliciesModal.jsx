// src/components/PoliciesModal.jsx

import React from 'react'; // ✅ Añade esta línea


// src/components/PoliciesModal.jsx
const PoliciesModal = ({ isOpen, onClose, title, body }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>

      {/* Contenedor del modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
        {/* Botón cerrar (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white w-8 h-8 flex items-center justify-center"
          aria-label="Cerrar modal"
        >
          ×
        </button>

        {/* Título */}
        <h3 className="text-2xl font-bold text-primary-light dark:text-white mb-5 mt-4 text-center">
          {title}
        </h3>

        {/* Cuerpo del contenido */}
 {/* Contenido con HTML */}
        <div
          className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-justify"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
};

export default PoliciesModal;