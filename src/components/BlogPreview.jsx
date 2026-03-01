// src/components/BlogPreview.jsx
import { useContext, useState } from "react";
import { LangContext } from "../context/LangContext";
import React from "react";

const BlogPreview = () => {
  const { t, lang } = useContext(LangContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      title: {
        es: "Cómo Elegir el Color Perfecto para Cada Habitación",
        ca: "Com Triar el Color Perfecte per a Cada Habitació",
        en: "How to Choose the Perfect Color for Every Room",
      },
      excerpt: {
        es: "Guía práctica para seleccionar tonos que mejoren el ambiente, la luz y el uso de cada espacio.",
        ca: "Guia pràctica per triar tons que millorin l’ambient, la llum i l’ús de cada espai.",
        en: "A practical guide to choosing colors that enhance mood, light, and function in every room.",
      },
      content: {
        es: "Elegir el color perfecto para cada habitación no es solo cuestión de gusto personal, sino de cómo los colores afectan nuestra psicología y el espacio. Los tonos cálidos como beige y terracota crean intimidad, mientras que los azules y verdes favorecen la relajación. En cocinas y salas de estar, los tonos neutros con acentos vibrantes funcionan mejor. Considera siempre la iluminación natural de la habitación, ya que afecta cómo se ve el color. Nuestro equipo te ayudará a elegir la paleta perfecta para tu hogar.",
        ca: "Triar el color perfecte per a cada habitació no és només qüestió de gust personal, sinó de com els colors afecten la nostra psicologia i l'espai. Els tons càlids com beige i terracotta creen intimitat, mentre que els blaus i verds afavoreixen la relaxació. En cuines i sales d'estar, els tons neutres amb accents vibrants funcionen millor. Sempre considera la il·luminació natural de la habitació, ja que afecta com es veu el color. El nostre equip t'ajudarà a triar la paleta perfecta per al teu hogar.",
        en: "Choosing the perfect color for each room is not just a matter of personal taste, but how colors affect our psychology and space. Warm tones like beige and terracotta create intimacy, while blues and greens promote relaxation. In kitchens and living rooms, neutral tones with vibrant accents work best. Always consider the natural lighting of the room, as it affects how the color looks. Our team will help you choose the perfect palette for your home.",
      },
      category: {
        es: "CONSEJOS",
        ca: "CONSELLS",
        en: "TIPS",
      },
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: {
        es: "Pintura Ecológica: Beneficios para tu Hogar",
        ca: "Pintura Ecològica: Beneficis per al Teu Habitatge",
        en: "Eco-Friendly Paint: Benefits for Your Home",
      },
      excerpt: {
        es: "Descubre por qué las pinturas bajas en VOC son mejores para tu salud y el medio ambiente.",
        ca: "Descobreix per què les pintures baixes en COV són millors per a la teva salut i el medi ambient.",
        en: "Discover why low-VOC paints are better for your health and the environment.",
      },
      content: {
        es: "Las pinturas ecológicas bajas en VOC (Compuestos Orgánicos Volátiles) reducen significativamente la contaminación del aire interior. Estos productos son ideales para familias con niños, mascotas o personas con alergias. Además de ser más saludables, las pinturas eco-friendly tienen la misma durabilidad y cobertura que las convencionales. Contribuyes al cuidado del medio ambiente sin sacrificar calidad. En nuestro catálogo disponemos de las mejores marcas de pintura ecológica certificada.",
        ca: "Les pintures ecològiques baixes en COV (Compostos Orgànics Volàtils) redueixen significativament la contaminació de l'aire interior. Aquests productes són ideals per a famílies amb nens, mascotes o persones amb al·lèrgies. A més de ser més saludables, les pintures eco-friendly tenen la mateixa durabilitat i cobertura que les convencionals. Contribueixes a la cura del medi ambient sense sacrificar qualitat. En el nostre catàleg disposem de les millors marques de pintura ecològica certificada.",
        en: "Eco-friendly low-VOC paints significantly reduce indoor air pollution. These products are ideal for families with children, pets, or people with allergies. In addition to being healthier, eco-friendly paints have the same durability and coverage as conventional ones. You contribute to environmental care without sacrificing quality. In our catalog, we have the best brands of certified eco-friendly paint.",
      },
      category: {
        es: "SOSTENIBILIDAD",
        ca: "SOSTENIBILITAT",
        en: "SUSTAINABILITY",
      },
      image:
        "https://cdn.mos.cms.futurecdn.net/FbEqxqo75gYN4BJm4naEQk.jpg?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: {
        es: "Tendencias 2026: Colores de Moda en Interiores",
        ca: "Tendències 2026: Colors de Moda en interiors",
        en: "2026 Trends: Top Interior Color Trends",
      },
      excerpt: {
        es: "Los nuevos tonos neutros, atrevidos y naturales que dominarán el diseño de interiores.",
        ca: "Els nous tons neutres, atrevits i naturals que dominaran el disseny d’interiors.",
        en: "The new neutral, bold, and natural tones dominating interior design trends.",
      },
      content: {
        es: "Este 2026, los colores que predominan en diseño de interiores son el verde salvia para espacios zen, el terracota cálido para acogedores, y tonos grises sofisticados para minimalistas. Además, hay un resurgimiento de colores atrevidos como el borgoña y el azul marino profundo. Los tonos naturales como beige y caramelo siguen siendo populares. Estas tendencias reflejan nuestra búsqueda de espacios que combinen estética moderna con calidez y naturalidad. Nuestro equipo está al día con las últimas tendencias para ayudarte a crear espacios únicos.",
        ca: "Aquest 2026, els colors que predominen en disseny d'interiors són el verd salvatge per a espais zen, la terracotta càlida per a acollidors, i tons gris sofisticats per a minimalistes. A més, hi ha un resurgiment de colors atrevits com el borgonyà i el blau marí profund. Els tons naturals com beige i caramel continuen sent populars. Aquestes tendències reflecteixen la nostra recerca d'espais que combinin estètica moderna amb calidesa i naturalitat. El nostre equip està al dia amb les últimes tendències per ajudar-te a crear espais únics.",
        en: "In 2026, the colors that predominate in interior design are sage green for zen spaces, warm terracotta for cozy ones, and sophisticated gray tones for minimalists. Additionally, there is a resurgence of bold colors like burgundy and deep navy blue. Natural tones like beige and caramel continue to be popular. These trends reflect our search for spaces that combine modern aesthetics with warmth and naturalness. Our team is up to date with the latest trends to help you create unique spaces.",
      },
      category: {
        es: "TENDENCIAS",
        ca: "TENDÈNCIES",
        en: "TRENDS",
      },
      image:
        "https://plus.unsplash.com/premium_photo-1671308540294-1ed401902b0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <section
      id="blog"
      className="py-24 bg-gradient-to-b from-blue-50 to-indigo-50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 px-2" data-aos="fade-down">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white">
            {t.blog?.title || "Consejos & Tendencias"}
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.blog?.subtitle ||
              "Ideas, guías y novedades para mantener tu hogar impecable."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <div
              key={index}
              onClick={() => openModal(post)}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden group cursor-pointer transform transition-transform hover:scale-105"
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

      {/* Modal */}
      {modalOpen && selectedPost && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen */}
            <img
              src={selectedPost.image}
              alt={selectedPost.title[lang]}
              className="w-full h-80 object-cover"
            />

            {/* Contenido */}
            <div className="p-8">
              <p className="text-sm text-secondary font-semibold mb-3 uppercase tracking-wider">
                {selectedPost.category[lang]}
              </p>
              <h2 className="text-3xl font-bold font-display text-gray-800 dark:text-white mb-4">
                {selectedPost.title[lang]}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-semibold">
                {selectedPost.excerpt[lang]}
              </p>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
                {selectedPost.content[lang]}
              </p>

              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className="w-full bg-secondary hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogPreview;
