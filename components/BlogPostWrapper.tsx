'use client';

import React, { useEffect, useState } from 'react';
import FullPageLoader from './FullPageLoader';
import BlogReactions from './BlogReactions';

interface BlogPostWrapperProps {
  children: React.ReactNode;
  slug: string;
}

export default function BlogPostWrapper({ children, slug }: BlogPostWrapperProps) {
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

    // Wait for reactions component to load
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

  // Clone children to inject onLoad callback into BlogReactions
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Recursively find BlogReactions
      const findAndEnhance = (node: React.ReactNode): React.ReactNode => {
        if (React.isValidElement(node)) {
          if (node.type === BlogReactions || (node as any).type?.name === 'BlogReactions') {
            return React.cloneElement(node as React.ReactElement<any>, {
              onLoad: () => setReactionsLoaded(true),
            });
          }
          if (node.props?.children) {
            return React.cloneElement(node as React.ReactElement<any>, {
              children: React.Children.map(node.props.children, findAndEnhance),
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
