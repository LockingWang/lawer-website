/**
 * 扁平 ESLint 設定（不依賴 `.nuxt/eslint.config.mjs`，避免 `nuxt typecheck` 在未產檔時報錯）。
 * 若日後要接 Nuxt 官方 ESLint 整合，可改回 `withNuxt(...)` 並確保 `nuxt prepare` 已執行。
 */
export default []
