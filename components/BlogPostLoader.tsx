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
    // Fallback: Hide loader when DOM is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
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
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('load', handleLoad);
      };
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [componentsLoaded]);

  const handleReactionsLoad = () => {
    setComponentsLoaded((prev) => ({ ...prev, reactions: true }));
  };

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div style={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
        {typeof children === 'function'
          ? children({ onReactionsLoad: handleReactionsLoad })
          : children}
      </div>
    </>
  );
}
