/* global React */
const { useState } = React;

/* === Formulario === */
function ApplicationForm() {
  const [intent, setIntent] = useState(""); // "attend" | "present"
  const [data, setData] = useState({
    name: "", birth: "", profession: "", linkedin: "", interest: "",
    project_name: "", project_pitch: "", contact: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = "Requerido";
    if (!data.birth) e.birth = "Requerido";
    else {
      const age = (new Date() - new Date(data.birth)) / (365.25 * 24 * 3600 * 1000);
      if (age < 24) e.birth = "Eventos restringidos a +24 años";
    }
    if (!data.profession.trim()) e.profession = "Requerido";
    if (!data.interest.trim()) e.interest = "Cuéntanos en una línea";
    if (!intent) e.intent = "Selecciona una opción";
    if (intent === "present") {
      if (!data.project_name.trim()) e.project_name = "Requerido";
      if (!data.project_pitch.trim() || data.project_pitch.length < 80) e.project_pitch = "Mínimo 80 caracteres";
      if (!data.contact.trim()) e.contact = "Requerido para ponentes";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="block alt" id="solicitar">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="section-num">VIII — Solicitud</div>
            <h2>Recibida.</h2>
          </div>
          <div className="success" style={{ maxWidth: 640, margin: "0 auto" }}>
            <h3>Tu solicitud está en revisión.</h3>
            <p style={{ margin: "0 auto", color: "var(--ink-soft)" }}>
              Te escribiremos en menos de cinco días desde <em>hola@sala28.es</em>. Si te has presentado para exponer, la respuesta puede tomar algunos días más.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="block alt" id="solicitar">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-num">VIII — Solicitud</div>
          <h2>Solicita<br/>tu plaza.</h2>
        </div>

        <div className="form-wrap">
          <aside className="form-side reveal">
            <div className="lead">No es exclusión, es coherencia.</div>
            <p>Cada solicitud se revisa manualmente. Aceptamos perfiles que aporten al resto y se enriquezcan del resto.</p>
            <p style={{ marginTop: 24, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
              Tiempo estimado<br/>
              <span style={{ color: "var(--ink)", fontSize: 14, letterSpacing: 0, textTransform: "none", fontFamily: "var(--serif)" }}>3 a 5 minutos</span>
            </p>
          </aside>

          <form onSubmit={submit} className="reveal" noValidate>
            <div className="field">
              <label>Nombre completo<span className="req">*</span></label>
              <input value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="María García" />
              <span className="err">{errors.name}</span>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Fecha de nacimiento<span className="req">*</span></label>
                <input type="date" value={data.birth} onChange={(e) => update("birth", e.target.value)} />
                <span className="err">{errors.birth}</span>
              </div>
              <div className="field">
                <label>Profesión<span className="req">*</span></label>
                <input value={data.profession} onChange={(e) => update("profession", e.target.value)} placeholder="Co-fundadora, Producto" />
                <span className="err">{errors.profession}</span>
              </div>
            </div>

            <div className="field">
              <label>LinkedIn (opcional)</label>
              <input value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="linkedin.com/in/…" />
              <span className="err"></span>
            </div>

            <div className="field">
              <label>En una línea, ¿qué te trae?<span className="req">*</span></label>
              <input value={data.interest} onChange={(e) => update("interest", e.target.value)} placeholder="Estoy levantando ronda y me interesa la temática de capital paciente" />
              <span className="err">{errors.interest}</span>
            </div>

            <div className="field">
              <label>Tu intención<span className="req">*</span></label>
              <div className="choice-group">
                <button type="button" className={`choice ${intent === "attend" ? "active" : ""}`} onClick={() => setIntent("attend")}>
                  <span className="label">Asistir</span>
                  <span className="desc">Vengo a escuchar y conocer.</span>
                </button>
                <button type="button" className={`choice ${intent === "present" ? "active" : ""}`} onClick={() => setIntent("present")}>
                  <span className="label">Exponer</span>
                  <span className="desc">Quiero presentar un proyecto o experiencia.</span>
                </button>
              </div>
              <span className="err">{errors.intent}</span>
            </div>

            <div className={`expandable ${intent === "present" ? "open" : ""}`}>
              <div className="expandable-inner">
                <div className="field">
                  <label>Nombre del proyecto<span className="req">*</span></label>
                  <input value={data.project_name} onChange={(e) => update("project_name", e.target.value)} placeholder="Proyecto / experiencia" />
                  <span className="err">{errors.project_name}</span>
                </div>
                <div className="field">
                  <label>Sobre qué quieres hablar<span className="req">*</span></label>
                  <textarea value={data.project_pitch} onChange={(e) => update("project_pitch", e.target.value)} placeholder="Qué has construido o aprendido. Por qué crees que aporta. Qué tipo de conversación esperas generar." />
                  <span className="err">{errors.project_pitch}</span>
                </div>
                <div className="field">
                  <label>Contacto directo<span className="req">*</span></label>
                  <input value={data.contact} onChange={(e) => update("contact", e.target.value)} placeholder="Email · teléfono" />
                  <span className="err">{errors.contact}</span>
                </div>
              </div>
            </div>

            <div className="submit-row">
              <p className="note">Al enviar aceptas que tus datos sean tratados para gestionar la solicitud. Sin newsletter automática.</p>
              <button type="submit" className="btn">
                Enviar solicitud
                <span className="arrow">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* === FAQ === */
function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: "¿Cuánto cuesta asistir?", a: "Entre 10 y 20 € por sesión, según el espacio. El precio cubre alquiler del local, una bebida no alcohólica y la grabación de las ponencias para los asistentes." },
    { q: "¿Por qué hay que rellenar un formulario para asistir?", a: "Porque limitamos los aforos a 40–70 personas y revisamos manualmente cada solicitud. No es para ser exclusivos: es para que la sala mantenga el nivel de conversación que prometemos." },
    { q: "¿Cómo se eligen los ponentes?", a: "Recibimos propuestas a través del formulario. Un comité interno revisa cada una atendiendo a la temática del próximo evento, la madurez del proyecto y la capacidad de generar conversación." },
    { q: "¿Qué pasa si me aceptan y no puedo ir?", a: "Avísanos con 48h y trasladamos tu plaza al siguiente evento sin coste. Las cancelaciones tardías no se reembolsan." },
    { q: "¿Hay código de vestimenta?", a: "Business casual. Sin corbata pero sin chándal. Buscamos un ambiente profesional cómodo." },
    { q: "¿Se graban las sesiones?", a: "Las ponencias sí, con permiso de cada ponente. La parte de conversación posterior nunca se graba." },
  ];

  return (
    <section className="block" id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-num">IX — Preguntas frecuentes</div>
          <h2>Lo que más<br/>nos preguntan.</h2>
        </div>

        <div className="faq-list reveal">
          {items.map((it, i) => (
            <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="plus">+</span>
              </button>
              <div className="faq-a">
                <div style={{ paddingTop: 8 }}>{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Footer === */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand-mark">Sala 28</div>
          <p className="tagline">Encuentros de emprendimiento curados. Barcelona, desde 2026.</p>
        </div>
        <div>
          <h4>Sala</h4>
          <ul>
            <li><a href="#manifiesto">Manifiesto</a></li>
            <li><a href="#eventos">Próximos</a></li>
            <li><a href="#archivo">Archivo</a></li>
            <li><a href="#mentores">Mentores</a></li>
          </ul>
        </div>
        <div>
          <h4>Asistir</h4>
          <ul>
            <li><a href="#solicitar">Solicitar plaza</a></li>
            <li><a href="#faq">Preguntas frecuentes</a></li>
            <li><a href="#">Código de la sala</a></li>
          </ul>
        </div>
        <div>
          <h4>Síguenos</h4>
          <ul>
            <li><a href="#">Luma →</a></li>
            <li><a href="#">LinkedIn →</a></li>
            <li><a href="#">Instagram →</a></li>
            <li><a href="mailto:hola@sala28.es">hola@sala28.es</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© MMXXVI · Sala 28 · Barcelona</div>
        <div>Política de privacidad · Términos</div>
      </div>
    </footer>
  );
}

window.ApplicationForm = ApplicationForm;
window.FAQ = FAQ;
window.Footer = Footer;
