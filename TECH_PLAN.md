# Plan Técnico — Sala 28

## Contexto

- Proyecto en fase early, tráfico moderado (cientos/mes al principio)
- Empresa en España → GDPR obligatorio, IVA en pagos
- Revisión manual de formularios → la herramienta tiene que ser visualmente usable por personas no técnicas
- Ya usan Luma para publicar eventos → puede absorber pagos desde el principio
- Stack: Nuxt 4 estático/SSR

---

## 1. Hosting

| Opción | Precio | Pros | Contras |
|---|---|---|---|
| **NuxtHub** (Cloudflare) | Gratis | Hecho para Nuxt 4, CDN global, KV/DB incluido, edge functions | Relativamente nuevo, menos documentación |
| **Vercel** | Gratis / $20/mes Pro | El estándar para Nuxt, deploy automático, excelente DX | Free tier tiene límites de bandwidth en proyectos comerciales |
| **Netlify** | Gratis / $19/mes Pro | Similar a Vercel, muy maduro | Soporte Nuxt menos directo que Vercel |
| **Cloudflare Pages** | Gratis | Muy rápido, CDN inmejorable | Sin integración Nuxt tan directa como NuxtHub |

**Recomendación:** NuxtHub o Vercel. Para un sitio estático con poco tráfico, ambos son gratis en la práctica. NuxtHub tiene ventaja si en el futuro se quieren edge functions o una mini base de datos sin infraestructura adicional. Vercel es más estable y maduro.

**Coste estimado: 0 €/mes** (free tiers suficientes para el tráfico esperado).

---

## 2. Base de datos / formularios

El formulario recoge solicitudes que se revisan manualmente. Hay tres niveles de complejidad:

### Opción A — Solo email (más simple)

Usar **Resend** o **Nodemailer**: cuando alguien envía el formulario, se manda un email formateado a `hola@sala28.es`. Sin base de datos. El equipo gestiona las solicitudes desde su bandeja de entrada.

- **Precio:** Resend gratis hasta 3.000 emails/mes. Después, $20/mes.
- **Pros:** Cero infraestructura, cero mantenimiento, funciona desde el día 1.
- **Contras:** Sin histórico estructurado, buscar solicitudes antiguas es complicado, no hay analytics de solicitudes.
- **Ideal para:** primeros 3–6 meses mientras se valida el modelo.

### Opción B — Supabase *(recomendada a medio plazo)*

PostgreSQL gestionado con dashboard visual y API REST autogenerada. Las solicitudes se guardan en una tabla `applications`. El equipo puede filtrar, buscar y marcar como aceptado/rechazado desde el dashboard de Supabase, o desde una dashboard propia más adelante.

- **Precio:** Gratis (500 MB, proyectos ilimitados). Pro: $25/mes.
- **Pros:** Base de datos real, API lista, fácil de conectar con Nuxt vía `@supabase/supabase-js`, servidores en EU (Frankfurt), GDPR compliant.
- **Contras:** Algo más de setup que un email.
- **Ideal para:** desde el principio si se quieren datos estructurados, o a partir del segundo evento.

### Opción C — Airtable

Base de datos visual tipo spreadsheet. Cada solicitud es una fila. El equipo puede añadir campos, comentarios y estados sin tocar código.

- **Precio:** Gratis hasta 1.000 registros. Plus: $20/usuario/mes.
- **Pros:** No técnico, muy visual, el equipo lo entiende sin formación.
- **Contras:** El free tier se llena rápido, la API es menos limpia que Supabase.

**Recomendación:** Opción A para lanzar → Opción B en cuanto haya segundo evento. El flujo sería: Resend manda el email de confirmación al solicitante + notificación interna al equipo, y Supabase guarda el registro. Integración de ~2 horas de trabajo.

**Coste estimado: 0 €/mes** (free tiers suficientes hasta cientos de solicitudes/mes).

---

## 3. Email transaccional

Necesario para: confirmación de solicitud, aceptación/rechazo, recordatorio del evento.

| Opción | Precio | Notas |
|---|---|---|
| **Resend** | Gratis 3k/mes, luego $20/mes | API moderna, integración Nuxt excelente, soporte para dominio propio |
| **Brevo** (ex-Sendinblue) | Gratis 300/día | Funciona bien, más orientado a marketing |
| **Postmark** | $15/mes (10k emails) | Enfocado en transaccional, muy buena entregabilidad |

**Recomendación:** Resend. Gratis, API limpia, SDK oficial para Nuxt/Vue. Con 3.000 emails/mes gratuitos hay margen para años con el volumen de Sala 28.

**Buzón `hola@sala28.es`:** necesita dominio propio + servicio de correo:

| Opción | Precio |
|---|---|
| Google Workspace | $6/usuario/mes (~72 €/año) |
| Zoho Mail | Gratis (1 usuario) o $1/usuario/mes |

**Recomendación:** Zoho Mail gratis para empezar, migrar a Google Workspace si el equipo crece.

---

## 4. Pagos

### Fase 1 — Luma (ahora)

Ya está en el plan usar Luma para publicar eventos. Luma gestiona el pago de las entradas directamente (integra Stripe internamente). El asistente paga en Luma, Luma liquida al organizador.

- **Comisión:** ~3,5% Luma + ~1,4% + 0,25 € Stripe (tarjetas EU). Sobre un ticket de 15 € → ~1 € por transacción (~6,5 %).
- **Ventaja:** Cero trabajo técnico. Luma también gestiona recordatorios, lista de espera y check-in.
- **Inconveniente:** El pago ocurre fuera de sala28.es; hay que redirigir al usuario a Luma.

### Fase 2 — Stripe directo en la web *(futuro)*

Cuando se quiera que el pago ocurra dentro de sala28.es (mejor UX, más datos propios):

- **Stripe:** 1,4 % + 0,25 € por transacción (tarjetas EU). Sobre 15 € → ~0,46 €. Sin cuota mensual.
- **Stripe Tax:** calcula y reporta IVA automáticamente (~0,5 % adicional por transacción).
- **Redsys** (pasarela bancaria española): fees menores en volumen alto (~0,3 %), pero setup complejo y requiere contrato con banco. Solo vale la pena a partir de varios miles de transacciones/mes.

**Recomendación:**
- **Ahora:** Luma gestiona todo. Enlace desde la web a la página del evento en Luma.
- **>6 meses, si el modelo está validado:** Stripe integrado en la web con Stripe Tax para IVA.

**Coste fijo: 0 €/mes.** Solo % por transacción (~0,50–1 € por entrada de 15 €).

---

## 5. Analytics

Punto delicado en España: la AEPD es estricta. Si se usan cookies de seguimiento → banner de consentimiento obligatorio. Si se usan analytics sin cookies → no hace falta banner.

| Opción | Precio | Cookies | GDPR | Datos disponibles |
|---|---|---|---|---|
| **Plausible** | $9/mes (10k pv) | No | ✅ Sin banner | Pageviews, fuentes, países, dispositivos |
| **Umami** (self-hosted) | 0 € | No | ✅ Sin banner | Similar a Plausible |
| **Umami** (cloud) | $9/mes | No | ✅ | Igual pero gestionado |
| **PostHog** | Gratis (1M eventos/mes) | Opcional | ✅ Con configuración | Analytics + heatmaps + funnels |
| **Google Analytics 4** | 0 € | Sí | ⚠️ Requiere banner | Muy completo |
| **Cloudflare Analytics** | 0 € | No | ✅ | Solo si se aloja en Cloudflare; poco detalle |

**Recomendación:** Plausible o Umami self-hosted.

- Lo más simple y sin mantenimiento → **Plausible** ($9/mes, integración de 1 línea).
- Presupuesto cero → **Umami** en Vercel o Railway (gratis, ~10 min de setup).
- Google Analytics solo si se necesitan funcionalidades avanzadas y se está dispuesto a gestionar el banner GDPR correctamente.

**Coste estimado: 0–9 €/mes.**

---

## Resumen de costes

| Servicio | Opción mínima | Opción recomendada |
|---|---|---|
| Hosting | 0 €/mes (Vercel/NuxtHub free) | 0 €/mes |
| Base de datos | 0 €/mes (Supabase free) | 0 €/mes |
| Email transaccional | 0 €/mes (Resend free) | 0 €/mes |
| Buzón `hola@sala28.es` | 0 €/mes (Zoho free) | ~6 €/mes (Google Workspace) |
| Pagos | Solo % por transacción | Solo % por transacción |
| Analytics | 0 €/mes (Umami self-hosted) | 9 €/mes (Plausible) |
| Dominio `sala28.es` | ~12 €/año (~1 €/mes) | ~12 €/año |

**Total fijo mensual mínimo: ~1 €/mes** (solo dominio prorrateado)
**Total fijo mensual recomendado: ~15–16 €/mes** (Google Workspace + Plausible + dominio)
**Variable por eventos:** ~0,50–1 € por entrada vendida (fees de Luma/Stripe)

---

## Stack recomendado para lanzar

| Capa | Servicio | Coste |
|---|---|---|
| Hosting | NuxtHub (Cloudflare) | 0 €/mes |
| Base de datos | Supabase free tier | 0 €/mes |
| Email transaccional | Resend | 0 €/mes |
| Buzón de correo | Zoho Mail | 0 €/mes |
| Pagos | Luma | 0 €/mes + ~6,5 %/ticket |
| Analytics | Plausible | 9 €/mes |
| Dominio | sala28.es | ~12 €/año |

**Coste total al lanzar: ~10 €/mes + % por ticket vendido.**
Escalable sin cambiar de stack hasta miles de usuarios mensuales.

---

## Hoja de ruta de implementación

1. **Ahora:** conectar formulario a Resend (email de notificación) + Supabase (guardar solicitud). ~2–3h de trabajo.
2. **Antes del primer evento:** dominio + Zoho Mail + deploy en NuxtHub/Vercel. ~1–2h.
3. **Tras validar el modelo:** añadir Plausible para analytics. ~30 min.
4. **Futuro (>6 meses):** integrar Stripe para pagos en la web, construir dashboard interno para gestionar solicitudes.
