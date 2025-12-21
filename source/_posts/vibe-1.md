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
...
```

#### BoltNew 
``` bash
...
```

#### Replit 
``` bash
...
```


### Deploy Host
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
```

### Database
#### Supabase
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

### Blog post automation - [Blog Journal](https://blog-canvas-roan.vercel.app/)
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

# 註冊第一帳號: email, password(by app, yahoo-gogo999)
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

### [Practical Tools Collection](https://tools-collection-smoky.vercel.app/zh-tw)

### [Robert hut](https://robert-hut.vercel.app/)

### Ref
+ [Hostinger VPS](https://www.hostinger.com/)- cpupon "DIEGODAVILA"
