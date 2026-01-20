'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  published_date: string;
  is_published: boolean;
  created_at: string;
}

export default function BlogAdmin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/blog/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setAuthError('Invalid password');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setIsAuthenticated(true);
      setPosts(data.posts);
      setAuthError('');
    } catch {
      setAuthError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch('/api/blog/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert('Failed to delete post');
      }
    } catch {
      alert('Error deleting post');
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/blog/toggle-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isPublished: !currentStatus, password }),
      });

      if (response.ok) {
        // Update the local state immediately
        setPosts(
          posts.map((post) =>
            post.id === id ? { ...post, is_published: !currentStatus } : post
          )
        );
        
        // Optionally, refetch the posts to ensure consistency
        const refetchResponse = await fetch('/api/blog/list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        
        if (refetchResponse.ok) {
          const data = await refetchResponse.json();
          setPosts(data.posts);
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to toggle publish status: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Toggle publish error:', error);
      alert('Error toggling publish status');
    }
  };

  const handleSendNewsletter = async (id: string, title: string) => {
    if (!confirm(`Send "${title}" to all subscribers?`)) {
      return;
    }

    try {
      const response = await fetch('/api/blog/send-to-subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Newsletter sent to ${data.successful} subscribers!`);
      } else {
        alert(`Failed to send newsletter: ${data.error}`);
      }
    } catch {
      alert('Error sending newsletter');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Blog Admin</h1>
          <form onSubmit={handleAuth}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
            />
            {authError && (
              <p className="text-red-500 text-sm mb-4">{authError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Admin</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/blog/new"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              + New Post
            </Link>
            <button
              onClick={() => router.push('/blog')}
              className="text-gray-400 hover:text-white"
            >
              View Blog →
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl mb-4">No blog posts yet</p>
            <Link
              href="/admin/blog/new"
              className="text-blue-500 hover:text-blue-400"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold">{post.title}</h2>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          post.is_published
                            ? 'bg-green-900/50 text-green-300'
                            : 'bg-yellow-900/50 text-yellow-300'
                        }`}
                      >
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {post.description}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>ID: {post.id.substring(0, 8)}...</span>
                      <span>
                        Date: {new Date(post.published_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                      Edit
                    </Link>
                    {post.is_published && (
                      <button
                        onClick={() => handleSendNewsletter(post.id, post.title)}
                        className="px-4 py-2 bg-teal-900 hover:bg-teal-800 rounded-lg text-sm transition-colors"
                        title="Send to subscribers"
                      >
                        📧 Send
                      </button>
                    )}
                    <button
                      onClick={() =>
                        handleTogglePublish(post.id, post.is_published)
                      }
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-800 rounded-lg text-sm transition-colors"
                    >
                      {post.is_published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-4 py-2 bg-red-900 hover:bg-red-800 rounded-lg text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
