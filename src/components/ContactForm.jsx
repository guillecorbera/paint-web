// src/components/ContactForm.jsx
import { useState, useContext, useEffect } from "react";
import { LangContext } from "../context/LangContext";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_AUTORESPONSE_TEMPLATE_ID = import.meta.env
  .VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID;
const CONTACT_TO_EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL;

const ContactForm = () => {
  const { t } = useContext(LangContext);
  const [formStatus, setFormStatus] = useState("idle"); // idle, success, error, loading
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Inicializar EmailJS
  useEffect(() => {
    console.log("📧 EmailJS Config:", {
      hasPublicKey: !!EMAILJS_PUBLIC_KEY,
      hasServiceId: !!EMAILJS_SERVICE_ID,
      hasTemplateId: !!EMAILJS_TEMPLATE_ID,
      hasAutoresponseTemplateId: !!EMAILJS_AUTORESPONSE_TEMPLATE_ID,
      hasToEmail: !!CONTACT_TO_EMAIL,
      publicKey: EMAILJS_PUBLIC_KEY?.substring(0, 8) + "...",
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      autoresponseTemplateId: EMAILJS_AUTORESPONSE_TEMPLATE_ID,
    });

    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !EMAILJS_PUBLIC_KEY ||
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !CONTACT_TO_EMAIL
    ) {
      setFormStatus("error");
      setErrorMessage(
        "Falta configurar EmailJS. Revisa tu archivo .env (VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_CONTACT_TO_EMAIL).",
      );
      return;
    }

    setFormStatus("loading");

    try {
      // 1. Parámetros para el email al negocio
      const businessTemplateParams = {
        to_email: CONTACT_TO_EMAIL,
        to_name: "Contacto Web",
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        name: formData.name,
        email: formData.email,
        user_email: formData.email,
        message: formData.message,
        subject: "Nuevo mensaje desde formulario web",
      };

      // 2. Parámetros para el email de confirmación al usuario
      const userTemplateParams = {
        to_email: formData.email,
        to_name: formData.name,
        user_name: formData.name,
        name: formData.name,
        email: formData.email,
        user_email: formData.email,
        message: formData.message,
        user_message: formData.message,
        company_name: "CCS Pavimento Industrial",
        company_email: CONTACT_TO_EMAIL,
      };

      // 3. Enviar email al negocio (operación principal)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        businessTemplateParams,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      // 4. Operaciones secundarias en paralelo (no bloquean el éxito del envío)
      const backgroundPromises = [
        // Guardar en el backend
        fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: "Mensaje desde formulario web",
            message: formData.message,
          }),
        }).then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => null);
            throw new Error(data?.message || "Error al guardar en el backend");
          }
          return res.json();
        }),
      ];

      // Solo enviar auto-respuesta si está configurada
      if (EMAILJS_AUTORESPONSE_TEMPLATE_ID) {
        backgroundPromises.push(
          emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_AUTORESPONSE_TEMPLATE_ID,
            userTemplateParams,
            { publicKey: EMAILJS_PUBLIC_KEY },
          ),
        );
      }

      const backgroundResults = await Promise.allSettled(backgroundPromises);
      backgroundResults.forEach((result) => {
        if (result.status === "rejected") {
          console.warn("Operación secundaria fallida:", result.reason);
        }
      });

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus("error");
      setErrorMessage(
        error?.text ||
          error?.message ||
          "Error 422 de EmailJS. Revisa variables del template (name/email/message o from_name/from_email/message).",
      );

      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }
  };

  return (
    /*     <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800/50"></section> */
    <section
      id="contact"
      className="py-16 sm:py-24 bg-gradient-to-b from-pink-50 to-white px-4 sm:px-0"
    >
      <div className="container mx-auto">
        <div
          className="w-full sm:max-w-xl sm:mx-auto bg-white dark:bg-gray-700 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl"
          data-aos="fade-up"
        >
          {/* Encabezado */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-primary dark:text-white">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} noValidate>
            {formStatus === "success" && (
              <div className="mb-6 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-400 p-4 rounded text-sm">
                ✅{" "}
                {t.contact.success ||
                  "¡Gracias! Tu mensaje fue enviado. Nos pondremos en contacto pronto."}
              </div>
            )}

            {formStatus === "error" && (
              <div className="mb-6 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded text-sm">
                ❌{" "}
                {errorMessage ||
                  "Error al enviar el email. Por favor intenta nuevamente."}
              </div>
            )}

            <div className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder={t.contact.name}
                value={formData.name}
                onChange={handleChange}
                required
                disabled={formStatus === "loading"}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition text-gray-800 dark:text-white text-sm sm:text-base disabled:opacity-50"
              />
              <input
                type="email"
                name="email"
                placeholder={t.contact.email}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={formStatus === "loading"}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition text-gray-800 dark:text-white text-sm sm:text-base disabled:opacity-50"
              />
              <textarea
                name="message"
                rows="4"
                placeholder={t.contact.message}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={formStatus === "loading"}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition text-gray-800 dark:text-white resize-none text-sm sm:text-base disabled:opacity-50"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus === "loading" || formStatus === "success"}
              className="w-full mt-8 bg-primary hover:bg-accent text-white font-bold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg transition-transform hover:scale-105 duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {formStatus === "loading" && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {formStatus === "loading"
                ? "Enviando mensaje..."
                : formStatus === "success"
                  ? "✅ Enviado"
                  : t.contact.submit}
            </button>

            {formStatus === "loading" && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3 animate-pulse">
                Por favor espera, estamos procesando tu mensaje...
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
