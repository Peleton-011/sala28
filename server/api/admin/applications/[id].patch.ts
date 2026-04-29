import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody<{ status?: string; notes?: string }>(event)

  const update: Record<string, string> = {}
  if (body.status !== undefined && ['pending', 'accepted', 'rejected'].includes(body.status)) {
    update.status = body.status
  }
  if (body.notes !== undefined) update.notes = body.notes

  if (!Object.keys(update).length) {
    throw createError({ statusCode: 400, message: 'Nothing to update' })
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  const { data, error } = await supabase
    .from('applications')
    .update(update)
    .eq('id', id!)
    .select()
    .single()
  if (error) throw createError({ statusCode: 500, message: error.message })

  return data
})
