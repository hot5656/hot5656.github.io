/*
  # Update RLS Policies to Use Admin Emails
  
  ## Overview
  This migration updates all RLS policies to check against the admin_emails 
  field in site_settings instead of app_metadata role. This allows admin 
  access to be managed through the database rather than auth metadata.
  
  ## Changes Made
  
  ### Posts Table (roberthut_posts)
  - **Public (anon)**: Can SELECT published posts
  - **Admin users**: Full CRUD access based on email in admin_emails array
  - Uses function to check if user email is in admin list
  
  ### Site Settings Table (roberthut_site_settings)
  - **Public**: Can SELECT (read-only)
  - **Admin users**: Can UPDATE based on email in admin_emails array
  
  ## Security
  - Admin access determined by email in roberthut_site_settings.admin_emails
  - Uses auth.jwt()->>'email' to identify the current user
  - Subquery checks if user email exists in the admin_emails JSONB array
*/

-- =====================================================
-- POSTS TABLE - Update RLS to use admin_emails
-- =====================================================

-- Drop existing admin policies
DROP POLICY IF EXISTS "Admin can view all posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Admin can create posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Admin can update posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Admin can delete posts" ON roberthut_posts;

-- Policy: Authenticated users with email in admin_emails can view all posts
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

-- Policy: Only admin users can insert posts
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

-- Policy: Only admin users can update posts
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

-- Policy: Only admin users can delete posts
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

-- ============================================================
-- SITE SETTINGS TABLE - Update RLS to use admin_emails
-- ============================================================

-- Drop existing admin update policy
DROP POLICY IF EXISTS "Admin can update site settings" ON roberthut_site_settings;

-- Policy: Only users in admin_emails can update site settings
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
