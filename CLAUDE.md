# 無憂吳律事務所｜專案說明

## 專案概覽

高雄在地法律事務所（無憂吳律 / Sallywu Attorneys-At-Law）的官方網站。
Nuxt 3 前端 + Node.js 後端（Railway 部署），設計強調「專業可信、溫暖親民」。

## 架構

- `frontend/` — Nuxt 3 + Tailwind CSS + Nuxt UI；開發伺服器：`npx nuxt dev`
- `backend/` — Express；提供聯絡表單寄信、Instagram Graph API 代理

## UI 設計工作

**每次進行 UI / 視覺設計任務前，請先閱讀：**

```
.claude/design-director.md
```

該文件定義了本專案的設計總監角色、品牌調性、色彩系統、動效規範與禁止事項。
所有元件、版面、視覺決策都應以該文件為基準。

## 色彩 Token（速查）

| Token | HEX | 用途 |
|---|---|---|
| brand-500 | #5789B6 | 主按鈕、連結 |
| brand-700 | #3D5F94 | 深色區塊背景 |
| navy-deep | #2F4778 | Footer、最深色 |
| accent-teal | #57ACAC | 小型點綴、圖示 |
| ink | #393934 | 正文 |
| surface-muted | #F5F6F4 | 淺色區塊背景 |

## 重要提醒

- 元件放在 `frontend/components/`，頁面放在 `frontend/pages/`
- 色彩定義在 `frontend/tailwind.config.ts`
- 動效元件：`MotionSection.vue`（捲動進場）
- 文案資料來源：`frontend/utils/intruductionSeed.ts`、`intruduction.md`
