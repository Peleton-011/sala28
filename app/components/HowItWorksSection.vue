<script setup lang="ts">
const steps = [
  { n: 'I', title: 'Solicitas', desc: 'Rellenas el formulario con tu perfil. Si quieres exponer, añades tu propuesta.' },
  { n: 'II', title: 'Revisamos', desc: 'Cada solicitud pasa por un comité. Confirmamos en menos de cinco días.' },
  { n: 'III', title: 'Asistes', desc: 'Recibes la convocatoria con la temática, los ponentes y el lugar.' },
  { n: 'IV', title: 'Continúa', desc: 'Te incorporamos al directorio interno. Acceso a futuros eventos y mentores.' },
]
</script>

<template>
  <section class="block" id="proceso">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">III — Cómo funciona</div>
        <h2>Cuatro pasos<br>desde el interés<br>al asiento.</h2>
      </div>

      <div class="how-grid reveal">
        <div v-for="step in steps" :key="step.n" class="how-step">
          <span class="step-num">{{ step.n }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
