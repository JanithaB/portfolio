'use client';

import { useEffect } from 'react';

interface BlogViewIncrementerProps {
  slug: string; // slug prop name kept for compatibility, but contains post UUID
}

export default function BlogViewIncrementer({ slug }: BlogViewIncrementerProps) {
  useEffect(() => {
    // Increment view count silently (no display)
    const incrementViewCount = async () => {
      try {
        await fetch('/api/blog/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId: slug }), // Now sending as postId
        });
      } catch (error) {
        console.error('Failed to increment view count:', error);
      }
    };

    incrementViewCount();
  }, [slug]);

  // Return nothing - this component is invisible
  return null;
}
