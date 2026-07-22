import { newsPlaceholders } from '../../data/newsPlaceholders'

/**
 * 全站 sitemap（SSG 時隨 `nitro.prerender.routes` 輸出為靜態檔）。
 * 新增頁面時請同步補進 `staticPages`；最新消息各篇由 `newsPlaceholders` 自動帶入。
 */
const staticPages = [
  { path: '/', priority: '1.0' },
  { path: '/firm', priority: '0.9' },
  { path: '/lawyer', priority: '0.9' },
  { path: '/news', priority: '0.7' },
  { path: '/contact', priority: '0.8' },
  { path: '/privacy', priority: '0.3' }
] as const

export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig().public.siteUrl as string

  const urls = [
    ...staticPages.map(
      p => `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <priority>${p.priority}</priority>\n  </url>`
    ),
    ...newsPlaceholders.map(
      n => `  <url>\n    <loc>${siteUrl}/news/${n.slug}</loc>\n    <lastmod>${n.date}</lastmod>\n    <priority>0.6</priority>\n  </url>`
    )
  ]

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
})
