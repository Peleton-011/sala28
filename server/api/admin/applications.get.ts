import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const config = useRuntimeConfig()
  if (!config.supabaseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 503, message: 'Supabase not configured' })
  }
  const { status, intent } = getQuery(event)
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  let q = supabase.from('applications').select('*').order('created_at', { ascending: false })
  if (status && status !== 'all') q = q.eq('status', status as string)
  if (intent && intent !== 'all') q = q.eq('intent', intent as string)
  const { data, error } = await q
  if (error) throw createError({ statusCode: 500, message: error.message })
  return data
})
