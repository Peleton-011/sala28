<script setup lang="ts">
const heroRef = ref<HTMLElement | null>(null)
const progress = ref(0)

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

const phaseAla = computed(() =>
  easeOut(Math.max(0, Math.min(1, (progress.value - 0.30) / 0.40)))
)
const phaseFade = computed(() =>
  easeOut(Math.max(0, Math.min(1, (progress.value - 0.72) / 0.28)))
)

const heroLogoOpacity = computed(() => 1 - phaseFade.value)
const wmOpacity = computed(() => phaseFade.value >= 0.98 ? 0.14 : 0)

const alaStyle = computed(() => ({
  width: `${phaseAla.value * 1.05}em`,
  opacity: phaseAla.value,
  filter: phaseAla.value < 1 ? `blur(${(1 - phaseAla.value) * 4}px)` : 'none',
}))

const alaInnerStyle = computed(() => ({
  transform: `translateY(${(1 - phaseAla.value) * 16}px)`,
}))

const onScroll = () => {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  const total = heroRef.value.offsetHeight - window.innerHeight
  const scrolled = -rect.top
  progress.value = Math.max(0, Math.min(1, scrolled / total))
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!-- Hidden SVG filters for watermark effect -->
  <svg width="0" height="0" style="position: absolute;" aria-hidden="true">
    <defs>
      <filter id="wm-dissolve" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
        <feColorMatrix in="noise" type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 2.5 -0.8" result="grain" />
        <feComposite in="SourceGraphic" in2="grain" operator="in" />
      </filter>
    </defs>
  </svg>

  <section ref="heroRef" class="hero" :aria-hidden="progress >= 1">
    <div class="hero-sticky">
      <div
        class="hero-logo"
        :style="{ opacity: heroLogoOpacity, transition: 'none' }"
      >
        <span class="logo-S">S</span>
        <span class="logo-ala" :style="alaStyle">
          <span class="logo-ala-inner" :style="alaInnerStyle">ala</span>
        </span>
        <span class="logo-28">28</span>
      </div>

      <div class="hero-tag" :style="{ opacity: Math.max(0, 1 - phaseFade * 1.4) }">
        <div>
          <div>Barcelona · Est. MMXXVI</div>
          <div style="margin-top: 6px; color: var(--ink-soft);">Networking de emprendimiento curado</div>
        </div>
        <div class="scroll-cue">Desliza</div>
      </div>
    </div>
  </section>

  <!-- Watermark: appears after logo fades, grain-filtered -->
  <div
    class="hero-watermark"
    aria-hidden="true"
    :style="{ opacity: wmOpacity }"
  >
    <div class="hero-logo wm">
      <span class="logo-S">S</span>
      <span class="logo-ala" style="width: 1.05em; opacity: 1;">
        <span class="logo-ala-inner">ala</span>
      </span>
      <span class="logo-28">28</span>
    </div>
  </div>
</template>
