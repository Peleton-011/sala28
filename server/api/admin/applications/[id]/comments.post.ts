import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const { body, author } = await readBody<{ body: string; author?: string }>(event)

  if (!body?.trim()) throw createError({ statusCode: 400, message: 'body is required' })

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  const { data, error } = await supabase
    .from('comments')
    .insert({
      application_id: id!,
      body: body.trim(),
      author: author?.trim() || 'Equipo',
    })
    .select()
    .single()

  if (error) throw createError({ statusCode: 500, message: error.message })
  return data
})
