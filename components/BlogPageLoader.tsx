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
    let isMounted = true;
    let loadTimer: NodeJS.Timeout | null = null;
    let checkTimer: NodeJS.Timeout | null = null;
    
    // Fallback: Hide loader when DOM is fully loaded
    const handleLoad = () => {
      if (!isMounted) return;
      loadTimer = setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, 500);
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // If no slugs, page is ready immediately
    if (slugs.length === 0) {
      if (isMounted) {
        setIsLoading(false);
      }
      return () => {
        isMounted = false;
        if (loadTimer) {
          clearTimeout(loadTimer);
        }
        window.removeEventListener('load', handleLoad);
      };
    }

    // Track when all components are loaded
    checkTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 500); // Small delay to ensure smooth transition

    return () => {
      isMounted = false;
      if (loadTimer) {
        clearTimeout(loadTimer);
      }
      if (checkTimer) {
        clearTimeout(checkTimer);
      }
      window.removeEventListener('load', handleLoad);
    };
  }, [slugs.length]);

  return (
    <div className="relative">
      <div 
        className={isLoading ? 'opacity-30 pointer-events-none' : 'opacity-100'}
        style={{ 
          transition: 'opacity 0.3s ease',
          willChange: 'opacity'
        }}
      >
        {children}
      </div>
      {isLoading && (
        <div 
          className="fixed inset-0 z-[9999]"
          style={{ 
            pointerEvents: 'auto',
            willChange: 'opacity'
          }}
        >
          <FullPageLoader />
        </div>
      )}
    </div>
  );
}
