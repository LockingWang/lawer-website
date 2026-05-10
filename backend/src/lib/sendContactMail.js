import nodemailer from 'nodemailer'

/**
 * @param {{ name: string, phone: string, email: string, summary: string }} data
 * @returns {Promise<{ mode: 'smtp' | 'resend' | 'dry_run' }>}
 */
export async function sendContactMail(data) {
  const dry =
    process.env.MAIL_DRY_RUN === '1' ||
    process.env.MAIL_DRY_RUN === 'true'

  if (dry) {
    // eslint-disable-next-line no-console
    console.info('[contact] MAIL_DRY_RUN — 不落信，內容如下：', data)
    return { mode: 'dry_run' }
  }

  const to = (process.env.CONTACT_TO_EMAIL || '').trim()
  if (!to) {
    const err = new Error('CONTACT_TO_EMAIL is not set')
    err.code = 'MAIL_NOT_CONFIGURED'
    throw err
  }

  const subject = `[官網留言] ${data.name}`
  const text = [
    `姓名：${data.name}`,
    `電話：${data.phone || '（未填）'}`,
    `Email：${data.email || '（未填）'}`,
    '',
    '諮詢摘要：',
    data.summary
  ].join('\n')

  const html = `<p><strong>姓名</strong>：${escapeHtml(data.name)}</p>
<p><strong>電話</strong>：${escapeHtml(data.phone || '（未填）')}</p>
<p><strong>Email</strong>：${escapeHtml(data.email || '（未填）')}</p>
<p><strong>諮詢摘要</strong>：</p>
<pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(data.summary)}</pre>`

  const resendKey = (process.env.RESEND_API_KEY || '').trim()
  if (resendKey) {
    const from = (process.env.RESEND_FROM || '').trim()
    if (!from) {
      const err = new Error('RESEND_FROM is required when using Resend')
      err.code = 'MAIL_NOT_CONFIGURED'
      throw err
    }
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        html
      })
    })
    if (!res.ok) {
      const t = await res.text()
      const err = new Error(`Resend API error: ${res.status} ${t}`)
      err.code = 'MAIL_SEND_FAILED'
      throw err
    }
    return { mode: 'resend' }
  }

  const host = (process.env.SMTP_HOST || '').trim()
  const user = (process.env.SMTP_USER || '').trim()
  const pass = (process.env.SMTP_PASS || '').trim()
  if (!host) {
    const err = new Error('SMTP_HOST is not set (or use RESEND_API_KEY)')
    err.code = 'MAIL_NOT_CONFIGURED'
    throw err
  }

  const port = Number(process.env.SMTP_PORT || '587')
  const from = (process.env.SMTP_FROM || user || to).trim()

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined
  })

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html
  })

  return { mode: 'smtp' }
}

/**
 * @param {string} s
 */
function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
