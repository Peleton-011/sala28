import { createClient } from '@supabase/supabase-js'

interface ApplyBody {
  name: string
  birth: string
  profession: string
  email: string
  linkedin?: string
  interest: string
  intent: 'attend' | 'present'
  project_name?: string
  project_pitch?: string
  contact?: string
  _hp?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<ApplyBody>(event)

  // Honeypot: bots fill hidden fields, humans don't
  if (body._hp) return { ok: true }

  // Server-side validation
  const errs: Record<string, string> = {}
  if (!body.name?.trim()) errs.name = 'Requerido'
  if (!body.birth) {
    errs.birth = 'Requerido'
  } else {
    const age = (Date.now() - new Date(body.birth).getTime()) / (365.25 * 24 * 3600 * 1000)
    if (age < 24) errs.birth = 'Eventos restringidos a +24 años'
  }
  if (!body.profession?.trim()) errs.profession = 'Requerido'
  if (!body.email?.trim()) {
    errs.email = 'Requerido'
  } else if (!EMAIL_RE.test(body.email)) {
    errs.email = 'Email inválido'
  }
  if (!body.interest?.trim()) errs.interest = 'Requerido'
  if (!body.intent || !['attend', 'present'].includes(body.intent)) errs.intent = 'Valor inválido'
  if (body.intent === 'present') {
    if (!body.project_name?.trim()) errs.project_name = 'Requerido'
    if (!body.project_pitch?.trim() || body.project_pitch.length < 80) errs.project_pitch = 'Mínimo 80 caracteres'
    if (!body.contact?.trim()) errs.contact = 'Requerido para ponentes'
  }

  if (Object.keys(errs).length > 0) {
    throw createError({ statusCode: 422, data: { errors: errs } })
  }

  if (!config.supabaseUrl || !config.supabaseServiceKey) {
    console.warn('[apply] Supabase env vars not set — skipping DB insert')
    return { ok: true }
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)

  // Rate limit: one submission per email per 24 hours
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { count } = await supabase
    .from('applications')
    .select('id', { count: 'exact', head: true })
    .eq('email', body.email.trim().toLowerCase())
    .gte('created_at', since)
  if ((count ?? 0) > 0) {
    throw createError({
      statusCode: 429,
      data: { errors: { email: 'Ya hemos recibido una solicitud con este email. Escríbenos a hola@sala28.es si tienes alguna duda.' } },
    })
  }

  const { error } = await supabase.from('applications').insert({
    name: body.name.trim(),
    birth_date: body.birth,
    profession: body.profession.trim(),
    email: body.email.trim().toLowerCase(),
    linkedin: body.linkedin?.trim() || null,
    interest: body.interest.trim(),
    intent: body.intent,
    project_name: body.project_name?.trim() || null,
    project_pitch: body.project_pitch?.trim() || null,
    contact: body.contact?.trim() || null,
  })
  if (error) {
    console.error('[apply] supabase insert error', error)
    throw createError({ statusCode: 500, message: 'Error al guardar la solicitud' })
  }

  return { ok: true }
})
