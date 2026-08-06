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

<!--more-->

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