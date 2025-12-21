/*
  # Fix Storage Bucket Permissions

  1. Changes
    - Drop existing restrictive policies that require authentication
    - Add new policies that allow public upload, update, and delete
    - This is suitable for a simple blog without authentication

  2. Security Notes
    - All users can upload, update, and delete images
    - Public read access remains the same
    - Consider adding authentication in the future for production use
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own images" ON storage.objects;

-- Allow anyone to upload images
CREATE POLICY "Anyone can upload images"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'blog-images');

-- Allow anyone to update images
CREATE POLICY "Anyone can update images"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'blog-images')
  WITH CHECK (bucket_id = 'blog-images');

-- Allow anyone to delete images
CREATE POLICY "Anyone can delete images"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'blog-images');
