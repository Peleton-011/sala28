import { Resend } from 'resend'

export interface ApplicationRow {
  name: string
  email: string
  intent: 'attend' | 'present'
}

function client() {
  const { resendApiKey } = useRuntimeConfig()
  return new Resend(resendApiKey)
}

function from() {
  return useRuntimeConfig().emailFrom as string
}

// ─── Confirmation (sent to applicant after submit) ────────────────────────────

export async function sendConfirmation(app: ApplicationRow) {
  const { resendApiKey } = useRuntimeConfig()
  if (!resendApiKey) return

  const presenting = app.intent === 'present'

  await client().emails.send({
    from: from(),
    to: app.email,
    subject: 'Tu solicitud para Sala 28 está en revisión',
    html: confirmationHtml(app.name, presenting),
  })
}

function confirmationHtml(name: string, presenting: boolean) {
  const role = presenting ? 'ponente' : 'asistente'
  const note = presenting
    ? 'Las solicitudes para exponer se revisan con más detalle — puede tomarnos algunos días adicionales.'
    : 'Revisamos cada perfil manualmente para cuidar la calidad del evento.'

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f9f7;font-family:Georgia,serif;color:#111">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f7;padding:48px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid #e8e6e0;border-radius:4px;overflow:hidden">
        <!-- Header -->
        <tr><td style="background:#111;padding:28px 40px">
          <p style="margin:0;font-family:'JetBrains Mono',monospace,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a8a07a">Sala 28</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px">
          <p style="margin:0 0 24px;font-size:22px;font-weight:400;line-height:1.3">Hola, ${name}.</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333">
            Hemos recibido tu solicitud como <strong>${role}</strong>. ${note}
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333">
            Te escribiremos en menos de cinco días desde esta misma dirección con nuestra respuesta.
          </p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#888">
            Si tienes alguna duda antes de entonces, responde a este email.
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid #f0ede6">
          <p style="margin:0;font-size:12px;color:#aaa;line-height:1.5">
            Sala 28 · Barcelona<br>
            <a href="https://sala28.es" style="color:#aaa">sala28.es</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ─── Decision (sent to applicant when admin accepts or rejects) ────────────────

export async function sendDecision(app: ApplicationRow, status: 'accepted' | 'rejected') {
  const { resendApiKey } = useRuntimeConfig()
  if (!resendApiKey) return

  await client().emails.send({
    from: from(),
    to: app.email,
    subject: status === 'accepted'
      ? '¡Tu plaza en Sala 28 está confirmada!'
      : 'Actualización sobre tu solicitud a Sala 28',
    html: status === 'accepted' ? acceptedHtml(app.name) : rejectedHtml(app.name),
  })
}

function acceptedHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f9f7;font-family:Georgia,serif;color:#111">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f7;padding:48px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid #e8e6e0;border-radius:4px;overflow:hidden">
        <tr><td style="background:#111;padding:28px 40px">
          <p style="margin:0;font-family:'JetBrains Mono',monospace,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a8a07a">Sala 28</p>
        </td></tr>
        <tr><td style="padding:40px">
          <p style="margin:0 0 24px;font-size:22px;font-weight:400;line-height:1.3">Hola, ${name}.</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333">
            Nos alegra comunicarte que tu solicitud ha sido <strong>aceptada</strong>. Tu plaza está reservada.
          </p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#333">
            En breve recibirás los detalles del próximo evento: fecha, lugar y agenda. Estamos deseando conocerte.
          </p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#888">
            Cualquier pregunta, responde a este email.
          </p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #f0ede6">
          <p style="margin:0;font-size:12px;color:#aaa;line-height:1.5">
            Sala 28 · Barcelona<br>
            <a href="https://sala28.es" style="color:#aaa">sala28.es</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function rejectedHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f9f7;font-family:Georgia,serif;color:#111">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f7;padding:48px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid #e8e6e0;border-radius:4px;overflow:hidden">
        <tr><td style="background:#111;padding:28px 40px">
          <p style="margin:0;font-family:'JetBrains Mono',monospace,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a8a07a">Sala 28</p>
        </td></tr>
        <tr><td style="padding:40px">
          <p style="margin:0 0 24px;font-size:22px;font-weight:400;line-height:1.3">Hola, ${name}.</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333">
            Gracias por tu interés en Sala 28. Tras revisar tu solicitud, en esta ocasión no hemos podido reservarte una plaza.
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333">
            Esto no es un rechazo definitivo — los eventos son pequeños y cada convocatoria tiene una composición diferente.
            Seguimos guardando tu perfil para futuras ediciones.
          </p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#888">
            Si tienes alguna pregunta, responde a este email.
          </p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #f0ede6">
          <p style="margin:0;font-size:12px;color:#aaa;line-height:1.5">
            Sala 28 · Barcelona<br>
            <a href="https://sala28.es" style="color:#aaa">sala28.es</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
