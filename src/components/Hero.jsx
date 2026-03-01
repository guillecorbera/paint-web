// src/components/Hero.jsx
import { useContext } from "react";
import { LangContext } from "../context/LangContext";
import React from "react"; // ✅ Añade esta línea

const Hero = () => {
  const { t } = useContext(LangContext);

  return (
    <section
      id="home"
      className="h-screen bg-cover bg-center bg-no-repeat flex items-center hero-bg"
    >
      <div
        className="container mx-auto px-4 sm:px-6 text-center"
        data-aos="fade-up"
      >
        {/* Tagline */}
        <p className="text-xs sm:text-lg md:text-xl mb-4 font-semibold tracking-widest text-secondary">
          {t.hero.tagline}
        </p>

        {/* Título principal - grande, esbelto y con Poppins */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-thin mb-4 sm:mb-6 leading-tight text-white drop-shadow-lg font-display">
          {t.hero.title}
        </h1>

        {/* Subtítulo */}
        <p className="text-sm sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-200 px-2">
          {t.hero.subtitle}
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
          <a
            href="#services"
            className="bg-primary hover:bg-accent text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base w-full sm:w-auto"
          >
            {t.hero.btn1}
          </a>
          <a
            href="#contact"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base w-full sm:w-auto"
          >
            {t.hero.btn2}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
