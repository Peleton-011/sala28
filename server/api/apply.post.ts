import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

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
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  // Supabase insert
  if (config.supabaseUrl && config.supabaseServiceKey) {
    const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
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
  } else {
    console.warn('[apply] Supabase env vars not set — skipping DB insert')
  }

  // Resend emails
  if (config.resendApiKey) {
    const resend = new Resend(config.resendApiKey)
    const teamEmail = config.teamEmail || 'hola@sala28.es'

    await resend.emails.send({
      from: 'Sala 28 <noreply@sala28.es>',
      to: teamEmail,
      subject: `Nueva solicitud — ${body.intent === 'present' ? 'Ponente' : 'Asistente'}: ${body.name}`,
      html: buildTeamEmail(body),
    }).catch((e) => console.error('[apply] team email error', e))

    await resend.emails.send({
      from: 'Sala 28 <noreply@sala28.es>',
      to: body.email.trim().toLowerCase(),
      subject: 'Hemos recibido tu solicitud — Sala 28',
      html: buildConfirmationEmail(body),
    }).catch((e) => console.error('[apply] confirmation email error', e))
  } else {
    console.warn('[apply] Resend env var not set — skipping emails')
  }

  return { ok: true }
})

function buildTeamEmail(body: ApplyBody): string {
  const rows: [string, string][] = [
    ['Nombre', body.name],
    ['Email', body.email],
    ['Nacimiento', body.birth],
    ['Profesión', body.profession],
    ['LinkedIn', body.linkedin || '—'],
    ['Interés', body.interest],
    ['Intención', body.intent === 'present' ? 'Exponer' : 'Asistir'],
    ...(body.intent === 'present' ? [
      ['Proyecto', body.project_name ?? ''] as [string, string],
      ['Pitch', body.project_pitch ?? ''] as [string, string],
      ['Contacto', body.contact ?? ''] as [string, string],
    ] : []),
  ]
  const rowsHtml = rows.map(([k, v]) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#888;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#111">${v}</td></tr>`
  ).join('')
  return `<div style="font-family:sans-serif;font-size:14px;max-width:600px"><table style="border-collapse:collapse">${rowsHtml}</table></div>`
}

function buildConfirmationEmail(body: ApplyBody): string {
  const isPresenter = body.intent === 'present'
  return brandedEmail(`
    <p style="font-size:18px;margin:0 0 20px;font-weight:400">Hola ${body.name},</p>
    <p style="line-height:1.7;margin:0 0 16px">
      Hemos recibido tu solicitud para ${isPresenter ? 'exponer en' : 'asistir a'} Sala 28.
      La revisamos manualmente y te escribiremos en un plazo de cinco días.
    </p>
    ${isPresenter ? `<p style="line-height:1.7;margin:0 0 16px">
      Si tu propuesta es seleccionada, te contactaremos a través de este email para coordinar los detalles.
    </p>` : ''}
    <p style="line-height:1.7;margin:0">
      Si tienes cualquier duda, escríbenos a
      <a href="mailto:hola@sala28.es" style="color:#636520;text-decoration:none">hola@sala28.es</a>.
    </p>
  `)
}

function brandedEmail(body: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8">
  <div style="max-width:560px;margin:40px auto;background:#faf7f2;border:1px solid #e8e0d0;border-radius:4px;overflow:hidden">
    <div style="background:#1a1a0f;padding:20px 32px;display:flex;align-items:center;gap:12px">
      <span style="font-family:Georgia,serif;font-size:22px;color:#f5f0e8;letter-spacing:-0.5px">Sala 28</span>
    </div>
    <div style="padding:36px 32px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.6">
      ${body}
      <p style="margin:40px 0 0;color:#888;font-size:13px;font-family:sans-serif;border-top:1px solid #e8e0d0;padding-top:20px">
        — El equipo de Sala 28 &nbsp;·&nbsp;
        <a href="https://sala28.es" style="color:#636520;text-decoration:none">sala28.es</a>
      </p>
    </div>
  </div>
</body>
</html>`
}
