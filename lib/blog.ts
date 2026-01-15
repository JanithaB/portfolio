import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
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

export function getAllPosts(): BlogPost[] {
  // Return cached data if valid
  if (postsCache && isCacheValid(postsCacheTime)) {
    return postsCache;
  }

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        readingTime: readingTime(content).text,
        content,
      };
    });

  const sortedPosts = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  // Update cache
  postsCache = sortedPosts;
  postsCacheTime = Date.now();

  return sortedPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Try to get from cache first
  if (postsCache && isCacheValid(postsCacheTime)) {
    const cachedPost = postsCache.find((post) => post.slug === slug);
    if (cachedPost) {
      return cachedPost;
    }
  }

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const post = {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      readingTime: readingTime(content).text,
      content,
    };

    // Update cache if it exists
    if (postsCache) {
      const index = postsCache.findIndex((p) => p.slug === slug);
      if (index >= 0) {
        postsCache[index] = post;
      } else {
        postsCache.push(post);
        postsCache.sort((a, b) => (a.date < b.date ? 1 : -1));
      }
    }

    return post;
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  // Return cached data if valid
  if (slugsCache && isCacheValid(slugsCacheTime)) {
    return slugsCache;
  }

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const slugs = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));

  // Update cache
  slugsCache = slugs;
  slugsCacheTime = Date.now();

  return slugs;
}
