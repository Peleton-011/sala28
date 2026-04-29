import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('application_id', id!)
    .order('created_at', { ascending: true })

  if (error) throw createError({ statusCode: 500, message: error.message })
  return data
})
