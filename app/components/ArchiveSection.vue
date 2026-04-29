<script setup lang="ts">
import { archivedEvents } from '~/data'
</script>

<template>
  <section class="block" id="archivo">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">V — Archivo</div>
        <h2>Lo que pasó<br>en sesiones<br>anteriores.</h2>
      </div>

      <div class="archive-list reveal">
        <div v-for="(item, i) in archivedEvents" :key="i" class="archive-row">
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
