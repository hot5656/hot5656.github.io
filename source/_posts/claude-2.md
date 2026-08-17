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

### 整理 Udemy 課程
#### record
```  bash
get course 
  stat page   length
    81        50(22%)
    131       70(29%)
    201       70(18%)
    271       100

get course detail 
  start line  length
    101       70
    171       80(23%)
    251      100(41%)
    351      100(21%)
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
課程名稱、課程連結、第一語言、類別、主要主題、相關主題、最近更新日期、購買日期、付款方式、交易金額

(第一語言、類別、主要主題、相關主題、最近更新日期 這五欄目前留空,由另一個任務補上,
這次不用處理這五欄)

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
此腳本只會「附加新列到目前資料範圍的最後面」,不會覆蓋任何既有儲存格:

```javascript
function appendCourseData() {
  var NEW_DATA = [
    // 依序放入本次去重複後、待新增的課程資料
    // 格式:[課程名稱, 課程連結, "", "", "", "", "", 購買日期, 付款方式, 交易金額]
    // (第一語言、類別、主要主題、相關主題、最近更新日期 五欄留空字串)
  ];

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Udemy課程");
  var lastRow = sheet.getLastRow();

  if (NEW_DATA.length > 0) {
    sheet.getRange(lastRow + 1, 1, NEW_DATA.length, NEW_DATA[0].length).setValues(NEW_DATA);
  }

  Logger.log("新增列數: " + NEW_DATA.length);
  Logger.log("寫入前最後一列: " + lastRow + ", 寫入後最後一列: " + sheet.getLastRow());
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
4. Apps Script 執行後 Logger 顯示的新增列數,以及寫入前後試算表的總列數
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