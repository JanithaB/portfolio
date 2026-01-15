'use client';

import { useEffect, useState } from 'react';
import FullPageLoader from './FullPageLoader';

interface BlogPostLoaderProps {
  children: React.ReactNode | ((props: { onReactionsLoad: () => void }) => React.ReactNode);
}

export default function BlogPostLoader({ children }: BlogPostLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState({
    reactions: false,
  });

  useEffect(() => {
    let isMounted = true;
    let loadTimer: NodeJS.Timeout | null = null;
    let transitionTimer: NodeJS.Timeout | null = null;
    
    // Fallback: Hide loader when DOM is fully loaded
    const handleLoad = () => {
      if (!isMounted) return;
      loadTimer = setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, 300);
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Check if all components are loaded
    if (componentsLoaded.reactions) {
      // Small delay for smooth transition
      transitionTimer = setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, 300);
    }

    return () => {
      isMounted = false;
      if (loadTimer) {
        clearTimeout(loadTimer);
      }
      if (transitionTimer) {
        clearTimeout(transitionTimer);
      }
      window.removeEventListener('load', handleLoad);
    };
  }, [componentsLoaded]);

  const handleReactionsLoad = () => {
    setComponentsLoaded((prev) => ({ ...prev, reactions: true }));
  };

  return (
    <div className="relative">
      <div 
        className={isLoading ? 'opacity-30 pointer-events-none' : 'opacity-100'}
        style={{ 
          transition: 'opacity 0.3s ease',
          willChange: 'opacity'
        }}
      >
        {typeof children === 'function'
          ? children({ onReactionsLoad: handleReactionsLoad })
          : children}
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
