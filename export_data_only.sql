/*
  ================================================================
  Data Export Script - Robert Hut Portfolio
  ================================================================

  This script helps you export your actual data from the old Supabase
  instance and import it into the new one.

  STEP 1: Run this in your OLD Supabase SQL Editor
  STEP 2: Copy the generated INSERT statements
  STEP 3: Run those INSERT statements in your NEW Supabase SQL Editor

  ================================================================
*/

-- ================================================================
-- Export Site Settings
-- ================================================================

SELECT
  'INSERT INTO roberthut_site_settings (id, bio_title, bio_content, avatar_url, admin_emails, bio_title_en, bio_content_en, updated_at) VALUES (' ||
  quote_literal(id::text) || '::uuid, ' ||
  quote_literal(bio_title) || ', ' ||
  quote_literal(bio_content) || ', ' ||
  COALESCE(quote_literal(avatar_url), 'NULL') || ', ' ||
  quote_literal(admin_emails::text) || '::jsonb, ' ||
  COALESCE(quote_literal(bio_title_en), 'NULL') || ', ' ||
  COALESCE(quote_literal(bio_content_en), 'NULL') || ', ' ||
  quote_literal(updated_at::text) || '::timestamptz' ||
  ') ON CONFLICT (id) DO UPDATE SET ' ||
  'bio_title = EXCLUDED.bio_title, ' ||
  'bio_content = EXCLUDED.bio_content, ' ||
  'avatar_url = EXCLUDED.avatar_url, ' ||
  'admin_emails = EXCLUDED.admin_emails, ' ||
  'bio_title_en = EXCLUDED.bio_title_en, ' ||
  'bio_content_en = EXCLUDED.bio_content_en, ' ||
  'updated_at = EXCLUDED.updated_at;'
FROM roberthut_site_settings;

-- ================================================================
-- Export Posts
-- ================================================================

SELECT
  'INSERT INTO roberthut_posts (id, title, slug, content, excerpt, cover_image_url, tags, created_at, updated_at, published, eng_title, eng_content, eng_excerpt, eng_tags, translate) VALUES (' ||
  quote_literal(id::text) || '::uuid, ' ||
  quote_literal(title) || ', ' ||
  quote_literal(slug) || ', ' ||
  quote_literal(content) || ', ' ||
  COALESCE(quote_literal(excerpt), 'NULL') || ', ' ||
  COALESCE(quote_literal(cover_image_url), 'NULL') || ', ' ||
  COALESCE(quote_literal(tags::text), 'NULL') || '::text[], ' ||
  quote_literal(created_at::text) || '::timestamptz, ' ||
  quote_literal(updated_at::text) || '::timestamptz, ' ||
  COALESCE(published::text, 'false') || ', ' ||
  COALESCE(quote_literal(eng_title), 'NULL') || ', ' ||
  COALESCE(quote_literal(eng_content), 'NULL') || ', ' ||
  COALESCE(quote_literal(eng_excerpt), 'NULL') || ', ' ||
  COALESCE(quote_literal(eng_tags::text), 'NULL') || '::text[], ' ||
  COALESCE(quote_literal(translate), 'NULL') ||
  ') ON CONFLICT (id) DO NOTHING;'
FROM roberthut_posts
ORDER BY created_at;

-- ================================================================
-- Export Projects
-- ================================================================

SELECT
  'INSERT INTO roberthut_projects (id, name_zh, name_en, desc_zh, desc_en, url, status_zh, status_en, order_num, created_at, updated_at, thumbnail_url) VALUES (' ||
  quote_literal(id::text) || '::uuid, ' ||
  quote_literal(name_zh) || ', ' ||
  quote_literal(name_en) || ', ' ||
  quote_literal(desc_zh) || ', ' ||
  quote_literal(desc_en) || ', ' ||
  quote_literal(url) || ', ' ||
  quote_literal(status_zh) || ', ' ||
  quote_literal(status_en) || ', ' ||
  order_num || ', ' ||
  quote_literal(created_at::text) || '::timestamptz, ' ||
  quote_literal(updated_at::text) || '::timestamptz, ' ||
  COALESCE(quote_literal(thumbnail_url), 'NULL') ||
  ') ON CONFLICT (id) DO NOTHING;'
FROM roberthut_projects
ORDER BY order_num;

-- ================================================================
-- Export Useful Links
-- ================================================================

SELECT
  'INSERT INTO useful_links (id, name_en, name_zh, url, created_at) VALUES (' ||
  quote_literal(id::text) || '::uuid, ' ||
  COALESCE(quote_literal(name_en), 'NULL') || ', ' ||
  COALESCE(quote_literal(name_zh), 'NULL') || ', ' ||
  quote_literal(url) || ', ' ||
  quote_literal(created_at::text) || '::timestamptz' ||
  ') ON CONFLICT (id) DO NOTHING;'
FROM useful_links
ORDER BY created_at;

-- ================================================================
-- ALTERNATIVE: Export as JSON (easier for large datasets)
-- ================================================================

/*
  If you have a lot of data, it might be easier to export as JSON
  and use a script to import. Run these queries and save the output:
*/

-- Export all data as JSON
-- SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM roberthut_posts ORDER BY created_at) t;
-- SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM roberthut_projects ORDER BY order_num) t;
-- SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM useful_links ORDER BY created_at) t;
-- SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM roberthut_site_settings) t;

-- ================================================================
-- Notes
-- ================================================================

/*
  IMPORTANT NOTES:

  1. Run this script in sections, not all at once
  2. Copy the output of each section separately
  3. The output will be INSERT statements you can run in your new database
  4. Don't forget to export your storage files separately (images in roberthut-blog-images bucket)
  5. Update your admin_emails in the new database if needed

  For storage bucket files:
  - Download files from old bucket: https://supabase.com/dashboard/project/[OLD_PROJECT]/storage/buckets/roberthut-blog-images
  - Upload to new bucket: https://supabase.com/dashboard/project/[NEW_PROJECT]/storage/buckets/roberthut-blog-images
*/
