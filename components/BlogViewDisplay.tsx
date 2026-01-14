'use client';

import { useEffect, useState } from 'react';

interface BlogViewDisplayProps {
  slug: string;
  onLoad?: () => void;
}

export default function BlogViewDisplay({ slug, onLoad }: BlogViewDisplayProps) {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    // Only fetch view count, don't increment
    const fetchViewCount = async () => {
      try {
        const response = await fetch(`/api/blog/views?slug=${encodeURIComponent(slug)}`);
        if (response.ok) {
          const data = await response.json();
          setViewCount(data.view_count || 0);
        } else {
          setViewCount(0);
        }
      } catch (error) {
        console.error('Failed to fetch view count:', error);
        setViewCount(0);
      } finally {
        onLoad?.();
      }
    };

    fetchViewCount();
  }, [slug, onLoad]);

  if (viewCount === null) {
    return null;
  }

  return (
    <span>
      {viewCount} {viewCount === 1 ? 'view' : 'views'}
    </span>
  );
}
