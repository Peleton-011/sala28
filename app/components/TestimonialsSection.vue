<script setup lang="ts">
const testimonials = [
  {
    quote: 'Es el primer evento al que voy donde nadie reparte tarjetas. Hablamos de números reales durante una hora y salí con dos reuniones de seguimiento.',
    name: 'Marta Aranda',
    role: 'Co-fundadora · Plataforma logística B2B',
  },
  {
    quote: 'El nivel de las preguntas marca la diferencia. La gente viene preparada porque ha leído la temática del día. No se siente como una sala de fiesta disfrazada.',
    name: 'Javier Iturralde',
    role: 'Fundador · Health-tech',
  },
]
</script>

<template>
  <section class="block alt" id="testimonios">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">VI — Lo que dicen</div>
        <h2>Voces de<br>la sala.</h2>
      </div>

      <div class="testimonial-track reveal">
        <div v-for="(t, i) in testimonials" :key="i" class="testimonial">
          <blockquote>"{{ t.quote }}"</blockquote>
          <div class="author">
            <div class="avatar" />
            <div>
              <div class="name">{{ t.name }}</div>
              <div>{{ t.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
