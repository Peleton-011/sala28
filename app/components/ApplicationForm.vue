<script setup lang="ts">
type Intent = 'attend' | 'present' | ''

interface FormData {
  name: string
  birth: string
  profession: string
  email: string
  linkedin: string
  interest: string
  project_name: string
  project_pitch: string
  contact: string
}

interface FormErrors {
  name?: string
  birth?: string
  profession?: string
  email?: string
  interest?: string
  intent?: string
  project_name?: string
  project_pitch?: string
  contact?: string
}

const intent = ref<Intent>('')
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')
const _hp = ref('')

const data = reactive<FormData>({
  name: '',
  birth: '',
  profession: '',
  email: '',
  linkedin: '',
  interest: '',
  project_name: '',
  project_pitch: '',
  contact: '',
})

const errors = reactive<FormErrors>({})

const clearErrors = () => {
  Object.keys(errors).forEach((k) => delete (errors as Record<string, string>)[k])
}

const validate = (): boolean => {
  clearErrors()
  const e: FormErrors = {}

  if (!data.name.trim()) e.name = 'Requerido'
  if (!data.birth) {
    e.birth = 'Requerido'
  } else {
    const age = (Date.now() - new Date(data.birth).getTime()) / (365.25 * 24 * 3600 * 1000)
    if (age < 24) e.birth = 'Eventos restringidos a +24 años'
  }
  if (!data.profession.trim()) e.profession = 'Requerido'
  if (!data.email.trim()) {
    e.email = 'Requerido'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    e.email = 'Email inválido'
  }
  if (!data.interest.trim()) e.interest = 'Cuéntanos en una línea'
  if (!intent.value) e.intent = 'Selecciona una opción'
  if (intent.value === 'present') {
    if (!data.project_name.trim()) e.project_name = 'Requerido'
    if (!data.project_pitch.trim() || data.project_pitch.length < 80) e.project_pitch = 'Mínimo 80 caracteres'
    if (!data.contact.trim()) e.contact = 'Requerido para ponentes'
  }

  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

const submit = async () => {
  if (!validate()) return
  submitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/apply', {
      method: 'POST',
      body: { ...data, intent: intent.value, _hp: _hp.value },
    })
    submitted.value = true
  } catch (err: unknown) {
    const e = err as { data?: { errors?: Record<string, string> }; message?: string }
    if (e?.data?.errors) {
      Object.assign(errors, e.data.errors)
    } else {
      submitError.value = e?.message ?? 'Error al enviar la solicitud. Inténtalo de nuevo.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="block alt" id="solicitar">
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-num">VIII — Solicitud</div>
        <h2>Solicita<br>tu plaza.</h2>
      </div>

      <!-- Success state -->
      <template v-if="submitted">
        <div class="success" style="max-width: 640px; margin: 0 auto;">
          <h3>Tu solicitud está en revisión.</h3>
          <p style="margin: 0 auto; color: var(--ink-soft);">
            Revisamos cada solicitud manualmente. Nos pondremos en contacto contigo
            en los próximos días si hay un sitio para ti.
          </p>
        </div>
      </template>

      <!-- Form -->
      <template v-else>
        <div class="form-wrap">
          <aside class="form-side reveal">
            <div class="lead">No es exclusión, es coherencia.</div>
            <p>Cada solicitud se revisa manualmente. Aceptamos perfiles que aporten al resto y se enriquezcan del resto.</p>
            <p style="margin-top: 24px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute);">
              Tiempo estimado<br>
              <span style="color: var(--ink); font-size: 14px; letter-spacing: 0; text-transform: none; font-family: var(--serif);">3 a 5 minutos</span>
            </p>
          </aside>

          <form class="reveal" novalidate @submit.prevent="submit">
            <!-- Honeypot: invisible to humans, filled by bots -->
            <input v-model="_hp" type="text" name="website" tabindex="-1" aria-hidden="true" autocomplete="off" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none">
            <div class="field">
              <label>Nombre completo<span class="req">*</span></label>
              <input v-model="data.name" placeholder="María García">
              <span class="err">{{ errors.name }}</span>
            </div>

            <div class="field-row">
              <div class="field">
                <label>Fecha de nacimiento<span class="req">*</span></label>
                <input v-model="data.birth" type="date">
                <span class="err">{{ errors.birth }}</span>
              </div>
              <div class="field">
                <label>Profesión<span class="req">*</span></label>
                <input v-model="data.profession" placeholder="Co-fundadora, Producto">
                <span class="err">{{ errors.profession }}</span>
              </div>
            </div>

            <div class="field">
              <label>Email<span class="req">*</span></label>
              <input v-model="data.email" type="email" placeholder="tu@email.com">
              <span class="err">{{ errors.email }}</span>
            </div>

            <div class="field">
              <label>LinkedIn (opcional)</label>
              <input v-model="data.linkedin" placeholder="linkedin.com/in/…">
              <span class="err" />
            </div>

            <div class="field">
              <label>En una línea, ¿qué te trae?<span class="req">*</span></label>
              <input v-model="data.interest" placeholder="Estoy levantando ronda y me interesa la temática de capital paciente">
              <span class="err">{{ errors.interest }}</span>
            </div>

            <div class="field">
              <label>Tu intención<span class="req">*</span></label>
              <div class="choice-group">
                <button
                  type="button"
                  :class="['choice', intent === 'attend' ? 'active' : '']"
                  @click="intent = 'attend'"
                >
                  <span class="label">Asistir</span>
                  <span class="desc">Vengo a escuchar y conocer.</span>
                </button>
                <button
                  type="button"
                  :class="['choice', intent === 'present' ? 'active' : '']"
                  @click="intent = 'present'"
                >
                  <span class="label">Exponer</span>
                  <span class="desc">Quiero presentar un proyecto o experiencia.</span>
                </button>
              </div>
              <span class="err">{{ errors.intent }}</span>
            </div>

            <!-- Expandable section for presenters -->
            <div :class="['expandable', intent === 'present' ? 'open' : '']">
              <div class="expandable-inner">
                <div class="field">
                  <label>Nombre del proyecto<span class="req">*</span></label>
                  <input v-model="data.project_name" placeholder="Proyecto / experiencia">
                  <span class="err">{{ errors.project_name }}</span>
                </div>
                <div class="field">
                  <label>Sobre qué quieres hablar<span class="req">*</span></label>
                  <textarea
                    v-model="data.project_pitch"
                    placeholder="Qué has construido o aprendido. Por qué crees que aporta. Qué tipo de conversación esperas generar."
                  />
                  <span class="err">{{ errors.project_pitch }}</span>
                </div>
                <div class="field">
                  <label>Contacto directo<span class="req">*</span></label>
                  <input v-model="data.contact" placeholder="Email · teléfono">
                  <span class="err">{{ errors.contact }}</span>
                </div>
              </div>
            </div>

            <div class="submit-row">
              <p v-if="submitError" class="err" style="margin-bottom: 12px">{{ submitError }}</p>
              <p class="note">Al enviar aceptas que tus datos sean tratados para gestionar la solicitud. Sin newsletter automática.</p>
              <button type="submit" class="btn" :disabled="submitting">
                {{ submitting ? 'Enviando…' : 'Enviar solicitud' }}
                <span v-if="!submitting" class="arrow">→</span>
              </button>
            </div>
          </form>
        </div>
      </template>
    </div>
  </section>
</template>
