<script setup lang="ts">
import { testimonials } from '~/data'
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
