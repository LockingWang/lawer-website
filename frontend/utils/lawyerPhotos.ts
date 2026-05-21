/**
 * 主持律師照片（來源：`images/lawyer-portrait-*.jpg`；建置由 `public/photos/` 提供）。
 * 親民照：首頁 Hero、首頁「主持律師」區；形象照：律師介紹頁。
 *
 * 實際像素（供版面與 `object-contain` 對齊）：
 * - 親民 `lawyer-portrait-friendly.jpg`：1432×2006
 * - 形象 `lawyer-portrait-formal.jpg`：896×1195
 * - 電子名片 `lawyer-business-card.jpg`：1181×1181（正方形，聯繫頁為主；來源 `images/lawyer-business-card.jpg`）
 */
import { lawyerNameNick, lawyerNameZh } from './intruductionSeed'
import { siteNameZh } from './siteContact'

export const lawyerPhotoFriendlySrc = '/photos/lawyer-portrait-friendly.jpg'
export const lawyerPhotoProfessionalSrc = '/photos/lawyer-portrait-formal.jpg'
export const lawyerBusinessCardSrc = '/photos/lawyer-business-card.jpg'

export function lawyerPhotoFriendlyAlt(): string {
  return `${lawyerNameZh}（${lawyerNameNick}）——主持律師親民留影`
}

export function lawyerPhotoProfessionalAlt(): string {
  return `${lawyerNameZh}（${lawyerNameNick}）——主持律師形象照`
}

export function lawyerBusinessCardAlt(): string {
  return `${siteNameZh}電子名片圖檔（含主持律師簡歷、聯絡方式與官方 LINE QR）`
}
