export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { password } = await readBody<{ password: string }>(event)
  if (config.adminToken && password !== config.adminToken) {
    throw createError({ statusCode: 401, message: 'Contraseña incorrecta' })
  }
  return { ok: true }
})
