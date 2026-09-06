---
title: Claude Code 實戰：12 小時打造會自己賺錢的 AI SaaS
abbrlink: 7d83
date: 2026-09-03 12:17:24
categories:
tags:
---

### top
``` bash
# 怎麼將專業變成收入
1. 想辦法讓你的專業跟經驗透過某一種方式輸出
  文章,影片,部落格,Podcast
2. 有辦法接觸到你第一批潛在客戶, 拿到第一批客戶

# 軟體開發流程
1. 本地開發程式(AI)
2. 部署 - Vercel
3. 資料庫 - Supabase
4. 串金流 - Stripe(國外), 綠界(台灣)
5. 專屬網域

# 產品值不值的做
1. 能不能接觸到第一批潛在客戶

# 收費方式
1. 點數製:AI字幕生成工具, AI影片速讀器, 剪成短影片
2. 訂閱製:稀有產品上線通知, 機票通知
3. 平台抽成:MarketPlace二手轉賣抽成10~15%(找賣方-->找買方)

# github search "flight"
user:name flight
```

### AI 機票價格追蹤功能

#### Lovable generate home page
{% note info %}
**1. download lovable-best-practice SKILL.md**
[lovable-best-practice](https://github.com/uopsdod/claude-2-ai-video-speedreader/blob/main/.claude/skills/lovable-best-practice/SKILL.md)
**2. download supabase-best-practice SKILL.md**
[supabase-best-practice](https://github.com/uopsdod/claude-2-ai-video-speedreader/blob/main/.claude/skills/supabase-best-practice/SKILL.md)

**3. Lovable genetate home page**
+ login Lovable
+ upload previous skill
+ write prompt
```
Build a SaaS landing page + authenticated app shell for Flight Price Notifier
(機票降價通知), a product that watches popular flight routes from Taipei and
emails the user when the cheapest fare drops to or below their target price —
targeted at budget-driven travelers who don't care exactly when they fly,
they just want a ticket under their budget.

The site must include:

A public landing page (/) with:

Hero section: product name "Flight Price Notifier" prominently displayed,
value prop 「設定航線與目標價，機票降價就通知你」(English subtitle: "Set a
route and a target price — we email you when the fare drops."), and a
primary CTA button labeled "Sign in / 登入" in the top-right header.

Three feature cards below the hero, each with an icon, a Chinese title, an
English subtitle, and a one-line Chinese description:

Card 1: ✈️ icon — "盯緊熱門航線" / "Always-on route watching" —
"持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。"

Card 2: 🔔 icon — "達標自動通知" / "Target-price email alerts" —
"低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。"

Card 3: 🚫 icon — "隨時取消" / "Cancel anytime" —
"月訂閱制，不想用隨時停，沒有綁約。"

A simple footer with "© 2026 Flight Price Notifier".

An authenticated area with a /auth page (Supabase email/password auth):

Heading "Welcome back．登入", subtitle "Sign in to manage your fare alerts.",
Email field (placeholder "you@example.com") and Password field, a primary
button "Sign in / 登入", and a toggle link "No account yet? Create one" to
switch to sign-up mode.

After signing in, redirect to a placeholder dashboard page.

Style requirements:

Modern, professional dark theme (purple/violet accent on a near-black
background)

Use Inter or a similar sans-serif font

Mobile responsive

Tasteful subtle animations (fade-in on scroll is fine; don't overdo it)

Out of scope for this v1: route-subscription form, target-price input, fare
display, payment, custom database tables (do NOT create a subscriptions or
profiles table — only use Supabase's default auth.users). Those come in
later milestones. Stick to landing page + auth + placeholder dashboard.
```

**4. try it**
+ open another screen by icon
+ create account: google 001-jdvksfkjg
+ confirm by emain
+ login

**5. connect to github**
+ Lovable icon
+ Settings
+ Git
+ Github
+ Add acount
+ Connect
+ make sure gihub have the respository

{% endnote %}

#### github --> delopy vVercel+Supabase
```` bash
# clone from github
git clone https://github.com/hot5656/fare-finder-pro.git

# set supabase for resend SMTP
# resend verify domain key and get API key

# email verify(Configure Send Email hook ) 
# 1. if supabase not install - install
# npm install -g supabase
# 2. link supabase
# Personal Access Tokens (PAT) 已經達到上限（最多 20 個），導致 CLI 在嘗試建立新的登入 session 時被拒絕。
# a. 打開瀏覽器並登入 Supabase Dashboard Account Tokens（路徑：點擊右上角個人頭像 → Account settings → 側邊欄 Access Tokens）。
# b. 在 Personal access tokens 列表中，找到名稱類似 Supabase CLI 或不再使用的舊 Token。
# c. 點擊右側的 Revoke（撤銷 / 刪除）按鈕，刪除數個過期的 Token，保留額度。
supabase login
supabase link --project-ref <supabase_id>
# 3. 設定 Edge Function 用到的環境變數
supabase secrets set RESEND_API_KEY=<你的 Resend API key>
# 4. set send-email/index.ts 裡的 SENDER 常數換成你在 Resend 驗證過的真實網域
SENDER = "Flight Price Notifier <noreply@roberthut.com>"
# 5. 部署 Edge Function
supabase functions deploy send-email --no-verify-jwt
# 6. 在 Dashboard 註冊 Send Email Hook
Authentication 
  --→ Emails 
  --> Upgration to Pro/Configure Send Email hook(select Configure Send Email hook) 
  --> HTTPS
  -->  URL: https://<supabase_id>.supabase.co/functions/v1/send-email
  --> generate secret
  --> create hook
# 7. set secrets to cli
supabase secrets set SEND_EMAIL_HOOK_SECRET=<剛顯示的 secret> 
# 8. set supabase rate limit per hour
Authentication 
  ➔ 點選 Rate Limits: 2 --> 30
  Email rate limit per hour（每小時發信總量上限）：預設通常為 30，可調大（例如改為 100 或 300）。
# 9. run web site --> No account yet? create by one

# deploy to vercel
# 1. generate skill
help me create my custom command in @.claude/commands/deploy_vercel.md . I want to deploy my local project to vercel. Once done, give me the url to see my project on the internet.
# vercel login
! vercel login
# reopen new session do deploy
/deploy_vercel

# set vercel Environments
Setting
  --> Environments
  --> Production
  --> Add Environment Variable
    set 4 variable 
    SUPABASE_PUBLISHABLE_KEY
    SUPABASE_URL
    VITE_SUPABASE_PUBLISHABLE_KEY (select config)
    VITE_SUPABASE_URL (select config)

# fix confirm link 不能跳回登入畫面
Authentication
  --> URL Configuration
  --> Site URL: https://fare-finder-pro.vercel.app
  --> Redirect URLs:
    https://fare-finder-pro.vercel.app/**
    https://fare-finder-pro-*-roberts-projects-2b1cd09b.vercel.app/**
    http://localhost:8080/** 

# 刪除 user
點擊左側最外層側邊欄的 Authentication（人員/鑰匙圖示，不是 Table Editor）。
  --> 點選子分頁 Users。
  --> 找到該使用者勾選
  --> 上方列 Delete 1 users
````

```` bash
# add schema
supabase
  --> SQL Editor
    CREATE SCHEMA flight; 
  --> run
  # add to Exposed schemas
  --> Project Setting
  --> Data API
  --> Settings
  --> Exposed schemas
  --> select flight
  --> save

# check 是否依有衝突
# 1. 查 auth.users 上有沒有現有的 trigger：
```
SELECT
  tgname AS trigger_name,
  tgrelid::regclass AS table_name,
  proname AS function_name,
  pg_get_functiondef(tgfoid) AS function_body
FROM pg_trigger
JOIN pg_proc ON pg_proc.oid = pg_trigger.tgfoid
WHERE tgrelid = 'auth.users'::regclass
  AND NOT tgisinternal;
```
--> ...內容略
--> 這個 Supabase 專案的 auth.users 已經有一個現成的 trigger on_auth_user_created，會呼叫 
  handle_new_user()，每次任何 app 的使用者註冊，都會自動在 public.profiles 建一筆對應資料
  （欄位是 employee_no、full_name、department、title、role，role 預設 'designer'，看起來是另一個
  內部員工管理系統用的表）。
# 這對我們有兩個重要含意：
1. 這代表你們這個 Flight Price Notifier app 的使用者，現在只要透過 /auth 註冊，也會被這個既有 trigger 自動塞一筆進 public.profiles（role 會是預設值 'designer'）——這是原本就存在、跟我們現在要做的功能無關的既有行為，只是我沒有事先讓你知道會有這個副作用，先跟你確認一下：這樣可以嗎？還是你希望我們的 trigger 順便讓 Flight app 的使用者跳過這個 public.profiles 建立？
2. 沒看到任何地方用到 app_metadata / raw_app_meta_data——所以目前完全沒有「哪個帳號屬於哪個 app」這種標記慣例，我們是第一個要做這件事的 app，可以自己定義 key 名稱（例如 app_metadata.app = 'fare-finder-pro'），不會跟誰打架。我們新加的 trigger 只要用 BEFORE INSERT（在 row 真正寫入前直接改 NEW.raw_app_meta_data），跟這個既有的 AFTER INSERT trigger 時機不同、動的也是不同欄位/不同表，兩者不會互相干擾。

# 2. 查有沒有任何函式已經在動 app_metadata / raw_app_meta_data（看看其他 app 有沒有自己的標記慣例）：
``` 
SELECT n.nspname AS schema, p.proname AS function_name
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE p.prosrc ILIKE '%raw_app_meta_data%'
   OR p.prosrc ILIKE '%app_metadata%';
```
--> Success. No rows returned
--> 結果很乾淨：完全沒有任何函式用到 app_metadata / raw_app_meta_data，代表我們是第一個訂這個標記規則的 app，可以自己定，不會跟任何人衝突。


# 執行
# 1. 第 0 步預檢（阻塞操作－在遷移之前執行）
# run
```
SELECT column_name, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;
``` 

# response
```
| column_name | is_nullable | column_default        |
| ----------- | ----------- | --------------------- |
| id          | NO          | null                  |
| employee_no | NO          | null                  |
| full_name   | NO          | null                  |
| email       | NO          | null                  |
| department  | YES         | null                  |
| title       | YES         | null                  |
| role        | NO          | 'designer'::user_role |
| is_active   | NO          | true                  |
| created_at  | NO          | now()                 |
| updated_at  | NO          | now()                 |
```

# 分析
```
Yes, that's exactly what we needed — department and title are both is_nullable = 'YES', so they'll happily accept NULL from Flight-app signups. Every other NOT NULL column (id, employee_no, full_name, email, role) is already covered by handle_new_user()'s coalesce(...) fallbacks, and is_active/created_at/updated_at have their own defaults (true, now(), now()). No blocker — Step 0 passes.
```

# 2. run migrationat SQL Editors
```
# 20260904120000_flight_app_scoped_auth.sql

# update status(手動更新狀態)
supabase migration repair --status applied 20260904120000
# show migration status
supabase migration list
```

# check account 是否被限制
```
select email, raw_user_meta_data, raw_app_meta_data
from auth.users
where email = 'pm.demo@example.com';
```

# response
```
| email               | raw_user_meta_data                                                                                                                                | raw_app_meta_data                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| pm.demo@example.com | {"app":"fare-finder-pro","role":"project_manager","title":"工務主管","full_name":"陳工務","department":"工務部","employee_no":"E002","email_verified":true} | {"apps":["fare-finder-pro"],"provider":"email","providers":["email"]} |
```

# 2nd app
```
```

# public app
# 1. check public.handel_new_user() 定義, employee_no 如何計算
``` 
SELECT pg_get_functiondef(oid)
FROM pg_proc
WHERE proname = 'handle_new_user' AND pronamespace = 'public'::regnamespace;
```

# 1. project-manage management modify code

# 2. 對現有帳號一次性補上該 app 自己的名稱，SQL
```
update auth.users
set raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object(
    'apps',
    case
      when jsonb_typeof(raw_app_meta_data -> 'apps') = 'array' then (
        select coalesce(jsonb_agg(distinct v), '[]'::jsonb)
        from jsonb_array_elements_text(
          (raw_app_meta_data -> 'apps') || '["project-management"]'::jsonb
        ) v
      )
      else '["project-management"]'::jsonb
    end
  )
where id in (select id from public.profiles);
```


```
update auth.users
set raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object(
    'apps',
    coalesce(raw_app_meta_data -> 'apps', '[]'::jsonb) || to_jsonb('<你的-app-名稱>'::text)
  )
where id in (/* 這個系統現有帳號的 id 清單 */);
```

````

### Ref
+ AI 機票價格追蹤功能
  + [ claude-2-ai-video-speedreader--> Lovable Best Practice- Github](https://github.com/uopsdod/claude-2-ai-video-speedreader/tree/main/.claude/skills/lovable-best-practice)
  + [Lovable Best Practice 說明 - pretty gemini](https://gemini.google.com/u/1/app/dd3f939981b7c6bd) : 指導 Claude 「如何與 Lovable 協同開發，或按照 Lovable 的架構規範產出高品質程式碼」
  + [AWS](https://aws.amazon.com/tw/)
  + [TraverlPayouts](https://www.travelpayouts.com/)
  + [Resend](https://resend.com/)
  + [綠界 (ECPay)](https://www.ecpay.com.tw/)