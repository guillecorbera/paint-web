// src/components/Services.jsx
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import React from 'react'; // ✅ Añade esta línea


const Services = () => {
  const { t, lang } = useContext(LangContext);

  const services = [
    {
      title: {
        es: 'Pintura Interior',
        ca: 'Pintura Interior',
        en: 'Interior Painting'
      },
      description: {
        es: 'Renueva tus paredes, techos y molduras con acabados impecables y sin polvo.',
        ca: 'Renova les teves parets, sostres i motllures amb acabats impecables i sense pols.',
        en: 'Refresh your walls, ceilings, and trim with dust-free, flawless finishes.'
      },
      price: {
        es: 'Desde €80/día',
        ca: 'Des de 80€/dia',
        en: 'From €80/day'
      },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: {
        es: 'Pintura Exterior & Fachadas',
        ca: 'Pintura Exterior i Façanes',
        en: 'Exterior & Facade Painting'
      },
      description: {
        es: 'Protege y embellece tu propiedad con pinturas resistentes a la intemperie y UV.',
        ca: 'Protegeix i embelleix la teva propietat amb pintures resistents a l’atmosfera i UV.',
        en: 'Protect and beautify your property with weather and UV-resistant paints.'
      },
      price: {
        es: 'Desde €120/día',
        ca: 'Des de 120€/dia',
        en: 'From €120/day'
      },
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: {
        es: 'Edificios Comerciales',
        ca: 'Edificis Comercials',
        en: 'Commercial Buildings'
      },
      description: {
        es: 'Soluciones profesionales para oficinas, tiendas y espacios públicos con mínima interrupción.',
        ca: 'Solucions professionals per a oficines, botigues i espais públics amb mínima interrupció.',
        en: 'Professional solutions for offices, stores, and public spaces with minimal disruption.'
      },
      price: {
        es: 'Presupuesto personalizado',
        ca: 'Pressupost personalitzat',
        en: 'Custom quote'
      },
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
/*     <section id="services" className="py-24 bg-gray-50 dark:bg-gray-800">
 */    <section id="services" className="py-24 bg-gradient-to-b from-red-50 to-orange-50">

      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-light dark:text-primary-dark">
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.services.desc}
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden flex flex-col group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Imagen del servicio */}
              <div className="overflow-hidden h-64">
                <img
                  src={service.image}
                  alt={service.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Contenido */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold font-display text-primary-light dark:text-white mb-2">
                  {service.title[lang]}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 font-semibold">
                  {service.price[lang]}
                </p>
                <p className="text-gray-600 dark:text-gray-300 flex-grow mb-6">
                  {service.description[lang]}
                </p>

                {/* CTA */}
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm text-secondary-light dark:text-secondary-dark font-medium">✔️ {t.services.included || 'Incluye limpieza'}</span>
                  <a
                    href="#contact"
                    className="font-semibold text-primary-light hover:text-secondary-light dark:text-primary-dark dark:hover:text-secondary-dark transition-colors duration-300"
                  >
                    {t.hero.btn2} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;