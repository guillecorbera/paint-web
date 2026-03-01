// src/components/Partners.jsx
import React from "react"; // ✅ Añade esta línea
import { useContext } from "react";
import { LangContext } from "../context/LangContext";

const Partners = () => {
  const { t } = useContext(LangContext);

  // Marcas reales de pintura
  const brands = [
    { name: "Dulux", color: "bg-red-600" },
    { name: "Sikkens", color: "bg-blue-700" },
    { name: "Colortrend", color: "bg-green-600" },
    { name: "Valspar", color: "bg-purple-600" },
    { name: "Benjamin Moore", color: "bg-indigo-700" },
    { name: "Farrow & Ball", color: "bg-pink-600" },
    { name: "Sherwin-Williams", color: "bg-orange-600" },
  ];

  return (
    /*     <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden"> */
    <section className="py-16 sm:py-24 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden px-4 sm:px-0">
      <div className="container mx-auto">
        <h3 className="text-center text-sm sm:text-lg font-semibold text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-8 sm:mb-12 px-2">
          {t.partners?.title || "Trabajamos con las Mejores Marcas"}
        </h3>

        {/* Carrusel infinito */}
        <div className="overflow-hidden">
          <div
            className="flex animate-scroll-smooth"
            style={{
              gap: "12px",
              width: "fit-content",
            }}
          >
            {/* Primer conjunto de marcas */}
            {brands.map((brand, index) => (
              <div
                key={`brand-${index}`}
                className={`flex-shrink-0 ${brand.color} text-white font-bold px-4 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md text-center hover:scale-105 transition-transform text-sm sm:text-base`}
                style={{ width: "130px", minWidth: "130px" }}
              >
                {brand.name}
              </div>
            ))}

            {/* Duplicado para bucle infinito */}
            {brands.map((brand, index) => (
              <div
                key={`brand-dup-${index}`}
                className={`flex-shrink-0 ${brand.color} text-white font-bold px-4 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md text-center hover:scale-105 transition-transform text-sm sm:text-base`}
                style={{ width: "130px", minWidth: "130px" }}
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
