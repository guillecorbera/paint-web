// src/components/Gallery.jsx
import { useState, useContext } from 'react';
import { LangContext } from '../context/LangContext';

import React from 'react'; // ✅ Añade esta línea

const Gallery = () => {
  const { t } = useContext(LangContext);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Proyectos con imágenes "antes" y "después"
  const projects = [
    {
      before: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2070&auto=format&fit=crop',
      title: {
        es: 'Pintura interior - Piso en Barcelona',
        ca: 'Pintura interior - Pis a Barcelona',
        en: 'Interior Painting - Apartment in Barcelona'
      }
    },
    {
      before: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop',
      title: {
        es: 'Fachada comercial - Oficina en Madrid',
        ca: 'Façana comercial - Oficina a Madrid',
        en: 'Commercial Facade - Office in Madrid'
      }
    },
    {
      before: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=2071&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop',
      title: {
        es: 'Renovación completa - Casa familiar',
        ca: 'Renovació completa - Casa familiar',
        en: 'Full Renovation - Family Home'
      }
    },
    {
      before: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
      title: {
        es: 'Pintura decorativa - Salón moderno',
        ca: 'Pintura decorativa - Saló modern',
        en: 'Decorative Painting - Modern Living Room'
      }
    },
    {
      before: 'https://images.unsplash.com/photo-1539635556837-99ac94a94552?q=80&w=2070&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1974&auto=format&fit=crop',
      title: {
        es: 'Edificio residencial - Bloque de pisos',
        ca: 'Edifici residencial - Bloc de pisos',
        en: 'Residential Building - Apartment Block'
      }
    },
    {
      before: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      title: {
        es: 'Pintura exterior - Chalet en montaña',
        ca: 'Pintura exterior - Xalet a la muntanya',
        en: 'Exterior Painting - Mountain Chalet'
      }
    }
  ];

  const openLightbox = (index, isAfter = true) => {
    setCurrentImageIndex(index);
    setSelectedView(isAfter ? 'after' : 'before');
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const [selectedView, setSelectedView] = useState('after'); // 'before' o 'after'

  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white">{t.gallery.title}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Grid de Miniaturas */}
        <div className="columns-2 md:columns-3 gap-4 space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg mb-4"
              data-aos="zoom-in-up"
            >
              <img
                src={project.after}
                alt={`Después - ${project.title[t.lang]}`}
                className="w-full h-auto object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                onClick={() => openLightbox(index, true)}
              />
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded">
                {t.gallery?.after || 'Después'}
              </div>
              <button
                onClick={() => openLightbox(index, false)}
                className="absolute bottom-3 right-3 bg-secondary hover:bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md transition"
              >
                {t.gallery?.before || 'Antes'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          id="lightbox"
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          {/* Botón Cerrar */}
          <button
            id="lightbox-close"
            className="absolute top-6 right-6 text-white text-4xl opacity-70 hover:opacity-100 z-10"
            onClick={closeLightbox}
          >
            ×
          </button>

          {/* Navegación Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Navegación Siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Imagen Actual */}
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              id="lightbox-img"
              src={
                selectedView === 'after'
                  ? projects[currentImageIndex].after
                  : projects[currentImageIndex].before
              }
              alt={
                selectedView === 'after'
                  ? `Después - ${projects[currentImageIndex].title[t.lang]}`
                  : `Antes - ${projects[currentImageIndex].title[t.lang]}`
              }
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

            {/* Botón Cambiar Vista (Antes/D después) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedView(selectedView === 'after' ? 'before' : 'after');
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-secondary text-white font-medium px-4 py-2 rounded-full shadow-lg hover:bg-yellow-500 transition"
            >
              {selectedView === 'after'
                ? t.gallery?.before || 'Ver Antes'
                : t.gallery?.after || 'Ver Después'}
            </button>

            {/* Título del proyecto */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-center px-4 py-2 rounded-full text-sm max-w-xs truncate">
              {projects[currentImageIndex].title[t.lang]}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;