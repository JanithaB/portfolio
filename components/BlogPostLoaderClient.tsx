'use client';

import React, { useEffect, useState } from 'react';
import FullPageLoader from './FullPageLoader';
import BlogReactions from './BlogReactions';

interface BlogPostLoaderClientProps {
  children: React.ReactNode;
  slug: string;
}

export default function BlogPostLoaderClient({ children, slug }: BlogPostLoaderClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [reactionsLoaded, setReactionsLoaded] = useState(false);

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

    // Wait for reactions to load
    if (reactionsLoaded) {
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
  }, [reactionsLoaded]);

  // Clone children and pass onLoad callback to BlogReactions
  const childrenWithCallbacks = typeof children === 'object' && children !== null
    ? React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Find BlogReactions component and inject onLoad prop
          if (child.type === BlogReactions || (child as any).props?.slug === slug) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onLoad: () => setReactionsLoaded(true),
            });
          }
        }
        return child;
      })
    : children;

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div style={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
        {childrenWithCallbacks}
      </div>
    </>
  );
}
