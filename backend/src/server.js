import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { validateContactPayload } from './lib/validateContact.js'
import { sendContactMail } from './lib/sendContactMail.js'
import { getInstagramStoriesResponse } from './lib/instagramStories.js'

const PORT = Number(process.env.PORT || 3001)

/** 逗號分隔；空則僅允許無 Origin（如 curl）與 localhost 常見埠 */
function parseCorsOrigins() {
  const raw = (process.env.CORS_ORIGINS || '').trim()
  if (!raw) {
    return new Set([
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3001'
    ])
  }
  return new Set(
    raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  )
}

/**
 * 逗號分隔 hostname 後綴（不含 scheme），僅用於匹配 **https** Origin。
 * 例：`pages.dev` 可涵蓋 `https://branch.project.pages.dev`（Cloudflare Pages 預覽）。
 */
function parseCorsOriginSuffixes() {
  const raw = (process.env.CORS_ORIGIN_SUFFIXES || '').trim()
  if (!raw) {
    return []
  }
  return raw
    .split(',')
    .map(s => s.trim().toLowerCase().replace(/^\./, ''))
    .filter(Boolean)
}

/** @param {string} hostname @param {string} suffix */
function hostnameMatchesSuffix(hostname, suffix) {
  return hostname === suffix || hostname.endsWith(`.${suffix}`)
}

/**
 * @param {string} origin
 * @param {Set<string>} allowedOrigins
 * @param {string[]} suffixes
 */
function isCorsOriginAllowed(origin, allowedOrigins, suffixes) {
  if (allowedOrigins.has(origin)) {
    return true
  }
  if (!suffixes.length || !origin.startsWith('https://')) {
    return false
  }
  let host
  try {
    host = new URL(origin).hostname.toLowerCase()
  }
  catch {
    return false
  }
  return suffixes.some(suf => hostnameMatchesSuffix(host, suf))
}

function createApp() {
  const app = express()
  app.set('trust proxy', 1)
  app.use(express.json({ limit: '48kb' }))

  const allowedOrigins = parseCorsOrigins()
  const originSuffixes = parseCorsOriginSuffixes()

  app.use(
    cors({
      origin(origin, cb) {
        if (!origin) {
          cb(null, true)
          return
        }
        if (isCorsOriginAllowed(origin, allowedOrigins, originSuffixes)) {
          cb(null, true)
          return
        }
        cb(null, false)
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      maxAge: 86400
    })
  )

  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, code: 'rate_limited', message: '請稍後再試。' }
  })

  const instagramLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 40,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, code: 'rate_limited', message: '請稍後再試。' }
  })

  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: '@lawer/backend' })
  })

  app.get('/api/instagram/stories', instagramLimiter, async (_req, res) => {
    try {
      const payload = await getInstagramStoriesResponse()
      res.status(200).json(payload)
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.error('[instagram] handler', e)
      res.status(200).json({
        ok: true,
        stories: [],
        meta: {
          source: 'error',
          fetchedAt: new Date().toISOString(),
          message: 'handler_exception'
        }
      })
    }
  })

  app.post('/api/contact', contactLimiter, async (req, res) => {
    const parsed = validateContactPayload(req.body)

    if (parsed.type === 'honeypot') {
      res.status(200).json({ ok: true, accepted: true })
      return
    }

    if (parsed.type === 'invalid') {
      res.status(400).json({
        ok: false,
        code: 'validation_error',
        issues: parsed.issues
      })
      return
    }

    try {
      const mail = await sendContactMail(parsed.data)
      res.status(200).json({ ok: true, mail: mail.mode })
    }
    catch (e) {
      const err = /** @type {Error & { code?: string }} */ (e)
      if (err.code === 'MAIL_NOT_CONFIGURED') {
        res.status(503).json({
          ok: false,
          code: 'mail_not_configured',
          message:
            '伺服器尚未設定寄信（CONTACT_TO_EMAIL + SMTP 或 Resend）。開發可設 MAIL_DRY_RUN=1。'
        })
        return
      }
      // eslint-disable-next-line no-console
      console.error('[contact] send failed', err)
      res.status(502).json({
        ok: false,
        code: 'mail_send_failed',
        message: '寄信失敗，請改撥事務所電話或寄 Email。'
      })
    }
  })

  app.use((err, _req, res, _next) => {
    // eslint-disable-next-line no-console
    console.error(err)
    res.status(500).json({ ok: false, code: 'internal', message: '伺服器錯誤' })
  })

  return app
}

const app = createApp()
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`[backend] listening on http://127.0.0.1:${PORT}`)
  // eslint-disable-next-line no-console
  console.info(`[backend] POST /api/contact  ·  GET /health  ·  GET /api/instagram/stories`)
})
