<script setup lang="ts">
const turbulenceRef = ref<SVGFETurbulenceElement | null>(null)
let rafId = 0
let tick = 0

const animate = () => {
  tick++
  // Update seed every 3 frames (~20 fps) — makes grain feel alive without burning CPU
  if (tick % 3 === 0) {
    turbulenceRef.value?.setAttribute('seed', String(Math.floor(Math.random() * 999) + 1))
  }
  rafId = requestAnimationFrame(animate)
}

onMounted(() => { animate() })
onUnmounted(() => { cancelAnimationFrame(rafId) })
</script>

<template>
  <div class="grain" aria-hidden="true">
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style="display: block;"
    >
      <filter
        id="grain-filter"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        color-interpolation-filters="sRGB"
      >
        <feTurbulence
          ref="turbulenceRef"
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
          seed="1"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  </div>
</template>
