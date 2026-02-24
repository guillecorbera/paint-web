// src/components/Services.jsx
import { useContext, useState, useEffect } from "react";
import { LangContext } from "../context/LangContext";
import { fetchServices } from "../utils/api";
import React from "react";

const Services = () => {
  const { t, lang } = useContext(LangContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await fetchServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError(err && err.message ? err.message : "Error loading services");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <section
        id="services"
        className="py-24 bg-gradient-to-b from-red-50 to-orange-50"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-600">Cargando servicios...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="services"
        className="py-24 bg-gradient-to-b from-red-50 to-orange-50"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-red-600">{error}</p>
          <div className="mt-4">
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchServices()
                  .then((data) => setServices(data))
                  .catch((err) =>
                    setError(
                      err && err.message
                        ? err.message
                        : "Error loading services",
                    ),
                  )
                  .finally(() => setLoading(false));
              }}
              className="mt-2 inline-block px-4 py-2 bg-primary-light text-white rounded-lg"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    /*     <section id="services" className="py-24 bg-gray-50 dark:bg-gray-800">
     */ <section
      id="services"
      className="py-24 bg-gradient-to-b from-red-50 to-orange-50"
    >
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
                  <span className="text-sm text-secondary-light dark:text-secondary-dark font-medium">
                    ✔️ {t.services.included || "Incluye limpieza"}
                  </span>
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
