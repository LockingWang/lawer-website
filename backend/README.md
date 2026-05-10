# 後端（`@lawer/backend`）

Node.js **Express** 小服務：**POST `/api/contact`**（階段 8）、**GET `/api/instagram/stories`**（階段 10，Graph 代理 + 約 90 秒記憶體快取）。

技術邊界見 [`website-planning.md`](../website-planning.md) **§8.4**。

聯絡 API 之自動化驗收已併入 repo 根目錄 **`npm run verify`**（會暫起後端並以 curl 測試）。

## 本機執行

於 **repo 根目錄**：

```bash
cp backend/.env.example backend/.env
# 至少保留 MAIL_DRY_RUN=1 可不需真 SMTP 即驗證 API
npm install
npm run dev:backend
```

預設監聽 `http://127.0.0.1:3001`。

## 健康檢查

```bash
curl -sS http://127.0.0.1:3001/health
```

## 聯絡表單 POST（curl 驗收）

請帶與前端相同之 JSON 欄位；`Origin` 須落在 `CORS_ORIGINS` 白名單（本機預設可帶 `http://localhost:3000`）。

```bash
curl -sS -X POST http://127.0.0.1:3001/api/contact \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "name": "測試",
    "phone": "0912345678",
    "email": "",
    "summary": "curl 驗證留言",
    "privacyAccepted": true,
    "website": ""
  }'
```

預期（`MAIL_DRY_RUN=1`）：`{"ok":true,"mail":"dry_run"}`，且終端機印出 `[contact] MAIL_DRY_RUN`。

**Honeypot**：`"website":"機器人填的"` 時仍回 `200` 且 `{"ok":true,"accepted":true}`，**不寄信**。

**驗證失敗**：缺姓名等 → `400` 與 `code: validation_error`、`issues` 陣列。

## Instagram 限時動態 GET（階段 10）

```bash
curl -sS http://127.0.0.1:3001/api/instagram/stories
```

未設定 `INSTAGRAM_IG_USER_ID`／`INSTAGRAM_ACCESS_TOKEN` 時仍回 **`200`**，`stories` 為 `[]`，`meta.source` 為 `disabled`（前端依 §2.6 顯示備援）。

設定憑證後，後端會向 `graph.facebook.com` 取目前有效限動；Graph 錯誤時同樣回 **`200`** 空陣列與 `meta.source: error`，不洩漏權杖。

## 正式寄信（Railway）

擇一設定：

1. **SMTP**：`CONTACT_TO_EMAIL`、`SMTP_HOST`、`SMTP_PORT`、`SMTP_USER`、`SMTP_PASS`；`MAIL_DRY_RUN` 勿設或設 `0`。可選 `SMTP_FROM`。
2. **Resend**：`CONTACT_TO_EMAIL`、`RESEND_API_KEY`、`RESEND_FROM`（須為 Resend 已驗證網域）；勿設 `SMTP_HOST`。

未設定寄信且 `MAIL_DRY_RUN` 未開啟時，會回 `503`（`mail_not_configured`）。

## CORS

- **`CORS_ORIGINS`**：逗號分隔多個前端來源（含 `https://你的網域` 與必要時之固定預覽 URL）。瀏覽器請求會帶 `Origin`；**curl 可不帶 Origin** 仍會通過。
- **`CORS_ORIGIN_SUFFIXES`**（選填）：逗號分隔之 **hostname 後綴**（不含 `https://`），僅匹配 **https** 來源，便於一次允許多組 Cloudflare Pages 預覽網址（例：`pages.dev,cloudflarepages.net`）。見 [`DEPLOYMENT.md`](../DEPLOYMENT.md) 第四節。

## Railway 部署建議

- **Root Directory**：`backend`
- **Start Command**：`npm start`
- **Docker（選用）**：於 Railway 指定 **Dockerfile** 為 `backend/Dockerfile`（build context 為 `backend/`）。
- 於 Variables 填入上列環境變數（勿將密鑰提交 Git）。

完整步驟與 CORS 預覽網域說明見 repo 根目錄 **[`DEPLOYMENT.md`](../DEPLOYMENT.md)**。
