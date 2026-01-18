/*
  ================================================================
  Robert Hut Portfolio - Complete Database Export
  ================================================================

  This SQL script will recreate the entire Robert Hut portfolio database
  structure in a new Supabase instance.

  Instructions:
  1. Create a new Supabase project
  2. Go to SQL Editor in your new Supabase dashboard
  3. Copy and paste this entire file
  4. Execute the script
  5. Run the data export queries at the bottom (separately) to copy your data

  Contents:
  - 4 Tables: roberthut_posts, roberthut_site_settings, roberthut_projects, useful_links
  - RLS Policies for all tables
  - Triggers and Functions
  - Storage Bucket configuration
  - Optional: Data export queries

  ================================================================
*/

-- ================================================================
-- STEP 1: CREATE HELPER FUNCTION
-- ================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION roberthut_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ================================================================
-- STEP 2: CREATE TABLES
-- ================================================================

-- Table 1: Posts (Blog Posts)
CREATE TABLE IF NOT EXISTS roberthut_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  cover_image_url text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT false,
  eng_title text,
  eng_content text,
  eng_excerpt text,
  eng_tags text[],
  translate text
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS roberthut_posts_slug_idx ON roberthut_posts(slug);
CREATE INDEX IF NOT EXISTS roberthut_posts_created_at_idx ON roberthut_posts(created_at DESC);

-- Table 2: Site Settings (Bio/About)
CREATE TABLE IF NOT EXISTS roberthut_site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bio_title text NOT NULL DEFAULT 'About Me',
  bio_content text NOT NULL DEFAULT '',
  avatar_url text,
  updated_at timestamptz DEFAULT now(),
  admin_emails jsonb DEFAULT '[]'::jsonb,
  bio_title_en text DEFAULT '',
  bio_content_en text DEFAULT ''
);

-- Table 3: Projects Portfolio
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
  updated_at timestamptz DEFAULT now(),
  thumbnail_url text
);

-- Table 4: Useful Links
CREATE TABLE IF NOT EXISTS useful_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text,
  name_zh text,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ================================================================
-- STEP 3: CREATE TRIGGERS
-- ================================================================

-- Trigger for roberthut_posts
CREATE TRIGGER update_roberthut_posts_updated_at
  BEFORE UPDATE ON roberthut_posts
  FOR EACH ROW
  EXECUTE FUNCTION roberthut_update_updated_at_column();

-- Trigger for roberthut_site_settings
CREATE TRIGGER update_roberthut_site_settings_updated_at
  BEFORE UPDATE ON roberthut_site_settings
  FOR EACH ROW
  EXECUTE FUNCTION roberthut_update_updated_at_column();

-- ================================================================
-- STEP 4: ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================================

ALTER TABLE roberthut_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE roberthut_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE roberthut_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE useful_links ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- STEP 5: CREATE RLS POLICIES FOR POSTS TABLE
-- ================================================================

-- Public (anon) can only view published posts
CREATE POLICY "Public can view published posts"
  ON roberthut_posts
  FOR SELECT
  TO anon
  USING (published = true);

-- Authenticated admin users can view all posts (including drafts)
CREATE POLICY "Admin can view all posts"
  ON roberthut_posts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails ? (auth.jwt()->>'email')
    )
  );

-- Only admin can insert new posts
CREATE POLICY "Admin can create posts"
  ON roberthut_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails ? (auth.jwt()->>'email')
    )
  );

-- Only admin can update posts
CREATE POLICY "Admin can update posts"
  ON roberthut_posts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails ? (auth.jwt()->>'email')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails ? (auth.jwt()->>'email')
    )
  );

-- Only admin can delete posts
CREATE POLICY "Admin can delete posts"
  ON roberthut_posts
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails ? (auth.jwt()->>'email')
    )
  );

-- ================================================================
-- STEP 6: CREATE RLS POLICIES FOR SITE SETTINGS TABLE
-- ================================================================

-- Public can view site settings (bio, avatar, etc.)
CREATE POLICY "Public can view site settings"
  ON roberthut_site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admin can update site settings
CREATE POLICY "Admin can update site settings"
  ON roberthut_site_settings
  FOR UPDATE
  TO authenticated
  USING (
    admin_emails ? (auth.jwt()->>'email')
  )
  WITH CHECK (
    admin_emails ? (auth.jwt()->>'email')
  );

-- ================================================================
-- STEP 7: CREATE RLS POLICIES FOR PROJECTS TABLE
-- ================================================================

-- Anyone can view projects
CREATE POLICY "Anyone can view projects"
  ON roberthut_projects
  FOR SELECT
  TO public
  USING (true);

-- Only admins can insert projects
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

-- Only admins can update projects
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

-- Only admins can delete projects
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

-- ================================================================
-- STEP 8: CREATE RLS POLICIES FOR USEFUL LINKS TABLE
-- ================================================================

-- Anyone can view useful links (public access)
CREATE POLICY "Anyone can view useful links"
  ON useful_links
  FOR SELECT
  USING (true);

-- Authenticated admin users can insert useful links
CREATE POLICY "Admin users can insert useful links"
  ON useful_links
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails ? (auth.jwt()->>'email')
    )
  );

-- Authenticated admin users can update useful links
CREATE POLICY "Admin users can update useful links"
  ON useful_links
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails ? (auth.jwt()->>'email')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails ? (auth.jwt()->>'email')
    )
  );

-- Authenticated admin users can delete useful links
CREATE POLICY "Admin users can delete useful links"
  ON useful_links
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM roberthut_site_settings
      WHERE admin_emails ? (auth.jwt()->>'email')
    )
  );

-- ================================================================
-- STEP 9: CREATE STORAGE BUCKET
-- ================================================================

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'roberthut-blog-images',
  'roberthut-blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: Public can view images
CREATE POLICY "Public can view images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'roberthut-blog-images');

-- Storage policies: Anyone can upload images
CREATE POLICY "Anyone can upload images"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'roberthut-blog-images');

-- Storage policies: Anyone can update images
CREATE POLICY "Anyone can update images"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'roberthut-blog-images')
  WITH CHECK (bucket_id = 'roberthut-blog-images');

-- Storage policies: Anyone can delete images
CREATE POLICY "Anyone can delete images"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'roberthut-blog-images');

-- ================================================================
-- STEP 10: INSERT DEFAULT SITE SETTINGS
-- ================================================================

-- Insert default site settings with your admin email
INSERT INTO roberthut_site_settings (
  id,
  bio_title,
  bio_content,
  avatar_url,
  admin_emails,
  bio_title_en,
  bio_content_en
)
VALUES (
  'a0000000-0000-0000-0000-000000000000'::uuid,
  '關於我',
  '# 歡迎來到 Robert hut

我是一位熱愛寫作與分享的創作者。在這個小屋裡,我記錄著關於設計、開發、生活的點點滴滴。

## 我的理念

簡潔、優雅、有溫度——這是我追求的創作風格。每一篇文章都經過精心打磨,希望能為讀者帶來價值。

## 興趣領域

- 極簡設計與美學
- 現代網頁開發技術
- 生活品質與工作效率
- 文字創作與內容策展

歡迎在這裡探索,也期待與你交流。',
  'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
  '["kyp001@gmail.com"]'::jsonb,
  'About Me',
  '# Welcome to Robert hut

I am a creator who loves writing and sharing. In this hut, I record bits and pieces about design, development, and life.

## My Philosophy

Simplicity, elegance, and warmth — this is the creative style I pursue. Every article is carefully polished, hoping to bring value to readers.

## Areas of Interest

- Minimalist design and aesthetics
- Modern web development technologies
- Life quality and work efficiency
- Writing and content curation

Welcome to explore here, and I look forward to exchanging ideas with you.'
)
ON CONFLICT (id) DO NOTHING;

-- ================================================================
-- STEP 11 (OPTIONAL): DATA EXPORT QUERIES
-- ================================================================

/*
  To export data from your current Supabase instance, run these queries
  in your OLD database and copy the results to your NEW database.

  Run each query separately and save the output as INSERT statements.
*/

-- Export all posts
-- SELECT * FROM roberthut_posts ORDER BY created_at;

-- Export all projects
-- SELECT * FROM roberthut_projects ORDER BY order_num;

-- Export all useful links
-- SELECT * FROM useful_links ORDER BY created_at;

-- Export site settings
-- SELECT * FROM roberthut_site_settings;

-- ================================================================
-- COMPLETE!
-- ================================================================

/*
  Your Robert Hut portfolio database structure is now ready!

  Next steps:
  1. Update your .env file with new Supabase credentials:
     - VITE_SUPABASE_URL
     - VITE_SUPABASE_ANON_KEY

  2. If you need to migrate data, run the data export queries above
     in your old database and insert the results into your new database.

  3. Set up admin access by ensuring your email is in the admin_emails field:
     UPDATE roberthut_site_settings
     SET admin_emails = '["your-email@example.com"]'::jsonb;

  4. Test your application with the new database!
*/
