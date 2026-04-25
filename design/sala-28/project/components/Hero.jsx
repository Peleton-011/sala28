/* global React */
const { useState, useEffect, useRef } = React;

/* ================================================================
   HERO — Animación scroll-driven
   Fase 1 (0–40%): "S28" junto en el centro → se abre hueco
   Fase 2 (35–70%): aparece "ala" en el hueco → forma "Sala28"
   Fase 3 (70–100%): "Sala28" se atenúa y queda como marca de agua
   ================================================================ */
function Hero() {
  const heroRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const total = heroRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const phaseAla  = ease(Math.max(0, Math.min(1, (progress - 0.30) / 0.40)));
  const phaseFade = ease(Math.max(0, Math.min(1, (progress - 0.72) / 0.28)));

  // El "ala" se expande progresivamente entre la S y el 28.
  const alaW = phaseAla;

  // Estado final: el logo activo se desvanece SIN cambiar de tamaño.
  // El watermark solo aparece cuando phaseFade alcanza el final, evitando
  // el solapamiento de dos versiones del texto a tamaños distintos.
  const heroLogoOpacity = 1 - phaseFade;          // 1 → 0
  const wmOpacity = phaseFade >= 0.98 ? 0.14 : 0; // aparece bruscamente al final, sutil

  return (
    <>
      {/* Filtro SVG para "grainificar" el watermark */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="wm-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
          <feComposite in2="SourceGraphic" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>
        <filter id="wm-dissolve">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </svg>

      <section className="hero" ref={heroRef} aria-hidden={progress >= 1}>
        <div className="hero-sticky">
          <div
            className="hero-logo"
            style={{
              opacity: heroLogoOpacity,
              color: "var(--ink)",
              transition: "none",
            }}
          >
            <span className="logo-S">S</span>
            <span
              className="logo-ala"
              style={{
                width: `${alaW * 1.05}em`,
                opacity: alaW,
                filter: alaW < 1 ? `blur(${(1 - alaW) * 4}px)` : "none",
              }}
            >
              <span
                className="logo-ala-inner"
                style={{ transform: `translateY(${(1 - alaW) * 16}px)` }}
              >ala</span>
            </span>
            <span className="logo-28">28</span>
          </div>

          <div className="hero-tag" style={{ opacity: 1 - phaseFade * 1.4 }}>
            <div>
              <div>Barcelona · Est. MMXXVI</div>
              <div style={{ marginTop: 6, color: "var(--ink-soft)" }}>Networking de emprendimiento curado</div>
            </div>
            <div className="scroll-cue">Desliza</div>
          </div>
        </div>
      </section>

      {/* Marca de agua: aparece al terminar el fade, mismo tamaño exacto, grainificada */}
      <div
        className="hero-watermark"
        aria-hidden="true"
        style={{ opacity: wmOpacity }}
      >
        <div className="hero-logo wm">
          <span className="logo-S">S</span>
          <span className="logo-ala" style={{ width: "1.05em", opacity: 1 }}>
            <span className="logo-ala-inner">ala</span>
          </span>
          <span className="logo-28">28</span>
        </div>
      </div>
    </>
  );
}

window.Hero = Hero;
