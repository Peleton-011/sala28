<script setup lang="ts">
interface Event {
  date: string
  time: string
  title: string
  topic: string
  city: string
  status: string
  statusKind: 'open' | 'full'
  speakers: string
  image?: string
}

const events: Event[] = [
  {
    date: '07.05.2026',
    time: '19:30',
    title: 'Capital paciente',
    topic: 'Levantar rondas sin perder dirección. Tres fundadores comparten cómo eligieron sus inversores.',
    city: 'Barcelona · Cafè de l\'Òpera',
    status: 'Plazas abiertas',
    statusKind: 'open',
    speakers: 'M. Aranda · J. Iturralde · L. Carmona',
  },
  {
    date: '21.05.2026',
    time: '20:00',
    title: 'Producto antes que marca',
    topic: 'Dos B2B y un consumer hablan de cuándo vale la pena invertir en branding y cuándo es un atajo a la quiebra.',
    city: 'Barcelona · Espai Bonnemaison',
    status: 'Lista de espera',
    statusKind: 'full',
    speakers: 'P. Velasco · I. Hoyos',
  },
  {
    date: '11.06.2026',
    time: '19:30',
    title: 'Hiring antes de PMF',
    topic: 'Cómo se construye un equipo de ocho personas cuando todavía estás validando. Conversación abierta.',
    city: 'Por confirmar',
    status: 'Solicitud previa',
    statusKind: 'open',
    speakers: 'Ponentes en selección',
  },
]
</script>

<template>
  <section class="block alt" id="eventos">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">IV — Próximos encuentros</div>
        <h2>Tres sesiones<br>en agenda.</h2>
      </div>

      <div class="events-grid reveal">
        <article v-for="(event, i) in events" :key="i" class="event-card">
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
