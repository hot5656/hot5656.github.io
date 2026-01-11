---
title: Vibe coding 
abbrlink: 7c84
date: 2025-12-09 11:48:37
categories:
tags: AI
  - Vibe Coding
---

### 簡介
#### 4 tool suggest 
+ [Gamma](https://gamma.app/) : create presentations(document, website, social media post)
+ [Lovable](https://lovable.dev/): interna; tools, website, personal to use for personal things apps, customer apps, B2B apps or prototype 
+ [v0](https://v0.app/): create website and web application
+ [n8n]((https://n8n.io/workflows/)): automation workflow 


<!--more-->

### customing
#### Prompt + post 注意
``` bash
# 生成圖檔
我的部落格標題及summary 如下 請幫我生成一個 1080 x 1080 圖檔(不要有文字)
請一樣的圖幫我調成  1024 x 512 圖檔

# fb 貼文
我的 blog 貼文如下 我想把它貼至 fb 粉絲頁 請幫我整理一下 並幫我加入 若想知道開發細節請到 Robert Hut 若有期望的網頁 ideas 也
# 直接貼網址,不用加 https://
link example : 已經正式上線囉 👉 The Journal : blog-journal.demo.roberthut.com
               歡迎到 👉 Robert Hut : roberthut.com

# linkedin 貼文
我要貼到 linkedin 幫我修飾 並且幫我寫成雙語
# 直接貼網址,不用加 https://(但不知為何有些網址會被轉址,或許網址較長)
link example : 👉 專案連結 ：tarot-cards.roberthut.com
               👉 完整開發細節，請到 Robert Hut：roberthut.com 


# instagram 貼文
我要貼到 instagram 請幫我修飾
# 貼文無法加link 先指導 Bio - example
  從「Vibe Coding」的靈光一閃，到 Bolt.new + Perplexity AI 幫我畫藍圖
  歷經修羅場（錯誤鬼打牆、資料庫拔河），終於上線！

  ✨ 特色：
  • 深度互動追問
  • 完整牌義解釋庫
  • 結果自動儲存
  • 中英雙語

  試試你的運勢？👉 https://tarot-cards.roberthut.com/

  #n8n #VibeCoding #AI #塔羅牌 #自動化 #NoCode
# instagram end ...

# thread 貼文
我要貼到 thread 請幫我修飾
# 直接貼網址(含 https)
link example: 完整細節👉 https://www.roberthut.com/

# substack 貼文
我要貼到 substack 請幫我修飾
請給我 主標題及副標題
# link : 選文字,點link
```

#### 更改 icon & 縮圖
瀏覽器上的 logo（favicon）標準尺寸為 16x16 或 32x32 像素，用於標籤頁和書籤顯示。
縮圖（Open Graph 圖像）推薦 1200x630 像素，以確保社群分享預覽最佳效果，至少 600x315 像素。

+ add icon
  ``` html
  <link rel="icon" type="image/png" href="/Robert_hut_128.png" sizes="128x128" />
  ```
+ icon & 縮圖預先放於 /public 下
+ fb 縮圖測試: [ Sharing Debugger](https://developers.facebook.com/tools/debug)
+ 若 icon 或 縮圖看不到 在其後更動version 加入 ?v=n

##### 原 index.html
``` html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Journal - Stories that inspire</title>
    <meta name="description" content="A curated collection of thoughts on design, technology, culture, and the art of mindful living." />
    <meta name="author" content="The Journal" />

    <meta property="og:title" content="The Journal - Stories that inspire" />
    <meta property="og:description" content="A curated collection of thoughts on design, technology, culture, and the art of mindful living." />
    <meta property="og:type" content="website" />
    <!-- 分享連結時的預覽大圖 建議放「較大、橫幅」的分享圖（例如 1200×630 這種常見比例） -->
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@TheJournal" />
    <!-- 分享連結時的預覽大圖 建議放「較大、橫幅」的分享圖（例如 1200×630 這種常見比例） -->
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

##### 更動後 index.html
``` html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>The Journal - Stories that inspire</title>
    <meta
      name="description"
      content="A curated collection of thoughts on design, technology, culture, and the art of mindful living."
    />
    <meta name="author" content="The Journal" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/Robert_hut_dark_128.png?v=2" sizes="128x128" />

    <!-- Open Graph -->
    <meta property="og:title" content="The Journal - Stories that inspire" />
    <meta
      property="og:description"
      content="A curated collection of thoughts on design, technology, culture, and the art of mindful living."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://blog-journal.demo.roberthut.com/" />

    <meta
      property="og:image"
      content="https://blog-journal.demo.roberthut.com/blog-journal-og-banner.png?v=2"
    />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1227" />
    <meta property="og:image:height" content="626" />

    <!-- Twitter / X Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@TheJournal" />
    <meta
      name="twitter:image"
      content="https://blog-journal.demo.roberthut.com/blog-journal-og-banner.png?v=2"
    />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### post image size(fb, instagram, thread, substack 和 LinkedIn 適合的圖片 size)
- 1080 x 1080 px 的正方形尺寸是最適合跨 Facebook、Instagram、Threads、Substack 和 LinkedIn 的通用選擇，各平台皆支援此尺寸作為貼文圖片，且不易變形。
- 若偏好垂直圖，1080 x 1350 px 也廣泛相容（Instagram、Facebook、LinkedIn），但 Threads 可能需調整至 3:4。

- Facebook、Instagram、Threads、Substack 和 LinkedIn 的推薦圖片尺寸因貼文類型（如橫幅、貼文、封面）而異，主要以像素為單位，建議使用 JPG 或 PNG 格式以確保清晰度。
- 此尺寸符合所有平台的推薦正方形貼文規格，例如 Facebook 和 Instagram 的 1080 x 1080 px、LinkedIn 的 1080 x 1080 px、Threads 的最小/最大寬度範圍，以及 Substack 的文章圖片基礎。
- 上傳時確保檔案大小不超過 8 MB，使用 JPG 或 PNG 格式；平台會自動裁切，但正方形比例減少失真風險。

#####  Facebook
推薦貼文尺寸包括正方形 1080 x 1080 px、垂直 1080 x 1350 px、橫向 1200 x 630 px；封面照片為 851 x 315 px；頭像為 320 x 320 px。

#####  Instagram
貼文最佳尺寸為正方形 1080 x 1080 px、垂直 1080 x 1350 px、橫向 1080 x 566 px；Stories 和 Reels 為 1080 x 1920 px；頭像 320 x 320 px。

#####  Threads
貼文圖片推薦 1440 x 1920 px（3:4 比例），最小寬度 320 px、最大 1440 px；頭像 640 x 640 px；連結預覽 1200 x 600 px。

#####  Substack
文章封面推薦 1500 x 1000 px（3:2）或 1600 x 900 px（16:9）；標誌至少 512 x 512 px；社群預覽至少 1456 x 1048 px。

#####  LinkedIn
貼文推薦橫向 1200 x 627 px、正方形 1200 x 1200 px、垂直 720 x 900 px；頭像 400 x 400 px；封面 1128 x 191 px（公司頁）。

#### GitHub 互相匯入專案，實現跨平台繼續開發
``` bash
# 機制
Replit 甚至有專屬的 Lovable 和 Bolt 匯入選項，直接選擇來源後自動處理。
Lovable 和 Bolt 也支援從 GitHub repo 匯入既有專案。

# 從 Lovable/Bolt 到 Replit：
- 在 Lovable/Bolt 點 GitHub 圖示匯出 repo 
- replit.com/import 選 Lovable/Bolt --> 連 GitHub --> 選 repo 匯入（包含程式碼、UI、資產、後端）。

# 從 Replit 到 Bolt/Lovable：
- Replit 匯出到 GitHub 
- Bolt/Lovable 新專案選 "Import from GitHub" 或輸入 repo URL。

# 其他
- 資料庫內容（如 Supabase）和 secrets（如 API key）不會自動遷移，需手動重新設定；(Replit Agent 可幫忙調整。)
- 在這些平台 prompt 時，加 "generate portable code with standard Next.js and GitHub export ready"，確保輸出易遷移。
- 若遇相容問題，用 Replit Agent prompt: "fix this imported Lovable project for Replit runtime"。
```

#### app 共用 supabase
``` bash
# app table 可用 schema 分別,public 為共用
prompt 範例："Generate Supabase migration SQL for app1 schema: add users table with RLS, compatible with multi-app shared project."

# migration 
migration 加開頭 app1_..., app2_..

# 共用 User 資料機制
# 後上 app 只產生自己的 schema migration
1. 建立後上 schema：CREATE SCHEMA IF NOT EXISTS app2;
2. 產生僅 app2 migration：只在 app2 schema 加 table
3. 引用 public user：在 app2 table 加 FK
(FK 是 Foreign Key（外鍵）的縮寫。外鍵是關聯式資料庫中，一個資料表欄位參照另一個資料表主鍵（Primary Key）的機制，用來建立資料表間的關聯並確保參照完整性。)
user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE
4. 部署：supabase db push，public 架構不變。

# prompt example 
1. prompt："Generate Supabase SQL migration for app2 schema: create data table with FK to public.profiles(id), add RLS for shared user auth, no changes to public schema." 
2. "使用我現有的 Supabase project，不要建立新 table 或 migration。只在 app2 schema 新增 tables，引用 public.profiles(id) 作為 FK。現有 tables: [從 screenshot 列出，如 profiles, users]。生成 client code 用 supabase.from('app2.data').eq('user_id', user.id)。"
```

#### bolt.new db 遷移到 Supabase - [link](https://www.perplexity.ai/search/wo-ruo-jiang-ige-supabase-proj-FQ7bZqGCTp61tF4GIK1Ovw#3)
``` bash
# 使用 Bolt 官方遷移功能
# 在 bolt.new project：
1. 確保已連接 Supabase 帳號（Settings --> Applications --> Connect Supabase）。
2. 點 Database icon（頂中） --> Advanced tab --> Claim your Bolt database in Supabase。
3. 選擇目標 Supabase project（你的既有 project），bolt 會自動遷移 schema、資料、RLS 到 Supabase，保留所有資料。
4. 刷新 browser，code 自動切換用 Supabase DB。

# 手動導出與匯入（備案）
# 導出 Bolt DB：
1. 在 bolt project 找 /supabase/migrations/ 或 /db/ 資料夾，複製所有 SQL migration 檔案（schema）。
2. Prompt bolt AI："Export all data from current Bolt DB as CSV/JSON，包括所有 tables（如 profiles），保留現有資料。"
3. 或用 Supabase CLI（若本地）：supabase db dump --data-only > bolt_data.sql（但 bolt DB 可能需 browser console）。
# 匯入 Supabase：
1. 在你的 Supabase Dashboard --> SQL Editor，執行 migration SQL 建 schema（若未有）。
2. 匯入資料：用 COPY 或 pg_dump/pg_restore，若 CSV 用 Table Editor --> Import。
3. 更新 .env：SUPABASE_URL 和 SUPABASE_ANON_KEY 指向你的 project。

# 步驟細節與注意
1. Backup bolt DB：prompt "Generate full DB dump SQL"。
2. 連接 Supabase 後，supabase db push 或 SQL Editor 跑 migrations。
3. 驗證資料：query 現有 tables 確認無損失。
4. 若 fork project，先 consolidate migrations 成單檔避免衝突。

# Vibe Prompt 加速遷移
"Migrate my Bolt.new DB to existing Supabase project [project-ref]，保留所有資料：1. Export schema/migrations 和 data dump。2. Generate SQL for Supabase import。3. Update env vars。No data loss，handle RLS。"
用此 prompt 讓 AI 生成完整腳本，直接 copy 到 Supabase SQL Editor。
```

#### app tools 加入 robert_hut - [link](https://www.perplexity.ai/search/jie-shi-yi-xia-prompt-for-bolt-gAsa6wP4R_Gu7Xko9O_o4A#2) 
``` bash
# Vibe Prompt 範例
"Build Robert_hut blog app with tools 子功能：
1. Blog pages (/posts)。
2. Git submodule https://github.com/[user]/tools.git as /tools。
3. Shared Supabase：auth from public.profiles，tools data in tools schema with FK。
4. Nav: Blog | Tools。
5. Single deploy。"

# 安全提示內容
請僅實作我明確要求的特定變更—不得更改、刪除或修改任何其他代碼、樣式或頁面元件，除非我明確要求。
若我的要求與現有代碼衝突，或預見潛在問題，請暫停執行並告知我以獲得批准。此規則適用於每項變更。若有疑慮，請先徵詢我。
# prompt
在現有 專案中，僅執行以下最小變更：
1. Git Submodule 整合
git submodule add https://github.com/[你的用戶名]/tools.git tools
git submodule update --init --recursive

2. 導航更新（僅此處修改）
原導航 → 新導航：
Home (/) | Tools (/tools)

3. 新增路由（僅新增，不修改現有）
路由：/tools → 顯示 /tools 資料夾內容
方式：iframe 或直接 import（依 tools 內容自動判斷）
保持原目前 project 風格一致

4. 嚴格限制
✅ 僅修改：Nav Bar + 新增 /tools 路由
❌ 禁止：修改任何現有頁面邏輯、樣式、組件
❌ 禁止：變更原有功能
```

### Vibe coding
#### some notes
##### Bolt.new 代頻繁成本較高

###### Bolt.new 迭代過程
+ 在使用 Bolt.new 平台時，如果開發者經常反覆修改或優化應用程式（即多次迭代提示來生成、調整程式碼），會消耗大量 AI 模型的 token 或請求次數，從而導致費用快速累積。
+ 每次迭代，AI 往往從頭重新生成檔案，即使小改動也會觸發完整處理，增加 token 消耗並可能產生意外變更，放大成本。

###### Lovable 的 freemium 模式較可預測 
它主要用「固定月費 + 明確額度」的方式收費，而不是像 Replit 那樣用掉額度後自動按使用量一直加錢，讓你比較容易事先估算每個月會花多少。

###### Replit 的固定月費更適合長期迭代
Replit 的固定月費之所以更適合「長期、頻繁迭代」，原因在於：在某一個使用範圍內，你付的是穩定的訂閱費，而不是每次按下部署或反覆測試就額外多刷一次錢，對常常改版的人來說，總成本更容易攤平。

1. 固定訂閱內含「很多次迭代」
- Replit 的 Core / Pro 類方案，月費裡已經包含一定量的計算資源、儲存與流量，例如永續容器、固定儲存空間、一定的 data transfer。
- 只要你在這些配額內來回改程式、重新啟動服務、做小規模 A/B 測試，費用都「已經含在月費裡」，不會因為多按幾次「Run / 部署」就立刻跳價。


2. 對「常改程式」的團隊更划算
- 長期維護的專案（例如持續修 bug、每週迭代新功能）會有大量短頻快的更新與測試。
- 如果採「純用量計費」（像很多 token 型平台或只算 API 次數的平台），每次重跑、重生程式碼都會持續累積費用；但在 Replit 的訂閱內，這些日常開發行為屬於「已付的開發成本」，更接近租一台長期用的雲主機。


3. 搭配 Credits，用量超出才「細算」
- Replit 的模式是：先有訂閱包含的資源，再加上一小部分用量型的 Credits（例如超出配額的大流量或高配部署），超出才會按量收費。
- 對「偶爾爆量」的專案很友善：正常日常迭代都在月費裡，只有在特定活動、突發流量時才會啟動額外計費，而你可以用預算上限與用量警示控制。


4. 對比：為什麼 Bolt.new / 純 token 式不利頻繁迭代
- Bolt.new 這類以「每次 AI 生成 / token 數」來算錢的平台，在你不停修改提示、叫 AI 重寫頁面或整個專案時，token 消耗會直線上升，成本就直接跟「迭代次數」綁在一起。
- 因為每次讓 AI 重生畫面、重構程式都等於「再刷一次」，對喜歡微調細修、每天改十幾次版本的人來說，長期成本會比固定月費模式難預測。

5. 總結來說：
- Replit 的訂閱 = 長期開發「包月制」，在常態開發與迭代範圍內比較省心。
- token/用量計費平台 = 「每次動就多付一點」，越愛改、越愛試，帳單越難控制。

##### 無鎖定移植性
指的是 Bolt.new 平台不會將用戶的程式碼綁定在自家生態系統中，使用者能輕鬆將生成的完整程式碼匯出到其他環境或平台，無需依賴 Bolt.new 繼續運作或部署。

##### 平台部署
Lovable 和 Replit 都能直接將開發成品部署並託管在自家平台上，無需匯出到第三方。 Bolt.new 則主要強調匯出程式碼，雖支援一鍵推送到 Vercel/Netlify，但無內建長期託管。

###### 各平台部署細節
- **Lovable**：內建託管與自訂網域，一鍵預覽即上線，適合快速 SaaS 演示。(基本流量，適合輕量應用。 高流量需升級 Enterprise)
- **Replit**：雲端容器永續運行，支援一直線部署，跨語言生產環境。(流量/資源超額收費)
- **Bolt.new**：生成後需手動匯出部署，無原生託管選項。(流量第三方部署自付)

###### 比較表格
| 平台 | 直接託管平台 | 自訂網域 | 永續運行 | 適合情境 |
| :-- | :-- | :-- | :-- | :-- |
| Lovable | 是  | 是  | 部分  | 原型與輕量應用  |
| Replit | 是  | 是  | 是  | 生產與團隊協作  |
| Bolt.new | 否  | 否  | 否 | 匯出後自部署  |

##### 點數加購？
當月點數/額度用完後，都支援自動或手動加購方式繼續使用，無需中斷服務。

###### 各平台加購機制
**Replit**：點數用完自動轉 pay-as-you-go，按使用量直接扣信用卡（無需手動加購），如流量或計算超額即時計費。(支援設定花費控制，包括自訂警示與預算上限)
**Lovable**：免額外扣款，但可中途升級方案獲更多點數（例如從 100 升至 200 即加 100）；付費方案支援工作區餘額充值用於雲端與 AI。(Lovable 的升級是即時生效，當月按比例計費，下月維持新方案的完整月費與點數額度。降級則延至下月生效，當月維持原方案。)
**Bolt.new**：token 用完無法單獨加購，需升級更高方案（如從 10M 升 25M），未用 token 可滾存下月。(僅提供升級方案,未用額度滾存下月)

###### 加購比較表
| 平台 | 加購方式 | 自動扣款 | 未用額度處理 | 注意事項 |
| :-- | :-- | :-- | :-- | :-- |
| Replit | Pay-as-you-go  | 是  | 月底重置  | 高流量易累積費用 |
| Lovable | 升級/餘額充值  | 否  | 升級時部分滾存  | 免費方案須先升級  |
| Bolt.new | 升級方案  | 否  | 滾存下月  | 無單獨 token 購買 |

##### 開發與部署
###### Brench
Lovable、Bolt.new 和 Replit 皆支援專案使用不同 Git 分支，通常透過 GitHub 整合實現。

1. Lovable 分支支援
Lovable 可在專案設定中啟用 GitHub 分支切換，讓使用者選擇如「dev」分支而非預設「main」，以隔離編輯。 變更會與選定 GitHub 分支雙向同步。

2. Bolt.new 分支支援
Bolt.new 允許使用者從連結專案的 GitHub 圖示直接建立並切換分支，在「main」或自訂分支上隔離工作。 每個分支維持獨立狀態，不互相干擾。

3. Replit 分支支援
Replit 的 Git 面板支援以視覺方式建立、切換及發布分支，用於功能開發。 使用者可為每個專案管理多個分支，並與 GitHub 同步。

###### 平台轉移
可以透過 GitHub 同步將 Lovable、Bolt.new 或 Replit 的專案程式碼轉移到另一平台繼續開發。

1. 轉移步驟
先將來源平台的專案同步到 GitHub 儲存庫，然後在目標平台匯入該 GitHub 儲存庫。 Replit 直接支援從 Lovable 或 Bolt.new 匯入，包含程式碼、設計和後端功能。 Bolt.new 有專門的 Lovable 匯入指南，過程約需幾分鐘。

2. 平台間支援
- **Lovable 到 Bolt.new/Replit**：同步 GitHub 後匯入，Replit 自動處理 Agent Apps。
- **Bolt.new 到 Replit/Lovable**：GitHub 匯入，包含資產和資料庫結構。
- **Replit 到其他**：匯出 GitHub 儲存庫後在 Lovable 或 Bolt.new 匯入。

3. 注意事項
轉移時需確認環境變數和依賴項一致，可能需手動調整部署設定。 有些工具如 MigrateVibe 可簡化多平台遷移。

轉移後專案通常可基本執行，但需手動調整環境變數、資料庫連線及平台特定設定才能完全運作。
​

4. 執行成功率
- 轉移後專案通常可基本執行，但需手動調整環境變數、資料庫連線及平台特定設定才能完全運作。
- Replit 匯入 Lovable 或 Bolt 專案時，會自動遷移程式碼、UI、資產及後端至 Neon Postgres 資料庫，大多數情況下可直接運行。 Bolt.new 從 Lovable 匯入也支援快速啟動，約 4-5 分鐘內可用。 使用者回饋顯示 70% 功能正常，但複雜邏輯可能需除錯。
​​
5. 常見問題
- **資料庫與 API**：平台專屬後端（如 Supabase）需重新設定，否則無法連線。
- **​部署差異**：Vercel 環境變數或 Replit Agent 需手動遷移。
- **​解決方式**：檢查依賴項、測試關鍵功能，並使用 GitHub 備份避免損失。

###### 部署
各平台專案皆可透過 GitHub 匯出程式碼後部署到 Linux 伺服器，需手動安裝依賴、建置及設定後端。

1. 通用部署步驟
- 將專案同步至 GitHub 儲存庫。
-  在 Linux VPS（如 Ubuntu）用 `git clone` 下載程式碼。
- 安裝 Node.js、npm，執行 `npm install` 及 `npm run build`。
- 使用 PM2 或 systemd 啟動伺服器（如 `pm2 start npm --name "app" -- run start`），並設定 Nginx 反向代理。

2. Lovable 到 Linux
透過 GitHub 匯出，更新 Supabase `.env` 及 `config.toml`，執行 SQL 遷移建立資料庫，複製 dist 檔案至 web root。 支援 Supabase 自架或 Neon Postgres，手動遷移資料及儲存檔案。

3. Bolt.new 到 Linux
下載 ZIP 檔案解壓，上傳至 `/htdocs/`，SSH 連線執行 `npm install`、`npm run build`，用 PM2 啟動 `serve` 或 app server。

4. Replit 到 Linux
匯出 GitHub repo，clone 後調整 `.replit` 及環境變數，執行 build 並用 PM2 部署，資料庫改用自架 Neon 或 Supabase。

#### 比較 #1
Lovable、Bolt.new 和 Replit 是三個 AI 驅動的平台，能透過自然語言提示快速開發應用程式和網站，適合非技術用戶與開發者使用。 它們各自在全端開發的不同階段表現出色，從原型製作到部署皆有專長。

##### 核心功能
Lovable 使用 Next.js、Tailwind 和 Supabase 生成可編輯的生產級全端程式碼，內建託管與一鍵預覽。 Bolt.new 像瀏覽器內的 AI 配對程式設計師，支援 React Native 和 Go 等堆疊，提供即時預覽並輕鬆匯出至 Vercel 或 Netlify。 Replit 提供協作雲端 IDE，內建 Ghostwriter AI 用於程式碼生成、重構與跨 50 多種語言部署。

##### 使用情境
- Lovable 適合 UI 重點原型、行銷網站與輕量 SaaS，專為非程式員快速製作演示而設計。
- Bolt.new 適用全端網頁/行動應用、MVP 與實驗，針對需程式碼控制的技術用戶。
- Replit 處理通用開發、教育與生產工作，支援多樣語言。

##### 比較表格
| 面向 | Lovable | Bolt.new | Replit |
| :-- | :-- | :-- | :-- |
| 學習曲線 | 非程式員最簡單  | 簡單但需基本技術熟悉  | 程式員 IDE 較陡  |
| MVP 製作速度 | 不到 10 分鐘  | 8-10 分鐘  | 專家幾分鐘，新手較久  |
| 程式碼品質 | CRUD 良好，複雜處需清理  | 透明且框架相符  | 彈性但依賴提示  |
| 託管/部署 | 內建自訂網域  | 匯出至任一提供者  | 雲端容器永續運行  |
| 價格 | 免費增值 ~\$20-30/月  | 基於 Token，迭代易漲  | 核心免費 + \$10-20/月 AI  |

##### 優缺點
Lovable 加速獨立創辦人驗證，但複雜邏輯有瓶頸。 Bolt.new 提供無鎖定移植性，迭代頻繁成本較高。 Replit 靈活性最高，但需更多專業知識。

#### 比較 #2
Lovable、Bolt.new 和 Replit 是 AI 驅動的全端開發平台，能透過自然語言快速建置應用，各有託管、計費與靈活性差異。

##### 核心功能與託管
- Lovable：生成 Next.js/Supabase 程式碼，內建託管與自訂網域，一鍵上線。
- Bolt.new：瀏覽器 AI 配對程式，支援多框架，無內建託管但易匯出。
- Replit：雲端 IDE 跨 50+ 語言，永續容器部署。

##### 直接託管平台比較
| 面向 | Lovable | Bolt.new | Replit |
| :-- | :-- | :-- | :-- |
| 內建託管 | 是，一鍵自訂網域  | 否，需匯出  | 是，永續運行  |
| 適合情境 | 輕量 SaaS/原型  | MVP 後自部署  | 生產/團隊  |

##### 託管費用與超額
| 平台 | 基本方案月費 | 包含內容 | 超額處理 |
| :-- | :-- | :-- | :-- |
| Lovable | Pro \$29  | 無限託管/基本流量  | 高流量升 Enterprise  |
| Replit | Pro \$20  | 10GB 儲存/100 GiB 流量  | Pay-as-you-go 自動扣款  |
| Bolt.new | Pro \$20  | 僅開發 token  | 無託管，第三方自付  |

##### 點數/額度用完加購
| 平台 | 加購方式 | 自動扣款 | 未用額度 | 控制機制 |
| :-- | :-- | :-- | :-- | :-- |
| Replit | Pay-as-you-go  | 是  | 月底重置  | 警示/預算上限暫停  |
| Lovable | 中途升級 prorated  | 否  | 滾存一月  | 立即加點，下月全額  |
| Bolt.new | 升級方案  | 否  | 滾存下月  | 無單獨 token 購買  |

#####  優缺點總結
Lovable 適合非碼農快速上線，費用可預測但擴展需升級；Replit 生產力強，超額易控但高流量貴；Bolt.new 無鎖定移植性高，迭代 token 易耗。


#### Lovable 
``` bash
# .env
# 不能設定 .env 僅能寫於 code 可修改 抓取部署平台之 Environment Variables 
# src/integrations/supabase/client.ts 
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https:...";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "api_key ...";

```

#### BoltNew 
``` bash
# table 建立 SQL code 見
supabase/migrations/
```

#### Replit 
``` bash
...
```


### Deploy Host
#### Domain mapping
``` bash
url mapping:
  roberthut blog: roberthut.com
  tarot cards: tarot-cards.roberthut.com
  blog journal: blog-journal.demo.roberthut.com
  tools: tools.demo.roberthut.com

# namecheap setting
Domain List --> VERIFY CONTACTS
  --> Manage
  --> Advanced DNS
  --> Host Records
  --> Add New Record
    | Type	      | Host             | Value                 | TTL.     | 
    | A Record.   | @                |  76.76.21.21.         | Automatic| 
    | CNAME Record| blog-journal.demo|  cname.vercel-dns.com.| Automatic| 
    | CNAME Record| tarot-cards.     |  cname.vercel-dns.com.| Automatic| 
    | CNAME Record| tools.demo.      |  cname.vercel-dns.com.| Automatic| 
    | CNAME Record| www.             |  cname.vercel-dns.com.| Automatic| 
    | CNAME Record| life-organizer   |  cname.vercel-dns.com.| Automatic| 
      ps: cname.vercel-dns.com. 後面的點是自動加上去

# Vercel setting - robert-hut
Vercel 專案 Settings 
  --> Domains 
  --> Add: roberthut.com
# Vercel setting - tarot-cards
Vercel 專案 Settings 
  --> Domains 
  --> Add: tarot-cards.roberthut.com
# Vercel setting - blog-canvas
Vercel 專案 Settings 
  --> Domains 
  --> Add: blog-journal.demo.roberthut.com
# Vercel setting - tools-collectiont
Vercel 專案 Settings 
  --> Domains 
  --> Add: tools.demo.roberthut.com
    ps: ./vercel.json 不用加入, 因單純 Vercel 會自動調整
# Vercel setting - life-organizer
Vercel 專案 Settings 
  --> Domains 
  --> Add: life-organizer.roberthut.com
```

#### 平台比較
- Vercel 和 Netlify 都是領先的靜態網站和 Jamstack 部署平台，適合現代前端開發，但 Vercel 更優化 Next.js 等框架，而 Netlify 在免費額度上更寬鬆。
- 兩平台皆內建全球 CDN，Vercel 邊緣網絡涵蓋 100+ 地點優化 Next.js，Netlify CDN 強調靜態內容與 Jamstack 分發，無需額外設定即可全球加速

##### 核心功能比較
| 面向 | Vercel  | Netlify  |
| :-- | :-- | :-- |
| **邊緣網絡與 CDN** | 先進邊緣網絡，支援多語言 Serverless 和 ISR，全球自動路由  | 全球 CDN，優化靜態內容，基本速率限制  |
| **Serverless 函數** | 多語言支援，Fluid Compute，1M 調用免費 (Hobby)  | JavaScript/Go 為主，300 點數限制/月 (Free)  |
| **Git 整合與部署** | 無限部署，分支預覽，自動 CI/CD  | 無限部署預覽，從 Git/AI/API 部署  |
| **安全功能** | WAF、Bot 管理、防火牆規則 (Pro 起)  | 防火牆規則、基本速率限制 (Free) |

CDN 全稱為 Content Delivery Network，即內容傳遞網路，是一種全球分散式伺服器系統，用來加速網站內容（如圖片、影片、靜態檔案）傳遞給使用者。


##### 定價與免費額度
兩平台皆有免費方案，但 Netlify 頻寬更慷慨，Vercel Pro 適合團隊擴展 (\$20/用戶/月)。

| 方案 | Vercel (Hobby/Pro)  | Netlify (Free/Pro)  |
| :-- | :-- | :-- |
| **價格** | 免費 / \$20/月 + 使用超額 | 免費 / \$19/網站/月起 |
| **頻寬** | 100GB / 1TB | 100GB (Free 更寬鬆)  |
| **建置時間** | 4 CPU 小時 / 16 CPU 小時 | 300 點數/月 (建置 + 函數) |
| **函數調用** | 1M Edge 請求 | 125K 請求/月 (Level 0) 

##### 效能與適用場景
Vercel 在邊緣運算和 Next.js 效能勝出，適合動態應用；Netlify 更適合靜態網站和小專案，免費額度不易超支。
- Vercel 優勢：Next.js 原生支援、AI 工具、企業級 SLA。
- Netlify 優勢：簡單上手、更大免費頻寬、文件儲存。
- 選擇建議：Next.js 專案選 Vercel，預算有限靜態站選 Netlify。

#### 費用
Vercel 和 Netlify 提供多層級定價方案，從免費個人專案到企業級客製化，功能涵蓋部署、Serverless 和邊緣運算。

##### Vercel 定價方案
Vercel 採用混合計費模式：固定費用加超額使用。
| 方案 | 價格 | 主要功能 | 適合對象 |
| :-- | :-- | :-- | :-- |
| **Hobby** | 免費  | 100GB 頻寬、1M Edge 請求、4 CPU 小時建置、無限部署預覽 | 個人開發者、小型專案、原型測試  |
| **Pro** | \$20/用戶/月 + 超額  | 10M Edge 請求、40 CPU 小時、零冷啟動、SAML SSO、Spend Management、團隊協作  | 中小型團隊、生產應用、Next.js 專案  |
| **Enterprise** | 客製  | 自訂資源、HIPAA 合規、高 SLA、進階安全與支援 | 大型企業、高流量應用  |

##### Netlify 定價方案
Netlify 以成員座位和使用點數計費，強調團隊擴展。
| 方案 | 價格 | 主要功能 | 適合對象 |
| :-- | :-- | :-- | :-- |
| **Free/Starter** | 免費  | 100GB 頻寬、300 點數/月（建置+函數）、無限部署預覽、基本 CDN  | 個人專案、原型、小型靜態網站  |
| **Pro** | \$19/成員/月 + 超額  | 更高點數額度、Edge Functions、進階防火牆、團隊角色、額外儲存  | 開發團隊、中型網站、Jamstack 應用  |
| **Enterprise** | 客製  | 自訂 SLA、背景函數、AWS 自管部署、高限額安全  | 企業團隊、大規模部署  |

#### Pro 方案內容
- Vercel 和 Netlify 的 Pro 方案針對生產環境優化，Vercel 強調邊緣運算與團隊協作，Netlify 聚焦點數計費與防火牆。
- 有流量相關限制，主要以頻寬（bandwidth）和 Edge 請求計量，超過後自動計費而非硬停。

##### Vercel Pro 服務內容與限制
Vercel Pro 每月 \$20/用戶 + 超額使用，包含 \$20 信用額度抵扣資源。

| 類別 | 內容與限制 |
| :-- | :-- |
| **頻寬/Edge Requests** | 1TB 頻寬、10M Edge 請求/月（超額 \$0.50/1M） |
| **Serverless Functions** | 1M 調用/月、4 小時 Active CPU、360 GB-hrs 記憶體（超額 \$0.60/1M 調用） |
| **建置與部署** | 40 CPU 小時建置、無限部署、1 專案、12 環境、無限預覽部署 |
| **專案數量** | 無硬性限制，但團隊座位計費（Developer \$20/月） |
| **安全功能** | WAF（40 規則）、IP 阻擋（100）、速率限制、SAML SSO（額外 \$300/月） |
| **其他** | ISR 1M 讀取/月、Blob 1GB 儲存、觀測性工具、SOC 2 合規[ |

流量限制:
Vercel Pro 設定明確頻寬與請求上限，適合高流量 Next.js 應用，超額以低價計費。
- **頻寬（Fast Data Transfer）**：1TB/月，超額 \$0.15/GB（依地區微調）。
- **Edge Requests**：10M/月，超額 \$0.50/1M。
- **其他流量相關**：Serverless 函數 1M 調用/月（\$0.60/1M 超額），無訪客數硬限但監控使用量避免意外帳單。

##### Netlify Pro 服務內容與限制
Netlify Pro 每月 \$19/成員 + 超額點數，適合中型團隊擴展。

| 類別 | 內容與限制 |
| :-- | :-- |
| **頻寬** | 100GB+（依點數超額）、全球 CDN |
| **Serverless Functions** | 更高點數額度（Free 300 點數起，Pro 擴展）、Edge Functions |
| **建置與部署** | 無限部署預覽、Agent Runners 建置、Git/AI 整合 |
| **專案/網站數量** | \$19/網站/月（多網站計費），無硬限但點數限制 |
| **安全功能** | 進階防火牆規則、速率限制、基本 DDoS 防護 |
| **其他** | 文件/圖像儲存、SSL 自訂域名、團隊角色管理 |

流量限制:
Netlify Pro 以點數系統管理流量，頻寬較彈性但超額依包計費，適合靜態與 Jamstack 網站。
- **頻寬**：1TB/月起（視點數），超額 \$20/100GB 自動加購。
- **Edge Functions**：2M 呼叫/月（點數計），無訪客數限制但高併發依 CDN 處理。
- **其他流量相關**：建置分鐘 25k/月，DDoS 防護與速率限制避免濫用。

#### Netlify - [current credit](https://app.netlify.com/teams/kyp001/billing/general)
``` bash
# support Production & Preview App 
可設定不同 Environment Variables

# 消耗 credit
Netlify 的 Continuous Deployment 會在每次 push 後自動觸發建置與部署，因此會一直消耗你的 credit

# Stop build(use manule build)
select project
	--> project configuration
	--> Build & deploy 
	-->	Build settings 
	--> Configure
	--> Build status 
	--> Stopped builds
	(Netlify will not build your project automatically. You can build locally via the CLI and then publish new deploys manually via the CLI or the API.)
```

#### Vercel - [current userage](https://vercel.com/roberts-projects-2b1cd09b)
``` bash
# add github Repository
Ovierview
  --> Add New
  --> project
  --> add github account
  --> select Repositories
  --> save
  --> Import
  --> Deploy

# disable auto deploy
# 新增　vercel.json 的檔案，放在你 repo 根目錄
{
  "git": { "deploymentEnabled": false }
}
# enable auto deploy 
# vercel.json 的檔案修改如下 --> commit (若不成功要另外push一次)
{
  "git": { "deploymentEnabled": true }
}

# set variable for it
Settings
  --> Environment Variables
  --> set key and value
    Key: VITE_SUPABASE_URL
    Value: https://ekhhkpdmiptctpyfigyy.supabase.co
    --> save
    Key: VITE_SUPABASE_ANON_KEY
    Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
    --> save
  --> Redeploy

# 設定 Preview 先驗證, 再手動上線 Production 
# Preview 可測試 但 Production 不會直接執行
Vercel 
  --> 選擇 Project 
  --> Settings
  --> Environments 
  --> Production
  --> Branch Tracking
  --> Auto-assign Custom Production Domains: Disable
# 啟動 Production 更新  
Vercel 
  --> 選擇 Project 
  --> Deployments 
  --> 找到你要上線的那個部署
  --> 3 dot
  --> Promote
```

### Database
#### Supabase
##### Useage
``` bash
Supabase --> Usage
``` 


##### Setting
``` bash
# URL 
Project settings 
  --> Data API
	--> URL
# Public API key
Project settings 
  --> API Keys
  --> Publishable and secrect API keys
	--> Publishable key

# 使用 URL and ANON_KEY can access database
# 依 table RLS setting
Table Editor 
  --> select table
	--> 3 dot
	--> View policies

# 另一組 API key
# legacy anon/service_role 是基於專案 JWT secret 產生、輪替成本高，所以建議改用新的 publishable/secret keys
# 一般皆可用
Project settings 
  --> API Keys
  --> Legacy anon, service_role API keys
  --> public

# set bucket size
Storage
  --> FileS 
  --> select one bucket
  --> Edit bucket
  --> Bucket settings
  --> Publick bucket(without limit)
  --> Restrict file size(support size) - also set support file type
```

##### Deploy Edge Function from github
``` bash
#資料夾裡建立以下結構：
  supabase/
    functions/
      grab-post-hut/
        index.ts

# commmit --> phsh to github

# 部署到 Supabase
supabase functions deploy grab-post-hut

# if need disable JWT
# 在 function 資料夾裡 supabase/functions/grab-post-hut/index.ts 同層，建立或更新 config.toml
verify_jwt = false
``` 

##### SQL command

###### get table all data
``` sql
SELECT *
FROM roberthut_posts;
```

###### get table all field name and type
``` sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'roberthut_posts'
ORDER BY ordinal_position;
```

###### add some field
``` bash
ALTER TABLE public.roberthut_posts
  ADD COLUMN IF NOT EXISTS eng_title text,
  ADD COLUMN IF NOT EXISTS eng_content text,
  ADD COLUMN IF NOT EXISTS eng_excerpt text,
  ADD COLUMN IF NOT EXISTS eng_tags text[];
```

###### add field translate for supabase data translate
``` bash
ALTER TABLE public.roberthut_posts
  ADD COLUMN IF NOT EXISTS translate text;
```

##### 功能
Supabase 是一個開源的後端即服務 (BaaS) 平台，以 PostgreSQL 為核心，提供多項功能讓開發者快速建置應用。

###### 核心功能
Supabase 的六大核心功能包括資料庫 (Database)、使用者認證 (Authentication)、檔案儲存 (Storage) 和即時訂閱 (Realtime)。
它還支援邊緣函數 (Edge Functions) 來執行無伺服器程式碼，以及向量資料庫 (Vector) 支援 AI 應用。
這些功能透過自動生成的 RESTful API 和 GraphQL API，讓前端直接操作後端資源。

###### 資料庫與 API
Supabase 使用 PostgreSQL 作為資料庫，支援完整的 CRUD 操作，並自動產生 API 文件。
開發者可透過 Supabase CLI 管理遷移、分支和資料同步，例如 `supabase db push` 推送變更到雲端。
即時功能允許訂閱資料變化，如新訊息插入時自動通知前端。

###### CLI 常用指令
Supabase CLI 提供本地開發工具，包括啟動服務 (`supabase start`) 和管理儲存桶 (`supabase storage create-bucket`)。
函數管理指令如 `supabase functions deploy` 用於部署無伺服器函數。
典型流程涵蓋初始化、測試和部署，讓開發高效同步本地與雲端。

##### 費用
免費方案每月 $0，包含無限 API 請求、50,000 月活躍用戶、500 MB 資料庫空間、5 GB 出口流量和 1 GB 檔案儲存。​
專案閒置一週後暫停，且限 2 個活躍專案，適合入門測試。

###### Supabase 價格方案比較
Supabase 的方案從免費到 Enterprise，涵蓋不同規模需求，按使用者數、儲存和支援分級。

| 方案 | 月費起 | 資料庫空間 | 檔案儲存 | 月活躍用戶 (MAU) | 備份保留 | 支援等級 |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Free | \$0 | 500 MB | 1 GB | 50,000 | 無 | 社區 |
| Pro | \$25 (\$10 運算) | 8 GB (超額 \$0.125/GB) | 100 GB (超額 \$0.021/GB) | 100,000 (超額 \$0.00325) | 7 天 | 電子郵件 |
| Team | \$599 | 更高配額 | 更高配額 | 更高配額 | 14 天 | 優先 |
| Enterprise | 客製 | 客製 | 客製 | 客製 | 客製 | 專屬 + SLA |

###### 其他共通費用
所有方案出口流量超額 \$0.09/GB，運算從 Micro (\$10/月) 升級。
Pro 以上支援 PITR (\$100/月起)、自訂網域 (\$10/月)，並有花費上限防超支。
Enterprise 提供 SOC2、SSO 和自帶雲端部署。



### Prompt
#### Share
##### Bilingual Support
``` bash
1. 增加 app 介面 雙語功能,提供切換 bottom 英文網頁 url 為 / 中文 為 /zh-tw
2. 語言切換按鈕 若在英文模式 地球 icon 後 直接加註 中文 , 若在中文模式 地球 icon 後 直接加註 English, 直接可以切換 不用選擇
3. 輸入url 或 refresh 偵測 browser 語言, 若為 中文 不管輸入 url 為 / or /ch-tw 自動切換至 /ch-tw , 若為 英文 不管輸入 url 為 / or /ch-tw 自動切換至 /, 但 按語言button後即不自動切換
```

##### Feedback
``` bash
1. 幫我寫一個 SQL for 產生 意見回饋 table 包含以下欄位 app_name, user_name, user_email, message, create_date ,status
2. 幫我加入 意見回饋(Feedback) 輸入功能 含欄位 user_name , email , content ,  email 為 option 輸入, create_date 自動填入, app_name 內容填 tarot
```

#### Lovable 
##### Image generaye app
``` bash
Create an AI-powered image generator app. The interface should be clean, modern, and visually appealing. Users should be able to type in a description of the image they want and click a button to generate it.
To generate the image, send a POST request to this endpoint: https://hot5656.app.n8n.cloud/webhook/image
The request body should look like this:
{ "prompt": "a high-resolution portrait of a man wearing a suit" }
The API will return the generated image as a binary file.
```
##### prompt for portfolio
``` bash
I am a senior full stack software Engineer with 15 years experience.
help me create a portfolio website. add all my skills and relevant tech stack.
include a dark mode in the website.
```

##### prompt for General Hospital
``` bash
Build a modern, clean, and user-friendly website for a General Hospital.

Main Requirements:
Home Page: Overview of the hospital with a welcoming banner, quick links to departments, emergency contact, and appointment booking.
Aubot Us Page: History, mission, vision, leadership team, and accreditation information.
Services Page: Summary of major hospital services.
Create a dedicated page for each department with a clear description:
Emergency Department(ED)/Accident&Emergency(A&E), Internal Medicine, Cardiology, Gastroenterology, Pimonoloav, Nebro
....
Accessible (ADA-compliant if possible)

Special Feature:
Quick access button for Emergency Room contact.
Search functionality for doctors and services.
Testimonials/Reviews section from past patients.
Blog session for health tips and hospital news.

Tone:
Trustworthy, caring, and approachable.
```

### Blog post automation - [Blog Journal](https://blog-canvas-roan.vercel.app/) (Lovable)
####  URL & anon key position
``` bash
src/integrations/supabase/client.ts
```

#### Edge function position(need set JWT disable)
``` bash
# supabase/functions/create-post/index.ts

# supabase add variable for n8n credential
Function 
  --> Secrects
  	N8N_API_KEY: for blog demo
  	N8N_API_KEY_ROBERT_HUT for blog hut
```

#### Supabase table/bucket and Edge fynction create 
##### table/bucket create SQL
``` SQL
-- 建立 posts 表
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT DEFAULT '/placeholder.svg',
  author_name TEXT DEFAULT 'Anonymous',
  author_avatar TEXT DEFAULT '/placeholder.svg',
  date DATE DEFAULT CURRENT_DATE,
  read_time TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'published',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 啟用 RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- RLS 政策：允許所有人讀取已發布的文章
CREATE POLICY "Anyone can read published posts"
ON public.posts FOR SELECT
USING (status = 'published');

-- RLS 政策：認證用戶可以讀取自己的草稿
CREATE POLICY "Users can read own drafts"
ON public.posts FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- 建立 Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('author-avatars', 'author-avatars', true);
```

##### Edge function create
``` bash
# supabase/functions/create-post/index.ts
```

##### crease user table from creatch 
``` bash
# 1. 建立 Profiles 表（用戶資料）
-- 建立 profiles 表
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  primary key (id)
);

-- 啟用 RLS
alter table public.profiles enable row level security;

-- RLS 政策：所有人可讀取
create policy "Anyone can view profiles"
on public.profiles for select
using (true);

-- RLS 政策：用戶可更新自己的資料
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id);

-- 自動建立 profile 的函數
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

-- 觸發器：新用戶註冊時自動建立 profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


# 2. 建立 User Roles 表（角色管理）
-- 建立角色 enum
create type public.app_role as enum ('admin', 'moderator', 'user');

-- 建立 user_roles 表
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'user',
  created_at timestamp with time zone default now(),
  unique (user_id, role)
);

-- 啟用 RLS
alter table public.user_roles enable row level security;

-- 檢查角色的安全函數
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS 政策：用戶可查看自己的角色
create policy "Users can view own roles"
on public.user_roles for select
to authenticated
using (auth.uid() = user_id);

-- RLS 政策：管理員可查看所有角色
create policy "Admins can view all roles"
on public.user_roles for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- RLS 政策：管理員可管理角色
create policy "Admins can manage roles"
on public.user_roles for all
to authenticated
using (public.has_role(auth.uid(), 'admin'));


# 3. 手動建立 user(註冊就有)
Authentication
	--> Users
	--> Add user	
	--> Email, User Password(Auto confirm User:Enable)

# 4. 手動新增管理員(admin 才要加入)	
Table Editor
	--> user_roles
	--> Inset
	--> Insert row
		user_id: select 手動建立 user
		role: admin

# disable email confirm
Authentication
  --> Sign In/Providers
  --> Confirm email: Disable 
```

##### bucket policies(bucket policies 和原始非一致)
``` bash
# dump status
# 1) 查 storage.objects 的 owner
select
  c.oid::regclass as table_name,
  c.relowner::regrole as owner
from pg_class c
where c.oid = 'storage.objects'::regclass;
# 也一起查 schema：
select
  c.relnamespace::regnamespace as schema,
  c.relname as table_name,
  c.relowner::regrole as owner
from pg_class c
where c.oid = 'storage.objects'::regclass;
# 查你「目前」用什麼角色在執行
select current_user, session_user;

# 太複雜手動修改
Storgae 
  --> Policies 
  --> author-avatars
  --> New policy
    Policy name: (bucket_id = 'author-avatars'::text) 187wgs8_0 - 輸入時似乎會自動變
    commandL SELECT
    Target roles: anon, authenticated
    Using expression: (bucket_id = 'author-avatars'::text)
 Storgae 
  --> Policies    
  --> blog-images
  --> New policy
    Policy name: Public read access bjsgsj_0 - 輸入時似乎會自動變
    commandL SELECT
    Target roles: Default to all(public) roles if non selected
    Using expression: (bucket_id = 'blog-images'::text)
  --> New policy
    Policy name: Allow uploads bjsgsj_0 - 輸入時似乎會自動變
    commandL INSERT
    Target roles: Default to all(public) roles if non selected
    Using expression: (bucket_id = 'blog-images'::text)

# Email confirm 有問題,暫不用
# 1. set Site URL, Redirect URLs(設定不含 zh-tw)
Authentication
  --> URL Configuration
# 2. set Confirm email enable
Authentication
  --> Sign In/Providers
``` 

#### Supabase 
##### Supabase CLI
``` bash
# inatall at Mac
brew install supabase/tap/supabase

# login to Supabase CLI
supabase login

# show all Edge function
supabase functions list

# delete Edge function 
supabase functions delete create-post
```

##### Edge function control
``` bash
# add 
Edge Function --> Deploy a new function
  --> Via Editor

# set JWT Enable
select funtion --> Details
  --> Verify JWT with legacy secret
  --> Enable (Enable access 要驗證)

# modify 
select funtion
  --> Code
  --> Modify 
  --> Deploy Updates
```

#### workflow - auto add post from google sheet Content ideas
<div style="max-width:700px">
	{% asset_img pic1.png pic_1 %}
</div>

``` bash
# Manual Trigger

# sheet --> Get row(s) in sheet
Document: Content ideas
Filters
  Column: Completed
  Value:        - empty
Options
  Return only First Matching Row: Enable

# Google Gemini --> Message a model
Prompt:
"
  You are an expert SEO content writer and blogger, and an absolute expert in this field. Write a detailed, high-quality article based on the topic:
  {{ $json.Prompt }}

  ### Formatting Instructions:
  - Add a concise summary or definition in the introduction (120 words).
  - Divide the article into 4–5 meaningful sections with `##` headings. Each section must explore a **distinct, non-overlapping** subtopic.
  - Under each `##`, write 2–4 paragraphs with deep, insightful content. Avoid shallow or generic points.
  - Use `** **` for emphasis and `* *` for nuance. Include `+` lists where appropriate.
  - End with a `## Conclusion` section summarizing the article (approx. 120 words).

  ### Content Quality:
  - Write for an audience that wants practical, trustworthy, and well-structured answers.
  - Use a friendly, engaging, and informative tone.
  - Include rhetorical questions or transitions to guide the reader naturally.
  - Include related keywords and synonyms to boost semantic SEO.
  - Avoid repetition. Ensure each section adds new value.
  - use markdown format
  - no wrappers, no explanations, just the markdown.

  ### Optional:
  - If relevant, add a short FAQ section using `###` for each question for answers.

  Only output the complete wrappers article — no explanations.

  ### note : the ouput language same as {{ $json.Prompt }}
"

# Google Gemini --> Message a model
Prompt:
"
  You are an expert SEO copywriter. 
  The input article is {{ $json.content.parts[0].text }}

  generate field as below:
    title: Create a compelling, high-converting blog post title (maximum 60 characters) for the following article
    excerpt: A short summary of the article
    read_time: count the article read time 
    tags:  show the article

  ### Instructions:
  - Include the main topic keyword or variation near the beginning.
  - Make it attention-grabbing and benefit-driven.
  - Match the search intent of a user looking for this topic.
  - Use clear, strong language that encourages clicks without sounding like clickbait.
  - Avoid vague words like “things”, “stuff”, “info”.
  - Do not use any HTML characters
  - Do not use quotation marks. The only special characters allowed are ":" and ",".
  - Output only the raw string containing the title — no notes, no wrappers, no code blocks.

  Your goal is to maximize SEO, search intent match, and reader engagement with this headline.

  The output example is below :
  {
    "title": "Create a compelling, high-converting blog post title (maximum 60 characters) for the following article"
    "excerpt": "A short summary of the article"
    read_time: "5 min read",
    tags:  ["Technology", "AI"]
  }

  ### note : the ouput language same as {{ $('Get row(s) in sheet').item.json.Prompt }}
"
Output Content as JSON: Enable

# Edit Field
output(object): {{ $json.content.parts[0].text.parseJson() }}
author_fig: {{ $('Get row(s) in sheet').first().json.Author.replace(' ','_') }}.jpg

# if
{{ $('Edit Fields').item.json.author_fig }} "is equal to" .jpg

# Edit field #1
author_fig: Mr._alligator.jpg
author: Mr. alligator

# Edit field #2
author_fig: {{ $('Edit Fields').item.json.author_fig }}
author: {{ $('Get row(s) in sheet').item.json.Author }}

# Edit field(Author Fig)
author_fig: {{ $json.author_fig }}
author: {{ $json.author }}

# HTTP request(Create Image)
Method: POST
URL: https://api.openai.com/v1/images/generations
Authentication: Predefined Credential Type
Credential Type: OpenAi
OpenAi: OpenAi account
Send Body: Enable
Body Content Type: JSON
Specify Body: Using JSON
  {
    "model": "gpt-image-1-mini",
    "prompt": "{{ $('Edit Fields').item.json.output.title }}, The image doesn't include any words and and don't use comic style",
    "size": "1536x1024",
    "quality": "low",
    "output_format": "jpeg"
  }

# Convert to File --> Move base64 string to file
Base64 Input Field: data[0].b64_json

# Drive --> Upload File
File Name: {{ $('Edit Fields').item.json.output.title }}.{{ $('Convert to File').first().binary.data.fileExtension }}
Parent Drive: My Drive
Parent Folder: post_image

# Drive --> Download File
File: {{ $json.webViewLink }}

# HTTP request
Method: POST
URL: https://ukloaaccuetocrkxsdlv.supabase.co/functions/v1/create-post
Authentication: Generic Credential Type
Generic Auth Type:Custom Auth
Custom Auth: Custom Auth (supabase post)
  JSON:
  + 1st:
    {
      "headers": {
        "apikey": "<api_key>",
        "Authorization": "Bearer <api_key>",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      }
    } 
  + 2nd:add special key
  {
    "headers": {
      "x-n8n-api-key": "n8n_sk_..."
    }
  }
Send Body: Enable
Body Content Type: Form-Data
  Parameter Type:  Form Data
  Name:  title
  Value:   {{ $('Edit Fields').item.json.output.title }}
  
  Parameter Type: Form Data
  Name: content
  Value: {{ $('Message a model').item.json.content.parts[0].text }}
  
  Parameter Type:   Form Data
  Name: excerpt
  Value: {{ $('Edit Fields').item.json.output.excerpt }}
  
  Parameter Type: Form Data
  Name: author_name
  Value: {{ $('Author Fig').item.json.author }}
  
  Parameter Type: Form Data
  Name: tags
  Value: {{ $('Edit Fields').item.json.output.tags.map(tag => `"${tag}"`).join(', ') }}

  Parameter Type: n8n Binary File
  Name: image
  Input Data Field Name: data

  Parameter Type: Form Data
  Name: author_avatar
  Value: {{ $('Author Fig').item.json.author_fig }}
  
# sheet update row in sheet
Document: Content ideas
Mapping Column Mode: Map Each Column Manually
Column to match on: Prompt
  Prompt (using to match): {{ $('Get row(s) in sheet').item.json.Prompt }}
  Date: {{$now.format('yyyy-MM-dd HH:mm:ss')}}
  Author: {{ $('Author Fig').item.json.author }}
  Title: {{ $json.post.title }}
  Post ID: {{ $json.post.id }}
  Completed: Yes
```

#### Lovable coding 
##### Supabase database
``` bash
# create a project - blog_post
Project URL: ...
API Key: ...
```

##### Lovable setting
``` bash
# link to Supabase
Robert --> Settings
  --> Connectors
  --> Supabase
  --> Manage Connected Organization
```


##### design flow
``` bash
# first prompt
Create a blog platform for testing with:
+ Homepage showing 5 sample blog posts
+ Each post has: title, featured image, content, author, date
+ Individual post pages with full content
+ Use Unsplash free images for demo
+ Ability to add/delete posts (stored in browser)

# example image source 
post image: https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80
author image: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80

# save post and image to Supabase

# create posts table -for save post
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_name TEXT DEFAULT 'Anonymous',
  author_avatar TEXT,
  date TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allow public read access
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete" ON posts
  FOR DELETE USING (true);

# add two post to table post
INSERT INTO posts (title, excerpt, content, featured_image, author_name, author_avatar, date, read_time, tags)
VALUES 
(
  'The Art of Minimalist Design',
  'Discover how less can truly be more in the world of digital design and user experience.',
  'Minimalism in design is not about removing elements until nothing is left. It''s about intentionally keeping only what serves a purpose.

## The Philosophy Behind Less

When we strip away the unnecessary, we allow the essential to shine. Every pixel, every word, every interaction should earn its place on the screen.

> "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

## Practical Applications

Start by questioning every element. Does this button need to be here? Is this animation adding value or just adding load time? The answers will guide you toward cleaner, more effective designs.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
  'Sarah Chen',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  'December 12, 2024',
  '4 min read',
  ARRAY['Design', 'Minimalism', 'UX']
),
(
  'Building for the Future with AI',
  'How artificial intelligence is reshaping the way we think about software development.',
  'The integration of AI into our development workflows is no longer a future prospect—it''s happening now, and it''s changing everything.

## Beyond Code Completion

While AI-powered code suggestions grab headlines, the real transformation is deeper. We''re seeing AI assist in architecture decisions, bug detection, and even user research synthesis.

## The Human Element

Despite these advances, the human developer remains essential. AI amplifies our capabilities but doesn''t replace our judgment, creativity, or understanding of user needs.

> "AI is a tool, not a replacement. The best results come from human-AI collaboration."

The future belongs to developers who learn to work alongside these tools effectively.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Marcus Johnson',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  'December 10, 2024',
  '6 min read',
  ARRAY['AI', 'Technology', 'Development']
);

# Create Storage Bucket at Supabase
-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Allow public read access
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow uploads
CREATE POLICY "Anyone can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');

# modidy Edge function for support load image
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string || '';
    const authorName = formData.get('author_name') as string || 'Anonymous';
    const tagsString = formData.get('tags') as string || '';
    const imageFile = formData.get('image') as File | null;

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let featuredImageUrl = '/placeholder.svg';

    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop() || 'jpg';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, imageFile, {
          contentType: imageFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        return new Response(
          JSON.stringify({ error: 'Failed to upload image', details: uploadError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      
      featuredImageUrl = urlData.publicUrl;
      console.log('Image uploaded successfully:', featuredImageUrl);
    }

    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const { data: post, error: insertError } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        excerpt,
        featured_image: featuredImageUrl,
        author_name: authorName,
        author_avatar: '/placeholder.svg',
        date: new Date().toISOString().split('T')[0],
        read_time: readTime,
        tags
      })
      .select()
      .single();

    if (insertError) {
      console.error('Post insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create post', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Post created successfully:', post.id);

    return new Response(
      JSON.stringify({ success: true, post }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

# add bucket for  author-avatars
Storage  --> New bucket 
  --> name: author-avatars
  --> Public bucket: Enable
  --> create

# upload author image
  --> author-avatars
  --> Upload files

# modify some function
# 1. add edit published/draft
# 2. Edit exist post
# 3. delete post must enter the post's author_name to make sure
# 4. write post by webm auto pick the image and author vavtar image

# posts table add field status
ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'published';

# modify status error, set RLS policy
# The 406 error shows the update is blocked by RLS policy. You need to add an UPDATE policy to your Supabase posts table.
CREATE POLICY "Allow public update" ON posts FOR UPDATE USING (true) WITH CHECK (true);

# Lasted Edge function
# 1. add author image
# 2. \n 變 換行
# 3. post set status: 'draft'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse multipart form data
    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    let content = formData.get('content') as string;
    let excerpt = formData.get('excerpt') as string || '';
    const authorName = formData.get('author_name') as string || 'Anonymous';
    const authorAvatar = formData.get('author_avatar') as string || '';
    const tagsString = formData.get('tags') as string || '';
    const imageFile = formData.get('image') as File | null;

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert literal \n strings to actual newlines
    content = content.replace(/\\n/g, '\n');
    excerpt = excerpt.replace(/\\n/g, '\n');

    let featuredImageUrl = '/placeholder.svg';

    // Upload image if provided
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop() || 'jpg';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, imageFile, {
          contentType: imageFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        return new Response(
          JSON.stringify({ error: 'Failed to upload image', details: uploadError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      
      featuredImageUrl = urlData.publicUrl;
      console.log('Image uploaded successfully:', featuredImageUrl);
    }

    // Parse tags
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];

    // Calculate read time
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    // Build author avatar URL if filename provided
    let authorAvatarUrl = '/placeholder.svg';
    if (authorAvatar) {
      // If it's already a full URL, use it directly
      if (authorAvatar.startsWith('http://') || authorAvatar.startsWith('https://')) {
        authorAvatarUrl = authorAvatar;
      } else {
        // Otherwise, construct URL from author-avatars bucket
        const { data: avatarUrlData } = supabase.storage
          .from('author-avatars')
          .getPublicUrl(authorAvatar);
        authorAvatarUrl = avatarUrlData.publicUrl;
      }
    }

    // Insert post with status='draft' for n8n posts
    const { data: post, error: insertError } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        excerpt,
        featured_image: featuredImageUrl,
        author_name: authorName,
        author_avatar: authorAvatarUrl,
        date: new Date().toISOString().split('T')[0],
        read_time: readTime,
        tags,
        status: 'draft'  // n8n posts are drafts by default
      })
      .select()
      .single();

    if (insertError) {
      console.error('Post insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create post', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Post created successfully as draft:', post.id);

    return new Response(
      JSON.stringify({ success: true, post }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

```

##### 完整管理員登入系統
``` bash
# 
-- 建立角色類型
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 建立 user_roles 表
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- 啟用 RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 允許已登入用戶讀取自己的角色
CREATE POLICY "Users can read own roles" 
ON public.user_roles FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

# 建立角色檢查函數（避免 RLS 遞迴）
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

# 更新 posts 表的 RLS 政策
-- 刪除現有的開放政策
DROP POLICY IF EXISTS "Allow public read" ON public.posts;
DROP POLICY IF EXISTS "Allow public insert" ON public.posts;
DROP POLICY IF EXISTS "Allow public update" ON public.posts;
DROP POLICY IF EXISTS "Allow public delete" ON public.posts;

-- 新增安全的 RLS 政策
-- 任何人可讀取已發佈文章
CREATE POLICY "Anyone can read published posts" 
ON public.posts FOR SELECT 
USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

-- 只有管理員可新增文章
CREATE POLICY "Admins can insert posts" 
ON public.posts FOR INSERT 
TO authenticated 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 只有管理員可更新文章
CREATE POLICY "Admins can update posts" 
ON public.posts FOR UPDATE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

-- 只有管理員可刪除文章
CREATE POLICY "Admins can delete posts" 
ON public.posts FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

# disable Confirm email: 加速測試過程
Authentication
  --> Sign In/Providers
  --> Confirm email: Disable 
# if Confirm email - set correct flow
Authentication
  --> Notifications
  --> Email
  --> Set up SMTP

# 實作前端管理員登入系統

# 註冊第一帳號: email, password(by app, yahoo-gogo999/gogo888)
Authentication
  --> Users 
  --> see UID information
Table Editor 
  --> user_roles
  --> Insert
  --> Insert row
  --> user_id(select created UID) 
  --> role --> select admin
  --> Save

# enable Confirm email(app add new user, google 001-demo5656/demo999) 
Authentication
  --> Sign In/Providers
  --> Confirm email: Enable   

# email confirm error --> set URL Configuration
Supabase
  --> Authentication
  --> URL Configuration
    Site URL: https://xxx.lovable.app (example)
    Redirect URLs: https://xxx.lovable.app/* (example)

# 忘記密碼功能實作 for reset-password
Supabase
  --> Authentication
  --> URL Configuration
    Redirect URLs: https://xxx.lovable.app/reset-password (example)

# 正確預覽畫面的 URL
Lovable 編輯畫面 --> mouse right 
  --> 在新分頁開啟連接 (才是正確的 程式預覽 URL): https://xxx.lovable.app/ (example)
# add URL
Supabase
  --> Authentication
  --> URL Configuration
    Site URL: https://xxx.lovable.app (example)
    Redirect URLs: https://xxx.lovable.app/** (example)
    (如此可以包含 /reset-password)

# 密碼重置 ok
```

##### support other url can change password, add bot
``` bash
# Edge function
"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-n8n-api-key',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 🔐 驗證 n8n API Key
    const n8nApiKey = Deno.env.get('N8N_API_KEY');
    const providedApiKey = req.headers.get('x-n8n-api-key');
    
    if (!n8nApiKey) {
      console.error('N8N_API_KEY environment variable is not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!providedApiKey || providedApiKey !== n8nApiKey) {
      console.error('Invalid or missing API key');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('API key validated successfully');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse multipart form data
    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    let content = formData.get('content') as string;
    let excerpt = formData.get('excerpt') as string || '';
    const authorName = formData.get('author_name') as string || 'Anonymous';
    const authorAvatar = formData.get('author_avatar') as string || '';
    const tagsString = formData.get('tags') as string || '';
    const imageFile = formData.get('image') as File | null;

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert literal \n strings to actual newlines
    content = content.replace(/\\n/g, '\n');
    excerpt = excerpt.replace(/\\n/g, '\n');

    let featuredImageUrl = '/placeholder.svg';

    // Upload image if provided
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop() || 'jpg';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, imageFile, {
          contentType: imageFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        return new Response(
          JSON.stringify({ error: 'Failed to upload image', details: uploadError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      
      featuredImageUrl = urlData.publicUrl;
      console.log('Image uploaded successfully:', featuredImageUrl);
    }

    // Parse tags
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];

    // Calculate read time
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    // Build author avatar URL if filename provided
    let authorAvatarUrl = '/placeholder.svg';
    if (authorAvatar) {
      // If it's already a full URL, use it directly
      if (authorAvatar.startsWith('http://') || authorAvatar.startsWith('https://')) {
        authorAvatarUrl = authorAvatar;
      } else {
        // Otherwise, construct URL from author-avatars bucket
        const { data: avatarUrlData } = supabase.storage
          .from('author-avatars')
          .getPublicUrl(authorAvatar);
        authorAvatarUrl = avatarUrlData.publicUrl;
      }
    }

    // Insert post with status='draft' for n8n posts
    const { data: post, error: insertError } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        excerpt,
        featured_image: featuredImageUrl,
        author_name: authorName,
        author_avatar: authorAvatarUrl,
        date: new Date().toISOString().split('T')[0],
        read_time: readTime,
        tags,
        status: 'draft'  // n8n posts are drafts by default
      })
      .select()
      .single();

    if (insertError) {
      console.error('Post insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create post', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Post created successfully as draft:', post.id);

    return new Response(
      JSON.stringify({ success: true, post }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
"

# Fdge function create-post JWT set disable(section Details)

# add variable N8N_API_KEY for n8n credential(Function --> Secrects)

# set correct URL
Authentication  
  --> URL Configuration
    Site URL:
      https://app-id.lovable.app
    Redirect URLs:
      https://app-id.lovable.app/**
      https://app-name.vercel.app/**
```

##### modify chat only support when log, support user edit self post
``` bash
# add guest account
guest-kkk999

# 建立 table profiles
-- 建立 profiles 表
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  avatar_url text,
  email text,
  created_at timestamp with time zone default now()
);

-- 啟用 RLS
alter table public.profiles enable row level security;

-- RLS 政策：用戶可以讀取所有 profiles（用於名稱登入查詢）
create policy "Anyone can read profiles"
on public.profiles for select
to anon, authenticated
using (true);

-- RLS 政策：用戶只能更新自己的 profile
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id);

-- 自動建立 profile 的觸發器
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar_url, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name'),
    new.raw_user_meta_data ->> 'avatar_url',
    new.email
  );
  return new;
end;
$$;

-- 建立觸發器
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

# 公開 author-avatars
-- 允許任何人讀取 author-avatars 桶中的檔案
CREATE POLICY "Allow public read access to author-avatars"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'author-avatars');


# 允許 user 處理自己的 post
# 1. 在 posts 表添加 user_id 欄位
# 2. 更新 RLS 政策允許用戶管理自己的文章
# 3. 修改代碼使用用戶的頭像
# 首先執行此 SQL 遷移來添加 user_id 欄位和更新 RLS：
# 修改 table 保留原資料
-- 添加 user_id 欄位
ALTER TABLE posts ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 刪除所有可能存在的政策
DROP POLICY IF EXISTS "Allow public read access" ON posts;
DROP POLICY IF EXISTS "Allow insert access" ON posts;
DROP POLICY IF EXISTS "Allow delete access" ON posts;
DROP POLICY IF EXISTS "Allow update access" ON posts;
DROP POLICY IF EXISTS "Anyone can read published posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;

-- 重新建立政策
CREATE POLICY "Anyone can read published posts" ON posts
FOR SELECT USING (status = 'published' OR auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can insert posts" ON posts
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON posts
FOR UPDATE TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete own posts" ON posts
FOR DELETE TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
```

### [Tarot Cards](https://tarot-cards-seven.vercel.app/) (Bolt.New) 
#### BoltNew prompt
``` bash
# First prompt
我想創建一個交互式塔羅牌占卜網頁應用。以下是詳細需求：

【應用概述】
這是一個為個人使用而設計的塔羅牌占卜網站，結合了古老的占卜傳統與現代網頁設計。用戶可以提出問題，選擇占卜類型，進行虛擬洗牌和抽牌，然後獲得詳細的牌卡解釋。

【核心功能】

首頁歡迎界面

優雅的標題："塔羅之門 - 尋求智慧的占卜"
簡短的介紹文本，解釋塔羅的用途（自我反思、獲取洞察等）
一個明顯的「開始占卜」按鈕，進入主應用
問題輸入界面

要求用戶輸入他們想要占卜的問題或關注領域
文本輸入框帶有提示文字："請輸入你想要探索的問題或生活領域..."
顯示一些「常見問題範例」供參考：
"我如何能在職業上取得進展？"
"我的感情關係將如何發展？"
"現在對我來說最重要的課題是什麼？"
「下一步」按鈕繼續
占卜類型選擇

提供三種主要牌陣選項： a) 單牌占卜 - "快速指引"（1張牌） b) 三牌占卜 - "過去、現在、未來"（3張牌） c) 五牌占卜 - "深度洞察"（5張牌：情況、挑戰、建議、結果、額外洞察）
每個選項帶有簡短說明和圖標
用戶選擇後顯示「開始占卜」按鈕
虛擬洗牌體驗

動畫展示78張牌卡快速翻轉（象徵洗牌過程）
顯示文字："專注你的問題...融入占卜的能量..."
洗牌動畫持續3-5秒，然後自動進入抽牌階段
抽牌動畫

根據選定的牌陣數量，依次翻開牌卡
每張牌卡翻開時有動畫效果（3D翻轉或淡入）
牌卡可以是正位或逆位（隨機或根據數據庫）
牌卡翻開後排列成所選牌陣的形狀
占卜結果展示

顯示所有抽取的牌卡及其排列
為每張牌卡顯示：
牌卡名稱和編號
牌卡的視覺圖像（使用牌卡插圖）
正位/逆位標示
牌卡含義（2-3句話的簡潔解釋）
整體占卜解讀（200-300字的文字，解釋所有牌卡如何共同回應用戶的問題）
互動功能

「詢問更多」按鈕：用戶可以提出後續問題，根據已有的牌卡進行深入討論
「重新占卜」按鈕：使用新的問題重新開始
「保存此次占卜」按鈕：將占卜結果保存到本地瀏覽器（localStorage）
歷史記錄（可選）

側邊欄或單獨頁面顯示過去的占卜記錄
每條記錄顯示：日期、問題、牌卡摘要、完整解讀
【設計要求】

視覺風格

色彩主題：深色背景（如深紫色、深藍色或黑色）配合金色、銀色或玫瑰金色的強調色
優雅但易讀的字體
神祕但不過度的氛圍
響應式設計，在手機、平板和桌面上都能完美顯示
動畫和互動

平滑的頁面轉換
牌卡翻轉和排列的流暢動畫
懸停效果和焦點指示
加載動畫和過渡效果
可訪問性

充足的顏色對比度
可鍵盤導航
為所有互動元素提供 alt 文本
【牌卡資料】

創建或使用一個包含 78 張塔羅牌的數據庫，每張牌包括：

牌名（中英文）
編號
大秘儀/小秘儀分類
牌組（杯、魔杖、寶劍、聖幣等）
正位含義（50-100字）
逆位含義（50-100字）
牌卡圖像 URL（可使用免費塔羅牌圖像 API 或本地圖像）
元素和象徵符號
【技術要求】

使用現代前端框架（React、Vue 或純 HTML/CSS/JavaScript 都可以）
牌卡信息存儲在 JSON 數據結構或客戶端數據庫中
使用 localStorage 保存用戶的占卜歷史
確保代碼結構清晰、易於維護和擴展
包含基本的錯誤處理和輸入驗證
【額外增強功能（可選）】

多語言支持（中文、英文）
暗色/亮色主題切換
占卜解讀的 AI 增強版本（與 GPT API 集成以生成更個性化的解讀）
分享占卜結果的功能（生成截圖或分享鏈接）
每日占卜推送
學習模式：展示每張牌卡的詳細含義和歷史背景
【用戶體驗流程】

用戶進入網頁，看到歡迎界面
點擊「開始占卜」進入問題輸入
輸入他們的問題，點擊「下一步」
選擇占卜類型（單牌、三牌或五牌）
觀看虛擬洗牌動畫
看著牌卡逐一翻開並排列
閱讀每張牌卡的含義和整體占卜解讀
選擇是否詢問更多、保存占卜或重新開始
請使用現代的、視覺上令人愉悅的設計來創建這個應用。確保整個體驗感覺真實而有意義，同時保持用戶友好和易於導航。
```

#### Deploy to Netlify
``` bash
# set variable 
Project configuration --> Environment variables
  --> Add these two variables:
    Variable 1:
    Key: VITE_SUPABASE_URL
    Value: https://ekhhkpdmiptctpyfigyy.supabase.co

    Variable 2:
    Key: VITE_SUPABASE_ANON_KEY
    Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

# after add variable the run develop trigger
Deploys --> Trigger deploy --> Deploy project
```

#### Supabase get URL&API
``` bash
porject 
	--> Project Settings 
	--> Data API
		URL(VITE_SUPABASE_URL)
	--> API KEY
		VITE_SUPABASE_ANON_KEY(Publishable key)
```

### [Practical Tools Collection](https://tools-collection-smoky.vercel.app/zh-tw)(Bolt.New)
#### browser 為 中文 為自動應換 解析
``` bash
# 中文瀏覽器自動切到 /zh-tw」就是在 LanguageContext.tsx 裡用 React Router 的 navigate() 做的
# src/contexts/LanguageContext.tsx
- 在 LanguageProvider 裡的 useEffect 會在「使用者沒手動切換過」時執行
  若偵測到 browserLang === 'zh-tw' 且目前不在 /zh-tw，就 navigate('/zh-tw', { replace: true })
  若偵測到 browserLang === 'en' 且目前在 /zh-tw，就 navigate('/', { replace: true })
- 如何「只第一次自動導」  
  它用 localStorage 的 language-manual-switch 當旗標：hasManuallySwitch() 會檢查這個 key 是否為 'true'。
  ​只要你在 UI 切語系時呼叫 setLanguage(lang, true)，就會把旗標寫進 localStorage，之後進站就不再依瀏覽器語言強制導頁。  
```


### [Robert hut](https://robert-hut.vercel.app/)(Bolt.New)
#### redeploy 某 commit preview
``` bash
# 若更改 variable 後要 redeploy

# 找之前 deploy 的 preview url
Reployments
	--> select commit item
	--> 3 dot
	--> copy URL

# 安裝 vercel cli
C:\Users\RobertKao>npm i -g vercel
C:\Users\RobertKao>vercel --version
	Vercel CLI 50.1.3
	50.1.3
# 登入
vercel login
# 讓 preview 到新變數
vercel redeploy <deployment-url> --target=preview
# check status
vercel whoami
	Vercel CLI 50.1.3
	> kyp001-7668
vercel teams list
	Vercel CLI 50.1.3
	id                            Team name
	roberts-projects-2b1cd09b     Robert's projects	
# switcg teams
vercel teams switch roberts-projects-2b1cd09b
	Vercel CLI 50.1.3
	> Success! The team Robert's projects (roberts-projects-2b1cd09b) is now active!
# redeploy
vercel redeploy robert-...vercel.app --target=preview
	Vercel CLI 50.1.3
	> Fetching deployment "robert-....vercel.app" in roberts-projects-2b1cd09b…
		To deploy to production (robert-....vercel.app), run `vercel --prod`
		Inspect: https://vercel.com/roberts-.../EqyxHyfg8DKYYgDP53VXdUZ3gBGS [2s]
		Preview: https://robert-....vercel.app [2s]
# redeploy 會產生不同的 URL
```

#### Edge function position(need set JWT disable)
``` bash
# supabase/functions/create-post-hut/index.ts
# supabase/functions/grab-post-hut/index.ts
# supabase/functions/update-post-hut-english/index.ts

# supabase add variable for n8n credential
Function 
  --> Secrects
  	N8N_API_KEY: for blog demo
  	N8N_API_KEY_ROBERT_HUT for blog hut
```


#### supabase & n8n setting
##### 1st set supabase + n8n interface
``` bash
# add edge function - create-post-hut
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-n8n-api-key",
};

// 產生 slug：小寫、空白變 -、移除特殊符號，最後加一段隨機碼避免重複
function makeSlug(title: string): string {
  if (!title) return crypto.randomUUID(); // 保底

  let slug = title.toLowerCase().trim();

  // 空白 → -
  slug = slug.replace(/\s+/g, "-");

  // 僅保留英數、-、_（如果你想包含中文，可以改這行）
  // slug = slug.replace(/[^a-z0-9-_]/g, "");

  // 合併多個 -，去掉頭尾 -
  slug = slug.replace(/-+/g, "-").replace(/^-+|-+$/g, "");

  // 隨機碼（用 UUID 截一段）
  const rand = crypto.randomUUID().slice(0, 7); // 例如 mji1v5fp[web:67][web:80]

  return slug ? `${slug}-${rand}` : rand;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 🔐 驗證 n8n API Key
    const n8nApiKey = Deno.env.get("N8N_API_KEY_ROBERT_HUT");
    const providedApiKey = req.headers.get("x-n8n-api-key");

    if (!n8nApiKey) {
      console.error("N8N_API_KEY_ROBERT_HUT not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!providedApiKey || providedApiKey !== n8nApiKey) {
      console.error("Invalid API key");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log("✅ API key validated");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 🚫 檔案大小限制 (10MB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "Payload too large (max 10MB)" }),
        {
          status: 413,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Parse multipart form data
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slugInput = formData.get("slug") as string | null;
    let content = formData.get("content") as string;
    let excerpt = (formData.get("excerpt") as string) || "";
    const tagsString = (formData.get("tags") as string) || "";
    const imageFile = formData.get("image") as File | null;

    console.log("📥 Form data received:", {
      title: title?.substring(0, 50),
      hasImage: !!imageFile,
    });

    // 必要欄位驗證
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Convert literal \n strings to actual newlines
    content = content.replace(/\\n/g, "\n");
    excerpt = excerpt.replace(/\\n/g, "\n");

    // 📁 圖片上傳到 roberthut-blog-images 儲存桶
    let coverImageUrl = "/placeholder.svg";
    if (imageFile && imageFile.size > 0) {
      console.log("🖼️ Uploading image:", imageFile.name, imageFile.size);

      const fileExt = imageFile.name.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("roberthut-blog-images")
        .upload(fileName, imageFile, {
          contentType: imageFile.type || "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        console.error("❌ Image upload error:", uploadError);
        return new Response(
          JSON.stringify({
            error: "Failed to upload image",
            details: uploadError.message,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // 取得公開 URL
      const { data: urlData } = supabase.storage
        .from("roberthut-blog-images")
        .getPublicUrl(fileName);

      coverImageUrl = urlData.publicUrl;
      console.log("✅ Image uploaded:", coverImageUrl);
    }

    // Parse tags (array or empty)
    const tags = tagsString
      ? tagsString.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

    // 🔧 自動生成 slug（若 n8n 沒傳或為空字串，就用標題自動產生）
    const finalSlug =
      slugInput && slugInput.trim() !== "" ? slugInput : makeSlug(title);

    console.log("📝 Inserting post:", {
      title: title.substring(0, 30),
      slug: finalSlug,
      hasImage: coverImageUrl !== "/placeholder.svg",
    });

    // 🚀 插入到 roberthut_posts 資料表
    const { data: post, error: insertError } = await supabase
      .from("roberthut_posts")
      .insert({
        title,
        slug: finalSlug,
        content,
        excerpt,
        cover_image_url: coverImageUrl,
        tags,
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Insert error:", insertError);
      return new Response(
        JSON.stringify({
          error: "Failed to create post",
          details: insertError.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log("🎉 Post created successfully:", post.id);

    return new Response(
      JSON.stringify({ success: true, post }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("💥 Unexpected error:", error);
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

# set JWT disable
Edge function 
  --> Functions
  --> select your function
  --> details 
  --> Verify JWT with legacy secret: Disable

# set variable N8N_API_KEY_ROBERT_HUT
Function 
  --> Secrects

# set n8n credential
Method: POST
URL: 
https://ukloaaccuetocrkxsdlv.supabase.co/functions/v1/create-post-hut
Authentication: Generic Credential Type
Generic Auth Type: Custom Auth
Custom Auth: Custom Auth (supabase hut post)
  {
    "headers": {
      "x-n8n-api-key": "n8n_sk_..."
    }
  }

# curl simple test
gaoyiping@gaoyipingdeMacBook-Pro ~ % curl -X POST "https://ukloaaccuetocrkxsdlv.supabase.co/functions/v1/create-post-hut" \
  -H "x-n8n-api-key: n8n_sk_n..." \
  -F "title=curl測試" \
  -F "content=這是curl測試" \
  -F "slug=curl-test"
{"error":"Failed to create post","details":"Could not find the 'status' column of 'roberthut_posts' in the schema cache"}%  
```

##### SQL add english field
``` sql
ALTER TABLE public.roberthut_posts
  ADD COLUMN IF NOT EXISTS eng_title text,
  ADD COLUMN IF NOT EXISTS eng_content text,
  ADD COLUMN IF NOT EXISTS eng_excerpt text,
  ADD COLUMN IF NOT EXISTS eng_tags text[];
```

##### add edge function create-post-hut(include slug)
``` ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-n8n-api-key",
};

// 產生 slug：小寫、空白變 -、移除特殊符號，最後加一段隨機碼避免重複
function makeSlug(title: string): string {
  if (!title) return crypto.randomUUID(); // 保底

  let slug = title.toLowerCase().trim();

  // 空白 → -
  slug = slug.replace(/\s+/g, "-");

  // 僅保留英數、-、_（如果你想包含中文，可以改這行）
  // slug = slug.replace(/[^a-z0-9-_]/g, "");

  // 合併多個 -，去掉頭尾 -
  slug = slug.replace(/-+/g, "-").replace(/^-+|-+$/g, "");

  // 隨機碼（用 UUID 截一段）
  const rand = crypto.randomUUID().slice(0, 7); // 例如 mji1v5fp[web:67][web:80]

  return slug ? `${slug}-${rand}` : rand;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 🔐 驗證 n8n API Key
    const n8nApiKey = Deno.env.get("N8N_API_KEY_ROBERT_HUT");
    const providedApiKey = req.headers.get("x-n8n-api-key");

    if (!n8nApiKey) {
      console.error("N8N_API_KEY_ROBERT_HUT not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!providedApiKey || providedApiKey !== n8nApiKey) {
      console.error("Invalid API key");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log("✅ API key validated");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 🚫 檔案大小限制 (10MB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "Payload too large (max 10MB)" }),
        {
          status: 413,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Parse multipart form data
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slugInput = formData.get("slug") as string | null;
    let content = formData.get("content") as string;
    let excerpt = (formData.get("excerpt") as string) || "";
    const tagsString = (formData.get("tags") as string) || "";
    const imageFile = formData.get("image") as File | null;

    console.log("📥 Form data received:", {
      title: title?.substring(0, 50),
      hasImage: !!imageFile,
    });

    // 必要欄位驗證
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Convert literal \n strings to actual newlines
    content = content.replace(/\\n/g, "\n");
    excerpt = excerpt.replace(/\\n/g, "\n");

    // 📁 圖片上傳到 roberthut-blog-images 儲存桶
    let coverImageUrl = "/placeholder.svg";
    if (imageFile && imageFile.size > 0) {
      console.log("🖼️ Uploading image:", imageFile.name, imageFile.size);

      const fileExt = imageFile.name.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("roberthut-blog-images")
        .upload(fileName, imageFile, {
          contentType: imageFile.type || "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        console.error("❌ Image upload error:", uploadError);
        return new Response(
          JSON.stringify({
            error: "Failed to upload image",
            details: uploadError.message,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // 取得公開 URL
      const { data: urlData } = supabase.storage
        .from("roberthut-blog-images")
        .getPublicUrl(fileName);

      coverImageUrl = urlData.publicUrl;
      console.log("✅ Image uploaded:", coverImageUrl);
    }

    // Parse tags (array or empty)
    const tags = tagsString
      ? tagsString.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

    // 🔧 自動生成 slug（若 n8n 沒傳或為空字串，就用標題自動產生）
    const finalSlug =
      slugInput && slugInput.trim() !== "" ? slugInput : makeSlug(title);

    console.log("📝 Inserting post:", {
      title: title.substring(0, 30),
      slug: finalSlug,
      hasImage: coverImageUrl !== "/placeholder.svg",
    });

    // 🚀 插入到 roberthut_posts 資料表
    const { data: post, error: insertError } = await supabase
      .from("roberthut_posts")
      .insert({
        title,
        slug: finalSlug,
        content,
        excerpt,
        cover_image_url: coverImageUrl,
        tags,
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Insert error:", insertError);
      return new Response(
        JSON.stringify({
          error: "Failed to create post",
          details: insertError.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log("🎉 Post created successfully:", post.id);

    return new Response(
      JSON.stringify({ success: true, post }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("💥 Unexpected error:", error);
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
```

##### add edge function update-post-hut-english
``` ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-n8n-api-key",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // x-n8n-api-key 驗證
  const n8nApiKey = Deno.env.get("N8N_API_KEY_ROBERT_HUT");
  const providedApiKey = req.headers.get("x-n8n-api-key");
  if (!n8nApiKey || providedApiKey !== n8nApiKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // 讀 JSON
  const body = await req.json();
  const slug = (body.slug ?? "").toString().trim();

  if (!slug) {
    return new Response(JSON.stringify({ error: "slug is required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // eng_tags 建議 n8n 直接傳陣列，例如 ["ai","news"]
  //const eng_tags = Array.isArray(body.eng_tags)
  //  ? body.eng_tags.map((t: unknown) => String(t).trim()).filter(Boolean)
  //  : null;
  const eng_tags =
  Array.isArray(body.eng_tags)
    ? body.eng_tags
    : typeof body.eng_tags === "string"
      ? body.eng_tags.replace(/^=/, "").split(",").map(t => t.trim()).filter(Boolean)
      : null;
      
  // 更新（只更新你要的四個欄位）
  const { data, error } = await supabase
    .from("roberthut_posts")
    .update({
      eng_title: body.eng_title ?? null,
      eng_content: body.eng_content ?? null,
      eng_excerpt: body.eng_excerpt ?? null,
      eng_tags,
    })
    .eq("slug", slug)
    .select()
    .single();

  // update 預設不回傳資料，所以鏈上 .select() 才會回傳更新後那筆 [web:87]
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true, post: data }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
```

##### disable JWT(our Edge all need)
``` bash
Edge Functions
  --> Functions
  --> select your function
  --> Details
  --> Verify JWT with legacy secret: disanle
```

##### set variable(supabase)
``` bash
N8N_API_KEY: for blog journel
N8N_API_KEY_ROBERT_HUT: blog robert hut
```

##### n8n HTTP request - create
``` bash
Method: POST
URL: https://ukloaaccuetocrkxsdlv.supabase.co/functions/v1/create-post-hut
Authentication: Generic Credential Type
Generic Auth Type: Custom Auth
Custom Auth:Custom Auth (supabase hut post)
{
  "headers": {
    "x-n8n-api-key": "n8n_sk_n8n_s..."
  }
}
Send Body: Enable
Body Content Type: Form-Data
  Parameter Type: Form Data
  Name: title
  Value:{ $('Edit Fields3').item.json.title }}
  

  Parameter Type:Form Data
  Name:content
  Value:{{ $('Edit Fields3').item.json.Content }}
  
  Parameter Type:Form Data
  Name:excerpt
  Value:{{ $('Edit Fields3').item.json.Extract }}
  
  Parameter Type:Form Data
  Name:tags
  Value:{{ $('Edit Fields3').item.json.Tags }}
  
  Parameter Type: n8n Binary File
  Name: image
  Input Data Field Name: data
```

##### n8n HTTP request - update
``` bash
Method: POST
URL: https://ukloaaccuetocrkxsdlv.supabase.co/functions/v1/update-post-hut-english
Authentication: Generic Credential Type
Generic Auth Type: Custom Auth
Custom Auth: Custom Auth (supabase hut update)
  {
    "headers": {
      "x-n8n-api-key": "n8n_sk_....",
      "content-type": "application/json"
    }
  }
Send Body: Enable
Body Content Type: JSON
Specify Body: Using Fields Below
  Name: slug
  Value: {{ $('Get row(s) in sheet').item.json.Slug }}

  Name: eng_title
  Value: {{ $json["English Title"] }}
  
  From Zero to Launch: My First Vibe Coding Blog, Empowered by AI for Content Creation!
  Name: eng_content
  Value: {{ $json["English Content"] }}

  Name: eng_excerpt
  Value: {{ $json["English Extract"] }}

  Name: eng_tags
  Value: {{ ($json["English Tags"] || "").replace(/^=/,"").split(",").map(t => t.trim()).filter(Boolean) }}
```

##### add Edge function - grab-post-hut(JWT disable)
``` bash
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-n8n-api-key",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const n8nApiKey = Deno.env.get("N8N_API_KEY_ROBERT_HUT");
  const providedApiKey = req.headers.get("x-n8n-api-key");
  if (!n8nApiKey || providedApiKey !== n8nApiKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await supabase
    .from("roberthut_posts")
    .select("slug, title, content, excerpt, tags, translate")
    .eq("translate", "yes")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle(); // 查不到時 data = null, error = null [web:64]

  // 真正查詢錯誤（SQL / 權限等）才回 500
  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // 沒有任何 translate = "yes" 的資料 → 不當成錯誤，status 200
  if (!data) {
    return new Response(
      JSON.stringify({
        success: false,
        reason: "no_post_to_translate",
        post: null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // 有找到一筆
  return new Response(
    JSON.stringify({
      success: true,
      post: data,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
```

##### n8n HTTP request grap
``` bash
Method: POST
URL: https://poiywggogkjurvfudoyk.supabase.co/functions/v1/grab-post-hut
Authentication:  Generic Credential Type
Generic Auth Type: Custom Auth
Custom Auth: Custom Auth (supabase hut update)
  {
    "headers": {
      "x-n8n-api-key": "n8n_sk_...",
      "content-type": "application/json"
    }
  }
Send Body: Enable
Body Content Type: JSON
Specify Body: Using Fields Below
```

### [Life Organizer]() (Lovable) - [Prompt link](https://www.perplexity.ai/search/i-want-to-use-lovable-to-make-gzbUCvoBSGKlvpiELC_VpQ#72)

#### vercel variable
``` bash
# 只有在 Vercel Preview（或非正式）才允許 fallback；Production 一律禁用 fallback
在 Vercel：
Preview environment vars：VITE_APP_ENV=staging
Production environment vars：VITE_APP_ENV=production
```

#### Prompt to Perplexity 
``` text
I want to use Lovable to make an app with the following functions,
  1. todolist: But you can build two floors such as travel plan 2016 - decide on the location,
     - book a room ... And can display the Completion Percentage, 
  2. 事件紀錄簿: 甚麼時間發生麼事, 可加 tag, 
  3. 資訊記事: 如我的五年計畫 , 
要support 多用戶, 所以要有使用者管理系統,我回提供logo 請加入,logo 的 link 為 https://www.roberthut.com/ , 
要做雙語介面(中英文), database 使用 supabase, 請幫我產生 prompt (中文)
```

#### prompt for Lovable
##### Prompt + Phase 0
``` text
【本次範圍鎖定 / 一次只做一件事】
- 本次只允許完成：Phase 0（骨架與環境）
- 禁止偷跑：不要建立資料表、不要寫 RLS、不要做 Edge Functions、不要做 CRUD
- 禁止大改：除非為了完成本 Phase 驗收點，否則不要重構、不換套件、不改路由結構
- 最小變更：只修改完成本 Phase 必要的檔案
- 若資訊不足：先用問題清單向我確認（最多 5 題），不要自行假設

【交付格式】
1) 本 Phase 做了哪些變更（檔案清單）
2) 本 Phase 驗收報告：逐項 ✅/❌ + 可重現步驟 + 證據描述 + Fail 修正計畫
3) 等我確認後再進下一個 Phase

你是一位資深全端工程師＋產品設計師，請用 Lovable 生成可部署的 Web App（RWD），並整合 Supabase 作為資料庫與 Auth。請嚴格依照以下規格實作，先做 MVP，但架構要可擴充。

# 0) 多產品（同網域）總覽
同一個 Supabase（同一個 Postgres）服務多個 app，app_id 清單固定：
- life_organizer
- tarot_cards
- the_journal
- roberthut

資料隔離策略：
- 共用表放 public schema：profiles、apps、feedback（以及必要的 helper functions）
- 各 app 自己的業務表放在「schema-per-app」，且 schema 名稱必須與 app_id 完全一致（life_organizer / tarot_cards / the_journal / roberthut）

# 1) Supabase 專案與環境（dev/prod）
目前只有 dev 專案：
- Supabase DEV URL：https://rcscpveyxtlhxxgpgxit.supabase.co
- PROD 專案日後再提供（請設計成可輕易切換）

要求：
- 所有 DB 結構變更必須以 migrations 管理（supabase/migrations/*.sql），可重放到另一個 Supabase project。
- 產出 .env.example（只放變數名稱，不放真實 key）
- service role key 只允許存在 Edge Function secrets，前端永遠不接觸

# 2) i18n（中英雙語）與路由
- 支援語系：en（預設、URL 不加 prefix）、zh-TW（URL prefix 為 /zh-tw）
- 初次進站語系依瀏覽器語言偵測；但若使用者手動切換過，需以 preferredLocale（cookie/localStorage）為準並持久化。
- 翻譯 key 命名規範固定：module.section.key
- 除使用者輸入內容外，所有 UI 文案一律不得寫死，必須走 i18n keys。

# 3) Logo/品牌
- Top bar 左側顯示 Logo 圖片（外部 URL）：
  https://www.roberthut.com/Robert_hut_512_nb.png
- 點擊 Logo 新分頁開啟：https://www.roberthut.com/

# 4) Life Organizer：公開頁與受保護頁
- 公開頁：/ 與 /zh-tw/
- Auth：/auth/login、/auth/register、/auth/upgrade、/auth/callback（含 zh-tw 版本）
- App：/app/dashboard、/app/plans、/app/events、/app/notes（含 zh-tw 版本）
- Admin：/admin/feedback（含 zh-tw 版本，僅 role=admin）

# Phase 0（只做骨架）
請你現在只完成 Phase 0：
- 建好路由骨架與 layout（Top bar + language switch + user menu）
- 建好 i18n 檔案架構（zh-TW/en），所有 UI 文案走 i18n keys
- 建好 Supabase client 封裝與 .env.example（不放真 key）
- 最後輸出「Phase 0 驗收報告」（逐項 Pass/Fail + 重現步驟）
```

###### add supabase connect
``` bash
Supabase
  --> All projects
  --> select project(Life Organizer Hub) 
  --> Settings
  --> connectors
  --> supabase
  --> project
  --> connect a project
  --> Robert
  --> apps_develop
```

###### found some error 
``` bash
按 Try to fix, 看後續
```

##### Phase 1
``` txt
【本次範圍鎖定 / 一次只做一件事】
- 本次只允許完成：Phase 1（DB schema + RLS + migrations）
- 禁止偷跑：不要做 Auth UI、不要做 CRUD UI、不要做 Edge Functions（seed/feedback）
- 最小變更：只新增/修改 supabase/migrations 與 DB 相關程式（若必要）
- 若資訊不足：先問我（最多 5 題），不要自行假設

【交付格式】
1) migrations 清單（檔名 + 內容重點）
2) RLS/policies 檢查方式（SQL）
3) Phase 1 驗收報告（逐項 ✅/❌）

Phase 1：Supabase schema + RLS + migrations（先做 DB）
請你現在完成 Phase 1：

目標：
- 建立 public schema 的共用表：profiles、apps、feedback + helper functions
- 建立 life_organizer schema 的業務表：plans、tasks、events、tags、event_tags、notes
- 所有 table 都必須開 RLS，並提供完整 policies
- 一般使用者只能存取自己的資料（auth.uid() = user_id）
- admin（profiles.role='admin'）可看全部 feedback 並可更新工單狀態欄位
- migrations 必須放在 supabase/migrations/*.sql，可重放

同時建立 apps 表並塞入 4 筆 app_id（life_organizer, tarot_cards, the_journal, roberthut）。

最後輸出「Phase 1 驗收報告」（含：兩個帳號互相看不到資料、admin 可看全部 feedback 的測試步驟）。
```

###### migrations file generate
``` bash
# 20260105_phase1_schema_rls.sql
建立 app_role enum、user_roles、profiles、apps、feedback (public)；建立 life_organizer schema 及其 6 張表 (plans, tasks, events, tags, event_tags, notes)；所有 RLS 啟用 + policies；auto-profile trigger

# 建立 migration file
Supabase Dashboard 的 Database → Migrations 頁面查看已執行的 migration 歷史。
若需要匯出 SQL 到本地版控，可從 Dashboard 下載或使用 supabase db dump CLI 指令。
```

###### RLS/Policies 檢查 SQL
``` bash
# check 1
-- 查看所有 policies
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies 
WHERE schemaname IN ('public', 'life_organizer')
ORDER BY schemaname, tablename;

-- 驗證 has_role function
SELECT proname, prosecdef FROM pg_proc WHERE proname = 'has_role';

--> result
| proname  | prosecdef |
| -------- | --------- |
| has_role | true      |

# check 2
SELECT schemaname, tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE schemaname IN ('public','life_organizer')
ORDER BY schemaname, tablename, policyname;

--> result
| schemaname     | tablename  | policyname                                     | cmd    | qual                                                                                                                     | with_check                                                                                                               |
| -------------- | ---------- | ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| life_organizer | event_tags | Users can CRUD event_tags for their own events | ALL    | (EXISTS ( SELECT 1
   FROM life_organizer.events e
  WHERE ((e.id = event_tags.event_id) AND (e.user_id = auth.uid())))) | (EXISTS ( SELECT 1
   FROM life_organizer.events e
  WHERE ((e.id = event_tags.event_id) AND (e.user_id = auth.uid())))) |
| life_organizer | events     | Users can CRUD their own events                | ALL    | (auth.uid() = user_id)                                                                                                   | (auth.uid() = user_id)                                                                                                   |
| life_organizer | notes      | Users can CRUD their own notes                 | ALL    | (auth.uid() = user_id)                                                                                                   | (auth.uid() = user_id)                                                                                                   |
| life_organizer | plans      | Users can CRUD their own plans                 | ALL    | (auth.uid() = user_id)                                                                                                   | (auth.uid() = user_id)                                                                                                   |
| life_organizer | tags       | Users can CRUD their own tags                  | ALL    | (auth.uid() = user_id)                                                                                                   | (auth.uid() = user_id)                                                                                                   |
| life_organizer | tasks      | Users can CRUD their own tasks                 | ALL    | (auth.uid() = user_id)                                                                                                   | (auth.uid() = user_id)                                                                                                   |
| public         | apps       | Admins can manage apps                         | ALL    | has_role(auth.uid(), 'admin'::app_role)                                                                                  | has_role(auth.uid(), 'admin'::app_role)                                                                                  |
| public         | apps       | Apps are publicly readable                     | SELECT | true                                                                                                                     | null                                                                                                                     |
| public         | feedback   | Admins can update all feedback                 | UPDATE | has_role(auth.uid(), 'admin'::app_role)                                                                                  | null                                                                                                                     |
| public         | feedback   | Admins can view all feedback                   | SELECT | has_role(auth.uid(), 'admin'::app_role)                                                                                  | null                                                                                                                     |
| public         | feedback   | Users can create feedback                      | INSERT | null                                                                                                                     | (auth.uid() = user_id)                                                                                                   |
| public         | feedback   | Users can update their own feedback            | UPDATE | (auth.uid() = user_id)                                                                                                   | (auth.uid() = user_id)                                                                                                   |
| public         | feedback   | Users can view their own feedback              | SELECT | (auth.uid() = user_id)                                                                                                   | null                                                                                                                     |
| public         | profiles   | Users can insert their own profile             | INSERT | null                                                                                                                     | (auth.uid() = id)                                                                                                        |
| public         | profiles   | Users can update their own profile             | UPDATE | (auth.uid() = id)                                                                                                        | (auth.uid() = id)                                                                                                        |
| public         | profiles   | Users can view their own profile               | SELECT | (auth.uid() = id)                                                                                                        | null                                                                                                                     |
| public         | user_roles | Admins can manage roles                        | ALL    | has_role(auth.uid(), 'admin'::app_role)                                                                                  | has_role(auth.uid(), 'admin'::app_role)                                                                                  |
| public         | user_roles | Admins can view all roles                      | SELECT | has_role(auth.uid(), 'admin'::app_role)                                                                                  | null                                                                                                                     |
| public         | user_roles | Users can view their own roles                 | SELECT | (auth.uid() = user_id)                                                                                                   | null                                                                                                                     |
```

###### 驗收項目 紀錄
``` bash
# has_role() security definer ✅ 防止 RLS 遞迴
SELECT p.proname, p.prosecdef, p.proconfig
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE p.proname = 'has_role';

--> result
| proname  | prosecdef | proconfig              |
| -------- | --------- | ---------------------- |
| has_role | true      | ["search_path=public"] |

# Linter 無警告✅ No linter issues found
# 查 package.json 是否含 "lint"
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  },
# GitHub repo → Actions → New workflow → "set up a workflow yourself"
# 建立檔案：.github/workflows/lint.yml
name: Lint

on:
  push:
  pull_request:

jobs:
  eslint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
# ----end
# 前往 GitHub repo → Actions tab
# 可看到  Lint workflow run
```

###### add admin
``` bash
# get user's UID
Autentication
  --> User

# add admin
Table Editor
  --> user_roles: user_id + role(admin)
```

##### Phase 2
``` txt
【本次範圍鎖定 / 一次只做一件事】
- 本次只允許完成：Phase 2（Auth：email/password + 匿名 + 升級）
- 禁止偷跑：不要做 seed、不要做 CRUD、不要做 feedback/admin 工單
- 最小變更：只動 auth flow 相關頁面/元件/設定
- 若資訊不足：先問我（最多 5 題），不要自行假設

【交付格式】
1) 變更檔案清單
2) Phase 2 驗收報告（逐項 ✅/❌ + 重現步驟）

Phase 2：Auth（只要 email/password + 匿名登入 + 匿名升級）
請你完成：

- Email/Password 登入/註冊流程
- 支援匿名登入（signInAnonymously）
  - 只能在沒有 session 時呼叫，避免每次刷新都建立新匿名 user
  - 匿名也算有 session，可進入 /app
- 升級流程（選 B）：
  - 匿名 user 點「升級帳號」
  - 先 updateUser({ email }) 觸發 email 驗證
  - 驗證完成後再 updateUser({ password }) 完成升級
  - 升級後 user.id 不變，資料保留
- /admin/** 匿名不可進，只允許 role=admin

最後輸出「Phase 2 驗收報告」（含：匿名→升級後資料仍在的測試步驟）。
```
###### supabase enable 匿名登入
``` bash
Authentication 
  --> Sign In/Providers
  --> Anonymous Sign-ins : Enabled
```

##### Phase 3
``` txt
【本次範圍鎖定 / 一次只做一件事】
- 本次只允許完成：Phase 3（seed-user-demo-data Edge Function + idempotent）
- 禁止偷跑：不要做 CRUD 完整功能、不要做 feedback/admin
- 最小變更：只動 profiles 欄位/migration、seed function、與呼叫 seed 的最小前端鉤子
- 若資訊不足：先問我（最多 5 題），不要自行假設

【交付格式】
1) migrations + Edge Function 檔案清單
2) Phase 3 驗收報告

Phase 3：Onboarding Seed（選 A：Edge Function）
請你完成：

- profiles 新增 onboarded_at
- 建立 Edge Function：seed-user-demo-data
  - 驗 JWT，取得 user.id
  - onboarded_at is null 才 seed，否則回 alreadySeeded=true（必須 idempotent）
  - request body: { locale: "en" | "zh-TW" }
  - 範例資料依 locale 建立（英文/中文各一套文案）
- 前端：登入/匿名登入成功後，如未 onboarded，自動呼叫 seed

最後輸出「Phase 3 驗收報告」（含：不會重複 seed、不同語系 seed 的測試步驟）。
```

###### response Lovabel 問題
``` bash
# Lovable ask 
在開始之前，我有幾個問題需要確認：
Seed 的範例資料類型：seed 要建立哪些表的資料？目前看到有 notes 和 feedback 表，請問 seed 只建立 notes 嗎？還是兩者都要？
範例資料數量：每個語系要 seed 幾筆資料？（例如：2-3 筆 notes？）
前端呼叫時機：登入成功後在哪裡觸發 seed？
A：在 useAuth hook 內，auth 狀態變更時自動呼叫
B：在 Dashboard 頁面載入時檢查並呼叫
C：其他（請說明）

語系判斷來源：seed 的 locale 參數來源？
A：從 profiles.preferred_locale 讀取
B：從前端 i18n 當前語系讀取
C：其他

Edge Function 回傳格式：成功時回傳什麼？
A：{ success: true, seeded: true/false }
B：{ success: true, data: [...seeded items...] }
C：其他

# response
Phase 3 回覆確認（請依此實作，不要自行延伸）

1) Seed 的範例資料類型
- 只 seed life_organizer 相關資料：notes + events + plans + tasks（最小可用的 demo）
- 不 seed public.feedback（feedback 是真實回饋資料，不要混入 demo）

2) 範例資料數量（每個 locale）
- notes：2 筆（1 筆 pinned=true，1 筆 pinned=false）
- events：3 筆（occurred_at 分佈在最近 7 天內，倒序能看出時間線）
- plans：1 個 plan + 3 個 tasks（包含 done=true/false 混合，能看出完成率）
- tags：3 個（供 events 打 tag；event_tags 建立至少 2 個關聯）

3) 前端呼叫時機
- 選 A：在 useAuth hook 內，auth 狀態變更且 user 存在時自動呼叫
- 但要加防呆：只有「profiles.onboarded_at is null」才呼叫；避免每次 reload 重複打 function

4) 語系判斷來源
- 選 B：從前端 i18n 當前語系讀取，傳給 function（locale: "en" | "zh-TW"）
- profiles.preferred_locale 之後再做（目前不阻塞 Phase 3）

5) Edge Function 回傳格式
- 選 A：{ success: true, seeded: true/false }
- 額外加上：{ success: true, seeded: true/false, reason?: 'ALREADY_ONBOARDED' | 'SEEDED_NOW' }

6) Idempotent 規則（必做）
- profiles.onboarded_at 為 null 才 seed；seed 成功後立刻把 onboarded_at 設為 now()
- 若已 onboarded，直接回 seeded:false + reason:'ALREADY_ONBOARDED'
- 任何情況都不可重複建立第二套 demo 資料

7) 安全規則
- function 必須驗證 Supabase JWT，取得 user.id
- 寫入 demo 資料時 user_id 一律使用該 user.id
- service role key 只能存在於 Edge Function secrets，前端不可出現

8) 驗收報告（請你最後輸出）
- 新匿名 user 第一次進入 app：會自動出現 demo 資料
- reload 10 次：demo 資料不會翻倍（確認數量固定）
- 切換到 zh-TW 再用新 user：demo 文案為中文

# ask again 2nd
我需要先確認一個關鍵問題：

目前資料庫只有 notes 表存在，以下表格尚未建立：

events
plans
tasks
tags
event_tags
請確認 Phase 3 範圍：

A：Phase 3 同時建立這些缺失的表（migration）+ Edge Function + 前端鉤子
B：Phase 3 只 seed 現有的 notes 表，其他表留到後續 Phase 再處理
C：其他安排（請說明）

# response 2nd
我選 B。

Phase 3 範圍鎖定：
- Phase 3 只做：
  1) seed-user-demo-data Edge Function（idempotent）
  2) 只 seed life_organizer.notes（因為目前只有 notes 表存在）
  3) 前端在 auth 狀態確立後（useAuth）且 profiles.onboarded_at is null 才呼叫 seed
- Phase 3 不做：
  - 不建立 events/plans/tasks/tags/event_tags（這些留到後續 DB phase）
  - 不 seed feedback（feedback 不要 demo 資料）

Seed 數量/語系：
- notes：每個 locale 2 筆（1 pinned=true、1 pinned=false），內容依 en / zh-TW 生成

Edge Function 回傳：
- { success: true, seeded: true/false, reason: 'SEEDED_NOW' | 'ALREADY_ONBOARDED' }

驗收：
- 新 user 第一次進入 /app/notes 會看到 demo notes
- reload 不會重複新增（數量不翻倍）
- 切換 zh-TW 建新 user 時 demo 文案為中文

# ask 3
我發現 notes 表目前沒有 pinned 欄位。請確認：

Phase 3 是否要新增 notes.pinned 欄位？

A：是，Phase 3 一併新增 notes.pinned 欄位（boolean, default false）
B：否，Phase 3 不加 pinned，seed 時只建立 2 筆普通 notes（pinned 留到後續）
（另：profiles.onboarded_at 欄位會在 Phase 3 migration 一併新增）

# response 3
我選 B。

Phase 3 範圍確認：
- Phase 3 migration：只新增 profiles.onboarded_at（timestamp/timestamptz，預設 null）
- Phase 3 seed：只針對 life_organizer.notes 建立 2 筆 demo notes（不含 pinned 欄位，因為目前 schema 沒有 pinned）
- pinned 功能與 notes schema 擴充（notes.pinned boolean default false）留到後續 Notes 功能 Phase 再做

請你依此實作：Edge Function idempotent（以 profiles.onboarded_at 判斷），前端在 auth 狀態確立後且 onboarded_at is null 才呼叫。
回傳：{ success:true, seeded:true/false, reason:'SEEDED_NOW'|'ALREADY_ONBOARDED' }。
最後輸出 Phase 3 驗收報告（新 user 有 demo notes、reload 不翻倍）。
``` 

##### Phase 4
``` txt
【本次範圍鎖定 / 一次只做一件事】
- 本次只允許完成：Phase 4（life_organizer 三模組 CRUD）
- 禁止偷跑：不要做 feedback/admin 工單、不要加新 app（tarot 等）
- 最小變更：以既有 schema/RLS 為前提做前端功能
- 若資訊不足：先問我（最多 5 題），不要自行假設

【交付格式】
1) 變更檔案清單
2) Phase 4 驗收報告

Phase 4：Life Organizer 三大模組 CRUD
請你完成：

A) To-do（Plan → Task 固定兩層）
- Plan 列表顯示完成百分比 + 進度條
- Plan 詳細頁：Task CRUD、勾選 done、排序（position）

B) 事件紀錄簿
- 時間線（occurred_at 倒序）
- Tag CRUD、多選、tag 篩選、搜尋

C) 資訊記事
- Note CRUD、搜尋（title/content）、pinned、排序 updated_at

最後輸出「Phase 4 驗收報告」（含：兩個不同使用者互相看不到資料、完成率正確的測試步驟）。
```

###### response Lovabel 問題
``` bash
Phase 1 的 life_organizer schema 表（plans, tasks, events, tags, event_tags）似乎尚未建立。是否要我現在先建立這些表和 RLS 政策？
是，請先建立 schema

Notes 模組應該使用現有的 public.notes 表，還是需要新建一個 life_organizer 版本的 notes 表？
新建獨立的 notes 表

Tasks 的 position 欄位排序方式偏好？
建立時間排序
``` 

###### 因 app table 由 public 移到 life_organizer 手動修改 supabase
``` bash
Project Settings 
  --> Data API
  --> Exposed schemas 欄位加入 life_organizer
```


##### Phase 5
``` txt
【本次範圍鎖定 / 一次只做一件事】
- 本次只允許完成：Phase 5（feedback Edge Function + Upstash 限流 + Admin）
- 禁止偷跑：不要重做 life organizer 的 CRUD、不要大改 i18n/router
- 最小變更：只動 feedback 相關 DB/Edge Function/Admin UI/前端 feedback 表單
- 若資訊不足：先問我（最多 5 題），不要自行假設

【交付格式】
1) Edge Function + env/secrets 需求清單
2) Phase 5 驗收報告（含 429 測試）

Phase 5：Feedback（多 app 共用）
請你完成：

資料表：public.feedback（含工單欄位）
- status open/closed（default open）
- handled_by（admin user_id）、handled_at、admin_note

寫入：一律走 Edge Function submit-feedback
- 匿名/登入皆可送出
- 必填 app_id 且必須在白名單（4 個 app）
- 寫入 page_url、user_agent
- Upstash Redis rate limit：
  - 匿名：依 IP 每 60 秒最多 3 次
  - 登入：依 user_id 每 60 秒最多 3 次
- 超過限制回 429 + payload：
  { ok:false, error:{code:'RATE_LIMITED'}, retry_after_seconds:60 }

前端 429 UX：
- cooldown 60 秒；表單仍可編輯，但 Submit disabled
- 顯示倒數 + 小字（i18n keys：feedback.rateLimitHint / feedback.cooldownHint / feedback.ctaCooldown）
- cooldown 持久化（localStorage feedbackCooldownUntil）

Admin 後台：
- /admin/feedback：可依 app_id/status 篩選、搜尋、排序
- 可把 status 改 closed 並填 handled_by/handled_at/admin_note

最後輸出「Phase 5 驗收報告」（含：第 4 次送出 429、倒數與 disable 正常、admin 可關單的測試步驟）。
```

###### Lovable ask

``` bash
# ask 
要求 UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN

# 更改為不用 UPSTASH REDIS
我不使用 Upstash Redis secrets 改用以下方案 【需求：不使用外部 API】

前端 cooldown（只針對 feedback submit）
使用者按「送出回饋」成功或失敗後，Submit 按鈕 disabled 30 秒
顯示倒數（30→0），倒數期間表單仍可編輯
cooldown 必須持久化：使用 localStorage 記錄 feedbackCooldownUntil（timestamp），刷新頁面倒數不中斷
cooldown 期間若使用者硬按（或透過快捷鍵觸發），仍不應送出 request
基本長度限制（前後端都要）
message 必填，trim 後長度 10~1000（超過或不足都顯示錯誤）
title（若有）長度 0~120
page_url（若有）長度 <= 500
user_agent（若有）長度 <= 500 前端：即時或 submit 時提示錯誤（i18n keys） 後端 Edge Function：再次驗證，若不符合回 400 + { error: { code:'VALIDATION_ERROR', message:'...' } }
驗收
連續按送出：第一次送出後開始 30 秒倒數，30 秒內不會再次發 request
刷新頁面：倒數仍在
message 太短/太長：前端會擋，後端也會回 400
notes/plans/events 的操作不受影響
```


##### Phase 6
``` txt
【本次範圍鎖定 / 一次只做一件事】
- 本次只允許完成：Phase 6（總驗收 + 修到全 Pass）
- 禁止偷跑：不要再新增功能，只允許修 bug、補缺漏、補 states、補 i18n
- 最小變更：以最少改動讓驗收全 Pass
- 若資訊不足：先問我（最多 5 題），不要自行假設

【交付格式】
1) 回歸測試清單
2) 最終驗收報告（逐項 ✅/❌ + 待辦）

Phase 6：總驗收（品質門檻）
請你做最後總驗收並修到全 Pass：

- 抽查主要頁面：無硬編碼 UI 文案（除使用者輸入內容）
- Loading / empty / error state 齊全
- 安全：前端無 service role key；feedback/seed 走 Edge Functions
- 回歸測試：重跑 Phase 2~5 的關鍵情境
- 輸出最終驗收報告（逐項 Pass/Fail + 待辦清單）
```

##### 後面修正
``` text
【目標】
修復/補齊匿名登入的新用戶體驗：第一次進入 app 時，Notes/Plans/Events 各自都有 1 筆 demo 資料，且 reload 不會重複新增。

【重要事實（請遵守）】
- Notes 的表名固定是 life_organizer.lo_notes（這是目前專案既有狀態），不要 rename、不新增 life_organizer.notes、不做資料搬遷。
- plans/events 表已存在：life_organizer.plans、life_organizer.events。

【本次範圍鎖定（不要偷跑）】
- 只做：1) 統一表名引用（用常數） 2) seed demo 資料（lo_notes + plans + events）
- 不做：Phase 4 CRUD UI、Upstash、DB schema 變更、auth/router 大重構

----------------------------------------------------------------
A) 新增「表名常數」檔（必做）
1) 新增檔案：src/lib/dbTables.ts
內容至少包含：
export const DB_SCHEMA_LIFE = 'life_organizer'
export const TABLE_LO_NOTES = 'lo_notes'
export const TABLE_PLANS = 'plans'
export const TABLE_EVENTS = 'events'

2) 全專案檢查並修正所有 Notes/Plans/Events 的 DB 存取（包含 seed function）：
必須統一改成：
supabase.schema(DB_SCHEMA_LIFE).from(TABLE_LO_NOTES)
supabase.schema(DB_SCHEMA_LIFE).from(TABLE_PLANS)
supabase.schema(DB_SCHEMA_LIFE).from(TABLE_EVENTS)

禁止在任何檔案硬編碼 'life_organizer.lo_notes' / 'lo_notes' / 'plans' / 'events' 字串。

（說明：Supabase JS 支援 per-query schema：.schema('life_organizer')） 

----------------------------------------------------------------
B) 更新 seed-user-demo-data（或你目前用的 onboarding seed Edge Function）
需求：
1) idempotent（只跑一次）
- 判斷條件：profiles.onboarded_at is null 才允許 seed
- seeded 成功後：把 profiles.onboarded_at 設為 now()
- reload / 重進不可重複新增

2) 寫入 demo（都必須帶 user_id = auth.uid()）
- life_organizer.lo_notes：插入 1 筆 demo note（title/content 依 locale）
- life_organizer.plans：插入 1 筆 demo plan（title 依 locale）
- life_organizer.events：插入 1 筆 demo event（title/description 依 locale；日期設為最近 1~3 天）

3) locale
- 由前端 i18n 當前語系傳入（至少支援 en / zh-TW），demo 文案需依語系切換。

4) 回傳格式（前端用來 debug/驗收）
{ success:true, seeded:true/false, reason:'SEEDED_NOW'|'ALREADY_ONBOARDED' }

----------------------------------------------------------------
C) 驗收（必須附上）
1) 新匿名 user 第一次進入 app：
- /app/notes 有 1 筆 demo
- /app/plans 有 1 筆 demo
- /app/events 有 1 筆 demo

2) 同一個 user reload：
- 三個模組的 demo 不會翻倍

3) 交付報告需列出：
- 新增的 src/lib/dbTables.ts
- 你修改過哪些檔案把硬編碼表名改成 constants（檔案清單）
- seed function response 範例（seeded true/false 各一）
```

##### Addition
###### 把功能在 staging（預備/類正式環境） 跑到完全 OK
``` bash
確認流程從頭到尾都能走通、資料也寫得進去、權限也沒問題，才把同一套變更部署到 production。

## 什麼叫「走通」在這個 case
以現在的 seed/onboarding 需求來說，「staging 打通」通常包含這幾件事都過關：
- 前端用 staging 的 `SUPABASE_URL/ANON_KEY` 連到 staging project，能正常登入/匿名登入。[^1]
- 第一次進入：seed function 會成功寫入 `life_organizer.lo_notes / plans / events` 各 1 筆 demo，且回傳 `seeded: true`。
- 重新整理/重進：seed 不會重複插入（回傳 `seeded: false` 或 `reason: ALREADY_ONBOARDED`），資料不翻倍。
```

###### 建立 staging + prod 兩套環境
``` bash
我要在同一個 repo 建立 staging + prod 兩套環境。
現況：前端是 Vite，Repo 主分支是 main，準備部署到 Vercel；後端是 Supabase。

【目標】
- Vercel Preview deployments 連到 Supabase staging project
- Vercel Production deployments（main 分支）連到 Supabase prod project
- 既有 seed/onboarding（notes/plans/events demo 只新增一次）在 staging 先驗收通過，再上 prod

----------------------------------------------------------------
A) Supabase 環境拆分
1) 建立兩個 Supabase projects：staging 與 prod（資料與 key 完全隔離）。
2) 請列出我需要在 staging project 套用哪些東西，才能與 prod 一致：
- schema/tables（包含 life_organizer schema 與 lo_notes/plans/events）
- RLS policies
- Edge Functions（例如 seed-user-demo-data）
- Edge Functions / DB 需要的 env vars（列出變數名）

交付：用「待辦清單」方式列出 staging 要補的設定項目。

----------------------------------------------------------------
B) 前端（Vercel）環境變數與部署
1) 程式碼必須只透過 import.meta.env 讀取：
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
不得硬編碼 URL/key。

2) 請提供 Vercel Dashboard 設定指引：
- Environment Variables：同名變數各設定兩套值
  - Preview：填 staging 的 URL/ANON_KEY
  - Production：填 prod 的 URL/ANON_KEY
- 確認 production branch 是 main（main 的部署就是 Production）。

3) 若 Vercel 未自動識別 Vite，請註明 build/output：
- Build command: npm run build
- Output directory: dist

----------------------------------------------------------------
C) DB/Function 部署方式（可重複）
1) DB：所有 DB 變更必須放 supabase/migrations（不要直接在 prod console 手改）。
2) Functions：說明如何把 seed function 部署到 staging / prod（要能明確區分部署到哪個 project）。

----------------------------------------------------------------
D) 測試/驗收（你要寫成 step-by-step）
1) Staging 驗收：
- 建一個非 main 分支 push，上 Vercel 取得 Preview URL（它應吃 Preview env vars → 連 staging）
- 用全新匿名 user 進站
- 驗證 seed：notes/plans/events 各 1 筆 demo；reload 不翻倍（seeded true/false 各有預期）

2) Prod 冒煙測試：
- merge 到 main 產生 Production deploy（吃 Production env vars → 連 prod）
- 用全新帳號走一次 onboarding，確認 seed 行為正常（只做最小驗證）

交付物：
- 你改了哪些檔案（清單）
- Vercel env vars 需要新增哪些 key（清單）
- 一份我照做就能完成 staging→prod 的部署與測試流程（含預期結果）
```

###### do some Lovable response
``` bash
# Lovable ask 
Lovable 平台不支援 import.meta.env.VITE_*，需改回 hardcode。Vercel 部署時再用 env vars。

# response
請不要 hardcode Supabase URL/ANON_KEY。

本專案是 Vite，必須使用 import.meta.env 讀取 VITE_* 變數（這是 Vite 的標準行為）。
請確認目前 supabase client 初始化改成：

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

並在缺少變數時 throw 明確錯誤（例如：Missing VITE_SUPABASE_URL），方便在 Lovable/本機/CI 立刻發現。

另外：repo 內只保留 .env.example（不放真值），實際值將在 Vercel 的 Preview/Production env vars 設定。
若 Lovable 預覽環境無法注入 env vars，請提供一個可選的 fallback 機制：
- 支援從 window.__APP_CONFIG__ 讀取（由 index.html 注入），或
- 提供一份 README 說明如何在 Lovable 預覽模式測試（可先用公開的 staging key）
但仍禁止把 key hardcode 進程式碼或 commit。

# Lovable ask 2nd
部署時：
  Vercel：設定 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 在 env vars，會優先讀取
  Lovable 預覽：透過 index.html 的 __APP_CONFIG__ 運作

# response 2nd
請在 src/integrations/supabase/client.ts 補保護：

1) 嚴格優先順序：
- 先讀 import.meta.env.VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
- 若缺少才 fallback 到 window.__APP_CONFIG__
- 若兩邊都缺，throw Error 並提示要去哪裡設定（Vercel env vars / Lovable index.html）

2) 禁止在 Production deployment 使用 __APP_CONFIG__：
- 若偵測到是 production（例如透過 Vercel 的 VITE_VERCEL_TARGET_ENV=production 或至少 import.meta.env.MODE === 'production'）
  則不允許 fallback，缺 env 就直接 throw，避免 prod 誤連 staging。

3) 請確認 index.html 的 __APP_CONFIG__ 只放 anon key，不得放任何 server-side secrets。
```

##### Migration to supabase
###### Vercel set Environment Variables
``` bash
select project
  --> Settings 
  --> Environment Variables
  add Preview variable 
      VITE_APP_ENV: staging
      VITE_SUPABASE_URL: 
      VITE_SUPABASE_ANON_KEY: 
  add Product variable 
      VITE_APP_ENV: production
      VITE_SUPABASE_URL: 
      VITE_SUPABASE_ANON_KEY: 
```

###### migration to new supabase project(product)
``` bash
# enter supabase cli
supabase login

# see project in supabase
supabase projects list

# 先 link to 專案 (maybe production)（用文件裡的 ref）
supabase link --project-ref cjjhrkrepiidbpywecgz

# 推 migrations / schema / RLS / triggers 到 prod DB
supabase db push

# 部署所有 Edge Functions 到 prod
supabase functions deploy

# supabase enable 匿名登入
Authentication
 --> Sign In/Providers
 --> Anonymous Sign-ins : Enabled

# add life_organizer to Exposed schemas
Project Settings 
  --> Data API 
  --> Data API Settings
  --> Exposed schemas 欄位加入 life_organizer

# add Redirect URLs - for email verify
Authentication
  --> URL Configuration
  --> Site URL
  --> https://life-organizer-hub.vercel.app/
  --> Redirect URLs
  --> Add URL : https://life-organizer-hub.vercel.app/**

# email link 失敗
# 這是因為 Vercel 需要設定 SPA 路由重寫規則，讓所有路由都導向 index.html。需建立 vercel.json 設定檔。 
# /vercel.json
{
  "rewrites": [
    {
      "source": "/((?!api|_next|static|favicon.ico|robots.txt|placeholder.svg).*)",
      "destination": "/index.html"
    }
  ]
}

# add admin user
Table Editor
  --> user_roles
  --> insert
  --> inser row
  --> user_id: copy user id
  --> role: admin 
  --> save
```

###### windows supabase cli
``` bash
# install
npx supabase
  Need to install the following packages:
  supabase@2.72.1
  Ok to proceed? (y) y

# check version
npx supabase --version
  2.72.1

# login 
npx supabase login
  Hello from Supabase! Press Enter to open browser and login automatically.

# see project in supabase
npx supabase projects list

# link to poject
npx supabase link --project-ref rcscpveyxtlhxxgpgxit
  Finished supabase link.

# 推 migrations / schema / RLS / triggers 到  DB
# 這是 錯誤 example (Lovable 產生不知道為什麼有時間差)
npx supabase db push
  Initialising login role...
  Connecting to remote database...
  Remote migration versions not found in local migrations directory.

  Make sure your local git repo is up-to-date. If the error persists, try repairing the migration history table:
  supabase migration repair --status reverted 20260105080906 20260106025604 20260106064903 20260106065950 20260106073140 20260106081207 20260106081605 20260106082207 20260107014645 20260107015830 20260107035153 20260107040715 20260109040318 20260109041642 20260109042200

  And update local migrations to match remote database:
  supabase db pull

# check migration 差異
# migration 應增加而不是修改
npx supabase migration list
  Initialising login role...
  Connecting to remote database...

    Local           | Remote         | Time (UTC)
    ----------------|----------------|---------------------
                    | 20260105080906 | 2026-01-05 08:09:06
     20260105080908 |                | 2026-01-05 08:09:08
```

###### Supabase project 備份,複製 - [link](https://www.perplexity.ai/search/wo-ruo-jiang-ige-supabase-proj-FQ7bZqGCTp61tF4GIK1Ovw#6)
``` bash
```

### app map to supabase
``` bash
robert-hut 
	https://cybibirheihmwdtsmgit.supabase.co( blog_robert_hut)
	https://cybibirheihmwdtsmgit.supabase.co( blog_robert_hut)
tarot-cards
	https://ukloaaccuetocrkxsdlv.supabase.co(blog_post)
	https://poiywggogkjurvfudoyk.supabase.co(test_db)
blog-canvas
	https://ukloaaccuetocrkxsdlv.supabase.co(blog_post)
	https://poiywggogkjurvfudoyk.supabase.co(test_db)
tools-collection
  https://uimqqfnctcexyyqmbnrr.supabase.co(in bolt.new)
  
life-organizer
  https://cjjhrkrepiidbpywecgz.supabase.co(apps_product)
  https://rcscpveyxtlhxxgpgxit.supabase.co(apps_develop)
```

### Ref
+ [Hostinger VPS](https://www.hostinger.com/)- cpupon "DIEGODAVILA"
