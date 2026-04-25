<script setup lang="ts">
import { upcomingEvents } from '~/data'
</script>

<template>
  <section class="block alt" id="eventos">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">IV — Próximos encuentros</div>
        <h2>Tres sesiones<br>en agenda.</h2>
      </div>

      <div class="events-grid reveal">
        <article v-for="(event, i) in upcomingEvents" :key="i" class="event-card">
          <div class="meta">
            <span>{{ event.date }} · {{ event.time }}</span>
            <span :class="['status', event.statusKind === 'full' ? 'full' : '']">{{ event.status }}</span>
          </div>
          <div v-if="event.image" class="image-slot">
            <img :src="event.image" :alt="event.title" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div v-else class="image-slot">[ fotografía del evento ]</div>
          <h3>{{ event.title }}</h3>
          <p style="font-size: 14px; color: var(--ink-soft);">{{ event.topic }}</p>
          <div class="speakers">
            <span class="label">{{ event.city }}</span>
            {{ event.speakers }}
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
