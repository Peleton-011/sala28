/* global React, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSlider, TweakSelect */
const { useEffect } = React;

const SALA_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "vainilla",
  "theme": "light",
  "grain": 25,
  "displayFont": "cormorant",
  "accent": "carmesi"
}/*EDITMODE-END*/;

const PALETTES = {
  vainilla: { bg: "#f0e8d6", bgSoft: "#e8dfc9", ink: "#1a1410", inkSoft: "#4a3f35", inkMute: "#7a6f63" },
  hueso:    { bg: "#f5f1ea", bgSoft: "#ece6db", ink: "#15130f", inkSoft: "#3e3a32", inkMute: "#7e7868" },
  alabastro:{ bg: "#eeeae2", bgSoft: "#e3ddd0", ink: "#0f0e0c", inkSoft: "#3a3631", inkMute: "#7a7368" },
};
const PALETTES_DARK = {
  vainilla: { bg: "#14100c", bgSoft: "#1d1813", ink: "#f0e8d6", inkSoft: "#c8bfae", inkMute: "#877d6f" },
  hueso:    { bg: "#11100d", bgSoft: "#1a1814", ink: "#f5f1ea", inkSoft: "#d2cab9", inkMute: "#8a8270" },
  alabastro:{ bg: "#0e0d0b", bgSoft: "#181612", ink: "#eeeae2", inkSoft: "#cbc4b3", inkMute: "#857c6f" },
};

const ACCENTS = {
  carmesi:  { light: "#7a1f2b", dark: "#c4485a" },
  oxido:    { light: "#a14a1c", dark: "#d3833f" },
  oliva:    { light: "#5b6230", dark: "#9aa364" },
  sin:      { light: "#1a1410", dark: "#f0e8d6" },
};

const FONTS = {
  cormorant:  '"Cormorant Garamond", Georgia, serif',
  cormorant2: '"Cormorant", Georgia, serif',
  garamond:   '"EB Garamond", Georgia, serif',
  playfair:   '"Playfair Display", Georgia, serif',
  italiana:   '"Italiana", Georgia, serif',
  dmserif:    '"DM Serif Display", Georgia, serif',
  georgia:    'Georgia, "Times New Roman", serif',
};

function applyTweaks(t) {
  const root = document.documentElement;
  const theme = t.theme === "dark" ? "dark" : "light";
  root.setAttribute("data-theme", theme);

  const pal = (theme === "dark" ? PALETTES_DARK : PALETTES)[t.palette] || PALETTES.vainilla;
  root.style.setProperty("--bg", pal.bg);
  root.style.setProperty("--bg-soft", pal.bgSoft);
  root.style.setProperty("--ink", pal.ink);
  root.style.setProperty("--ink-soft", pal.inkSoft);
  root.style.setProperty("--ink-mute", pal.inkMute);

  const isDark = theme === "dark";
  const ruleAlpha = isDark ? "240, 232, 214" : "26, 20, 16";
  root.style.setProperty("--rule", `rgba(${ruleAlpha}, 0.18)`);
  root.style.setProperty("--rule-soft", `rgba(${ruleAlpha}, 0.08)`);

  const acc = ACCENTS[t.accent] || ACCENTS.carmesi;
  const accColor = isDark ? acc.dark : acc.light;
  root.style.setProperty("--accent", accColor);
  // hex -> rgba
  const hex = accColor.replace("#", "");
  const r = parseInt(hex.substr(0,2),16), g = parseInt(hex.substr(2,2),16), b = parseInt(hex.substr(4,2),16);
  root.style.setProperty("--accent-soft", `rgba(${r},${g},${b},0.14)`);

  root.style.setProperty("--grain-opacity", String(t.grain / 100));

  const font = FONTS[t.displayFont] || FONTS.cormorant;
  root.style.setProperty("--display", font);
}

function Tweaks() {
  const [tweaks, setTweak] = useTweaks(SALA_DEFAULTS);

  useEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks · Sala 28">
      <TweakSection title="Modo">
        <TweakRadio
          value={tweaks.theme}
          onChange={(v) => setTweak("theme", v)}
          options={[
            { label: "Claro", value: "light" },
            { label: "Oscuro", value: "dark" },
          ]}
        />
      </TweakSection>

      <TweakSection title="Paleta">
        <TweakRadio
          value={tweaks.palette}
          onChange={(v) => setTweak("palette", v)}
          options={[
            { label: "Vainilla", value: "vainilla" },
            { label: "Hueso", value: "hueso" },
            { label: "Alabastro", value: "alabastro" },
          ]}
        />
      </TweakSection>

      <TweakSection title="Acento">
        <TweakRadio
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v)}
          options={[
            { label: "Carmesí", value: "carmesi" },
            { label: "Óxido", value: "oxido" },
            { label: "Oliva", value: "oliva" },
            { label: "Sin acento", value: "sin" },
          ]}
        />
      </TweakSection>

      <TweakSection title="Tipografía display">
        <TweakSelect
          value={tweaks.displayFont}
          onChange={(v) => setTweak("displayFont", v)}
          options={[
            { label: "Cormorant Garamond", value: "cormorant" },
            { label: "Cormorant (más estrecha)", value: "cormorant2" },
            { label: "EB Garamond", value: "garamond" },
            { label: "Playfair Display", value: "playfair" },
            { label: "Italiana", value: "italiana" },
            { label: "DM Serif Display", value: "dmserif" },
            { label: "Georgia", value: "georgia" },
          ]}
        />
      </TweakSection>

      <TweakSection title="Intensidad del grano">
        <TweakSlider
          value={tweaks.grain}
          min={0} max={100} step={5}
          onChange={(v) => setTweak("grain", v)}
          format={(v) => `${v}%`}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

window.SalaTweaks = Tweaks;
