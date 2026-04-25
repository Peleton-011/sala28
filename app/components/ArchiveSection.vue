<script setup lang="ts">
const past = [
  { num: 'Nº 11', date: '12.03.2026', title: 'Pricing como producto', topic: 'B2B SaaS · packaging y elasticidad', count: '62 asistentes' },
  { num: 'Nº 10', date: '26.02.2026', title: 'Vender antes de tener', topic: 'Pre-ventas, MVPs, deuda de promesas', count: '58 asistentes' },
  { num: 'Nº 09', date: '29.01.2026', title: 'Internacionalización temprana', topic: 'Cuándo cruzar y cómo', count: '67 asistentes' },
  { num: 'Nº 08', date: '11.12.2025', title: 'Equipo fundador', topic: 'Reparto, conflictos, salidas', count: '54 asistentes' },
  { num: 'Nº 07', date: '20.11.2025', title: 'Distribución sin presupuesto', topic: 'Canales orgánicos para B2B', count: '61 asistentes' },
  { num: 'Nº 06', date: '30.10.2025', title: 'El primer hire', topic: 'Cómo elegir, qué pagar', count: '46 asistentes' },
]
</script>

<template>
  <section class="block" id="archivo">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">V — Archivo</div>
        <h2>Lo que pasó<br>en sesiones<br>anteriores.</h2>
      </div>

      <div class="archive-list reveal">
        <div v-for="(item, i) in past" :key="i" class="archive-row">
          <div class="num">{{ item.num }}</div>
          <div class="date">{{ item.date }}</div>
          <div class="title">{{ item.title }}</div>
          <div class="topic">{{ item.topic }}</div>
          <div class="count">{{ item.count }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
