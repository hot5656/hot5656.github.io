---
title: Vibe coding(2)
abbrlink: 7dc4
date: 2026-01-19 15:24:50
categories:
tags:
  - Vibe Coding
---

### Robert hut(Replit) - [Link](https://www.perplexity.ai/search/https-winmerge-org-downloads-l-AZ9IX4uvTw.Hy0GrCvlHtA#15)

<!--more-->

#### Start Prompt 
``` bash
請建立一個名為 **DiffDock** 的 Web App（Chrome-only），目標是做類 WinMerge 的「目錄/檔案比較」工具，並嚴格遵守 i18n（en/zh-TW）規範。請採用分 Phase 交付；**每完成一個 Phase 後，請停止，不要自行進入下一 Phase**，而是輸出：
- 本 Phase 完成內容摘要
- 本 Phase 產出的檔案/關鍵變更點
- 「驗證項目（checklist）」：逐條列出我該怎麼操作驗收、預期看到什麼結果
並明確要求我回覆 **GO**（或 YES）後，才可以開始下一個 Phase。


## 全局硬性規格（所有 Phase 都要遵守）
### 瀏覽器限制
- 只正式支援 Chrome 桌面版，核心依賴 File System Access API。
- 若偵測到不支援（例如 `showDirectoryPicker` 不存在），必須顯示全頁阻擋提示（含 i18n 文案）並引導使用者改用 Chrome。

### i18n（中英雙語）
- 語系：`en`（預設、URL 無 prefix）、`zh-TW`（URL prefix：`/zh-tw`）。
- 初次進站：依瀏覽器語言偵測；若使用者曾切換語系：以 `preferredLocale`（localStorage 或 cookie）為準並持久化。
- 除使用者輸入與檔案內容外，所有 UI 文案不得寫死，必須使用 i18n keys。


### Logo
- Header 左上角放 Logo（先用 placeholder），點擊連到 `https://www.roberthut.com/`。
- alt 與任何旁邊文字都要走 i18n keys。

***

## Phase 0：基礎工程與路由
目標：先跑起來、路由/i18n/版型就位。
- 頁面：`/`（Landing）、`/compare`（主功能頁）、`/about`。
- i18n：en/zh-TW 字典檔，至少 20 個 keys；所有頁面文字走 keys。
- 語系切換器：切換後寫入 `preferredLocale` 並導到對應路徑（`/compare` ↔ `/zh-tw/compare`）。
- Header：DiffDock 名稱 + Logo（連 roberthut.com）。

Phase 0 驗證項目（請在交付時列出更細的步驟與預期結果）：
- 能啟動專案並打開首頁。
- 切換語系後 URL 會正確變化（en 無 prefix、zh-TW 有 `/zh-tw`）。
- 重整頁面後語系仍保持（preferredLocale 生效）。
- 所有 UI 文字沒有硬寫（都可從字典找到 key）。

完成 Phase 0 後請停止並等我回覆 GO。

***

## Phase 1：資料夾選取 + 目錄掃描（tree）
目標：能選 Left/Right 兩個資料夾並掃描檔案清單。
- Compare 頁提供：Select Left Folder / Select Right Folder。
- 使用 `showDirectoryPicker()` 取得 folder handle，遞迴列舉檔案並顯示 relative path。
- 顯示掃描進度/狀態，避免卡死。

Phase 1 驗證項目：
- 點按鈕會跳出資料夾選取器。
- 選完後 UI 顯示資料夾名稱與檔案清單（至少顯示 relative path）。
- 大量檔案時不會整個頁面無回應（有 loading/進度）。

完成 Phase 1 後請停止並等我回覆 GO。

***

## Phase 2：目錄比較（Left vs Right）
目標：輸出 added/removed/modified/same。
- 以 relative path 對齊兩邊檔案。
- 快篩：size 不同 → modified；只存在一邊 → added/removed。
- 提供 filter：只看 modified/added/removed。

Phase 2 驗證項目：
- 人為製造差異（新增/刪除/修改檔案）後重新掃描，狀態正確。
- Filter 正常生效。

完成 Phase 2 後請停止並等我回覆 GO。

***

## Phase 3：文字檔 diff + 編輯 + 寫回
目標：點選 text 檔可看 diff、可編輯、可 Save 寫回。
- text 判斷：副檔名白名單為主（可設定）。
- diff UI：CodeMirror merge view（v6 `@codemirror/merge` 或等效）。
- 寫回：使用 `createWritable()` 寫回左或右檔案（按鈕要清楚）。

Phase 3 驗證項目：
- 點一個 text 檔會開啟 diff。
- 修改後按 Save（寫回左/右）確實改到原檔內容。

完成 Phase 3 後請停止並等我回覆 GO。

***

## Phase 4：binary 檔 compare（不做 merge）
目標：binary 檔只做 compare。
- 讀取 `arrayBuffer()`；大小與 SHA-256 比對（WebCrypto digest）。
- 顯示 Same/Different、size、hash；不提供編輯/merge。

Phase 4 驗證項目：
- 同檔 hash 相同、不同檔 hash 不同。
- 大檔超過門檻會有降級提示（不會卡死）。

完成 Phase 4 後請停止並等我回覆 GO。

***

## Phase 5：打磨與保護欄
目標：提升可用性與穩定性。
- 非支援瀏覽器顯示 blocking page（i18n）。
- 大檔與大量檔案降級策略完善。
- README：替換 logo、調整白名單、已知限制。

Phase 5 驗證項目：
- 用非 Chrome 開啟會顯示明確提示。
- README 指引完整。

完成 Phase 5 後請停止。
```
