/**
 * Instagram Graph API — 限時動態代理（權杖僅存後端，見企劃 §8.4、§2.6）。
 * 未設定 INSTAGRAM_IG_USER_ID／INSTAGRAM_ACCESS_TOKEN 時回傳空陣列（200），供前端顯示備援。
 */

const DEFAULT_GRAPH_VERSION = 'v19.0'
const CACHE_TTL_MS = 90 * 1000

/** @type {{ at: number; body: object } | null} */
let cache = null

/**
 * @returns {Promise<{ ok: true, stories: object[], meta: object, cached?: boolean }>}
 */
export async function getInstagramStoriesResponse() {
  const now = Date.now()
  if (cache && now - cache.at < CACHE_TTL_MS) {
    return { ...cache.body, cached: true }
  }

  const igUserId = (process.env.INSTAGRAM_IG_USER_ID || '').trim()
  const token = (process.env.INSTAGRAM_ACCESS_TOKEN || '').trim()
  const graphVersion = (process.env.FACEBOOK_GRAPH_VERSION || DEFAULT_GRAPH_VERSION).trim()

  if (!igUserId || !token) {
    const body = {
      ok: true,
      stories: [],
      meta: {
        source: 'disabled',
        fetchedAt: new Date().toISOString(),
        message:
          'INSTAGRAM_IG_USER_ID 或 INSTAGRAM_ACCESS_TOKEN 未設定；前端應顯示「前往 Instagram」備援。'
      }
    }
    cache = { at: now, body }
    return body
  }

  try {
    const fields = encodeURIComponent(
      'id,media_type,media_url,thumbnail_url,timestamp,permalink'
    )
    const url = `https://graph.facebook.com/${graphVersion}/${igUserId}/stories?fields=${fields}&access_token=${encodeURIComponent(token)}`
    const res = await fetch(url, { method: 'GET' })
    const json = await res.json()

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('[instagram] Graph API error', res.status, json)
      const body = {
        ok: true,
        stories: [],
        meta: {
          source: 'error',
          fetchedAt: new Date().toISOString(),
          httpStatus: res.status,
          graphMessage: json?.error?.message || 'Graph API request failed'
        }
      }
      cache = { at: now, body }
      return body
    }

    const raw = Array.isArray(json.data) ? json.data : []
    const stories = raw.map(s => ({
      id: String(s.id),
      mediaType: s.media_type || 'UNKNOWN',
      mediaUrl: s.media_url || null,
      thumbnailUrl: s.thumbnail_url || null,
      timestamp: s.timestamp || '',
      permalink: s.permalink || null
    }))

    const body = {
      ok: true,
      stories,
      meta: {
        source: 'graph',
        fetchedAt: new Date().toISOString(),
        count: stories.length
      }
    }
    cache = { at: now, body }
    return body
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.error('[instagram] fetch failed', e)
    const body = {
      ok: true,
      stories: [],
      meta: {
        source: 'error',
        fetchedAt: new Date().toISOString(),
        message: e instanceof Error ? e.message : 'fetch failed'
      }
    }
    cache = { at: now, body }
    return body
  }
}
