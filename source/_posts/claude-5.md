---
title: claude-5
abbrlink: e9bd
date: 2026-08-12 09:58:24
categories: AI
tags:
  - claude
---

### top
#### create project 
{% note info %}
### Command
npx create-next-app@latest demo-lunea-ecommerce --typescript --tailwind --app --eslint --src-dir
cd demo-lunea-ecommerce
git init; git add .; git commit -m "init"

### 參數拆解說明
快速建立 **Next.js** 專案的終端機（Terminal）指令。它會自動幫你配置好現代前端開發最常用的工具鏈與專案結構。

* **`npx create-next-app@latest`**
* `npx` 是 Node.js 的套件執行工具，不用事先全域安裝，就能直接執行最新版本的 `create-next-app`（Next.js 官方的專案初始化工具）。
* `@latest` 確保你下載並使用的是官方最新的 Next.js 版本。

* **`demo-lunea-ecommerce`**
* 這是你的**專案名稱**（同時也是建立的資料夾名稱）。在這個例子中，它被命名為專門用來做電商網站的 `demo-lunea-ecommerce`。

* **`--typescript`**
* 強制使用 **TypeScript**，為程式碼提供型別檢查，減少執行時期的錯誤，提升大型專案的可維護性。

* **`--tailwind`**
* 自動整合 **Tailwind CSS**，讓你透過寫原子化 CSS 類別（Utility classes）來快速設計網頁介面。

* **`--app`**
* 使用 Next.js 的 **App Router** 架構（基於 `app/` 目錄），這是目前 Next.js 推薦的現代化路由機制，支援伺服器元件（Server Components）與進階的資料取得方式。

* **`--eslint`**
* 自動設定 **ESLint**，用來檢查程式碼風格與潛在錯誤，確保程式碼品質一致。

* **`--src-dir`**
* 將所有的原始程式碼（如 `app`、`components` 等）放在一個統一的 **`src/` 資料夾** 內，讓專案根目錄保持乾淨整潔。

### 執行後會發生什麼事？
當你在終端機輸入這行指令並按下 Enter 後，系統會自動在當前目錄建立一個名為 `demo-lunea-ecommerce` 的資料夾，並安裝好所有相依套件。
安裝完成後，你只需要依序輸入以下指令即可啟動開發伺服器：

```bash
npm run dev
```
接著打開瀏覽器輸入 `http://localhost:3000`，就能看到 Next.js 的預設歡迎畫面，並開始打造你的電商網站了！

{% endnote %}


#### add CLAUDE.md
``` bash
# LUNÉA — 高端香水電商（Demo）

## 專案概述
虛構高端香水品牌 LUNÉA 的 B2C 電商示範網站。無後端，商品資料來自 src/data/products.json，購物車存於 localStorage。

## 技術約定
- Next.js App Router + TypeScript（strict）+ Tailwind CSS
- Server Components 優先，只有需要互動的元件才加 "use client"
- 狀態管理：Zustand（購物車、試香組），使用 persist middleware
- 動畫：Framer Motion，必須尊重 prefers-reduced-motion
- 表單：react-hook-form + zod
- 圖片一律使用 next/image
- 介面語言：繁體中文為主，品牌名、香調名可保留英文

## 設計原則
- 只能使用 tailwind.config 中定義的 design tokens，禁止寫死色碼或任意值
- 共用元件放在 src/components/ui，頁面專屬元件放在 src/components/<page>
- 風格：大量留白、精緻細線、低飽和色調；奢華但不浮誇
- 參考氣質：Le Labo、Byredo、Aesop

## 工作流程（每個任務都要遵守）
1. 開始前先讀 docs/SPEC.md
2. 完成後執行 npm run build 與 npm run lint，確認沒有錯誤
3. 使用 Playwright MCP 截圖：桌面版 1440px 與手機版 390px，自行檢查排版問題並修正
4. 回報：完成了什麼、改了哪些檔案、有哪些已知限制
5. 不要自行 git commit，由我驗收後處理
```

#### plan mode - 階段 1-A：產出規格書
``` bash
```

#### plan mode - 
``` bash
這一步不要寫程式，只產出 docs/SPEC-payment.md：LUNÉA 階段 7「真實下單＋綠界金流」的規格。

先讀：docs/SPEC.md、docs/shared-supabase-auth.md、docs/reference/ecpay-subscription-skill.md（flight 專案的綠界定期定額範本，請沿用其中的 CheckMacValue 驗證、1|OK 回應、SimulatePaid 防護、以 MerchantTradeNo 做冪等性、RLS 寫入鎖定等規則，但改寫為一次付清）。

前提：
- APP_NAME = "lunea"，所有資料表放在 schema lunea；每支 migration 都要明確寫 GRANT 並啟用 RLS；不在 auth.users 上掛 trigger
- 伺服器端用 Next.js Route Handlers（不用 Supabase Edge Functions）
- 綠界先使用 stage 共用測試特店（3002607），金鑰存在 Vercel 環境變數，程式碼與聊天中都不能出現金鑰
- 結帳方式：【訪客結帳 / 必須登入】（我決定後填入）

規格需涵蓋：
1. 資料表：orders、order_items 的欄位設計（含 merchant_trade_no、status、各項金額、付款方式、ATM／超商代碼取號資訊、發票、配送資訊），以及 RLS 與 GRANT
2. 訂單狀態機：pending_payment → paid / failed；貨到付款為 cod_pending；未付款的 pending_payment 訂單逾時處理（例如 30 分鐘後標為 failed）
3. POST /api/checkout：zod 驗證輸入 → 伺服器依 products.json 重新計算小計、折扣、運費、總計（完全不信任前端金額）→ 產生 ≤20 碼純英數的 MerchantTradeNo → 寫入訂單 → 回傳自動送出的 AIO 表單 HTML（ItemName 只放摘要、使用 LUNEA 不帶重音）
4. /api/ecpay/return：驗證 CheckMacValue（保留空字串欄位）＋ MerchantID ＋ TradeAmt 與訂單金額一致 ＋ RtnCode === "1" ＋ 排除 SimulatePaid → 條件式 update 為 paid（where status 不為 paid，做到冪等）→ 寄送確認信 → 回應 1|OK
5. /api/ecpay/result（瀏覽器 POST 後 303 轉址到成功頁）；本階段不支援 ATM、超商代碼，因此不需要 PaymentInfoURL
6. 前端改動：付款方式只保留「線上刷卡（信用卡 / Apple Pay）」與「貨到付款」，移除 LINE Pay 與前端信用卡欄位；ChoosePayment 固定為 Credit（Safari 會自動顯示 Apple Pay）；依 Content-Type 分流；成功頁改為讀取資料庫並輪詢
7. 測試計畫：stage 測試卡完整流程、用腳本產生合法簽章的回呼做重送與金額竄改測試、偽造的 CheckMacValue 必須回 0|…
8. 部署注意事項：Vercel Preview 的 Deployment Protection 會擋下回呼、本機開發需要通道（cloudflared）、正式上線切換正式特店的檢查清單
9. 選配（列出即可，暫不實作）：綠界電子發票、物流門市地圖、退刷

寫好後先給我確認。
```

#### plan mode - 
``` bash

```

### step 2
``` bash
請依照 CLAUDE.md 的設計原則建立 LUNÉA 的設計系統。

## 1. Design Tokens（tailwind.config 與 globals.css）
- 色彩：
  - 背景：奶油白、米色兩階
  - 文字：深炭褐（主要）、暖灰（次要）、淺灰（輔助）
  - 大地色：沙、陶土、橄欖
  - 點綴：淡金（只用在細線、hover、徽章等小面積）
  - 邊框：極淡暖灰
  - 每種 mood 的漸層，定義成 CSS 變數
- 字體（透過 next/font 載入）：
  - 標題：Cormorant Garamond（英文）＋ Noto Serif TC（中文）
  - 內文與 UI：Inter ＋ Noto Sans TC
  - 定義字級層次：display、h1–h4、body-lg、body、caption、overline（小字、大寫、加寬字距）
- 間距：section 間距使用寬鬆尺度，桌面版上下至少 120px
- 圓角：以直角或極小圓角為主，呈現精品感
- 陰影：只用極柔和的陰影
- 動畫：統一定義 easing（偏慢、優雅的 cubic-bezier）與 duration tokens

## 2. 基礎元件（src/components/ui）
- Button：primary（深色實心）、secondary（細線框）、ghost、text-link（底線動畫）；尺寸 sm/md/lg；支援 loading 與 disabled
- Input、Select、Radio、Checkbox：細線風格、focus 狀態明顯但優雅，含錯誤訊息樣式
- Badge：New、Bestseller、濃度標籤
- QuantitySelector：- 數字 +
- Divider：可帶置中文字的細線分隔
- SectionHeading：overline ＋ 標題 ＋ 副標
- Container：統一的最大寬度與左右留白
- Drawer：右側滑出，購物車和手機篩選都會用到
- Skeleton

## 3. /styleguide 頁面
依序展示：色票（含色碼與 token 名稱）、字級層次（中英文範例）、所有按鈕變體、表單元件、Badge、mood 漸層卡片、Drawer 開關示範。

完成後截圖給我，我要確認整體視覺方向。


The design system and the /styleguide page are done. npm run lint and npm run build both pass with no errors. I checked the page at 1440px and 390px: no horizontal scrolling and no console errors. The Drawer moves focus to its close button when it opens, and Esc closes it.

The Playwright MCP isn't connected in this session, so I took the screenshots with the Playwright CLI and Chrome instead. Full-page screenshots (open with your image viewer):
- Desktop: C:\Users\ROBERT~1\AppData\Local\Temp\claude\D--work-run-claude-demo-lunea-ecommerce\703058d3-8990-4202-80f5-0a4dcfac02d5\scratchpad\styleguide-desktop-full.png
- Mobile: C:\Users\ROBERT~1\AppData\Local\Temp\claude\D--work-run-claude-demo-lunea-ecommerce\703058d3-8990-4202-80f5-0a4dcfac02d5\scratchpad\styleguide-mobile-full.png
- Drawer open: C:\Users\ROBERT~1\AppData\Local\Temp\claude\D--work-run-claude-demo-lunea-ecommerce\703058d3-8990-4202-80f5-0a4dcfac02d5\scratchpad\styleguide-desktop-drawer.png and C:\Users\ROBERT~1\AppData\Local\Temp\claude\D--work-run-claude-demo-lunea-ecommerce\703058d3-8990-4202-80f5-0a4dcfac02d5\scratchpad\styleguide-mobile-drawer.png

Or run npm run dev and open http://localhost:3000/styleguide, so you can try hover and the Drawer.

```

#### step 3
``` bash
❯ 請依照 docs/SPEC.md 建立網站骨架與全站共用功能。

  1. 狀態管理（src/store）

  - cartStore（Zustand ＋ persist）：
    - items：一般商品（productId、size、qty）與試香組（含所選的 productIds）
    - actions：addItem、removeItem、updateQty、addDiscoverySet、clearCart
    - selectors：itemCount、subtotal、shippingFee（依 SPEC 的運費門檻）、total
    - 處理 hydration：在 client 端載入完成前，不要渲染購物車數量，避免 hydration mismatch
  - uiStore：控制購物車 Drawer 的開關

  2. Layout

  - Header：
    - 左側導覽（商店、香氣測驗、試香組、品牌故事），中間 LUNÉA Logo（用襯線字體排出精緻的文字 Logo），右側搜尋圖示（先做 UI 即可）與購物車圖示＋數量徽章
    - 捲動後背景變成半透明模糊、高度縮小
    - 手機版：漢堡選單，展開成全螢幕選單並帶入場動畫
  - Footer：品牌簡介、連結分欄、電子報訂閱欄位（送出後顯示感謝訊息即可）、社群圖示、版權
  - MiniCart：右側 Drawer，列出商品與小計，附「前往結帳」與「查看購物車」按鈕；購物車為空時顯示精緻的空狀態
  - 加入購物車後，自動開啟 MiniCart
  - Toast 通知元件

  3. 路由

  依 SPEC 建立所有路由的頁面檔案，內容先放頁面標題與簡短佔位即可，並設定好每頁的 metadata（title、description）。
  另外加上 not-found.tsx 與 loading.tsx，要符合品牌風格。

  4. 共用元件

  - ProductCard：圖片（hover 時切換第二張圖）、名稱、副標、濃度、起始價格、快速加入購物車按鈕（hover 時才出現，手機版常駐）
  - ProductGrid：響應式欄數，桌面 4 欄、平板 3 欄、手機 2 欄

  完成後測試：加入商品 → 重新整理頁面 → 購物車數量仍然保留。
```

#### step 4-1
``` bash
請先讀 docs/SPEC.md 與 CLAUDE.md。以下指令與 SPEC 衝突時，以 SPEC 為準並提出來。

沿用既有成果：
- 篩選與排序邏輯使用 src/lib/products.ts 已有的 filterProducts、sortProducts，不要另外重寫
- 商品網格使用既有的 ProductGrid、ProductCard；手機篩選使用既有的 Drawer
- 篩選 chip 使用 styleguide 中的 Tag／Chip 元件，mood 色點使用 taxonomy.ts 的漸層 token

與原指令的差異（以 SPEC 為準）：
- URL query 參數名稱依 SPEC §1：family、mood、price、conc、sort（例如 /shop?mood=warm,mysterious&sort=price-asc）
- 價格區間為多選，以 30ml 價格判定，級距依 SPEC §3.4
- 排序選項依 SPEC：featured（預設）、newest、price-asc、price-desc、name
- 商品共 12 款，結果數量文案為「共 12 款香氛」
- 不合法的 query 值（例如不存在的 mood id）要忽略，不能讓頁面出錯

請實作產品目錄頁 /shop。
## 版面
- 頂部：頁面標題、商品數量（例如「共 14 款香氛」）
- 桌面版：左側固定篩選欄＋右側商品網格
- 手機版：頂部列有「篩選」按鈕（顯示已套用的數量）和排序選單，點擊篩選會開啟 Drawer

## 篩選功能
- 香調家族（多選）、情緒（多選，以帶有該 mood 漸層的小色點呈現）、價格區間（多選）、濃度（多選）
- 已套用的篩選以可移除的 chip 顯示在網格上方，並附「清除全部」
- 排序：精選推薦、價格低到高、價格高到低、最新
- 篩選與排序狀態同步到 URL query（例如 /shop?mood=warm,mysterious&sort=price-asc），可以分享連結、上一頁也能保留狀態
- 支援從首頁 Shop by Mood 帶參數進來，例如 /shop?mood=fresh

## 細節
- 篩選變更時，商品網格要有柔和的淡入淡出過場
- 篩選結果為空時：顯示精緻的空狀態文案，加上「清除篩選」按鈕，並推薦 3 款精選商品
- 手機版 Drawer 底部固定「顯示 N 項結果」按鈕
```