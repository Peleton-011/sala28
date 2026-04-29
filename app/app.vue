<script setup lang="ts">
const { public: { plausibleDomain } } = useRuntimeConfig()

if (plausibleDomain) {
  useHead({
    script: [{
      defer: true,
      'data-domain': plausibleDomain,
      src: 'https://plausible.io/js/script.js',
    }],
  })
}
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </UApp>
</template>
