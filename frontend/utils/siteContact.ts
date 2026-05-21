/**
 * 全站聯絡與導覽種子資料 — 須與 `intruduction.md` 一致（企劃書 §2.2b）。
 * 後續階段可改為單一 CMS／設定檔匯入。
 */
export const siteNameZh = '無憂吳律事務所'
export const siteNameEn = 'Sallywu Attorneys-At-Law'

export const phoneDisplay = '07-550-6615'
/** 可點擊撥號（E.164，對應 07-550-6615） */
export const phoneTelHref = 'tel:+886775506615'

export const faxDisplay = '07-550-7866'
export const emailDisplay = 'wuyouwululawyer@gmail.com'
export const emailMailtoHref = 'mailto:wuyouwululawyer@gmail.com'

export const addressLines = ['高雄市苓雅區文武三街49號'] as const

/** 單行地址（meta／敘述用），須與 `addressLines` 一致 */
export const addressSingleLine = addressLines.join('')

/** Google 地圖搜尋（外開、無需 API Key） */
export const googleMapsPlaceSearchHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressSingleLine)}`

/**
 * Google Maps「嵌入地圖」iframe 之 `src`（由 Google 地圖分享 → 嵌入地圖取得）。
 * 若事務所搬遷或地圖連結失效，請重新產生並替換此常數。
 */
export const googleMapsEmbedSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4981.219135311657!2d120.29521349333062!3d22.61762805651729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e050014949fdd%3A0x14a08d82e6632d98!2z54Sh5oaC5ZCz5b6L5LqL5YuZ5omA!5e0!3m2!1szh-TW!2stw!4v1778407360568!5m2!1szh-TW!2stw'

/** 與 §2.2 IA 一致；路由將於各頁擴充內容 */
export const mainNav = [
  { label: '首頁', to: '/' },
  { label: '本所介紹', to: '/firm' },
  { label: '律師介紹', to: '/lawyer' },
  { label: '最新消息', to: '/news' },
  { label: '聯繫本所', to: '/contact' }
] as const

/** 頁尾法遵／次要連結（非主導覽 IA，企劃 §2.2 選項） */
export const footerLegalNav = [
  { label: '隱私權政策', to: '/privacy' }
] as const

/** 官方 Facebook（分享連結；另開新分頁） */
export const socialFacebookHref =
  'https://www.facebook.com/share/16oW47qcps/?mibextid=wwXIfr'

/** 官方 Instagram（另開新分頁） */
export const socialInstagramHref =
  'https://www.instagram.com/lawyerwusally?igsh=MWhkdHI5ODI0bTI5ZA%3D%3D&utm_source=qr'

/**
 * 官方 LINE 加入好友 QR 靜態圖（來源：`images/line-official-qr.png` → `public/social/`）。
 */
export const socialLineOfficialQrSrc = '/social/line-official-qr.png'
