// src/components/Gallery.jsx
import { useState, useContext, useEffect } from "react";
import { LangContext } from "../context/LangContext";

import React from "react"; // ✅ Añade esta línea

const Gallery = () => {
  const { t, lang } = useContext(LangContext);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // Estado para proyectos mezclados aleatoriamente
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para mezclar array (algoritmo Fisher-Yates)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Cargar proyectos desde JSON
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/gallery.json");
        if (!response.ok) throw new Error("Error al cargar la galería");
        const data = await response.json();
        setProjects(shuffleArray(data));
      } catch (error) {
        console.error("Error cargando galería:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const openLightbox = (index, phase = "after") => {
    setCurrentImageIndex(index);
    setSelectedView(phase);
    setCurrentPhaseIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1,
    );
  };

  const [selectedView, setSelectedView] = useState("after"); // 'before', 'inProgress' o 'after'

  // Obtener imágenes actuales según la fase seleccionada
  const getCurrentImages = () => {
    if (!projects[currentImageIndex]) return [];
    return projects[currentImageIndex][selectedView] || [];
  };

  // Navegar entre imágenes de la misma fase
  const goToPreviousPhaseImage = () => {
    const images = getCurrentImages();
    setCurrentPhaseIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextPhaseImage = () => {
    const images = getCurrentImages();
    setCurrentPhaseIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <section
        id="gallery"
        className="py-24 bg-gradient-to-b from-yellow-50 to-green-50"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-600">Cargando galería...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-b from-yellow-50 to-green-50"
    >
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white">
            {t.gallery.title}
          </h2>
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
                src={project.after && project.after[0]}
                alt={`Después - ${project.title[t.lang] || project.title.es}`}
                className="w-full h-auto object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                onClick={() => openLightbox(index, "after")}
              />
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded">
                {t.gallery?.after}
              </div>
              <button
                onClick={() => openLightbox(index, "before")}
                className="absolute bottom-3 right-3 bg-secondary hover:bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md transition"
              >
                {t.gallery?.before || "Antes"}
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

          {/* Imagen Actual */}
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            {getCurrentImages().length > 0 && (
              <img
                id="lightbox-img"
                src={getCurrentImages()[currentPhaseIndex]}
                alt={`${selectedView} - ${projects[currentImageIndex].title[lang] || projects[currentImageIndex].title.es}`}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
            )}

            {/* Navegación entre imágenes de la misma fase */}
            {getCurrentImages().length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousPhaseImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-secondary/80 text-white p-2 rounded-full hover:bg-secondary transition"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextPhaseImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary/80 text-white p-2 rounded-full hover:bg-secondary transition"
                >
                  ›
                </button>
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                  {currentPhaseIndex + 1} / {getCurrentImages().length}
                </div>
              </>
            )}

            {/* Botones Cambiar Fase */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {projects[currentImageIndex]?.before?.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedView("before");
                    setCurrentPhaseIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedView === "before"
                      ? "bg-secondary text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {t.gallery?.before || "Antes"}
                </button>
              )}
              {projects[currentImageIndex]?.inProgress?.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedView("inProgress");
                    setCurrentPhaseIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedView === "inProgress"
                      ? "bg-secondary text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {t.gallery?.inProgress || "En Proceso"}
                </button>
              )}
              {projects[currentImageIndex]?.after?.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedView("after");
                    setCurrentPhaseIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedView === "after"
                      ? "bg-secondary text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {t.gallery?.after || "Después"}
                </button>
              )}
            </div>

            {/* Título del proyecto */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm bg-black/50 text-white text-center px-4 py-2 rounded-full max-w-xs truncate">
              {projects[currentImageIndex].title[lang] ||
                projects[currentImageIndex].title.es}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
