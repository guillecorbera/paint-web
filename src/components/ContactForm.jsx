// src/components/ContactForm.jsx
import { useState, useContext, useEffect, useRef } from "react";
import { LangContext } from "../context/LangContext";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_AUTORESPONSE_TEMPLATE_ID = import.meta.env
  .VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID;
const CONTACT_TO_EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const hasCaptchaRender = () => typeof window.grecaptcha?.render === "function";
const hasCaptchaExecute = () =>
  typeof window.grecaptcha?.execute === "function" &&
  typeof window.grecaptcha?.ready === "function";

const waitForGrecaptcha = (maxAttempts = 50, interval = 100) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      if (hasCaptchaRender() || hasCaptchaExecute()) {
        resolve();
        return;
      }
      attempts++;
      if (attempts >= maxAttempts) {
        reject(
          new Error(
            "reCAPTCHA no se inicializó. Verifica tu clave y que localhost esté en dominios permitidos.",
          ),
        );
        return;
      }
      setTimeout(check, interval);
    };
    check();
  });
};

const loadRecaptchaScript = () => {
  if (hasCaptchaRender() || hasCaptchaExecute()) {
    return Promise.resolve();
  }

  const existingScript = document.querySelector(
    'script[src*="https://www.google.com/recaptcha/api.js"]',
  );

  if (existingScript) {
    if (hasCaptchaRender() || hasCaptchaExecute()) {
      return Promise.resolve();
    }
    return waitForGrecaptcha();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      waitForGrecaptcha().then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error("No se pudo cargar reCAPTCHA"));
    document.head.appendChild(script);
  });
};

const ContactForm = () => {
  const { t } = useContext(LangContext);
  const captchaContainerRef = useRef(null);
  const captchaWidgetIdRef = useRef(null);
  const [formStatus, setFormStatus] = useState("idle"); // idle, success, error, loading
  const [isCaptchaReady, setIsCaptchaReady] = useState(false);
  const [captchaMode, setCaptchaMode] = useState("unknown"); // unknown | v2 | v3
  const [captchaToken, setCaptchaToken] = useState("");
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
      hasRecaptchaSiteKey: !!RECAPTCHA_SITE_KEY,
      publicKey: EMAILJS_PUBLIC_KEY?.substring(0, 8) + "...",
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      autoresponseTemplateId: EMAILJS_AUTORESPONSE_TEMPLATE_ID,
    });

    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      return;
    }

    let isCancelled = false;

    window.onContactCaptchaSuccess = (token) => {
      setCaptchaToken(token || "");
      setErrorMessage("");
    };

    window.onContactCaptchaExpired = () => {
      setCaptchaToken("");
    };

    window.onContactCaptchaError = () => {
      setCaptchaToken("");
      setErrorMessage("Error en captcha. Intenta verificarlo de nuevo.");
    };

    loadRecaptchaScript()
      .then(() => {
        if (isCancelled || !window.grecaptcha) {
          return;
        }

        if (hasCaptchaRender() && captchaContainerRef.current) {
          if (captchaWidgetIdRef.current !== null) {
            return;
          }

          captchaWidgetIdRef.current = window.grecaptcha.render(
            captchaContainerRef.current,
            {
              sitekey: RECAPTCHA_SITE_KEY,
              callback: "onContactCaptchaSuccess",
              "expired-callback": "onContactCaptchaExpired",
              "error-callback": "onContactCaptchaError",
            },
          );

          setCaptchaMode("v2");
          setIsCaptchaReady(true);
          return;
        }

        if (hasCaptchaExecute()) {
          setCaptchaMode("v3");
          setIsCaptchaReady(true);
          return;
        }

        throw new Error("No se detecto reCAPTCHA v2 ni v3.");
      })
      .catch((error) => {
        console.error("Error loading captcha:", error);
        setErrorMessage(
          "No se pudo inicializar reCAPTCHA. Verifica tu clave y dominio en Google reCAPTCHA.",
        );
      });

    return () => {
      isCancelled = true;
      delete window.onContactCaptchaSuccess;
      delete window.onContactCaptchaExpired;
      delete window.onContactCaptchaError;
    };
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
      !CONTACT_TO_EMAIL ||
      !RECAPTCHA_SITE_KEY
    ) {
      setFormStatus("error");
      setErrorMessage(
        "Falta configurar EmailJS o captcha. Revisa tu .env (VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_CONTACT_TO_EMAIL, VITE_RECAPTCHA_SITE_KEY).",
      );
      return;
    }

    if (!isCaptchaReady || captchaMode === "unknown") {
      setFormStatus("error");
      setErrorMessage(
        "Captcha aun no esta listo. Espera un segundo e intenta de nuevo.",
      );
      return;
    }

    let tokenForSubmit = captchaToken;

    if (captchaMode === "v3") {
      try {
        tokenForSubmit = await new Promise((resolve, reject) => {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(
                RECAPTCHA_SITE_KEY,
                {
                  action: "contact_submit",
                },
              );
              resolve(token);
            } catch (execError) {
              reject(execError);
            }
          });
        });
      } catch (execError) {
        setFormStatus("error");
        setErrorMessage(
          execError?.message ||
            "No se pudo validar captcha v3. Intenta nuevamente.",
        );
        return;
      }
    }

    if (captchaMode === "v2" && !tokenForSubmit) {
      setFormStatus("error");
      setErrorMessage("Por favor, completa la verificación captcha.");
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
            captchaToken: tokenForSubmit,
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
      if (captchaMode === "v2") {
        setCaptchaToken("");
      }

      if (window.grecaptcha && captchaWidgetIdRef.current !== null) {
        window.grecaptcha.reset(captchaWidgetIdRef.current);
      }

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

      if (window.grecaptcha && captchaWidgetIdRef.current !== null) {
        window.grecaptcha.reset(captchaWidgetIdRef.current);
      }
      if (captchaMode === "v2") {
        setCaptchaToken("");
      }

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

              <div className="min-h-[84px] rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-3 py-3">
                {!RECAPTCHA_SITE_KEY && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Falta `VITE_RECAPTCHA_SITE_KEY` en tu archivo .env
                  </p>
                )}
                {RECAPTCHA_SITE_KEY && !isCaptchaReady && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 animate-pulse">
                    Cargando captcha...
                  </p>
                )}
                {RECAPTCHA_SITE_KEY &&
                  isCaptchaReady &&
                  captchaMode === "v3" && (
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Proteccion anti-spam activa (reCAPTCHA v3)
                    </p>
                  )}
                <div ref={captchaContainerRef} className="mt-1" />
              </div>
            </div>

            <button
              type="submit"
              disabled={
                formStatus === "loading" ||
                formStatus === "success" ||
                !isCaptchaReady ||
                (captchaMode === "v2" && !captchaToken)
              }
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
