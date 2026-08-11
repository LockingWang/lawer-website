/**
 * 每頁獨立 title／description（企劃 §6.4）。
 * `title` 為瀏覽器分頁短標題，會經 `nuxt.config` 的 `titleTemplate` 加上「· 無憂吳律事務所」。
 * `ogTitle` 預設與 `title` 相同；需要較長社群／搜尋標題時傳入 `options.ogTitle`。
 * 另依當前路由輸出 canonical 連結與對應 `og:url`，避免重複內容分散權重。
 */
export function usePageSeo(
  title: string,
  description: string,
  options?: { ogTitle?: string; ogImage?: string }
) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = config.public.siteUrl as string
  // 靜態部署會將 `/firm` 308 轉址到 `/firm/`，canonical 統一帶結尾斜線以指向最終網址
  const canonicalUrl = `${siteUrl}${route.path.endsWith('/') ? route.path : `${route.path}/`}`
  const ogTitle = options?.ogTitle ?? title
  const ogImage = options?.ogImage
    ? `${siteUrl}${options.ogImage}`
    : `${siteUrl}/brand/firm-logo-horizontal.png`

  useHead({
    title,
    link: [{ rel: 'canonical', href: canonicalUrl }]
  })

  useSeoMeta({
    title,
    description,
    ogTitle,
    ogDescription: description,
    ogImage,
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterImage: ogImage
  })
}
