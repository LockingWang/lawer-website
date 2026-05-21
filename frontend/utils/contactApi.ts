/** 後端 `POST /api/contact` 成功回應（階段 8） */
export type ContactApiSuccess = {
  ok: true
  mail?: 'dry_run' | 'smtp' | 'resend'
  accepted?: true
}

/** 驗證失敗 */
export type ContactApiValidationError = {
  ok: false
  code: 'validation_error'
  issues: { path: string; message: string }[]
}

export function contactEndpoint(apiBase: string): string {
  const base = apiBase.trim().replace(/\/$/, '')
  return `${base}/api/contact`
}
