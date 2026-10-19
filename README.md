# Robert Hut

個人中英雙語網站：部落格、作品集、線上工具箱。

🌐 https://www.roberthut.com/

## 功能

- **部落格**：Markdown 文章、程式碼高亮、標籤、每頁 6 篇分頁，可在文章中嵌入 YouTube 影片
- **作品集**：專案卡片（自動抓取 OG 縮圖），新加入的專案排在最前面，每頁 6 筆
- **工具箱**：匯率換算、日期計算、Hex/ASCII 轉換、換行轉換、Markdown 轉 HTML、圖片壓縮，以及實用連結
- **中英雙語**：英文為 `/blog`，中文為 `/zh-tw/blog`；依網址、使用者選擇、瀏覽器語言決定顯示語言
- **管理後台**：以 Email 白名單控管的管理員可新增／編輯文章、Bio、作品集與圖片庫
- **n8n 自動化**：透過 Edge Functions 自動發文與回寫英文翻譯

## 技術架構

| 項目 | 使用技術 |
|---|---|
| 前端 | Vite、React 18、TypeScript、Tailwind CSS、React Router、i18next |
| 後端 | Supabase（Postgres + RLS、Auth、Storage、Edge Functions） |
| 部署 | Vercel（前端）、Supabase（Edge Functions） |

## 本機開發

需求：Node.js 18 以上。

1. 安裝套件

   ```bash
   npm install
   ```

2. 在專案根目錄建立 `.env`（已被 git 忽略）

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. 啟動開發伺服器，開啟 http://localhost:5173

   ```bash
   npm run dev
   ```

### 常用指令

| 指令 | 說明 |
|---|---|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置正式版到 `dist/` |
| `npm run preview` | 預覽建置結果 |
| `npm run lint` | ESLint 檢查 |
| `npm run typecheck` | TypeScript 型別檢查 |

## 撰寫文章

### 文章網址

新文章會自動產生 8 碼隨機網址代碼，例如 `/post/k3x9p2qa`。修改標題不會改變網址，已發布文章的網址也不會變動。

### 嵌入 YouTube 影片

把 YouTube 網址單獨放一行（前後空一行），就會顯示為播放器：

```markdown
這是介紹影片：

https://www.youtube.com/watch?v=dQw4w9WgXcQ

影片下方的文字…
```

- 支援 `youtube.com/watch?v=`、`youtu.be/`、`youtube.com/shorts/`（直式播放器）、`/embed/`、`/live/`
- 網址帶 `?t=90` 或 `&t=1m30s` 會從指定時間開始播放
- 也可以寫成 `[影片標題](https://youtu.be/...)` 單獨一行
- 寫在句子中間的 YouTube 連結維持一般連結

## 專案結構

```
src/
  pages/        各頁面（部落格、文章、作品集、工具箱、管理後台）
  components/   共用元件；tools/ 為工具箱的各個工具
  hooks/        useAuth、useLocalePath、usePageParam
  i18n/         語言設定與翻譯檔（en.json、zh-TW.json）
  lib/          Supabase client、YouTube 網址解析
supabase/
  migrations/   資料庫 schema 變更（依時間排序）
  functions/    Edge Functions（匯率、OG 圖片、n8n 發文 API）
```

## 部署

- **前端**：推送到 GitHub 後由 Vercel 自動建置部署。需在 Vercel 設定 `VITE_SUPABASE_URL`、`VITE_SUPABASE_ANON_KEY` 環境變數。`vercel.json` 已設定 SPA 路由改寫。
- **Edge Functions**：不會隨 Vercel 部署，修改後需手動部署：

  ```bash
  supabase functions deploy <function-name>
  ```

  n8n 相關 function 需在 Supabase 設定 secret `N8N_API_KEY_ROBERT_HUT`。

## 管理員設定

管理員權限由 `roberthut_site_settings.admin_emails` 決定，把 Email 加入清單即可登入後台：

```sql
UPDATE roberthut_site_settings
SET admin_emails = '["your-email@example.com"]'::jsonb;
```

## 遷移到新的 Supabase 專案

請參考 [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)。
