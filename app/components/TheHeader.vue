<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="site-header">
    <a href="#" class="mark">Sala 28</a>
    <nav>
      <a href="#manifiesto">Manifiesto</a>
      <a href="#eventos">Eventos</a>
      <a href="#solicitar">Solicitar</a>
      <button class="theme-btn" :aria-label="colorMode.value === 'dark' ? 'Modo claro' : 'Modo oscuro'" @click="toggleTheme">
        {{ colorMode.value === 'dark' ? '○' : '●' }}
      </button>
    </nav>
  </header>
</template>
