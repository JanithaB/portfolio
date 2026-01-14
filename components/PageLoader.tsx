'use client';

import { useEffect, useState } from 'react';
import FullPageLoader from './FullPageLoader';

interface PageLoaderProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function PageLoader({ children, isLoading }: PageLoaderProps) {
  return (
    <>
      {isLoading && <FullPageLoader />}
      <div style={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
        {children}
      </div>
    </>
  );
}
