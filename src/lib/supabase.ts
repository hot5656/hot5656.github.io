import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image_url?: string;
  tags?: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  bio_title: string;
  bio_content: string;
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
