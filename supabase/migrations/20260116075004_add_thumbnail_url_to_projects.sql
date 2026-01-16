/*
  # Add thumbnail_url to projects table

  1. Changes
    - Add `thumbnail_url` column to `roberthut_projects` table to allow manual thumbnail uploads
    - This will be used as a fallback when OG image fetch fails or for custom thumbnails
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'roberthut_projects' AND column_name = 'thumbnail_url'
  ) THEN
    ALTER TABLE roberthut_projects ADD COLUMN thumbnail_url text;
  END IF;
END $$;