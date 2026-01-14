/*
  # Add Admin Emails Field
  
  1. Changes
    - Add `admin_emails` column to `roberthut_site_settings` table
    - Set initial admin email to kyp001@gmail.com
    - This allows the system to identify admin users
  
  2. Security
    - Only authenticated users in the admin_emails array can modify site settings
    - RLS policies will check against this field
*/

-- Add admin_emails column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'roberthut_site_settings' AND column_name = 'admin_emails'
  ) THEN
    ALTER TABLE roberthut_site_settings 
    ADD COLUMN admin_emails jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Insert or update the admin email
INSERT INTO roberthut_site_settings (id, admin_emails)
VALUES (
  'a0000000-0000-0000-0000-000000000000'::uuid,
  '["kyp001@gmail.com"]'::jsonb
)
ON CONFLICT (id) 
DO UPDATE SET admin_emails = '["kyp001@gmail.com"]'::jsonb;
