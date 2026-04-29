<script setup lang="ts">
import { faqItems } from '~/data'

const openIndex = ref<number>(-1)

const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <section class="block" id="faq">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">IX — Preguntas frecuentes</div>
        <h2>Lo que más<br>nos preguntan.</h2>
      </div>

      <div class="faq-list reveal">
        <div
          v-for="(item, i) in faqItems"
          :key="i"
          :class="['faq-item', openIndex === i ? 'open' : '']"
        >
          <button class="faq-q" @click="toggle(i)">
            <span>{{ item.q }}</span>
            <span class="plus">+</span>
          </button>
          <div class="faq-a">
            <div style="padding-top: 8px;">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
