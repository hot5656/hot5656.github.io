/*
  # Create Storage Bucket for Blog Images

  1. New Storage Bucket
    - `roberthut-blog-images` bucket for storing post cover images and content images
    
  2. Security
    - Enable public access for reading images
    - Allow authenticated users to upload images
    - Set file size limit and allowed file types
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'roberthut-blog-images',
  'roberthut-blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'roberthut-blog-images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'roberthut-blog-images');

CREATE POLICY "Authenticated users can update own images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'roberthut-blog-images')
  WITH CHECK (bucket_id = 'roberthut-blog-images');

CREATE POLICY "Authenticated users can delete own images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'roberthut-blog-images');