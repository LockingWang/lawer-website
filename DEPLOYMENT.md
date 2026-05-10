# 部署指南（階段 12）

與 [`website-planning.md`](./website-planning.md) **§8.1～§8.5**、[`DEVELOPMENT-WORKFLOW.md`](./DEVELOPMENT-WORKFLOW.md) 階段 12 一致：前端 **Cloudflare Pages**，後端 **Railway**；機密僅寫在平台環境變數，**勿**提交 `.env`。

---

## 一、架構速覽

| 元件 | 託管 | 職責 |
|------|------|------|
| Nuxt 3 前端 | Cloudflare Pages | 靜態／預渲染 HTML、CDN、HTTPS |
| Express API | Railway | `POST /api/contact`、`GET /api/instagram/stories` |
| 網域（建議） | Cloudflare DNS | `www`（或 apex）→ Pages；`api.*` → Railway |

---

## 二、Cloudflare Pages（前端）

1. 連線 Git 儲存庫，建立專案。
2. **Build configuration**（Monorepo）建議：
   - **Root directory（根目錄）**：`frontend`
   - **Build command**：`npm ci && npm run build`
   - **Build output directory**：`.output/public`
3. **Environment variables（生產／預覽）**：至少設定  
   `NUXT_PUBLIC_API_BASE` = 你的 Railway 公開 HTTPS 基底（**無**尾階斜線），例如 `https://xxxx.up.railway.app` 或自訂 `https://api.example.com`。
4. 自訂網域：於 Pages 專案綁定 `www` 或 apex，並依精靈在 DNS 新增紀錄。
5. **預覽部署**：每個 PR／分支會得到不同子網域（常見為 `*.pages.dev` 或 `*.project-name.pages.dev`）。後端 **CORS** 須允許這些來源（見下文 **§四**）。

官方參考：[Deploy a Nuxt site to Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/)（本專案以 **預渲染 + 靜態輸出** 為主，輸出目錄為 `.output/public`）。

---

## 三、Railway（後端）

### 方式 A：Nixpacks（預設，無 Docker）

1. New Project → Deploy from GitHub repo。
2. **Root Directory**：`backend`
3. **Start Command**：`npm start`（等同 `node src/server.js`）。
4. 於 **Variables** 填入 [`backend/.env.example`](./backend/.env.example) 所列變數（含 `CORS_*`、寄信、IG 等）。

### 方式 B：Dockerfile

1. 同一服務將 **Dockerfile path** 設為 `backend/Dockerfile`（**Root Directory** 仍建議 `backend`）。
2. `docker build` 預設以 `backend/` 為 build context；本 repo 之 `backend/Dockerfile` 僅複製該目錄內檔案。

部署後於 **Settings → Networking** 取得公開 URL，填入前端 `NUXT_PUBLIC_API_BASE`。

---

## 四、CORS（正式站與預覽站）

瀏覽器會帶 `Origin`；後端白名單由環境變數控制（見 [`backend/src/server.js`](./backend/src/server.js)）。

| 變數 | 說明 |
|------|------|
| `CORS_ORIGINS` | 逗號分隔的**完整來源**（含 scheme），例如 `https://www.example.com,https://example.com,http://localhost:3000` |
| `CORS_ORIGIN_SUFFIXES` | **選填**。逗號分隔的 **hostname 後綴**（不含 `https://`），僅匹配 **`https://`** 來源。例：`pages.dev,cloudflarepages.net` 可涵蓋多數 Cloudflare Pages 預覽網址，省去每支預覽網址手動加入白名單。 |

**安全注意**：後綴放寬後，任何符合該後綴的 HTTPS 網站若知道你的 API URL，理論上可從瀏覽器呼叫（仍受表單／限流等保護）。若需最嚴格白名單，可**不設** `CORS_ORIGIN_SUFFIXES`，只列 `CORS_ORIGINS` 的固定網址。

---

## 五、環境變數總表

### 前端（Cloudflare Pages）

| 變數 | 必填 | 說明 |
|------|:----:|------|
| `NUXT_PUBLIC_API_BASE` | 建議 | Railway API 基底 URL，無尾階 `/`。留空時聯絡表單不呼叫後端（與本機行為一致）。 |

### 後端（Railway）

| 變數 | 必填 | 說明 |
|------|:----:|------|
| `PORT` | 否 | Railway 通常會注入；未設則預設 `3001`。 |
| `CORS_ORIGINS` | 建議 | 正式網域與本機開發來源。 |
| `CORS_ORIGIN_SUFFIXES` | 否 | Pages 預覽用 hostname 後綴（僅 `https`）。 |
| `CONTACT_TO_EMAIL` | 條件 | 收件信箱；與 `MAIL_DRY_RUN`／SMTP／Resend 擇一組合見 `backend/README.md`。 |
| `MAIL_DRY_RUN` | 否 | `1` 時不寄信（僅測試）。 |
| `SMTP_*` / `RESEND_*` | 條件 | 寄信擇一；見 `backend/.env.example`。 |
| `INSTAGRAM_*`、`META_*` | 否 | IG 代理；未設時回空陣列與 `source:disabled`。 |

完整欄位與註解以 **`backend/.env.example`**、**`frontend/.env.example`** 為準。

---

## 六、上線後檢查清單（非代購網域）

- [ ] DNS：`www`／apex 指向 Pages；`api` 子網域 CNAME 至 Railway（依平台精靈）。
- [ ] Pages 與 Railway 皆為 **HTTPS**。
- [ ] 生產環境 `NUXT_PUBLIC_API_BASE` 指向正式 API。
- [ ] `CORS_ORIGINS` 含正式官網；預覽需求則加 `CORS_ORIGIN_SUFFIXES` 或逐筆預覽 URL。
- [ ] 關閉 `MAIL_DRY_RUN`，並以實際表單送出測試寄信。
- [ ] 首頁、`/contact`、`/news` 等主路徑可開啟（對應階段 12 驗收）。

本地仍建議定期執行 repo 根目錄 **`npm run verify`**。
