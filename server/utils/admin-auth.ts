import type { H3Event } from 'h3'

export function requireAdminAuth(event: H3Event): void {
  const config = useRuntimeConfig()
  if (!config.adminToken) return
  const auth = getHeader(event, 'authorization') ?? ''
  if (auth !== `Bearer ${config.adminToken}`) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
}
