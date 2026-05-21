# 前端（`@lawer/frontend`）

- **Nuxt 3**（`^3.16`，實際解析至目前 npm 之 3.x 最新次版）
- **@nuxt/ui** 使用 **v2.22.x**（與 Nuxt 3 相容；registry 上 **@nuxt/ui v3** 已轉向 Nuxt 4 依賴，故本專案固定 v2 以符合 `website-planning.md` **§8.2** 之 Nuxt 3 定案）
- **Tailwind CSS**（由 `@nuxt/ui` v2 經 `@nuxtjs/tailwindcss` 帶入）、**§5.5** 語意色見 `tailwind.config.ts` 與 `assets/css/main.css`
- **Lucide**：`@iconify-json/lucide` + Nuxt Icon（`i-lucide-*`）
- **社群圖示**：`@iconify-json/simple-icons`（Footer 佔位按鈕用）
- **全站框架**（階段 2）：`layouts/default.vue`、`components/AppHeader.vue`、`components/AppFooter.vue`、聯絡資料 `utils/siteContact.ts`（與 `intruduction.md` 一致）
- **首頁區塊**（階段 4）：`components/HomeHero.vue`、`HomeTrustStrip`、`HomeServices`、`HomePhilosophy`、`HomeNewsPick`、`HomeInstagram`、`HomeLawyerPreview`、`HomeCtaStrip`

## 指令

於 **repo 根目錄**：`npm run dev:frontend`。  
於 **本目錄**：`npm run dev`。  
型別檢查／建置：根目錄可用 `npm run typecheck:frontend`、`npm run build:frontend`；若 shell 已在 `frontend` 內，請直接 `npm run typecheck` / `npm run build`，**不要**再執行 `cd frontend`。若建置時出現「Another Nuxt dev server is already running」，請先關閉其他 `nuxt dev`，或暫設 `NUXT_IGNORE_LOCK=1`。

## 規格

見 [`../website-planning.md`](../website-planning.md) **§8、§8.7** 與 [`../DEVELOPMENT-WORKFLOW.md`](../DEVELOPMENT-WORKFLOW.md)。
