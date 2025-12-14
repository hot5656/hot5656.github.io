---
title: Vibe coding 
abbrlink: 7c84
date: 2025-12-09 11:48:37
categories:
tags: AI
  - Vibe Coding
---

### 簡介
#### 4 tool suggest 
+ [Gamma](https://gamma.app/) : create presentations(document, website, social media post)
+ [Lovable](https://lovable.dev/): interna; tools, website, personal to use for personal things apps, customer apps, B2B apps or prototype 
+ [v0](https://v0.app/): create website and web application
+ [n8n]((https://n8n.io/workflows/)): automation workflow 


<!--more-->

### Prompt
#### Lovable 
##### Image generaye app
``` bash
Create an AI-powered image generator app. The interface should be clean, modern, and visually appealing. Users should be able to type in a description of the image they want and click a button to generate it.
To generate the image, send a POST request to this endpoint: https://hot5656.app.n8n.cloud/webhook/image
The request body should look like this:
{ "prompt": "a high-resolution portrait of a man wearing a suit" }
The API will return the generated image as a binary file.
```
##### prompt for portfolio
``` bash
I am a senior full stack software Engineer with 15 years experience.
help me create a portfolio website. add all my skills and relevant tech stack.
include a dark mode in the website.
```

##### prompt for General Hospital
``` bash
Build a modern, clean, and user-friendly website for a General Hospital.

Main Requirements:
Home Page: Overview of the hospital with a welcoming banner, quick links to departments, emergency contact, and appointment booking.
Aubot Us Page: History, mission, vision, leadership team, and accreditation information.
Services Page: Summary of major hospital services.
Create a dedicated page for each department with a clear description:
Emergency Department(ED)/Accident&Emergency(A&E), Internal Medicine, Cardiology, Gastroenterology, Pimonoloav, Nebro
....
Accessible (ADA-compliant if possible)

Special Feature:
Quick access button for Emergency Room contact.
Search functionality for doctors and services.
Testimonials/Reviews section from past patients.
Blog session for health tips and hospital news.

Tone:
Trustworthy, caring, and approachable.
```

### Blog post automation
#### Supabase 
##### Supabase CLI
``` bash
# inatall at Mac
brew install supabase/tap/supabase

# login to Supabase CLI
supabase login

# show all Edge function
supabase functions list

# delete Edge function 
supabase functions delete create-post
```

##### Edge function control
``` bash
# add 
Edge Function --> Deploy a new function
  --> Via Edut

# set JWT Enable
select funtion --> Details
  --> Verify JWT with legacy secret
  --> Enable (Enable access 要驗證)

# modify 
select funtion
  --> Code
  --> Modify 
  --> Deploy Updates
```

#### workflow
<div style="max-width:700px">
	{% asset_img pic1.png pic_1 %}
</div>

#### Lovable coding
##### Supabase database
``` bash
# create a project - blog_post
Project URL: ...
API Key: ...


```

#### Lovable setting
``` bash
# link to Supabase
Robert --> Settings
  --> Connectors
  --> Supabase
  --> Manage Connected Organization
  (I don'n know, why do I nto set Project URL and API Key)
```


#### design flow
``` bash
# first prompt
Create a blog platform for testing with:
+ Homepage showing 5 sample blog posts
+ Each post has: title, featured image, content, author, date
+ Individual post pages with full content
+ Use Unsplash free images for demo
+ Ability to add/delete posts (stored in browser)

# example image source 
post image: https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80
author image: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80

# save post and image to Supabase

# create posts table -for save post
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_name TEXT DEFAULT 'Anonymous',
  author_avatar TEXT,
  date TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allow public read access
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete" ON posts
  FOR DELETE USING (true);

# add two post to table post
INSERT INTO posts (title, excerpt, content, featured_image, author_name, author_avatar, date, read_time, tags)
VALUES 
(
  'The Art of Minimalist Design',
  'Discover how less can truly be more in the world of digital design and user experience.',
  'Minimalism in design is not about removing elements until nothing is left. It''s about intentionally keeping only what serves a purpose.

## The Philosophy Behind Less

When we strip away the unnecessary, we allow the essential to shine. Every pixel, every word, every interaction should earn its place on the screen.

> "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

## Practical Applications

Start by questioning every element. Does this button need to be here? Is this animation adding value or just adding load time? The answers will guide you toward cleaner, more effective designs.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
  'Sarah Chen',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  'December 12, 2024',
  '4 min read',
  ARRAY['Design', 'Minimalism', 'UX']
),
(
  'Building for the Future with AI',
  'How artificial intelligence is reshaping the way we think about software development.',
  'The integration of AI into our development workflows is no longer a future prospect—it''s happening now, and it''s changing everything.

## Beyond Code Completion

While AI-powered code suggestions grab headlines, the real transformation is deeper. We''re seeing AI assist in architecture decisions, bug detection, and even user research synthesis.

## The Human Element

Despite these advances, the human developer remains essential. AI amplifies our capabilities but doesn''t replace our judgment, creativity, or understanding of user needs.

> "AI is a tool, not a replacement. The best results come from human-AI collaboration."

The future belongs to developers who learn to work alongside these tools effectively.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Marcus Johnson',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  'December 10, 2024',
  '6 min read',
  ARRAY['AI', 'Technology', 'Development']
);

# Create Storage Bucket at Supabase
-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Allow public read access
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow uploads
CREATE POLICY "Anyone can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');

# modidy Edge function for support load image
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string || '';
    const authorName = formData.get('author_name') as string || 'Anonymous';
    const tagsString = formData.get('tags') as string || '';
    const imageFile = formData.get('image') as File | null;

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let featuredImageUrl = '/placeholder.svg';

    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop() || 'jpg';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, imageFile, {
          contentType: imageFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        return new Response(
          JSON.stringify({ error: 'Failed to upload image', details: uploadError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      
      featuredImageUrl = urlData.publicUrl;
      console.log('Image uploaded successfully:', featuredImageUrl);
    }

    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const { data: post, error: insertError } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        excerpt,
        featured_image: featuredImageUrl,
        author_name: authorName,
        author_avatar: '/placeholder.svg',
        date: new Date().toISOString().split('T')[0],
        read_time: readTime,
        tags
      })
      .select()
      .single();

    if (insertError) {
      console.error('Post insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create post', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Post created successfully:', post.id);

    return new Response(
      JSON.stringify({ success: true, post }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

# add bucket for  author-avatars
Storage  --> New bucket 
  --> name: author-avatars
  --> Public bucket: Enable
  --> create

# upload author image
  --> author-avatars
  --> Upload files

# modify some function
# 1. add edit published/draft
# 2. Edit exist post
# 3. delete post must enter the post's author_name to make sure
# 4. write post by webm auto pick the image and author vavtar image

# posts table add field status
ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'published';

# modify status error, set RLS policy
# The 406 error shows the update is blocked by RLS policy. You need to add an UPDATE policy to your Supabase posts table.
CREATE POLICY "Allow public update" ON posts FOR UPDATE USING (true) WITH CHECK (true);

# Lasted Edge function
# 1. add author image
# 2. \n 變 換行
# 3. post set status: 'draft'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse multipart form data
    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    let content = formData.get('content') as string;
    let excerpt = formData.get('excerpt') as string || '';
    const authorName = formData.get('author_name') as string || 'Anonymous';
    const authorAvatar = formData.get('author_avatar') as string || '';
    const tagsString = formData.get('tags') as string || '';
    const imageFile = formData.get('image') as File | null;

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert literal \n strings to actual newlines
    content = content.replace(/\\n/g, '\n');
    excerpt = excerpt.replace(/\\n/g, '\n');

    let featuredImageUrl = '/placeholder.svg';

    // Upload image if provided
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop() || 'jpg';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, imageFile, {
          contentType: imageFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        return new Response(
          JSON.stringify({ error: 'Failed to upload image', details: uploadError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      
      featuredImageUrl = urlData.publicUrl;
      console.log('Image uploaded successfully:', featuredImageUrl);
    }

    // Parse tags
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];

    // Calculate read time
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    // Build author avatar URL if filename provided
    let authorAvatarUrl = '/placeholder.svg';
    if (authorAvatar) {
      // If it's already a full URL, use it directly
      if (authorAvatar.startsWith('http://') || authorAvatar.startsWith('https://')) {
        authorAvatarUrl = authorAvatar;
      } else {
        // Otherwise, construct URL from author-avatars bucket
        const { data: avatarUrlData } = supabase.storage
          .from('author-avatars')
          .getPublicUrl(authorAvatar);
        authorAvatarUrl = avatarUrlData.publicUrl;
      }
    }

    // Insert post with status='draft' for n8n posts
    const { data: post, error: insertError } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        excerpt,
        featured_image: featuredImageUrl,
        author_name: authorName,
        author_avatar: authorAvatarUrl,
        date: new Date().toISOString().split('T')[0],
        read_time: readTime,
        tags,
        status: 'draft'  // n8n posts are drafts by default
      })
      .select()
      .single();

    if (insertError) {
      console.error('Post insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create post', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Post created successfully as draft:', post.id);

    return new Response(
      JSON.stringify({ success: true, post }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

```

#### 完整管理員登入系統
``` bash
# 
-- 建立角色類型
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 建立 user_roles 表
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- 啟用 RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 允許已登入用戶讀取自己的角色
CREATE POLICY "Users can read own roles" 
ON public.user_roles FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

# 建立角色檢查函數（避免 RLS 遞迴）
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

# 更新 posts 表的 RLS 政策
-- 刪除現有的開放政策
DROP POLICY IF EXISTS "Allow public read" ON public.posts;
DROP POLICY IF EXISTS "Allow public insert" ON public.posts;
DROP POLICY IF EXISTS "Allow public update" ON public.posts;
DROP POLICY IF EXISTS "Allow public delete" ON public.posts;

-- 新增安全的 RLS 政策
-- 任何人可讀取已發佈文章
CREATE POLICY "Anyone can read published posts" 
ON public.posts FOR SELECT 
USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

-- 只有管理員可新增文章
CREATE POLICY "Admins can insert posts" 
ON public.posts FOR INSERT 
TO authenticated 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 只有管理員可更新文章
CREATE POLICY "Admins can update posts" 
ON public.posts FOR UPDATE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

-- 只有管理員可刪除文章
CREATE POLICY "Admins can delete posts" 
ON public.posts FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));


```


### Ref
+ [Hostinger VPS](https://www.hostinger.com/)- cpupon "DIEGODAVILA"
