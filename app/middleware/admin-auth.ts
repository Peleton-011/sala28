export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  if (to.path === '/admin/login') return
  const token = sessionStorage.getItem('admin_token')
  if (!token) return navigateTo('/admin/login')
})
