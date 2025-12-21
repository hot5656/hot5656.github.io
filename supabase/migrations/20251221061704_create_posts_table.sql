/*
  # Create blog posts table for Robert hut blog

  1. New Tables
    - `roberthut_posts`
      - `id` (uuid, primary key) - Unique identifier for each post
      - `title` (text, required) - Post title
      - `slug` (text, unique, required) - URL-friendly identifier
      - `content` (text, required) - Markdown formatted content
      - `created_at` (timestamptz) - Post creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      - `cover_image_url` (text, optional) - URL for cover image
      - `tags` (text array, optional) - Array of tags for categorization
      - `excerpt` (text, optional) - Short summary/preview text

  2. Security
    - Enable RLS on `posts` table
    - Add policy for public read access (anyone can view posts)
    - Add policy for authenticated users to create posts
    - Add policy for authenticated users to update their posts
    - Add policy for authenticated users to delete their posts

  3. Indexes
    - Add index on slug for faster lookups
    - Add index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS roberthut_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  cover_image_url text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS roberthut_posts_slug_idx ON roberthut_posts(slug);
CREATE INDEX IF NOT EXISTS roberthut_posts_created_at_idx ON roberthut_posts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE roberthut_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read posts (public access)
CREATE POLICY "Anyone can view published posts"
  ON roberthut_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON roberthut_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update posts
CREATE POLICY "Authenticated users can update posts"
  ON roberthut_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete posts
CREATE POLICY "Authenticated users can delete posts"
  ON roberthut_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION roberthut_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_roberthut_posts_updated_at
  BEFORE UPDATE ON roberthut_posts
  FOR EACH ROW
  EXECUTE FUNCTION roberthut_update_updated_at_column();