'use client';

import { useEffect, useState } from 'react';

interface BlogViewCounterProps {
  slug: string;
}

export default function BlogViewCounter({ slug }: BlogViewCounterProps) {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch current view count
    const fetchViewCount = async () => {
      try {
        const response = await fetch(`/api/blog/views?slug=${encodeURIComponent(slug)}`);
        if (response.ok) {
          const data = await response.json();
          setViewCount(data.view_count || 0);
        }
      } catch (error) {
        console.error('Failed to fetch view count:', error);
      }
    };

    // Increment view count
    const incrementViewCount = async () => {
      try {
        const response = await fetch('/api/blog/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          setViewCount(data.view_count);
        }
      } catch (error) {
        console.error('Failed to increment view count:', error);
        // Still try to fetch the count
        fetchViewCount();
      }
    };

    // Increment on mount, then fetch to get updated count
    incrementViewCount();
  }, [slug]);

  if (viewCount === null) {
    return null; // Don't show anything while loading
  }

  return (
    <span>
      {viewCount} {viewCount === 1 ? 'view' : 'views'}
    </span>
  );
}
