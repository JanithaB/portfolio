import readingTime from 'reading-time';
import { supabase } from './supabase';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  readingTime: string;
  content: string;
}

// Cache for posts data
let postsCache: BlogPost[] | null = null;
let slugsCache: string[] | null = null;
let postsCacheTime: number = 0;
let slugsCacheTime: number = 0;
const CACHE_DURATION = 60000; // 1 minute cache (adjust as needed)

// Check if cache is still valid
function isCacheValid(cacheTime: number): boolean {
  return Date.now() - cacheTime < CACHE_DURATION;
}

// Clear cache (useful for development or when posts are updated)
export function clearPostsCache(): void {
  postsCache = null;
  slugsCache = null;
  postsCacheTime = 0;
  slugsCacheTime = 0;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Return cached data if valid
  if (postsCache && isCacheValid(postsCacheTime)) {
    return postsCache;
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, description, content, published_date')
      .eq('is_published', true)
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    const posts: BlogPost[] = (data || []).map((post) => ({
      id: post.id,
      title: post.title,
      date: post.published_date.split('T')[0], // Format as YYYY-MM-DD
      description: post.description,
      readingTime: readingTime(post.content).text,
      content: post.content,
    }));

    // Update cache
    postsCache = posts;
    postsCacheTime = Date.now();

    return posts;
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  // Try to get from cache first
  if (postsCache && isCacheValid(postsCacheTime)) {
    const cachedPost = postsCache.find((post) => post.id === id);
    if (cachedPost) {
      return cachedPost;
    }
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, description, content, published_date')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error || !data) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    const post: BlogPost = {
      id: data.id,
      title: data.title,
      date: data.published_date.split('T')[0], // Format as YYYY-MM-DD
      description: data.description,
      readingTime: readingTime(data.content).text,
      content: data.content,
    };

    // Update cache if it exists
    if (postsCache) {
      const index = postsCache.findIndex((p) => p.id === id);
      if (index >= 0) {
        postsCache[index] = post;
      } else {
        postsCache.push(post);
        postsCache.sort((a, b) => (a.date < b.date ? 1 : -1));
      }
    }

    return post;
  } catch (error) {
    console.error('Error in getPostById:', error);
    return null;
  }
}

export async function getAllIds(): Promise<string[]> {
  // Return cached data if valid
  if (slugsCache && isCacheValid(slugsCacheTime)) {
    return slugsCache;
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching blog post IDs:', error);
      return [];
    }

    const ids = (data || []).map((post) => post.id);

    // Update cache
    slugsCache = ids;
    slugsCacheTime = Date.now();

    return ids;
  } catch (error) {
    console.error('Error in getAllIds:', error);
    return [];
  }
}
