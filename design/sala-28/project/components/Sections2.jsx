/* global React */
const { useState } = React;

/* === Eventos próximos === */
function UpcomingEvents() {
  const events = [
    {
      date: "07.05.2026",
      time: "19:30",
      title: "Capital paciente",
      topic: "Levantar rondas sin perder dirección. Tres fundadores comparten cómo eligieron sus inversores.",
      city: "Barcelona · Cafè de l'Òpera",
      status: "Plazas abiertas",
      statusKind: "open",
      speakers: "M. Aranda · J. Iturralde · L. Carmona",
    },
    {
      date: "21.05.2026",
      time: "20:00",
      title: "Producto antes que marca",
      topic: "Dos B2B y un consumer hablan de cuándo vale la pena invertir en branding y cuándo es un atajo a la quiebra.",
      city: "Barcelona · Espai Bonnemaison",
      status: "Lista de espera",
      statusKind: "full",
      speakers: "P. Velasco · I. Hoyos",
    },
    {
      date: "11.06.2026",
      time: "19:30",
      title: "Hiring antes de PMF",
      topic: "Cómo se construye un equipo de ocho personas cuando todavía estás validando. Conversación abierta.",
      city: "Por confirmar",
      status: "Solicitud previa",
      statusKind: "open",
      speakers: "Ponentes en selección",
    },
  ];

  return (
    <section className="block alt" id="eventos">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-num">IV — Próximos encuentros</div>
          <h2>Tres sesiones<br/>en agenda.</h2>
        </div>

        <div className="events-grid reveal">
          {events.map((e, i) => (
            <article className="event-card" key={i}>
              <div className="meta">
                <span>{e.date} · {e.time}</span>
                <span className={`status ${e.statusKind === "full" ? "full" : ""}`}>{e.status}</span>
              </div>
              <div className="image-slot">[ fotografía del evento ]</div>
              <h3>{e.title}</h3>
              <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>{e.topic}</p>
              <div className="speakers">
                <span className="label">{e.city}</span>
                {e.speakers}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Archivo === */
function Archive() {
  const past = [
    { num: "Nº 11", date: "12.03.2026", title: "Pricing como producto", topic: "B2B SaaS · packaging y elasticidad", count: "62 asistentes" },
    { num: "Nº 10", date: "26.02.2026", title: "Vender antes de tener", topic: "Pre-ventas, MVPs, deuda de promesas", count: "58 asistentes" },
    { num: "Nº 09", date: "29.01.2026", title: "Internacionalización temprana", topic: "Cuándo cruzar y cómo", count: "67 asistentes" },
    { num: "Nº 08", date: "11.12.2025", title: "Equipo fundador", topic: "Reparto, conflictos, salidas", count: "54 asistentes" },
    { num: "Nº 07", date: "20.11.2025", title: "Distribución sin presupuesto", topic: "Canales orgánicos para B2B", count: "61 asistentes" },
    { num: "Nº 06", date: "30.10.2025", title: "El primer hire", topic: "Cómo elegir, qué pagar", count: "46 asistentes" },
  ];

  return (
    <section className="block" id="archivo">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-num">V — Archivo</div>
          <h2>Lo que pasó<br/>en sesiones<br/>anteriores.</h2>
        </div>

        <div className="archive-list reveal">
          {past.map((p, i) => (
            <div className="archive-row" key={i}>
              <div className="num">{p.num}</div>
              <div className="date">{p.date}</div>
              <div className="title">{p.title}</div>
              <div className="topic">{p.topic}</div>
              <div className="count">{p.count}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Testimonios === */
function Testimonials() {
  const items = [
    {
      quote: "Es el primer evento al que voy donde nadie reparte tarjetas. Hablamos de números reales durante una hora y salí con dos reuniones de seguimiento.",
      name: "Marta Aranda",
      role: "Co-fundadora · Plataforma logística B2B",
    },
    {
      quote: "El nivel de las preguntas marca la diferencia. La gente viene preparada porque ha leído la temática del día. No se siente como una sala de fiesta disfrazada.",
      name: "Javier Iturralde",
      role: "Fundador · Health-tech",
    },
  ];

  return (
    <section className="block alt" id="testimonios">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-num">VI — Lo que dicen</div>
          <h2>Voces de<br/>la sala.</h2>
        </div>

        <div className="testimonial-track reveal">
          {items.map((t, i) => (
            <div className="testimonial" key={i}>
              <blockquote>"{t.quote}"</blockquote>
              <div className="author">
                <div className="avatar"></div>
                <div>
                  <div className="name">{t.name}</div>
                  <div>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Mentores === */
function Mentors() {
  const mentors = [
    { name: "Elena Quirós", role: "Inversión · Pre-seed", bio: "12 años en early stage. Ex-operadora con dos exits. Disponible para revisión de term sheets." },
    { name: "Andrés Pareja", role: "Producto · B2B SaaS", bio: "Construyó equipos de producto en tres SaaS rentables. Acompaña en discovery y pricing." },
    { name: "Cristina Bel", role: "Legal · Societario", bio: "Estructuras societarias, pactos, contratación. Trabajó con ocho de las diez últimas rondas serie A en Barcelona." },
    { name: "Ramiro Lussich", role: "Go-to-market", bio: "Distribución para verticales regulados. Ayuda a definir el primer movimiento comercial." },
  ];

  return (
    <section className="block" id="mentores">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-num">VII — Mentores</div>
          <h2>Cuatro perfiles<br/>de acceso<br/>continuo.</h2>
        </div>

        <p className="reveal" style={{ fontSize: 16, color: "var(--ink-soft)", marginBottom: 56, maxWidth: "60ch" }}>
          Disponible solo para socios anuales. Una sesión mensual de cuarenta y cinco minutos por mentor, agendable a través del directorio interno.
        </p>

        <div className="mentors-grid reveal">
          {mentors.map((m, i) => (
            <div className="mentor" key={i}>
              <div className="portrait"></div>
              <div className="role">{m.role}</div>
              <div className="name">{m.name}</div>
              <p className="bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.UpcomingEvents = UpcomingEvents;
window.Archive = Archive;
window.Testimonials = Testimonials;
window.Mentors = Mentors;
