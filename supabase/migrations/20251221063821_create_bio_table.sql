/*
  # Create bio/about section table

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key) - Unique identifier
      - `bio_title` (text) - Title for the bio section
      - `bio_content` (text) - Main bio content in Markdown
      - `avatar_url` (text, optional) - Profile image URL
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `site_settings` table
    - Add policy for public read access
    - Add policy for authenticated users to update settings

  3. Initial Data
    - Insert default bio content
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bio_title text NOT NULL DEFAULT 'About Me',
  bio_content text NOT NULL DEFAULT '',
  avatar_url text,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read site settings
CREATE POLICY "Anyone can view site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Authenticated users can update settings
CREATE POLICY "Authenticated users can update site settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default bio content
INSERT INTO site_settings (bio_title, bio_content, avatar_url)
VALUES (
  '關於我',
  '# 歡迎來到 Robert hut

我是一位熱愛寫作與分享的創作者。在這個小屋裡，我記錄著關於設計、開發、生活的點點滴滴。

## 我的理念

簡潔、優雅、有溫度——這是我追求的創作風格。每一篇文章都經過精心打磨，希望能為讀者帶來價值。

## 興趣領域

- 極簡設計與美學
- 現代網頁開發技術
- 生活品質與工作效率
- 文字創作與內容策展

歡迎在這裡探索，也期待與你交流。',
  'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg'
)
ON CONFLICT DO NOTHING;