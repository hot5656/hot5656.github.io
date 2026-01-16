/*
  # Create useful_links table for reference resources

  1. New Tables
    - `useful_links`
      - `id` (uuid, primary key, default: uuid_generate_v4())
      - `name_en` (text) - English name of the resource
      - `name_zh` (text) - Chinese name of the resource
      - `url` (text, not null) - URL of the resource
      - `created_at` (timestamptz, default: now())
  
  2. Security
    - Enable RLS on `useful_links` table
    - Add policy for public SELECT access (anyone can view)
    - Add policy for authenticated INSERT/UPDATE/DELETE (admin only via admin_emails check)
*/

-- Create the useful_links table
CREATE TABLE IF NOT EXISTS useful_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text,
  name_zh text,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE useful_links ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view useful links (public access)
CREATE POLICY "Anyone can view useful links"
  ON useful_links
  FOR SELECT
  USING (true);

-- Policy: Authenticated admin users can insert useful links
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

-- Policy: Authenticated admin users can update useful links
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

-- Policy: Authenticated admin users can delete useful links
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