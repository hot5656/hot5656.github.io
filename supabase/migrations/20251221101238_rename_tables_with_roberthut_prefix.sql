/*
  ****************************************************************************************************************
  **************** it changes the table's name the other sql update already so don't need to run *****************
  ****************************************************************************************************************

  # Rename Tables and Functions with roberthut_ Prefix

  1. Changes
    - Rename `posts` table to `roberthut_posts`
    - Rename `site_settings` table to `roberthut_site_settings`
    - Rename `update_updated_at_column` function to `roberthut_update_updated_at_column`
    - Update all triggers to use the new function name

  2. Notes
    - All existing data will be preserved
    - All policies and constraints will be maintained
    - Trigger functions will be updated to reference the new function name
*/

-- Rename the function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'update_updated_at_column'
  ) THEN
    ALTER FUNCTION update_updated_at_column() 
      RENAME TO roberthut_update_updated_at_column;
  END IF;
END $$;

-- Rename the tables
ALTER TABLE IF EXISTS posts 
  RENAME TO roberthut_posts;

ALTER TABLE IF EXISTS site_settings 
  RENAME TO roberthut_site_settings;

-- Drop and recreate triggers with correct function reference
DROP TRIGGER IF EXISTS update_roberthut_posts_updated_at ON roberthut_posts;
DROP TRIGGER IF EXISTS update_roberthut_site_settings_updated_at ON roberthut_site_settings;
DROP TRIGGER IF EXISTS update_posts_updated_at ON roberthut_posts;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON roberthut_site_settings;

-- Recreate triggers
CREATE TRIGGER update_roberthut_posts_updated_at
  BEFORE UPDATE ON roberthut_posts
  FOR EACH ROW
  EXECUTE FUNCTION roberthut_update_updated_at_column();

CREATE TRIGGER update_roberthut_site_settings_updated_at
  BEFORE UPDATE ON roberthut_site_settings
  FOR EACH ROW
  EXECUTE FUNCTION roberthut_update_updated_at_column();
