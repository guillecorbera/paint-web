# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Variables de entorno (EmailJS)

1. Copia `.env.example` a `.env`.
2. Completa estos valores:
   - `VITE_EMAILJS_PUBLIC_KEY` - Tu Public Key de EmailJS
   - `VITE_EMAILJS_SERVICE_ID` - ID del servicio de email
   - `VITE_EMAILJS_TEMPLATE_ID` - Template para emails al negocio
   - `VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID` - Template para confirmación al usuario
   - `VITE_CONTACT_TO_EMAIL` - Email del negocio que recibirá los mensajes
   - `VITE_RECAPTCHA_SITE_KEY` - Site key de Google reCAPTCHA (frontend)
   - `RECAPTCHA_SECRET_KEY` - Secret key de Google reCAPTCHA (backend)
   - `RECAPTCHA_MIN_SCORE` - Opcional, solo para v3 (default `0.5`)
3. Reinicia el servidor de Vite después de guardar `.env`.

## Configurar captcha

1. Crea una clave en Google reCAPTCHA para tu dominio (v2 checkbox o v3).
2. Añade en tu entorno:
   - `VITE_RECAPTCHA_SITE_KEY=...`
   - `RECAPTCHA_SECRET_KEY=...`
3. Reinicia frontend y backend (`pnpm run dev:all`).

📖 **Ver [EMAILJS_SETUP.md](EMAILJS_SETUP.md) para instrucciones detalladas de configuración**

## Funcionalidades del formulario de contacto

Cuando un usuario envía un mensaje:

1. ✅ **Email al negocio** - Se envía a `VITE_CONTACT_TO_EMAIL`
2. ✅ **Email de confirmación al usuario** - Auto-respuesta automática
3. ✅ **Guardado en backend** - Almacenado en `server/data/messages.json`
4. ✅ **Panel de administración** - Vista de mensajes en `/admin`

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar frontend y backend
pnpm run dev:all

# Solo frontend
pnpm run dev

# Solo backend
pnpm run server
```

## Panel de Administración

- **URL**: `/admin/login`
- **Usuario**: `admin`
- **Contraseña**: `admin123`

### Funcionalidades:

- Gestión de servicios (crear, editar, eliminar)
- Vista de mensajes de contacto
- Marcar mensajes como leídos
- Responder directamente desde el panel
- Eliminar mensajes
