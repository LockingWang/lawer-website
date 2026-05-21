/** 後端 IG 限動 JSON（階段 10） */
export type InstagramStoryDto = {
  id: string
  mediaType: string
  mediaUrl: string | null
  thumbnailUrl: string | null
  timestamp: string
  permalink: string | null
}

export type InstagramStoriesMeta = {
  source: 'graph' | 'disabled' | 'error'
  fetchedAt: string
  message?: string
  graphMessage?: string
  httpStatus?: number
  count?: number
}

export type InstagramStoriesResponse = {
  ok: true
  stories: InstagramStoryDto[]
  meta: InstagramStoriesMeta
  cached?: boolean
}

export function instagramStoriesEndpoint(apiBase: string): string {
  const base = apiBase.trim().replace(/\/$/, '')
  return `${base}/api/instagram/stories`
}
