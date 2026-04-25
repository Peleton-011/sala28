<script setup lang="ts">
import { howItWorksSteps } from '~/data'
</script>

<template>
  <section class="block" id="proceso">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">III — Cómo funciona</div>
        <h2>Cuatro pasos<br>desde el interés<br>al asiento.</h2>
      </div>

      <div class="how-grid reveal">
        <div v-for="step in howItWorksSteps" :key="step.n" class="how-step">
          <span class="step-num">{{ step.n }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
