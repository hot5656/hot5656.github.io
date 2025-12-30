/* 
	# Add roberthut_posts some field for english and translate flag
*/
ALTER TABLE public.roberthut_posts
  ADD COLUMN IF NOT EXISTS eng_title text,
  ADD COLUMN IF NOT EXISTS eng_content text,
  ADD COLUMN IF NOT EXISTS eng_excerpt text,
  ADD COLUMN IF NOT EXISTS eng_tags text[],
  ADD COLUMN IF NOT EXISTS translate text;
