-- Create subscribers table for email subscriptions
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Enable Row Level Security (optional, adjust as needed)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role to manage subscribers
-- Drop policy if it exists, then create it
DROP POLICY IF EXISTS "Service role can manage subscribers" ON subscribers;
CREATE POLICY "Service role can manage subscribers"
  ON subscribers
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Add unsubscribe_token column to subscribers table
ALTER TABLE subscribers 
ADD COLUMN IF NOT EXISTS unsubscribe_token UUID DEFAULT gen_random_uuid();

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_unsubscribe_token 
ON subscribers(unsubscribe_token);

-- Create blog_posts table for storing blog post content
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  published_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on id for faster lookups (already primary key, but explicit)
CREATE INDEX IF NOT EXISTS idx_blog_posts_id ON blog_posts(id);

-- Create index on published_date for sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date ON blog_posts(published_date DESC);

-- Create index on is_published for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access to published posts
DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
CREATE POLICY "Public can read published blog posts"
  ON blog_posts
  FOR SELECT
  USING (is_published = true);

-- Policy to allow service role to manage all posts
DROP POLICY IF EXISTS "Service role can manage blog posts" ON blog_posts;
CREATE POLICY "Service role can manage blog posts"
  ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create blog_post_metrics table for tracking views, likes, and dislikes
CREATE TABLE IF NOT EXISTS blog_post_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL UNIQUE REFERENCES blog_posts(id) ON DELETE CASCADE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  dislike_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on post_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_post_metrics_post_id ON blog_post_metrics(post_id);

-- Enable Row Level Security
ALTER TABLE blog_post_metrics ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access to metrics
DROP POLICY IF EXISTS "Public can read blog post metrics" ON blog_post_metrics;
CREATE POLICY "Public can read blog post metrics"
  ON blog_post_metrics
  FOR SELECT
  USING (true);

-- Policy to allow public insert for metrics (for first view/reaction)
DROP POLICY IF EXISTS "Public can insert blog post metrics" ON blog_post_metrics;
CREATE POLICY "Public can insert blog post metrics"
  ON blog_post_metrics
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow public update for metrics (for incrementing views and reactions)
DROP POLICY IF EXISTS "Public can update blog post metrics" ON blog_post_metrics;
CREATE POLICY "Public can update blog post metrics"
  ON blog_post_metrics
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy to allow service role to manage all metrics (admin operations)
DROP POLICY IF EXISTS "Service role can manage blog post metrics" ON blog_post_metrics;
CREATE POLICY "Service role can manage blog post metrics"
  ON blog_post_metrics
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create blog_comments table for storing comments on blog posts
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on post_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON blog_comments(created_at DESC);

-- Create index on parent_id for faster lookups of replies
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent_id ON blog_comments(parent_id);

-- Enable Row Level Security
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role to manage comments
DROP POLICY IF EXISTS "Service role can manage blog comments" ON blog_comments;
CREATE POLICY "Service role can manage blog comments"
  ON blog_comments
  FOR ALL
  USING (true)
  WITH CHECK (true);
