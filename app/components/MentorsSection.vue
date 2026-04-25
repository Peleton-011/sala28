<script setup lang="ts">
import { mentors } from '~/data'
</script>

<template>
  <section class="block" id="mentores">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">VII — Mentores</div>
        <h2>Cuatro perfiles<br>de acceso<br>continuo.</h2>
      </div>

      <p class="reveal" style="font-size: 16px; color: var(--ink-soft); margin-bottom: 56px; max-width: 60ch;">
        Disponible solo para socios anuales. Una sesión mensual de cuarenta y cinco minutos por mentor, agendable a través del directorio interno.
      </p>

      <div class="mentors-grid reveal">
        <div v-for="(mentor, i) in mentors" :key="i" class="mentor">
          <div class="portrait" />
          <div class="role">{{ mentor.role }}</div>
          <div class="name">{{ mentor.name }}</div>
          <p class="bio">{{ mentor.bio }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
