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

-- Create blog_post_metrics table for tracking views, likes, and dislikes
-- Blog post content is stored in MD files in content/blog directory
CREATE TABLE IF NOT EXISTS blog_post_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  dislike_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_post_metrics_slug ON blog_post_metrics(slug);

-- Enable Row Level Security
ALTER TABLE blog_post_metrics ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role to manage metrics
DROP POLICY IF EXISTS "Service role can manage blog post metrics" ON blog_post_metrics;
CREATE POLICY "Service role can manage blog post metrics"
  ON blog_post_metrics
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create blog_comments table for storing comments on blog posts
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_comments_slug ON blog_comments(slug);

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
