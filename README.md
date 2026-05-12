# 無憂吳律事務所｜官網（開發中）

本 repo 為 **無憂吳律事務所** 官方網站之原始碼與企劃文件。實作前請先閱讀下列文件（**不可略過**）：

| 文件 | 說明 |
|------|------|
| [`website-planning.md`](./website-planning.md) | 產品、IA、UX、色系 Token、法遵、**§8 技術與部署**之完整規格 |
| [`DEVELOPMENT-WORKFLOW.md`](./DEVELOPMENT-WORKFLOW.md) | 分階段範圍、驗收、Agent 守則 |
| [`DEVELOPMENT-PHASE.md`](./DEVELOPMENT-PHASE.md) | **目前實作階段（0～12）**；進入下一階段時僅需更新此檔 |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | **Cloudflare Pages + Railway**：建置指令、輸出目錄、CORS、環境變數（階段 12） |
| [`intruduction.md`](./intruduction.md) | 事務所／主持律師之內容種子（聯絡方式等） |

---

## §8 技術選型摘要（與企劃書一致）

| 層級 | 選型 | 託管 |
|------|------|------|
| 前端 | **Nuxt 3** + **TypeScript**、**Vite**、**Tailwind CSS**、**Nuxt UI**、**Lucide**、進階動效 **GSAP** | **Cloudflare Pages**（靜態／SSG 為主） |
| 後端 | **Node.js**（Express／Fastify／Hono 擇一）：聯絡表單寄信、Instagram Graph API 代理 | **Railway** |
| 內容 | 最新消息等 **僅前端 repo 維護**；**不使用 Supabase**、無 CMS 資料庫 | — |

機密（Meta App Secret、郵件 API Key、SMTP 密碼等）**僅**能出現在後端環境變數（例如 Railway），**不得**提交至 Git 或寫進前端 bundle。

---

## 目錄結構（階段 0 起）

```
lawer-website/
├── frontend/          # Nuxt 3 前端（階段 1 起初始化並可 npm run dev）
├── backend/           # Node API（階段 8 起實作寄信；階段 10 起 IG 代理）
├── images/            # 設計素材（`firm-logo-*`、`firm-brand-mark-*`、律師肖像、名片等 ASCII 檔名）；非前端建置輸出，上線前請同步複製至 `frontend/public/`
├── website-planning.md
├── DEVELOPMENT-WORKFLOW.md
├── DEVELOPMENT-PHASE.md
├── DEPLOYMENT.md      # Cloudflare Pages + Railway（階段 12）
├── intruduction.md
├── package-lock.json  # npm 鎖檔（請與 package.json 一併提交）
└── README.md
```

---

## 環境需求

- **Node.js** ≥ 20（內建 **npm**，**不必**另外安裝 pnpm 即可完成階段 0 驗收）
- **pnpm**（選用）：若已全域安裝，仍可使用 `pnpm install`／`pnpm dev:frontend`（與 npm 指令等效）

---

## 安裝與驗收

### 階段 0：workspace

於 repo **根目錄**：

```bash
npm install
npm run dev:backend
```

啟動後終端應出現 `listening on http://127.0.0.1:3001`（PORT 可自 `.env` 調整）。另開終端執行 `curl -sS http://127.0.0.1:3001/health`，應回傳 `{"ok":true,...}`。按 **Ctrl+C** 結束伺服器。細節見 [`backend/README.md`](./backend/README.md)。

### 階段 1：Nuxt 前端

同樣在根目錄：

```bash
npm install
npm run dev:frontend
```

瀏覽器開啟終端機網址（預設 `http://localhost:3000`），應可見 **§5.5 Token 示範** 與 **Nuxt UI 按鈕 + Lucide 圖示**。正式建置：於 repo 根目錄執行 `npm run build:frontend`（或**若已在 `frontend` 目錄**則直接 `npm run build`，**勿**再 `cd frontend`，否則會出現 `no such file or directory: frontend`）。

### 一鍵驗收（建議每次合併前執行）

於 **repo 根目錄**：

```bash
npm run verify
```

會依序執行：前端 **typecheck**、後端 **GET /health**、**POST /api/contact**（合法／honeypot／驗證 400）、**GET /api/instagram/stories**（無憑證時 `source:disabled`）、前端 **production build**，並檢查預渲染之 **`/contact` HTML** 是否含關鍵字。後端測試使用暫用埠（預設 **3099**，可設環境變數 `VERIFY_PORT` 覆寫）與 `MAIL_DRY_RUN=1`，不寄真信；若埠已被占用，腳本會先嘗試釋放該埠。

手動補強（建議上線前再做一次）：同時執行 `npm run dev:backend` 與 `npm run dev:frontend`，在 `frontend/.env` 設定 `NUXT_PUBLIC_API_BASE` 指向後端，於瀏覽器開啟 `/contact` 實際送出表單，確認成功訊息與後端日誌（含 **CORS** 與 **`$fetch`** 行為）。

**正式／預覽上線**：請依 **[`DEPLOYMENT.md`](./DEPLOYMENT.md)** 設定 Cloudflare Pages、Railway 與 `CORS_ORIGINS`／`CORS_ORIGIN_SUFFIXES`。

---

## 環境變數範本（不含密碼）

複製範本後改名為 `.env`（**勿**將 `.env` 提交至 Git）：

- 前端：`frontend/.env.example` → `frontend/.env`  
- 後端：`backend/.env.example` → `backend/.env`  

變數語意以 `website-planning.md` **§8.2、§8.4、§8.5** 為準；實作階段再逐項填寫。

---

## 部署（階段 12）

- **總覽**：[**`DEPLOYMENT.md`**](./DEPLOYMENT.md)（Cloudflare Pages 建置／輸出、Railway `Dockerfile` 或 `npm start`、環境變數表、CORS 正式與預覽網域）。
- **後端**：亦可見 [`backend/README.md`](./backend/README.md)。

---

## 維運與內容更新

階段 0～12 流程表已涵蓋本專案初版上線所需實作。**最新消息**等內容變更：修改 `frontend/` 內資料或元件後，重新觸發 Cloudflare Pages 建置即可（見企劃 §8.3）。
