'use client';

import { useEffect, useState } from 'react';
import Loader from './Loader';

interface BlogViewDisplayProps {
  slug: string;
  onLoad?: () => void;
}

export default function BlogViewDisplay({ slug, onLoad }: BlogViewDisplayProps) {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Only fetch view count, don't increment
    const fetchViewCount = async () => {
      try {
        const response = await fetch(`/api/blog/views?postId=${encodeURIComponent(slug)}`); // Now using postId
        if (!isMounted) return;
        
        if (response.ok) {
          const data = await response.json();
          setViewCount(data.view_count || 0);
        } else {
          setViewCount(0);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Failed to fetch view count:', error);
        setViewCount(0);
      } finally {
        if (isMounted) {
          onLoad?.();
        }
      }
    };

    fetchViewCount();
    
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]); // Removed onLoad from dependencies to prevent unnecessary re-renders

  if (viewCount === null) {
    return (
      <span className="inline-flex items-center">
        <Loader />
      </span>
    );
  }

  return (
    <span>
      {viewCount} {viewCount === 1 ? 'view' : 'views'}
    </span>
  );
}
