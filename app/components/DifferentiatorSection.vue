<script setup lang="ts">
import { diffRows } from '~/data'
</script>

<template>
  <section class="block alt" id="diferencial">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">II — Por qué somos distintos</div>
        <h2>Lo que<br>no somos<br>también define.</h2>
      </div>

      <div class="diff-table reveal">
        <div
          class="diff-cell"
          style="font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-mute); border-bottom: 1px solid var(--rule);"
        >
          Otros eventos de emprendimiento
        </div>
        <div
          class="diff-cell"
          style="font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); border-left: 1px solid var(--rule); border-bottom: 1px solid var(--rule);"
        >
          Sala 28
        </div>
        <template v-for="(row, i) in diffRows" :key="i">
          <div class="diff-row">
            <div class="diff-cell left">{{ row.left }}</div>
            <div class="diff-cell right">{{ row.right }}</div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
