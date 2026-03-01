# Configuración de EmailJS - Plantilla de Auto-Respuesta

## Paso 1: Crear la plantilla de auto-respuesta

1. Ve a tu dashboard de EmailJS: https://dashboard.emailjs.com/
2. Selecciona tu servicio de email (el mismo que usas actualmente)
3. Ve a **Email Templates** en el menú lateral
4. Haz clic en **Create New Template**

## Paso 2: Configurar la plantilla

### Configuración básica:

- **Template Name**: Auto-respuesta Contacto
- **Template ID**: Copia este ID y agrégalo a tu `.env` como `VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID`

### Settings (Configuración):

#### To Email:

```
{{to_email}}
```

#### From Name:

```
CCS Pavimento Industrial
```

#### From Email:

```
noreply@tudominio.com
```

(O el email que tengas configurado en tu servicio de EmailJS)

#### Subject:

```
Hemos recibido tu mensaje - CCS Pavimento Industrial
```

### Content (Contenido del email):

Puedes usar este template como base:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        text-align: center;
        border-radius: 10px 10px 0 0;
      }
      .content {
        background: #f9f9f9;
        padding: 30px;
        border-radius: 0 0 10px 10px;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        font-size: 12px;
        color: #666;
      }
      .highlight {
        background: #fff;
        padding: 15px;
        border-left: 4px solid #667eea;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>¡Gracias por contactarnos!</h1>
    </div>

    <div class="content">
      <p>Hola <strong>{{user_name}}</strong>,</p>

      <p>
        Hemos recibido tu mensaje correctamente y queremos agradecerte por
        ponerte en contacto con nosotros.
      </p>

      <div class="highlight">
        <p><strong>📧 Tu mensaje:</strong></p>
        <p style="margin: 10px 0; font-style: italic; color: #666;">
          (Esta es una confirmación automática. Tu mensaje ha sido enviado a
          nuestro equipo.)
        </p>
      </div>

      <p>
        Nuestro equipo revisará tu consulta y te responderemos lo antes posible,
        generalmente en un plazo de 24-48 horas hábiles.
      </p>

      <p>
        Si tu consulta es urgente, también puedes contactarnos directamente en:
      </p>
      <ul>
        <li>
          📧 Email: <a href="mailto:{{company_email}}">{{company_email}}</a>
        </li>
        <li>📱 Teléfono: [TU_TELEFONO_AQUI]</li>
      </ul>

      <p>¡Gracias por tu interés en nuestros servicios!</p>

      <p style="margin-top: 30px;">
        Saludos cordiales,<br />
        <strong>Equipo de CCS Pavimento Industrial</strong>
      </p>
    </div>

    <div class="footer">
      <p>Este es un mensaje automático, por favor no responder a este email.</p>
      <p>
        &copy; 2026 CCS Pavimento Industrial. Todos los derechos reservados.
      </p>
    </div>
  </body>
</html>
```

### Variables disponibles:

Estas son las variables que se envían desde el formulario y puedes usar en tu template:

- `{{to_email}}` - Email del usuario (se usa en "To Email")
- `{{to_name}}` - Nombre del usuario
- `{{user_name}}` - Nombre del usuario (alias)
- `{{name}}` - Nombre del usuario (alias)
- `{{email}}` - Email del usuario
- `{{user_email}}` - Email del usuario (alias)
- `{{company_name}}` - Nombre de tu empresa
- `{{company_email}}` - Email de tu empresa

## Paso 3: Probar la plantilla

1. Usa el botón **Test it** en EmailJS para enviar un email de prueba
2. Verifica que el formato se vea correctamente
3. Asegúrate de que las variables se reemplacen correctamente

## Paso 4: Actualizar tu .env

Copia el **Template ID** que generó EmailJS y actualiza tu archivo `.env`:

```env
VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID=template_tu_id_aqui
```

## Paso 5: Reiniciar el servidor

Como modificaste el archivo `.env`, debes reiniciar el servidor de Vite:

```bash
# Detén el servidor con Ctrl+C
# Luego ejecuta:
pnpm run dev
```

## ¿Qué hace ahora el formulario?

Cuando un usuario envía un mensaje de contacto:

1. ✅ **Email al negocio** → Se envía un email a `VITE_CONTACT_TO_EMAIL` con los detalles del mensaje
2. ✅ **Email al usuario** → Se envía un email de confirmación automática al usuario
3. ✅ **Guardado en backend** → El mensaje se guarda en `server/data/messages.json`
4. ✅ **Vista en admin** → Puedes ver todos los mensajes en el panel de administración

## Notas importantes

- El email de auto-respuesta solo se envía si `VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID` está configurado en el `.env`
- Si no quieres enviar auto-respuesta, simplemente deja esta variable vacía o elimínala
- Recuerda actualizar los placeholders como `[TU_TELEFONO_AQUI]` en el template

## Plantilla de Email al Negocio (ya configurada)

Tu plantilla actual `template_ip11scq` debe tener estas variables configuradas:

**Settings:**

- To Email: `{{to_email}}`
- From Name: `{{from_name}}`
- From Email: `{{from_email}}`
- Reply To: `{{reply_to}}`
- Subject: `{{subject}}`

**Content:**

```
Nuevo mensaje de contacto desde el sitio web

De: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto del sitio web.
Puedes responder directamente a este email.
```

## Solución de problemas

### El usuario no recibe el email de confirmación

- Verifica que el Template ID esté correcto en el `.env`
- Revisa que hayas reiniciado el servidor después de modificar el `.env`
- Chequea la consola del navegador en busca de errores
- Verifica en el dashboard de EmailJS si hay intentos de envío fallidos

### Los emails van a spam

- Asegúrate de que tu servicio de EmailJS esté configurado con un email verificado
- Considera usar un dominio personalizado en EmailJS (premium)
- Evita palabras spam en el asunto y contenido

### Error 422 al enviar

- Verifica que todos los nombres de variables en el template coincidan con los que se envían desde el código
- Revisa la configuración del servicio en EmailJS
