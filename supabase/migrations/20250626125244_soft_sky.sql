/*
  # LaunchPad Database Schema

  1. New Tables
    - `users` - User profiles for both job seekers and employers
    - `jobs` - Job postings with embedded challenges
    - `applications` - Job applications with submissions
    - `badges` - Available badges and achievements
    - `upskilling_roadmaps` - Career development roadmaps
    - `upskilling_progress` - User progress tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure data access based on user roles
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('employer', 'jobseeker')),
  company text,
  skills text[],
  avatar text,
  points integer DEFAULT 0,
  badges text[],
  completed_challenges text[],
  job_interests text[],
  assessed_skills text[],
  upskilling_progress jsonb[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  remote boolean DEFAULT false,
  skills text[] NOT NULL,
  description text NOT NULL,
  challenge_title text NOT NULL,
  challenge_description text NOT NULL,
  submission_type text NOT NULL CHECK (submission_type IN ('text', 'link', 'file')),
  point_value integer DEFAULT 100,
  badge_awarded text,
  deadline date NOT NULL,
  employer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id uuid REFERENCES users(id) ON DELETE CASCADE,
  applicant_name text NOT NULL,
  applicant_email text NOT NULL,
  submission_type text NOT NULL CHECK (submission_type IN ('text', 'link', 'file')),
  submission_content text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed', 'accepted', 'rejected')),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback text,
  points_earned integer,
  badge_earned text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  rarity text NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at timestamptz DEFAULT now()
);

-- Create upskilling_roadmaps table
CREATE TABLE IF NOT EXISTS upskilling_roadmaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  job_category text NOT NULL,
  total_challenges integer NOT NULL,
  estimated_duration text NOT NULL,
  challenges jsonb[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create upskilling_progress table
CREATE TABLE IF NOT EXISTS upskilling_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  roadmap_id uuid REFERENCES upskilling_roadmaps(id) ON DELETE CASCADE,
  job_title text NOT NULL,
  completed_challenges text[],
  current_level text DEFAULT 'Beginner' CHECK (current_level IN ('Beginner', 'Intermediate', 'Expert')),
  started_at timestamptz DEFAULT now(),
  last_updated timestamptz DEFAULT now(),
  UNIQUE(user_id, roadmap_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE upskilling_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE upskilling_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for jobs table
CREATE POLICY "Anyone can read jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employers can create jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.type = 'employer'
    )
  );

CREATE POLICY "Employers can update own jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (employer_id = auth.uid());

-- Create policies for applications table
CREATE POLICY "Users can read own applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (
    applicant_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.employer_id = auth.uid()
    )
  );

CREATE POLICY "Job seekers can create applications"
  ON applications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    applicant_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.type = 'jobseeker'
    )
  );

CREATE POLICY "Employers can update applications for their jobs"
  ON applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.employer_id = auth.uid()
    )
  );

-- Create policies for badges table
CREATE POLICY "Anyone can read badges"
  ON badges
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for upskilling_roadmaps table
CREATE POLICY "Anyone can read roadmaps"
  ON upskilling_roadmaps
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for upskilling_progress table
CREATE POLICY "Users can read own progress"
  ON upskilling_progress
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own progress"
  ON upskilling_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own progress"
  ON upskilling_progress
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(type);
CREATE INDEX IF NOT EXISTS idx_jobs_employer_id ON jobs(employer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_skills ON jobs USING GIN(skills);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_applicant_id ON applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_upskilling_progress_user_id ON upskilling_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_upskilling_progress_roadmap_id ON upskilling_progress(roadmap_id);

-- Insert initial badges data
INSERT INTO badges (name, description, icon, rarity) VALUES
  ('First Challenge', 'Complete your first challenge', 'Trophy', 'common'),
  ('React Master', 'Complete a React-based challenge', 'Code', 'rare'),
  ('Marketing Strategist', 'Excel in marketing challenges', 'TrendingUp', 'rare'),
  ('Design Innovator', 'Create outstanding design solutions', 'Palette', 'epic'),
  ('API Architect', 'Build robust backend systems', 'Server', 'epic'),
  ('Content Creator', 'Craft compelling written content', 'PenTool', 'common'),
  ('Challenge Champion', 'Complete 5 challenges', 'Award', 'legendary'),
  ('Point Collector', 'Earn 500 points', 'Star', 'rare'),
  ('HTML Hero', 'Master HTML fundamentals', 'Code', 'common'),
  ('CSS Champion', 'Excel in CSS styling', 'Palette', 'common'),
  ('JavaScript Ninja', 'Master JavaScript programming', 'Zap', 'rare'),
  ('Design Thinking Pro', 'Complete design thinking challenges', 'Lightbulb', 'rare'),
  ('Prototype Master', 'Create interactive prototypes', 'Smartphone', 'epic'),
  ('Data Wizard', 'Excel in data processing tasks', 'Database', 'rare'),
  ('SEO Strategist', 'Master search engine optimization', 'Search', 'rare'),
  ('Email Expert', 'Excel in email marketing', 'Mail', 'common'),
  ('Content Planner', 'Master content planning and strategy', 'Calendar', 'common'),
  ('Excel Expert', 'Master Excel functions and formulas', 'FileSpreadsheet', 'common'),
  ('Data Cleaner', 'Excel in data cleaning and organization', 'Filter', 'rare'),
  ('Full-Stack Hero', 'Complete full-stack development challenges', 'Layers', 'legendary')
ON CONFLICT (name) DO NOTHING;