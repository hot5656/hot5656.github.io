/*
  # Create Projects Portfolio Table

  1. New Tables
    - `roberthut_projects`
      - `id` (uuid, primary key) - Unique identifier
      - `name_zh` (text) - Chinese project name
      - `name_en` (text) - English project name
      - `desc_zh` (text) - Chinese description (Markdown format)
      - `desc_en` (text) - English description (Markdown format)
      - `url` (text) - Project URL
      - `status_zh` (text) - Chinese status text
      - `status_en` (text) - English status text
      - `order_num` (int) - Display order number
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `roberthut_projects` table
    - Allow public SELECT access for viewing projects
    - Restrict INSERT/UPDATE/DELETE to admin users only
    
  3. Initial Data
    - Insert 4 example projects with order numbers
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS roberthut_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_zh text NOT NULL,
  name_en text NOT NULL,
  desc_zh text NOT NULL DEFAULT '',
  desc_en text NOT NULL DEFAULT '',
  url text NOT NULL,
  status_zh text NOT NULL DEFAULT '',
  status_en text NOT NULL DEFAULT '',
  order_num int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE roberthut_projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view projects
CREATE POLICY "Anyone can view projects"
  ON roberthut_projects
  FOR SELECT
  TO public
  USING (true);

-- Policy: Only admins can insert projects
CREATE POLICY "Only admins can insert projects"
  ON roberthut_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails @> jsonb_build_array(auth.jwt()->>'email')
    )
  );

-- Policy: Only admins can update projects
CREATE POLICY "Only admins can update projects"
  ON roberthut_projects
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails @> jsonb_build_array(auth.jwt()->>'email')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails @> jsonb_build_array(auth.jwt()->>'email')
    )
  );

-- Policy: Only admins can delete projects
CREATE POLICY "Only admins can delete projects"
  ON roberthut_projects
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails @> jsonb_build_array(auth.jwt()->>'email')
    )
  );

-- Insert example projects
INSERT INTO roberthut_projects (name_zh, name_en, desc_zh, desc_en, url, status_zh, status_en, order_num)
VALUES
  (
    'Blog Journal',
    'Blog Journal',
    '- Markdown 編輯器
- AI 聊天輔助
- 雙語發佈
- Guest 立即試用',
    '- Markdown editor
- AI chat helper
- Bilingual publish
- Guest access',
    'https://blog-journal.demo.roberthut.com/',
    '即時可用',
    'Live now',
    1
  ),
  (
    '塔羅牌占卜',
    'Tarot Cards',
    '- 多種牌陣選擇
- 完整牌義解釋
- 每日運勢抽牌
- PWA 可安裝',
    '- Multiple spreads
- Full card meanings
- Daily reading
- PWA install',
    'http://tarot-cards.roberthut.com/',
    '正式上線',
    'Production',
    2
  ),
  (
    '工具合集',
    'Tools Collection',
    '- Hex/ASCII 轉換器
- 即時匯率計算
- 更多工具持續加入',
    '- Hex/ASCII converter
- Live currency calc
- More tools coming',
    'https://roberthut.com/tools',
    '整合中',
    'Integrating',
    3
  ),
  (
    '生活管理中心',
    'Life Organizer',
    '- 任務與習慣追蹤
- 跨裝置即時同步
- 統計圖表與 AI 洞察',
    '- Tasks & habits tracking
- Cross-device sync
- Stats + AI insights',
    'https://life-organizer-hub.vercel.app/',
    '即時可用',
    'Live now',
    4
  )
ON CONFLICT (id) DO NOTHING;