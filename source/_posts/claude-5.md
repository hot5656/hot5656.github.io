---
title: LUNÉA — 高端香水電商
abbrlink: e9bd
date: 2026-08-12 09:58:24
categories: AI
tags:
  - claude
---

### spec generate
#### step
``` bash
# init
我想用 claude code 建立店商網站 如附件 幫我規劃執行步驟及程序
# 完整 prompt
把階段 1 到 4 的指令寫成完整、可直接貼上的版本
# multi-app
另外為 multi-app for supabase 建議 app namd and schema 為 lunea
# 綠界金流
金流使用綠界金流 可參考附件
# SPEC-auth
SPEC-auth.md 如何產生
```

#### notes
```` bash
# 一次性購物還有四點要特別注意：
1. 訂單編號格式要改。 特店訂單編號必須是唯一值、不可重複使用，且只能用英數字，長度上限 20 字元。SPEC 目前的 LN-20261019-4827 含有連字號，要改成類似 LN202610194827AB7Q 的格式。 
2. 回呼時要核對金額。 除了驗證 CheckMacValue，還要確認回傳的 TradeAmt 等於資料庫中這筆訂單的總計，不相符就不能標成已付款。
3. ItemName 要保持簡短。 這個參數有 400 字元的限制，超過會被截斷，截斷處容易出現亂碼，進而造成檢查碼錯誤而掉單。建議寫成「LUNEA 香氛 x3」這類摘要就好，明細存在自己的資料庫裡。品牌名用不帶重音的 LUNEA，避開特殊字元的問題。 
4. 金額必須是整數。 交易金額要帶整數、不可有小數點，而且僅限新台幣。優惠碼的 Math.round 已經符合這個要求

# 綠界測試卡 
4311-9522-2222-2222（有效期限 12/30、CVV 222、OTP 1234）。
````

### claude code
#### create project 
{% note info %}
1. **Command**
```
npx create-next-app@latest demo-lunea-ecommerce --typescript --tailwind --app --eslint --src-dir
cd demo-lunea-ecommerce
git init; git add .; git commit -m "init"
```

2. **參數拆解說明**
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

3. **執行後會發生什麼事？**
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
我要建立一個高端香水電商 Demo 網站，品牌名                                    
  LUNÉA（虛構）。這一步先不要寫任何程式，只要產出規格書 docs/SPEC.md。          
                                                                                
  網站包含以下頁面與功能：                                                      
  1. 首頁：Hero 大圖展示香水瓶（瓶身輕微上下浮動）、品牌故事短介紹、Shop by     
  Mood 區塊（每種情緒有各自的漸層背景）、精選商品                               
  2. 產品目錄：可依香調、情緒、價格區間、濃度篩選與排序                         
  3. 產品詳細頁：產品圖、前中後調、產品故事、使用建議、容量選擇、加入購物車、相 
  關推薦                                                                        
  4. 香氣測驗：根據回答推薦香水                                                 
  5. 可客製試香組：自選數款小樣組成試香組                                       
  6. 購物車：新增、刪除、修改數量，顯示小計與總計                               
  7. Demo 結帳：收件資訊、配送方式、付款方式選擇（不串真實金流）                
                                                                                
  SPEC.md 請包含以下章節：                                                      
                                                                                
  1. 路由結構                                                                   
                                                                                
  列出所有路由與每頁用途，例如 /、/shop、/product/[slug]、/quiz、/discovery、/c 
  art、/checkout、/order/success、/styleguide                                   
                                                                                
  2. 資料模型（TypeScript interface）                                           
                                                                                
  Product 至少包含：id、slug、name、tagline、description、story、usage、price（ 
  依容量，例如 30ml/50ml/100ml）、samplePrice、concentration（EDT/EDP/Parfum）  
  、families（香調家族，例如花香/木質/柑橘/東方/馥奇/美食調）、moods（對應 Shop 
  by Mood）、notes { top[], heart[], base[] }、images[]、featured、isNew        
  另外定義 CartItem、DiscoverySet、QuizQuestion、QuizOption                     
                                                                                
  3. 分類定義                                                                   
                                                                                
  - Mood：4 到 6 種（例如清新、溫暖、神秘、優雅、慵懶），每種要寫出中英文名稱、 
  一句描述、建議的漸層配色方向                                                  
  - 香調家族：清單與中英文名稱                                                  
  - 價格區間：篩選用的級距                                                      
                                                                                
  4. 香氣測驗邏輯                                                               
                                                                                
  - 5 到 7 題，寫出完整題目與選項文案                                           
  - 計分方式：每個選項對 mood 或 family 加權，最後依加權分數比對商品            
  - 結果頁要呈現的內容：主推 1 款、另外推薦 2 款，加上推薦理由                  
                                                                                
  5. 試香組規則                                                                 
                                                                                
  可選幾支、價格怎麼算（例如固定價格 5 支                                       
  NT$1,280）、是否可以重複選同一款、結帳時試香組怎麼放進購物車                  
                                                                                
  6. 購物車與結帳規則                                                           
                                                                                
  運費門檻、數量上下限、結帳表單欄位與驗證規則、送出後的流程                    
                                                                                
  7. 元件清單                                                                   
                                                                                
  分成 ui（共用）、layout、各頁專屬三類                                         
                                                                                
  8. 實作順序                                                                   
                                                                                
  依照：設計系統 → 骨架 → 目錄 → 詳細頁 → 購物車 → 首頁 → 測驗 → 試香組 → 結帳  
                                                                                
  寫好後先給我確認，不要開始實作。  
```

#### 階段 1-B：建立商品資料
``` bash
請先讀 docs/SPEC.md，依照規格建立資料層（這一步不做任何 UI）：                
                                                                                
  1. 安裝 SPEC 第 8 節列出的套件：zustand、framer-motion、react-hook-form、zod  
  、@hookform/resolvers                                                         
  2. src/types/index.ts：SPEC 第 2 節的所有型別                                 
  3. src/data/products.json：SPEC 商品清單的 12                                 
  款商品，id、slug、價格、家族、mood、濃度、featured、isNew 必須與 SPEC         
  表格完全一致。這一步要一併寫好完整文案：                                      
     - tagline：一句有詩意的標語                                                
     - description：約 50 字                                                    
     - story：2 到 3 段，共約 150                                               
  字，有畫面感與品牌調性，每款的故事風格要有差異                                
     - usage：3 到 4 條（季節、場合、搭配建議）                                 
     - notes：前中後調各 2 到 4 個真實香材，格式為「英文                        
  中文」，並要與品名、家族相符（例如 Ambre Nuit 的後調要有琥珀、樹脂類）        
     - images：依 SPEC 圖片策略填寫 placeholder 路徑，每款 2 張                 
     - createdAt：isNew 的商品日期最新                                          
  4. src/data/taxonomy.ts、quiz.ts、discovery.ts、shipping.ts、coupons.ts：內容 
  依照 SPEC                                                                     
  5. src/lib/products.ts：getAllProducts、getProductBySlug、getFeatured、getByM 
  ood、getRelated（依 SPEC 7.3 規則）、filterProducts、sortProducts             
     src/lib/pricing.ts：小計、折扣、運費、總計（依 SPEC 第 6 節）              
     src/lib/quiz.ts：scoreQuiz 純函式（依 SPEC 4.2 與 4.3）                    
     src/lib/format.ts：金額格式化（NT$4,800）                                  
  6. 修改 scripts/quiz-sim.mjs，改為讀取正式的 src/data 與                      
  src/lib/quiz.ts（必要時改成 .ts 並用 tsx 執行），重跑一次，確認結果與先前一致 
  7. 順便修正 SPEC 中「家族分布」的 amber 數量（實際為 5 款）                   
                                                                                
  完成後：執行 npm run build 與 npm run lint；列出 12                           
  款商品的品名、tagline、前中後調摘要表給我檢查文案；附上 quiz-sim 結果。  
```

#### plan mode - generate SPEC-payment.md
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

#### plan mode - generate SPEC-auth.md
``` bash
這一步不要寫程式，只產出 docs/SPEC-auth.md：LUNÉA 階段                        
  7-0「會員登入」的規格，作為 docs/SPEC-payment.md 的前置文件。                 
                                                                                
  先讀：                                                                        
  - docs/shared-supabase-auth.md（共用 Supabase 的跨 app                        
  登入規範，必須完全遵守）                                                      
  - docs/SPEC-payment.md                                                        
  §0（列出了結帳與訂單頁對登入的依賴：getUser()、/login?next=、APP_NAME         
  標記檢查）                                                                    
  - docs/SPEC.md、CLAUDE.md                                                     
                                                                                
  接著用 Supabase MCP 以唯讀方式確認以下事項（只能執行                          
  SELECT，不可修改任何設定），並把結果寫進規格的「現況」一節：                  
  1. 執行 shared-supabase-auth.md 中的 pg_trigger 查詢，確認                    
  flight.tag_app_metadata_on_signup() 存在，記錄它的 comment                    
  2. 確認 lunea schema 是否已存在（預期尚未建立）                               
  3. 能查到的 Auth 相關設定（是否需要 email 驗證等）。查不到的項目列為「待我在  
  Dashboard 確認」，不要猜測                                                    
                                                                                
  前提：                                                                        
  - APP_NAME = "lunea"（全小寫，必須和 signUp 時傳入的字串完全一致）            
  - Next.js 16 App Router + @supabase/ssr，登入守衛寫在 proxy.ts                
  - 只支援 Email + 密碼登入；Google 等第三方登入列為不在範圍內（provider        
  設定是整個共用專案共用的）                                                    
  - 不建立任何 migration 或 trigger，不在 auth.users 上掛 trigger，不建立       
  public schema 的任何物件                                                      
  - 本階段不建立會員資料表（收件資訊沿用每次結帳時填寫）；如果之後需要，採 lazy 
  create 放在 lunea schema                                                      
                                                                                
  規格需涵蓋：                                                                  
                                                                                
  1. 路由與頁面：/login、/signup、/auth/confirm（email 驗證連結的落地頁，用     
  token_hash 呼叫 verifyOtp）、/auth/forgot（申請重設密碼）、/auth/reset（設定  
  新密碼）、/account（基本資料與登出）。每頁寫出欄位、驗證規則（zod）、成功與失 
  敗時的行為，並沿用既有的設計系統與 ui 元件                                    
  2. app 標記與隔離規則（依 shared-supabase-auth.md）：                         
     - signUp 帶 options.data.app = "lunea"                                     
     - 登入頁只放行 app_metadata.apps 含有 "lunea" 的帳號；密碼正確但沒有標記 → 
  登出並顯示一般的登入失敗訊息（不透露帳號存在）                                
     - 登入動作絕對不能補標記                                                   
     - 註冊時 email 已被其他 app 使用：密碼相符 → 直接登入並補標記；密碼不符 →  
  寄重設密碼信，重設完成後才補標記（需處理 Supabase 回傳明確錯誤，以及          
  identities 為空的假成功兩種情況）                                             
     - 標記只用於前端路由守衛，任何 RLS 或伺服器端授權都不能依賴它              
     - 寫出共用的 hasAppAccess(user) 函式規格                                   
  3. 寄信設定：所有 signUp 的 emailRedirectTo 與 resetPasswordForEmail 的       
  redirectTo 都必須帶 ?app=lunea。列出「需在 fare-finder-pro repo 的 send-email 
  函式 APPS 白名單新增 lunea」作為外部待辦（不在本 repo 執行，只能有一份        
  send-email 程式碼）                                                           
  4. Supabase Auth 的 Redirect URLs 白名單：需新增 LUNÉA 的正式網域、Vercel     
  Preview 網址（萬用字元）、http://localhost:3000。註明這是共用專案的設定，只能 
  新增，不能修改或刪除其他 app 的項目                                           
  5. Session 與守衛：                                                           
     - @supabase/ssr 的 browser client、server client 寫法                      
     - proxy.ts 負責刷新 session；伺服器端一律用 getUser()（或                  
  getClaims()）驗證，不能信任 getSession()                                      
     - 需要登入的路由：/checkout、/account、/account/orders/*；未登入導向       
  /login?next=<原路徑>                                                          
     - matcher 必須排除 /api/ecpay/*、靜態檔案與圖片                            
     - next 參數只接受站內相對路徑，防止開放轉址                                
     - Header 依登入狀態顯示「登入」或帳號選單                                  
  6. 錯誤處理與安全：錯誤訊息不能讓人推測 email                                 
  是否已註冊；密碼規則；登入失敗時的提示；Supabase 內建的速率限制觸發時的訊息   
  7. 購物車與登入的關係：購物車維持存在                                         
  localStorage，與帳號無關；登入或登出不清空購物車；從 /checkout                
  被導去登入，完成後回到 /checkout                                              
  8. 環境變數：只列名稱（NEXT_PUBLIC_SUPABASE_URL、NEXT_PUBLIC_SUPABASE_ANON_KE 
  Y、SITE_URL），與 SPEC-payment.md §8 保持一致                                 
  9. 測試計畫（表格：案例 / 操作 /                                              
  預期）：新帳號註冊與驗證、登入、登出、忘記密碼、未標記的帳號登入被拒、email   
  已被其他 app                                                                  
  使用（密碼相符與不符兩種）、確認登入動作不會補標記、受保護路由的轉址、next    
  參數的開放轉址防護、確認驗證信的寄件人顯示為 LUNÉA（代表 ?app=lunea 有生效）  
  10. 外部待辦與需要我確認的事項（獨立列出）                                    
                                                                                
  寫好後先給我確認。    
```

#### 階段 2：設計系統
{% note info %}
請依照 CLAUDE.md 的設計原則建立 LUNÉA 的設計系統。

1. **Design Tokens（tailwind.config 與 globals.css）**
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

2. **基礎元件（src/components/ui）**
- Button：primary（深色實心）、secondary（細線框）、ghost、text-link（底線動畫）；尺寸 sm/md/lg；支援 loading 與 disabled
- Input、Select、Radio、Checkbox：細線風格、focus 狀態明顯但優雅，含錯誤訊息樣式
- Badge：New、Bestseller、濃度標籤
- QuantitySelector：- 數字 +
- Divider：可帶置中文字的細線分隔
- SectionHeading：overline ＋ 標題 ＋ 副標
- Container：統一的最大寬度與左右留白
- Drawer：右側滑出，購物車和手機篩選都會用到
- Skeleton

3. **/styleguide 頁面**
依序展示：色票（含色碼與 token 名稱）、字級層次（中英文範例）、所有按鈕變體、表單元件、Badge、mood 漸層卡片、Drawer 開關示範。

完成後截圖給我，我要確認整體視覺方向。
{% endnote %}

#### 階段 3：骨架與共用功能
{% note info %}
請依照 docs/SPEC.md 建立網站骨架與全站共用功能。

1. **狀態管理（src/store）**
  - cartStore（Zustand ＋ persist）：
    - items：一般商品（productId、size、qty）與試香組（含所選的 productIds）
    - actions：addItem、removeItem、updateQty、addDiscoverySet、clearCart
    - selectors：itemCount、subtotal、shippingFee（依 SPEC 的運費門檻）、total
    - 處理 hydration：在 client 端載入完成前，不要渲染購物車數量，避免 hydration mismatch
  - uiStore：控制購物車 Drawer 的開關

2. **Layout**
  - Header：
    - 左側導覽（商店、香氣測驗、試香組、品牌故事），中間 LUNÉA Logo（用襯線字體排出精緻的文字 Logo），右側搜尋圖示（先做 UI 即可）與購物車圖示＋數量徽章
    - 捲動後背景變成半透明模糊、高度縮小
    - 手機版：漢堡選單，展開成全螢幕選單並帶入場動畫
  - Footer：品牌簡介、連結分欄、電子報訂閱欄位（送出後顯示感謝訊息即可）、社群圖示、版權
  - MiniCart：右側 Drawer，列出商品與小計，附「前往結帳」與「查看購物車」按鈕；購物車為空時顯示精緻的空狀態
  - 加入購物車後，自動開啟 MiniCart
  - Toast 通知元件

3. **路由**
  依 SPEC 建立所有路由的頁面檔案，內容先放頁面標題與簡短佔位即可，並設定好每頁的 metadata（title、description）。
  另外加上 not-found.tsx 與 loading.tsx，要符合品牌風格。

4. **共用元件**
  - ProductCard：圖片（hover 時切換第二張圖）、名稱、副標、濃度、起始價格、快速加入購物車按鈕（hover 時才出現，手機版常駐）
  - ProductGrid：響應式欄數，桌面 4 欄、平板 3 欄、手機 2 欄

  完成後測試：加入商品 → 重新整理頁面 → 購物車數量仍然保留。
{% endnote %}

#### 階段 4-1：產品目錄 /shop
{% note info %}
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
1. **版面**
- 頂部：頁面標題、商品數量（例如「共 14 款香氛」）
- 桌面版：左側固定篩選欄＋右側商品網格
- 手機版：頂部列有「篩選」按鈕（顯示已套用的數量）和排序選單，點擊篩選會開啟 Drawer

2. **篩選功能**
- 香調家族（多選）、情緒（多選，以帶有該 mood 漸層的小色點呈現）、價格區間（多選）、濃度（多選）
- 已套用的篩選以可移除的 chip 顯示在網格上方，並附「清除全部」
- 排序：精選推薦、價格低到高、價格高到低、最新
- 篩選與排序狀態同步到 URL query（例如 /shop?mood=warm,mysterious&sort=price-asc），可以分享連結、上一頁也能保留狀態
- 支援從首頁 Shop by Mood 帶參數進來，例如 /shop?mood=fresh

3. **細節**
- 篩選變更時，商品網格要有柔和的淡入淡出過場
- 篩選結果為空時：顯示精緻的空狀態文案，加上「清除篩選」按鈕，並推薦 3 款精選商品
- 手機版 Drawer 底部固定「顯示 N 項結果」按鈕
{% endnote %}

#### 產品詳細頁 /product/[slug]
{% note info %}
請先讀 docs/SPEC.md 與 CLAUDE.md。以下指令與 SPEC 衝突時，以 SPEC 為準並提出來。

沿用既有成果：
- 容量選擇使用 ui/RadioCard（styleguide 已有容量選擇的示範）
- 數量使用 ui/QuantitySelector；加入購物車使用既有的 useAddToCart（成功時會開啟 MiniCart）
- 相關推薦使用 src/lib/products.ts 的 getRelated（已實作補滿 4 款的規則）
- 情緒標籤連結到 /shop?mood=<id>，參數格式與 /shop 一致
- 圖片一律使用既有的 ProductImage 元件
- 標題斷句可用 ui/TextBreak 的 MobileBreak、Keep，內文維持自然換行
- src/proxy.ts 已處理不存在 slug 的 404，不要修改它

與原指令的差異（以 SPEC 為準）：
- 「也可以加入試香組」連到 /discovery?preset=<商品 id>（SPEC §5 的參數名稱是 preset，不是 preselect，值是商品 id 而不是 slug）
- 免運門檻文案為 NT$5,000

已知問題：/product/[slug] 目前在 dev 模式有「outside of Suspense」的錯誤，這一步要一併修正，完成後 dev 與 production 的 console 都不能有錯誤。

請實作產品詳細頁 /product/[slug]。
**技術**
- 使用 generateStaticParams 預先產生所有商品頁
- generateMetadata：title、description、OG 圖片使用商品主圖
- slug 不存在時呼叫 notFound()

**版面（桌面版左右兩欄，手機版上下排列）**
左側：
- 主圖＋縮圖列，可切換；桌面版 hover 主圖可放大檢視；手機版改為可左右滑動的圖片輪播並顯示指示點

右側（桌面版捲動時固定在畫面上）：
- 麵包屑
- overline 顯示香調家族、商品名稱（大型襯線字）、中文副標、濃度 Badge
- tagline
- 容量選擇（30/50/100ml，以精緻的選項按鈕呈現，價格隨選擇更新）
- QuantitySelector ＋ 「加入購物車」主按鈕（點擊後顯示 loading 狀態 → 開啟 MiniCart）
- 次要連結：「也可以加入試香組」→ 前往 /discovery 並預先選好這款
- 小字資訊：免運門檻、退換貨說明

**下方區塊**
1. 香調金字塔：用視覺化方式呈現前調、中調、後調（例如三層由窄到寬的排列，搭配細線與香料名稱），標示各階段的持續時間
2. 產品故事：大字引言風格搭配留白，並配一張氛圍圖
3. 使用建議：適合的季節、場合、時段，以圖示＋文字呈現
4. 情緒標籤：可點擊，連到 /shop?mood=xxx
5. 相關推薦：使用 getRelated，4 款 ProductCard

**動畫**
各區塊捲動進入畫面時淡入上移（只觸發一次）。
{% endnote %}

#### 階段 4-3：購物車 /cart
{% note info %}
請先讀 docs/SPEC.md 與 CLAUDE.md。以下指令與 SPEC 衝突時，以 SPEC 為準並提出來。

沿用既有成果：
- 購物車狀態使用 src/stores/cart.ts（已有數量上下限、行數上限、優惠碼欄位、失效商品清除、hydration 處理）
- 金額計算一律使用 src/lib/pricing.ts，金額格式使用 src/lib/format.ts，不要在元件裡自己計算
- 數量使用 ui/QuantitySelector，Toast 使用既有的 uiStore 與 Toaster
- MiniCart 已有免運進度條，/cart 頁的進度條要與它共用同一個元件，兩邊的行為與文案必須一致
- 推薦商品使用 ui/ProductGrid、ProductCard

與原指令的差異（以 SPEC 為準）：
- 免運門檻為 NT$5,000，以「小計減去折扣後」的金額判斷（SPEC §6.1）
- 試香組在購物車中的數量範圍是 1–3（不是固定為 1），標題為「LUNÉA Discovery Set（5 × 2ml）」，並提供「重新組合」連結到 /discovery?preset=<5 個商品 id>（SPEC §5）
- 目前還沒有試香組的實際加入流程（階段 8），請用測試資料確認試香組的顯示樣式正確，但不要在正式頁面放入假資料

請實作完整購物車頁面 /cart，並檢查 MiniCart 與它的行為是否一致。
**版面**
- 桌面版：左側商品清單、右側訂單摘要（捲動時固定）
- 手機版：清單在上，摘要在下，底部固定「前往結帳」列，顯示總金額

**商品清單**
- 一般商品：縮圖、名稱（可連回詳細頁）、容量、單價、QuantitySelector、該項小計、移除按鈕
- 試香組：以特殊樣式呈現，標題為「Discovery Set」，展開後可以看到所選的小樣清單，數量固定為 1
- 移除商品時要有收合動畫，並顯示 Toast：「已移除 XXX」，附「復原」按鈕（5 秒內可復原）

**訂單摘要**
- 小計、運費（未達門檻時顯示「再消費 NT$XXX 即享免運」，並加上進度條）、總計
- 優惠碼欄位：demo 用，輸入 LUNEA10 可折 10%，其他代碼顯示錯誤訊息；套用後摘要顯示折扣金額
- 「前往結帳」主按鈕

**其他**
- 購物車為空時：精緻的空狀態插畫或文案，附「探索香氛」與「做香氣測驗」兩個按鈕
- 清單下方顯示「你可能也喜歡」，推薦 4 款不在購物車裡的商品
- 金額統一格式化為 NT$1,280
- 優惠碼狀態也要存進 cartStore，結帳頁會用到
{% endnote %}

#### 階段 4-4：首頁
{% note info %}
請先讀 docs/SPEC.md 與 CLAUDE.md。以下指令與 SPEC 衝突時，以 SPEC 為準並提出來。

沿用既有成果：
- Shop by Mood 使用 src/components/home/MoodCard.tsx 的 MoodCard 與 MoodCardRail（設計系統階段已做好，桌面為網格、手機為水平滑動）
- 精選商品使用 getFeatured() 與既有的 ProductGrid、ProductCard
- Hero 的大標題用 ui/TextBreak 的 MobileBreak 與 Keep 控制斷句，確認 390px 與 360px 都沒有孤字
- 進場動畫使用 ui 中已有的 Reveal 元件，不要另外實作
- 品牌故事區塊必須加上 id="story"（Header 的「品牌故事」連到 /#story）
- 圖片一律使用 ProductImage；Hero 瓶身使用 public/images/hero-bottle.svg（如果還沒有就依現有商品 SVG 的風格建立）

與原指令的差異（以 SPEC 為準）：
- 試香組推廣區塊的內容依 SPEC §5：5 支 × 2ml，固定 NT$1,280，按鈕連到 /discovery
- 香氣測驗推廣連到 /quiz
- 品牌承諾中的免運文案為「滿 NT$5,000 免運」
- 商品是 SVG 佔位插圖，不要寫出「實拍」、「天然原料認證」等無法兌現的具體宣稱；品牌承諾的文案保持品牌調性但不誇大

完成後，除了指令要求的自我評估外，請特別回報：Hero 在 1440px 與 390px 的第一屏截圖，以及首頁的 LCP 元素是什麼、是否有優先載入。


請實作首頁，這是整個網站最重要的門面，視覺品質要達到精品品牌官網的水準。
**區塊（依序排列）**

**1. Hero（滿版高度）**
- 背景：柔和的米色到奶油白漸層，加上非常淡、緩慢流動的光暈
- 中央或右側：主打香水瓶大圖，持續緩慢上下浮動（約 6 秒一個循環），並有柔和的陰影跟著縮放
- 左側文案：overline（例如 "Maison de Parfum"）、大標（襯線字，兩行，有詩意）、副標、兩顆按鈕（「探索系列」、「找到你的香氣」→ /quiz）
- 進場動畫：文字逐行淡入上移，瓶子從稍微放大淡入
- 底部有小型捲動提示動畫

**2. 品牌宣言**
- 置中的大字引言（約兩到三行），搭配大量留白與細線裝飾

**3. Shop by Mood**
- 標題區＋ 每個 mood 一張卡片，各自使用 SPEC 定義的漸層背景
- 卡片內容：英文 mood 名稱（大字）、中文名稱、一句描述、該 mood 的商品數量
- hover：漸層緩慢流動或變亮，卡片微微上浮
- 點擊後前往 /shop?mood=xxx
- 桌面版為不對稱網格排列，手機版改為可水平滑動

**4. 精選系列**
- 標題＋「查看全部」連結
- 4 款 featured 商品，使用 ProductCard

**5. 品牌故事**
- 左右分欄：一側大圖（可加入輕微視差效果），另一側為品牌故事短文與「了解更多」連結

**6. 香氣測驗推廣**
- 帶有質感的深色或大地色區塊，做為整頁的節奏轉換
- 文案邀請使用者做測驗，加上按鈕

**7. 試香組推廣**
- 展示小樣排列的視覺圖、價格、「打造你的試香組」按鈕

**8. 品牌承諾**
- 3 到 4 個小圖示＋短文字（例如天然原料、手工調製、免運服務、精美包裝）

**動畫原則**
- 所有區塊捲動進入畫面時才觸發入場動畫，只觸發一次
- 動畫要慢、要柔和，不要彈跳效果
- 啟用 prefers-reduced-motion 時，關閉浮動與視差效果

完成後截圖桌面版與手機版完整頁面，並自我評估：哪些地方還不夠有精品感，提出改進建議。
{% endnote %}

#### 階段 4-5：香氣測驗 /quiz
{% note info %}
請先讀 docs/SPEC.md 與 CLAUDE.md。以下指令與 SPEC 衝突時，以 SPEC 為準並提出來。

沿用既有成果：
- 題目與計分一律使用 src/data/quiz.ts 與 src/lib/quiz.ts 的 scoreQuiz（已實作並以 quiz-sim 驗證過分布），不要另外寫計分邏輯
- 推薦理由使用 scoreQuiz 已產生的文字（SPEC §4.3 規則）
- 結果頁的加入購物車使用 useAddToCart、容量選擇使用 ui/RadioCard、推薦商品使用 ProductCard
- mood 漸層使用既有的 MOOD_STYLES 與 mood token；進場動畫使用 ui/Reveal

與原指令的差異（以 SPEC 為準）：
- 結果與作答都在 /quiz 同一頁，分享網址為 /quiz?result=<6 個 a–d 字母>（SPEC §4.2.2），不是 /quiz/result?answers=
- 「把這 3 款放進試香組」連到 /discovery?preset=<3 個商品 id，以逗號分隔>
- 主推商品的加入購物車預設容量為 50ml（SPEC §4.4）
- 作答選擇後 300ms 自動進入下一題（SPEC），不是 400ms

測試時請同時用 reducedMotion: "reduce" 跑一次，確認沒有 hydration 錯誤。


請實作香氣測驗 /quiz，題目與計分邏輯使用 src/data/quiz.ts。
**流程**
1. 開場頁：標題、簡短說明（約需 1 分鐘）、「開始測驗」按鈕，搭配柔和的背景漸層
2. 答題頁：
   - 一次只顯示一題，頂部有細線進度條與題號（例如 03 / 06）
   - 選項以大型卡片呈現，可以有圖示或氛圍漸層；選取後有明顯但優雅的回饋
   - 選擇後自動前往下一題（延遲約 400ms），也提供「上一題」按鈕
   - 題目之間有淡出、滑入的過場動畫
   - 背景漸層依目前答案傾向的 mood 緩慢變化（加分效果）
3. 計算中頁面：約 2 秒的精緻 loading 動畫，文案例如「正在調配屬於你的香氣⋯」
4. 結果頁：
   - 主推香水：大圖＋名稱＋「你的香氣性格」標題（依得分最高的 mood 產生一段描述文字）
   - 推薦理由：說明你的哪些選擇對應到這款香水的哪些特質
   - 主推商品可以直接選容量並加入購物車，也可以前往詳細頁
   - 另外推薦 2 款，使用 ProductCard
   - 「把這 3 款加入試香組」按鈕 → 前往 /discovery 並預先選好這 3 款
   - 「重新測驗」連結

**技術**
- 測驗邏輯寫成純函式（src/lib/quiz.ts），輸入答案、輸出排序後的商品與分數，並附簡單的單元測試或 console 驗證
- 答題進度存在 sessionStorage，重新整理頁面不會從頭開始
- 結果可以用 URL 分享（例如 /quiz/result?answers=...）
- 整個流程都要能用鍵盤操作（方向鍵選擇、Enter 確認）
{% endnote %}

#### 階段 4-6：試香組 /discovery
{% note info %}
請先讀 docs/SPEC.md 與 CLAUDE.md。以下指令與 SPEC 衝突時，以 SPEC 為準並提出來。

沿用既有成果：
- 試香組規則與價格使用 src/data/discovery.ts（DISCOVERY_RULES、標題與 preset 相關常數）
- 加入購物車使用 cartStore 既有的試香組功能（數量 1–3、相同組合合併）與 useAddToCart（成功時開啟 MiniCart）
- 試香組草稿依 SPEC §5 使用 Zustand persist 的 discoveryStore，放在 src/stores/
- mood 快速篩選使用 ui/Tag 與 MoodDot；金額格式使用 src/lib/format.ts
- 進場與加入動畫使用 ui/Reveal，並遵守 reduced-motion

與原指令的差異（以 SPEC 為準）：
- 預選參數為 ?preset=<商品 id，逗號分隔>（例如 /discovery?preset=p06,p04,p12），不是 preselect；無效 id 忽略，最多 5 款
- 已有草稿時又帶 preset 進來：以 preset 取代草稿，並顯示 toast 說明
- 頁面需顯示「單買合計 NT$X，省下 NT$Y」（X 為所選 samplePrice 加總）
- 加入成功後清空草稿（SPEC §5）
- 「隨機幫我選」只補滿剩餘的格位，不覆蓋已選的款式

測試要求：
- 在 tests/e2e/ 新增 discovery.spec.ts，至少涵蓋：快速連點選取與移除 5 款後狀態正確、選滿後其他卡片無法選取、?preset= 預選（含無效 id 與超過 5 款）、已有草稿時帶 preset 進來會取代草稿、隨機補滿不覆蓋已選、加入購物車後草稿清空且購物車出現一筆試香組
- 每個情境都要用 reducedMotion: "reduce" 再跑一次
- 測試只檢查狀態與結果的正確性，不要用動畫或轉場的時間長短當作通過條件

請實作可客製的試香組頁面 /discovery，規則依照 docs/SPEC.md。

1. **版面**
- 頂部：標題、說明（例如「挑選 5 款 2ml 小樣，在家慢慢認識每一款香氣」）、價格
- 桌面版：左側商品選擇網格、右側固定的試香盒預覽
- 手機版：商品網格為主，底部固定一列試香盒摘要（已選 3/5 ＋ 小樣縮圖），點擊後展開完整預覽

2. **商品選擇**
- 精簡版商品卡：圖片、名稱、主要香調；點擊即選取或取消選取
- 已選取的卡片顯示勾選標記與邊框高亮
- 已達上限時，未選取的卡片變淡且無法點擊，並顯示提示
- 頂部提供 mood 快速篩選 chips
- 支援 URL 參數預先選取：/discovery?preset=<商品 id，逗號分隔>（來自詳細頁與測驗結果頁）

3. **試香盒預覽**
- 以視覺化的盒子呈現：5 個格位，已選的格位顯示小瓶圖示與名稱，未選的格位為虛線空格
- 加入時有小瓶「放進盒子」的動畫
- 每個格位可單獨移除
- 進度文字（例如「再選 2 款」）、價格
- 「加入購物車」按鈕：未選滿時為 disabled 並顯示原因；選滿後點擊 → 呼叫 addDiscoverySet → 開啟 MiniCart → 清空目前的選擇
- 「隨機幫我選」次要按鈕
{% endnote %}

#### 階段 4-7：結帳 /checkout 與完成頁
{% note info %}
請先讀 docs/SPEC.md、docs/SPEC-payment.md 與 CLAUDE.md。以下指令與 SPEC 衝突時，以 SPEC 為準並提出來。

這一步實作 Demo 版結帳（不串金流、不需登入），但付款方式、訂單編號與資料結構要先對齊 docs/SPEC-payment.md，讓階段 7 接上綠界時前端不需要大改。

沿用既有成果：
- 購物車資料、優惠碼使用 src/stores/cartStore.ts；金額計算一律使用 src/lib/pricing.ts，不在元件中自行計算
- 表單使用 react-hook-form + zod，schema 放在 src/lib/checkout-schema.ts
- 配送方式、付款方式使用 ui/RadioCard；表單欄位使用 ui 中既有的 FormField、Input、Select、Checkbox
- 訂單摘要中的試香組顯示方式與購物車一致（共用元件）
- 網站網址使用 src/lib/site-url.ts

與 SPEC.md §6 的差異（依 SPEC-payment.md 調整）：
- 付款方式只有兩種：「線上刷卡」與「貨到付款」（選擇門市自取時顯示為「門市付款」）。移除 LINE Pay 與前端的卡號、有效期限、CVC 欄位（之後由綠界付款頁處理）
- Order 型別的 payment 改為 "credit" | "cod"，並同步更新 src/types 與 SPEC.md
- 訂單編號格式依 SPEC-payment：LN + yyMMddHHmmss（Asia/Taipei 時區）+ 6 碼大寫英數，共 20 碼、只含英數字
- Demo 階段選「線上刷卡」時：按下送出後顯示「正在前往付款頁⋯」約 1.2 秒，模擬付款成功後進入完成頁；完成頁要清楚標示「此為示範網站，未實際扣款」

版面：
- 簡化版 Header：只有 Logo 與「返回購物車」，不顯示主導覽
- 桌面版左側表單、右側訂單摘要（sticky）；手機版的訂單摘要預設收合，可點擊展開，收合時仍顯示總金額
- 購物車為空時導回 /cart

表單（單頁分段，欄位與驗證規則依 SPEC §6.4，卡號相關欄位除外）：
1. 聯絡資訊：Email、手機
2. 配送方式：宅配、超商取貨、門市自取（依 SPEC §6.2），選擇後顯示對應欄位
   - 宅配：縣市（22 縣市下拉）、區域、郵遞區號、地址
   - 超商取貨：7-11／全家，以及取貨門市（Demo 為文字輸入，標示「之後將串接門市地圖」）
3. 收件人姓名、備註（選填）、禮盒包裝
4. 付款方式：線上刷卡、貨到付款
5. 發票：會員載具、手機條碼載具、公司統編（依 SPEC §6.4）
6. 同意條款

互動：
- 驗證時機為 onTouched；送出失敗時捲動並 focus 到第一個錯誤欄位，錯誤訊息以 aria-describedby 連結
- 送出按鈕防止重複點擊（按下後立即鎖定，直到流程結束）
- 送出流程：產生訂單編號 → 組成訂單快照存入 sessionStorage（key: lunea-last-order）→ 清空購物車 → router.replace 到 /order/success
- 運費依實際選擇的配送方式計算；摘要中的小計、折扣、運費、總計必須與 /cart 頁的計算結果一致

/order/success：
- 細線勾勾的描繪動畫（reduced-motion 時直接顯示）
- 訂單編號、Email 確認提示、訂單內容與金額明細、配送與付款方式、發票資訊、收件資訊（手機號碼遮罩，例如 0912***678）
- 預計到貨日：依配送方式的天數，以台北時區從今天往後推算工作天
- 「繼續探索」按鈕，以及「此為示範網站，不會實際出貨或扣款」的說明
- 直接進入此頁、沒有訂單資料時，顯示「找不到訂單資訊」並引導回首頁

測試要求：
- 在 tests/e2e/ 新增 checkout.spec.ts，至少涵蓋：購物車為空導回 /cart、各配送方式的條件必填欄位、門市自取時貨到付款改為門市付款、手機條碼與統編格式驗證、送出失敗時 focus 到第一個錯誤欄位、連點送出只產生一筆訂單、成功後購物車清空且完成頁內容正確、訂單編號符合 20 碼英數格式、直接進入完成頁顯示找不到訂單
- 一個完整流程測試：首頁 → /shop 篩選 → 詳細頁加入購物車 → 試香組加入一組 → 購物車套用 LUNEA10 → 結帳 → 完成頁，確認各步驟的金額一致
- 測試只檢查狀態與結果的正確性，不要用動畫時間當作通過條件
- 完成後執行完整的 e2e 測試（所有 spec），確認全部通過
{% endnote %}
