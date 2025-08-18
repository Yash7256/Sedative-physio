import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: string;
          learning_preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          role?: string;
          learning_preferences?: any;
        };
        Update: {
          full_name?: string;
          avatar_url?: string;
          role?: string;
          learning_preferences?: any;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          color: string;
          created_at: string;
        };
        Insert: {
          name: string;
          description?: string;
          color?: string;
        };
        Update: {
          name?: string;
          description?: string;
          color?: string;
        };
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          featured_image: string | null;
          category_id: string | null;
          author_id: string | null;
          published: boolean;
          tags: string[];
          views_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          content: string;
          excerpt?: string;
          featured_image?: string;
          category_id?: string;
          author_id?: string;
          published?: boolean;
          tags?: string[];
        };
        Update: {
          title?: string;
          content?: string;
          excerpt?: string;
          featured_image?: string;
          category_id?: string;
          published?: boolean;
          tags?: string[];
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          avatar_url: string | null;
          rating: number;
          text: string;
          position: string | null;
          featured: boolean;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          avatar_url?: string;
          rating?: number;
          text: string;
          position?: string;
          featured?: boolean;
          approved?: boolean;
        };
        Update: {
          name?: string;
          avatar_url?: string;
          rating?: number;
          text?: string;
          position?: string;
          featured?: boolean;
          approved?: boolean;
        };
      };
    };
  };
};