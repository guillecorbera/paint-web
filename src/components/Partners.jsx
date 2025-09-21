// src/components/Partners.jsx
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import React from 'react'; // ✅ Añade esta línea

const Partners = () => {
  const { t, lang } = useContext(LangContext);

// console.log('t:', t);     // Objeto con blog, hero, etc.
 //console.log('lang:', lang); // Debe ser 'es', 'ca' o 'en'

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
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-lg font-semibold text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-12">
          {t.partners?.title || 'Trabajamos con las Mejores Marcas'}
        </h3>

        <div className="scroller w-full overflow-hidden">
          <div className="scroller-inner flex animate-scroll">
            {/* Primera fila */}
 {/*            <div className="flex items-center space-x-20 px-10">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className={`${brand.color} text-white font-bold px-8 py-3 rounded-lg shadow-md min-w-[180px] text-center hover:scale-105 transition-transform`}
                >
                  {brand.name}
                </div>
              ))}
            </div> */}
            {/* Duplicado para scroll infinito */}
{/*             <div className="flex items-center space-x-20 px-10" aria-hidden="true">
              {brands.map((brand, index) => (
                <div
                  key={`dup-${index}`}
                  className={`${brand.color} text-white font-bold px-8 py-3 rounded-lg shadow-md min-w-[180px] text-center hover:scale-105 transition-transform`}
                >
                  {brand.name}
                </div>
              ))}
            </div> */}


{/* <div className="py-16 bg-white">
  <h3 className="text-center text-lg font-semibold text-gray-400 tracking-widest uppercase mb-12">
    En la Empresa de los Mejores
  </h3>
 */}
  {/* Contenedor principal con overflow */}

{/*   <div className="scroller w-full overflow-hidden">
    <div className="scroller-inner flex animate-scroll"> */}
      {/* Primer conjunto de marcas */}
{/*       {brands.map((brand, index) => (
        <div
          key={`brand-${index}`}
          className={`flex-shrink-0 ${brand.color} text-white font-bold px-8 py-3 rounded-lg shadow-md min-w-[180px] text-center mx-5`}
        >
          {brand.name}
        </div>
      ))}
 */}
      {/* Segundo conjunto (duplicado para bucle infinito) */}
      {/* {brands.map((brand, index) => (
        <div
          key={`brand-dup-${index}`}
          className={`flex-shrink-0 ${brand.color} text-white font-bold px-8 py-3 rounded-lg shadow-md min-w-[180px] text-center mx-5`}
        >
          {brand.name}
        </div>
      ))} */}
    {/* </div>
 */}  </div>
</div>




  {/* Contenedor principal con scroll infinito */}
  <div className="flex animate-scroll ">
    {/* Primer conjunto */}
    {brands.map((brand, index) => (
      <div
        key={`brand-${index}`}
        className={`${brand.color} text-white font-bold px-8 py-3 rounded-lg shadow-md min-w-[180px] mx-5 text-center hover:scale-105 transition-transform`}
      >
        {brand.name}
      </div>
    ))}

    {/* Segundo conjunto (copia exacta para bucle infinito) */}
    {brands.map((brand, index) => (
      <div
        key={`brand-dup-${index}`}
        className={`${brand.color} text-white font-bold px-8 py-3 rounded-lg shadow-md min-w-[180px] mx-5 text-center hover:scale-105 transition-transform`}
      >
        {brand.name}
      </div>
    ))}
  </div>





      </div>
    </section>
  );
};

export default Partners;