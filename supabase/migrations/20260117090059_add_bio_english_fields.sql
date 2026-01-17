/*
  # Add English fields to bio table

  1. Changes
    - Add `bio_title_en` (text) - English title for the bio section
    - Add `bio_content_en` (text) - English bio content in Markdown
  
  2. Notes
    - These fields are optional to maintain backward compatibility
    - Default values set to empty string for consistency
    - Existing RLS policies automatically apply to new columns
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'roberthut_site_settings' AND column_name = 'bio_title_en'
  ) THEN
    ALTER TABLE roberthut_site_settings ADD COLUMN bio_title_en text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'roberthut_site_settings' AND column_name = 'bio_content_en'
  ) THEN
    ALTER TABLE roberthut_site_settings ADD COLUMN bio_content_en text DEFAULT '';
  END IF;
END $$;