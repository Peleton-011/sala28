<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

const paint = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = w
  canvas.height = h

  const ctx = canvas.getContext('2d')!

  // Render at half resolution so bilinear upscaling softens each grain point
  // from a harsh 1px pixel into an organic ~2px halo — the key difference
  // between TV static and actual film grain.
  const rw = Math.ceil(w * 0.5)
  const rh = Math.ceil(h * 0.5)

  const tmp = document.createElement('canvas')
  tmp.width = rw
  tmp.height = rh

  const tc = tmp.getContext('2d')!
  const img = tc.createImageData(rw, rh)
  const d = img.data

  for (let i = 0; i < d.length; i += 4) {
    if (Math.random() < 0.28) {
      // sqrt distribution biases alpha toward mid-high values:
      // most grains are visible but varied, matching real photographic grain
      d[i + 3] = Math.floor(Math.sqrt(Math.random()) * 145)
    }
    // R, G, B stay 0 (black pixels — CSS inverts to white in dark mode)
  }

  tc.putImageData(img, 0, 0)

  // Upscale 2× with smooth interpolation → soft grain edges
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(tmp, 0, 0, w, h)
}

onMounted(() => {
  paint()
  window.addEventListener('resize', paint)
})

onUnmounted(() => {
  window.removeEventListener('resize', paint)
})
</script>

<template>
  <canvas ref="canvasRef" class="grain" aria-hidden="true" />
</template>
