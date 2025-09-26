// src/components/BlogPreview.jsx
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import React from 'react'; // ✅ Añade esta línea

const BlogPreview = () => {

const { t, lang } = useContext(LangContext);

  const posts = [
    {
      title: {
        es: 'Cómo Elegir el Color Perfecto para Cada Habitación',
        ca: 'Com Triar el Color Perfecte per a Cada Habitació',
        en: 'How to Choose the Perfect Color for Every Room'
      },
      excerpt: {
        es: 'Guía práctica para seleccionar tonos que mejoren el ambiente, la luz y el uso de cada espacio.',
        ca: 'Guia pràctica per triar tons que millorin l’ambient, la llum i l’ús de cada espai.',
        en: 'A practical guide to choosing colors that enhance mood, light, and function in every room.'
      },
      category: {
        es: 'CONSEJOS',
        ca: 'CONSELLS',
        en: 'TIPS'
      },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: {
        es: 'Pintura Ecológica: Beneficios para tu Hogar',
        ca: 'Pintura Ecològica: Beneficis per al Teu Habitatge',
        en: 'Eco-Friendly Paint: Benefits for Your Home'
      },
      excerpt: {
        es: 'Descubre por qué las pinturas bajas en VOC son mejores para tu salud y el medio ambiente.',
        ca: 'Descobreix per què les pintures baixes en COV són millors per a la teva salut i el medi ambient.',
        en: 'Discover why low-VOC paints are better for your health and the environment.'
      },
      category: {
        es: 'SOSTENIBILIDAD',
        ca: 'SOSTENIBILITAT',
        en: 'SUSTAINABILITY'
      },
      image: 'https://cdn.mos.cms.futurecdn.net/FbEqxqo75gYN4BJm4naEQk.jpg?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: {
        es: 'Tendencias 2025: Colores de Moda en Interiores',
        ca: 'Tendències 2025: Colors de Moda en interiors',
        en: '2025 Trends: Top Interior Color Trends'
      },
      excerpt: {
        es: 'Los nuevos tonos neutros, atrevidos y naturales que dominarán el diseño de interiores.',
        ca: 'Els nous tons neutres, atrevits i naturals que dominaran el disseny d’interiors.',
        en: 'The new neutral, bold, and natural tones dominating interior design trends.'
      },
      category: {
        es: 'TENDENCIAS',
        ca: 'TENDÈNCIES',
        en: 'TRENDS'
      },
      image: 'https://plus.unsplash.com/premium_photo-1671308540294-1ed401902b0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white">{t.blog?.title || 'Consejos & Tendencias'}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.blog?.subtitle || 'Ideas, guías y novedades para mantener tu hogar impecable.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.title[lang]}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-secondary font-semibold mb-2 uppercase tracking-wider">
                  {post.category[lang]}
                </p>
                <h3 className="text-xl font-bold font-display text-gray-800 dark:text-white mb-3 group-hover:text-secondary transition">
                  {post.title[lang]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {post.excerpt[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;