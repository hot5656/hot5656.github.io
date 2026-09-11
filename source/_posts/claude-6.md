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

<!--more-->

### Tools
#### uv
{% note info %}
**uv** 是一個由知名 Python 工具團隊 Astral（也是開發程式碼檢查工具 Ruff 的團隊）使用 **Rust** 語言編寫的**超高速 Python 套件管理器與專案管理工具**。

你可以把它理解成 **「極速版、全功能合一的 pip + pip-tools + venv + pipx」**。

---

**1. uv 的核心特色**

* **速度快（比傳統 pip 快 10 到 100 倍）**：
因為是用 Rust 開發，它在解析相依性（Dependency Resolution）、下載 Wheels 和安裝套件時具有平行處理與全域快取機制，速度極快。
* **不需要事先安裝 Python 也能用**：
`uv` 可以自動幫你下載、安裝並切換不同版本的 Python（例如自動安裝 Python 3.11 或 3.12），省去手動到官網安裝或設定 pyenv 的麻煩。
* **相依性鎖定（Lockfile）**：
它支援類似 Node.js `package-lock.json` 或 Rust `Cargo.lock` 的精準相依鎖定（`uv.lock`），確保跨平台環境部署的一致性。

---

**2. 為什麼很多 MCP Server（如 Claude、AWS MCP）都在用它？**

你在安裝許多 AI 工具或 MCP Server 時常常看到它，主要是因為它的附帶指令 **`uvx`**：

* **什麼是 `uvx`？**
`uvx` 等同於 Python 版的 `npx`。
* **免安裝立即執行**：
以往要跑一個 Python 套件，你得先建虛擬環境（`venv`）、再用 `pip install`、最後再執行。
使用 `uvx` 時，它會自動建立一個暫存沙盒環境、下載最新版套件並直接執行，執行完畢後不殘留垃圾檔案。

例如這行 MCP 設定：

```bash
uvx awslabs.aws-api-mcp-server

```

這就是告訴系統：「**用 uv 快速下載官方 AWS MCP 工具並直接在背景運行起來**」，省去了繁瑣的環境設定流程。

---

**3. 常見指令對照**

| 傳統 Python 工具 | `uv` 對應指令 | 說明 |
| --- | --- | --- |
| `pip install requests` | `uv pip install requests` 或 `uv add requests` | 安裝套件 |
| `python -m venv .venv` | `uv venv` | 建立虛擬環境（幾乎秒建） |
| `pipx run <tool>` / `npx <tool>` | `uvx <tool>` | 免安裝直接執行 Python 命令列工具 |
| 手動下載 Python 安裝檔 | `uv python install 3.12` | 自動下載並設定指定 Python 版本 |
{% endnote %}

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

#### github --> delopy Vercel+Supabase
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

#### set dupabase for multi app
{% note info %}
這份紀錄整理由原本的內部管理系統（`public`）共用同一個 Supabase 實體，擴充給新專案 `Flight Price Notifier`（`flight` schema）時的隔離架構與執行步驟。

---

***1.架構與隔離策略***

| 隔離維度 | 現有應用程式（Project Management） | 新應用程式（Fare Finder Pro） |
| --- | --- | --- |
| **資料庫 Schema** | `public` | `flight` |
| **Data API 暴露** | 預設 `public` | 需額外加入 `flight` |
| **Auth 區隔機制** | `auth.users.raw_app_meta_data -> 'apps'` 包含 `"project-management"` | `auth.users.raw_app_meta_data -> 'apps'` 包含 `"fare-finder-pro"` |
| **Trigger 觸發時機** | `AFTER INSERT` 寫入 `public.profiles`（預設角色 `designer`） | `BEFORE INSERT` 寫入 `raw_app_meta_data`，兩者時機互不干擾 |

---

***2.執行步驟***

**步驟 1：建立 Schema 並暴露 Data API**

1. 進入 Supabase **SQL Editor** 建立專用 Schema：
```sql
CREATE SCHEMA flight;

```


2. 前往 **Project Settings** > **Data API** > **Settings** > **Exposed schemas**。
3. 勾選 `flight` 並儲存。

**步驟 2：事前衝突與相容性檢查（Pre-flight Checks）**

* **檢查現有 Trigger：** 確認 `auth.users` 上已存在 `on_auth_user_created`（`handle_new_user()`），新註冊帳號會自動在 `public.profiles` 建立一筆預設值資料。
* **檢查 metadata 依賴：** 查驗 `pg_proc` 確認現有函數皆未寫入 `raw_app_meta_data`，可自訂 `apps` 陣列標籤。
* **驗證 `public.profiles` 欄位約束：**
```sql
SELECT column_name, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;

```


*結果：* `department` 與 `title` 為 Nullable，其餘非空欄位均有預設值或由 `coalesce` 處理，不會阻擋 Flight 使用者註冊。

**步驟 3：套用 Migration 與校準 CLI 狀態**

1. 在 **SQL Editor** 執行 migration 腳本：
* `20260904120000_flight_app_scoped_auth.sql`


2. 透過 Supabase CLI 同步本機 migration 追蹤狀態：
```bash
supabase migration repair --status applied 20260904120000
supabase migration list

```



**步驟 4：回溯標記現有帳號（Backfill）**
對已存在 `public.profiles` 的舊帳號，一次性補上原本所屬的 `project-management` 標籤，並保留陣列去重特性：

```sql
UPDATE auth.users
SET raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object(
    'apps',
    CASE
      WHEN jsonb_typeof(raw_app_meta_data -> 'apps') = 'array' THEN (
        SELECT coalesce(jsonb_agg(DISTINCT v), '[]'::jsonb)
        FROM jsonb_array_elements_text(
          (raw_app_meta_data -> 'apps') || '["project-management"]'::jsonb
        ) v
      )
      ELSE '["project-management"]'::jsonb
    END
  )
WHERE id IN (SELECT id FROM public.profiles);

```

**步驟 5：驗證結果**
確認使用者帳號包含專屬的 app 權限清單：

```sql
SELECT email, raw_user_meta_data, raw_app_meta_data
FROM auth.users
WHERE email = 'pm.demo@example.com';

```

---

***3.注意事項與後續待辦***

* **`public.profiles` 副作用：** Flight 使用者註冊時仍會自動在 `public.profiles` 產生一筆 `role = 'designer'` 的紀錄。若未來需完全乾淨隔離，需調整 `handle_new_user()` 函式，依據 `raw_app_meta_data` 或註冊來源跳過非 PM 系統的帳號。
* **RLS 策略綁定：** `flight` schema 內的資料表應在 RLS Policy 中透過 `(auth.jwt() -> 'app_metadata' -> 'apps')::jsonb ? 'fare-finder-pro'` 限制只有該 App 標籤的使用者才可存取。
{% endnote %}

### Cowork
#### setup AWS API MCP Server - Windows
##### create project + install AWS API MCP Server
```` bash
# claude create project for flight-price-notifier
Claude
  --> projects
  --> New project
  --> flight-price-notifier

# claude set memory
Settings
  --> Memory
    Search and reference chats:enable
    Generate memory from chats:enable
  --> Capabilities
    Connector search
    Switch models when a message is flagged

# AWS get IAM key
AWS
  --> search IAM
  --> IAM user
  --> 建立人員
  --> admin-for-project-flight-price-notifier-001
  --> 直接連接政策
  --> search administrator
  --> select "administratorAccess"
  --> 建立人員
  --> select admin-for-project-flight-price-notifier-001
  --> 安全憑證
  --> 建立存取金鑰
  --> select 命令列界面 (CLI)
      我了解上述建議，並希望繼續建立存取金鑰
  --> 建立存取金匙


# install AWS CLI - for windows
[AWS CLI](https://awscli.amazonaws.com/AWSCLIV2.msi)

# Claude desktop --> Code : set AWS credential
``` bash
"
I have new AWS credentials I want to configure. Please write them to my AWS credentials file. Here are the values:
Access key ID: XXXXX
Secret access key: XXXXX
First, detect whether I'm on Mac/Linux or Windows to determine the correct credentials file path 
(~/.aws/credentials on Mac/Linux, %USERPROFILE%\.aws\credentials on Windows), 
then write the [default] profile with the new values — preserving any other existing profiles in the file. 
Once done, test the connection using aws sts get-caller-identity.
"
```

# response  - windows
``` bash
Summary
  + Platform detected: Windows
  + Credentials file: C:\Users\RobertKao\.aws\credentials — no file existed previously, so I created the .aws directory and file with just the [default] profile (no other profiles to preserve).
  + Connection test: aws sts get-caller-identity failed — the AWS CLI isn't installed or isn't on your PATH in this environment.

Success. The credentials are valid and working:
  + UserId: AIDA22QZ4DNKPHL5JRESL
  + Account: 744157354836
  + ARN: arn:aws:iam::744157354836:user/admin-for-project-flight-price-notifier-001
```

# powershell connect test - windows
``` bash
aws sts get-caller-identity
{
    "UserId": "AIDA22QZ4DNKPHL5JRESL",
    "Account": "744157354836",
    "Arn": "arn:aws:iam::744157354836:user/admin-for-project-flight-price-notifier-001"
}
```

# add connector AWS API MCP Server - windows
# 使 Claude 可使用 AWS 的 resource
Customize
  --> Connector
  --> search AWS
  --> AWS API MCP Server
  --> Install 

# connect fail make sure - windows
```
# run at powershell
aws sts get-caller-identity
python --version
uv --version
# if need install
"
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  downloading uv 0.12.12 (x86_64-pc-windows-msvc)
  installing to C:\Users\RobertKao\.local\bin
    uv.exe
    uvx.exe
    uvw.exe
  everything's installed!

  To add C:\Users\RobertKao\.local\bin to your PATH, either restart your shell or run:
      set Path=C:\Users\RobertKao\.local\bin;%Path%   (cmd)
      $env:Path = "C:\Users\RobertKao\.local\bin;$env:Path"   (powershell)
"
```

# Claude make sure link success
``` bash
# ask claude 
> 幫我列出我的 S3 bucket

你的 AWS 帳號目前在 S3 沒有任何 bucket——查詢結果是空的列表。
可能原因:
這個帳號確實還沒建立過任何 bucket
使用的憑證/profile 對應到的帳號不是你預期的那個
要不要我幫你建立一個新的 bucket,或是檢查一下目前使用的是哪個 AWS 帳號/憑證?

# course give
> How many IAM users do I have on my AWS account?
  You have 1 IAM user on your AWS account.
  (Side note, unrelated to your question: the AWS API MCP connector you're using shows a deprecation notice — AWS recommends migrating to their newer "AWS MCP Server" at some point. Not urgent, just flagging it since it showed up in the tool response.)
```
````

##### AWS API MCP Server issue - windows
{% note info %}
**問題總結**
你遇到的其實是**三個獨立的問題疊在一起**,一路排查下來剛好都踩到:

**1. `McpError` 改名(套件依賴沒鎖版)**
MCP 的 Python SDK 在 2026-07-28 發布 2.0.0 版,把 `McpError` 類別改名成 `MCPError`。AWS API MCP Server 這個 extension 內建的 `pyproject.toml` 雖然有寫 `mcp>=1.23.0,<2.0.0`,但因為 `uv run --with .` 每次啟動都是重新解析依賴、沒有鎖定的 lockfile,一開始你裝的那份還是抓到了衝突的組合,直接 import 失敗。

**2. Claude Desktop 的啟動逾時 vs. uv 冷啟動太慢**
就算依賴版本對了,這個 extension 每次啟動都要讓 uv 重新建虛擬環境、裝 91 個套件(boto3、botocore 這些偏重的套件),要 20-30 秒。但 Claude Desktop 對 Cowork/Code session 設的逾時大概只有 19 秒左右,兩者打架,導致伺服器其實有啟動成功,但 Claude 已經先放棄連線了(`Request timed out`)。

**3. Extension 綁定的原始碼版本太舊、本身有 bug**
Claude Desktop 目錄裡包的這個 extension 版本停在 **1.3.3**,而 PyPI 上官方已經出到 **1.5.4**(官方甚至已經宣布這個 server 要停止開發,建議轉用新的 AWS MCP Server)。1.3.3 這個版本的程式碼本身有一個 circular import 的 bug(`core/__init__.py` 匯入 `data` 模組時互相卡住),跟快取、防毒软件都無關,單純是那個版本沒修好。

**最終解法**是修改 `manifest.json`,讓它不要每次去 build extension 資料夾裡那份過時的本機原始碼,改成直接用 `uv tool run --python 3.12 awslabs.aws-api-mcp-server@latest` 去抓 PyPI 上最新、已修好的正式版套件執行 —— 一次繞開了「舊版 bug」跟「本機重複建置太慢導致逾時」這兩個問題。
{% endnote %}

##### AWS API MCP Server fix - windows
{% note info %}
**一. 真正有效、解決問題的指令**

按照實際生效的順序:

**1. 找到正確的 Log 路徑(診斷用,非修復,但沒這步就看不到後面任何線索)**
```powershell
Get-ChildItem "$env:LOCALAPPDATA\Packages" -Filter "Claude_*" -Directory
```
確認出真實路徑是 `...\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\...`,後面所有操作都建立在這條路徑上。

**2. 手動預跑,讓 uv 建好本機快取(讓你看到真正的錯誤訊息,而非被逾時掩蓋)**
```powershell
cd "C:\Users\RobertKao\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\Claude Extensions\ant.dir.gh.awslabs.aws-api-mcp-server"
uv run --with . --python 3.12 python -m awslabs.aws_api_mcp_server.server
```
這一步的價值不是「修好」,是讓 `McpError`、`circular import` 這些真正的錯誤訊息浮出來,不然一直被 Claude Desktop 的逾時擋住看不到根因。

**3. 關鍵驗證:直接測試 PyPI 最新版是否有同樣的 bug**
```powershell
uvx awslabs.aws-api-mcp-server@latest
```
這一步證實了「circular import 是舊版 1.3.3 本身的 bug,新版沒有」——是整個排查的轉折點。

**4. 真正解決問題的修改:改寫 `manifest.json`**
把:
```json
"command": "uv",
"args": ["run", "--directory", "${__dirname}", "--with", ".", "--python", "3.12", "python", "-m", "awslabs.aws_api_mcp_server.server"]
```
改成:
```json
"command": "uv",
"args": ["tool", "run", "--python", "3.12", "awslabs.aws-api-mcp-server@latest"]
```
**這是唯一真正修好問題的改動** —— 讓 Claude Desktop 不再去 build 那份有 bug 的本機舊原始碼(1.3.3),改成直接執行 PyPI 上已修好的正式版套件(1.5.4)。

---

**二. 沒有實際幫助、算是繞路的部分**

- `uv cache clean` / 刪 `.venv` 重建 —— 沒解決問題,circular import 是程式碼問題不是快取問題
- Windows Defender 排除清單 —— 有稍微加快安裝速度,但不是關鍵,真正解法是版本問題不是速度問題
- 一開始加 `mcp<2.0.0` 版本上限(你原本 `pyproject.toml` 其實已經有鎖)—— 這個是必要條件但不是充分條件,鎖版之後還有第三個 bug(circular import)才是卡最久的
- 手動用 `uvx` 當 `command`(第一次改法)—— 這個改法本身是錯的,因為這個 host 會把 `uvx` 轉譯成 `uv.exe`,直接接 `--python` 會噴 `unexpected argument`;後來改成完整寫 `uv tool run` 才是對的版本

一句話總結:**真正修好問題的是最後那次 `manifest.json` 的改動**,前面的診斷步驟都是為了讓你(和我)找到該改哪裡、改成什麼。
{% endnote %}

##### Note
```` bash
# fix version
# manifest.json 
# show vesrion(但不一定會更新)
"display_name": "AWS API MCP Server",
"version": "1.3.3", --> "version": "1.5.5"
# pcakage version  
# 避免自動更新
"mcp_config": {
  "command": "uv",
  "args": [
    "tool",
    "run",
    "--python",
    "3.12",
    "awslabs.aws-api-mcp-server@latest" --> "awslabs.aws-api-mcp-server@1.5.5"
  ],
  "env": {
    "PYTHONIOENCODING": "utf-8"
  }
}
# 更新
"mcp_config": {
  "command": "uv",
  "args": [
    "tool",
    "run",
    "--python",
    "3.12",
    "--with",
    "mcp<2.0.0",
    "awslabs.aws-api-mcp-server@1.5.5"
  ],
  "env": {
    "PYTHONIOENCODING": "utf-8"
  }
}

# dump theserver version
uv tool run --python 3.12 --with awslabs.aws-api-mcp-server python -c "import importlib.metadata; print(importlib.metadata.version('awslabs.aws-api-mcp-server'))"
  1.5.5

# log path
C:\Users\RobertKao\AppData\Local\Claude\Logs\mcp-server-AWS API MCP Server.log
# manifest.json path
C:\Users\RobertKao\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\Claude Extensions\ant.dir.gh.awslabs.aws-api-mcp-server\

# 更改 manifest.json 要執行
Remove-Item -Recurse -Force "C:\Users\RobertKao\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Local\uv\cache\archive-v0\sFPQ3RN0q39AFd3D" -ErrorAction SilentlyContinue
````

#### vercel connector
```` bash
# claude desktop
Customize
  --> Connectors
  --> search vercel
  --> install
  --> Connect to Claude
  --> configuration 
  --> Access to all current and future projects
  --> Allow Access

# verify link
> what project are in my vercel account?
````

#### supabase
``` bash
# claude desktop
Customize
  --> Connectors
  --> search supabase
  --> Connect to Claude
  --> Authorize Claude

# verify link
how many project are in my supabase organization?
```

#### other
```` bash
# github
my account
  --> Settings
  --> Personal access tokens
  --> Fine-grained token
  --> Generate new token
    Token name: flight-fare-notifier
    Description: flight-fare-notifier
    Only select repositories: fare-finder-pro 
  --> add permission:Contents
    contents:Read only --> Read and write
  --> Generate token
  --> Generate token
  --> copy token 

# claude 
```
# set to claude
Here is my GitHub Personal Access Token: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
Use aws mcp to store it in secrets manager so we can re-use it in a new session 

# response
Stored. It's now in AWS Secrets Manager as:
Secret name: github-pat-robert
ARN: arn:aws:secretsmanager:us-east-1:744157354836:secret:github-pat-robert-7dM44V
To retrieve it in a future session: aws secretsmanager get-secret-value --secret-id github-pat-robert --query SecretString --output text

One thing worth flagging: since the token was pasted directly into this chat, it's now sitting in this conversation's history in plaintext (in addition to being in Secrets Manager). If that history is something you're not fully comfortable with holding a live credential, it'd be safer to rotate/regenerate the PAT on GitHub and update the secret with the new value — that way the one in this chat log becomes worthless even if it were ever exposed.
```

#```
# == 更改 app login and logout 方式(我不用) ==
#GITHUB REPO: XXXXX
#Convert this project to a plain Vite + React single-page app (SPA) #suitable for static hosting on Vercel. 
#Remove any TanStack Start / SSR / server-side rendering and any #Cloudflare/wrangler config. 
#Use React Router for client-side routing (/, /app, sign-in, #sign-up). 
#The build output must be a static SPA (vite build → dist/) with a #SPA fallback so deep links like /app resolve client-side. 
#Keep all existing UI, auth, and styling unchanged.
#
# == push to change to github ==
#push the new Vercel-Compatible structure change to my gitbhu repo. 
#Override the main branch to apply the new Vercel-Compatible structure.
#```


````



### Ref
+ AI 機票價格追蹤功能
  + [ claude-2-ai-video-speedreader--> Lovable Best Practice- Github](https://github.com/uopsdod/claude-2-ai-video-speedreader/tree/main/.claude/skills/lovable-best-practice)
  + [Lovable Best Practice 說明 - pretty gemini](https://gemini.google.com/u/1/app/dd3f939981b7c6bd) : 指導 Claude 「如何與 Lovable 協同開發，或按照 Lovable 的架構規範產出高品質程式碼」
  + [AWS](https://aws.amazon.com/tw/)
  + [TraverlPayouts](https://www.travelpayouts.com/)
  + [Resend](https://resend.com/)
  + [綠界 (ECPay)](https://www.ecpay.com.tw/)
+ Tools
  + [JSONLint - json verify](https://jsonlint.com/)
