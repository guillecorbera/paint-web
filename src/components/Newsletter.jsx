// src/components/Newsletter.jsx
import { useContext } from "react";
import { LangContext } from "../context/LangContext";

import React from "react"; // ✅ Añade esta línea

const Newsletter = () => {
  const { t } = useContext(LangContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t.newsletter.success || "¡Gracias por suscribirte!");
    e.target.reset();
  };

  return (
    /*     <section className="py-24 bg-gray-50 dark:bg-gray-800/50"> */
    <section className="py-16 sm:py-24 bg-gradient-to-b from-teal-50 to-blue-50 px-4 sm:px-0">
      <div className="container mx-auto">
        <div
          className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 sm:p-10 md:p-16 text-center"
          data-aos="fade-up"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-primary dark:text-white">
            {t.newsletter.title}
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.newsletter.subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-xl mx-auto px-2 sm:px-0"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition text-gray-800 dark:text-white text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-yellow-500 text-primary-content font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-transform hover:scale-105 duration-300 shadow-lg whitespace-nowrap text-sm sm:text-base"
              >
                {t.newsletter.button}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
