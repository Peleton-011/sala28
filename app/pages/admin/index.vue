<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' })

interface Application {
  id: string
  created_at: string
  name: string
  birth_date: string
  profession: string
  email: string
  linkedin: string | null
  interest: string
  intent: 'attend' | 'present'
  project_name: string | null
  project_pitch: string | null
  contact: string | null
  status: 'pending' | 'accepted' | 'rejected'
  notes: string | null
}

interface Comment {
  id: string
  created_at: string
  application_id: string
  author: string
  body: string
}

const getHeaders = () => ({
  Authorization: `Bearer ${sessionStorage.getItem('admin_token') ?? ''}`,
})

const apps = ref<Application[]>([])
const loading = ref(true)
const fetchError = ref('')
const activeStatus = ref('pending')
const activeIntent = ref('all')
const hoveredId = ref<string | null>(null)
const detail = ref<Application | null>(null)
const comments = ref<Comment[]>([])
const loadingComments = ref(false)
const newComment = ref('')
const newAuthor = ref('')
const postingComment = ref(false)

const filtered = computed(() =>
  apps.value.filter(
    (a) =>
      (activeStatus.value === 'all' || a.status === activeStatus.value) &&
      (activeIntent.value === 'all' || a.intent === activeIntent.value),
  ),
)

const counts = computed(() => ({
  pending: apps.value.filter((a) => a.status === 'pending').length,
  accepted: apps.value.filter((a) => a.status === 'accepted').length,
  rejected: apps.value.filter((a) => a.status === 'rejected').length,
  all: apps.value.length,
}))

async function load() {
  loading.value = true
  fetchError.value = ''
  try {
    apps.value = await $fetch<Application[]>('/api/admin/applications', { headers: getHeaders() })
  } catch {
    fetchError.value = 'No se pudieron cargar las solicitudes. Comprueba la configuración de Supabase.'
  } finally {
    loading.value = false
  }
}

async function setStatus(app: Application, status: Application['status']) {
  const updated = await $fetch<Application>(`/api/admin/applications/${app.id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: { status },
  })
  patch(updated)
}

async function loadComments(id: string) {
  loadingComments.value = true
  try {
    comments.value = await $fetch<Comment[]>(`/api/admin/applications/${id}/comments`, { headers: getHeaders() })
  } finally {
    loadingComments.value = false
  }
}

async function postComment() {
  if (!detail.value || !newComment.value.trim()) return
  postingComment.value = true
  try {
    const created = await $fetch<Comment>(`/api/admin/applications/${detail.value.id}/comments`, {
      method: 'POST',
      headers: getHeaders(),
      body: { body: newComment.value, author: newAuthor.value || 'Equipo' },
    })
    comments.value.push(created)
    newComment.value = ''
  } finally {
    postingComment.value = false
  }
}

function patch(updated: Application) {
  const i = apps.value.findIndex((a) => a.id === updated.id)
  if (i !== -1) apps.value[i] = updated
  if (detail.value?.id === updated.id) detail.value = updated
}

function openDetail(app: Application) {
  detail.value = app
  comments.value = []
  newComment.value = ''
  loadComments(app.id)
}

function logout() {
  sessionStorage.removeItem('admin_token')
  navigateTo('/admin/login')
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pendiente',
  accepted: 'Aceptada',
  rejected: 'Rechazada',
}
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:  { bg: '#fef3c7', color: '#92400e' },
  accepted: { bg: '#d1fae5', color: '#065f46' },
  rejected: { bg: '#fee2e2', color: '#991b1b' },
}
const INTENT_COLORS: Record<string, { bg: string; color: string }> = {
  attend:  { bg: '#dbeafe', color: '#1d4ed8' },
  present: { bg: '#ede9fe', color: '#7c3aed' },
}

const tabs = [
  { key: 'pending',  label: 'Pendientes' },
  { key: 'accepted', label: 'Aceptadas' },
  { key: 'rejected', label: 'Rechazadas' },
  { key: 'all',      label: 'Todas' },
] as const

onMounted(load)
</script>

<template>
  <div class="root">
    <!-- Top bar -->
    <header class="topbar">
      <div class="topbar-left">
        <span class="topbar-logo">S28</span>
        <span class="topbar-title">Solicitudes</span>
      </div>
      <button class="topbar-logout" @click="logout">Cerrar sesión</button>
    </header>

    <!-- Filters -->
    <nav class="filters">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab"
        :class="{ active: activeStatus === tab.key }"
        @click="activeStatus = tab.key"
      >
        {{ tab.label }}
        <span class="tab-count" :class="{ active: activeStatus === tab.key }">
          {{ counts[tab.key] }}
        </span>
      </button>
      <select v-model="activeIntent" class="intent-select">
        <option value="all">Todos los perfiles</option>
        <option value="attend">Solo asistentes</option>
        <option value="present">Solo ponentes</option>
      </select>
    </nav>

    <!-- Content -->
    <div class="content">
      <div v-if="loading" class="empty-state">Cargando…</div>
      <div v-else-if="fetchError" class="empty-state error">{{ fetchError }}</div>
      <div v-else-if="filtered.length === 0" class="empty-state">
        No hay solicitudes en esta categoría.
      </div>

      <table v-else class="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Profesión</th>
            <th>Perfil</th>
            <th>Estado</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="app in filtered"
            :key="app.id"
            class="row"
            :class="{ hovered: hoveredId === app.id }"
            @mouseenter="hoveredId = app.id"
            @mouseleave="hoveredId = null"
            @click="openDetail(app)"
          >
            <td class="cell-date">{{ fmtDate(app.created_at) }}</td>
            <td class="cell-name">
              <span>{{ app.name }}</span>
              <span v-if="app.notes" class="notes-dot" title="Tiene nota">●</span>
            </td>
            <td class="cell-text">{{ app.profession }}</td>
            <td class="cell-badge">
              <span
                class="badge"
                :style="{ background: INTENT_COLORS[app.intent].bg, color: INTENT_COLORS[app.intent].color }"
              >{{ app.intent === 'present' ? 'Ponente' : 'Asistente' }}</span>
            </td>
            <td class="cell-badge">
              <span
                class="badge"
                :style="{ background: STATUS_COLORS[app.status].bg, color: STATUS_COLORS[app.status].color }"
              >{{ STATUS_LABEL[app.status] }}</span>
            </td>
            <td class="cell-actions" @click.stop>
              <button
                v-if="app.status !== 'accepted'"
                class="action-btn accept"
                @click="setStatus(app, 'accepted')"
              >✓</button>
              <button
                v-if="app.status !== 'rejected'"
                class="action-btn reject"
                @click="setStatus(app, 'rejected')"
              >✗</button>
              <button
                v-if="app.status !== 'pending'"
                class="action-btn reset"
                @click="setStatus(app, 'pending')"
              >↺</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Overlay -->
    <Transition name="fade">
      <div v-if="detail" class="overlay" @click="detail = null" />
    </Transition>

    <!-- Detail panel -->
    <Transition name="slide">
      <aside v-if="detail" class="panel">
        <!-- Panel header -->
        <div class="panel-head">
          <div>
            <div class="panel-name">{{ detail.name }}</div>
            <div class="panel-date">{{ fmtDate(detail.created_at) }}</div>
          </div>
          <button class="panel-close" @click="detail = null">✕</button>
        </div>

        <div class="panel-body">
          <!-- Status switcher -->
          <div class="status-row">
            <button
              v-for="s in (['pending', 'accepted', 'rejected'] as const)"
              :key="s"
              class="status-btn"
              :class="{ active: detail.status === s }"
              :style="detail.status === s
                ? { background: STATUS_COLORS[s].bg, color: STATUS_COLORS[s].color, borderColor: STATUS_COLORS[s].color }
                : {}"
              @click="setStatus(detail!, s)"
            >{{ STATUS_LABEL[s] }}</button>
          </div>

          <!-- Fields -->
          <dl class="fields">
            <dt>Email</dt>
            <dd>
              <a :href="`mailto:${detail.email}`" class="link">{{ detail.email }}</a>
            </dd>

            <dt>Profesión</dt>
            <dd>{{ detail.profession }}</dd>

            <dt>Nacimiento</dt>
            <dd>{{ detail.birth_date }}</dd>

            <dt>Perfil</dt>
            <dd>
              <span
                class="badge"
                :style="{ background: INTENT_COLORS[detail.intent].bg, color: INTENT_COLORS[detail.intent].color }"
              >{{ detail.intent === 'present' ? 'Ponente' : 'Asistente' }}</span>
            </dd>

            <template v-if="detail.linkedin">
              <dt>LinkedIn</dt>
              <dd>
                <a
                  :href="'https://' + detail.linkedin.replace(/^https?:\/\//, '')"
                  target="_blank"
                  rel="noopener"
                  class="link"
                >{{ detail.linkedin }}</a>
              </dd>
            </template>

            <dt>Interés</dt>
            <dd class="multiline">{{ detail.interest }}</dd>

            <template v-if="detail.intent === 'present'">
              <dt>Proyecto</dt>
              <dd><strong>{{ detail.project_name }}</strong></dd>

              <dt>Pitch</dt>
              <dd class="multiline">{{ detail.project_pitch }}</dd>

              <dt>Contacto</dt>
              <dd>{{ detail.contact }}</dd>
            </template>
          </dl>

          <!-- Internal comments thread -->
          <div class="notes-section">
            <label class="notes-label">Comentarios del equipo</label>

            <div v-if="loadingComments" class="comments-empty">Cargando…</div>
            <div v-else-if="comments.length === 0" class="comments-empty">Sin comentarios todavía.</div>
            <ul v-else class="comments-list">
              <li v-for="c in comments" :key="c.id" class="comment">
                <div class="comment-meta">
                  <span class="comment-author">{{ c.author }}</span>
                  <span class="comment-time">{{ fmtDateTime(c.created_at) }}</span>
                </div>
                <p class="comment-body">{{ c.body }}</p>
              </li>
            </ul>

            <div class="comment-form">
              <input
                v-model="newAuthor"
                class="comment-author-input"
                placeholder="Tu nombre (opcional)"
              />
              <textarea
                v-model="newComment"
                class="notes-textarea"
                placeholder="Añadir comentario…"
                rows="3"
                @keydown.meta.enter="postComment"
                @keydown.ctrl.enter="postComment"
              />
              <button class="notes-save" :disabled="postingComment || !newComment.trim()" @click="postComment">
                {{ postingComment ? 'Enviando…' : 'Añadir comentario' }}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </Transition>
  </div>
</template>

<style scoped>
.root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  background: #f9fafb;
  min-height: 100vh;
  color: #111827;
}

/* Topbar */
.topbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  height: 52px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 20;
}
.topbar-left { display: flex; align-items: center; gap: 16px; }
.topbar-logo { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #636520; }
.topbar-title { font-size: 14px; color: #6b7280; }
.topbar-logout {
  font-size: 13px;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}
.topbar-logout:hover { background: #f3f4f6; }

/* Filters */
.filters {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.tab {
  padding: 13px 14px;
  font-size: 13px;
  color: #6b7280;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.1s;
}
.tab.active { color: #636520; border-bottom-color: #636520; font-weight: 600; }
.tab-count {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  background: #f3f4f6;
  color: #6b7280;
}
.tab-count.active { background: #636520; color: white; }
.intent-select {
  margin-left: auto;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 5px 10px;
  color: #374151;
  background: white;
  cursor: pointer;
  outline: none;
}

/* Content */
.content {
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px;
}
.empty-state {
  text-align: center;
  padding: 80px 24px;
  color: #9ca3af;
  font-size: 14px;
}
.empty-state.error { color: #dc2626; }

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.table thead tr {
  border-bottom: 1px solid #f3f4f6;
}
.table th {
  text-align: left;
  padding: 11px 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #9ca3af;
}
.row {
  border-bottom: 1px solid #f9fafb;
  cursor: pointer;
  transition: background 0.08s;
}
.row.hovered { background: #fafafa; }
.row:last-child { border-bottom: none; }
.cell-date { padding: 14px 16px; font-size: 12px; color: #9ca3af; white-space: nowrap; }
.cell-name {
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.notes-dot { font-size: 8px; color: #9ca3af; }
.cell-text { padding: 14px 16px; font-size: 13px; color: #374151; }
.cell-badge { padding: 14px 16px; }
.cell-actions {
  padding: 10px 16px;
  text-align: right;
  white-space: nowrap;
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  align-items: center;
}

.badge {
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 20px;
  font-weight: 500;
}

.action-btn {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.1s;
}
.action-btn:hover { opacity: 0.8; }
.action-btn.accept { background: #d1fae5; color: #065f46; }
.action-btn.reject { background: #fee2e2; color: #991b1b; }
.action-btn.reset { background: #f3f4f6; color: #6b7280; }

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 25;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Panel */
.panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 460px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 24px rgba(0,0,0,0.1);
  z-index: 30;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.slide-enter-active, .slide-leave-active { transition: transform 0.22s cubic-bezier(0.4,0,0.2,1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

.panel-head {
  padding: 20px 24px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-shrink: 0;
}
.panel-name { font-size: 16px; font-weight: 600; }
.panel-date { font-size: 12px; color: #9ca3af; margin-top: 2px; }
.panel-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #9ca3af;
  padding: 2px 6px;
  border-radius: 4px;
  line-height: 1;
}
.panel-close:hover { background: #f3f4f6; }

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

/* Status row */
.status-row {
  display: flex;
  gap: 8px;
  margin-bottom: 22px;
}
.status-btn {
  font-size: 12px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.1s;
}
.status-btn:hover { border-color: #d1d5db; }
.status-btn.active { font-weight: 600; }

/* Fields */
.fields {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px 0;
  font-size: 13px;
  margin: 0;
}
.fields dt { color: #9ca3af; align-self: start; padding-top: 1px; }
.fields dd { margin: 0; color: #111827; line-height: 1.5; }
.fields dd.multiline { line-height: 1.6; }
.link { color: #636520; text-decoration: none; }
.link:hover { text-decoration: underline; }

/* Notes */
.notes-section {
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid #f3f4f6;
}
.notes-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #6b7280;
  margin-bottom: 8px;
}
.notes-textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 13px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  outline: none;
  box-sizing: border-box;
  color: #111827;
  transition: border-color 0.15s;
}
.notes-textarea:focus { border-color: #636520; }
.notes-save {
  margin-top: 8px;
  font-size: 12px;
  padding: 7px 16px;
  background: #111827;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}
.notes-save:hover:not(:disabled) { background: #374151; }
.notes-save:disabled { opacity: 0.5; cursor: default; }

/* Comment thread */
.comments-empty {
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 12px;
}
.comments-list {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.comment {
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 6px;
  padding: 10px 12px;
}
.comment-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.comment-author {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
}
.comment-time {
  font-size: 11px;
  color: #9ca3af;
}
.comment-body {
  margin: 0;
  font-size: 13px;
  color: #111827;
  line-height: 1.5;
  white-space: pre-wrap;
}
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.comment-author-input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 7px 12px;
  font-size: 13px;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  color: #111827;
  transition: border-color 0.15s;
}
.comment-author-input:focus { border-color: #636520; }
</style>
