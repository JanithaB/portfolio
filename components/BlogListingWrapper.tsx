'use client';

import React, { useEffect, useState } from 'react';
import FullPageLoader from './FullPageLoader';

interface BlogListingWrapperProps {
  children: React.ReactNode;
  postSlugs: string[];
}

export default function BlogListingWrapper({ children, postSlugs }: BlogListingWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedViews, setLoadedViews] = useState<Set<string>>(new Set());

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

    // Wait for all view counts to load
    if (postSlugs.length === 0) {
      setIsLoading(false);
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }

    // If all view counts are loaded, hide loader
    if (loadedViews.size >= postSlugs.length) {
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
  }, [loadedViews.size, postSlugs.length]);

  // Clone children to inject onLoad callback into BlogViewDisplay components
  const enhancedChildren = React.Children.map(children, (child) => {
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

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div style={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
        {enhancedChildren || children}
      </div>
    </>
  );
}
