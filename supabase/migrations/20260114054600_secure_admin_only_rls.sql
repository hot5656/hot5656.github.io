/*
  # Secure RLS Policies - Admin Only Access

  ## Overview
  This migration implements secure Row Level Security (RLS) policies that protect
  all blog data. Only authenticated users with admin role can modify content, while
  the public can only view published posts.

  ## Changes Made

  ### 1. Posts Table (roberthut_posts)
  - **Public (anon) users**: Can only SELECT published posts (published = true)
  - **Admin users**: Full CRUD access (SELECT all, INSERT, UPDATE, DELETE)
  - All existing insecure policies are dropped and replaced

  ### 2. Site Settings Table (roberthut_site_settings)
  - **Public (anon) users**: Can only SELECT site settings (read-only)
  - **Admin users**: Can UPDATE site settings
  - No INSERT or DELETE permissions (settings should be initialized once)

  ## Security Notes
  - Uses JWT claims to verify admin role: `(auth.jwt()->>'app_metadata')::jsonb->>'role' = 'admin'`
  - Frontend uses anon key only (service_role key never exposed)
  - Even if someone guesses API endpoints, RLS will block unauthorized operations
  - Published posts remain publicly accessible for blog readers

  ## Admin Setup Required
  To grant admin access to a user, run this in Supabase SQL Editor:
  
  ```sql
  UPDATE auth.users
  SET raw_app_metadata = jsonb_set(
    COALESCE(raw_app_metadata, '{}'::jsonb),
    '{role}',
    '"admin"'
  )
  WHERE email = 'your-email@example.com';
  ```
*/

-- =====================================================
-- POSTS TABLE (roberthut_posts) - Secure RLS Policies
-- =====================================================

-- Drop all existing insecure policies
DROP POLICY IF EXISTS "Public can view published posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Anyone can view all posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Anyone can create posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Anyone can update posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Anyone can delete posts" ON roberthut_posts;

-- Policy 1: Public (anon) can only view published posts
CREATE POLICY "Public can view published posts"
  ON roberthut_posts
  FOR SELECT
  TO anon
  USING (published = true);

-- Policy 2: Authenticated admin users can view all posts (including drafts)
CREATE POLICY "Admin can view all posts"
  ON roberthut_posts
  FOR SELECT
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'role' = 'admin');

-- Policy 3: Only admin can insert new posts
CREATE POLICY "Admin can create posts"
  ON roberthut_posts
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->>'app_metadata')::jsonb->>'role' = 'admin');

-- Policy 4: Only admin can update posts
CREATE POLICY "Admin can update posts"
  ON roberthut_posts
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'role' = 'admin')
  WITH CHECK ((auth.jwt()->>'app_metadata')::jsonb->>'role' = 'admin');

-- Policy 5: Only admin can delete posts
CREATE POLICY "Admin can delete posts"
  ON roberthut_posts
  FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'role' = 'admin');

-- ============================================================
-- SITE SETTINGS TABLE (roberthut_site_settings) - Secure RLS
-- ============================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view site settings" ON roberthut_site_settings;
DROP POLICY IF EXISTS "Anyone can update site settings" ON roberthut_site_settings;

-- Policy 1: Public can view site settings (bio, avatar, etc.)
CREATE POLICY "Public can view site settings"
  ON roberthut_site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy 2: Only admin can update site settings
CREATE POLICY "Admin can update site settings"
  ON roberthut_site_settings
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'app_metadata')::jsonb->>'role' = 'admin')
  WITH CHECK ((auth.jwt()->>'app_metadata')::jsonb->>'role' = 'admin');
