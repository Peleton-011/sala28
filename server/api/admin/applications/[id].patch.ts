import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

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

  // Send email when status moves to accepted or rejected
  if (update.status && ['accepted', 'rejected'].includes(update.status) && data.email && config.resendApiKey) {
    const resend = new Resend(config.resendApiKey)
    const isAccepted = update.status === 'accepted'
    const isPresenter = data.intent === 'present'

    await resend.emails.send({
      from: 'Sala 28 <noreply@sala28.es>',
      to: data.email,
      subject: isAccepted
        ? `Tu solicitud ha sido aceptada — Sala 28`
        : `Tu solicitud en Sala 28`,
      html: isAccepted ? buildAcceptedEmail(data.name, isPresenter) : buildRejectedEmail(data.name),
    }).catch((e) => console.error('[patch] status email error', e))
  }

  return data
})

function brandedEmail(body: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8">
  <div style="max-width:560px;margin:40px auto;background:#faf7f2;border:1px solid #e8e0d0;border-radius:4px;overflow:hidden">
    <div style="background:#1a1a0f;padding:20px 32px">
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

function buildAcceptedEmail(name: string, isPresenter: boolean): string {
  return brandedEmail(`
    <p style="font-size:18px;margin:0 0 20px;font-weight:400">Hola ${name},</p>
    <p style="line-height:1.7;margin:0 0 16px">
      Tu solicitud para ${isPresenter ? 'exponer en' : 'asistir a'} Sala 28 ha sido <strong>aceptada</strong>.
    </p>
    ${isPresenter
      ? `<p style="line-height:1.7;margin:0 0 16px">
           Nos pondremos en contacto contigo en los próximos días para coordinar los detalles de tu presentación.
         </p>`
      : `<p style="line-height:1.7;margin:0 0 16px">
           Próximamente recibirás los detalles del próximo evento: fecha, lugar y hora exacta.
         </p>`
    }
    <p style="line-height:1.7;margin:0">
      Cualquier duda, escríbenos a
      <a href="mailto:hola@sala28.es" style="color:#636520;text-decoration:none">hola@sala28.es</a>.
    </p>
  `)
}

function buildRejectedEmail(name: string): string {
  return brandedEmail(`
    <p style="font-size:18px;margin:0 0 20px;font-weight:400">Hola ${name},</p>
    <p style="line-height:1.7;margin:0 0 16px">
      Gracias por solicitar plaza en Sala 28.
    </p>
    <p style="line-height:1.7;margin:0 0 16px">
      Esta vez no hemos podido darte un sitio. Guardamos tu perfil y lo tendremos en cuenta
      para próximas ediciones.
    </p>
    <p style="line-height:1.7;margin:0">
      Si crees que hay algo que deberíamos saber, responde a este correo.
    </p>
  `)
}
