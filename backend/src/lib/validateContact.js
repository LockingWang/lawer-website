/**
 * 聯絡表單驗證（與前端 `ContactRequestForm.vue` 欄位對齊）。
 * @param {unknown} body
 * @returns {{ type: 'honeypot' } | { type: 'invalid', issues: { path: string, message: string }[] } | { type: 'ok', data: { name: string, phone: string, email: string, summary: string } }}
 */
export function validateContactPayload(body) {
  if (!body || typeof body !== 'object') {
    return {
      type: 'invalid',
      issues: [{ path: '_', message: '請提供 JSON 物件。' }]
    }
  }

  const o = /** @type {Record<string, unknown>} */ (body)
  const website = typeof o.website === 'string' ? o.website : ''
  if (website.trim()) {
    return { type: 'honeypot' }
  }

  const name = typeof o.name === 'string' ? o.name.trim() : ''
  const phone = typeof o.phone === 'string' ? o.phone.trim() : ''
  const email = typeof o.email === 'string' ? o.email.trim() : ''
  const summary = typeof o.summary === 'string' ? o.summary.trim() : ''
  const privacyRaw = o.privacyAccepted
  const privacyAccepted =
    privacyRaw === true ||
    privacyRaw === 'true' ||
    privacyRaw === 1 ||
    privacyRaw === '1'

  /** @type {{ path: string, message: string }[]} */
  const issues = []

  if (!name) {
    issues.push({ path: 'name', message: '請填寫姓名。' })
  }
  if (!summary) {
    issues.push({
      path: 'summary',
      message: '請簡述您的諮詢需求，以便我們初步了解案情。'
    })
  }
  if (!phone && !email) {
    issues.push({
      path: 'phone',
      message: '請填寫聯絡電話或 Email 至少其一。'
    })
    issues.push({
      path: 'email',
      message: '請填寫聯絡電話或 Email 至少其一。'
    })
  }
  else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    issues.push({ path: 'email', message: 'Email 格式不正確。' })
  }
  if (!privacyAccepted) {
    issues.push({
      path: 'privacyAccepted',
      message: '送出前請勾選同意隱私權政策。'
    })
  }

  if (issues.length) {
    return { type: 'invalid', issues }
  }

  return {
    type: 'ok',
    data: { name, phone, email, summary }
  }
}
