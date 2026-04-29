<script setup lang="ts">
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/auth', { method: 'POST', body: { password: password.value } })
    sessionStorage.setItem('admin_token', password.value)
    await navigateTo('/admin')
  } catch {
    error.value = 'Contraseña incorrecta'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-root">
    <form class="login-card" @submit.prevent="login">
      <div class="login-logo">S28</div>
      <h1 class="login-title">Panel de administración</h1>
      <label class="login-label">Contraseña</label>
      <input
        v-model="password"
        type="password"
        class="login-input"
        autofocus
        autocomplete="current-password"
      >
      <p v-if="error" class="login-err">{{ error }}</p>
      <button type="submit" class="login-btn" :disabled="loading">
        {{ loading ? 'Verificando…' : 'Entrar' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 36px 32px;
  width: 100%;
  max-width: 340px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
}
.login-logo {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #636520;
  margin-bottom: 20px;
}
.login-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 24px;
}
.login-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.login-input {
  display: block;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 9px 12px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.login-input:focus { border-color: #636520; }
.login-err {
  font-size: 12px;
  color: #dc2626;
  margin: 8px 0 0;
}
.login-btn {
  display: block;
  width: 100%;
  margin-top: 20px;
  background: #111827;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.login-btn:hover:not(:disabled) { background: #374151; }
.login-btn:disabled { opacity: 0.5; cursor: default; }
</style>
