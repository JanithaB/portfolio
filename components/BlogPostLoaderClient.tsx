'use client';

import React, { useEffect, useState, useMemo } from 'react';
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

    // Wait for reactions to load
    if (reactionsLoaded) {
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
  }, [reactionsLoaded]);

  // Memoize child cloning to prevent recreation on every render
  const childrenWithCallbacks = useMemo(() => {
    return typeof children === 'object' && children !== null
      ? React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Find BlogReactions component and inject onLoad prop
            const childProps = child.props as { slug?: string };
            if (child.type === BlogReactions || childProps?.slug === slug) {
              return React.cloneElement(child as React.ReactElement<{ onLoad?: () => void }>, {
                onLoad: () => setReactionsLoaded(true),
              });
            }
          }
          return child;
        })
      : children;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, slug]); // Only recalculate when children or slug changes - setReactionsLoaded callback is stable

  return (
    <div className="relative">
      <div 
        className={isLoading ? 'opacity-30 pointer-events-none' : 'opacity-100'}
        style={{ 
          transition: 'opacity 0.3s ease',
          willChange: 'opacity'
        }}
      >
        {childrenWithCallbacks}
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
