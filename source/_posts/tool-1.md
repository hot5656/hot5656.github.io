---
title: TOOL
abbrlink: 30df
date: 2021-05-21 09:55:20
categories: Front End
tags:
	- tool
---

### Application

#### 馬克鰻(markman)

+ [Download](http://www.getmarkman.com/)
+ 先安裝 [adobe AIR](https://get.adobe.com/tw/air/)

圖檔 長度測量/標記, 矩形座標&長寬測量/標記,顏色測量/標記,文字標記

按鍵| 功能
----|-------------
Tab | 自動偵測長度
Del | 刪除標記

<!--more-->

##### JMeter
壓力測試工具
###### check java veresion
``` bash
# 命令列執行
java -version
```

###### download and install
+ download [JMeter](https://jmeter.apache.org/download_jmeter.cgi) : .zip for Window
+ 解壓縮執行 ./bin/jmeter.bat
+ change language : Options --> Choose Language --> Chinese(Traditional)

###### add test item
+ 填入名稱 : TestProducts -> 名稱 -> Save
<div style="maxwidth:1000px">
	{% asset_img pic1.jpg pic1 %}
</div>

+ add test group : TestProducts --> 新增 --> Threads(users) --> setUp Thread Group
<div style="maxwidth:1000px">
	{% asset_img pic2.jpg pic2 %}
</div>

+ 新增 HTTP 要求 : setUp Thread Group --> 新增 --> 取樣 --> HTTP 要求 
<div style="maxwidth:1000px">
	{% asset_img pic3.jpg pic3 %}
</div>

+ 新增 檢視結果樹 : setUp Thread Group --> 新增 --> 接聽 --> 檢視結果樹 
<div style="maxwidth:1000px">
	{% asset_img pic4.jpg pic4 %}
</div>

#### Cygwin 安裝 wget, apt-cyg, gcc
##### install cygwin - add wget
<div style="width:500px">
	{% asset_img cygwin_1.jpg cygwin_1 %}
</div>

##### download apt-cyg 解壓縮後放於 /bin 目錄下, 並設定可執行
<div style="maxwidth:1000px">
	{% asset_img cygwin_2.jpg cygwin_2 %}
</div>

``` bash
chmod +x /bin/apt-cyg
```

##### install gcc
``` bash
apt-cyg install gcc-core
```

##### some command 
``` bash
# dump cygwin version 
uname -a
		CYGWIN_NT-10.0 ESTPENB-W022 3.2.0(0.340/5/3) 2021-03-29 08:42 x86_64 Cygwin
# check support gcc core 
cygcheck -p bin/gcc
		Found 10 matches for bin/gcc
		gcc-core-10.2.0-1 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-core-11.2.0-0 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-core-11.2.0-1 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-core-7.4.0-1 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-core-9.3.0-2 - gcc-core: GNU Compiler Collection (C, OpenMP)
		gcc-debuginfo-10.2.0-1 - gcc-debuginfo: Debug info for gcc
		gcc-debuginfo-7.4.0-1 - gcc-debuginfo: Debug info for gcc
		gcc-debuginfo-9.3.0-2 - gcc-debuginfo: Debug info for gcc
		gccmakedep-1.0.2-1 - gccmakedep: X Makefile dependency tool for GCC (installed b
		inaries and support files)
		gccmakedep-1.0.3-1 - gccmakedep: X Makefile dependency tool for GCC (installed b
		inaries and support files)
```

#### WinMerge
##### 直接顯示比對兩個檔案
``` bash
# 顯示或不顯示 目錄
View
	--> Tree Mode
# 檔案總管 option
Edit (這些是讓在檔案總管使用較方便)
	--> Options
	--> Shell Integration
		Add to context menu: Enable
		Enable advanced menu: Enable
#filetr some file no compare
Option
	--> Folder: Filter
		!.git\;!*.o 	\(不比較 git 及 *.o)
# ignore 比較差異
Edit 
	--> Options 
	--> Compare 
	--> General，啟用 Ignore EOL differences
```

### AI tool
#### Metricool 
{% note info %}
**Metricool** 是一個針對創作者、社群經理與行銷團隊設計的「一站式社群媒體管理與分析平台」。它的核心定位是將零散在各平台的日常維運集中在同一個後台處理，避免在十幾個 App 之間反覆切換。  
Metricool 的核心功能主要集中在以下 **6 大板塊**：

**1\. 多平台內容排程與發布（Planner & Auto-Publishing）**

這是 Metricool 最常被使用的核心區塊：

* **視覺化行事曆**：以月、週、日視圖拖拉排程貼文、短影音（Reels / Shorts / TikTok）、輪播圖與限時動態。  
* **最佳發文時間熱圖（Best Times to Post）**：系統會分析你的受眾活躍時段，用深淺色塊直接標記哪一個小時發文能獲得最高觸及。  
* **跨平台同步與個別調整**：一鍵把同一篇內容分發到 Instagram、Facebook、YouTube、TikTok、LinkedIn、X、Pinterest 等平台，並可在同一個編輯視窗為各平台調整尺寸與文案。  
* **外掛與整合**：支援 Canva 插件，做完圖直接推送到 Metricool 排程。

**2\. 整合式成效數據分析（Analytics & Dashboard）**

解決官方後台數據分散、保留期限過短的問題：

* **全平台數據總覽**：將粉專、短影音、頻道訂閱與貼文互動整合在同一儀表板，即時追蹤粉絲成長曲線、互動率（Engagement Rate）、影片觀看留存率。  
* **廣告成效整合**：可串接 Meta Ads、Google Ads、TikTok Ads，直接對比自然流量與付費廣告投報率（ROAS）。  
* **歷史數據長期保存**：不像部分平台官方後台只保留 30 或 90 天，付費版可回溯多年歷史趨勢。

**3\. 競品分析與模式識別（Competitor Benchmarking）**

文章中作者特別強調的「從數據找爆款模式」功能：

* **競品清單監測**：加入同行或利基市場中的標竿帳號，追蹤對方的粉絲增長、發文頻率與互動表現。  
* **熱門內容逆向解析**：快速篩選出競品在特定時段「互動最高、傳播最廣」的貼文形式與主題，藉此找到自己的選題方向。

**4\. 一站式訊息與留言管理（Unified Inbox）**

* **集中回覆**：在同一個收件匣集中檢視並回覆各平台的貼文留言、私訊（DMs）與評論（如 Google 商家評論）。  
* **團隊協作標記**：可指派對話給不同團隊成員，或標記為已處理，避免漏回訊息。

**5\. 自動化報表生成（Custom Reporting）**

* **一鍵匯出白標報告**：幾秒鐘內將各平台數據打包成客製化的 PDF 或 PPT 簡報。  
* **商務贊助與提案專用**：創作者可用於向品牌客戶提供清晰的合作成效證明；接案者與代理商可用於每月向客戶交代 ROI。

**6\. 整合工具與 AI / 開發者支援（SmartLinks & Integrations）**

* **SmartLinks（Link in Bio）**：內建自訂多連結導流頁面，貼文可直接附帶導購或官網連結，省下一款 Linktree 訂閱。  
* **AI 輔助寫作**：內建 AI 工具協助改寫社群文案、產生 Hashtag 建議。  
* **MCP / API 串接**：提供 Model Context Protocol (MCP) 與 API 介面，讓 Claude 或自動化工作流（如 Zapier / Make / n8n）可以直接讀取社群數據，打造全自動分析與選題 Agent。

| 功能模組 | 主要解決的問題 | 適合對象 |
| :---- | :---- | :---- |
| **Planner 排程行事曆** | 解決每天手動發文、跨平台複製貼文的耗時問題 | 兼職創作者、社群小編 |
| **Analytics 數據總覽** | 解決各社群平台數據分散、難以交叉對比的問題 | 數據導向創作者、行銷人 |
| **Competitors 競品追蹤** | 避免憑感覺發文，快速找出市場正在爆紅的題材 | 內容策略師、成長駭客 |
| **Reports 報表匯出** | 節省每週/每月花數小時人工截圖做 PPT 的時間 | 接案者、行銷代理商、接業配創作者 |
| **MCP / API 擴充** | 讓 LLM / AI 代理人直接讀取後台進行策略分析 | 自動化玩家、AI 工作流創作者 |
{% endnote %}

#### Notion 具體使用場景
{% note info %}
**7 個 Notion 具體使用場景** 的深度拆解與運作機制：

**1\. 內容作業系統（Content Operating System）**

這是她內容產出流程的核心樞紐，採用了資料庫的「樞紐與輪輻模型（Hub-and-Spoke Architecture）」架構：

* **核心樞紐（Hub \- 深度長文/母體）**：建立一個名為「指南資料庫（Guide Library）」或「長篇內容庫」，存放核心乾貨文章、每週電子報或付費週報草稿。  
* **輪輻延伸（Spoke \- 衍生碎片內容）**：透過 Notion 的 Relation（關聯屬性），將一篇「母指南」連結到它拆解出來的所有子內容——包含 IG 輪播圖（Carousels）、短影音腳本（Reels）、X 貼文串或短文案。這樣一來，點開任何一篇母指南，就能清楚掌握它被複用、改寫成了哪些社群素材。  
* **靈感雷達（Guide Radar）與傾倒區（Brain Dumps）**：  
  * **Brain Dumps 頁面**：日常隨手記下的碎片想法、語音轉文字的草稿。  
  * **Guide Radar**：透過 API 或自動化整合，讓 Claude 每週根據受眾需求自動寫入適合深入發展的選題建議清單。

**2\. 客戶與商業人脈管理（CRM Database）**

她將所有與「人」和「商業變現」相關的資訊收納在同一張關聯資料庫中：

* **管理對象**：涵蓋贊助商（Sponsors）、1 對 1 諮詢客戶、潛在合作對象、職場聯絡人，甚至包含朋友。  
* **標準欄位設定**：  
  * **Deal Value（潛在商業價值）**：評估該合作或專案的預期收益。  
  * **Stage（進度階段）**：如初步接洽、等待回覆、已簽約、執行中、款項結清。  
  * **Last Contact（最後聯繫日期）** 與 **Next Action Date（下一次行動日期）**：確保即便工作再忙，也能透過檢視表（View）篩選出「今天該跟進誰」，防止漏失重要商務合作。  
  * **Context（背景筆記）**：記錄對方的偏好、溝通歷史要點。

**3\. 數位資產與課程發布（Publishing & Digital Products）**

* **直接作為產品交付介面**：作者將自己的爆款課程《Claude MBA Action Plan》直接製作成 Notion 頁面，供超過 10,000 名學員點擊「Duplicate（複製）」到自己的帳號中使用。  
* **優點**：不需架設複雜的課程後台（LMS）或網站，Notion 本身的排版極簡專業，維護成本低，更新內容時也能即時同步給新用戶。
**4\. 1 對 1 客戶交付中心（Client Work Portals）**

* **單一連結整合所有資源**：針對諮詢或私人客戶，為每位客戶建立專屬的獨立頁面。  
* **彙整內容**：在同一個頁面內嵌入諮詢錄音/錄影、會議重點、行動清單、作業繳交區以及專屬資源連結。客戶不需要翻閱往來郵件或雲端硬碟，永遠只需保存這一條 Notion 連結。

**5\. 個人生活管理、習慣與目標（Life Admin, Planning & Goals）**

兼職創作者最怕時間失控，她利用 Notion 支撐高強度的個人生活管理：

* **習慣與健身追蹤**：記錄日常作息、運動課表與習慣打卡。  
* **每週回顧（Weekly Reviews）與目標設定**：固定在週末盤點目標進度、檢視時間分配。  
* **各類清單**：閱讀清單、待買清單、靈感庫等雜項集中收納，維持大腦專注。

**6\. 會議與對話筆記（Meeting Notes）**

* 過去往往分散在手寫筆記或備忘錄，現在全面整合到 Notion 的會議資料庫。  
* 與前述的 **CRM 資料庫**連動，每次與客戶、贊助商開會時，筆記直接關聯到該客戶卡片底下，隨時調閱歷史溝通細節。

**7\. 雙向 AI 協作樞紐（Two-Way Notion AI Integration）**

過去她只把 Notion 當成靜態儲存庫（Claude 單向讀寫 Notion），近期轉為「雙向 AI 驅動」：

```
[外部大腦: Claude] :
	↕ (透過 API / 雙向讀寫)  
[落地樞紐: Notion 資料庫]  
	↕ (利用內建 Notion AI 快速處理)  
[就地整理: 摘要 / 提取待辦 / 跨頁面檢索]
```

* **外部 Claude 串接**：Claude 負責讀取 Notion 裡面的專案背景、歷史筆記，並將產出好的長篇架構寫入 Notion。  
* **內建 Notion AI**：不需要離開頁面，直接在 Notion 內部進行文字潤飾、生成會議紀要摘要、自動提取 Action Items，或是利用 Q\&A 功能跨頁面檢索過去記載的知識點。

**8\. 架構總結**

| 應用層次 | 場景項目 | 扮演的角色 |
| :---- | :---- | :---- |
| **生產力核心** | 內容作業系統 (OS)、雙向 AI 協作 | **AI 的著陸點**：選題、撰寫、關聯分發 |
| **商業變現** | CRM 資料庫、產品發布、客戶交付門戶 | **收入轉化器**：贊助追蹤、課程分發、諮詢交付 |
| **個人基底** | 生活管理、會議筆記 | **精力防火牆**：確保正職與兼職之間的生活秩序不崩潰 |

{% endnote %}

### some tool ideas
#### Media Kit（媒體資料包 / 合作型錄）
{% note info %}
**Media Kit 是創作者或自媒體的「數位商業履歷與合作型錄」。**  
當創作者有了一定的社群影響力，想要向品牌方、廣告主爭取贊助或商業合作時，不可能讓對方慢慢去翻你的 IG 或頻道。這時創作者會提供一份 Media Kit（可以是 PDF，或像作者一樣直接架成一個獨立網頁），內容通常包含：

* **創作者簡介與品牌定位**：你是誰、專注在哪個領域、受眾核心輪廓。  
* **社群數據（關鍵指標）**：各平台追蹤數、平均觸及率、互動率（Engagement Rate）、影片觀看次數。  
* **受眾輪廓（Demographics）**：粉絲的年齡分佈、性別比例、主要地理區域（證明自己的粉絲符合品牌方的目標客群）。  
* **過往合作案例與成效**：曾合作過的品牌、帶來的轉換或曝光證明。  
* **合作方案與報價（Rate Card）**：單篇貼文、Reels、電子報置入、顧問諮詢等標準收費與合作方式。

{% endnote %}
