// src/components/ContactForm.jsx
import { useState, useContext } from 'react';
import { LangContext } from '../context/LangContext';
import React from 'react'; // ✅ Añade esta línea

const ContactForm = () => {
  const { t } = useContext(LangContext);
  const [formStatus, setFormStatus] = useState('idle'); // idle, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('success');

    // Aquí puedes conectar con un backend o servicio como Formspree, EmailJS, etc.
    // Ejemplo: await fetch('/api/contact', { method: 'POST', body: new FormData(e.target) })

    setTimeout(() => {
      e.target.reset();
      setFormStatus('idle');
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div
          className="max-w-xl mx-auto bg-white dark:bg-gray-700 p-8 md:p-12 rounded-2xl shadow-2xl"
          data-aos="fade-up"
        >
          {/* Encabezado */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary dark:text-white">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} noValidate>
            {formStatus === 'success' && (
              <div className="mb-6 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-400 p-4 rounded text-sm">
                {t.contact.success || '¡Gracias! Tu mensaje fue enviado. Nos pondremos en contacto pronto.'}
              </div>
            )}

            <div className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder={t.contact.name}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition text-gray-800 dark:text-white"
              />
              <input
                type="email"
                name="email"
                placeholder={t.contact.email}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition text-gray-800 dark:text-white"
              />
              <textarea
                name="message"
                rows="4"
                placeholder={t.contact.message}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition text-gray-800 dark:text-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus === 'success'}
              className="w-full mt-8 bg-primary hover:bg-accent text-white font-bold py-4 px-6 rounded-lg text-lg transition-transform hover:scale-105 duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formStatus === 'success' ? t.contact.sending || 'Enviado...' : t.contact.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;