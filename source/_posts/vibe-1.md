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

### Vibe coding
#### Lovable 
``` bash
...
```

#### BoltNew 
``` bash
...
```

#### Replit 
``` bash
...
```


### Deploy Host
#### Netlify - [current credit](https://app.netlify.com/teams/kyp001/billing/general)
``` bash
# 消耗 credit
Netlify 的 Continuous Deployment 會在每次 push 後自動觸發建置與部署，因此會一直消耗你的 credit

# Stop build(use manule build)
select project
	--> project configuration
	--> Build & deploy 
	-->	Build settings 
	--> Configure
	--> Build status 
	--> Stopped builds
	(Netlify will not build your project automatically. You can build locally via the CLI and then publish new deploys manually via the CLI or the API.)
```

#### Vercel - [current userage](https://vercel.com/roberts-projects-2b1cd09b)
``` bash
# add github Repository
Ovierview
  --> Add New
  --> project
  --> add github account
  --> select Repositories
  --> save
  --> Import
  --> Deploy

# disable auto deploy
# 新增　vercel.json 的檔案，放在你 repo 根目錄
{
  "git": { "deploymentEnabled": false }
}
# enable auto deploy 
# vercel.json 的檔案修改如下 --> commit (若不成功要另外push一次)
{
  "git": { "deploymentEnabled": true }
}

# set variable for it
Settings
  --> Environment Variables
  --> set key and value
    Key: VITE_SUPABASE_URL
    Value: https://ekhhkpdmiptctpyfigyy.supabase.co
    --> save
    Key: VITE_SUPABASE_ANON_KEY
    Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
    --> save
  --> Redeploy
```



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

### Blog post automation - [Blog Journal](https://blog-canvas-roan.vercel.app/)
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
  --> Via Editor

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

#### workflow - auto add post from google sheet Content ideas
<div style="max-width:700px">
	{% asset_img pic1.png pic_1 %}
</div>

``` bash
# Manual Trigger

# sheet --> Get row(s) in sheet
Document: Content ideas
Filters
  Column: Completed
  Value:        - empty
Options
  Return only First Matching Row: Enable

# Google Gemini --> Message a model
Prompt:
"
  You are an expert SEO content writer and blogger, and an absolute expert in this field. Write a detailed, high-quality article based on the topic:
  {{ $json.Prompt }}

  ### Formatting Instructions:
  - Add a concise summary or definition in the introduction (120 words).
  - Divide the article into 4–5 meaningful sections with `##` headings. Each section must explore a **distinct, non-overlapping** subtopic.
  - Under each `##`, write 2–4 paragraphs with deep, insightful content. Avoid shallow or generic points.
  - Use `** **` for emphasis and `* *` for nuance. Include `+` lists where appropriate.
  - End with a `## Conclusion` section summarizing the article (approx. 120 words).

  ### Content Quality:
  - Write for an audience that wants practical, trustworthy, and well-structured answers.
  - Use a friendly, engaging, and informative tone.
  - Include rhetorical questions or transitions to guide the reader naturally.
  - Include related keywords and synonyms to boost semantic SEO.
  - Avoid repetition. Ensure each section adds new value.
  - use markdown format
  - no wrappers, no explanations, just the markdown.

  ### Optional:
  - If relevant, add a short FAQ section using `###` for each question for answers.

  Only output the complete wrappers article — no explanations.

  ### note : the ouput language same as {{ $json.Prompt }}
"

# Google Gemini --> Message a model
Prompt:
"
  You are an expert SEO copywriter. 
  The input article is {{ $json.content.parts[0].text }}

  generate field as below:
    title: Create a compelling, high-converting blog post title (maximum 60 characters) for the following article
    excerpt: A short summary of the article
    read_time: count the article read time 
    tags:  show the article

  ### Instructions:
  - Include the main topic keyword or variation near the beginning.
  - Make it attention-grabbing and benefit-driven.
  - Match the search intent of a user looking for this topic.
  - Use clear, strong language that encourages clicks without sounding like clickbait.
  - Avoid vague words like “things”, “stuff”, “info”.
  - Do not use any HTML characters
  - Do not use quotation marks. The only special characters allowed are ":" and ",".
  - Output only the raw string containing the title — no notes, no wrappers, no code blocks.

  Your goal is to maximize SEO, search intent match, and reader engagement with this headline.

  The output example is below :
  {
    "title": "Create a compelling, high-converting blog post title (maximum 60 characters) for the following article"
    "excerpt": "A short summary of the article"
    read_time: "5 min read",
    tags:  ["Technology", "AI"]
  }

  ### note : the ouput language same as {{ $('Get row(s) in sheet').item.json.Prompt }}
"
Output Content as JSON: Enable

# Edit Field
output(object): {{ $json.content.parts[0].text.parseJson() }}
author_fig: {{ $('Get row(s) in sheet').first().json.Author.replace(' ','_') }}.jpg

# if
{{ $('Edit Fields').item.json.author_fig }} "is equal to" .jpg

# Edit field #1
author_fig: Mr._alligator.jpg
author: Mr. alligator

# Edit field #2
author_fig: {{ $('Edit Fields').item.json.author_fig }}
author: {{ $('Get row(s) in sheet').item.json.Author }}

# Edit field(Author Fig)
author_fig: {{ $json.author_fig }}
author: {{ $json.author }}

# HTTP request(Create Image)
Method: POST
URL: https://api.openai.com/v1/images/generations
Authentication: Predefined Credential Type
Credential Type: OpenAi
OpenAi: OpenAi account
Send Body: Enable
Body Content Type: JSON
Specify Body: Using JSON
  {
    "model": "gpt-image-1-mini",
    "prompt": "{{ $('Edit Fields').item.json.output.title }}, The image doesn't include any words and and don't use comic style",
    "size": "1536x1024",
    "quality": "low",
    "output_format": "jpeg"
  }

# Convert to File --> Move base64 string to file
Base64 Input Field: data[0].b64_json

# Drive --> Upload File
File Name: {{ $('Edit Fields').item.json.output.title }}.{{ $('Convert to File').first().binary.data.fileExtension }}
Parent Drive: My Drive
Parent Folder: post_image

# Drive --> Download File
File: {{ $json.webViewLink }}

# HTTP request
Method: POST
URL: https://ukloaaccuetocrkxsdlv.supabase.co/functions/v1/create-post
Authentication: Generic Credential Type
Generic Auth Type:Custom Auth
Custom Auth: Custom Auth (supabase post)
  JSON:
  + 1st:
    {
      "headers": {
        "apikey": "<api_key>",
        "Authorization": "Bearer <api_key>",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      }
    } 
  + 2nd:add special key
  {
    "headers": {
      "x-n8n-api-key": "n8n_sk_..."
    }
  }
Send Body: Enable
Body Content Type: Form-Data
  Parameter Type:  Form Data
  Name:  title
  Value:   {{ $('Edit Fields').item.json.output.title }}
  
  Parameter Type: Form Data
  Name: content
  Value: {{ $('Message a model').item.json.content.parts[0].text }}
  
  Parameter Type:   Form Data
  Name: excerpt
  Value: {{ $('Edit Fields').item.json.output.excerpt }}
  
  Parameter Type: Form Data
  Name: author_name
  Value: {{ $('Author Fig').item.json.author }}
  
  Parameter Type: Form Data
  Name: tags
  Value: {{ $('Edit Fields').item.json.output.tags.map(tag => `"${tag}"`).join(', ') }}

  Parameter Type: n8n Binary File
  Name: image
  Input Data Field Name: data

  Parameter Type: Form Data
  Name: author_avatar
  Value: {{ $('Author Fig').item.json.author_fig }}
  
# sheet update row in sheet
Document: Content ideas
Mapping Column Mode: Map Each Column Manually
Column to match on: Prompt
  Prompt (using to match): {{ $('Get row(s) in sheet').item.json.Prompt }}
  Date: {{$now.format('yyyy-MM-dd HH:mm:ss')}}
  Author: {{ $('Author Fig').item.json.author }}
  Title: {{ $json.post.title }}
  Post ID: {{ $json.post.id }}
  Completed: Yes
```

#### Lovable coding 
##### Supabase database
``` bash
# create a project - blog_post
Project URL: ...
API Key: ...
```

##### Lovable setting
``` bash
# link to Supabase
Robert --> Settings
  --> Connectors
  --> Supabase
  --> Manage Connected Organization
```


##### design flow
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

##### 完整管理員登入系統
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

# disable Confirm email: 加速測試過程
Authentication
  --> Sign In/Providers
  --> Confirm email: Disable 
# if Confirm email - set correct flow
Authentication
  --> Notifications
  --> Email
  --> Set up SMTP

# 實作前端管理員登入系統

# 註冊第一帳號: email, password(by app, yahoo-gogo999)
Authentication
  --> Users 
  --> see UID information
Table Editor 
  --> user_roles
  --> Insert
  --> Insert row
  --> user_id(select created UID) 
  --> role --> select admin
  --> Save

# enable Confirm email(app add new user, google 001-demo5656/demo999) 
Authentication
  --> Sign In/Providers
  --> Confirm email: Enable   

# email confirm error --> set URL Configuration
Supabase
  --> Authentication
  --> URL Configuration
    Site URL: https://xxx.lovable.app (example)
    Redirect URLs: https://xxx.lovable.app/* (example)

# 忘記密碼功能實作 for reset-password
Supabase
  --> Authentication
  --> URL Configuration
    Redirect URLs: https://xxx.lovable.app/reset-password (example)

# 正確預覽畫面的 URL
Lovable 編輯畫面 --> mouse right 
  --> 在新分頁開啟連接 (才是正確的 程式預覽 URL): https://xxx.lovable.app/ (example)
# add URL
Supabase
  --> Authentication
  --> URL Configuration
    Site URL: https://xxx.lovable.app (example)
    Redirect URLs: https://xxx.lovable.app/** (example)
    (如此可以包含 /reset-password)

# 密碼重置 ok
```

##### support other url can change password, add bot
``` bash
# Edge function
"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-n8n-api-key',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 🔐 驗證 n8n API Key
    const n8nApiKey = Deno.env.get('N8N_API_KEY');
    const providedApiKey = req.headers.get('x-n8n-api-key');
    
    if (!n8nApiKey) {
      console.error('N8N_API_KEY environment variable is not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!providedApiKey || providedApiKey !== n8nApiKey) {
      console.error('Invalid or missing API key');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('API key validated successfully');

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
"

# Fdge function create-post JWT set disable(section Details)

# add variable N8N_API_KEY for n8n credential(Function --> Secrects)

# set correct URL
Authentication  
  --> URL Configuration
    Site URL:
      https://app-id.lovable.app
    Redirect URLs:
      https://app-id.lovable.app/**
      https://app-name.vercel.app/**
```

##### modify chat only support when log, support user edit self post
``` bash
# add guest account
guest-kkk999

# 建立 table profiles
-- 建立 profiles 表
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  avatar_url text,
  email text,
  created_at timestamp with time zone default now()
);

-- 啟用 RLS
alter table public.profiles enable row level security;

-- RLS 政策：用戶可以讀取所有 profiles（用於名稱登入查詢）
create policy "Anyone can read profiles"
on public.profiles for select
to anon, authenticated
using (true);

-- RLS 政策：用戶只能更新自己的 profile
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id);

-- 自動建立 profile 的觸發器
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar_url, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name'),
    new.raw_user_meta_data ->> 'avatar_url',
    new.email
  );
  return new;
end;
$$;

-- 建立觸發器
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

# 公開 author-avatars
-- 允許任何人讀取 author-avatars 桶中的檔案
CREATE POLICY "Allow public read access to author-avatars"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'author-avatars');


# 允許 user 處理自己的 post
# 1. 在 posts 表添加 user_id 欄位
# 2. 更新 RLS 政策允許用戶管理自己的文章
# 3. 修改代碼使用用戶的頭像
# 首先執行此 SQL 遷移來添加 user_id 欄位和更新 RLS：
# 修改 table 保留原資料
-- 添加 user_id 欄位
ALTER TABLE posts ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 刪除所有可能存在的政策
DROP POLICY IF EXISTS "Allow public read access" ON posts;
DROP POLICY IF EXISTS "Allow insert access" ON posts;
DROP POLICY IF EXISTS "Allow delete access" ON posts;
DROP POLICY IF EXISTS "Allow update access" ON posts;
DROP POLICY IF EXISTS "Anyone can read published posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;

-- 重新建立政策
CREATE POLICY "Anyone can read published posts" ON posts
FOR SELECT USING (status = 'published' OR auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can insert posts" ON posts
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON posts
FOR UPDATE TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete own posts" ON posts
FOR DELETE TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
```

### [Tarot Cards](https://tarot-cards-seven.vercel.app/) (Bolt.New) 
#### BoltNew prompt
``` bash
# First prompt
我想創建一個交互式塔羅牌占卜網頁應用。以下是詳細需求：

【應用概述】
這是一個為個人使用而設計的塔羅牌占卜網站，結合了古老的占卜傳統與現代網頁設計。用戶可以提出問題，選擇占卜類型，進行虛擬洗牌和抽牌，然後獲得詳細的牌卡解釋。

【核心功能】

首頁歡迎界面

優雅的標題："塔羅之門 - 尋求智慧的占卜"
簡短的介紹文本，解釋塔羅的用途（自我反思、獲取洞察等）
一個明顯的「開始占卜」按鈕，進入主應用
問題輸入界面

要求用戶輸入他們想要占卜的問題或關注領域
文本輸入框帶有提示文字："請輸入你想要探索的問題或生活領域..."
顯示一些「常見問題範例」供參考：
"我如何能在職業上取得進展？"
"我的感情關係將如何發展？"
"現在對我來說最重要的課題是什麼？"
「下一步」按鈕繼續
占卜類型選擇

提供三種主要牌陣選項： a) 單牌占卜 - "快速指引"（1張牌） b) 三牌占卜 - "過去、現在、未來"（3張牌） c) 五牌占卜 - "深度洞察"（5張牌：情況、挑戰、建議、結果、額外洞察）
每個選項帶有簡短說明和圖標
用戶選擇後顯示「開始占卜」按鈕
虛擬洗牌體驗

動畫展示78張牌卡快速翻轉（象徵洗牌過程）
顯示文字："專注你的問題...融入占卜的能量..."
洗牌動畫持續3-5秒，然後自動進入抽牌階段
抽牌動畫

根據選定的牌陣數量，依次翻開牌卡
每張牌卡翻開時有動畫效果（3D翻轉或淡入）
牌卡可以是正位或逆位（隨機或根據數據庫）
牌卡翻開後排列成所選牌陣的形狀
占卜結果展示

顯示所有抽取的牌卡及其排列
為每張牌卡顯示：
牌卡名稱和編號
牌卡的視覺圖像（使用牌卡插圖）
正位/逆位標示
牌卡含義（2-3句話的簡潔解釋）
整體占卜解讀（200-300字的文字，解釋所有牌卡如何共同回應用戶的問題）
互動功能

「詢問更多」按鈕：用戶可以提出後續問題，根據已有的牌卡進行深入討論
「重新占卜」按鈕：使用新的問題重新開始
「保存此次占卜」按鈕：將占卜結果保存到本地瀏覽器（localStorage）
歷史記錄（可選）

側邊欄或單獨頁面顯示過去的占卜記錄
每條記錄顯示：日期、問題、牌卡摘要、完整解讀
【設計要求】

視覺風格

色彩主題：深色背景（如深紫色、深藍色或黑色）配合金色、銀色或玫瑰金色的強調色
優雅但易讀的字體
神祕但不過度的氛圍
響應式設計，在手機、平板和桌面上都能完美顯示
動畫和互動

平滑的頁面轉換
牌卡翻轉和排列的流暢動畫
懸停效果和焦點指示
加載動畫和過渡效果
可訪問性

充足的顏色對比度
可鍵盤導航
為所有互動元素提供 alt 文本
【牌卡資料】

創建或使用一個包含 78 張塔羅牌的數據庫，每張牌包括：

牌名（中英文）
編號
大秘儀/小秘儀分類
牌組（杯、魔杖、寶劍、聖幣等）
正位含義（50-100字）
逆位含義（50-100字）
牌卡圖像 URL（可使用免費塔羅牌圖像 API 或本地圖像）
元素和象徵符號
【技術要求】

使用現代前端框架（React、Vue 或純 HTML/CSS/JavaScript 都可以）
牌卡信息存儲在 JSON 數據結構或客戶端數據庫中
使用 localStorage 保存用戶的占卜歷史
確保代碼結構清晰、易於維護和擴展
包含基本的錯誤處理和輸入驗證
【額外增強功能（可選）】

多語言支持（中文、英文）
暗色/亮色主題切換
占卜解讀的 AI 增強版本（與 GPT API 集成以生成更個性化的解讀）
分享占卜結果的功能（生成截圖或分享鏈接）
每日占卜推送
學習模式：展示每張牌卡的詳細含義和歷史背景
【用戶體驗流程】

用戶進入網頁，看到歡迎界面
點擊「開始占卜」進入問題輸入
輸入他們的問題，點擊「下一步」
選擇占卜類型（單牌、三牌或五牌）
觀看虛擬洗牌動畫
看著牌卡逐一翻開並排列
閱讀每張牌卡的含義和整體占卜解讀
選擇是否詢問更多、保存占卜或重新開始
請使用現代的、視覺上令人愉悅的設計來創建這個應用。確保整個體驗感覺真實而有意義，同時保持用戶友好和易於導航。
```

#### Deploy to Netlify
``` bash
# set variable 
Project configuration --> Environment variables
  --> Add these two variables:
    Variable 1:
    Key: VITE_SUPABASE_URL
    Value: https://ekhhkpdmiptctpyfigyy.supabase.co

    Variable 2:
    Key: VITE_SUPABASE_ANON_KEY
    Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

# after add variable the run develop trigger
Deploys --> Trigger deploy --> Deploy project
```

#### Supabase get URL&API
``` bash
porject 
	--> Project Settings 
	--> Data API
		URL(VITE_SUPABASE_URL)
	--> API KEY
		VITE_SUPABASE_ANON_KEY(Publishable key)
```


### Ref
+ [Hostinger VPS](https://www.hostinger.com/)- cpupon "DIEGODAVILA"
