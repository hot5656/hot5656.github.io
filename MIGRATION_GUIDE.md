# Robert Hut Portfolio - Supabase 遷移指南

本指南將幫助你將整個 Robert Hut portfolio 遷移到新的 Supabase 實例。

## 📋 遷移步驟

### 第一步：準備新的 Supabase 項目

1. 前往 [Supabase Dashboard](https://supabase.com/dashboard)
2. 點擊 "New Project" 創建新項目
3. 記錄下新項目的以下資訊：
   - Project URL
   - Anon Public Key
   - Service Role Key (如果需要)

### 第二步：導入數據庫架構

1. 打開新 Supabase 項目的 SQL Editor
2. 打開 `export_portfolio_to_supabase.sql` 文件
3. 複製整個文件的內容
4. 粘貼到 SQL Editor 並執行
5. 確認執行成功,沒有錯誤

這個腳本會創建：
- ✅ 4 個表格 (roberthut_posts, roberthut_site_settings, roberthut_projects, useful_links)
- ✅ 所有的 RLS 政策
- ✅ Triggers 和 Functions
- ✅ Storage Bucket (roberthut-blog-images)
- ✅ 預設的 site settings

### 第三步：導出舊數據（可選）

如果你需要遷移現有數據：

1. 打開**舊** Supabase 項目的 SQL Editor
2. 打開 `export_data_only.sql` 文件
3. **分段執行**每個查詢（不要一次執行全部）:
   - 先執行 "Export Site Settings" 部分
   - 複製輸出的 INSERT 語句
   - 在新 Supabase 的 SQL Editor 中執行
   - 重複以上步驟處理 Posts、Projects、Useful Links

### 第四步：遷移儲存桶中的圖片

1. 前往舊項目的 Storage → roberthut-blog-images
2. 下載所有圖片到本地
3. 前往新項目的 Storage → roberthut-blog-images
4. 上傳所有圖片

**提示**: 如果圖片很多,可以考慮使用 Supabase CLI 或 API 批量遷移

### 第五步：更新應用配置

1. 更新你的 `.env` 文件：
```env
VITE_SUPABASE_URL=https://your-new-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-new-anon-key
```

2. 如果需要更新管理員郵箱,在新 Supabase 的 SQL Editor 執行：
```sql
UPDATE roberthut_site_settings
SET admin_emails = '["your-email@example.com"]'::jsonb
WHERE id = 'a0000000-0000-0000-0000-000000000000'::uuid;
```

### 第六步：測試

1. 啟動你的應用
2. 測試以下功能：
   - ✅ 查看已發布的文章（公開訪問）
   - ✅ 登入管理後台
   - ✅ 創建/編輯/刪除文章
   - ✅ 上傳圖片
   - ✅ 編輯 Bio
   - ✅ 管理 Projects
   - ✅ 管理 Useful Links

## 📁 文件說明

### `export_portfolio_to_supabase.sql`
完整的數據庫架構導出文件,包含：
- 所有表結構定義
- 索引和約束
- RLS 政策
- Triggers 和 Functions
- Storage Bucket 配置
- 預設數據

**使用方式**: 在新 Supabase 項目中執行一次

### `export_data_only.sql`
數據導出腳本,用於從舊數據庫導出實際數據

**使用方式**:
1. 在**舊** Supabase 項目中執行
2. 複製生成的 INSERT 語句
3. 在**新** Supabase 項目中執行這些 INSERT 語句

## 🗄️ 數據庫架構概覽

### 表格列表

#### 1. `roberthut_posts` - 部落格文章
- 支援中英文雙語
- 包含發布狀態控制
- 支援標籤分類
- Markdown 格式內容

#### 2. `roberthut_site_settings` - 網站設置
- Bio 個人簡介（中英文）
- 管理員郵箱列表
- 頭像 URL

#### 3. `roberthut_projects` - 作品集項目
- 雙語項目名稱和描述
- 狀態標籤
- 排序功能
- 縮圖 URL

#### 4. `useful_links` - 實用連結
- 雙語名稱
- URL 連結

### 安全性說明

所有表都啟用了 Row Level Security (RLS):
- **公開訪問**: 可查看已發布的內容
- **管理員訪問**: 需要郵箱在 `admin_emails` 列表中
- **Storage**: 公開讀取,公開上傳（可根據需求調整）

## 🚨 常見問題

### Q: 遷移後無法登入管理後台？
A: 確認你的郵箱已經添加到 `admin_emails` 欄位中

### Q: 圖片無法顯示？
A: 檢查 Storage Bucket 是否正確創建,RLS 政策是否正確

### Q: RLS 錯誤？
A: 確認所有表都啟用了 RLS,並且政策已正確創建

### Q: 如何批量導出大量數據？
A: 使用 `export_data_only.sql` 中的 JSON 導出方式,或使用 Supabase CLI

## 📚 相關資源

- [Supabase 文檔](https://supabase.com/docs)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## ✅ 遷移檢查清單

- [ ] 創建新 Supabase 項目
- [ ] 執行 `export_portfolio_to_supabase.sql` 創建架構
- [ ] 導出舊數據（如有需要）
- [ ] 導入數據到新項目
- [ ] 遷移 Storage Bucket 中的圖片
- [ ] 更新 `.env` 配置文件
- [ ] 設置管理員郵箱
- [ ] 測試所有功能
- [ ] 部署應用到生產環境

---

如有任何問題,請參考 Supabase 官方文檔或社群支援。
