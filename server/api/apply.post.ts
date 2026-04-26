import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

interface ApplyBody {
  name: string
  birth: string
  profession: string
  linkedin?: string
  interest: string
  intent: 'attend' | 'present'
  project_name?: string
  project_pitch?: string
  contact?: string
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<ApplyBody>(event)

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

  // Supabase insert
  if (config.supabaseUrl && config.supabaseServiceKey) {
    const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
    const { error } = await supabase.from('applications').insert({
      name: body.name.trim(),
      birth_date: body.birth,
      profession: body.profession.trim(),
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
  } else {
    console.warn('[apply] Supabase env vars not set — skipping DB insert')
  }

  // Resend emails
  if (config.resendApiKey) {
    const resend = new Resend(config.resendApiKey)
    const teamEmail = config.teamEmail || 'hola@sala28.es'

    // Team notification
    await resend.emails.send({
      from: 'Sala 28 <noreply@sala28.es>',
      to: teamEmail,
      subject: `Nueva solicitud — ${body.intent === 'present' ? 'Ponente' : 'Asistente'}: ${body.name}`,
      html: buildTeamEmail(body),
    }).catch((e) => console.error('[apply] team email error', e))

    // Presenter confirmation (only if contact looks like an email)
    if (body.intent === 'present' && body.contact && isEmail(body.contact)) {
      await resend.emails.send({
        from: 'Sala 28 <noreply@sala28.es>',
        to: body.contact,
        subject: 'Hemos recibido tu solicitud para exponer en Sala 28',
        html: buildPresenterEmail(body.name),
      }).catch((e) => console.error('[apply] presenter email error', e))
    }
  } else {
    console.warn('[apply] Resend env var not set — skipping emails')
  }

  return { ok: true }
})

function buildTeamEmail(body: ApplyBody): string {
  const rows = [
    ['Nombre', body.name],
    ['Fecha de nacimiento', body.birth],
    ['Profesión', body.profession],
    ['LinkedIn', body.linkedin || '—'],
    ['Interés', body.interest],
    ['Intención', body.intent === 'present' ? 'Exponer' : 'Asistir'],
    ...(body.intent === 'present' ? [
      ['Proyecto', body.project_name ?? ''],
      ['Pitch', body.project_pitch ?? ''],
      ['Contacto', body.contact ?? ''],
    ] : []),
  ]
  const rowsHtml = rows.map(([k, v]) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#888;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${v}</td></tr>`
  ).join('')
  return `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rowsHtml}</table>`
}

function buildPresenterEmail(name: string): string {
  return `
<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#1a1a1a">
  <p style="font-size:18px;margin:0 0 24px">Hola ${name},</p>
  <p style="line-height:1.6">Hemos recibido tu solicitud para exponer en Sala 28. La revisamos manualmente y te escribiremos en los próximos días.</p>
  <p style="line-height:1.6">Si tienes alguna pregunta, responde a este correo o escríbenos a <a href="mailto:hola@sala28.es">hola@sala28.es</a>.</p>
  <p style="margin-top:40px;color:#888;font-size:13px">— El equipo de Sala 28</p>
</div>`
}
