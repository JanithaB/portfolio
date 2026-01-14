'use client';

import { useEffect, useState } from 'react';
import FullPageLoader from './FullPageLoader';

interface BlogPageLoaderProps {
  children: React.ReactNode;
  slugs: string[];
}

export default function BlogPageLoader({ children, slugs }: BlogPageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fallback: Hide loader when DOM is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Track when all components are loaded
    const checkAllLoaded = () => {
      // Wait a bit for all components to initialize
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Small delay to ensure smooth transition

      return () => clearTimeout(timer);
    };

    // If no slugs, page is ready immediately
    if (slugs.length === 0) {
      setIsLoading(false);
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }

    checkAllLoaded();

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [slugs.length]);

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div style={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
        {children}
      </div>
    </>
  );
}
