/*
  ================================================================
  Migration Verification Script
  ================================================================

  Run this script in your NEW Supabase instance after migration
  to verify everything is set up correctly.

  ================================================================
*/

-- ================================================================
-- 1. Check if all tables exist
-- ================================================================

SELECT
  'Tables Check' as check_type,
  COUNT(*) as count,
  CASE
    WHEN COUNT(*) = 4 THEN '✅ All tables exist'
    ELSE '❌ Missing tables'
  END as status
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('roberthut_posts', 'roberthut_site_settings', 'roberthut_projects', 'useful_links');

-- ================================================================
-- 2. Check if RLS is enabled on all tables
-- ================================================================

SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled,
  CASE
    WHEN rowsecurity THEN '✅ RLS Enabled'
    ELSE '❌ RLS Not Enabled'
  END as status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('roberthut_posts', 'roberthut_site_settings', 'roberthut_projects', 'useful_links');

-- ================================================================
-- 3. Check policies count
-- ================================================================

SELECT
  'Policies Check' as check_type,
  schemaname,
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY schemaname, tablename
ORDER BY tablename;

-- ================================================================
-- 4. List all policies
-- ================================================================

SELECT
  schemaname as schema,
  tablename as table,
  policyname as policy_name,
  cmd as command,
  roles as for_roles
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ================================================================
-- 5. Check triggers
-- ================================================================

SELECT
  event_object_table as table_name,
  trigger_name,
  event_manipulation as event,
  action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table LIKE 'roberthut_%'
ORDER BY event_object_table;

-- ================================================================
-- 6. Check functions
-- ================================================================

SELECT
  routine_name as function_name,
  routine_type as type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name LIKE 'roberthut_%';

-- ================================================================
-- 7. Check storage bucket
-- ================================================================

SELECT
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id = 'roberthut-blog-images';

-- ================================================================
-- 8. Check storage policies
-- ================================================================

SELECT
  policyname as policy_name,
  cmd as command,
  roles as for_roles
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname LIKE '%roberthut%' OR policyname LIKE '%images%'
ORDER BY policyname;

-- ================================================================
-- 9. Check data counts
-- ================================================================

SELECT 'roberthut_posts' as table_name, COUNT(*) as row_count FROM roberthut_posts
UNION ALL
SELECT 'roberthut_projects' as table_name, COUNT(*) as row_count FROM roberthut_projects
UNION ALL
SELECT 'roberthut_site_settings' as table_name, COUNT(*) as row_count FROM roberthut_site_settings
UNION ALL
SELECT 'useful_links' as table_name, COUNT(*) as row_count FROM useful_links;

-- ================================================================
-- 10. Check site settings and admin emails
-- ================================================================

SELECT
  id,
  bio_title,
  bio_title_en,
  admin_emails,
  CASE
    WHEN admin_emails IS NOT NULL AND admin_emails != '[]'::jsonb
    THEN '✅ Admin emails configured'
    ELSE '❌ No admin emails set'
  END as admin_status,
  updated_at
FROM roberthut_site_settings;

-- ================================================================
-- 11. Check indexes
-- ================================================================

SELECT
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('roberthut_posts', 'roberthut_site_settings', 'roberthut_projects', 'useful_links')
ORDER BY tablename, indexname;

-- ================================================================
-- 12. Sample data check (posts)
-- ================================================================

SELECT
  id,
  title,
  slug,
  published,
  created_at,
  CASE
    WHEN eng_title IS NOT NULL THEN '✅ Has English'
    ELSE '❌ No English'
  END as translation_status
FROM roberthut_posts
ORDER BY created_at DESC
LIMIT 5;

-- ================================================================
-- 13. Sample data check (projects)
-- ================================================================

SELECT
  name_zh,
  name_en,
  url,
  status_zh,
  order_num
FROM roberthut_projects
ORDER BY order_num;

-- ================================================================
-- SUMMARY
-- ================================================================

/*
  Expected Results:

  ✅ Tables Check: count = 4
  ✅ RLS Enabled: All tables should have RLS enabled
  ✅ Policies: Should have multiple policies for each table
  ✅ Triggers: 2 triggers (for posts and site_settings)
  ✅ Functions: roberthut_update_updated_at_column
  ✅ Storage Bucket: roberthut-blog-images should exist
  ✅ Storage Policies: 4 policies (SELECT, INSERT, UPDATE, DELETE)
  ✅ Admin Emails: Should contain at least one email
  ✅ Indexes: Should have indexes on posts table

  If any check fails, review the migration steps and re-run the
  appropriate sections of export_portfolio_to_supabase.sql
*/
