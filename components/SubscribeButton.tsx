'use client';

import React from 'react';

const SubscribeButton: React.FC = () => {
  const handleClick = () => {
    const form = document.getElementById('subscribe-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-auto px-3 sm:px-4 py-2 sm:py-2 text-xs sm:text-sm font-medium bg-teal-300 text-slate-900 rounded hover:bg-teal-200 active:bg-teal-200 transition-colors touch-manipulation whitespace-nowrap flex-shrink-0"
    >
      <span className="sm:hidden">Get Updates</span>
      <span className="hidden sm:inline">Subscribe to the newsletter</span>
    </button>
  );
};

export default SubscribeButton;
