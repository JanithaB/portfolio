'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlogPost() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    publishedDate: new Date().toISOString().split('T')[0],
    isPublished: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        const data = await response.json();
        setAuthError(data.error || 'Invalid password');
      }
    } catch {
      setAuthError('Authentication failed. Please try again.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploadingImage(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      const base64 = await base64Promise;

      // Upload to server
      const response = await fetch('/api/blog/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          image: base64,
          filename: file.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const url = await uploadImage(file);
          if (url) {
            // Insert markdown image syntax at cursor position
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = formData.content;
            const before = text.substring(0, start);
            const after = text.substring(end);
            const imageMarkdown = `![image](${url})`;
            
            setFormData((prev) => ({
              ...prev,
              content: before + imageMarkdown + after,
            }));

            // Set cursor position after inserted image
            setTimeout(() => {
              textarea.selectionStart = textarea.selectionEnd = start + imageMarkdown.length;
              textarea.focus();
            }, 0);
          }
        }
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      // Insert at end of content
      const imageMarkdown = `\n![image](${url})\n`;
      setFormData((prev) => ({
        ...prev,
        content: prev.content + imageMarkdown,
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isPublished: publish,
          password, // Send password for server-side verification
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      setSubmitMessage(
        publish
          ? `Post published successfully! Redirecting...`
          : 'Post saved as draft!'
      );

      if (publish && data.post && data.post.id) {
        setTimeout(() => {
          router.push(`/blog/${data.post.id}`);
        }, 1500);
      } else {
        // Reset form after saving draft
        setTimeout(() => {
          setSubmitMessage('');
          if (!publish) {
            // Clear form for next post
            setFormData({
              title: '',
              description: '',
              content: '',
              publishedDate: new Date().toISOString().split('T')[0],
              isPublished: false,
            });
          }
        }, 3000);
      }
    } catch (error) {
      setSubmitMessage(
        error instanceof Error ? error.message : 'Error creating post'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Access</h1>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create New Blog Post</h1>
          <button
            onClick={() => router.push('/blog')}
            className="text-gray-400 hover:text-white"
          >
            ← Back to Blog
          </button>
        </div>

        <form className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="My Awesome Blog Post"
              required
            />
          </div>


          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A brief description of your post..."
              rows={2}
              required
            />
          </div>

          {/* Published Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Published Date
            </label>
            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleInputChange}
              className="px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-4">
                <label className="block text-sm font-medium">
                  Content (Markdown)
                </label>
                <label className="text-xs text-gray-400 cursor-pointer hover:text-blue-400">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  📎 Upload Image
                </label>
                {uploadingImage && (
                  <span className="text-xs text-blue-400">Uploading...</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              💡 Tip: Paste images directly (Ctrl+V) to upload them
            </p>
            {!previewMode ? (
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                onPaste={handlePaste}
                className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="# Your markdown content here...

You can paste images directly (Ctrl+V) and they'll be uploaded automatically!"
                rows={20}
                required
              />
            ) : (
              <div className="w-full px-4 py-2 bg-gray-900 rounded-lg min-h-[500px] prose prose-invert max-w-none">
                <div className="text-gray-400 text-sm mb-4">
                  Preview (actual rendering will use your blog styles)
                </div>
                <pre className="whitespace-pre-wrap text-sm">
                  {formData.content}
                </pre>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              disabled={isSubmitting}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>

          {submitMessage && (
            <div
              className={`text-center py-3 px-4 rounded-lg ${
                submitMessage.includes('Error') || submitMessage.includes('Failed')
                  ? 'bg-red-900/50 text-red-200'
                  : 'bg-green-900/50 text-green-200'
              }`}
            >
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
