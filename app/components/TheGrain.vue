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
  const img = ctx.createImageData(w, h)
  const data = img.data

  for (let i = 0; i < data.length; i += 4) {
    // Sparse black pixels — ~38% coverage, varying intensity
    if (Math.random() < 0.38) {
      data[i + 3] = Math.floor(Math.random() * 180)
    }
    // data[i], [i+1], [i+2] stay 0 (black) — inverted to white in dark mode via CSS
  }

  ctx.putImageData(img, 0, 0)
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
