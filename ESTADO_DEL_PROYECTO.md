# Sala 28 — Estado del proyecto y servicios

*Documento para el equipo. Sin jerga técnica.*

---

## Qué tiene ya la página web

### La web pública (lo que ve cualquier visitante)

La página web de Sala 28 está completamente construida. Un visitante que entre verá lo siguiente, en orden de arriba a abajo:

**Animación de entrada**
Al cargar la página aparece "S28" en el centro. Según el visitante hace scroll, la "S" y el "28" se separan y entre ellas emerge el texto "ala", hasta leer "Sala 28" completo. Al seguir bajando, el logo queda como fondo y el contenido de la página pasa por delante.

**Las secciones de contenido**
- *Manifiesto* — Visión, misión y los tres pilares del proyecto.
- *En qué nos diferenciamos* — Tabla comparativa explicando qué hace diferente a Sala 28 frente a otros eventos.
- *Cómo funciona* — Los cuatro pasos del proceso de solicitud y asistencia.
- *Próximos eventos* — Tarjetas con fecha, estado, tema y ponente de cada evento. El contenido de esta sección se actualiza editando un archivo de texto (por ahora, sin panel de control propio).
- *Archivo* — Tabla con los eventos pasados.
- *Testimonios* — Opiniones de socios.
- *Mentores* — Perfiles de mentores disponibles en el plan anual.
- *Preguntas frecuentes* — Acordeón de preguntas y respuestas que se despliegan al pulsar.

**Formulario de solicitud**
El formulario recoge: nombre completo, fecha de nacimiento, profesión, email, LinkedIn (opcional), interés o motivación, e intención (asistir o exponer). Si el solicitante elige exponer, se despliega automáticamente una sección extra donde puede explicar su proyecto.

El formulario valida todos los campos antes de enviarse (comprueba que el solicitante tiene más de 24 años, que el email es válido, que los campos obligatorios están rellenos, etc.).

**Modo oscuro / modo claro**
El botón en la cabecera permite cambiar entre fondo claro y fondo oscuro. La preferencia se guarda automáticamente.

---

### Lo que pasa tras bambalinas cuando alguien envía el formulario

1. El servidor comprueba que todos los datos son correctos.
2. Verifica que ese email no haya enviado otra solicitud en las últimas 24 horas (para evitar duplicados).
3. Guarda la solicitud en la base de datos.
4. Manda automáticamente un email al solicitante confirmando que se ha recibido su solicitud y que le responderéis en menos de cinco días.

Todo esto ocurre en menos de un segundo y sin intervención manual.

---

### El panel de administración (solo para el equipo)

Existe una página privada en `/admin` que solo puede abrir quien tenga la contraseña del equipo. Desde ahí podéis:

**Ver todas las solicitudes**
Una tabla con todas las solicitudes recibidas, ordenadas de la más reciente a la más antigua. Se puede filtrar por estado (pendiente / aceptada / rechazada) y por tipo de perfil (asistente / ponente).

**Revisar el detalle de cada solicitud**
Al pulsar sobre una fila se abre un panel lateral con todos los datos de ese solicitante: datos personales, su motivación, el proyecto que quiere presentar (si aplica), su LinkedIn, etc.

**Cambiar el estado**
Desde ese panel se puede marcar la solicitud como aceptada, rechazada o volver a pendiente con un solo clic. En el momento en que se acepta o rechaza, la persona recibe automáticamente un email comunicándoselo.

**Comentarios internos del equipo**
En el panel de cada solicitud hay una sección de comentarios donde cualquier miembro del equipo puede dejar una nota visible solo para vosotros. Los comentarios se acumulan (nadie puede borrar lo que escribió otro), aparecen con nombre de quien lo escribió y hora.

---

### Emails automáticos

Hay dos emails que el sistema envía sin que nadie tenga que hacer nada:

| Cuándo se envía | A quién | Asunto |
|---|---|---|
| Al enviar el formulario | Al solicitante | "Tu solicitud para Sala 28 está en revisión" |
| Al marcar como aceptado | Al solicitante | "¡Tu plaza en Sala 28 está confirmada!" |
| Al marcar como rechazado | Al solicitante | "Actualización sobre tu solicitud a Sala 28" |

Los emails van firmados como `hola@sala28.es` y están diseñados con la identidad visual de Sala 28.

---

### Analíticas

La página está preparada para conectar con **Plausible**, un servicio de analíticas que mide visitas, páginas más vistas, países, dispositivos y fuentes de tráfico — sin usar cookies ni requerir el banner de aviso del RGPD. Solo hay que activarlo (ver sección de servicios más abajo).

---

### SEO y redes sociales

- La página aparece correctamente en Google (título, descripción, URL canónica).
- Cuando alguien comparte el enlace en WhatsApp, LinkedIn o Twitter/X aparece una tarjeta previsualizada con el nombre "Sala 28" y descripción del sitio.
- Hay un mapa del sitio automático (`/sitemap.xml`) para que Google indexe bien el contenido.

---

## Qué falta por hacer (próximos pasos)

Esto ya está planificado pero pendiente de implementar:

1. **Página de privacidad (RGPD)** — Obligatoria por ley en España antes de abrir el formulario al público. Explica qué datos se recogen, para qué y durante cuánto tiempo.
2. **Exportar solicitudes a Excel/CSV** — Para tener una lista de asistentes antes de cada evento sin tener que entrar en la base de datos.
3. **Gestión de eventos desde el panel** — Ahora mismo los eventos se actualizan editando un archivo de código. El plan es añadir una pantalla en el panel de administración para crear y editar eventos sin tocar código.
4. **Mejoras en el panel** — Búsqueda por nombre o email, selección múltiple para aceptar/rechazar en bloque, atajos de teclado.
5. **Imagen para redes sociales** — La tarjeta que aparece al compartir el enlace necesita una imagen (hay un borrador en SVG; solo hay que exportarla).

---

## Los servicios que usa (o usará) la página

A continuación se explica cada servicio externo, qué hace, qué opciones hay y cuánto cuesta.

---

### 1. Hosting — dónde vive la página web

El hosting es el servidor donde se almacena y ejecuta la página. Cuando alguien escribe `sala28.es` en el navegador, el hosting es quien le responde.

La página ya tiene un archivo de configuración preparado para **Vercel**.

| Servicio | Qué es | Precio | Pros | Contras |
|---|---|---|---|---|
| **Vercel** ✅ *recomendado* | El estándar del sector para webs como esta | Gratis para el volumen esperado | Muy fiable, deploy automático al subir código, soporte excelente para el tipo de web que es Sala 28 | El plan gratuito tiene un límite de tráfico (suficiente durante años al ritmo esperado) |
| **NuxtHub** | Hecho específicamente para webs construidas con la misma tecnología que Sala 28 | Gratis | Integración perfecta, servidores globales muy rápidos | Más nuevo, menos historial de fiabilidad |
| **Netlify** | Alternativa madura y conocida | Gratis / 19 $/mes | Estable, fácil de usar | Soporte algo menos directo para esta tecnología |

**Recomendación:** Vercel. Es gratis para el tráfico esperado, es el más usado para este tipo de web y tiene el mejor soporte. La página ya está configurada para funcionar con Vercel sin cambios adicionales.

**Coste estimado: 0 €/mes.**

---

### 2. Base de datos — donde se guardan las solicitudes

Cuando alguien envía el formulario, sus datos se guardan en una base de datos. También desde ahí se lee la información que aparece en el panel de administración.

La página ya usa **Supabase**.

| Servicio | Qué es | Precio | Pros | Contras |
|---|---|---|---|---|
| **Supabase** ✅ *en uso* | Base de datos PostgreSQL gestionada, con panel visual | Gratis (hasta 500 MB) / 25 $/mes Pro | Servidores en Frankfurt (Europa, RGPD compliant), panel visual para ver los datos directamente, API automática | Proyectos en el plan gratuito se "pausan" tras 90 días sin actividad (se reactivan con un clic) |
| **Airtable** | Base de datos visual tipo hoja de cálculo | Gratis (1.000 filas) / 20 $/usuario/mes | Muy intuitivo para personas sin perfil técnico | El límite de 1.000 filas se llena relativamente rápido; la integración con la web es menos directa |
| **Google Sheets** | Hoja de cálculo de Google | Gratis | Todo el mundo lo conoce | No está diseñado para esto; frágil, sin control de errores |

**Recomendación:** Supabase (ya en uso). Gratis, en Europa y más que suficiente para los próximos años.

**Coste estimado: 0 €/mes.**

---

### 3. Email transaccional — los emails automáticos

Los emails de confirmación y de decisión (aceptado/rechazado) los envía un servicio especializado en esto. No es el buzón de correo del equipo — es un servicio que garantiza que los emails lleguen a la bandeja de entrada y no al spam.

La página ya usa **Resend**.

| Servicio | Precio | Pros | Contras |
|---|---|---|---|
| **Resend** ✅ *en uso* | Gratis hasta 3.000 emails/mes, luego 20 $/mes | Moderno, fácil de configurar, excelente entregabilidad, integración sencilla | Relativamente nuevo en el mercado |
| **Brevo** (antes Sendinblue) | Gratis 300/día | Bien establecido, orientado también a newsletters | Interfaz más compleja |
| **Postmark** | 15 $/mes (10.000 emails) | Muy buena reputación, enfocado en transaccional | No tiene plan gratuito útil |

**Recomendación:** Resend (ya en uso). Con 3.000 emails gratuitos al mes, Sala 28 puede enviar emails durante años sin pagar.

Para que funcione en producción hace falta:
1. Verificar el dominio `sala28.es` en Resend (añadir unos registros DNS — lo hace quien gestione el dominio, en 10 minutos).
2. Añadir la clave API de Resend a las variables de entorno del hosting.

**Coste estimado: 0 €/mes.**

---

### 4. Buzón de correo — `hola@sala28.es`

Este es el buzón desde el que el equipo responde a los solicitantes, y el que aparece como remitente en los emails automáticos. Es independiente del servicio de email transaccional.

| Servicio | Precio | Pros | Contras |
|---|---|---|---|
| **Zoho Mail** | Gratis (1 cuenta) / ~1 $/usuario/mes | Gratuito para empezar, funciona bien | Interfaz menos cómoda que Gmail |
| **Google Workspace** | ~6 €/usuario/mes (~72 €/año por persona) | Gmail con dominio propio, todo el equipo lo conoce, integra con Drive, Calendar, etc. | De pago |
| **Microsoft 365** | ~5 €/usuario/mes | Outlook con dominio propio | De pago, menos habitual en startups |

**Recomendación:** Zoho Mail para empezar (gratis). Si el equipo crece o quiere la comodidad de Gmail, migrar a Google Workspace es sencillo.

**Coste estimado: 0–6 €/usuario/mes.**

---

### 5. Analíticas — cuánta gente visita la web

Las analíticas permiten ver cuántas personas visitan la web, desde dónde, qué páginas ven y cuánto tiempo pasan.

La página ya está preparada para **Plausible** — solo falta activarlo.

| Servicio | Precio | Cookies / Banner RGPD | Datos disponibles |
|---|---|---|---|
| **Plausible** ✅ *recomendado* | 9 $/mes | No — sin banner | Visitas, páginas, países, dispositivos, fuentes de tráfico |
| **Umami** (gratis, autoalojado) | 0 € | No — sin banner | Similar a Plausible, requiere más configuración técnica inicial |
| **Google Analytics 4** | Gratis | Sí — requiere banner de cookies | Muy completo, pero el banner es obligatorio en España y puede afectar la experiencia |

En España, la AEPD (el equivalente español del RGPD) es bastante estricta. Un servicio de analíticas sin cookies evita completamente tener que mostrar el banner de "Aceptar cookies", lo que mejora la experiencia de los visitantes.

**Recomendación:** Plausible. 9 $/mes, sin cookies, sin banner, sin problema legal.

**Coste estimado: 0–9 $/mes.**

---

### 6. Pagos — las entradas a los eventos

Por ahora los pagos se gestionan a través de **Luma**, la plataforma que ya usáis para publicar los eventos. Luma gestiona el pago de entradas internamente (usa Stripe por debajo).

| Opción | Cuándo | Comisión | Pros | Contras |
|---|---|---|---|---|
| **Luma** ✅ *ahora* | Ya | ~6,5 % por entrada (sobre 15 €, ~1 €) | Cero trabajo técnico, Luma gestiona todo | El pago ocurre fuera de sala28.es |
| **Stripe en la web** | Futuro (>6 meses) | ~3 % por entrada (sobre 15 €, ~0,46 €) | Experiencia de pago integrada en la web | Requiere desarrollo e integración |

**Recomendación:** Luma por ahora. Cuando el modelo esté validado y los eventos sean recurrentes, tiene sentido integrar Stripe directamente en la web para mejorar la experiencia y reducir comisiones.

---

### 7. Dominio — `sala28.es`

El dominio es la dirección web (`sala28.es`). Hay que registrarlo y renovarlo anualmente.

| Registrador | Precio anual | Notas |
|---|---|---|
| Namecheap | ~10–15 €/año | Fiable, buena interfaz |
| Porkbun | ~8–12 €/año | Muy competitivo en precio |
| Dondominio | ~10–15 €/año | Español, si se prefiere soporte en español |

**Coste estimado: ~12 €/año (~1 €/mes).**

---

## Resumen de costes

| Servicio | Estado | Coste mínimo | Coste recomendado |
|---|---|---|---|
| Hosting (Vercel) | Listo para activar | 0 €/mes | 0 €/mes |
| Base de datos (Supabase) | En uso | 0 €/mes | 0 €/mes |
| Email transaccional (Resend) | En uso | 0 €/mes | 0 €/mes |
| Buzón `hola@sala28.es` | Pendiente de crear | 0 €/mes (Zoho) | ~6 €/mes (Google) |
| Analíticas (Plausible) | Listo, pendiente de activar | 0 €/mes (Umami) | ~9 $/mes |
| Pagos | Luma (ya en uso) | Solo % por entrada | Solo % por entrada |
| Dominio `sala28.es` | Pendiente de registrar | ~1 €/mes | ~1 €/mes |

**Total fijo mínimo: ~1 €/mes** (solo el dominio)
**Total fijo recomendado: ~16 €/mes** (dominio + Google Workspace + Plausible)
**Variable por evento: ~1 € por entrada vendida** (comisión de Luma)

---

## Checklist para lanzar

Antes de abrir la web al público, hay que hacer estas cosas **una sola vez**:

- [ ] Registrar el dominio `sala28.es`
- [ ] Crear el buzón `hola@sala28.es` (Zoho o Google Workspace)
- [ ] Crear cuenta en Supabase y ejecutar el esquema de base de datos
- [ ] Verificar el dominio en Resend (para que los emails lleguen bien)
- [ ] Desplegar la web en Vercel y conectar el dominio
- [ ] Añadir las claves de configuración en Vercel (Supabase, Resend, contraseña del panel)
- [ ] Crear la imagen para compartir en redes sociales (hay un borrador)
- [ ] Activar Plausible si se quieren analíticas desde el primer día
- [ ] Añadir la web a Google Search Console (para aparecer en buscadores)
- [ ] Hacer una prueba completa: enviar un formulario, comprobar que llega al panel y que se recibe el email de confirmación
- [ ] Escribir y publicar la página de privacidad (obligatorio por RGPD)

---

*Documento actualizado a mayo 2026.*
