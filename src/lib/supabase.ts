import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image_url?: string;
  tags?: string[];
  eng_title?: string;
  eng_content?: string;
  eng_excerpt?: string;
  eng_tags?: string[];
  translate?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  bio_title: string;
  bio_content: string;
  bio_title_en?: string;
  bio_content_en?: string;
  avatar_url?: string;
  updated_at: string;
}

export interface UsefulLink {
  id: string;
  name_en?: string;
  name_zh?: string;
  url: string;
  created_at: string;
}
