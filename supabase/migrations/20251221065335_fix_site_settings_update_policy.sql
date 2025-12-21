/*
  # Fix site_settings update policy

  1. Changes
    - Drop existing update policy that only allows authenticated users
    - Create new update policy that allows both anonymous and authenticated users
    
  2. Security Note
    - This allows anyone to update site settings
    - In a production environment, you should implement proper authentication
    - For this demo blog, we allow anonymous updates for ease of use
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can update site settings" ON site_settings;

-- Create new policy that allows anonymous users to update
CREATE POLICY "Anyone can update site settings"
  ON site_settings
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);