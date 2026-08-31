---
title: Side Project
abbrlink: 2bfc
date: 2026-08-04 10:07:40
categories:
tags:
---

### 名詞解釋 
+ FastAPI 作為 web server - FastAPI 是一個用 Python 寫的現代、高效能 Web 框架，專門用來快速建立 API（特別是 RESTful API 與 OpenAPI 相容的介面）
+ SQLAlchemy 作為 ORM - SQLAlchemy 是 Python 生態系中最成熟、功能最完整的 ORM（Object-Relational Mapping） 框架，同時也是一個強大的 SQL 工具包。
+ UAT 是 User Acceptance Testing 的縮寫，中文通常翻譯為 「使用者驗收測試」 或 「用戶驗收測試」。
+ PAT 是 Personal Access Token（個人存取權杖） 的縮寫
+ RBAC (Role-Based Access Control，基於角色的存取控制)
  + 定義：一種權限管理機制，透過「角色（Role）」來決定使用者能看見或操作哪些功能，而不是單獨為每個人設定權限。
  + 專案情境：在系統中設定「管理員」、「設計師」、「工務」等角色。管理者可以派案與查看全部報表；設計師只能查看和更新自己負責的案件，系統會根據身分自動限制操作範圍。
+ Overdue (逾期 / 超時)
  + 定義：指某個任務、工期、里程碑或待辦事項已經超過原定截止日期（Due Date）卻尚未完成。
  + 專案情境：在 Dashboard 或案件清單中標示紅字警示，例如「施工階段已 Overdue 3 天」，提醒主管或負責人員案件進度延誤需要介入處理。
+ Hypercare (上線後加強維護期 / 密集照護期)
  + 定義：系統剛部署到正式環境（Production）後的初期高強度支援階段（通常為上線後 1 至 4 週）。
  + 專案情境：此期間開發團隊會保持高度警戒，快速修復使用者剛開始操作時發現的 Bug、處理效能瓶頸、解答操作疑問，並確保資料庫備份與系統運行完全穩定後，才正式進入日常維運或結案交接。
+ 啟用資料列安全政策（RLS）：「讓資料庫直接幫你過濾資料，每個人只能看到或修改自己被允許的那幾『列（Row）』。」
  - 一般員工只能查詢、修改自己的 profiles
  - 若 role = 'admin'，則允許讀取並修改全公司的 profiles
  - 若 role = 'project_manager'，只能查看同專案成員的資料
+ GRANT（授權指令）：PostgreSQL 中的 SQL 指令，用來賦予特定角色「讀取（SELECT）」、「新增（INSERT）」、「修改（UPDATE）」或「刪除（DELETE）」這張資料表的權利。
+ authenticated（已登入的使用者角色）：Supabase / PostgREST 環境中預設的身分群組，代表「只要有成功登入系統、持有有效 Token 的使用者」。
+ Next.js 是一個以 React 為核心的全端網頁應用框架（Framework）。
  Package 與 Framework 的核心差異
  + 一般 React Package（如 React Router, Axios）：
  單一功能的小工具，由你主導程式架構，按需求引入使用（Library / 工具庫概念）。
  + Next.js（Framework / 框架）：
  提供了完整的應用程式骨架與執行環境，規定了檔案目錄結構、路由方式與渲染生命週期。
  Next.js 核心能力
  + 多元渲染模式： 支援伺服器端渲染（SSR）、靜態網站生成（SSG）與客戶端渲染（CSR），大幅提升載入效能與 SEO。
  + 內建檔案型路由（File-system Routing）： 透過資料夾結構（如 App Router 的 app/page.tsx）直接定義網頁路由，無需手動配置路由表。
  + React Server Components (RSC)： 組件預設在伺服器端執行與渲染，減少傳送給瀏覽器的 JavaScript 體積。
  + 前後端整合： 內建 API Routes / Route Handlers 與 Server Actions，可直接在同一個專案內撰寫後端邏輯與資料庫操作。
  + 自動化效能最佳化： 內建針對圖片（`<Image/>`）、字型（next/font）與程式碼分割（Code Splitting）的最佳化處理。
  簡而言之，React 負責解決 「如何建構 UI 介面」，而 Next.js 則是補足了 React 在伺服器端渲染、路由、建置工具與後端功能上的完整方案。

<!--more-->

### Tools
#### supabase put to schema web_app2
##### 原來
``` bash
#2. Supabase 資料庫與角色設計
  - 用 supabase init 建立本機 Supabase 專案，用 migration 檔案（不要用 Studio 手動改）定義以下最小資料表：
    - profiles：對應 auth.users，欄位至少包含姓名、員工編號、Email、所屬部門/職稱、系統角色、帳號啟用狀態。
    - 角色 enum／查照表：設計師 (designer)、工務主管 / 專案主管 (project_manager)、財務 (finance)、文管 (doc_control)、系統管理員 (admin)。
  - 撰寫 RLS（Row Level Security）政策的基礎版本：
    - 一般使用者只能讀取/更新自己的 profiles 資料。
    - admin 角色可以讀取與管理所有使用者資料。
    - 其餘角色的資料存取權限先預留 policy 骨架與註解，實際案件資料表要等 Phase 2 才建立。
  - 提供一支 seed script，建立 5 個測試帳號（每個角色各一個），方便之後 Demo 與驗收使用。
  - 資料庫的所有結構異動都必須以 migration 檔案呈現在 supabase/migrations/，確保未來可用 supabase db push 完整重現。
```

##### schema web_app2
``` bash
2. Supabase 資料庫與角色設計（schema web_app2 版）

- 用 supabase init 建立本機 Supabase 專案，第一支 migration 先
  CREATE SCHEMA IF NOT EXISTS web_app2;，之後用 migration 檔案（不要用
  Studio 手動改）定義以下最小資料表——所有物件名稱都要加上
  web_app2. 前綴，不能再依賴「不寫 schema 就自動落在 public」這件事：
  - web_app2.profiles：對應 auth.users（auth 這個 schema 是 Supabase
    全域共用的，不用也不能加前綴，user_id 的外鍵一樣寫
    references auth.users(id)，這點跟單獨一個 project 時完全一樣）。
    欄位維持原本規劃：姓名、員工編號、Email、所屬部門/職稱、系統角色、
    帳號啟用狀態。
  - 角色 enum／查照表：改成 web_app2.role（或你的查照表叫
    web_app2.roles），enum 裡的值本身（designer／
    project_manager／finance／doc_control／admin）不用加前綴，
    純粹是資料值，不是物件名稱。
- RLS 政策：
  - 政策一樣寫在 web_app2.profiles 上（create policy ... on web_app2.profiles ...），邏輯完全不變——auth.uid() = id 這種寫法
    不受影響，因為 auth.uid() 本來
  - 「admin 可以讀取管理所有使用者資料」這條如果需要一個判斷角色的
    helper function（像現在 web_pro
    is_admin()／is_pm_or_admin() 那種寫法），這個 function 也要落在
    web_app2 底下（web_app2.is_admi
    security definer + set search_path = ''（這個專案現有的安全寫法，
    強制函式內部所有物件都要寫完整
    web_app2.profiles 時也一定要帶 schema 前綴，不能省略。
  - 其餘角色的 policy 骨架同理，都
- Seed script：
  - 如果是走「插入 auth.users → tri 式
    （這個專案的 handle_new_user() 就是這樣），trigger function 要叫
    web_app2.handle_new_user()，取
    project 的其他 app 撞名的名字——因為 auth.users 是全 project
    共用的表，如果 app1 也在它上面
    trigger，同名會出問題。
  - Seed script 如果有任何直接查/寫 立
    Supabase client 時要帶 db: { schema: "web_app2" }（跟現在
    lib/supabase/admin.ts 那個選項
  - 5 個測試帳號的 email，建議一開始就帶 app 前綴（例如
    designer.webapp2.demo@example.c樣的
    *.demo@example.com，避免以後真的共用同一個 project 時 email 撞名
    （auth.users.email 全 project
- 「所有結構異動都必須是 migration 檔案」這條完全不變，差別只在檔案裡的
  SQL 內容要帶 schema 前綴。
- 這條原本 spec 沒寫、但要記得補的：完成第一支 migration（建好
  web_app2.profiles 等表）之後，要 t
  Settings → API → Exposed schemas 把 web_app2 加進去，本機
  supabase/config.toml 的 api.schem
  查不到這個 schema 底下的任何表。

要點總結：唯一的行為改動就是每個物件名稱都要多帶 web_app2. 前綴，RLS 邏輯、trigger 概念、seed 手法都跟單獨一個 project 時一模一樣，只是命名空間從隱含的 public 換成你自己指定的 schema。

# 簡單敘述
自建 schema web_app2 
```

#### VsCode
##### Markdown Prevbiew Enhanced
``` bash
# install Markdown Prevbiew Enhanced

# F1 support function

# 在側邊開啟同步預覽（Side by Side）：
+ Windows / Linux: Ctrl + K 接著按 V
+ macOS: Cmd + K 接著按 V
```

#### vercel 部署
##### 
```` bash 
# supabase Edge function
Supabase Edge Functions 是運行在靠近使用者的全球邊緣節點（Edge Network）上的 無伺服器函式（Serverless Functions），基於 Deno / TypeScript 執行環境構建。
核心作用是讓你在前端與資料庫之間，安全地執行自訂後端邏輯，而不需要自己維護一台專門的後端伺服器。
#主要作用與常見應用場景
+ 保護敏感的金鑰與憑證（Secure Secrets）：
  前端網頁（瀏覽器）不能存放第三方 API 的 Secret Key（如 OpenAI、Stripe 金流、LINE Notify、Resend 寄信）。透過呼叫 Edge Function，由後端攜帶金鑰請求第三方服務再回傳結果。
+ 繞過 RLS 的管理員操作（Admin Actions）：
  某些業務邏輯需要使用最高權限的 SUPABASE_SERVICE_ROLE_KEY（例如批次更新多位使用者的帳號狀態、管理員刪除帳號）。這類操作絕不能寫在前端，適合放在 Edge Function 內執行。
+ 處理 Webhooks（事件回呼）：
  接收外部服務的通知回呼，例如 Stripe 扣款成功、GitHub 觸發通知、或是 Supabase Database Webhooks（當某個 Table 有新資料新增時自動觸發 Function）。
+ 複雜資料聚合與重度計算：
  在回傳給前端前，先在邊緣節點進行資料過濾、簽章驗證、計算或格式轉換，降低前端負擔與網路傳輸量。
+ 超低延遲（Low Latency / No Cold Starts）：
  因為運行在 Deno 邊緣網路上，相較於傳統 Node.js 容器，冷啟動（Cold Start）極短（通常在毫秒級），且程式碼會自動部署在全球最靠近用戶的節點執行。
# 開發小結:
如果你已經使用 Next.js + Vercel，一般的後端 API 寫在 Next.js 的 Server Actions 或 API Route 即可；但如果是獨立的 Webhook 接收端、或需要由 Supabase 資料庫事件自動觸發的邏輯，使用 Supabase Edge Functions 是最乾淨的架構。

````

##### a
```` bash
# 更新 miggation
# 先改好資料庫結構（Supabase），再部署讀取該結構的新版程式碼（Vercel
用 Supabase CLI 執行 supabase db push 把最新 Migration 推到雲端。

# supabse project 暫停
+ 前往 Supabase Dashboard。
+ 點進你的專案 → 左下角 Settings (齒輪) → General。
+ 向下滾動找到 Pause Project（部分方案/介面會放在 Danger Zone 區塊）。

# automatic RLS - 需要 enable 
# 防止資料被公開裸露：
Supabase 的前端是直接透過 anon key（公開金鑰）存取 PostgREST API 的。
  + 如果 RLS 是 Disable（關閉）：任何拿到你前端網址和 Anon Key 的人，都可以直接對你的資料表進行讀取、修改、甚至整張表清空（DELETE）。
  +如果 RLS 是 Enable（開啟）：預設會阻擋所有來自前端 API 的存取，只有符合你寫的 Policy（政策）的請求（例如：使用者只能看自己的資料、管理員才能編輯）才能放行。

# Database password 用途
# 1. 使用 Supabase CLI 連結遠端專案（最常見）
當你在本機終端機要把結構推送到線上專案時：
```
supabase link --project-ref <your-project-ref>
supabase db push
```
執行 supabase link 時，CLI 會要求你輸入 Database Password 以驗證管理員身份並建立安全連線。
# 2. 使用外部 GUI 資料庫軟體直連
如果你想用獨立的資料庫視覺化工具（例如 DBeaver、TablePlus、Navicat、DataGrip 或 pgAdmin）連進 Supabase 資料庫：
  + Host: db.<project-ref>.supabase.co
  + Port: 5432 (Direct) 或 6543 (Pooler)
  + User: postgres
  + Password: 你的 Database Password
# 3. 使用原生 ORM 或 Direct Connection String
如果你的後端專案使用的是傳統 ORM（例如 Prisma、Drizzle、TypeORM、Sequelize）或原生的 pg 連線池：
```
# Connection Pooling / Direct Connection
DATABASE_URL="postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
```
連線字串裡的 [YOUR-PASSWORD] 就是這組資料庫密碼。
# 4. 執行原生備份或資料遷移（pg_dump / psql）
當你需要直接用命令列工具備份資料庫或匯入大型 .sql 檔時：
```
# 備份資料庫
pg_dump -h db.<project-ref>.supabase.co -U postgres -d postgres > backup.sql
```
執行時終端機會提示輸入密碼。
# 重點摘要與提醒
  + 日常前端開發：只用 NEXT_PUBLIC_SUPABASE_URL 與 NEXT_PUBLIC_SUPABASE_ANON_KEY，完全不需要 Database Password。
  + 忘記密碼：隨時可以到 Supabase Dashboard → Project Settings → Database → Reset Database Password 重新設定，重設後記得重新 supabase link 即可。

````

##### a
``` bash
# generate deploy command
help me create my custom command in @.claude/commands/deploy_vercel.md . I want to deploy my local project to vercel. Once done, give me the url to see my project on the internet.
# vercel login
! vercel login


# 佈署至 vercel
vercel link
"
  Vercel CLI 50.1.3
  ? Set up “D:\work\run\claude\web_project_management”? yes
  ? Which scope should contain your project? Robert's projects
  ? Link to existing project? no
  ? What’s your project’s name? web-project-management
  ? In which directory is your code located? ./
  Auto-detected Project Settings (Next.js):
  - Build Command: next build
  - Development Command: next dev --port $PORT
  - Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`
  - Output Directory: Next.js default
  ? Want to modify these settings? no
  ? Do you want to change additional project settings? no
  ✅  Linked to roberts-projects-2b1cd09b/web-project-management (created .vercel)
  ? Detected a repository. Connect it to this project? yes
  > Connecting GitHub repository: https://github.com/hot5656/web_project_management
  Error: Failed to connect hot5656/web_project_management to project. Make sure there aren't any 
  typos and that you have access to the repository if it's private.
"
# 到時候透過 claude 佈署所以 Error 應該也無所謂

# Vercel set env
Production Deployment
  --> Setting
  --> Environments
  --> Production
  --> Add Environment Variable
    + NEXT_PUBLIC_SUPABASE_URL:https://supabase_id.supabase.co
      supabase_id:開 supabase project url 最後的字串
# find some error 
Remove the public framework prefix to keep this value private. Public prefixes expose values to the browser.
# 說明
# 在 Vercel 後台新增變數時，依變數性質分開設定：
# 1. 對於前端公開變數（URL、Anon Key、Schema）
+ 變數名稱：
  + NEXT_PUBLIC_SUPABASE_URL
  + NEXT_PUBLIC_SUPABASE_ANON_KEY
  + NEXT_PUBLIC_SUPABASE_SCHEMA
+ 設定方式：取消勾選 Sensitive / Hide Value 選項（維持一般的 Plain Text 變數即可儲存）。
# 2. 對於後端保密變數（Service Role Key）
+ 變數名稱：SUPABASE_SERVICE_ROLE_KEY (注意：千萬不要加 NEXT_PUBLIC_)
+ 設定方式：可以正常勾選 Sensitive / Hide Value，因為它只會在伺服器後端執行，絕不能暴露給瀏覽器。
# select below
Config: Readable after saving for members with access. Use for non-sensitive values.
  + NEXT_PUBLIC_SUPABASE_ANON_KEY: supabase Publishable key
  + SUPABASE_SERVICE_ROLE_KEY: supabase Secret keys
  + NEXT_PUBLIC_DEMO_MODE:true (for demo version)
# set .env.profile.shared to create value
# update env for remote supabase(check .env.local heav correct data)
npm run env:use shared
# link to supabase 
supabase login
# link to supabase db project (enter supabase project find some string)
# supabase link --project-ref supabase_project_id
supabase link --project-ref supabase_project_id --debug
  NotFound: FileSystem.readFile (C:\Users\RobertKao\.supabase\profile)
  Using access token for profile: supabase
  Supabase CLI 2.115.0
  Using profile: supabase (supabase.co)
  Using access token for profile: supabase
  2026/08/25 11:45:18 HTTP GET: https://api.supabase.com/v1/projects/luugfvsrawnuzwpjvddt
  2026/08/25 11:45:18 HTTP GET: https://api.supabase.com/v1/projects/luugfvsrawnuzwpjvddt/api-keys
  2026/08/25 11:45:19 HTTP GET: https://api.supabase.com/v1/projects/luugfvsrawnuzwpjvddt/config/storage
  2026/08/25 11:45:19 HTTP GET: https://api.supabase.com/v1/projects/luugfvsrawnuzwpjvddt/config/database/pooler
  2026/08/25 11:45:19 HTTP GET: https://luugfvsrawnuzwpjvddt.supabase.co/rest/v1/
  2026/08/25 11:45:21 HTTP GET: https://luugfvsrawnuzwpjvddt.supabase.co/auth/v1/health
  2026/08/25 11:45:21 HTTP GET: https://luugfvsrawnuzwpjvddt.supabase.co/storage/v1/version
  Finished supabase link.
# 先把 migrations 套上去，建好 profiles 表跟 handle_new_user trigger
supabase db push
# 寫入預設測試帳號
npm run seed
  > web_project_management@0.1.0 seed
  > tsx supabase/seed/seed.ts
  ◇ injected env (6) from .env.local // tip: ⌘ suppress logs { quiet: true }
  開始 seed 7 個測試帳號...
  ✓ 已建立帳號：designer.demo@example.com (designer)
  ✓ 已建立帳號：pm.demo@example.com (project_manager)
  ✓ 已建立帳號：designer2.demo@example.com (designer)
  ✓ 已建立帳號：pm2.demo@example.com (project_manager)
  ✓ 已建立帳號：finance.demo@example.com (finance)
  ✓ 已建立帳號：doc.demo@example.com (doc_control)
  ✓ 已建立帳號：admin.demo@example.com (admin)
  完成。測試帳號清單請參考 README.md。
# deploy vercel
/deploy_vercel prod

# 更新 migration 把最新 Migration 推到雲端。
supabase db push
# 查目前 supabase 指到哪裡
supabase/.temp/project-ref
  luugfvsrawnuzwpjvddt
# 本機（local Docker Supabase） reset
supabase db reset
# 遠端 Supabase reset
supabase db reset --linked
# 建立 7 個基礎測試帳號（2 位設計師、2 位工務主管、finance/doc_control/admin 各一位，清單見下方「測試帳號」）。此 script 可重複執行：若帳號已存在會更新其 密碼與角色資訊，不會重複建立。
npm run seed
# 建立 10 位設計師 + 20 筆涵蓋各種狀態/財務情境的案件
npm run seed:cases
```

##### new vercel project 
```` bash
gaoyiping@gaoyipingdeMacBook-Pro web_project_management % link vercel
usage: link source_file target_file
gaoyiping@gaoyipingdeMacBook-Pro web_project_management % vercel link
Vercel CLI 55.0.0 (Node.js 26.5.0)
  Directory       ~/work/claude/web_project_management
  Team            roberts-projects-2b1cd09b
? Which project? Create a new project
? Name? Press ↑ to return to project options hot5656_project_management
  Detected Next.js (Build Command: next build, Output Directory: Next.js default)
# no : 使用 Vercel 自動偵測到的 Next.js 最佳預設值：
? Customize settings? no
? Customize advanced settings? no
✓ Created         roberts-projects-2b1cd09b/hot5656_project_management
? Connect detected Git repository? no
> Downloading a fresh `VERCEL_OIDC_TOKEN` for roberts-projects-2b1cd09b/hot5656_project_management
✓ Updated         .env.local file

# set domain name
# hot5656-project-management.roberthut.com
# namecheap setting 
Dashboard
  --> Domain List
  --> MANAGE   (roberthut.com 後面)
  --> Advanced DNS
  --> HOST RECORDS 下面
  --> ADD NEW RECORD
    | Type	      | Host                         | Value                 | TTL.     | 
    | CNAME Record| hot5656-project-management   |  cname.vercel-dns.com.| Automatic| 
    | CNAME Record| demo-project-management      |  cname.vercel-dns.com.| Automatic| 
      ps: cname.vercel-dns.com. 後面的點是自動加上去

# Vercel setting - hot5656_project_management
Vercel 專案 hot5656_project_management
  --> Domains  (左方)
  --> Edit
  --> change Domain as "hot5656-project-management.roberthut.com"
  --> select Redirect old domain to new (舊的 domain(vercel) 還有效)
  --> Save
# Vercel setting - web-project-management
Vercel 專案 web-project-management
  --> Domains  (左方)
  --> Edit
  --> change Domain as "demo-project-management.roberthut.com"
  --> select Redirect old domain to new (舊的 domain(vercel) 還有效)
  --> Save

# login/logout supabase
supabase login
supabase logout

# resend
Domains
  --> Add doamin "roberthut.com"
  --> verify 
API keys
  --> Create API key
    supabase email verify
    Sending access
    All domain



# supabase
# create edge function - name:send-email-hook
```
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface EmailHookPayload {
  user: {
    email: string;
    id: string;
  };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: "signup" | "recovery" | "magiclink" | "invite";
    site_url: string;
    token_new?: string;
    token_hash_new?: string;
  };
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload: EmailHookPayload = await req.json();
    const { user, email_data } = payload;
    const { email } = user;
    const { token_hash, email_action_type, site_url, redirect_to } = email_data;

    // 組合驗證跳轉 URL
    const confirmUrl = `${site_url}/auth/confirm?token_hash=${token_hash}&type=${email_action_type}&next=${redirect_to || "/"}`;

    let subject = "系統通知信";
    let htmlContent = `<p>請點擊以下連結完成操作：</p><a href="${confirmUrl}">${confirmUrl}</a>`;

    // 依據發信類型自訂信件內容
    if (email_action_type === "signup") {
      subject = "歡迎加入！請驗證您的電子郵件信箱";
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <h2>歡迎加入！</h2>
          <p>請點擊下方按鈕以完成電子信箱驗證：</p>
          <a href="${confirmUrl}" style="display:inline-block; background-color:#2563eb; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold;">驗證電子郵件</a>
          <p style="color:#6b7280; font-size:12px; margin-top:24px;">若您未曾註冊帳號，請忽略此郵件。</p>
        </div>
      `;
    } else if (email_action_type === "recovery") {
      subject = "重設密碼請求";
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <h2>重設密碼</h2>
          <p>我們收到了重設密碼的請求。請點擊下方按鈕以設定新密碼：</p>
          <a href="${confirmUrl}" style="display:inline-block; background-color:#dc2626; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold;">重設密碼</a>
          <p style="color:#6b7280; font-size:12px; margin-top:24px;">若非本人操作，請儘速檢查帳戶安全。</p>
        </div>
      `;
    }

    // 透過 Resend 發送信件
    const data = await resend.emails.send({
      from: "auth@roberthut.com", // 必須使用在 Resend 已 Verified 的網域
      to: email,
      subject: subject,
      html: htmlContent,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

# Supabase 網頁後台手動新增 Secret(resend)
Edge Functions
  --> Secrets
    Name: RESEND_API_KEY
    Value: resend_api_key
  --> Save

# ww
robert5656_project_management    
  --> Authentication
  --> Emails
  --> Set up SMTP
  --> Configure Send Email hook
    Hook type: HTTPS
    URL: https://supabase.com/dashboard/project/amniwteziuabvurjiyfn/functions


# 
Edge Functions
  --> send-email-hook。
  --> Settings
  --> Verify JWT with legacy secret
  --> off

# test 


# 
Authentication 
  ➔ 點選 Rate Limits
  Email rate limit per hour（每小時發信總量上限）：預設通常為 30，可調大（例如改為 100 或 300）。

# supabase 常見指令比較
supabase migration up : 本地(Local)-僅執行「新增加、未套用」的 migration 檔案，保留現有資料。
supabase db reset : 本地(Local)-徹底清空本地資料庫，重新從第一支 migration 跑到最新，並自動執行 supabase/seed.sql 假資料。
upabase db push : 遠端雲端(Remote/Production)-將本地所有的 migration 檔案同步並套用到已連結的 Supabase 雲端專案資料庫。
  # 確認已連結專案
  supabase link --project-ref <your-project-ref>
  # 執行同步推送
  supabase db push
  # 乾跑預覽（Dry Run）： 確認會推送哪些 migration，不實際修改資料庫：
  supabase db push --dry-run
  # 跳過本機差異檢查 / 強制推送:若在 CI/CD 或確定無衝突的情況下推送
  # Supabase 預設要求 Migration 必須依照嚴格的時間順序（Chronological Order）執行。
  # 1. 遠端資料庫已經套用了時間戳較新的遷移檔案
  # 2. 你本地的分支上有一支時間戳較舊、但遠端從未執行過的檔案
  # 它會掃描本地 supabase/migrations/ 目錄下的所有檔案，只要該檔案的時間戳記不存在於遠端資料庫的遷移歷史
  # 表（supabase_migrations.schema_migrations）中，就會強制將其補推到遠端執行。
  supabase db push --include-all
  # --include-all 乾跑預覽（Dry Run）
  supabase db push --include-all --dry-run
````

##### next 
``` bash
! SUPABASE_DB_PASSWORD='你的正式站資料庫密碼' supabase db push --linked --yes
# Full access DB

# 清除歷史命令

20260829000002_document_source_split.sql 需要修改嗎


SUPABASE_DB_PASSWORD='wbdpY8GbEvgtNNuN' supabase db push --linked --yes

# 查看 auto mode 設定
claude auto-mode config

# ================================
# update remote supabase migration
# ================================
# migration supabase - relogin
supabase logout
supabase login 
# link to supabase
supabase link --project-ref  <supabase_id>
# see project
supabase projects list 
   LINKED | ORG ID               | REFERENCE ID         | NAME                          | REGION                 | CREATED AT (UTC)    
  --------|----------------------|----------------------|-------------------------------|------------------------|---------------------
     ●    | zubtctreygdclcrhkcty | amniwt               | robert5656_project_management | Northeast Asia (Seoul) | 2026-08-26 09:20:54 
# show migration 
supabase migration list  
	Initialising login role...
	Connecting to remote database...
  
   Local            | Remote           | Time (UTC)            
  ------------------|------------------|-----------------------
   `20260821000001` | `20260821000001` | `2026-08-21 00:00:01` 
   `20260821000002` | `20260821000002` | `2026-08-21 00:00:02` 
   `20260821000003` | `20260821000003` | `2026-08-21 00:00:03` 
   ....
# back db   
# - db dump：對資料庫執行 pg_dump，把整個資料庫的內容輸出成一份 SQL 檔（schema 結構 + 資料，或只有其中一種，看你加的選項）。
# - --linked：指定「從目前 CLI 已經 link 的那個遠端專案」抓資料，不是從本機 Docker 裡的 Supabase（那個是 --local）——也就是說，一旦你 link 到 amniwteziuabvurjiyfn，這個指令 dump 出來的就是正式站現在的完整資料庫內容。
# 用途，對照你現在情境：正式站是 Supabase Free 方案，沒有自動備份、沒有 PITR（時間點還原），如果 migration 或任何操作把資料庫搞壞了，唯一救回來的方法就是靠這種手動 dump 出來的檔案。所以慣例是：推任何會動 schema 的 migration 之前，先手動 dump 一份當備份，出事才有得復原。
# 需要執行 docker desktop
supabase db dump --linked 
# upsh migartion 
supabase db push --linked 
# recheck migration result
PS D:\work\run\claude\web_project_management> supabase migration list  
	Initialising login role...
	Connecting to remote database...
   Local            | Remote           | Time (UTC)            
  ------------------|------------------|-----------------------
   `20260821000001` | `20260821000001` | `2026-08-21 00:00:01` 
   `20260821000002` | `20260821000002` | `2026-08-21 00:00:02` 
   ...
   `20260830000003` | `20260830000003` | `2026-08-30 00:00:03` 
   `20260831000001` | `20260831000001` | `2026-08-31 00:00:01` 

```

#### google 試算表
##### 加入 固定 index(A2 ) 
```` bash
A2 以下的所有資料（保留 A1 標題不動）：

1. 複製： 以下(參考欄位B)
  + Windows：Ctrl + C
  + Mac：Cmd + C
```
=ARRAYFORMULA(IF(B2:B<>"", ROW(B2:B)-1, ""))
```

2. 點擊 A2 儲存格, Enter

3. 點擊 A2 儲存格

4. 快速選取 A2 以下到底：
  + Windows：按下 Ctrl + Shift + ↓（向下鍵）
  + Mac：按下 Cmd + Shift + ↓（向下鍵）
5. 複製：
  + Windows：Ctrl + C
  + Mac：Cmd + C
6. 原地僅貼上值：
  + Windows：Ctrl + Shift + V
  + Mac：Cmd + Shift + V
````

#### setup playwright
``` bash
# check install or not
# Bash
claude mcp list
or 
npx playwright --version

# install
# 安裝未註冊 mcp 看不到,執行下面命令
claude mcp add playwright npx @playwright/mcp@latest

# check again
claude mcp list
```

#### 推廣
``` bash
# 1. Landing Page 測需求
```

#### key prompt
##### example
``` bash
# ELI10
ELI10 以下提案
機會點 A:職等評估精靈(Job Grading Wizard)
對應章節:第 9 堂〈AI in Rewards: Policy, Bonus Schemes, Recognition and Grading〉
HR 流程環節:薪酬(Rewards/Compensation)
痛點:筆記明確指出「搜尋『AI-based reward management software』找不到成熟系統,多半只是行銷文案或未來承諾,尚無真正落地的功能」——這是課程中**唯一被講師親口點名「市場空白」**的領域。職等評估(因子設定→權重分配→等級定義→計分公式→職等區間劃分)傳統上需要總獎酬顧問經驗,中小企業 HR 通常無力負擔。
產品形式:引導式問答工具,依產業/公司規模自動產生職等因子(技術專業、管理責任、業務影響力等)、權重、7 級定義,並以幾何級距(而非線性)分配 1000 分滿分,最後輸出職等對照表與試算 Excel/PDF。筆記中特別提醒「AI 生成結果常需人工反覆修正提示詞」,暗示產品價值在於把這套 prompt chain 包裝成結構化引導式介面。 
# MVP spec
轉成一個 MVP spec



```

##### list
``` bash
# 1. 「ELI10」（Explain Like I'm 10 / 當作我 10 歲來解釋）
# 當遇到複雜專業術語（合約條款、法規、商業術語）時，強制 AI 用最通俗易懂的語言解釋。
ELI10 how do I start a business?

# 2.「問我 5 個釐清問題」（Ask clarifying questions）
# AI 雖懂知識，但不懂提問者的個人背景。讓 AI 先提問，主動挖掘你的目標、客群與限制，避免輸出空泛通用、不切實際的建議。
Before you answer, ask me 5 clarifying questions.

# 3. 「提供優秀範例」（Give examples / Few-shot Prompting）
# 告訴 AI 具體的標竿（Benchmark）。讓 AI 掌握預期的語調與標準。
這是過去成功的 Pitch Email / 簡報範本，請比照此風格與結構撰寫

# 4. 「建立記憶／專業技能庫」（Memory & Skills / Context setting）
# 將長期背景、個人技能特質或工作流程存入系統設定（Projects / Custom Instructions / Memory），讓 AI 每次產出時自動套用你的專業角色與個人特質，減少重複說明的時間。

# 5. 「找出盲點與脆弱假設」（Find blind spots & weak assumptions）
# 把 AI 當作「陪練夥伴」（Sparring Partner）。不再只是讓 AI 迎合或讚美你的想法，而是要求它主動挑刺、檢查策略漏洞與潛在風險。
Find my blind spots and weak assumptions.

# 6. 「在符合標準前不要停止」自主迴圈（The "Don't Stop Until" Loop）
# 賦予 AI 自我迭代與檢驗的責任。要求模型產出後自行對照檢查清單（Checklist），若未達到標準就自動重寫與修正，直到完全符合要求為止。
# 影片腳本與分鏡（Cinematic Scripting）
「寫一段 60 秒的暗黑懸疑短片分鏡腳本。在滿足以下條件前不要停止：
1. 全程『零對白』，僅能透過視覺、光影與環境音效推進情緒。
2. 包含至少 3 次明確的鏡頭景別切換（特寫、全景、主觀視角）。
3. 結尾 5 秒必須留下一個未解的視覺懸念。
請在草稿產出後逐項核對，未達成則自動修正重寫。」
```

#### Steal My Claude Learning Stack — 50 個免費資源
> 原文作者：Aniket Chhetri (Grow With AI)
> 原文連結：https://growwithaiguide.substack.com/p/steal-my-claude-learning-stack-50

共 5 大模組、50 個資源。若想先體驗精華，作者建議第一週先看 **#2、#17、#22、#26、#41**。

建議學習順序（從零開始）：**模組3 → 模組2 → 模組4 → 模組1 → 模組5**（先學 Prompting，因為能提升後續所有模組的學習效果）。

---

##### 模組一：Claude Code (Module 1: Claude Code)
從聊天機器人升級成能實際動手做事的工具，共 9 個資源。

| # | 中文標題 / English Title | 連結 | 簡單說明 |
|---|---|---|---|
| 1 | Claude Code 完整課程：打造與變現 / Claude Code Full Course: Build & Sell | https://www.youtube.com/watch?v=QoQBzR1NIqI | Nick Saraev 的免費完整課程，把 Claude Code 當作商業技能而非單純開發工具來教。 |
| 2 | 36分鐘掌握95%的 Claude Code / Master 95% of Claude Code in 36 Min | https://www.youtube.com/watch?v=saggDHHnmtQ | Nate Herk 出品，作者認為是最快且誠實的入門影片，**建議第一個看**。 |
| 3 | Claude Code 實戰 / Claude Code in Action | https://anthropic.skilljar.com/claude-code-in-action | Anthropic 官方免費課程，節奏較慢但內容更完整。 |
| 4 | Claude Code 總覽 / Claude Code Overview | https://code.claude.com/docs/en/overview | 官方文件首頁，值得收藏常回來查閱。 |
| 5 | Claude Code 最佳實踐 / Best Practices for Claude Code | https://code.claude.com/docs/en/best-practices | 大部分「Claude Code 用不順」的問題答案都在這裡。 |
| 6 | 建立自訂 Subagents / Create Custom Subagents | https://code.claude.com/docs/en/sub-agents | 教你打造一整組由自己設計的 agent 團隊。 |
| 7 | CLAUDE.md 與記憶機制 / CLAUDE.md & Memory | https://code.claude.com/docs/en/memory | 如何讓 Claude 記住專案脈絡，不用每次重新解釋。 |
| 8 | awesome-claude-code 資源清單 | https://github.com/hesreallyhim/awesome-claude-code | 社群整理的 Claude Code 大全清單。 |
| 9 | Claude Code Hooks 精通 / Claude Code Hooks Mastery | https://github.com/disler/claude-code-hooks-mastery | 教你用 Hooks 讓 Claude Code 從「使用」升級到「運行自動化系統」。 |

> ⚠️ 提醒：awesome 系列清單（#8、#36、#37、#43）容易讓人迷失方向，建議挑一項深入使用一週後再回來看其他清單。

---

##### 模組二：Cowork 與設計 (Module 2: Cowork & Design)
免寫程式的一側，直接描述目標讓 Claude 在你的電腦上完成工作，共 8 個資源。

| # | 中文標題 / English Title | 連結 | 簡單說明 |
|---|---|---|---|
| 10 | 用 Cowork 自動化了99%的生活 / I Automated 99% of My Life With Cowork | https://growwithaiguide.substack.com/p/i-automated-99-of-my-life-in-15-minutes | 作者實測文章，讀者迴響最熱烈的一篇。 |
| 11 | Claude Design 10分鐘做出網站 / Claude Design Did This in 10 Minutes | https://growwithaiguide.substack.com/p/i-built-a-professional-website-in | 作者親自用 Claude Design 一次做出專業網站的完整紀錄。 |
| 12 | Claude Cowork 新手完整課程 / Claude Cowork: Full Course for Beginners | https://www.youtube.com/watch?v=tf_KmDNZXzI | Tech With Tim 出品，目前 YouTube 上最完整的免費 Cowork 教學。 |
| 13 | Claude Design = 簡易建站 / Claude Design = Easy Websites | https://www.youtube.com/watch?v=rJtF32LTX8U | Kyle Skelly 出品，簡短實用不廢話。 |
| 14 | Claude 又獲得新超能力 / Claude Just Got Another Superpower | https://www.youtube.com/watch?v=jeA-KBv0b68 | Fireship 風格的 5 分鐘快速說明為何此功能重要。 |
| 15 | Claude Design 官方公告 / Introducing Claude Design | https://anthropic.com/news/claude-design-anthropic-labs | Anthropic 官方發布公告。 |
| 16 | Claude Design 入門指南 / Get Started With Claude Design | https://support.claude.com/en/articles/14604416-get-started-with-claude-design | 官方設定文件，建議搭配 #13 一起看。 |
| 17 | Claude Cowork 入門 / Introduction to Claude Cowork | https://anthropic.skilljar.com/introduction-to-claude-cowork | Anthropic 官方結構化課程，**推薦作為第一步**。 |

---

##### 模組三：Prompting 與工作流程 (Module 3: Prompting & Workflows)
更好的 prompt 只幫你一次，更好的工作流程能永久改變工作方式，共 8 個資源。

| # | 中文標題 / English Title | 連結 | 簡單說明 |
|---|---|---|---|
| 18 | 你把 Claude Fable 5 用錯了 / You're Prompting Claude Fable 5 Wrong | https://growwithaiguide.substack.com/p/youre-prompting-claude-fable-5-wrong | 作者整理模型更新後常犯的 prompting 錯誤。 |
| 19 | 正確設定 Claude Projects 的方法 / The Right Way to Set Up Claude Projects | https://growwithaiguide.substack.com/p/the-right-way-to-set-up-claude-projects | Projects 是被低估的功能，多數人設定方式其實不對。 |
| 20 | 把 Karpathy 的迴圈改造成 Skill / I Rebuilt Karpathy's Loop Into a Skill | https://growwithaiguide.substack.com/p/i-rebuilt-karpathys-loop-into-a-skill | 從單純 prompting 進化到系統化 Skill 的實例。 |
| 21 | Prompt Engineering 總覽 / Prompt Engineering Overview | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview | Anthropic 官方參考文件，內容較密集但是所有人參考的源頭。 |
| 22 | Prompt Engineering 互動式教學 / Prompt Engineering Interactive Tutorial | https://github.com/anthropics/prompt-eng-interactive-tutorial | 官方出品的動手練習教材，作者認為是最好的免費 prompting 資源。 |
| 23 | 打造高效 AI Agent / Building Effective AI Agents | https://anthropic.com/research/building-effective-agents | Anthropic 研究團隊的經典文章，agent 討論常被引用的原始出處。 |
| 24 | 高效上下文工程 / Effective Context Engineering | https://anthropic.com/engineering/effective-context-engineering-for-ai-agents | 「Context 是新的 Prompting」這個概念的源頭文章。 |
| 25 | Anthropic Academy | https://anthropic.skilljar.com | 官方所有免費課程的總入口，本清單多堂課程都來自這裡。 |

---

##### 模組四：Skills (Module 4: Skills)
內容最深的模組，作者認為 Skills 是與 Claude 協作方式最大的轉變，共 13 個資源。

| # | 中文標題 / English Title | 連結 | 簡單說明 |
|---|---|---|---|
| 26 | Claude Skills 完整指南 + 40個模板 / Complete Claude Skills Guide + 40 Templates | https://growwithaiguide.substack.com/p/complete-claude-skills-guide-40-templates | 作者最完整的 Skills 指南，附贈 40 個模板，**本模組最推薦先讀**。 |
| 27 | 離不開的12個 Claude Skills / 12 Claude Skills I Cannot Live Without | https://growwithaiguide.substack.com/p/12-claude-skills-i-cannot-live-without | 作者長期使用後留下來的12個核心 Skills。 |
| 28 | 這3個 Skills 讓我效率提升10倍 / I Work 10x Better With These 3 Skills | https://growwithaiguide.substack.com/p/i-work-10x-better-since-i-added-these | 若覺得12個太多，這篇精簡到3個必備 Skills。 |
| 29 | Superpowers（社群 Skills 集合） | https://github.com/obra/superpowers | 由 obra 維護，社群中最受推崇的 Skills 收藏之一。 |
| 30 | Agent Skills 官方倉庫 / Agent Skills (official repo) | https://github.com/anthropics/skills | Anthropic 官方公開的 Skills，可研究其架構寫法。 |
| 31 | Agent Skills 官方公告 / Introducing Agent Skills | https://claude.com/blog/skills | Skills 功能發布的原始公告文章。 |
| 32 | 用 Agent Skills 武裝 Agent（工程文章）/ Equipping Agents With Agent Skills | https://anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills | 深入探討 Skills 底層運作原理的工程文章。 |
| 33 | 用 Skills 擴充 Claude / Extend Claude With Skills | https://code.claude.com/docs/en/skills | 官方文件，教你如何自己動手建立 Skill。 |
| 34 | Agent Skills 入門課程 / Introduction to Agent Skills | https://anthropic.skilljar.com/introduction-to-agent-skills | 官方結構化免費課程版本。 |
| 36 | awesome-claude-skills（travisvn 版）| https://github.com/travisvn/awesome-claude-skills | 社群整理、持續更新的 Skills 清單。 |
| 37 | awesome-claude-skills（karanb192 版）| https://github.com/karanb192/awesome-claude-skills | 另一份策展角度不同的 Skills 清單，值得兩份都看。 |
| 38 | skills.sh | https://skills.sh | 可瀏覽、可安裝 Skills 的社群目錄網站。 |

> 註：原文編號跳過 #35，原文中無此項目。

---

##### 模組五：MCP 與整合 (Module 5: MCP & Integrations)
MCP 讓 Claude 能連接外部工具、資料與各種服務，共 12 個資源。

| # | 中文標題 / English Title | 連結 | 簡單說明 |
|---|---|---|---|
| 39 | Claude + NotebookLM = 神級組合 / Claude + NotebookLM = God Mode | https://growwithaiguide.substack.com/p/claude-notebooklm-god-mode | 作者最多人分享的整合教學文章。 |
| 40 | MCP Servers 官方倉庫 / MCP Servers (official repo) | https://github.com/modelcontextprotocol/servers | Model Context Protocol 官方伺服器收藏庫。 |
| 41 | 什麼是 MCP？/ What Is MCP? | https://modelcontextprotocol.io/introduction | 十分鐘搞懂 MCP 這個名詞，**建議從這裡開始**。 |
| 42 | 透過 MCP 連接 Claude Code / Connect Claude Code via MCP | https://code.claude.com/docs/en/mcp | 實際操作連接的官方指南。 |
| 43 | awesome-mcp-servers（社群清單）| https://github.com/punkpeye/awesome-mcp-servers | 社群最大規模的 MCP 伺服器清單。 |
| 44 | MCP Registry 官方登記處 | https://github.com/modelcontextprotocol/registry | 官方維護的 MCP 存在清單。 |
| 45 | MCP.so | https://mcp.so | 可搜尋的社群目錄網站，適合不想爬 GitHub 的人。 |
| 46 | Smithery | https://smithery.ai | 另一個目錄網站，介面更清爽，適合瀏覽探索。 |
| 47 | Glama MCP Servers | https://glama.ai/mcp/servers | 第三個目錄選擇，可依個人習慣挑一個常用。 |
| 48 | 自建並部署 Skills 與 MCP Servers / Build & Deploy Skills and MCP Servers | https://www.youtube.com/watch?v=YKIUt9ytxIE | Code With Antonio 出品的免費自建深度教學影片。 |
| 49 | MCP 入門課程 / Introduction to MCP | https://anthropic.skilljar.com/introduction-to-model-context-protocol | #41 的官方結構化課程版本。 |
| 50 | 用 Claude API 開發 / Building With the Claude API | https://anthropic.skilljar.com/claude-with-the-anthropic-api | 學習路線的最後一關，學完就是「用 Claude 開發」而非「學 Claude」。 |

---

##### 使用建議
不要一次全部學完，這是作者特別強調的重點：
1. 挑選最貼近你這週在做的事的模組
2. 完成該模組前兩個資源
3. 用學到的東西實際完成一件小事
4. 再回來繼續下一個模組


### Udemy Coupon Search
#### 1st prompt
``` bash
我要做一個 Udemy 免費優惠券聚合工具的 MVP,請幫我建立專案骨架。

## 技術棧
- Python 3.11+
- FastAPI 作為 web server
- SQLite 作為資料庫(MVP 階段先不用 PostgreSQL)
- SQLAlchemy 作為 ORM
- httpx 或 requests 做 HTTP 請求
- Playwright 用於需要模擬瀏覽器的驗證(先安裝好,邏輯之後再實作)

## 專案結構
請建立以下模組化結構:
- app/main.py — FastAPI 入口
- app/models.py — SQLAlchemy 資料模型
- app/scraper.py — 爬蟲邏輯(先留空函式 + TODO)
- app/verifier.py — 驗證邏輯(先留空函式 + TODO)
- app/database.py — DB 連線設定
- app/schemas.py — Pydantic schema

## 資料庫 Schema
建立一張 coupons 表,欄位包含:
- id (主鍵)
- course_id (字串,課程唯一識別)
- course_url
- coupon_code
- title (課程名稱,可為空)
- source (優惠券來源,例如網站名稱)
- status (enum: pending / valid / expired / unknown,預設 pending)
- first_seen_at (建立時間)
- last_checked_at (可為空)

## API 端點(第一版先做這三個,邏輯先用假資料/mock回傳,不用真的實作爬蟲)
1. POST /scrape — 接受 { "source": "xxx" },觸發爬取(先 mock,回傳 {"status": "started"})
2. GET /coupons — 支援 query param ?status=valid,從 DB 撈資料回傳
3. POST /verify/{coupon_id} — 觸發單一 coupon 驗證(先 mock,回傳假的 valid/expired 結果並更新 DB)

## 這次先不要做
- 不用做爬蟲的實際解析邏輯
- 不用做排程(cron/Celery)
- 不用做前端頁面
- 不用處理 proxy 或 rate limiting

## 驗收標準
- uvicorn app.main:app 可以正常啟動
- 三個端點都能用 curl 測試成功
- 資料庫檔案會自動建立,不用手動 migrate
- 附上一個 README.md 說明怎麼安裝依賴、啟動、測試

請先列出你打算建立的檔案清單和大致內容給我確認,再開始寫程式。
```

#### step #1 install/test
``` bash
# 建立虛擬環境
python -m venv venv
# Windows - set path
venv\Scripts\activate
# macOS/Linux - set path
source venv/bin/activate

# 安裝依賴 - install package
pip install -r requirements.txt

# 安裝 Playwright 瀏覽器 binary(先裝好，驗證邏輯之後再實作)
playwright install chromium
  --> notes
  # 只安裝 Chromium（最常用）
  playwright install chromium
  # 安裝所有瀏覽器（Chromium + Firefox + WebKit）
  playwright install
  # 只安裝 Firefox
  playwright install firefox
  # 只安裝 WebKit（Safari 的核心）
  playwright install webkit
  --> Playwright 官方同時支援 Node.js / JavaScript / TypeScript, Python
  # Node.js 
  # 安裝 playwright
  npm install playwright
  # 安裝 browser
  npx playwright install chromium
  # python
  pip install playwright
  playwright install chromium

# 啟動
uvicorn app.main:app --reload

# test - bash / macOS / Linux / Git Bash
curl -X POST http://127.0.0.1:8000/scrape \
  -H "Content-Type: application/json" \
  -d "{\"source\": \"udemyfreebies\"}"
# test - Windows PowerShell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/scrape `
  -ContentType "application/json" `
  -Body '{"source": "udemyfreebies"}'
# 預期回傳
{"status": "started"}

# PowerShell - testing
PS C:\WINDOWS\system32> Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/scrape `
>>   -ContentType "application/json" `
>>   -Body '{"source": "udemyfreebies"}'

status
------
started

# PowerShell - 查詢優惠券列表 
PS C:\WINDOWS\system32> Invoke-RestMethod -Uri http://127.0.0.1:8000/coupons
id              : 1
course_id       : 1234567
course_url      : https://www.udemy.com/course/example-python-course/
coupon_code     : FREEPYTHON2026
title           : Example Python Course
source          : udemyfreebies
status          : expired
first_seen_at   : 2026-08-04T02:54:44
last_checked_at : 2026-08-04T03:16:02.702913

id              : 2
course_id       : 7654321
course_url      : https://www.udemy.com/course/example-fastapi-course/
coupon_code     : FASTAPIFREE
title           : Example FastAPI Course
source          : discudemy
status          : pending
first_seen_at   : 2026-08-04T02:54:44
last_checked_at :

# PowerShell - 驗證
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/verify/1

id status
-- ------
 1 expired

```

#### prompt for 真實資料
``` bash
現在請幫我實作 app/scraper.py 的真實邏輯,對象是 [你選定的來源網站,例如某個優惠券聚合網站]。

## 需求
1. 寫一個函式 scrape_source(source: str) -> list[dict],負責:
   - 對目標網站發送請求(先用 httpx,如果該網站需要 JS 渲染才能看到內容,改用 Playwright)
   - 解析出每筆優惠券資訊,統一輸出成:
     { "course_id": str, "course_url": str, "coupon_code": str, "title": str, "source": str }
   - course_id 需要從 course_url 正規化抽出(不同來源網址格式可能不同,請設計成可擴充)

2. 在 POST /scrape 端點中呼叫這個函式,把抓到的資料寫入 DB:
   - 如果 (course_id, coupon_code) 已存在,跳過,不要重複寫入
   - 如果是新的,status 設為 pending,first_seen_at 設為現在時間

3. 錯誤處理:
   - 網路請求失敗要 try/except,並回傳明確的錯誤訊息,不要讓 server crash
   - 如果解析不到任何資料,回傳 { "status": "no_data", "count": 0 } 而不是報錯

4. 加入基本的禮貌性爬取設定:
   - 設定合理的 User-Agent
   - 每次請求間加入 1-2 秒隨機延遲(如果一次要抓多頁)
   - 設定 timeout(例如 10 秒)

## 這次先不要做
- 不用做 proxy 輪替
- 不用做多來源(先把一個來源做穩,之後再抽象成 interface)
- 不用實作驗證邏輯(verifier.py 先不動)

## 驗收標準
- 呼叫 POST /scrape 後,GET /coupons 能看到真實抓到的資料寫入 DB
- 印出 log,清楚顯示這次抓了幾筆、跳過幾筆重複
- 如果目標網站結構有多頁,先只抓第一頁就好,MVP 階段夠用

請先告訴我你打算怎麼解析這個網站的 HTML 結構(用什麼 CSS selector 或 XPath),我確認沒問題後再開始寫。

# addition 
不要保留沒有 couponCode 的免費課程,只抓取10 hours ago 以內的資料

# other
add 課程 default 語言 
```

#### step #2 test
``` bash
# trigger 
# PowerShell（你的環境）
# this ite not ok now
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/scrape `
  -ContentType "application/json" `
  -Body '{"source": "couponscorpion"}'

Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/scrape `
  -ContentType "application/json" `
  -Body '{"source": "discudemy"}'


Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/scrape `
  -ContentType "application/json" `
  -Body '{"source": "realdiscount"}'

#　wthis is test ok now
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/scrape `
  -ContentType "application/json" `
  -Body '{"source": "coupontex"}'
# simple test 
 venv\Scripts\python.exe -c "from app.scraper import scrape_source; print(len(scrape_source('coupontex')))"

# also add coursefolder 

# bash / Git Bash
curl -X POST http://127.0.0.1:8000/scrape \
  -H "Content-Type: application/json" \
  -d "{\"source\": \"couponscorpion\"}"

會花約 30–60 秒（每筆課程都要跳轉頁面 + 禮貌性延遲），回傳例如：
{"status": "completed", "scraped": 11, "inserted": 11, "skipped_duplicates": 0}

# show result
http://127.0.0.1:8000/coupons — 瀏覽器直接開這個網址也會顯示原始 JSON
```

#### prompt for UI
``` bash
現在請幫我做一個簡單的前端頁面,顯示 /coupons 端點回傳的優惠券清單。

## 技術選擇
- 不要引入 React/Vue 或任何前端建置工具(不需要 npm/webpack)
- 用 FastAPI 直接 serve 一個純 HTML + 少量 JavaScript 的頁面
- 用 fetch API 打現有的 GET /coupons 端點取得資料
- 樣式用簡單的 CSS,不需要額外的 UI 框架(不用 Bootstrap/Tailwind CDN 都可以考慮加,但保持簡單)

## 頁面需求
1. 建立 app/static/index.html,並在 app/main.py 中設定 FastAPI 的 StaticFiles 或直接回傳這個頁面在根目錄 "/"

2. 頁面內容:
   - 標題:Udemy 免費優惠券清單
   - 一個下拉選單或按鈕群組,可以依 status 篩選(all / pending / valid / expired)
   - 表格或卡片列表顯示每筆優惠券:
     - 課程名稱 (title)
     - 優惠券碼 (coupon_code)
     - 狀態 (status),用不同顏色標示(valid=綠色, expired=灰色, pending=黃色)
     - 課程連結 (course_url),點擊可開新分頁
     - 最後檢查時間 (last_checked_at)
   - 每筆資料旁邊加一個「立即驗證」按鈕,點擊後呼叫 POST /verify/{coupon_id},並即時更新該筆的狀態顯示(不用整頁重新整理)

3. 頁面載入時自動呼叫 GET /coupons 抓取並渲染資料

4. basic 的 loading 狀態顯示(抓取中顯示 "載入中...")

## 這次先不要做
- 不用做分頁 (pagination),10 筆資料先全部顯示
- 不用做搜尋功能
- 不用做響應式設計 (mobile 優化),先確保 desktop 能正常運作
- 不用加入任何登入/權限機制

## 驗收標準
- 啟動 server 後,瀏覽器打開 http://localhost:8000 能看到 10 筆資料正確顯示
- 篩選功能能正確運作
- 點擊「立即驗證」按鈕後,該筆資料狀態會更新(不用整頁刷新)
- 附上截圖說明或簡單文字描述頁面長相

請先告訴我你打算怎麼組織這個 HTML/JS 檔案(單一檔案 or 拆分),我確認後你再開始寫。

# addition 
補充決定:
- 篩選採用「前端篩選」:loadCoupons() 只呼叫一次 GET /coupons(不帶 query param)取得全部資料存在全域變數,篩選 dropdown 切換時只在前端 filter 已抓到的資料重新 render,不重打 API。
- verifyCoupon() 驗證成功後,除了更新畫面上的那一列,也要同步更新全域資料陣列中對應的物件,確保之後切換篩選時狀態是最新的。
```

#### step #3 test
``` bash
# 重新啟動
# 使用虛擬環境的 Python
venv\Scripts\uvicorn.exe app.main:app --reload
  notes:
  # 使用 系統全域的 Python
  很多人會先啟動虛擬環境，再執行： uvicorn app.main:app --reload (好像會有一些 error)
    1. 啟動 FastAPI 伺服器
    2. 預設監聽 http://127.0.0.1:8000
    3. 開啟 --reload 後，程式碼有變更就會自動重載
    4. 如果想指定其他 port，可以加 --port 8001
    5. 如果想讓外部也能連線，可以加 --host 0.0.0.0

# check 環境
# windows - cmd
echo $VIRTUAL_ENV
+ 有輸出路徑 → 目前有啟用虛擬環境（路徑就是該環境的位置）
+ 沒有輸出 → 目前使用的是系統預設環境
# windows - PowerShell
echo $env:VIRTUAL_ENV 

# check installed package 
# check bs4 need input beautifulsoup4
pip show beautifulsoup4
  Name: beautifulsoup4
  Version: 4.15.0
  Summary: Screen-scraping library
  Home-page: https://www.crummy.com/software/BeautifulSoup/bs4/
  Author: 
  Author-email: Leonard Richardson <leonardr@segfault.org>
  License: MIT License
  Location: D:\work\run\claude\udemy_search\venv\Lib\site-packages
  Requires: soupsieve, typing-extensions
  Required-by: 
pip list | grep beautifulsoup4
  beautifulsoup4    4.15.0

# terminal 自動選擇 虛擬環境, 要安裝 plugin : Python(Microsoft)
# 選擇 python (if need)
按 Ctrl + Shift + P → 輸入 Python: Select Interpreter
```

### Web 專案管理
#### 前後端安排

{% note info %}
在這種 **Next.js 16 (App Router) + Supabase** 的全端架構下，「後端」主要由 **Next.js 伺服器端（應用層後端 / BFF）** 與 **Supabase（資料與基礎設施後端）** 兩大部分組成：

---

***1. Next.js 伺服器層（應用層後端 / BFF）***
這部分程式碼完全在 Node.js / Edge Runtime 伺服器端執行，不會被打包傳送到使用者的瀏覽器：

* **proxy.ts**：Next.js 16 的全域路由攔截層，負責在請求到達頁面前處理身分驗證檢查、重新導向、Header 注入與安全性過濾。
* **Server Actions**(`'use server'`)：在伺服器端執行的非同步函式，通常用於處理表單提交、呼叫 Supabase 進行增刪查改（CRUD）、資料驗證等業務邏輯。
* **Route Handlers**(app/api/**/route.ts)：提供標準 HTTP API 端點（GET/POST/PUT/DELETE），處理 Webhook、第三方整合或特定 REST 需求。
* **React Server Components**(RSC)：雖然它負責渲染 UI，但其組件內部執行（如直接讀取 DB、呼叫後端 API、存取伺服器環境變數）的運算邏輯全在伺服器端完成，客戶端只接收編譯後的虛擬 DOM 串流。
* **伺服器端 Supabase Client**：使用 `cookies()` 管理 Session 或使用 `SUPABASE_SERVICE_ROLE_KEY` 進行特權操作（例如產生 Storage private bucket 的 signed URL、系統級排程管理）。

---

***2. Supabase 層（資料庫與 BaaS 後端）***
這是資料持久化、權限控管與身分驗證的核心後端引擎：

* **PostgreSQL 資料庫**：包含資料表（Tables）、關聯、索引，以及在資料庫內執行的 SQL Functions / Triggers。
* **Row Level Security**(RLS)：實質的後端存取控制層。即使前端直接透過 Supabase Client 查詢，資料安全性完全依賴資料庫內的 RLS 策略判定。
* **Supabase Auth**：使用者帳號管理、密碼雜湊、OAuth 整合以及 JWT Token 的簽署與驗證。
* **Supabase Storage**：負責實體檔案儲存、Private Bucket 權限隔離與 Signed URL 的產生與驗證。

---

***3. 架構劃分對照***

| 層級 | 歸屬 | 包含項目 |
| --- | --- | --- |
| **前端 / 客戶端** | 瀏覽器端 | Client Components ('use client')、React Hooks (`useState`, `useEffect`)、DOM 事件、瀏覽器端執行的 UI 互動。 |
| **應用層後端** | Next.js Server | `proxy.ts`、Server Actions、Route Handlers (`route.ts`)、RSC 伺服器邏輯、私鑰與敏感環境變數操作。 |
| **資料與服務後端** | Supabase Engine | PostgreSQL、RLS 策略、SQL Triggers、Auth 服務、Storage Private Buckets。 |

{% endnote %}

#### addition AGENTS.md 
``` bash
+ AGENTS.md 是這個專案裡給 AI 編碼代理（像我）看的說明文件,不是給一般開發者的文件。它的作用:

  1. 警告訓練資料可能過時:內容提示這個專案用的 Next.js 版本(App Router、Next 16)行為可能跟我訓練資料裡認知的不一樣,叫我動工前先去看 node_modules/next/dist/docs/ 裡實際安裝版本的官方文件,不要憑記憶亂寫。
  2. 強調要讀 deprecation notices,避免用到已棄用的 API 或慣例。
  3. 它是自動產生的:檔案本身寫明「這個區塊是 next dev 自動寫入/重新加回的,來源是 node_modules/next/dist/server/lib/generate-agent-files.js」——也就是說 Next.js 開發伺服器每次啟動時會自動確保這個檔案存在。如果你手動把它從 diff 移除,下次跑 next dev 又會被加回來,所以它建議乾脆把它跟其他變更一起 commit,保持工作區乾淨。

  在這個專案裡,CLAUDE.md 第一行用 @AGENTS.md 把它引入,所以每次我讀取 CLAUDE.md 時都會連帶讀到這份「先看新版 Next.js 文件再動工」的提醒。

# 說明
是 next dev 這個開發伺服器啟動時自動寫入/更新這個檔案的(node_modules/next/dist/server/lib/generate-agent-files.js 負責產生)。所以:
  - 你不用手動維護內容——它是工具自動生成的。
  - 你只需要在意一件事:如果 git status 顯示 AGENTS.md 有異動(因為你跑過 next dev,它被重新產生了),直接跟著這次的其他改動一起 commit 掉就好,不要刻意把它從 diff 裡刪掉或還原——因為下次再跑 next dev 它還是會被加回來,刪了也沒用,只會讓工作區一直顯示髒污。
  換句話說:內容不用你管,但它造成的 git diff 要處理(commit 掉),不能無視或反覆還原。
```

#### setup issue
##### windows supabase start issue
``` bash
# claude code : 透過 scoop 將 Supabase CLI 從 2.67.1 升級到 2.115.0
舊版 CLI 無法識別新的 config.toml 鍵——db.health_timeout、experimental.pgdelta、local_smtp

```

##### npm run seed issue
``` bash
# run supabase status show key

# 填 .env.local
NEXT_PUBLIC_SUPABASE_ANON_KEY --> Authentication Keys : Publishable
SUPABASE_SERVICE_ROLE_KEY --> Authentication Keys :  Secret
NEXT_PUBLIC_DEMO_MODE= --> true (可顯示測試帳號清單)
```

#### deploy ro vercel
``` bash
# generate command
help me create my custom command in @.claude/commands/deploy_vercel.md . I want to deploy my local project to vercel. Once done, give me the url to see my project on the internet.

# vercel login
! vercel login

```

#### 1st prompt
``` bash
# 專案背景

你要協助我建立一套「Web 案件與裝修工程管理系統 (V3)」。這是一間室內設計／裝修統包公司的內部管理系統，業務涵蓋室內設計、裝修統包、水電/木作工程、軟裝設計及室內裝修許可申請。使用者約 10 位設計師，加上工務主管、財務、文管與系統管理員等角色，目前案件資料散落在 Excel、LINE 與個人紀錄中，需要集中雲端化。

正式上線日為 2026 年 9 月 30 日，之後有 10/1～10/14 的 Hypercare 穩定期。整個系統會分成多個階段開發，這次只做「Phase 1」，請不要提前實作後續階段的功能（案件管理、工作台、報表等），但架構要為它們預留空間。

# 技術與環境規格（必須遵守，不可自行更換）

- 前端框架與語言：Next.js（App Router）+ TypeScript + Tailwind CSS
- 後端與資料庫（BaaS）：Supabase（PostgreSQL、Auth、Storage、Database Triggers）
- 本機開發：使用 Supabase CLI + Docker 的 Local Supabase，之後用 `supabase db diff` 產生 migration，用 `supabase db push` 同步到雲端
- 部署與維運：Vercel，正式站（Production／main 分支）與測試站（Staging／Preview 分支）分離
- 版本控制：Git，commit 訊息需清楚、可讀（不需要遵循特定 convention，但每個功能區塊應獨立 commit）
- 程式碼、資料庫皆不可混淆或加密，未來要能完整交接給非本人團隊維護

# Phase 1 範圍：系統架構建立、資料庫建置、測試站部署、登入權限功能

請完成以下項目：

## 1. 專案初始化
- 使用 `create-next-app` 建立 TypeScript + Tailwind 的 Next.js 專案（App Router）。
- 建立清楚的資料夾結構，例如：`app/`、`components/`、`lib/`（含 supabase client 初始化）、`supabase/`（migrations、seed）、`types/`。
- 設定 ESLint / Prettier 基本規則。
- 建立 `.env.example`，列出所需環境變數（Supabase URL、anon key、service role key 等），並在 README 說明如何設定 `.env.local`，切勿把任何金鑰寫死進程式碼或提交進版控。

## 2. Supabase 資料庫與角色設計
- 用 `supabase init` 建立本機 Supabase 專案，用 migration 檔案（不要用 Studio 手動改）定義以下最小資料表：
  - `profiles`：對應 `auth.users`，欄位至少包含姓名、員工編號、Email、所屬部門/職稱、系統角色、帳號啟用狀態。
  - 角色 enum／查照表：`設計師 (designer)`、`工務主管 / 專案主管 (project_manager)`、`財務 (finance)`、`文管 (doc_control)`、`系統管理員 (admin)`。
- 撰寫 RLS（Row Level Security）政策的基礎版本：
  - 一般使用者只能讀取/更新自己的 `profiles` 資料。
  - `admin` 角色可以讀取與管理所有使用者資料。
  - 其餘角色的資料存取權限先預留 policy 骨架與註解，實際案件資料表要等 Phase 2 才建立。
- 提供一支 seed script，建立 5 個測試帳號（每個角色各一個），方便之後 Demo 與驗收使用。
- 資料庫的所有結構異動都必須以 migration 檔案呈現在 `supabase/migrations/`，確保未來可用 `supabase db push` 完整重現。

## 3. 登入與權限（IAM）
- 使用 Supabase Auth 實作 Email + 密碼登入頁面（不需要註冊頁，帳號一律由管理員建立）。
- 登入後依照角色導向對應介面；若尚未開發對應功能頁面，先顯示「功能開發中」的佔位頁即可，但選單必須依照下列 6 大模組先建好（Sidebar 導覽，非登入角色看不到不屬於自己的項目）：
  1. 工作台 (My Workspace)
  2. 案件管理 (Cases)
  3. 派案中心 (Dispatch)（僅 project_manager / admin 可見）
  4. 財務概況 (Finance)（僅 finance / admin 可見）
  5. ISO 文管 (Documents)
  6. 統計報表 (Reports)
- 實作路由層級的權限保護（middleware 或 layout 內檢查），未登入使用者導向登入頁；已登入但角色不符者不可硬用網址直接進入受限頁面。
- 右上角顯示目前登入使用者姓名與角色，並提供登出功能。

## 4. 部署與環境分離
- 建立 GitHub repository（若尚未初始化，請先 `git init` 並建立初始 commit）。
- 說明並設定 Vercel 專案，讓 `main` 分支對應正式站、其他分支（例如 `staging`）對應測試站 Preview，並在 README 記錄設定步驟（因為實際串接 GitHub/Vercel 帳號需要我本人操作，你可以先把設定步驟、需要哪些環境變數、Build Command 等寫清楚，讓我照著做）。
- 列出正式站與測試站分別需要哪些 Supabase 專案／環境變數（是否共用一個 Supabase 專案用不同 schema，或是建立兩個 Supabase 專案，請你先給我建議並說明理由，再依你的建議實作，若不確定就先問我）。

## 5. 文件產出
- 撰寫 `README.md`，涵蓋：專案簡介、技術棧、本機啟動步驟（含 Supabase Local 啟動指令）、環境變數說明、Migration 使用方式、測試帳號清單。
- 完成後，輸出一份 `PHASE1_SUMMARY.md`，列出：已完成項目、對照下方「驗收標準」逐項確認結果、任何與規格不符或需要我確認的地方、已知限制或技術債。

# 開發原則

- 如果規格書內容有模糊、矛盾或需要我做決定的地方（例如：Supabase 專案要用單一專案分 schema 還是分兩個專案），請先列出問題清單問我，不要自行假設後直接動工。
- 保持架構乾淨、前後端分離、不要寫死商業邏輯在 UI 元件裡，方便後續 Phase 擴充案件管理、工作台、報表等模組。
- 不需要現在就做 RWD 精雕細琢，但至少要在桌機瀏覽器（1280px 以上）正常可用。
- 每完成一個子項目就進行一次 commit，方便我追蹤進度。

# Phase 1 驗收標準（Gate）

完成後系統應該要能做到：

1. 本機可用 `supabase start` 啟動資料庫，`npm run dev` 啟動網站，兩者串接正常。
2. 5 個測試角色帳號都能登入，且登入後只看得到自己角色該有的選單項目。
3. 未登入或角色不符時，直接輸入受限頁面網址會被擋下並導向適當頁面（登入頁或無權限提示）。
4. 資料庫結構完全由 migration 檔案定義，可在乾淨環境重新 `supabase db reset` 後仍能正確重建並跑通 seed。
5. README 與 PHASE1_SUMMARY 清楚到位，讓非本人也能照著文件把系統跑起來。

完成後請先停在這裡，等我驗收通過，我會再提供 Phase 2（案件管理模組）的 prompt。
```

#### 簡單調色
``` bash
請針對目前已完成的畫面（登入頁、Sidebar、Layout）做一次輕量視覺調整，不要改動任何功能邏輯或元件結構：
- 統一配色：選一組中性、專業的色票（例如深藍/靛色作主色，搭配灰階背景與白色卡片），套用在 Sidebar、按鈕、狀態標籤上
- 確保 focus 狀態、hover 狀態有基本回饋
- 統一字體大小與間距的層級（標題/內文/說明文字要有清楚區分）
完成後告訴我具體改了哪些檔案，不要動到 RLS、路由保護或資料庫相關程式碼。
```

#### 修正左下方一片黑
```
請針對目前已完成的畫面（登入頁、Sidebar、Layout）做一次輕量視覺調整，不要改動任何功能邏輯或元件結構：
- 修正 Sidebar 版面 bug：目前 Sidebar 外層容器背景是深色，但選單項目子容器是白底且高度沒有撐滿，導致選單下方露出一大塊突兀的深色/黑色空白。請讓 Sidebar 整體背景色與選單樣式一致、並撐滿整個側邊欄高度。
- 統一配色：選一組中性、專業的色票（例如深藍/靛色作主色，搭配灰階背景與白色卡片），套用在 Sidebar、按鈕、狀態標籤上
- 確保 focus 狀態、hover 狀態有基本回饋
- 統一字體大小與間距的層級（標題/內文/說明文字要有清楚區分）
完成後告訴我具體改了哪些檔案，不要動到 RLS、路由保護或資料庫相關程式碼。
```

#### phase 2 prompt
``` bash
# 專案背景

延續 Phase 1 已完成的「Web 案件與裝修工程管理系統 (V3)」。Phase 1 已完成：Next.js + Supabase 專案骨架、profiles/角色資料表與 RLS 基礎、登入與角色導向選單（工作台/案件管理/派案中心/財務概況/ISO 文管/統計報表 6 大模組佔位）、測試站部署。

這次要做「Phase 2」：把「案件管理」與「派案中心」兩個模組的核心功能實作出來，取代目前的「功能開發中」佔位頁。開始動工前，請先自己讀一次目前專案的 README、資料夾結構與現有 migration，確認接續得上 Phase 1 的成果，不要重新設計已經定案的角色/選單架構。

請不要提前實作：三日期里程碑細節管理、進度回報、附件上傳、Audit Trail、財務期款、ISO 文管、報表 Dashboard——這些都是 Phase 3、4 的範圍，Phase 2 只做「案件資料本身」與「派案流程」。

# 技術與環境規格（沿用 Phase 1，不可更換）

- Next.js（App Router）+ TypeScript + Tailwind CSS
- Supabase（PostgreSQL、Auth、RLS），本機用 Local Supabase (CLI/Docker)，用 `supabase db diff` 產生新的 migration 檔案，不要用 Studio 手動改 schema
- 所有資料庫異動一律以新的 migration 檔案呈現，銜接在 Phase 1 既有 migration 之後
- Git：每完成一個子項目獨立 commit

# Phase 2 範圍：案件主檔、建案、待派、派案及核心輸入功能

## 1. 案件主檔資料表設計（`cases`）

請設計並用 migration 建立案件主檔資料表，至少包含以下欄位（可依你的專業判斷補充必要欄位，但請在 PHASE2_SUMMARY 中列出你額外加的欄位與原因）：

- `case_id`：系統自動產生的唯一案件編號，格式為 `DX` + 西元年後兩碼 + 月份（2碼）+ `-` + 該月流水號（3碼），例如 `DX2608-001`；請用資料庫層（sequence/trigger 或等效機制）確保產生方式穩定且不會重複，不要單純用前端亂數。
- `case_name`：案件名稱（必填）
- `client_name`：客戶名稱（必填）
- `project_type`：專案類型，enum：室內設計案 / 景觀規劃案 / 建築全案設計 / 裝修工程統包
- `case_mode`：案件模式，enum：純設計案 / 純工程案 / 設計+工程統包（這個欄位會決定 Phase 3 要套用哪一組里程碑範本，這裡先只存值，不用實作里程碑邏輯）
- `source`：案件來源，enum：舊客回流 / 官方網站諮詢 / 同行轉介 / 公開競標案
- `planned_start_date`：預計啟動日期
- `planned_delivery_date`：預計交付日期（必須晚於啟動日期，請做欄位層級或表單層級的驗證）
- `description`：案件概述與需求備註（多行文字）
- `status`：案件狀態，enum：草稿 / 待派 / 已派案 / 進行中 / 已完成 / 取消
- `primary_designer_id`：主責設計師（FK 至 profiles，派案後才會有值）
- `priority`：派案優先級，enum：一般 / 優先 / 緊急（派案後才會有值）
- `milestone_template`：里程碑範本選擇，enum：標準住宅範本 / 商辦設計範本 / 快速變更範本（派案後才會有值，Phase 3 才會用到實際邏輯）
- `assignment_notes`：指派說明與交辦事項
- `created_by` / `created_at` / `updated_at` / `assigned_by` / `assigned_at`

另外請建立一張 `case_collaborators`（或你認為更合適的命名）多對多關聯表，記錄協同設計師/助理，一個案件可以有 0～多位協同人員。

## 2. RLS 權限規則

- `admin`、`project_manager`：可以讀取、新增、修改所有案件。
- `designer`：只能讀取自己是 `primary_designer_id` 或在 `case_collaborators` 內的案件，不能新增案件、不能修改案件主檔欄位（Phase 3 才開放他們更新自己案件的進度相關欄位）。
- `finance`、`doc_control`：這個階段先不開放存取 `cases` 表（維持 Phase 1 選單看不到「案件管理」「派案中心」的邏輯），除非你覺得有正當理由需要唯讀權限，若有請先問我再做。

## 3. 新增案件頁面（Create Case Form）

- 路徑掛在「案件管理」模組下。
- 欄位對應上面 `cases` 表可在建案階段填寫的部分（`case_id` 顯示為系統自動產生、唯讀）。
- 提供「存為草稿」（狀態＝草稿）與「建立案件並送至待派池」（狀態＝待派）兩個動作。
- 表單驗證：必填欄位、交付日期必須晚於啟動日期。
- 僅 `project_manager` 與 `admin` 可以看到並使用此頁面。

## 4. 待派案件清單與派案流程（Dispatch）

在「派案中心」模組下（僅 `project_manager` / `admin` 可見）：

- 待派案件清單（Unassigned Cases Table）：列出所有狀態為「待派」的案件，至少顯示 Case ID、案件名稱、客戶名稱、案件類型、建立時間。
- 設計師即時負載顯示：在派案時，顯示 10 位設計師目前「進行中」案件數量（可用簡單的顏色分級，例如 0 件、1-2 件、3 件、4 件以上，門檻你可以自行合理設定，並在 PHASE2_SUMMARY 說明）。
- 派案表單（Modal 或獨立頁面均可）：選擇主責設計師（必填）、協同設計師（可複選、非必填）、派案優先級、里程碑範本、指派說明，送出後將案件狀態改為「已派案」，並記錄 `assigned_by`、`assigned_at`。
- 派案動作完成後，該案件應該從待派清單消失，並可在案件列表中查到目前狀態。

## 5. 案件列表／案件管理主頁（輕量版）

- 在「案件管理」模組首頁，提供一個簡易的案件列表：顯示所有案件（依角色權限過濾），至少可依「狀態」篩選、依 Case ID 或案件名稱做關鍵字搜尋。
- 這裡先做「堪用」的列表即可，不需要規格書中「進階綜合查詢」的完整欄位篩選與 Excel 匯出，那是 Phase 4 的範圍。
- 設計師登入後，「案件管理」列表應該只看得到自己被指派或協同的案件；`project_manager`/`admin` 看得到全部。

## 6. 工作台（輕量版，僅供銜接）

- 目前「工作台」頁面先只顯示登入者自己名下（`primary_designer_id` 或協同）的案件清單卡片（Case ID、案名、客戶、狀態），不需要進度回報、卡關、里程碑等互動功能，那些留給 Phase 3。

# 開發原則

- 若規格有模糊或需要我決定的地方（例如：里程碑範本的實際內容、優先級的顏色門檻、`case_mode` 是否要在建案階段就選還是派案階段才選），請先列出問題清單問我，不要自行假設後直接動工——`case_mode` 這點尤其重要，請務必先跟我確認要放在「新增案件」還是「派案」表單。
- Case ID 產生邏輯務必在資料庫層保證不重複，並考慮月份切換時流水號重置的情境，寫一個簡單的測試或說明文件證明這件事有處理好。
- 沿用 Phase 1 的元件與樣式風格（Sidebar、卡片、按鈕等），不要另外發明一套新的視覺語言。
- 不要改動 Phase 1 已經驗收過的登入、RBAC、Sidebar 選單顯示邏輯，除非是因為這次新增模組需要的最小必要調整（例如把佔位頁換成真正頁面），若需要調整既有程式碼請在 commit message 或 PHASE2_SUMMARY 說明原因。
- 每完成一個子項目就進行一次 commit。

# Phase 2 驗收標準（Gate）

完成後系統應該要能做到：

1. `project_manager`/`admin` 登入後可以成功新增一筆案件（存草稿與直接送待派兩種路徑都要能跑），系統會自動產生格式正確且不重複的 Case ID。
2. 待派案件清單正確顯示所有「待派」狀態案件，派案後案件會從清單消失、狀態變成「已派案」，且能在案件列表查到正確的主責設計師。
3. 派案時能看到設計師目前的負載數字，數字要能反映「進行中」案件的實際數量（可用手動調整測試資料驗證）。
4. 設計師帳號登入後，「工作台」與「案件管理」都只看得到自己被指派/協同的案件，看不到別人的案件，也無法透過網址直接存取不屬於自己的案件詳情（用瀏覽器直接打 URL 測試要被擋下）。
5. `finance`、`doc_control` 帳號登入後，仍然看不到「案件管理」「派案中心」選單與頁面。
6. 資料庫結構全部由 migration 檔案定義，`supabase db reset` 後可完整重建。
7. 輸出 `PHASE2_SUMMARY.md`：列出已完成項目、對照上述驗收標準逐項確認結果、你額外新增的欄位與理由、任何與規格不符或需要我確認的地方。

完成後請先停在這裡，等我驗收通過，我會再提供 Phase 3（設計師工作台、三日期里程碑、Audit Trail）的 prompt。
```

#### phase 3 prompt
``` bash
# 專案背景

延續 Phase 1、Phase 2 已完成的「Web 案件與裝修工程管理系統 (V3)」。目前狀況：

- Phase 1：Next.js + Supabase 專案骨架、profiles/角色資料表與 RLS、登入與角色導向 Sidebar。
- Phase 2：`cases` 案件主檔（含 `case_mode`、`milestone_template` 欄位）、`case_collaborators`、新增案件、待派清單與派案流程、輕量版案件列表與工作台（工作台目前只列出案件卡片，沒有互動功能）。

開始動工前，請先自己讀一次目前專案的 README、資料夾結構、既有 migration 與 `cases`/`case_collaborators` 的欄位設計，確認接續得上，不要重新設計已經定案的資料表。

這次要做「Phase 3」：把「設計師/工務工作台」做成完整可用的版本，並實作三日期里程碑控管、進度回報、附件上傳、Audit Trail。這是整個系統裡最核心、最常被日常操作的部分，請特別注意易用性。

請不要提前實作：財務期款與現金流、ISO 文管收發文、進階查詢與 Dashboard、全域稽核軌跡查詢頁面——這些是 Phase 4 的範圍。Phase 3 的 Audit Trail 只需要做好「資料被完整記錄」與「單一案件的歷程時間軸」，不需要做跨案件的全域查詢/篩選介面。

# 技術與環境規格（沿用 Phase 1/2，不可更換）

- Next.js（App Router）+ TypeScript + Tailwind CSS
- Supabase（PostgreSQL、Auth、RLS、Storage、Database Triggers），本機用 Local Supabase (CLI/Docker)，用 `supabase db diff` 產生新的 migration 檔案，銜接在既有 migration 之後，不要用 Studio 手動改 schema
- Git：每完成一個子項目獨立 commit

# Phase 3 範圍

## 1. 里程碑範本與資料表（`milestones`）

- 建立 `milestones` 資料表：`case_id`（FK）、`milestone_name`、`stage`（enum：設計段 / 工程段）、`sequence_order`、`planned_date`（計畫完成日期）、`latest_estimated_date`（最新完成日期）、`actual_date`（實際完成日期）、`created_at`、`updated_at`。
- 定義兩組固定里程碑範本內容（可用 seed 資料或程式碼常數表示，不一定要另建資料表，但要讓「標準住宅範本／商辦設計範本／快速變更範本」都能對應出一組里程碑清單，若你認為三個範本內容應該不同，請先列出你規劃的三組內容問我確認，不要自行憑空決定）：
  - 設計段：現場丈量 → 概念提案 → 平面配置 → 3D 渲染 → 施工圖交付
  - 工程段：室裝審查許可 → 開工進場 → 水電泥作 → 木作油漆 → 完工驗收
  - `case_mode = 純設計案` 只產生設計段里程碑；`純工程案` 只產生工程段；`設計+工程統包` 兩段都要。
- 派案完成（Phase 2 的派案動作）時，系統應自動依 `case_mode` 與 `milestone_template` 產生對應的 `milestones` 列，`planned_date` 初始可先留空或帶入合理預設值（例如依案件的 `planned_delivery_date` 反推，若不確定怎麼給初始值，請先問我）。
- 里程碑一旦產生，`planned_date` 預設鎖定（只有 `admin` 可以重置初始值），`latest_estimated_date` 與 `actual_date` 由設計師或主管在使用過程中維護。

## 2. 里程碑日期調整（Milestone Date Edit）

- 提供調整單一里程碑 `latest_estimated_date` / `actual_date` 的介面（Modal 或獨立頁面）。
- 欄位：里程碑名稱（唯讀）、計畫完成日期（唯讀，僅 admin 可見「重置」選項）、最新完成日期（必填）、實際完成日期（完工時才填）、時程異動原因分類（enum：客戶需求變更 / 追加預算修改 / 審查延誤 / 內部資源調度）、詳細異動說明（必填多行文字）。
- **關鍵要求**：這個動作必須用一個資料庫函式（RPC，例如 `update_milestone_date(...)`）在同一個交易內完成「更新 milestones 資料」與「寫入 Audit Log」，不要只靠前端分兩次呼叫，避免只改到日期卻漏寫稽核紀錄。
- 權限：主責設計師與協同設計師可以調整自己案件的里程碑；`project_manager`/`admin` 可以調整所有案件。

## 3. 進度回報（Progress Update）

- 建立 `case_progress_updates` 歷史紀錄表：`case_id`、`reported_by`、`report_date`、`current_stage`（對應目前所在里程碑階段）、`progress_percent`（0～100）、`summary`（本週進度摘要，必填）、`has_blocker`（布林）、`blocker_type`、`blocker_reason`。
- `blocker_type` enum 請使用以下裝修實務選項：管委會施工許可審查延誤 / 室裝審查（審查機構/建築師）補件 / 現場結構與原圖不符需變更設計 / 業主追加或減工項確認中 / 缺料或特定工種工班調度衝突 / 其他。
- 每次送出進度回報時，除了寫入歷史表，也請同步更新 `cases` 上的「目前快照」欄位（例如 `current_progress_percent`、`current_stage`、`has_active_blocker`），方便工作台與之後 Phase 4 的報表用簡單查詢就能拿到最新狀態，不用每次都算歷史表的最新一筆。
- 表單：案件選取（唯讀帶入）、當前階段狀態（單選）、總體完成進度（滑桿或數字框）、本週進度摘要（必填）、是否遭遇卡關（切換開關，開啟後卡關類型與卡關原因必填）。
- 權限：主責設計師與協同設計師可對自己的案件送出進度回報；`project_manager`/`admin` 可檢視所有案件的進度回報，不需要能代替設計師送出（若你認為主管也該能代填，請先問我）。

## 4. 附件上傳（Attachments）

- 使用 Supabase Storage 建立一個 bucket（例如 `case-attachments`），搭配 `case_attachments` 資料表：`case_id`、`uploaded_by`、`file_path`、`display_name`、`category`（enum：合約協議 / CAD 圖資 / 3D 效果圖 / 會議紀錄 / 變更設計單 / 驗收文件）、`file_size`、`uploaded_at`。
- 上傳介面：支援拖曳上傳，限制副檔名（PDF, DWG, PNG, JPG, ZIP）與單檔大小（50MB），上傳後顯示於案件詳情頁的附件清單，可下載。
- 用 Storage 的 RLS / signed URL 機制確保只有該案件的主責設計師、協同設計師、`project_manager`、`admin` 能下載附件，不要做成公開連結。

## 5. Audit Trail 基礎建設

- 建立通用的 `audit_logs` 資料表：`table_name`、`record_id`、`field_name`、`old_value`、`new_value`、`changed_by`、`changed_at`、`reason`（可為空，里程碑日期變更時一定要有值）。
- 對 `cases` 與 `milestones` 的重要欄位（狀態、三個日期、主責設計師）建立 Trigger，任何 UPDATE 都自動寫入 `audit_logs`（記錄修改前後數值、修改人、修改時間），不要仰賴應用層自己記得寫，避免漏記。
- 在案件詳情頁面新增一個「異動歷程」時間軸區塊，依時間排序顯示該案件（含其里程碑）的所有稽核紀錄，這是給單一案件看的簡易版，不需要跨案件篩選查詢（那是 Phase 4 全域稽核頁面的範圍）。

## 6. 設計師 / 工務工作台完整版

把 Phase 2 的輕量版工作台，升級為規格書要求的完整介面：

- 進行中案件列表（含卡關警示標籤、逾期提醒標籤——逾期可先用「最新完成日期 < 今天且尚無實際完成日期」判斷）。
- 每張案件卡片可展開看到該案件目前的里程碑清單與三個日期。
- 提供「更新進度」與「調整里程碑日期」的快速入口（開啟對應的 Modal）。
- 附件上傳入口整合在案件詳情頁或工作台內。

# 開發原則

- 里程碑範本的實際內容、初始 `planned_date` 給值邏輯、主管是否可代填進度——這幾點規格沒有寫死，請先列出問題清單問我確認，不要自行假設後直接動工。
- 稽核紀錄的正確性優先於其他一切，寧可多記錄也不要漏記；請特別針對「里程碑日期變更一定要有 Audit Log」這件事寫測試或至少手動驗證流程並記錄在 PHASE3_SUMMARY。
- 沿用既有的元件與視覺風格，不要另外發明新的設計語言。
- 不要改動 Phase 1、Phase 2 已驗收的登入、RBAC、派案流程邏輯，除非是這次新增功能需要的最小必要調整，若需調整請在 commit message 或 PHASE3_SUMMARY 說明原因。
- 每完成一個子項目就進行一次 commit。

# Phase 3 驗收標準（Gate）

完成後系統應該要能做到：

1. 案件派案完成後，會依 `case_mode` 自動產生對應的里程碑列表（純設計案/純工程案/統包案各測一筆驗證）。
2. 設計師可以在工作台對自己的案件送出進度回報，包含開啟卡關並填寫卡關類型與原因，送出後工作台與案件詳情頁都能看到最新狀態。
3. 調整里程碑的最新完成日期或實際完成日期時，若未填寫異動原因無法送出；送出後可在該案件的異動歷程時間軸看到這筆變更（含修改前後數值、修改人、修改時間）。
4. 附件可以成功上傳並下載，非該案件相關人員（用另一個設計師帳號測試）無法取得附件下載連結。
5. 直接對 `cases`/`milestones` 資料表做一次日期異動（例如透過 SQL 或另一支測試 API），確認 Trigger 有自動寫入 `audit_logs`，不依賴應用層程式碼是否記得呼叫。
6. 資料庫結構全部由 migration 檔案定義，`supabase db reset` 後可完整重建。
7. 輸出 `PHASE3_SUMMARY.md`：列出已完成項目、對照上述驗收標準逐項確認結果、里程碑範本與初始值的實際規劃內容、任何與規格不符或需要我確認的地方。

完成後請先停在這裡，等我驗收通過，我會再提供 Phase 4（查詢報表、Dashboard、20 件真實資料 UAT）的 prompt。
```

#### phase 3.5
``` bash
# 專案背景

延續 Phase 1～3 已完成的「Web 案件與裝修工程管理系統 (V3)」。目前狀況：

- Phase 1：專案骨架、profiles/角色資料表與 RLS、登入與角色導向 Sidebar。
- Phase 2：`cases` 案件主檔、`case_collaborators`、新增案件、待派清單與派案流程、案件列表與工作台。
- Phase 3：`milestones` 里程碑資料表與自動產生邏輯、里程碑日期調整（含強制填寫理由）、`case_progress_updates` 進度回報、`case_attachments` 案件附件上傳（Supabase Storage + 權限控管，非公開連結）、通用 `audit_logs` 稽核紀錄與案件異動歷程時間軸、完整版工作台。

開始動工前，請先自己讀一次目前專案的 README、資料夾結構與既有 migration，尤其是 `cases`、`audit_logs`、`case_attachments` 的欄位設計，確認接續得上，不要重新設計已經定案的資料表或稽核機制。

這次要做「Phase 3.5」（這是規格書原本六階段付款表沒有排入、但屬於規格書「核心功能規格」第 5 項的模組，補在這裡做，以便銜接之後 Phase 4 的財務/文管相關報表）：把「財務、追加減與文管模組」的 4 個輸入頁面做出來，取代目前「財務概況」「ISO 文管」選單的「功能開發中」佔位頁。

請不要提前實作：財務/文管相關的查詢報表、Dashboard、Excel 匯出、全域稽核軌跡查詢頁面——這些是 Phase 4 的範圍，Phase 3.5 只做「資料輸入」與最基本的「這裡有什麼」列表，不做進階篩選統計。

# 技術與環境規格（沿用 Phase 1~3，不可更換）

- Next.js（App Router）+ TypeScript + Tailwind CSS
- Supabase（PostgreSQL、Auth、RLS、Storage），本機用 Local Supabase (CLI/Docker)，用 `supabase db diff` 產生新的 migration 檔案，銜接在既有 migration 之後
- 沿用 Phase 3 已經建立的 `audit_logs` 通用稽核機制與 Trigger 寫法：這次新增的合約金額、期款狀態、收款狀態等重要欄位異動，也要比照辦理自動寫入 `audit_logs`，不要漏掉
- Git：每完成一個子項目獨立 commit

# Phase 3.5 範圍

## 1. 合約與期款設定（Contract & Payment Terms）

- `contracts` 資料表：`case_id`（FK，一個案件目前先假設對應一份合約，若你認為應該允許一案多約，請先問我）、`contract_no`、`amount_pretax`（未稅合約總額）、`tax_amount`（稅額 5%，可用 generated column 或應用層計算，兩者擇一並說明原因）、`amount_total`（含稅總額）、`signed_date`、`created_by`、`created_at`。
- `contract_payment_terms` 資料表（一份合約可有多期）：`contract_id`（FK）、`term_name`（例如「第一期 簽約款」）、`percentage`、`expected_amount`（依比例換算）、`trigger_condition`（請款觸發條件文字說明）、`sequence_order`。前端需檢查所有期別的 `percentage` 加總等於 100%，不等於時要擋下不給送出。
- `contract_addons` 資料表（因應 v2 規格書要求的「工程追加減」，避免完工時帳目對不上原合約金額）：`contract_id`（FK）、`addon_name`、`amount`（可正可負）、`reason`、`addon_date`、`created_by`。
- 表單：新增/編輯合約（含動態增刪期款列）、獨立的「新增追加減款項」表單。
- 權限：`finance`、`admin` 可以完整讀寫；`project_manager` 對自己負責案件的合約僅唯讀（若你認為主管不需要看到金額，請先問我，不要自行假設要不要開放）；`designer`、`doc_control` 這階段不開放存取。

## 2. 請款／收款紀錄登打（Invoice & Cash Flow Entry）

- `invoice_records` 資料表：`contract_payment_term_id`（FK，關聯到請款是哪一期）、`invoice_amount`（含稅，預設帶入該期 `expected_amount`，可微調）、`invoice_date`、`invoice_no`、`payment_status`（enum：待開票 / 已請款待入帳 / 已全額收款 / 逾期未付）、`actual_received_date`（狀態為已收款時必填）、`actual_received_amount`、`bank_fee`（匯款手續費/折讓，預設 0）、`notes`（收款備註/水單編號）。
- 表單：選擇案件與期別後（連動下拉，選了案件才能選該案件底下的期款），帶入預設請款金額，其餘欄位手動填寫。
- 權限：同上，`finance`/`admin` 可讀寫，`project_manager` 唯讀（比照合約模組），其餘角色不開放。

## 3. ISO 收發文登記（ISO In/Out Dispatch Form）

- `iso_documents` 資料表：`dispatch_type`（enum：外部來文 / 內部發文）、`iso_doc_no`（系統自動跳號，格式 `ISO-{西元年}-{三碼流水號}`，例如 `ISO-2026-088`，請用資料庫層機制確保不重複，比照 Phase 2 Case ID 的做法）、`original_doc_no`（原文字號/對方文號）、`subject`（公文主旨，必填）、`counterpart_unit`（來文/受文單位，必填）、`dispatch_date`、`related_case_id`（FK，可為空，非必須關聯案件）、`urgency`（enum：普通 / 速件 / 最速件）、`confidentiality`（enum：普通 / 機密）、`created_by`、`created_at`。
- `iso_document_handlers`：多對多關聯表，記錄承辦/會簽人員（多選）。
- 表單：登記表單（含關聯案件的下拉搜尋選單，可選「無關聯」）。
- 權限：`doc_control`、`admin` 可完整讀寫；其餘角色這階段不開放（若某案件的 `project_manager` 應該要能看到跟自己案件相關的收發文，請先問我要不要開放唯讀，不要自行假設）。

## 4. 文管附件與圖資上傳（含版本控管）

- 這裡指的是「一般文件版本管理」，跟 Phase 3 的 `case_attachments`（案件日常附件，例如設計圖稿）用途不同，這裡著重在合約掃描檔、ISO 附件、正式文件的**版本追蹤**。請先判斷：要新增一張獨立的 `documents` 資料表（建議欄位：`related_case_id` 可為空、`related_iso_document_id` 可為空、`category`、`display_name`、`version_number`、`version_note`、`storage_path`、`confidentiality_level`、`is_current_version`、`supersedes_document_id` 自我關聯指向前一版、`uploaded_by`、`uploaded_at`），還是擴充 Phase 3 的 `case_attachments` 加上版本欄位就好。這兩種做法你各有取捨，**請先列出你的建議與理由問我**，確認後再動工，不要自己選一個就直接刻資料庫。
- 上傳時可選擇「這是新文件」或「這是既有文件的新版本」，選新版本時要延續前一版的顯示名稱與分類，`version_number` 依你規劃的規則遞增（例如 v1.0 → v1.1），並把前一版的 `is_current_version` 改為 false。
- 分類（`category`）：合約協議 / CAD 圖資 / 3D 效果圖 / 會議紀錄 / 變更設計單 / 驗收文件。
- 沿用 Phase 3 已經做好的 Storage 權限機制（private bucket + 依權限核發 signed URL，不做公開連結），機密等級（`confidentiality_level`：公開 / 僅專案成員 / 僅主管與財務）需要真的影響下載權限判斷，不能只是顯示用的標籤。

## 5. 最基本的列表頁（先求堪用，不做進階查詢）

在「財務概況」與「ISO 文管」兩個模組首頁，各提供一個簡單列表：

- 財務概況：合約清單（可依案件搜尋）、請款/收款清單（可依狀態粗略篩選：待開票/待入帳/已收款/逾期）。
- ISO 文管：收發文清單（可依收發類別、關聯案件粗略篩選）、文件版本庫（列出目前版本，點開可看歷史版本）。
- 這些列表只需要堪用即可，完整的進階篩選、統計圖表、Excel 匯出留給 Phase 4。

# 開發原則

- 有幾個地方規格沒寫死，請務必先問我再動工，不要自行假設：一案是否只能對一份合約、`project_manager` 對財務資料/ISO 收發文是否該有唯讀權限、`documents` 版本控管要獨立建表還是擴充 `case_attachments`。
- 合約金額、期款狀態、收款狀態的異動，比照 Phase 3 的做法自動寫入 `audit_logs`，這塊涉及金錢，稽核紀錄不能漏。
- 沿用既有的元件與視覺風格，不要另外發明新的設計語言。
- 不要改動 Phase 1～3 已驗收的功能與資料表，除非是這次新增功能需要的最小必要調整，若需調整請在 commit message 或 PHASE3.5_SUMMARY 說明原因。
- 每完成一個子項目就進行一次 commit。

# Phase 3.5 驗收標準（Gate）

完成後系統應該要能做到：

1. `finance`/`admin` 可以成功建立一份合約與其期款拆分（期款比例加總須為 100% 才能送出），並能新增一筆追加減款項。
2. `finance`/`admin` 可以針對某一期期款登打請款/收款紀錄，狀態變化（待開票 → 已請款待入帳 → 已全額收款/逾期未付）與相關金額欄位的異動能在 `audit_logs` 查到紀錄。
3. `doc_control`/`admin` 可以成功登記一筆 ISO 收發文，`iso_doc_no` 自動產生且格式正確、不重複（比照 Phase 2 Case ID 的驗證方式測試）。
4. 可以上傳一份文件、再針對同一份文件上傳「新版本」，系統正確遞增版號並把舊版標記為非目前版本，兩個版本都還能個別下載。
5. 用 `designer` 帳號登入，確認看不到「財務概況」「ISO 文管」選單與頁面（除非你們討論後決定要給 `project_manager` 開唯讀，這點依討論結果驗收）。
6. 資料庫結構全部由 migration 檔案定義，`supabase db reset` 後可完整重建。
7. 輸出 `PHASE3.5_SUMMARY.md`：列出已完成項目、對照上述驗收標準逐項確認結果、`documents` 資料表的設計決策與理由、任何與規格不符或需要我確認的地方。

完成後請先停在這裡，等我驗收通過，我會再提供 Phase 4（查詢報表、Dashboard、20 件真實資料 UAT）的 prompt。
```

#### session 交接檔
``` bash
# Phase 3.5 尾聲的總結
# 在準備結束 Phase 3.5 的 Session 時，直接請 Claude 產出一份專案現況與交接檔。
指令範例： 我們已經完成 Phase 3.5。請幫我總結目前的專案架構、已建立的資料庫結構 (schema)、核心邏輯，以及 Phase 4 的待辦事項，並將其整理儲存為 docs/phase3_5_handover.md。

# Phase 4 的啟動
# 開啟全新的 Session，並將這份交接檔與新的目標餵給它。
指令範例： read docs/phase3_5_handover.md。請先閱讀這份架構文件，我們現在基於這個基礎，開始進行 Phase 4 的開發：[描述 Phase 4 的具體功能]

# Phase 4  執行中斷 整理
目前正執行 Phase 4 幫我總結目前的專案架構、已建立的資料庫結構 (schema)、核心邏輯，以及 Phase 4 的待辦事項，並將其整理儲存為 docs/phase4_1_handover.md。

# Phase 4_1 繼續開發
read docs/phase4_1_handover.md 幫我列出目前還待處理的項目

# Phase 4_2 斷點
我們已經完成 Phase 4。請幫我總結目前的專案架構、已建立的資料庫結構 (schema)、核心邏輯，以及 Phase 5 的待辦事項，並將其整理儲存為 docs/phase4_2_handover.md。

# Phase 4_3 繼續開發(未做)
read docs/phase4_2_handover.md 以作為後續開發之參考

# Phase 4_3_1 斷點
請幫我總結目前的專案架構、已建立的資料庫結構 (schema)、核心邏輯，以及 所有待辦事項，並將其整理儲存為 docs/phase4_3＿1_handover.md。

# Phase 4_3_2 斷點
請幫我總結目前的專案架構、已建立的資料庫結構 (schema)、核心邏輯，以及 所有待辦事項，並將其整理儲存為 docs/phase4_3_2_handover.md。
```

#### phase 4 prompt

``` bash
# 專案背景

延續 Phase 1～3.5 已完成的「Web 案件與裝修工程管理系統 (V3)」。目前狀況：

- Phase 1：專案骨架、profiles/角色與 RLS、登入與角色導向 Sidebar。
- Phase 2：`cases` 案件主檔、`case_collaborators`、新增案件、待派清單與派案流程、輕量版案件列表與工作台。
- Phase 3：`milestones` 里程碑（三日期）、里程碑日期調整（強制填理由）、`case_progress_updates` 進度回報、`case_attachments` 案件附件（Storage 權限控管）、通用 `audit_logs` 稽核紀錄與案件異動歷程時間軸、完整版工作台。
- Phase 3.5：`contracts`／`contract_payment_terms`／`contract_addons`（合約與期款）、`invoice_records`（請款/收款）、`iso_documents`／`iso_document_handlers`（ISO 收發文）、`documents`（文件版本控管），以及財務/文管的輕量列表頁。

開始動工前，請先自己讀一次目前專案的 README、資料夾結構、既有 migration，尤其是上面提到的每一張表目前實際的欄位名稱（因為 Phase 3.5 有幾個設計決策是問過我才定案的，欄位命名可能跟這份 prompt裡寫的不完全一樣），確認接續得上，不要重新設計已經定案的資料表。

這次要做「Phase 4」：把散落在各模組的「輕量版列表」升級成規格書要求的完整查詢/報表/Dashboard 頁面，並用 20 件真實（或高擬真度）案件資料跑一次完整 UAT，作為這個階段的驗收交付標的。

請不要提前實作：Production 正式站部署、正式帳號建立、教育訓練、Hypercare 相關工作——這些是 Phase 5、6 的範圍。

# 技術與環境規格（沿用 Phase 1~3.5，不可更換）

- Next.js（App Router）+ TypeScript + Tailwind CSS
- Supabase（PostgreSQL、Auth、RLS），本機用 Local Supabase (CLI/Docker)，用 `supabase db diff` 產生新的 migration 檔案（這個 Phase 主要是查詢/檢視功能，如果新增欄位或索引才需要 migration，不要為了做報表就大改既有資料表結構）
- Git：每完成一個子項目獨立 commit

# Phase 4 範圍

## 1. 案件全覽與進階查詢頁面（Case Directory & Advanced Filter）

把 Phase 2 的輕量版案件列表升級為完整版：

- 支援跨欄位組合查詢：Case ID、客戶名稱、案件狀態、案件類型、案件模式、負責設計師、日期區間（可選擇是查建立日期、預計交付日期還是任一里程碑日期）。
- 支援 Excel（`.xlsx`）匯出目前篩選結果，欄位至少涵蓋 Case ID、案名、客戶、類型、狀態、主責設計師、三個關鍵日期、目前進度百分比。
- 權限比照 Phase 2：`designer` 只能查詢/匯出自己相關的案件；`project_manager`/`admin` 可查詢/匯出全部。

## 2. 專案進度與逾期監控看板（WIP & Delay Monitor）

- 用清楚的視覺化方式（狀態分組、色彩標籤即可，不需要複雜圖表）呈現：在建工程（WIP，狀態為進行中）、即將到期（例如最新完成日期在未來 7 天內且尚無實際完成日期，天數門檻請合理設定並在 SUMMARY 說明）、已逾期（Overdue，最新完成日期已過但無實際完成日期）、卡關中（`has_active_blocker = true`）。
- 每個分類要能點進去看到對應案件清單。
- 這頁沿用 Phase 3 建立的里程碑與進度回報資料，不需要新增資料表。

## 3. 人員工作負荷與產能統計（Workload & Capacity Dashboard）

- 統計 10 位設計師：目前進行中案件數、各狀態案件分佈、近期完成案件數，作為派案參考。
- 可用簡單的長條圖或表格呈現（若要畫圖表，請遵循專案既有的 UI 風格，不需要另外引入笨重的圖表套件，能用簡單的 CSS/SVG 做出清楚的長條/儀表即可）。
- 這頁資料應該跟 Phase 2 派案中心「設計師即時負載顯示」用同一套查詢邏輯，避免兩處數字對不起來——若你發現兩處算法不一致，請抽成共用的查詢/函式，不要各寫一份。

## 4. 派案中心 Dashboard 補強

把 Phase 2 的派案中心，補上規格書要求的頂部 KPI 卡片：待指派案件數、進行中案件數、設計師平均負載、本週到期里程碑數。這些卡片的數字要能連動到本 Phase 做的查詢頁面（點卡片可以跳轉到對應的篩選結果）。

## 5. 財務期款與現金流追蹤表（Financial & Cash Flow Overview）

- 統計各案件／各合約：合約總額（含追加減後的實際總額）、已請款金額、已收款金額、未收款金額、預期入帳時程。
- 可依案件、依收款狀態篩選。
- 權限比照 Phase 3.5：`finance`/`admin` 可完整查看；`project_manager` 依 Phase 3.5 討論結果決定是否唯讀。

## 6. ISO 文管與歷史版本庫（ISO Document Library）

- 依案件或依文件分類瀏覽 `documents`／`iso_documents`，可查看每份文件的歷史版本列表與下載，並記錄「調閱紀錄」（誰在什麼時候看過/下載過這份文件——可以簡單記在 `audit_logs` 或另建一張輕量的 `document_access_logs`，你評估後選一種做法並說明原因）。
- 權限比照 Phase 3.5 的 `documents`/`iso_documents` 存取規則。

## 7. 全域稽核軌跡查詢頁面（Audit Trail Log Viewer）

- 把 Phase 3 只在單一案件詳情頁看得到的「異動歷程時間軸」，做成一個跨案件、可篩選的全域查詢頁：可依資料表（案件/里程碑/合約/期款等）、案件、操作人員、時間區間篩選 `audit_logs`。
- 顯示欄位：異動時間、操作人員、資料表與欄位、修改前後數值、異動原因（若有）。
- 僅 `admin`（以及你認為合理需要稽核能力的角色，如 `project_manager`，若不確定請先問我）可以存取這個頁面。

## 8. 20 件真實案件資料 UAT

- 請我提供（或引導我提供）20 件真實或高擬真度的案件資料，涵蓋不同案件模式（純設計/純工程/統包）、不同狀態（草稿、待派、已派案、進行中、已完成、卡關中、逾期）、不同財務狀態（未請款、已請款待入帳、已收款、逾期未付）。如果我還沒準備好真實資料，請先問我要不要用貼近真實情境的假資料 seed 20 筆，讓你可以先把 UAT 流程跑過一次。
- 針對這 20 筆資料，實際操作一輪完整流程：建案 → 派案 → 進度回報/卡關 → 里程碑日期調整 → 合約與期款設定 → 請款/收款登打 → 各查詢報表頁面驗證數字正確（例如逾期案件數、設計師負載數字要跟這 20 筆資料手動核對得上）。
- 輸出一份 UAT 報告（`PHASE4_UAT_REPORT.md`），列出：測試案例、預期結果、實際結果、發現的問題與修正紀錄。

# 開發原則

- 這個 Phase 主要是「把資料組織成看得懂的畫面」，請優先確保數字正確、篩選邏輯正確，視覺呈現堪用即可，不要為了畫面好看犧牲查詢效能或正確性。
- 有共用的統計邏輯（例如設計師負載計算）要抽成共用函式，不要在派案中心、Workload Dashboard、KPI 卡片各寫一份而導致數字兜不起來。
- 全域稽核頁面的權限開放範圍、文件調閱紀錄要不要另建表——這兩點請先問我確認再動工。
- 每完成一個子項目就進行一次 commit。

# Phase 4 驗收標準（Gate）

完成後系統應該要能做到：

1. 案件全覽頁面可用組合條件正確篩選出預期結果，並能成功匯出 Excel。
2. WIP/逾期/卡關監控看板的分類數字，跟手動檢查資料庫的結果一致。
3. 人員工作負荷統計、派案中心 KPI 卡片、Workload Dashboard 三處的設計師負載數字一致（同一套邏輯算出來的）。
4. 財務期款與現金流追蹤表的已請款/已收款/未收款金額，跟 Phase 3.5 輸入的原始資料手動核算一致。
5. ISO 文管與歷史版本庫可以正確瀏覽並下載指定版本的文件。
6. 全域稽核軌跡查詢頁面可依表格/案件/人員/時間篩選，且非授權角色無法存取。
7. 完成 20 件真實案件資料的 UAT，`PHASE4_UAT_REPORT.md` 交付，且報告中列出的問題都已修正或明確標註為已知限制。
8. 輸出 `PHASE4_SUMMARY.md`：列出已完成項目、對照上述驗收標準逐項確認結果、任何與規格不符或需要我確認的地方。

完成後請先停在這裡，等我驗收通過，我會再提供 Phase 5（Production 正式站部署、正式帳號建立與教育訓練，系統正式上線）的 prompt。
```

### 整理 Udemy 課程
#### record
```  bash
get course 
  stat page   length
    81        50(22%)
    131       70(29%)
    201       70(18%)
    271       100
    371       100(27%)
    471       67 (40%)
    1         2 - 2026/08/19
get course detail 
  start line  length
    101       70
    171       80(23%)
    251      100(41%)
    351      100(21%)
    451      100(17%)
    551      100
    651      100
    751      10
    760      100(12%)
    860      101
    961      100
    1061     100
    1161     100
    1261     100
    1361     100
```

#### 抓取 Udemy 購買紀錄
```` bash
任務:抓取 Udemy 購買紀錄並寫入 Google 試算表(去重複)

━━━━━━━━━━━━━━━━━━━━━━━━━━━
【★ 只需要修改這一行 ★】
起始頁(START_PAGE)= 131
本次抓取頁數(PAGE_COUNT)= 50
（結束頁請自行計算:結束頁 = 起始頁 + 本次抓取頁數 - 1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━

【背景說明,供你了解這是接續進行的工作】
這是一份持續進行的任務。試算表「udemy_course_2026_0815」的「Udemy課程」分頁已累積之前
批次抓取的購買紀錄資料,這次接續抓取第 START_PAGE 頁到「START_PAGE + PAGE_COUNT - 1」頁。

【試算表資訊】
Google 試算表:udemy_course_2026_0815
工作表分頁:Udemy課程
現有欄位順序(第一列為標題):
◆ 索引、課程名稱、課程連結、第一語言、類別、主要主題、相關主題、最近更新日期、購買日期、付款方式、交易金額

(第一語言、類別、主要主題、相關主題、最近更新日期 這五欄目前留空,由另一個任務補上,
這次不用處理這五欄)

◆ 【關於索引欄位】
索引欄位不需要你自己編號,Apps Script 會在寫入時依照該列在試算表中的實際列號自動計算
(索引 = 列號 - 1),確保不會重複或跳號,你只需要照常組出其餘欄位的資料即可。

【資料來源】
依序請求以下 API(帶著我目前登入 Udemy 的瀏覽器 session),從第 START_PAGE 頁抓到第
(START_PAGE + PAGE_COUNT - 1)頁:
https://www.udemy.com/api-2.0/purchase-history/purchase-history-data/?page_number={頁碼}&data_type=courses

回傳的 JSON 中,total_pages 代表總頁數(應為 537),可用來確認抓取範圍是否合理,
若 START_PAGE + PAGE_COUNT - 1 超過 total_pages,請自動把結束頁調整為 total_pages,
並在回報中註明。

【解析規則】
每筆 results 是一筆「交易」,裡面 items 是陣列,代表這筆交易可能包含多門課程。
請把每個 item 展開成獨立一列,對應欄位如下:
- 課程名稱:items[].title
- 課程連結:https://www.udemy.com + items[].url
- 購買日期:該筆交易的 purchase_date_text
- 付款方式:payment_method[0]
- 交易金額:price_money_text

【去重複規則】
請透過 Google Sheets 的 gviz 匯出端點,直接讀取試算表中「課程連結」欄位目前已存在的所有值,
作為去重複比對的基準(不要依賴對話記憶或假設之前處理到哪裡,一律以試算表當下的實際內容為準)。
比對這次抓到的課程連結:
- 若已存在 → 跳過,不重複寫入
- 若不存在 → 加入待寫入清單

【寫入規則:務必使用 Apps Script,禁止使用瀏覽器名稱框/座標定位方式手動貼上】

抓完全部頁面並完成去重複比對後,把待寫入清單組成陣列,填入下方腳本的 NEW_DATA 並執行。
此腳本只會「附加新列到目前資料範圍的最後面」,不會覆蓋任何既有儲存格,並會◆自動為每一列
計算索引欄位:

```javascript
function appendCourseData() {
  var NEW_DATA = [
    // 依序放入本次去重複後、待新增的課程資料
    ◆ // 格式:[課程名稱, 課程連結, "", "", "", "", "", 購買日期, 付款方式, 交易金額]
    ◆ // 注意:這裡「不用」放索引欄位,索引由下方程式自動計算並插入最前面
  ];

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Udemy課程");
  var lastRow = sheet.getLastRow();

  ◆ // 自動在每筆資料最前面加上索引欄位(索引 = 該列的列號 - 1)
  ◆ var dataWithIndex = NEW_DATA.map(function(row, i) {
  ◆   var rowNumber = lastRow + 1 + i;
  ◆   var index = rowNumber - 1;
  ◆   return [index].concat(row);
  ◆ });

  if (dataWithIndex.length > 0) {
    sheet.getRange(lastRow + 1, 1, dataWithIndex.length, dataWithIndex[0].length).setValues(dataWithIndex);
  }

  Logger.log("新增列數: " + dataWithIndex.length);
  Logger.log("寫入前最後一列: " + lastRow + ", 寫入後最後一列: " + sheet.getLastRow());
  ◆ Logger.log("本次索引範圍: " + (lastRow) + " 到 " + (sheet.getLastRow() - 1));
}
```

執行前請先手動用「檔案 → 建立副本」為試算表存一份備份。
執行後打開「執行紀錄」,確認 Logger 顯示的新增列數與寫入前後的列數是否吻合預期。

【執行節奏】
抓取 API 時,每次請求下一頁之間加入 3-8 秒的隨機延遲,避免行為過於規律。
不需要每頁都個別寫入,可以把指定範圍全部抓完、去重複後,一次性用上方 Apps Script 附加寫入。

【時間記錄】
開始執行前,先記錄並印出開始時間(年-月-日 時:分:秒)。
每處理完一頁 API 請求,印出「第 N 頁 / 共 PAGE_COUNT 頁 完成,耗時 X 秒」。
全部處理完後,印出結束時間,並計算總執行時間(分鐘:秒)、平均每頁耗時。

【完成後回報】
1. 這次處理的範圍:第 START_PAGE 頁到第(START_PAGE + PAGE_COUNT - 1)頁(若有因超過
   total_pages 而調整,請說明實際結束頁)
2. 開始時間、結束時間、總執行時間、平均每頁耗時,有無異常耗時頁面
3. 新增了幾筆課程(去重複後)、跳過重複筆數
4. Apps Script 執行後 Logger 顯示的新增列數、◆本次索引範圍,以及寫入前後試算表的總列數
5. 過程中有沒有遇到異常回應(非 200 狀態碼、需要重新登入等),若有請立即停止並回報
6. 完成後,請用課程連結欄位做一次全表唯一性檢查,確認沒有重複值,回報檢查結果
````

#### 抓取課程頁面詳情
```` bash
任務:抓取課程頁面詳情(分類/語言/主題),並用 Apps Script 附加寫回試算表

━━━━━━━━━━━━━━━━━━━━━━━━━━━
【★ 只需要修改這一行 ★】
起始列(START_ROW)= 101
本次筆數(COUNT)= 70
（結束列請自行計算:結束列 = 起始列 + 本次筆數 - 1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━

【背景說明,供你了解這是接續進行的工作】
這是一份持續進行的任務。試算表「udemy_course_2026_0815」的「Udemy課程」分頁中,
第 2 列到「起始列 - 1」的「第一語言」「類別」「主要主題」「相關主題」「最近更新日期」
欄位應該已經補齊,這次接續處理第 START_ROW 列到「START_ROW + COUNT - 1」列。

執行前,請先讀取試算表確認 START_ROW 前一列的這五個欄位確實已有資料
(若發現前面還有大量空白列,請停止並回報,不要跳過去處理指定範圍,避免遺漏)。

【讀取來源】
Google 試算表:udemy_course_2026_0815
工作表分頁:Udemy課程
請讀取第 START_ROW 列到第(START_ROW + COUNT - 1)列(共 COUNT 筆,不含標題列)的
「課程連結」欄位,作為這次的目標網址清單。

【資料抓取方式】
這些是公開課程頁面,不需要登入 session。
請直接用瀏覽器(Chrome)依序載入每個課程網址,載入完成後在頁面 DOM 上用固定的 CSS 選擇器
機械式解析欄位(不是逐頁人工/AI 判讀內容,是套用同一套固定規則程式化抓取):

1. 課程分類(類別):
   `nav[aria-label="課程主題"]` 底下的 `<ol>` 清單,取前兩層連結文字,用「>」串接。

2. 主要主題:
   同一個 `<ol>` 清單中,取最後一層(第三層)的連結文字。若 breadcrumb 只有兩層,
   此欄位留空並標記「未找到」,這是正常情況,不是解析失敗。

3. 相關主題:
   找到文字包含「探索相關主題」的 `<h2>` 標題,取其後方 `<ul>` 清單內所有連結文字,
   逗號分隔合併。

4. 第一語言:
   找 `data-purpose="course-language"` 區塊內的文字。

5. 最近更新日期:
   找 class 名稱包含 `last-updated` 的區塊內文字,只取日期部分(例如「2026/7」)。

若某網址載入後不是正常課程頁(例如被導向首頁、顯示課程不存在,可能是草稿或已下架連結),
該筆五個欄位全部留空,並在回報中特別列出該網址與觀察到的異常現象,不要中斷,繼續處理下一筆。

每筆處理之間加入 5-10 秒的隨機延遲,避免行為過於規律。

【時間記錄】
開始執行前,先記錄並印出開始時間(年-月-日 時:分:秒)。
用頁面內 performance.now() 量測「頁面載入完成到解析完成」的實際耗時(不含延遲等待),
每處理完一筆印出「第 N 筆 / 共 COUNT 筆 完成,解析耗時 X 秒」。
全部處理完後,印出結束時間,計算總執行時間(含延遲)、平均解析耗時、最快/最慢筆數。

【寫回試算表的方式:務必使用 Apps Script,禁止使用瀏覽器名稱框/座標定位方式手動貼上】

抓完 COUNT 筆後,組成陣列,填入下方腳本的 SCRAPED_DATA,並執行:

```javascript
function updateCourseDetails() {
  var SCRAPED_DATA = [
    {
      courseLink: "https://www.udemy.com/course/範例課程/",
      language: "英文",
      category: "開發 > 資料科學",
      mainTopic: "Claude AI",
      relatedTopics: "Claude AI, 資料科學, 開發",
      lastUpdated: "2026/7"
    }
    // ...其餘資料依相同格式填入,共 COUNT 筆
  ];

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Udemy課程");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var colIndex = {
    courseLink: headers.indexOf("課程連結"),
    language: headers.indexOf("第一語言"),
    category: headers.indexOf("類別"),
    mainTopic: headers.indexOf("主要主題"),
    relatedTopics: headers.indexOf("相關主題"),
    lastUpdated: headers.indexOf("最近更新日期")
  };

  var updatedCount = 0;
  var notFound = [];

  SCRAPED_DATA.forEach(function(item) {
    var found = false;
    for (var i = 1; i < data.length; i++) {
      if (data[i][colIndex.courseLink] === item.courseLink) {
        var row = i + 1;
        sheet.getRange(row, colIndex.language + 1).setValue(item.language);
        sheet.getRange(row, colIndex.category + 1).setValue(item.category);
        sheet.getRange(row, colIndex.mainTopic + 1).setValue(item.mainTopic);
        sheet.getRange(row, colIndex.relatedTopics + 1).setValue(item.relatedTopics);
        sheet.getRange(row, colIndex.lastUpdated + 1).setValue(item.lastUpdated);
        updatedCount++;
        found = true;
        break;
      }
    }
    if (!found) notFound.push(item.courseLink);
  });

  Logger.log("已更新: " + updatedCount + " 筆");
  Logger.log("找不到對應列: " + JSON.stringify(notFound));
}
```

執行前請先手動用「檔案 → 建立副本」為試算表存一份備份。
執行後打開「執行紀錄」,確認 Logger 顯示的更新筆數與找不到的課程連結。

【完成後回報】
1. 這次處理的範圍:第 START_ROW 列到第(START_ROW + COUNT - 1)列
2. 開始時間、結束時間、總執行時間、平均解析耗時、最快/最慢筆數
3. 有沒有哪幾筆解析耗時明顯超出平均值,若有請列出網址
4. COUNT 筆中有幾筆完整抓到資料、有幾筆某些欄位「未找到」(並說明原因)
5. 有沒有遇到載入後不是正常課程頁的異常連結,若有請列出網址與觀察到的現象
6. Apps Script 執行後 Logger 顯示成功更新幾筆、有沒有找不到對應列的課程連結
````

#### 抓取課程頁面詳情 - reduce token
```` bash
任務:抓取課程頁面詳情(分類/語言/主題),用「頁面內 fetch 批次抓取」方式,並用 Apps Script 寫回試算表

━━━━━━━━━━━━━━━━━━━━━━━━━━━
【★ 只需要修改這一行 ★】
起始列(START_ROW)= 351
本次筆數(COUNT)= 100
（結束列請自行計算:結束列 = 起始列 + 本次筆數 - 1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━

【背景說明,供你了解這是接續進行的工作】
這是一份持續進行的任務。試算表「udemy_course_2026_0815」的「Udemy課程」分頁中,
第 2 列到「START_ROW - 1」列的「第一語言」「類別」「主要主題」「相關主題」「最近更新日期」
欄位應該已經補齊,這次接續處理第 START_ROW 列到「START_ROW + COUNT - 1」列。

【讀取來源】
Google 試算表:udemy_course_2026_0815
工作表分頁:Udemy課程
請讀取第 START_ROW 列到第(START_ROW + COUNT - 1)列(共 COUNT 筆,不含標題列)的
「課程連結」欄位,作為這次的目標網址清單。

【重要:抓取方式改用「頁面內 fetch 批次處理」,不要逐頁用瀏覽器載入】

為了大幅減少 token 消耗與執行時間,這次不要一個一個網址用瀏覽器開啟頁面。
改用以下方式:

1. 用瀏覽器開啟任意一個 www.udemy.com 頁面(例如 https://www.udemy.com/ 首頁即可),
   只需要開這一個頁面,之後全程停留在這個頁面上。

2. 在該頁面的 JS 環境中執行一段批次抓取腳本,腳本邏輯如下:
   - 用 fetch() 依序請求全部 COUNT 個課程網址(同源請求,可直接取得 HTML)
   - 每次 fetch 之間用 await 搭配隨機延遲 5-10 秒
   - 對每個回傳的 HTML 用 DOMParser 解析,套用下方固定的 CSS 選擇器規則抓取五個欄位
   - 全部處理完後,把結果整理成一份 JSON 輸出(格式直接對應後面 Apps Script 的
     SCRAPED_DATA 結構,方便直接複製使用)

3. 執行過程不要逐筆回報進度,只需要:
   - 開始時記錄開始時間
   - 每完成 20 筆印一次簡短進度(例如「20/100 完成」)
   - 結束時印出結束時間、總耗時、以及完整的結果 JSON

【欄位解析規則(供腳本內 DOMParser 使用)】

1. 課程分類(類別):
   `nav[aria-label="課程主題"]` 底下的 `<ol>` 清單,取前兩層連結文字,用「>」串接。

2. 主要主題:
   同一個 `<ol>` 清單中,取最後一層(第三層)的連結文字。若 breadcrumb 只有兩層,
   此欄位留空(這是正常情況,不是解析失敗)。

3. 相關主題:
   找到文字包含「探索相關主題」的 `<h2>` 標題,取其後方 `<ul>` 清單內所有連結文字,
   逗號分隔合併。

4. 第一語言:
   找 `data-purpose="course-language"` 區塊內的文字。

5. 最近更新日期:
   找 class 名稱包含 `last-updated` 的區塊內文字,只取日期部分(例如「2026/7」)。

異常處理:
- 若某網址 fetch 後的內容不是正常課程頁(例如被重新導向、回傳內容找不到任何目標結構,
  常見於 /draft/ 開頭的草稿或已下架課程連結),該筆五個欄位全部留空,在結果 JSON 中
  加上 "error": "非正常課程頁" 標記,不要中斷,繼續處理下一筆。
- 若 fetch 回傳非 200 狀態碼,同樣標記該筆並繼續;但若連續 5 筆以上都失敗,
  請停止執行並回報,可能是被限速或需要處理其他異常。

【寫回試算表的方式:務必使用 Apps Script,禁止使用瀏覽器名稱框/座標定位方式手動貼上】

抓取腳本輸出的 JSON 結果,直接填入下方腳本的 SCRAPED_DATA 並執行:

```javascript
function updateCourseDetails() {
  var SCRAPED_DATA = [
    // 直接貼上抓取腳本輸出的 JSON 結果,格式:
    // {
    //   courseLink: "https://www.udemy.com/course/xxx/",
    //   language: "英文",
    //   category: "開發 > 資料科學",
    //   mainTopic: "Claude AI",
    //   relatedTopics: "Claude AI, 資料科學, 開發",
    //   lastUpdated: "2026/7"
    // }
  ];

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Udemy課程");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var colIndex = {
    courseLink: headers.indexOf("課程連結"),
    language: headers.indexOf("第一語言"),
    category: headers.indexOf("類別"),
    mainTopic: headers.indexOf("主要主題"),
    relatedTopics: headers.indexOf("相關主題"),
    lastUpdated: headers.indexOf("最近更新日期")
  };

  var updatedCount = 0;
  var notFound = [];

  SCRAPED_DATA.forEach(function(item) {
    var found = false;
    for (var i = 1; i < data.length; i++) {
      if (data[i][colIndex.courseLink] === item.courseLink) {
        var row = i + 1;
        sheet.getRange(row, colIndex.language + 1).setValue(item.language);
        sheet.getRange(row, colIndex.category + 1).setValue(item.category);
        sheet.getRange(row, colIndex.mainTopic + 1).setValue(item.mainTopic);
        sheet.getRange(row, colIndex.relatedTopics + 1).setValue(item.relatedTopics);
        sheet.getRange(row, colIndex.lastUpdated + 1).setValue(item.lastUpdated);
        updatedCount++;
        found = true;
        break;
      }
    }
    if (!found) notFound.push(item.courseLink);
  });

  Logger.log("已更新: " + updatedCount + " 筆");
  Logger.log("找不到對應列: " + JSON.stringify(notFound));
}
```

執行前請先手動用「檔案 → 建立副本」為試算表存一份備份。
執行後打開「執行紀錄」,以 Logger 顯示的「已更新筆數」和「找不到對應列」作為主要核對依據。
畫面核對只需抽查:第 START_ROW 列、範圍中間任一列、最後一列,共 3 列即可,
不要整批逐列截圖比對(節省 token)。

【完成後回報(保持精簡,不要逐筆列出)】
1. 這次處理的範圍:第 START_ROW 列到第(START_ROW + COUNT - 1)列
2. 開始時間、結束時間、總耗時
3. COUNT 筆中:完整抓到的筆數、「主要主題」因 breadcrumb 僅兩層而留空的筆數(只列列號)、
   異常連結筆數(列出列號與網址)
4. Apps Script Logger 顯示:已更新筆數、找不到對應列清單
5. 抽查 3 列的核對結果
6. 若有連續失敗停止的情況,說明停在第幾筆與觀察到的現象
````

#### 抓取課程頁面詳情 - add stop condition
```` bash
任務:抓取課程頁面詳情(分類/語言/主題),用「頁面內 fetch 批次抓取」方式,並用 Apps Script 寫回試算表

━━━━━━━━━━━━━━━━━━━━━━━━━━━
【★ 只需要修改這一行 ★】
起始列(START_ROW)= 651
本次筆數(COUNT)= 100
（結束列請自行計算:結束列 = 起始列 + 本次筆數 - 1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━

【背景說明,供你了解這是接續進行的工作】
這是一份持續進行的任務。試算表「udemy_course_2026_0815」的「Udemy課程」分頁中,
第 2 列到「START_ROW - 1」列的「第一語言」「類別」「主要主題」「相關主題」「最近更新日期」
欄位應該已經補齊,這次接續處理第 START_ROW 列到「START_ROW + COUNT - 1」列。

【讀取來源】
Google 試算表:udemy_course_2026_0815
工作表分頁:Udemy課程
請讀取第 START_ROW 列到第(START_ROW + COUNT - 1)列(共 COUNT 筆,不含標題列)的
「課程連結」欄位,作為這次的目標網址清單。

【重要:抓取方式改用「頁面內 fetch 批次處理」,不要逐頁用瀏覽器載入】

為了大幅減少 token 消耗與執行時間,這次不要一個一個網址用瀏覽器開啟頁面。
改用以下方式:

1. 用瀏覽器開啟任意一個 www.udemy.com 頁面(例如 https://www.udemy.com/ 首頁即可),
   只需要開這一個頁面,之後全程停留在這個頁面上。

2. 在該頁面的 JS 環境中執行一段批次抓取腳本,腳本邏輯如下:
   - 用 fetch() 依序請求全部 COUNT 個課程網址(同源請求,可直接取得 HTML)
   - 每次 fetch 之間用 await 搭配隨機延遲 5-10 秒
   - 對每個回傳的 HTML 用 DOMParser 解析,套用下方固定的 CSS 選擇器規則抓取五個欄位
   - 全部處理完後,把結果整理成一份 JSON 輸出(格式直接對應後面 Apps Script 的
     SCRAPED_DATA 結構,方便直接複製使用)

3. 執行過程不要逐筆回報進度,只需要:
   - 開始時記錄開始時間
   - 每完成 20 筆印一次簡短進度(例如「20/100 完成」)
   - 結束時印出結束時間、總耗時、以及完整的結果 JSON

【欄位解析規則(供腳本內 DOMParser 使用)】

1. 課程分類(類別):
   `nav[aria-label="課程主題"]` 底下的 `<ol>` 清單,取前兩層連結文字,用「>」串接。

2. 主要主題:
   同一個 `<ol>` 清單中,取最後一層(第三層)的連結文字。若 breadcrumb 只有兩層,
   此欄位留空(這是正常情況,不是解析失敗)。

3. 相關主題:
   找到文字包含「探索相關主題」的 `<h2>` 標題,取其後方 `<ul>` 清單內所有連結文字,
   逗號分隔合併。

4. 第一語言:
   找 `data-purpose="course-language"` 區塊內的文字。

5. 最近更新日期:
   找 class 名稱包含 `last-updated` 的區塊內文字,只取日期部分(例如「2026/7」)。

異常處理:
- 若某網址 fetch 後的內容不是正常課程頁(例如被重新導向、回傳內容找不到任何目標結構,
  常見於 /draft/ 開頭的草稿或已下架課程連結),該筆五個欄位全部留空,在結果 JSON 中
  加上 "error": "非正常課程頁" 標記,不要中斷,繼續處理下一筆。
- 若 fetch 回傳非 200 狀態碼,同樣標記該筆並繼續;但若連續 5 筆以上都失敗,
  請停止執行並回報,可能是被限速或需要處理其他異常。

【澄清:「連續失敗即停止」規則的適用範圍(新增,避免誤判)】
上述「連續 5 筆以上失敗即停止」的規則,只適用於以下兩種情況:
  (a) fetch 回傳的 HTTP 狀態碼非 200
  (b) fetch 過程本身拋出例外(例如連線逾時、網路錯誤)
「非正常課程頁」(例如 /draft/ 開頭的草稿或已下架課程,內容中找不到目標結構)**不算
失敗**,不應計入連續失敗次數。草稿課程有可能連續出現在清單中(這是正常情況),
遇到這種情況只需標記 "error": "非正常課程頁" 並繼續處理下一筆,不可因此觸發中止機制。
換句話說,程式中應該用兩個獨立的判斷:內容解析結果(是否為正常課程頁)與網路請求結果
(HTTP 狀態碼/是否拋出例外),只有後者才能累加「連續失敗次數」。

【寫回試算表的方式:務必使用 Apps Script,禁止使用瀏覽器名稱框/座標定位方式手動貼上】

抓取腳本輸出的 JSON 結果,直接填入下方腳本的 SCRAPED_DATA 並執行:

```javascript
function updateCourseDetails() {
  var SCRAPED_DATA = [
    // 直接貼上抓取腳本輸出的 JSON 結果,格式:
    // {
    //   courseLink: "https://www.udemy.com/course/xxx/",
    //   language: "英文",
    //   category: "開發 > 資料科學",
    //   mainTopic: "Claude AI",
    //   relatedTopics: "Claude AI, 資料科學, 開發",
    //   lastUpdated: "2026/7"
    // }
  ];

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Udemy課程");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var colIndex = {
    courseLink: headers.indexOf("課程連結"),
    language: headers.indexOf("第一語言"),
    category: headers.indexOf("類別"),
    mainTopic: headers.indexOf("主要主題"),
    relatedTopics: headers.indexOf("相關主題"),
    lastUpdated: headers.indexOf("最近更新日期")
  };

  var updatedCount = 0;
  var notFound = [];

  SCRAPED_DATA.forEach(function(item) {
    var found = false;
    for (var i = 1; i < data.length; i++) {
      if (data[i][colIndex.courseLink] === item.courseLink) {
        var row = i + 1;
        sheet.getRange(row, colIndex.language + 1).setValue(item.language);
        sheet.getRange(row, colIndex.category + 1).setValue(item.category);
        sheet.getRange(row, colIndex.mainTopic + 1).setValue(item.mainTopic);
        sheet.getRange(row, colIndex.relatedTopics + 1).setValue(item.relatedTopics);
        sheet.getRange(row, colIndex.lastUpdated + 1).setValue(item.lastUpdated);
        updatedCount++;
        found = true;
        break;
      }
    }
    if (!found) notFound.push(item.courseLink);
  });

  Logger.log("已更新: " + updatedCount + " 筆");
  Logger.log("找不到對應列: " + JSON.stringify(notFound));
}
```

執行前請先手動用「檔案 → 建立副本」為試算表存一份備份。
執行後打開「執行紀錄」,以 Logger 顯示的「已更新筆數」和「找不到對應列」作為主要核對依據。
畫面核對只需抽查:第 START_ROW 列、範圍中間任一列、最後一列,共 3 列即可,
不要整批逐列截圖比對(節省 token)。

【完成後回報(保持精簡,不要逐筆列出)】
1. 這次處理的範圍:第 START_ROW 列到第(START_ROW + COUNT - 1)列
2. 開始時間、結束時間、總耗時
3. COUNT 筆中:完整抓到的筆數、「主要主題」因 breadcrumb 僅兩層而留空的筆數(只列列號)、
   異常連結筆數(列出列號與網址)
4. Apps Script Logger 顯示:已更新筆數、找不到對應列清單
5. 抽查 3 列的核對結果
6. 若有連續失敗停止的情況,說明停在第幾筆與觀察到的現象
````

####
``` bash
# 抓取課程頁面詳情 - 要求確認
1.Allow Claude to use the browser on www.udemy.com?
2. Allow Claude to use the browser on script.google.com?
3. Allow Claude to use the browser on docs.google.com?
4. Claude wants to use Copy file from Google Drive?
5. Multiple Chrome browsers are connected. Which one should I continue using for the Udemy scraping/Apps Script task?
I select Browser 2 (Windows)

# 1~3 add (但好像無效)
Settings
  --> Claude Chrome
  --> Site permissions
  --> Default for all sites
  --> Block all sites
  --> Add Websites
    add : www.udemy.com、script.google.com、docs.google.com
# 4 權限暫時不開
# 5 無解
```

### 課程成筆記整理
#### 課程整理
```` bash
# 要求
幫我寫一個 Cowork 任務指對課程 https://www.udemy.com/course/mcp-for-leaders-architecting-context-driven-ai/?couponCode=26BBPAA2MX 整理課程內容

# 輸出
這門課(MCP for Leaders)內容偏向高階主管的策略/框架講解,不涉及程式操作示範,幾乎全部是「用講的」——這種類型非常適合字幕整理法,可行度很高。我把指令依這門課的性質調整過:
```
請幫我開啟 Chrome,前往這門 Udemy 課程:
https://www.udemy.com/course/mcp-for-leaders-architecting-context-driven-ai/

任務:
1. 進入課程頁面後,找到課程大綱(Course content),列出完整的章節與堂數清單
2. 依序點開每一堂影片,開啟字幕/CC,擷取每一堂的字幕文字內容
3. 針對每一堂課,整理成以下格式:
   - 課程標題
   - 3-5 個重點摘要(條列式)
   - 提到的關鍵框架/名詞定義(例如 MCP 相關的專有名詞、治理模型、部署方式等,如果有明確提及)
   - 對「領導者/決策者」的具體行動建議或應用場景(如果該堂有提到)
   - 如果該堂主要是案例分享而非概念講解,請註明「本堂偏案例研討」
4. 把所有章節的整理結果依課程順序彙整成一份 Markdown 筆記文件,存檔給我
5. 文件最前面加一份「全課程重點大綱」,用一段話總結整門課的核心脈絡

輸出語言:全部使用繁體中文(台灣用語習慣),包含摘要與註記文字。

如果字幕不存在、或抓不到某一堂的內容,請直接跳過並在筆記中明確標註「無法取得字幕」,不要用你自己的知識去補內容或臆測課程講了什麼。

執行時如果遇到需要我確認登入或權限的畫面,請暫停等我處理。
```

**這門課跟前一門(Claude Fable Masterclass)的差異**
- 我把「prompt 範例」欄位換成「關鍵框架/名詞定義」+「對領導者的行動建議」,比較符合這種管理課程的筆記需求
- 加了一份「全課程重點大綱」在最前面,因為這類策略課通常需要先有整體脈絡,才看得懂各堂細節怎麼串起來
- 因為這門課幾乎沒有螢幕操作示範,我拿掉了「視覺示範註記」那一項,改成標註「案例研討」型的章節即可

要不要我也先幫你抓一下這門課大概有幾堂、總長多久,讓你評估要不要一次跑完,還是也要先跑幾堂試水溫?

````

#### [Claude Fable MasterclassUdemy](https://www.udemy.com/course/claude-fable-masterclass-ai-storytelling-characters/)
##### 筆記 prompt
```` bash
# chapter 1-5
請幫我開啟 Chrome,前往這門 Udemy 課程:
https://www.udemy.com/course/claude-fable-masterclass-ai-storytelling-characters/

任務:
1. 進入課程頁面後,找到課程大綱(Course content),列出前 5 堂課的標題
2. 依序點開前 5 堂課的影片,開啟字幕/CC,擷取每一堂的字幕文字內容
3. 針對每一堂課,整理成以下格式:
   - 課程標題
   - 3-5 個重點摘要(條列式)
   - 提到的具體技巧/prompt 範例(如果有逐字提及)
   - 如果該堂偏「螢幕操作示範」而非「口說講解」,請特別註明「本堂偏視覺示範,字幕可能遺漏操作細節」
4. 把 5 堂課的整理結果彙整成一份 Markdown 筆記文件,存檔給我

輸出語言:全部使用繁體中文(台灣用語習慣),包含摘要與註記文字。

如果字幕不存在、或抓不到某一堂的內容,請直接跳過並在筆記中註明,不要用你自己的知識去補內容或臆測課程講了什麼。

# other chapter
請幫我開啟 Chrome,前往這門 Udemy 課程:
https://www.udemy.com/course/claude-fable-masterclass-ai-storytelling-characters/

背景:我之前已經請你整理過這門課「前 5 堂」的筆記(格式如下方所述),現在要請你把「第 6 堂到課程結束」的所有章節,用相同方式整理完。

任務:
1. 進入課程頁面,找到課程大綱(Course content),列出完整的堂數與標題清單
2. 從第 6 堂開始,依序點開每一堂影片,開啟字幕/CC,擷取字幕文字內容,直到跑完最後一堂
3. 針對每一堂課,整理成以下格式(與之前 5 堂一致):
   - 課程標題
   - 3-5 個重點摘要(條列式)
   - 提到的具體技巧/prompt 範例(如果有逐字提及)
   - 如果該堂偏「螢幕操作示範」而非「口說講解」,請特別註明「本堂偏視覺示範,字幕可能遺漏操作細節」
4. 把這些新整理的章節,依照堂數順序,整合進同一份 Markdown 筆記文件中(接續之前前 5 堂的內容,不要覆蓋或重複整理前 5 堂)

輸出語言:全部使用繁體中文(台灣用語習慣),包含摘要與註記文字。

如果字幕不存在、或抓不到某一堂的內容,請直接跳過並在筆記中明確標註「無法取得字幕」,不要用你自己的知識去補內容或臆測課程講了什麼。

完成後請給我一份完整的 Markdown 檔案,包含全部堂數(第 1 堂到最後一堂)的筆記。
````

##### claude 敘事提案執行
```` bash
# 如何將《潮汐之外》Narrative Structure Design 提案於 Claude 上執行

## 重要說明：先釐清一個關鍵前提

課程中的「Claude Fable」被介紹為一個具備專屬敘事引擎、角色系統、敘事記憶、互動引擎的獨立平台，會自動幫你追蹤角色一致性、記住前情、管理分支邏輯。但你目前實際能操作的是**一般的 Claude（Claude.ai 或 API）**，它本身沒有「Story Generation Engine」「Narrative Memory」這類自動化系統——這些能力必須由你自己用**提示設計（prompting）＋ 專案管理習慣**手動打造出來。

好消息是：提案裡設計好的每一個元素（三幕結構、角色設定表、世界觀聖經、記憶摘要）本來就是為了「補上」這些功能而存在的。你只需要照著提案的架構，把它們變成一連串結構化的提示，依序餵給 Claude，就能重現課程方法論想要的效果。

以下是具體的執行步驟。

---

## 步驟一：建立一個 Claude Project（強烈建議）

如果你使用 Claude.ai，先建立一個新的 **Project**（專案），並把以下三份文件放進 Project 的知識庫（Knowledge）：

1. 《潮汐之外》Narrative Structure Design 提案全文（我先前給你的那份 .md）
2. 一份「角色設定表」文件（步驟二會教你怎麼生成）
3. 一份「世界觀聖經」文件（同上）

**為什麼要用 Project**：Project 的知識庫內容會在同一專案的每次對話中持續被 Claude 讀取，等於手動模擬課程中「敘事記憶（Narrative Memory）」的功能——你不用每次都重新貼一次角色設定，Claude 也比較不容易忘記米拉是誰、大潮還剩幾天。

如果你用 API 或沒有 Project 功能，就改用「每次生成新章節前，先貼一次角色設定表＋世界觀聖經＋前情摘要」的做法（見步驟五）。

---

## 步驟二：先請 Claude 生成基礎資產（角色設定表 / 世界觀聖經）

在動筆寫任何一幕之前，先用提案內容請 Claude 產出兩份「錨點文件」，之後所有生成都要參照它們。

**提示範例 A — 角色設定表**：

```
請根據以下故事提案，為主角米拉（Mira）與其他七名倖存者，
各自建立一份角色設定表，包含：姓名／年齡／職業、核心價值觀與信念、
外部目標、內在目標（傷口／恐懼）、說話風格、與米拉的關係、
在故事中的敘事功能。

[貼上提案第四節「角色轉變弧線」內容 + 第一幕人物描述]

請以表格呈現，方便我之後每次生成新章節前先貼給你參照。
```

**提示範例 B — 世界觀聖經**：

```
請根據以下設定，整理一份「世界觀聖經」，包含：
地理（高地區／浸水區劃分）、時間線（大潮倒數七天，每天的水位變化假設）、
資源配額制度規則、關鍵地點（頂樓聚落／地鐵隧道／排水系統）。

[貼上提案第三節世界建立內容]
```

把 Claude 生成的這兩份輸出存下來，這就是你之後每一次生成內容時的「一致性錨點」——對應課程說的 Character Sheets 與 World Bible。

---

## 步驟三：依三幕結構，逐幕請 Claude 生成內容

**不要一次要求 Claude 寫完整個故事。** 課程反覆強調「第一次生成的結果很少是最終結果」，也建議分層、分階段推進。實務上建議一幕一幕、甚至一場戲一場戲地生成，這樣你才能在中途檢查一致性、調整節奏。

**第一幕生成提示範例**：

```
[如果沒用 Project，先貼上角色設定表與世界觀聖經]

請以下列敘事結構設計生成《潮汐之外》第一幕內容（約全篇 25%）：

- 開場場景：米拉在半淹沒大樓頂樓的日常生活與團隊互動
- 世界建立：高地區 vs 浸水區的對比與資源配額制度
- 觸發事件：發現大潮將在七天後徹底淹沒浸水區，地鐵隧道即將封閉
- 核心問題拋出：米拉能否說服團隊在七天內完成撤離

風格要求：電影感敘事，節奏中等偏緊湊，強調生存壓力與角色間的猜忌氛圍。
請以章節形式呈現，並在本幕結尾使用「懸崖式結尾」手法——
團隊抵達隧道卻發現已被封鎖。
```

之後第二幕、第三幕，依提案第三節內容比照辦理，逐一貼入對應的「中段推進 / 中點轉折 / 最低點」或「高潮 / 後果 / 轉變 / 新常態」等段落敘述作為指令依據。

---

## 步驟四：用「多層提示」技巧檢查單一場景品質

如果某一幕讀起來不夠有張力，可以套用課程第 6 堂「多層提示（Multi-Layer Prompting）」，一次指定五層要求，而不是只給籠統的「請重寫」：

```
請重寫「核心成員被捕」這場戲，並同時滿足以下五層要求：

1. 敘事層：這場戲必須讓團隊士氣降到全篇最低點
2. 角色層：需呈現米拉的自責與其他成員對她的動搖信任
3. 情感層：讀者應感受到絕望與時間緊迫的雙重壓力
4. 風格層：電影感、短句、快節奏
5. 世界層：需帶入排水系統的壓迫環境描寫
```

---

## 步驟五：章節之間手動維護「記憶摘要」

因為一般 Claude 沒有自動敘事記憶，**每寫完一幕，請 Claude 順手幫你摘要一次**，存下來，下一幕生成前貼上去：

```
請將剛才這一幕的內容，摘要為 150 字以內的「記憶摘要」，
包含：發生的關鍵事件、角色關係的變化、留下的伏筆或未解問題。
```

這份摘要就是課程說的 Memory Summary，用來確保長篇生成不會前後矛盾。

---

## 步驟六：分支互動版本（選用）

如果你想做提案第九節提到的互動分支版本，可以在第二幕中點單獨開一個提示：

```
請基於「米拉發現自己過去隱瞞真相」這個轉折點，
設計一個分支選擇：「公開真相 vs 繼續隱瞞獨自承擔」。
每個選項請各自延伸約 300 字的後續情節走向，
並說明各自會如何影響第三幕的結局走向（英雄式勝利／悲劇／苦樂參半／隱藏結局）。
```

---

## 步驟七：最終審閱清單

全篇生成完後，請 Claude 依提案標準做一次自我檢查：

```
請對照以下五個問題，檢查整篇《潮汐之外》草稿：
1. 每個場景是否都對整體故事有貢獻？
2. 角色動機與行為是否前後一致？
3. 三幕的節奏比例是否大致符合 25% / 50% / 25%？
4. 衝突與利害關係是否有貫穿全篇、逐步升級？
5. 結局是否確實呈現高潮、後果、轉變、新常態四要素？
```

---

## 快速執行順序總覽

1. 建立 Claude Project，放入提案全文
2. 請 Claude 生成角色設定表、世界觀聖經
3. 逐幕（第一幕→第二幕→第三幕）依提案內容分批生成
4. 遇到弱場景時用「多層提示」重寫
5. 每幕結束後生成記憶摘要，供下一幕參照
6. （選用）在中點設計分支互動版本
7. 全文完成後跑一次最終審閱清單

這樣一來，即使一般 Claude 沒有 Claude Fable 那套自動化敘事引擎，你也能靠提案裡設計好的結構，手動重現同樣的效果。
````

#### [MCP for Leaders: Architecting Context-Driven AI](https://www.udemy.com/course/mcp-for-leaders-architecting-context-driven-ai)
##### 筆記整理 prompt #1
```` bash
請幫我開啟 Chrome,前往這門 Udemy 課程:
https://www.udemy.com/course/mcp-for-leaders-architecting-context-driven-ai/
任務:
1. 進入課程頁面後,找到課程大綱(Course content),列出完整的章節與堂數清單
2. 依序點開每一堂影片,開啟字幕/CC,擷取每一堂的字幕文字內容
3. 針對每一堂課,整理成以下格式:
   - 課程標題
   - 3-5 個重點摘要(條列式)
   - 提到的關鍵框架/名詞定義(例如 MCP 相關的專有名詞、治理模型、部署方式等,如果有明確提及)
   - 對「領導者/決策者」的具體行動建議或應用場景(如果該堂有提到)
   - 如果該堂主要是案例分享而非概念講解,請註明「本堂偏案例研討」
4. 把所有章節的整理結果依課程順序彙整成一份 Markdown 筆記文件,存檔給我
5. 文件最前面加一份「全課程重點大綱」,用一段話總結整門課的核心脈絡
輸出語言:全部使用繁體中文(台灣用語習慣),包含摘要與註記文字。
如果字幕不存在、或抓不到某一堂的內容,請直接跳過並在筆記中明確標註「無法取得字幕」,不要用你自己的知識去補內容或臆測課程講了什麼。
執行時如果遇到需要我確認登入或權限的畫面,請暫停等我處理。
````

##### 筆記整理 prompt #2
``` bash
請幫我開啟 Chrome,前往這門 Udemy 課程:
{課程連結}

任務:

以登入狀態進入課程播放頁面,先列出完整章節(Section)與堂數清單
依序點開每一堂,立即暫停影片,開啟 Transcript(逐字稿)面板擷取全文;不要靠 CC 字幕或截圖逐句擷取
每一堂整理成以下格式:
課程標題
3-5 個重點摘要(條列式)
提到的關鍵框架/名詞定義(如有明確提及)
對「領導者/決策者」的具體行動建議或應用場景(如有提到)
純案例分享而非概念講解的堂數,註明「本堂偏案例研討」
每完成一個章節(Section)就先將該章節整理結果暫存一次,避免中斷後前功盡棄
全部完成後,依課程順序彙整成一份 Markdown 筆記檔案輸出給我,內容開頭依序包含:
標題與日期時間
課程原文名稱與課程連結(連結需為完整網址,確保可點擊開啟)
「全課程重點大綱」:用一段話總結整門課的核心脈絡

輸出語言:全部使用繁體中文(台灣用語習慣)。
逐字稿不存在或抓不到的堂數,直接跳過並在筆記中標註「無法取得字幕」,禁止用你自己的知識補內容或臆測課程內容。
執行時遇到需要登入或權限確認的畫面,請暫停等我處理。
```

##### 提取 ideas #1
``` bash
我有 MCP for Leaders: Architecting Context-Driven AI 課程筆記, 幫我分析一下 我能把它如何轉成實際應用
```

##### 提取 ideas #2
``` bash
我附上「{課程名稱}」的課程筆記(附檔),請基於筆記內容分析,不要依賴你自己對這門課的猜測。

背景:我是獨立開發者,正在尋找可行的 SaaS 產品題目,希望從這門課的內容中挖掘靈感。

請依序輸出:

可轉化的 SaaS 機會點:從筆記中找出 3-5 個可以做成 SaaS 產品的切入點。每個機會點說明:對應筆記中哪個章節/概念、目標客群是誰、解決什麼痛點、簡述產品形式
每個機會點的評估:市場上是否已有類似產品(如known)、差異化空間、以獨立開發者的資源做 MVP 的難度(高/中/低)與理由
推薦優先順序:從上述機會點中選出你認為最值得先做的 1-2 個,說明理由
下一步驗證建議:針對推薦的題目,列出在寫程式之前應該先做的市場驗證動作

注意:分析要基於筆記實際內容,如果某個機會點是你自己延伸推論而非筆記直接提到的,請標註「延伸推論」。輸出使用繁體中文(台灣用語)。
```

##### 提取 ideas #2 addition
``` bash
# output file
輸出幫我轉成 md 檔

# add internet information
查網路上相關資訊 看能不激盪出更好的 ideas

# output v2
輸出 v2 版 並列出 source(含 link 英文 title)  同時列中文 Title  and 加入各 source  的 重點摘要(中文)
```

#### [AI Adoption & Change Management: From Pilot to Scale](https://www.udemy.com/course/ai-hr-ru)
##### 筆記整理 prompt
``` bash
請幫我開啟 Chrome,前往這門 Udemy 課程:
https://www.udemy.com/course/ai-hr-ru/
任務:
1. 以登入狀態進入課程播放頁面,先列出完整章節(Section)與堂數清單
2. 依序點開每一堂,立即暫停影片,開啟 Transcript(逐字稿)面板擷取全文;不要靠 CC 字幕或截圖逐句擷取
3. 本課程原文語言可能非英文(可能為俄文):若逐字稿有英文版本請優先使用英文版;若只有原文版本,擷取後照常整理,摘要一律輸出繁體中文
4. 每一堂整理成以下格式:
   - 課程標題
   - 3-5 個重點摘要(條列式)
   - 提到的關鍵框架/名詞定義(例如 HR 流程、AI 工具名稱、評估模型等,如有明確提及)
   - 提到的 HR 實務痛點與 AI 解決方式(如有提到):這部分請具體描述,是我挖掘 SaaS 靈感的重點
   - 純案例分享而非概念講解的堂數,註明「本堂偏案例研討」
5. 每完成一個章節(Section)就先將該章節整理結果暫存一次,避免中斷後前功盡棄
6. 全部完成後,依課程順序彙整成一份 Markdown 筆記檔案輸出給我,內容開頭依序包含:
   - 標題與日期時間
   - 課程原文名稱與課程連結(連結需為完整網址,確保可點擊開啟)
   - 「全課程重點大綱」:用一段話總結整門課的核心脈絡
輸出語言:全部使用繁體中文(台灣用語習慣)。
逐字稿不存在或抓不到的堂數,直接跳過並在筆記中標註「無法取得字幕」,禁止用你自己的知識補內容或臆測課程內容。
執行時遇到需要登入或權限確認的畫面,請暫停等我處理。
```

##### 提取 ideas
``` bash
我附上「AI for HR」課程(https://www.udemy.com/course/ai-hr-ru/)的課程筆記(附檔 md),請基於筆記內容分析,不要依賴你自己對這門課的猜測。
背景:我是獨立開發者,正在尋找可行的 SaaS 產品題目,想從這門課挖掘 **HR 領域的 AI SaaS** 靈感。
請依序輸出:
1. **可轉化的 HR SaaS 機會點**:從筆記中找出 3-5 個切入點。每個機會點說明:對應筆記中哪個章節/概念、對應的 HR 流程環節(招募、入職、績效、學習發展、薪酬、離職等)、解決什麼痛點、簡述產品形式
2. **每個機會點的 HR 市場特性評估**:
   - 目標買家是誰(HR 主管?中小企業老闆?招募顧問?)以及買單意願
   - 資料敏感度與隱私/法規風險(員工個資、勞動法規、AI 招募相關規範)高低
   - 市場上是否已有類似產品(如known)、差異化空間
   - 以獨立開發者的資源做 MVP 的難度(高/中/低)與理由
3. **推薦優先順序**:選出最值得先做的 1-2 個,說明理由;優先考量「痛點明確、資料敏感度低、單一功能就能成立」的題目,避開需要深度整合企業 HR 系統才能運作的方向
4. **下一步驗證建議**:針對推薦的題目,列出在寫程式之前應該先做的市場驗證動作(例如去哪些社群找 HR 從業者訪談、如何用 landing page 測需求)
注意:分析要基於筆記實際內容,如果某個機會點是你自己延伸推論而非筆記直接提到的,請標註「延伸推論」。課程若以特定地區(如俄語市場)為背景,評估時請以台灣/國際市場的適用性重新檢視,並註明差異。輸出使用繁體中文(台灣用語)。
```

### Ref
+ 課程整理
  + [Udemy課程管理 與 試算表同步 - claude](https://claude.ai/chat/00598057-b354-46de-8f55-01cd2f6ed80d)
  + [抓取 Udemy 購買紀錄(start from 131, 70 pages) - claude](https://claude.ai/cowork/cse_01Nxs19e1BCGfQJGqDrR14qZ)
  + [抓取課程頁面詳情(from line 171, 80 lines ) - claude](https://claude.ai/cowork/cse_01BJY6VoiNiG4qkP4A1dVgiR)
+ 課程筆記
  + [用Claude整理Udemy課程內容](https://claude.ai/chat/88f5c694-9994-46ab-ac44-9680775fded1)
  + [Claude Fable MasterclassUdemy 課程筆記整理](https://claude.ai/cowork/cse_01EHLvbELVfDyzNfKCwWAeYZ)
  + [MCP for Leaders 課程筆記整理](https://claude.ai/cowork/cse_01DRMAb8hxE38EC1RAtJz2w4)
+ 筆記應用
  + [Claude Fable MasterclassUdemy - Narrative structure design](https://claude.ai/cowork/cse_01FgqhRCjPVuQ14WQDTXCNZD)
  + [Claude Fable MasterclassUdemy - Narrative structure 執行 ](https://claude.ai/cowork/project/019ffe6c-92e8-7726-a98e-082a16681498)
  + [MCP課程筆記轉實際應用](https://claude.ai/chat/1ebf9e0b-28f3-48e4-84a5-99d6ad04990c)
+ 提案筆記
  + [AI 變革願景溝通平台解析 - gemini pretty](https://gemini.google.com/u/1/app/21acaf3b5b91687e?pageId=none)
  + [如何用 Landing Page 測需求 - gemini pretty](https://gemini.google.com/u/1/app/ede2a6666d66f138?pageId=none)
  + [*** 智慧佔比趨勢雷達 - gemini pretty](https://gemini.google.com/u/1/app/2d8769fb6313cdfb?pageId=none)
+ 系統討論
  + [設工專案管理系統 - gemini pretty](https://gemini.google.com/u/1/app/24bb0e47cb17b6ef?pageId=none)
  + [正式站升級評估](https://claude.ai/code/artifact/fac3f2a1-9a1e-43ff-b77f-70338e79b009)
  + [Email 驗證設定手冊](https://claude.ai/code/artifact/dc429730-a5e2-4847-8ebd-13f98f834721)
  + [通用 Email 驗證設定指南](https://claude.ai/code/artifact/a286ff9f-8c16-496f-960b-705852efae19)