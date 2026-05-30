// https://nuxt.com/docs/api/configuration/nuxt-config
import { newsDetailPrerenderRoutes } from './data/newsPlaceholders'

export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant' },
      titleTemplate: '%s · 無憂吳律事務所'
    }
  },

  /** 階段 9：`NUXT_PUBLIC_API_BASE` 覆寫此值（見 `frontend/.env.example`） */
  runtimeConfig: {
    public: {
      apiBase: '',
      buildVersion: ''
    }
  },

  /** 階段 6：預渲染最新消息列表與各 slug，利於 Cloudflare Pages 等靜態／SSG 部署 */
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/news', ...newsDetailPrerenderRoutes]
    }
  }
})
