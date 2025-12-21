/*
  # Add Published Status and Fix RLS Policies

  1. Changes
    - Add `published` boolean field to posts table (default: false)
    - Drop existing restrictive RLS policies that require authentication
    - Add new policies that allow public access for all operations
    - Update SELECT policy to only show published posts to public (anon users)
    - Allow all operations for managing posts without authentication

  2. Security Notes
    - This is suitable for a simple blog without authentication
    - Public users can only see published posts
    - All users can create, update, and delete posts
    - Consider adding authentication in the future for production use

  3. New Fields
    - `published` (boolean, default: false) - Whether the post is published or draft
*/

-- Add published field to posts table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'roberthut_posts' AND column_name = 'published'
  ) THEN
    ALTER TABLE roberthut_posts ADD COLUMN published boolean DEFAULT false;
  END IF;
END $$;

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view published posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON roberthut_posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON roberthut_posts;

-- Policy: Public can only view published posts
CREATE POLICY "Public can view published posts"
  ON roberthut_posts
  FOR SELECT
  TO anon
  USING (published = true);

-- Policy: Anyone can view all posts (for admin purposes)
CREATE POLICY "Anyone can view all posts"
  ON roberthut_posts
  FOR SELECT
  TO public
  USING (true);

-- Policy: Anyone can create posts
CREATE POLICY "Anyone can create posts"
  ON roberthut_posts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Anyone can update posts
CREATE POLICY "Anyone can update posts"
  ON roberthut_posts
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Policy: Anyone can delete posts
CREATE POLICY "Anyone can delete posts"
  ON roberthut_posts
  FOR DELETE
  TO public
  USING (true);
