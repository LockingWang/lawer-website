/**
 * 最新消息 — 前端專案內維護（企劃 §8.3），獨立 `/news/[slug]` 利於 SEO。
 * 定稿時可改為 Markdown 建置匯入，路由與型別介面建議保留。
 *
 * 封面圖：選填 `imageSrc`（`/public` 下路徑，如 `/photos/foo.jpg`）。
 * 列表無圖時使用 `newsCoverDefaultSrc`（來源：`images/firm-brand-mark-on-black.png` → `public/photos/`）。
 */
export type NewsArticle = {
  slug: string
  title: string
  /** ISO 日期 `YYYY-MM-DD` */
  date: string
  /** 列表摘要與 meta description 基底 */
  excerpt: string
  /** 單篇正文（多段） */
  paragraphs: readonly string[]
  /**
   * 列表縮圖與單篇頂部封面；留空則列表使用 `newsCoverDefaultSrc`。
   * 單篇僅在有設定時顯示頂部大圖（無則不顯示大圖區塊）。
   */
  imageSrc?: string
}

/** 列表無自訂封面時使用（勿刪；更新圖請覆寫 `public/photos/firm-brand-mark-on-black.png`） */
export const newsCoverDefaultSrc = '/photos/firm-brand-mark-on-black.png'

/** 列表／首頁精選縮圖用（有自訂則用自訂，否則預設） */
export function getNewsListCoverSrc(article: Pick<NewsArticle, 'imageSrc'>): string {
  const s = article.imageSrc?.trim()
  return s || newsCoverDefaultSrc
}

export const newsPlaceholders: NewsArticle[] = [
  {
    slug: 'site-launch-preview',
    title: '官網改版預告',
    date: '2026-05-01',
    excerpt: '無憂吳律事務所全新網站即將上線，敬請期待。',
    /** 範例：自訂封面（可改為 `/photos/…` 之活動照） */
    imageSrc: '/brand/firm-logo-horizontal.png',
    paragraphs: [
      '為提供更清楚的服務說明與聯絡方式，本所官網正進行改版，預計於近期陸續上線各項頁面。',
      '改版期間，若您有法律諮詢需求，仍歡迎以電話或電子郵件與本所聯繫，聯絡資訊與官網頁尾所載一致。',
      '正式上線後，我們將於本頁發布簡短公告；感謝您的耐心等候。'
    ]
  },
  {
    slug: 'consultation-reminder',
    title: '諮詢前您可以準備的事項',
    date: '2026-04-15',
    excerpt: '為使第一次聯繫更有效率，建議您先整理事實經過與相關文件。',
    paragraphs: [
      '第一次與律師討論法律問題時，若能先整理時間序、相關人員與已發生的重要事實，通常能更快聚焦爭點。',
      '若您手邊已有契約書、存證信函、法院或行政機關來文等文件，建議一併列出清單；實際閱卷與法律意見仍須依個案約定辦理。',
      '本則為一般性提醒，並非針對個案之法律意見。具體策略請於正式委任後與承辦律師討論。'
    ]
  },
  {
    slug: 'kaohsiung-legal-info',
    title: '高雄在地法律服務簡介',
    date: '2026-03-20',
    excerpt: '本所服務範圍涵蓋家事、校園與行政事件等領域，歡迎來電洽詢。',
    paragraphs: [
      '無憂吳律事務所設址於高雄市苓雅區，服務範圍包含家事事件、校園事件調查、行政爭議及民刑事訴訟等領域之諮詢與委任。',
      '本所亦長期參與法律扶助與犯罪被害人保護相關工作，並具校園法治教育、外部委員等經驗；實際可受理案件類型仍以個案評估為準。',
      '若您希望了解是否適合委任或轉介，歡迎先來電或來信，我們將於可安排之時間內回覆。'
    ]
  }
]

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsPlaceholders.find(n => n.slug === slug)
}

/** 供 `nuxt.config` Nitro 預渲染，確保部署預覽時單篇有靜態 HTML */
export const newsDetailPrerenderRoutes: string[] = newsPlaceholders.map(
  n => `/news/${n.slug}`
)
