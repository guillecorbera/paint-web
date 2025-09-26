// src/components/Partners.jsx
import React from 'react'; // ✅ Añade esta línea
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';

const Partners = () => {
  const { t } = useContext(LangContext);

  // Marcas reales de pintura
  const brands = [
    { name: 'Dulux', color: 'bg-red-600' },
    { name: 'Sikkens', color: 'bg-blue-700' },
    { name: 'Colortrend', color: 'bg-green-600' },
    { name: 'Valspar', color: 'bg-purple-600' },
    { name: 'Benjamin Moore', color: 'bg-indigo-700' },
    { name: 'Farrow & Ball', color: 'bg-pink-600' },
    { name: 'Sherwin-Williams', color: 'bg-orange-600' }
  ];

  return (
/*     <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden"> */
    <section className="py-24 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-lg font-semibold text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-12">
          {t.partners?.title || 'Trabajamos con las Mejores Marcas'}
        </h3>

        {/* Carrusel infinito */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll">
            {/* Primer conjunto de marcas */}
            {brands.map((brand, index) => (
              <div
                key={`brand-${index}`}
                className={`flex-shrink-0 ${brand.color} text-white font-bold px-8 py-3 rounded-lg shadow-md min-w-[180px] mx-5 text-center hover:scale-105 transition-transform`}
              >
                {brand.name}
              </div>
            ))}

            {/* Duplicado para bucle infinito */}
            {brands.map((brand, index) => (
              <div
                key={`brand-dup-${index}`}
                className={`flex-shrink-0 ${brand.color} text-white font-bold px-8 py-3 rounded-lg shadow-md min-w-[180px] mx-5 text-center hover:scale-105 transition-transform`}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;