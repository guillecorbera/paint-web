// src/components/Testimonials.jsx
import { useState, useEffect, useContext } from "react";
import { LangContext } from "../context/LangContext";
import React from "react"; // ✅ Añade esta línea

const Testimonials = () => {
  const { t, lang } = useContext(LangContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Testimonios en los tres idiomas
  const testimonials = [
    {
      name: {
        es: "Laura & David Martínez",
        ca: "Laura i David Martínez",
        en: "Laura & David Martinez",
      },
      project: {
        es: "Pintura interior - Piso en Barcelona",
        ca: "Pintura interior - Pis a Barcelona",
        en: "Interior Painting - Apartment in Barcelona",
      },
      text: {
        es: "Transformaron nuestro piso antiguo en un espacio luminoso y moderno. El equipo fue puntual, limpio y profesional en todo momento. ¡No dejaron ni una gota!",
        ca: "Van transformar el nostre pis antic en un espai lluminós i modern. L’equip va ser puntual, net i professional en tot moment. ¡Ni una gota van deixar!",
        en: "They transformed our old apartment into a bright, modern space. The team was punctual, clean, and professional throughout. Not a single drop was left behind!",
      },
    },
    {
      name: {
        es: "Carlos Rodríguez",
        ca: "Carles Rodríguez",
        en: "Carlos Rodriguez",
      },
      project: {
        es: "Fachada comercial - Tienda en Barcelona",
        ca: "Façana comercial - Botiga a Barcelona",
        en: "Commercial Facade - Store in Barcelona",
      },
      text: {
        es: "Quedamos impresionados con el resultado. Usaron pintura resistente al clima y el acabado es perfecto. Recomendamos totalmente sus servicios.",
        ca: "Vam quedar impressionats amb el resultat. Van utilitzar pintura resistent al clima i l’acabat és perfecte. Recomanem totalment els seus serveis.",
        en: "We were impressed with the result. They used weather-resistant paint and the finish is flawless. We highly recommend their services.",
      },
    },
    {
      name: {
        es: "Elena Gómez",
        ca: "Elena Gómez",
        en: "Elena Gomez",
      },
      project: {
        es: "Renovación completa - Casa familiar en Barcelona",
        ca: "Renovació completa - Casa familiar a Barcelona",
        en: "Full Renovation - Family Home in Barcelona ",
      },
      text: {
        es: "Desde el primer contacto hasta la entrega, todo fue impecable. Saben escuchar y ofrecen soluciones creativas. ¡Mi casa nunca había lucido tan bien!",
        ca: "Des del primer contacte fins a l’entrega, tot va ser impecable. Saben escoltar i ofereixen solucions creatives. ¡La meva casa mai havia tingut tan bon aspecte!",
        en: "From the first contact to delivery, everything was flawless. They listen well and offer creative solutions. My home has never looked better!",
      },
    },
  ];

  const next = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = () => (
    <div className="flex text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  return (
    /*     <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-800/50"> */
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-green-50 to-teal-50"
    >
      <div className="container mx-auto px-6" data-aos="fade-up">
        {/* Encabezado */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-light dark:text-white">
            {t.testimonials?.title || "Nuestros Clientes Hablan"}
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.testimonials?.subtitle ||
              "Opiniones reales de personas que confiaron en nosotros"}
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
          <div
            className="overflow-hidden"
            onMouseEnter={() => clearInterval(window.testimonialInterval)}
            onMouseLeave={() => {
              window.testimonialInterval = setInterval(() => {
                setCurrentIndex((i) =>
                  i === testimonials.length - 1 ? 0 : i + 1,
                );
              }, 8000);
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="bg-white dark:bg-gray-700 p-6 sm:p-10 rounded-2xl shadow-lg text-center">
                    <img
                      src={`/images/testimonial${index + 1}.avif`}
                      alt={testimonial.name[lang] || "Cliente"}
                      className="w-16 sm:w-24 h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-6 border-4 border-secondary-light object-cover"
                    />

                    <div className="flex justify-center mb-4">
                      {renderStars()}
                    </div>

                    <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-200 italic mb-4 sm:mb-6 leading-relaxed">
                      "{testimonial.text[lang] || testimonial.text.es}"
                    </p>

                    <h4 className="font-bold text-lg sm:text-xl font-display text-primary-light dark:text-white">
                      {testimonial.name[lang] || testimonial.name.es}
                    </h4>
                    <p className="text-xs sm:text-sm text-secondary-light dark:text-yellow-400 font-medium">
                      {testimonial.project[lang] || testimonial.project.es}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute top-1/2 -left-12 -translate-y-1/2 bg-white dark:bg-gray-700 hover:bg-secondary-light hover:text-white text-primary-light dark:text-white p-3 rounded-full shadow-md transition z-10"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute top-1/2 -right-12 -translate-y-1/2 bg-white dark:bg-gray-700 hover:bg-secondary-light hover:text-white text-primary-light dark:text-white p-3 rounded-full shadow-md transition z-10"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Indicadores de progreso */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-secondary scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
