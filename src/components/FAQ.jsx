// src/components/FAQ.jsx
import { useState, useContext } from 'react';
import { LangContext } from '../context/LangContext';
import React from 'react'; // ✅ Añade esta línea

const FAQ = () => {
  const { t } = useContext(LangContext);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: t.faq.q1,
      answer: t.faq.a1
    },
    {
      question: t.faq.q2,
      answer: t.faq.a2
    },
    {
      question: t.faq.q3,
      answer: t.faq.a3
    }
  ];

  return (
  /*   <section className="py-24 bg-gray-50 dark:bg-gray-800/50"> */
          <section className="py-24 bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white">{t.faq.title}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.faq.subtitle || 'Aclarando tus dudas para comenzar con tranquilidad.'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4" data-aos="fade-up">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left text-xl font-display p-6 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                <span>{faq.question}</span>
                <svg
                  className={`faq-icon w-6 h-6 text-secondary transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`faq-answer px-6 pb-6 text-lg text-gray-600 dark:text-gray-300 transition-all duration-400 overflow-hidden ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;