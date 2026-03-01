// src/components/WhyUs.jsx
import { useContext } from "react";
import { LangContext } from "../context/LangContext";

import React from "react"; // ✅ Añade esta línea

const WhyUs = () => {
  const { t, lang } = useContext(LangContext);

  // Definimos los beneficios según idioma
  const features = [
    {
      title: {
        es: "Acabados Impecables",
        ca: "Acabats Impeccables",
        en: "Flawless Finishes",
      },
      description: {
        es: "Utilizamos técnicas profesionales y productos de alta gama para lograr una aplicación uniforme y duradera.",
        ca: "Fem servir tècniques professionals i productes d'alta gamma per assolir una aplicació uniforme i duradora.",
        en: "We use professional techniques and premium products to achieve a uniform, long-lasting finish.",
      },
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-16 h-16 text-primary-light dark:text-primary-dark"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12l2 2l4-4"
          />
        </svg>
      ),
    },
    {
      title: {
        es: "Limpieza Incluida",
        ca: "Neteja Inclòs",
        en: "Clean-Up Included",
      },
      description: {
        es: "No dejamos rastro. Nos encargamos de proteger tus muebles, limpiar después y devolver todo tal como estaba.",
        ca: "No deixem cap rastre. Ens encarreguem de protegir els mobles, netejar després i tornar-ho tot com estava.",
        en: "We leave no trace. We protect your furniture, clean up after, and return everything exactly as it was.",
      },
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-16 h-16 text-orange-500 dark:text-orange-400"
        >
          <title>clean</title>
          <rect
            x="20"
            y="18"
            width="6"
            height="2"
            transform="translate(46 38) rotate(-180)"
          />
          <rect
            x="24"
            y="26"
            width="6"
            height="2"
            transform="translate(54 54) rotate(-180)"
          />
          <rect
            x="22"
            y="22"
            width="6"
            height="2"
            transform="translate(50 46) rotate(-180)"
          />
          <path d="M17.0029,20a4.8952,4.8952,0,0,0-2.4044-4.1729L22,3,20.2691,2,12.6933,15.126A5.6988,5.6988,0,0,0,7.45,16.6289C3.7064,20.24,3.9963,28.6821,4.01,29.04a1,1,0,0,0,1,.96H20.0012a1,1,0,0,0,.6-1.8C17.0615,25.5439,17.0029,20.0537,17.0029,20ZM11.93,16.9971A3.11,3.11,0,0,1,15.0041,20c0,.0381.0019.208.0168.4688L9.1215,17.8452A3.8,3.8,0,0,1,11.93,16.9971ZM15.4494,28A5.2,5.2,0,0,1,14,25H12a6.4993,6.4993,0,0,0,.9684,3H10.7451A16.6166,16.6166,0,0,1,10,24H8a17.3424,17.3424,0,0,0,.6652,4H6c.031-1.8364.29-5.8921,1.8027-8.5527l7.533,3.35A13.0253,13.0253,0,0,0,17.5968,28Z" />
        </svg>
      ),
    },
    {
      title: {
        es: "Profesionales Certificados",
        ca: "Professionals Certificats",
        en: "Certified Professionals",
      },
      description: {
        es: "Nuestro equipo está formado por pintores con años de experiencia y certificaciones en seguridad y calidad.",
        ca: "El nostre equip està format per pintors amb anys d’experiència i certificacions en seguretat i qualitat.",
        en: "Our team consists of painters with years of experience and certifications in safety and quality.",
      },
      icon: (
        <svg
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-orange-500 dark:text-orange-400 hover:text-orange-600 transition-colors duration-300"
        >
          {/* Fondo del documento */}
          <polygon points="102.4,0 102.4,25.6 435.2,25.6 435.2,409.6 460.8,409.6 460.8,0" />

          {/* Líneas de texto */}
          <rect x="153.6" y="128" width="153.6" height="25.6" />
          <rect x="102.4" y="179.2" width="256" height="25.6" />
          <rect x="102.4" y="230.4" width="179.2" height="25.6" />

          {/* Esquina superior derecha con doblez (efecto de hoja) */}
          <path d="M384,51.2H76.8H51.2v25.6v358.4v25.6h25.6h153.6v25.6c0,8.875,4.591,17.109,12.143,21.777C246.647,510.72,251.324,512,256,512c3.908,0,7.834-0.896,11.443-2.705l14.157-7.074l14.148,7.074c3.618,1.809,7.535,2.705,11.452,2.705c4.685,0,9.353-1.28,13.457-3.823c7.552-4.668,12.143-12.902,12.143-21.777v-25.6H384h25.6v-25.6V76.8V51.2H384z M307.2,486.4l-25.6-12.8L256,486.4v-30.319c8.047,2.867,16.58,4.719,25.6,4.719c9.02,0,17.553-1.852,25.6-4.719V486.4z M281.6,435.2c-28.279,0-51.2-22.921-51.2-51.2c0-28.279,22.921-51.2,51.2-51.2c28.279,0,51.2,22.921,51.2,51.2C332.8,412.279,309.879,435.2,281.6,435.2z M384,435.2h-45.577c12.279-13.619,19.977-31.462,19.977-51.2c0-42.351-34.449-76.8-76.8-76.8s-76.8,34.449-76.8,76.8c0,19.738,7.697,37.581,19.977,51.2H76.8V76.8H384V435.2z" />
        </svg>
      ),
    },
  ];

  return (
    /*     <section id="why-us" className="py-24 bg-gray-50 dark:bg-gray-800/50"> */
    <section
      id="why-us"
      className="py-24 bg-gradient-to-b from-orange-50 to-yellow-50"
    >
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16 px-4" data-aos="fade-down">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white">
            {t.whyUs.title}
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* Grid de Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 text-center px-4 sm:px-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 transition-transform duration-300 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Icono */}
              <div className="text-secondary w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-white dark:bg-gray-700 rounded-full shadow-lg">
                {feature.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl md:text-2xl font-bold font-display text-gray-800 dark:text-white mb-3">
                {feature.title[lang]}
              </h3>

              {/* Descripción */}
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
