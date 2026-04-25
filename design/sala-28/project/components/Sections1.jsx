/* global React */
const { useState, useEffect, useRef } = React;

/* === Manifiesto === */
function Manifesto() {
  return (
    <section className="block" id="manifiesto">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-num">I — Manifiesto</div>
          <h2>Una sala<br/>donde se<br/>habla de negocio.</h2>
        </div>

        <div className="manifest-grid">
          <div></div>
          <p className="lead reveal">
            Sala 28 reúne a entre cuarenta y setenta emprendedores en encuentros de noventa minutos.
            Sin barra abierta, sin networking de feria. Dos a cinco ponencias, una temática clara, y la
            promesa de que sales habiendo aprendido algo y conociendo a alguien.
          </p>

          <div className="pillars">
            <div className="pillar reveal">
              <span className="num">01 / Visión</span>
              <h3>Lo opuesto al ruido.</h3>
              <p>Recuperar la conversación profesional. Un espacio donde lo que se dice importa más que el cóctel que se sirve.</p>
            </div>
            <div className="pillar reveal">
              <span className="num">02 / Misión</span>
              <h3>Encuentros con criterio.</h3>
              <p>Curamos cada lista de asistentes y cada ponencia. Aceptamos en función del proyecto, no del ticket.</p>
            </div>
            <div className="pillar reveal">
              <span className="num">03 / Valores</span>
              <h3>Sustancia, no postureo.</h3>
              <p>+24 años. Business casual. Diez a veinte euros. Lo que pagas cubre el espacio, no la performance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Diferenciador === */
function Differentiator() {
  const rows = [
    ["Networking abierto, lista de 300", "Lista curada, 40–70 personas"],
    ["Bebidas y música alta", "Ambiente de café, conversación posible"],
    ["Cualquiera puede ponerse a vender", "Ponentes seleccionados con formulario"],
    ["Sales con tarjetas, no con ideas", "Sales con un contacto y un aprendizaje"],
    ["Eventos genéricos", "Cada sesión con temática anunciada"],
    ["Entrada gratuita, calidad incierta", "10–20 €. Cuesta lo justo para que importe"],
  ];

  return (
    <section className="block alt" id="diferencial">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-num">II — Por qué somos distintos</div>
          <h2>Lo que<br/>no somos<br/>también define.</h2>
        </div>

        <div className="diff-table reveal">
          <div className="diff-cell" style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-mute)", borderBottom: "1px solid var(--rule)" }}>
            Otros eventos de emprendimiento
          </div>
          <div className="diff-cell" style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", borderLeft: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
            Sala 28
          </div>
          {rows.map(([a, b], i) => (
            <div className="diff-row" key={i}>
              <div className="diff-cell left">{a}</div>
              <div className="diff-cell right">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Cómo funciona === */
function HowItWorks() {
  const steps = [
    { n: "I", title: "Solicitas", desc: "Rellenas el formulario con tu perfil. Si quieres exponer, añades tu propuesta." },
    { n: "II", title: "Revisamos", desc: "Cada solicitud pasa por un comité. Confirmamos en menos de cinco días." },
    { n: "III", title: "Asistes", desc: "Recibes la convocatoria con la temática, los ponentes y el lugar." },
    { n: "IV", title: "Continúa", desc: "Te incorporamos al directorio interno. Acceso a futuros eventos y mentores." },
  ];

  return (
    <section className="block" id="proceso">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-num">III — Cómo funciona</div>
          <h2>Cuatro pasos<br/>desde el interés<br/>al asiento.</h2>
        </div>

        <div className="how-grid reveal">
          {steps.map((s) => (
            <div className="how-step" key={s.n}>
              <span className="step-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Manifesto = Manifesto;
window.Differentiator = Differentiator;
window.HowItWorks = HowItWorks;
