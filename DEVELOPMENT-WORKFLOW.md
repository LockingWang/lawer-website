# 無憂吳律事務所網站｜分階段開發流程表

本文與 [`website-planning.md`](./website-planning.md) 並列為**實作期唯一依據**。  

**不必每輪貼 Prompt**：專案已設定 Cursor 規則 [`.cursor/rules/lawer-website-workflow.mdc`](./.cursor/rules/lawer-website-workflow.mdc)（`alwaysApply: true`），Agent 會自動讀取 **[`DEVELOPMENT-PHASE.md`](./DEVELOPMENT-PHASE.md)** 中的階段數字並對照本文第三、四節。你只要**改 `DEVELOPMENT-PHASE.md` 裡的階段數字**並存檔，再開新對話請 Agent 實作即可。若臨時要改階段，也可在對話裡直接寫「請實作階段 N」。

---

## 一、文件角色（給人類與 Agent）

| 文件 | 用途 |
|------|------|
| **`website-planning.md`** | 產品、IA、UX、視覺 Token、技術棧、部署、法遵與功能邊界之**完整規格**。實作不得與之矛盾。 |
| **`DEVELOPMENT-WORKFLOW.md`（本文件）** | **開發順序、每階段範圍、驗收方式、Agent 守則**。可隨進度更新勾選狀態。 |
| **`DEVELOPMENT-PHASE.md`** | **目前實作階段編號（0～12）**；進入下一階段時只改此檔，無需重貼 Prompt。 |
| **`intruduction.md`** | 事務所聯絡資訊、律師學經歷與創所理念之**內容種子**（定稿前仍可能微調）。 |

**素材未齊時**：依企劃書 §3.5，使用**佔位圖、佔位文案、假資料**；佔位處建議以註解或常數集中標記 `TODO(ASSET)`，便於日後替換。

---

## 二、Agent 強制守則（實作前必讀，不可略過）

下列為**非討價還價項**。若規格與 Agent「慣例」衝突，**以企劃書為準**。

1. **技術棧**須符合 `website-planning.md` **§8、§8.7**：**Nuxt 3** + **TypeScript**、**Tailwind CSS**、**Nuxt UI**、**Lucide**、進階動效 **GSAP**（並遵守 **§4.5**、`prefers-reduced-motion`）。不得擅自改為其他框架或 UI 庫。
2. **後端**僅 **Node.js**（Express / Fastify / Hono 擇一），部署 **Google Cloud Run**；職責僅 **§8.4** 所列兩項（表單寄信、IG Graph API 代理）。**禁止**引入 **Supabase**、資料庫 CMS、或將 Meta／郵件密鑰置於前端（**§8.1、§8.2**）。
3. **RWD**：**Mobile-first**（**§2.0、§3.3**）。不得只做桌面版後硬縮放。
4. **Header / Footer**：須符合 **§2.2b**（導覽路由一致、Footer 含 LINE QR 區塊語意與 RWD 堆疊、外連 `rel="noopener noreferrer"`）。
5. **色系**：使用企劃書 **§5.5** 之 Token 語意（`primary`、`ink`、`navy-deep` 等），避免散落未命名 HEX。
6. **最新消息**：**僅前端專案內維護**（**§8.3**），單篇獨立 URL，利於 SEO（**§6.4**）。
7. **表單**：欄位與法遵方向依 **§2.5**；防機器人與限流須有實作或明確佔位與後續項目註記。
8. **IG**：後端代理、前端僅呼叫公開 JSON；失敗時 **§2.6** 備援 UI 必須存在。
9. **範圍控制**：企劃 **§8.7** 已說明本階段**不**含見證／案例長列表等未列入 **§2.2 IA** 之頁面；**不得**自行擴 scope。
10. **完成一階段只改該階段約定之檔案與功能**：避免「順便重構全站」或無關檔案大改。

若 Agent 建議偏離上列任一點，應**先停下來請你（專案負責人）書面同意**，並回寫企劃書後再實作。

---

## 三、階段總覽表（建議順序）

| 階段 | 名稱 | 主要產出 | 驗收時你應能… | 對應企劃章節 |
|:----:|------|----------|----------------|--------------|
| **0** | 專案骨架與規範落地 | Repo 目錄、`README`、環境變數範例、根 `.gitignore` | clone 後依 `README` 安裝並跑起空殼 | §8 |
| **1** | Nuxt 基礎＋設計 Token | Nuxt3+TS、Tailwind、§5.5 Token、全域字型／底色 | 在瀏覽器看到套用主色之空白佈局 | §5.5、§8.2、§8.7 |
| **2** | 全域版面：Header／Footer／RWD | 漢堡選單、主導覽路由、Footer 區塊（LINE QR 用佔位圖） | 手機與桌面切換導覽正常、連結一致 | §2.2b、§3.3 |
| **3** | 路由與頁面空殼 | IA 所列各頁、`title`/`description` 骨架 | 每個導覽項目有對應頁面（可極簡） | §2.2、§6.4 |
| **4** | 首頁區塊（假圖文） | Hero、服務摘要、理念、新聞精選區、律師預覽、CTA（素材佔位） | 首頁捲動區塊齊、手機可讀 | §3.2、§2.2 |
| **5** | 本所介紹＋律師介紹頁 | 排版＋`intruduction.md` 內容接入（可日後改字） | 兩頁內容正確、CTA 至聯繫頁 | §2.3、`intruduction.md` |
| **6** | 最新消息模組 | 列表＋單篇、資料源（JSON 或 MD）、SSG/預渲染可瀏覽 | 點列表進單篇、網址獨立 | §8.3、§6.4 |
| **7** | 聯繫頁 UI | 表單欄位、地圖佔位、社群連結佔位、隱私勾選框 | 表單可填、驗證提示（可先不接 API） | §2.5、§6.5 |
| **8** | Google Cloud Run 後端：聯絡 API | POST 驗證、honeypot/限流、SMTP 或郵件 API 設定說明 | 用 curl/Thunder 測通寄信（或測試信箱） | §8.4、§2.5 |
| **9** | 前端串接表單 | `NUXT_PUBLIC_API_BASE`、成功/失敗 UX、**§2.5 備援**文案 | 從網站送出後後端收到並寄信 | §8.2、§6.5 |
| **10** | IG API 代理＋首頁區塊 | GET 限動 JSON、快取、前端與 **§2.6 失敗備援** | 拔 token 或故意錯誤時仍見備援 UI | §2.6、§8.4 |
| **11** | 動效與無障礙掃尾 | GSAP 進場（克制）、`prefers-reduced-motion`、對照 §5.6 | 減少動態開啟時不強迫動畫 | §4.5、§5.6、§8.7 |
| **12** | 部署與文件 | Cloudflare Pages、Google Cloud Run、CORS、網域變數清單 | 正式／預覽環境可連線 | §8.1、§8.5 |

**建議節奏**：完成階段 *N* → 你本地執行專案檢查 → 回饋修正 → 勾選「階段驗收」後再開階段 *N+1*。

---

## 四、各階段範圍與驗收清單（可列印給 Agent）

### 階段 0 — 專案骨架與規範落地

- **做**：目錄約定（例：`frontend/` Nuxt、`backend/` Node）、根 `README`（如何安裝、如何跑 dev）、`.env.example`（不含密碼）、註明必讀 `website-planning.md`。
- **不做**：商業邏輯、漂亮 UI。
- **驗收**：`README` 步驟可重現；Agent 已將 §8 技術選型寫入 README。

### 階段 1 — Nuxt 基礎＋設計 Token

- **做**：Nuxt3 + TS、Tailwind、§5.5 CSS 變數或 `tailwind.config` 對應、Nuxt UI 安裝、Lucide 可用。
- **不做**：完整頁面內容。
- **驗收**：主色 `primary`、字色 `ink` 等可於元件中直接使用。

### 階段 2 — Header／Footer／RWD

- **做**：§2.2b 結構；手機漢堡；Footer 直向堆疊；LINE QR **佔位圖** + `alt`。
- **不做**：表單送出、IG。
- **驗收**：375px 與 ≥1024px 可操作；外連新分頁 + `rel`。

### 階段 3 — 路由與頁面空殼

- **做**：首頁、本所介紹、律師介紹、最新消息（列表占位）、聯繫本所；選做：隱私權政策空殼連結。
- **不做**：首頁豐富區塊（留階段 4）。
- **驗收**：導覽與 URL 一一對應；每頁有獨立 `title`。

### 階段 4 — 首頁區塊（假圖文）

- **做**：§3.2 表格中與企劃一致之區塊；IG 區塊可先靜態「前往 IG」備援。
- **不做**：真 IG API。
- **驗收**：首頁與 §3.2 區塊對得上；LCP 明顯過大圖片需標 TODO 壓縮。

### 階段 5 — 本所介紹＋律師介紹

- **做**：`intruduction.md` 資訊接入；聯絡方式與 Footer **同一資料源**（避免多版本）。
- **不做**：法律長文自動生成（僅排版呈現既有種子）。
- **驗收**：電話可點撥、地址一致。

### 階段 6 — 最新消息

- **做**：≥2 則假消息；列表＋`slug` 單篇；Nuxt 靜態或 SSG 可建。
- **不做**：後台、資料庫。
- **驗收**：部署預覽時單篇有獨立 URL。

### 階段 7 — 聯繫頁 UI

- **做**：§2.5 建議欄位、隱私勾選、地圖 iframe 或圖片佔位、社群 `#` 或假網址並 `TODO(SOCIAL)`。
- **不做**：真後端連線（階段 9）。
- **驗收**：前端驗證、錯誤態、成功態 UI（可先 mock）。

### 階段 8 — Google Cloud Run 後端：聯絡 API

- **做**：POST、`CORS` 白名單設計、限流或 honeypot、寄信整合說明。
- **不做**：IG（階段 10）。
- **驗收**：本地或 Cloud Run 上 curl 測試成功。

### 階段 9 — 前端串接表單

- **做**：`NUXT_PUBLIC_API_BASE`、錯誤與成功訊息（§6.5）、失敗備援「請改撥電話…」。
- **不做**：過度行銷動畫。
- **驗收**：端到端寄信一封到你指定信箱。

### 階段 10 — IG 代理＋前端

- **做**：後端快取、前端故事列或輪播；失敗備援 §2.6。
- **不做**：若無 Meta 憑證，後端可回固定「空陣列」但前端備援必須可見。
- **驗收**：關閉 API 時使用者仍知道如何到 IG。

### 階段 11 — 動效與無障礙掃尾

- **做**：GSAP 與 CSS 分工 §8.7；鍵盤焦點、對比、表單 label。
- **不做**：全屏炫技、違反 §4.5 之長動畫。
- **驗收**：macOS「減少動態效果」或 `prefers-reduced-motion` 模擬通過。

### 階段 12 — 部署與文件

- **做**：Cloudflare Pages 建置指令、Google Cloud Run `Dockerfile` 或 start 指令、環境變數表、CORS 正式/預覽網域。
- **不做**：代客購買網域（可列檢查清單）。
- **驗收**：預覽 URL 可瀏覽全站主路徑。

---

## 五、進度追蹤（你可自行打勾）

| 階段 | 開始日 | 驗收通過 | 備註 |
|:----:|--------|----------|------|
| 0 | [x] | [x] | 本機 `npm install` + `dev:frontend`／`dev:backend` 通過 |
| 1 | [x] | [x] | Nuxt 3 + @nuxt/ui v2 + Tailwind Token + Lucide；`npm run build` 通過 |
| 2 | [x] | [x] | Header／Footer／漢堡／LINE QR 佔位；導覽路由可點 |
| 3 | [x] | [x] | 各頁 title/SEO、首頁區塊占位、新聞列表+slug、隱私權、intruduction 種子 |
| 4 | [x] | [x] | 首頁 §3.2 區塊：Hero～CTA、IG 靜態備援、intruductionSeed 擴充 |
| 5 | [x] | [x] | `PublicContactBlock` + `siteContact`；`/firm`、`/lawyer`、`/contact`、Footer 聯絡一致；SEO 用 `addressSingleLine` |
| 6 | [x] | [x] | `NewsArticle` + 正文段落；`/news`、`/news/[slug]`；Nitro `prerender` + `crawlLinks` |
| 7 | [x] | [x] | 聯繫頁：`ContactRequestForm`（UForm 驗證、honey、成功／失敗態 mock）、地圖佔位＋Google 連結、社群 TODO(SOCIAL) |
| 8 | [x] | [x] | Express：`POST /api/contact`、`GET /health`、CORS 白名單、honeypot、rate limit、SMTP／Resend／MAIL_DRY_RUN |
| 9 | [x] | [x] | `runtimeConfig.public.apiBase`、`ContactRequestForm` `$fetch` POST、400 `setErrors`、失敗備援、無 API 時 mock |
| 10 | [x] | [x] | `GET /api/instagram/stories` Graph 代理、快取、`HomeInstagram` 串 `apiBase`、§2.6 備援 |
| 11 | [x] | [x] | GSAP 進場、`usePrefersReducedMotion`、`MotionSection`、跳至主要內容 |
| 12 | [x] | [x] | `DEPLOYMENT.md`、Google Cloud Run `Dockerfile`、`CORS_ORIGIN_SUFFIXES`、README 部署／維運 |

---

## 六、每次委託 Agent 的 Prompt 範本（選用）

預設請依 **§一** 使用 `DEVELOPMENT-PHASE.md` + Cursor 規則，**無須貼下文**。若規則未生效或非 Cursor 環境，可再複製使用。

```text
請只實作「無憂吳律事務所網站」DEVELOPMENT-WORKFLOW.md 的【階段 N】。

強制要求（違反則視為未完成）：
1. 實作前請在回覆開頭列出：本階段「要做」與「不做」事項（以 DEVELOPMENT-WORKFLOW 第三、四節為準）。
2. 全程遵守同 repo 內 website-planning.md；技術棧與邊界以 §8、§8.7 為準，禁止 Supabase、禁止機密進前端。
3. 只改動本階段範圍內必要之檔案；結束時簡述變更檔案列表與如何本地驗收（指令與 URL 路徑）。
4. 素材不足處用佔位並標記 TODO(ASSET) 或 TODO(SOCIAL)，勿發明與 intruduction.md 矛盾之聯絡方式。

完成後我會自行執行專案驗收；請勿擅自開始階段 N+1。
```

---

## 七、你檢查專案時的簡短核對（每階段後）

- [ ] 根目錄 `npm install` 後 `npm run dev:frontend`／`npm run dev:backend`（或 README）可啟動。
- [ ] 手機寬度下首屏與導覽可用。
- [ ] 無將 `.env` 密碼提交進 Git。
- [ ] 本階段「不做」項目沒有被順便做完（避免範圍蔓延）。

---

## 八、本流程表修訂

| 版本 | 日期 | 摘要 |
|------|------|------|
| 1.0 | 2026-05-10 | 初版：12 階段、Agent 守則、Prompt 範本、驗收表 |
| 1.5 | 2026-05-10 | 階段 4：首頁 Home* 元件、服務／信任／新聞精選／IG 備援／CTA |
| 1.6 | 2026-05-10 | 階段 12：`DEPLOYMENT.md`、Google Cloud Run `backend/Dockerfile`、`CORS_ORIGIN_SUFFIXES`、README 部署連結 |
