'use client';

import React, { useState } from 'react';

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div id="subscribe-form" className="border border-slate-700 rounded-lg p-3 sm:p-4 bg-slate-800/50 max-w-md mx-auto">
      <h3 className="text-sm font-bold text-slate-100 mb-1">Subscribe to Updates</h3>
      <p className="text-slate-400 text-xs mb-3">
        Get notified when new blog posts are published.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading'}
          className="flex-1 px-3 py-2.5 sm:py-1.5 text-sm bg-slate-900 border border-slate-700 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-300 disabled:opacity-50 touch-manipulation"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2.5 sm:py-1.5 text-sm bg-teal-300 text-slate-900 font-medium rounded hover:bg-teal-200 active:bg-teal-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap touch-manipulation"
        >
          {status === 'loading' ? '...' : 'Subscribe()'}
        </button>
      </form>
      <p className="mt-2 text-xs text-slate-500 text-center">
        No spam. Just learning.
      </p>
      {message && (
        <p
          className={`mt-2 text-xs ${
            status === 'success' ? 'text-teal-300' : 'text-red-400'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SubscribeForm;
