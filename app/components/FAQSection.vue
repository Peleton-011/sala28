<script setup lang="ts">
const openIndex = ref<number>(-1)

const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? -1 : i
}

const items = [
  { q: '¿Cuánto cuesta asistir?', a: 'Entre 10 y 20 € por sesión, según el espacio. El precio cubre alquiler del local, una bebida no alcohólica y la grabación de las ponencias para los asistentes.' },
  { q: '¿Por qué hay que rellenar un formulario para asistir?', a: 'Porque limitamos los aforos a 40–70 personas y revisamos manualmente cada solicitud. No es para ser exclusivos: es para que la sala mantenga el nivel de conversación que prometemos.' },
  { q: '¿Cómo se eligen los ponentes?', a: 'Recibimos propuestas a través del formulario. Un comité interno revisa cada una atendiendo a la temática del próximo evento, la madurez del proyecto y la capacidad de generar conversación.' },
  { q: '¿Qué pasa si me aceptan y no puedo ir?', a: 'Avísanos con 48h y trasladamos tu plaza al siguiente evento sin coste. Las cancelaciones tardías no se reembolsan.' },
  { q: '¿Hay código de vestimenta?', a: 'Business casual. Sin corbata pero sin chándal. Buscamos un ambiente profesional cómodo.' },
  { q: '¿Se graban las sesiones?', a: 'Las ponencias sí, con permiso de cada ponente. La parte de conversación posterior nunca se graba.' },
]
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
          v-for="(item, i) in items"
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
