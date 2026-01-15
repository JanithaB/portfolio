'use client';

import React, { useEffect, useState, useMemo } from 'react';
import FullPageLoader from './FullPageLoader';
import BlogReactions from './BlogReactions';

interface BlogPostWrapperProps {
  children: React.ReactNode;
  slug: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BlogPostWrapper({ children, slug: _slug }: BlogPostWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [reactionsLoaded, setReactionsLoaded] = useState(false);

  // Fallback timeout to prevent getting stuck (max 2.5 seconds)
  useEffect(() => {
    if (reactionsLoaded) return; // Don't set fallback if already loaded
    
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [reactionsLoaded]);

  // Wait for reactions to be loaded
  useEffect(() => {
    if (reactionsLoaded) {
      // Hide loader immediately when reactions are loaded
      setIsLoading(false);
    }
  }, [reactionsLoaded]);

  // Memoize child cloning to prevent recreation on every render
  const enhancedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // Recursively find BlogReactions
        const findAndEnhance = (node: React.ReactNode): React.ReactNode => {
          if (React.isValidElement(node)) {
            const nodeType = node.type;
            const nodeProps = node.props as { slug?: string; children?: React.ReactNode };
            
            // Check if this is BlogReactions component by comparing the component reference
            if (nodeType === BlogReactions) {
              return React.cloneElement(node as React.ReactElement<{ slug?: string; onLoad?: () => void }>, {
                onLoad: () => {
                  setReactionsLoaded(true);
                },
              });
            }
            
            // Recursively search in children
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
  }, [children]); // Only recalculate when children changes - setReactionsLoaded callback is stable

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
