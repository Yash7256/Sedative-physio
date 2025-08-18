/*
  # Initial Schema for Sedative Physio Platform

  1. New Tables
    - `profiles` - User profile information
    - `categories` - Content categories
    - `blogs` - Blog posts
    - `courses` - Course information  
    - `course_enrollments` - User course enrollment tracking
    - `resources` - Free downloadable resources
    - `testimonials` - User testimonials/reviews
    - `forums` - Discussion forums
    - `forum_posts` - Forum posts and replies
    - `quiz_attempts` - Quiz results and progress
    - `notifications` - System notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin role-based access control
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  role text DEFAULT 'user',
  learning_preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  color text DEFAULT '#3B82F6',
  created_at timestamptz DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  category_id uuid REFERENCES categories(id),
  author_id uuid REFERENCES profiles(id),
  published boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text,
  featured_image text,
  category_id uuid REFERENCES categories(id),
  instructor_id uuid REFERENCES profiles(id),
  level text DEFAULT 'beginner',
  duration_hours integer DEFAULT 0,
  price decimal(10,2) DEFAULT 0,
  enrollment_form_url text,
  preview_video_url text,
  published boolean DEFAULT false,
  syllabus jsonb DEFAULT '[]',
  learning_outcomes text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(user_id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  progress integer DEFAULT 0,
  completed boolean DEFAULT false,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL, -- 'pdf', 'video', 'link'
  file_url text,
  category_id uuid REFERENCES categories(id),
  downloads_count integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text,
  rating integer DEFAULT 5,
  text text NOT NULL,
  position text,
  featured boolean DEFAULT false,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create forums table
CREATE TABLE IF NOT EXISTS forums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id),
  posts_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create forum posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  forum_id uuid REFERENCES forums(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(user_id) ON DELETE CASCADE,
  title text,
  content text NOT NULL,
  parent_id uuid REFERENCES forum_posts(id),
  likes_count integer DEFAULT 0,
  replies_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(user_id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for categories (public read)
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Only admins can manage categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Policies for blogs
CREATE POLICY "Anyone can view published blogs" ON blogs FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all blogs" ON blogs FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can manage blogs" ON blogs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Policies for courses
CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage courses" ON courses FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Policies for enrollments
CREATE POLICY "Users can view own enrollments" ON course_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create enrollments" ON course_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own enrollments" ON course_enrollments FOR UPDATE USING (auth.uid() = user_id);

-- Policies for resources
CREATE POLICY "Anyone can view published resources" ON resources FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage resources" ON resources FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Policies for testimonials
CREATE POLICY "Anyone can view approved testimonials" ON testimonials FOR SELECT USING (approved = true);
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Policies for forums
CREATE POLICY "Anyone can view forums" ON forums FOR SELECT USING (true);
CREATE POLICY "Admins can manage forums" ON forums FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Policies for forum posts
CREATE POLICY "Anyone can view forum posts" ON forum_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON forum_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all posts" ON forum_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Policies for notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Insert initial categories
INSERT INTO categories (name, description, color) VALUES
  ('Sports Physio', 'Sports-related physiotherapy and rehabilitation', '#10B981'),
  ('Anatomy', 'Human anatomy and biomechanics', '#3B82F6'),
  ('Rehabilitation', 'Recovery and rehabilitation techniques', '#F59E0B'),
  ('Pain Management', 'Pain assessment and management strategies', '#EF4444'),
  ('Orthopedics', 'Orthopedic physiotherapy', '#8B5CF6'),
  ('Neurology', 'Neurological physiotherapy', '#06B6D4');

-- Insert sample testimonials
INSERT INTO testimonials (name, rating, text, position, approved, featured) VALUES
  ('Dr. Sarah Johnson', 5, 'Sedative Physio has revolutionized my understanding of modern physiotherapy techniques. The courses are comprehensive and practical.', 'Senior Physiotherapist', true, true),
  ('Mike Chen', 5, 'The community features and expert discussions have been invaluable for my professional development. Highly recommended!', 'Sports Therapist', true, true),
  ('Emma Rodriguez', 4, 'Excellent platform with high-quality content. The interactive learning modules make complex concepts easy to understand.', 'Rehabilitation Specialist', true, false),
  ('David Thompson', 5, 'As a student, this platform has been my go-to resource. The free materials and structured courses are exceptional.', 'Physiotherapy Student', true, true),
  ('Lisa Park', 5, 'The latest research and evidence-based practices shared here have significantly improved my clinical outcomes.', 'Clinical Supervisor', true, false);