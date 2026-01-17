/*
  # Add English fields to posts table

  1. Changes
    - Add `eng_title` (text) - English title for the post
    - Add `eng_content` (text) - English content in Markdown
    - Add `eng_excerpt` (text) - English excerpt/summary
    - Add `eng_tags` (text[]) - English tags array
    - Add `translate` (text) - Translation status or flag
  
  2. Notes
    - All fields are optional to maintain backward compatibility
    - Existing RLS policies automatically apply to new columns
    - The translate field can be used to track translation status
*/

ALTER TABLE public.roberthut_posts
  ADD COLUMN IF NOT EXISTS eng_title text,
  ADD COLUMN IF NOT EXISTS eng_content text,
  ADD COLUMN IF NOT EXISTS eng_excerpt text,
  ADD COLUMN IF NOT EXISTS eng_tags text[],
  ADD COLUMN IF NOT EXISTS translate text;