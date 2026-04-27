# Sala 28 — Checklist de puesta en marcha

Haz esto una sola vez antes de lanzar. El orden importa.

---

## 1. Dominio

- [ ] Registrar `sala28.es` en un registrador (Namecheap, Porkbun, etc. ~12 €/año)
- [ ] Apuntar los nameservers al proveedor de hosting (ver paso 4)

---

## 2. Buzón de correo — `hola@sala28.es`

**Opción gratuita: Zoho Mail**
- [ ] Crear cuenta en [zoho.com/mail](https://www.zoho.com/mail/)
- [ ] Añadir dominio `sala28.es` y seguir el wizard de verificación DNS
- [ ] Crear el buzón `hola@sala28.es`

**Opción de pago: Google Workspace** (~6 €/usuario/mes)
- [ ] Crear cuenta en [workspace.google.com](https://workspace.google.com)
- [ ] Seguir el wizard de configuración DNS

---

## 3. Supabase

- [ ] Crear cuenta en [supabase.com](https://supabase.com)
- [ ] Crear nuevo proyecto → región **eu-central-1 (Frankfurt)**
- [ ] Ir a **SQL Editor** → pegar y ejecutar el contenido de `supabase/schema.sql`
- [ ] Si el proyecto ya tenía la tabla sin la columna `email`, ejecutar también:
  ```sql
  alter table applications add column if not exists email text not null default '';
  ```
- [ ] Ir a **Settings → API** y copiar:
  - `Project URL` → `NUXT_SUPABASE_URL`
  - `service_role` secret → `NUXT_SUPABASE_SERVICE_KEY`

---

## 4. Hosting — Vercel (recomendado) o NuxtHub

El repo ya incluye `vercel.json` con las funciones configuradas en Frankfurt (misma región que Supabase).

### Vercel
- [ ] Crear cuenta en [vercel.com](https://vercel.com)
- [ ] Importar el repositorio de GitHub → framework detectado automáticamente como **Nuxt.js**
- [ ] Configurar las variables de entorno de la sección 6 en **Project → Settings → Environment Variables**
- [ ] Añadir dominio `sala28.es` en **Project → Settings → Domains**
- [ ] Vercel generará los nameservers a los que apuntar desde tu registrador

### NuxtHub (alternativa, Cloudflare Workers)
- [ ] Crear cuenta en [hub.nuxt.com](https://hub.nuxt.com)
- [ ] Conectar repositorio de GitHub
- [ ] Configurar variables de entorno (ver sección 6)
- [ ] Apuntar `sala28.es` al dominio que asigna NuxtHub

---

## 5. Plausible Analytics

- [ ] Crear cuenta en [plausible.io](https://plausible.io) ($9/mes)
- [ ] Añadir sitio `sala28.es`
- [ ] El script se inyecta automáticamente cuando `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` está configurado

---

## 6. Variables de entorno

Configurar en el panel del hosting (Vercel → Project → Settings → Environment Variables):

```bash
# Supabase
NUXT_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NUXT_SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# URL pública (para OG tags y canonical)
NUXT_PUBLIC_SITE_URL=https://sala28.es

# Plausible (dejar vacío en desarrollo)
NUXT_PUBLIC_PLAUSIBLE_DOMAIN=sala28.es

# Admin panel — genera con: openssl rand -base64 32
NUXT_ADMIN_TOKEN=cambia_esto_por_una_clave_segura_aleatoria
```

---

## 7. Imagen OG (`/og-image.png`)

- [ ] Abrir `public/og-image.svg` en el navegador
- [ ] Hacer screenshot a 1200×630 px, guardar como `public/og-image.png`
- [ ] O usar cualquier herramienta de conversión SVG→PNG online

---

## 8. Google Search Console

- [ ] Ir a [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Añadir propiedad `sala28.es` → verificar con el método de registro DNS (añadir un TXT record)
- [ ] Una vez verificado, ir a **Sitemaps** → añadir `https://sala28.es/sitemap.xml`

---

## 9. Verificación final antes de abrir

- [ ] Formulario de solicitud → enviar prueba → comprobar que aparece en `/admin`
- [ ] Abrir `/admin/login` → entrar con `NUXT_ADMIN_TOKEN` → cambiar estado de la solicitud de prueba
- [ ] Compartir la URL en WhatsApp → comprobar que aparece la tarjeta OG con imagen
- [ ] Comprobar que `sala28.es/robots.txt` es accesible
- [ ] Comprobar que las fuentes cargan (Cormorant, EB Garamond, JetBrains Mono)
