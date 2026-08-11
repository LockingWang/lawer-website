import { practiceAreasSummary } from '~/utils/intruductionSeed'
import {
  addressSingleLine,
  emailDisplay,
  siteNameEn,
  siteNameZh,
  socialFacebookHref,
  socialInstagramHref
} from '~/utils/siteContact'

/**
 * schema.org 結構化資料（JSON-LD），供 Google 搜尋顯示事務所資訊
 * （名稱、地址、電話、服務領域）與知識面板。
 * 服務領域關鍵字須與 `intruductionSeed.ts` 專長一致，並補上使用者常見搜尋語彙。
 */

/** 搜尋者常用語彙（與專長對應之延伸關鍵字，用於 knowsAbout） */
export const seoKnowsAbout = [
  ...practiceAreasSummary.split('、'),
  '離婚',
  '監護權',
  '扶養費',
  '性別平等工作法',
  '性騷擾申訴',
  '職場霸凌申訴',
  '校園霸凌調查',
  '性平事件調查',
  '訴願',
  '法律諮詢'
] as const

/** 全站：法律事務所（LegalService）結構化資料，於 `app.vue` 注入 */
export function useFirmJsonLd() {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          '@id': `${siteUrl}/#firm`,
          name: siteNameZh,
          alternateName: siteNameEn,
          url: siteUrl,
          logo: `${siteUrl}/brand/firm-logo-horizontal.png`,
          image: `${siteUrl}/brand/firm-logo-horizontal.png`,
          telephone: '+886-7-550-6615',
          faxNumber: '+886-7-550-7866',
          email: emailDisplay,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '苓雅區文武三街49號',
            addressLocality: '高雄市',
            addressCountry: 'TW'
          },
          areaServed: ['高雄市', '屏東縣', '台灣'],
          description: `${siteNameZh}位於${addressSingleLine}，提供${practiceAreasSummary}等法律服務。`,
          knowsAbout: seoKnowsAbout,
          founder: {
            '@type': 'Person',
            name: '吳佩珊',
            jobTitle: '律師'
          },
          sameAs: [socialFacebookHref, socialInstagramHref]
        })
      }
    ]
  })
}

/** 律師介紹頁：主持律師（Person）結構化資料 */
export function useLawyerJsonLd() {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `${siteUrl}/lawyer#person`,
          name: '吳佩珊',
          alternateName: '莎律',
          jobTitle: '律師',
          url: `${siteUrl}/lawyer/`,
          worksFor: { '@id': `${siteUrl}/#firm` },
          alumniOf: [
            { '@type': 'CollegeOrUniversity', name: '中正大學犯罪防治研究所' },
            { '@type': 'CollegeOrUniversity', name: '台北大學法律系' }
          ],
          knowsAbout: seoKnowsAbout
        })
      }
    ]
  })
}
