/*
  # Create testimonials table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `avatar_url` (text, optional)
      - `rating` (integer, default 5)
      - `text` (text, required)
      - `position` (text, optional)
      - `featured` (boolean, default false)
      - `approved` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public read access to approved testimonials
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  position text,
  featured boolean DEFAULT false,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access to approved testimonials
CREATE POLICY "Public can read approved testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (approved = true);

-- Allow authenticated users to insert testimonials (for submission)
CREATE POLICY "Authenticated users can submit testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert some sample testimonials for demonstration
INSERT INTO testimonials (name, rating, text, position, featured, approved) VALUES
  ('Dr. Sarah Johnson', 5, 'Sedative Physio has completely transformed my understanding of advanced rehabilitation techniques. The courses are comprehensive and the community support is exceptional.', 'Senior Physiotherapist', true, true),
  ('Michael Chen', 5, 'The interactive learning modules and practical case studies have enhanced my clinical skills tremendously. Highly recommend to all physio professionals.', 'Sports Physiotherapist', true, true),
  ('Emma Rodriguez', 4, 'Excellent platform with high-quality content. The mobile app makes it easy to learn on the go between patient sessions.', 'Private Practice Owner', true, true),
  ('Dr. James Wilson', 5, 'The evidence-based approach and latest research integration sets this platform apart from others. Essential for continuing education.', 'Clinical Director', true, true),
  ('Lisa Thompson', 5, 'Amazing resource for both new graduates and experienced practitioners. The mentorship program is particularly valuable.', 'Pediatric Physiotherapist', true, true);