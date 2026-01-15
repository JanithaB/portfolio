'use client';

import React, { useEffect, useState, useMemo } from 'react';
import FullPageLoader from './FullPageLoader';

interface BlogListingWrapperProps {
  children: React.ReactNode;
  postSlugs: string[];
}

export default function BlogListingWrapper({ children, postSlugs }: BlogListingWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedViews, setLoadedViews] = useState<Set<string>>(new Set());

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

    // Wait for all view counts to load
    if (postSlugs.length === 0) {
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

    // If all view counts are loaded, hide loader after 200ms delay
    if (loadedViews.size >= postSlugs.length) {
      transitionTimer = setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, 200);
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
  }, [loadedViews.size, postSlugs.length]);

  // Memoize child cloning to prevent recreation on every render
  const enhancedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // Recursively find BlogViewDisplay
        const findAndEnhance = (node: React.ReactNode): React.ReactNode => {
          if (React.isValidElement(node)) {
            const nodeType = node.type as React.ComponentType<{ slug?: string }> | string;
            const nodeProps = node.props as { slug?: string; children?: React.ReactNode };
            if (typeof nodeType === 'function' && nodeType.name === 'BlogViewDisplay' && nodeProps?.slug) {
              const slug = nodeProps.slug;
              return React.cloneElement(node as React.ReactElement<{ slug?: string; onLoad?: () => void }>, {
                onLoad: () => {
                  setLoadedViews((prev) => {
                    const newSet = new Set(prev);
                    newSet.add(slug);
                    return newSet;
                  });
                },
              });
            }
            if (nodeProps?.children) {
              return React.cloneElement(node as React.ReactElement<{ children?: React.ReactNode }>, {
                children: React.Children.map(nodeProps.children, findAndEnhance),
              });
            }
          }
          return node;
        };

        return findAndEnhance(child);
      }
      return child;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]); // Only recalculate when children changes - setLoadedViews callback is stable

  return (
    <div className="relative">
      <div 
        className={isLoading ? 'opacity-30 pointer-events-none' : 'opacity-100'}
        style={{ 
          transition: 'opacity 0.3s ease',
          willChange: 'opacity'
        }}
      >
        {enhancedChildren || children}
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
