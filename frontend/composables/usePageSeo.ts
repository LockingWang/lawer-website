/**
 * 每頁獨立 title／description（企劃 §6.4）。
 * `title` 為瀏覽器分頁短標題，會經 `nuxt.config` 的 `titleTemplate` 加上「· 無憂吳律事務所」。
 * `ogTitle` 預設與 `title` 相同；需要較長社群／搜尋標題時傳入 `options.ogTitle`。
 */
export function usePageSeo(
  title: string,
  description: string,
  options?: { ogTitle?: string; ogImage?: string }
) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string
  const ogTitle = options?.ogTitle ?? title
  const ogImage = options?.ogImage
    ? `${siteUrl}${options.ogImage}`
    : `${siteUrl}/brand/firm-logo-horizontal.png`

  useHead({ title })

  useSeoMeta({
    title,
    description,
    ogTitle,
    ogDescription: description,
    ogImage,
    ogUrl: siteUrl,
    twitterCard: 'summary_large_image',
    twitterImage: ogImage
  })
}
