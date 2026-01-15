'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import Loader from './Loader';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  replies?: Comment[];
}

interface BlogCommentsProps {
  slug: string;
}

interface ReplyFormProps {
  commentId: string;
  onSubmit: (authorName: string | undefined, content: string, parentId: string) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

// Separate ReplyForm component with its own state
const ReplyForm = ({ commentId, onSubmit, onCancel, isSubmitting }: ReplyFormProps) => {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the name input when form opens
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Please enter a reply');
      return;
    }

    try {
      await onSubmit(authorName.trim() || undefined, content, commentId);
      setAuthorName('');
      setContent('');
    } catch {
      setError('Failed to submit reply. Please try again.');
    }
  };

  const handleCancel = () => {
    setAuthorName('');
    setContent('');
    setError('');
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 pt-4 border-t border-slate-700 space-y-3"
    >
      {error && (
        <div className="p-2 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-xs">
          {error}
        </div>
      )}
      <div>
        <input
          ref={nameInputRef}
          type="text"
          value={authorName}
          onChange={(e) => {
            setAuthorName(e.target.value);
            setError('');
          }}
          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent text-sm"
          placeholder="Your name (optional)"
          autoComplete="off"
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setError('');
          }}
          rows={3}
          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent resize-y text-sm"
          placeholder="Write a reply..."
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Reply'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default function BlogComments({ slug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replyingToParentId, setReplyingToParentId] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize organizeComments to prevent recreation on every render
  // Define it before fetchComments since fetchComments depends on it
  const organizeComments = useCallback((allComments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    // First pass: create map of all comments
    allComments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: organize into tree
    allComments.forEach((comment) => {
      const commentWithReplies = commentMap.get(comment.id)!;
      if (comment.parent_id) {
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.replies = parent.replies || [];
          parent.replies.push(commentWithReplies);
        } else {
          // Orphaned comment (parent doesn't exist) - treat as root comment
          rootComments.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    // Sort root comments by created_at
    rootComments.sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // Sort replies by created_at recursively
    const sortReplies = (comments: Comment[]): void => {
      comments.forEach((comment) => {
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.sort((a, b) => 
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
          sortReplies(comment.replies);
        }
      });
    };

    sortReplies(rootComments);
    return rootComments;
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/blog/comments?slug=${encodeURIComponent(slug)}`);
      if (response.ok) {
        const data = await response.json();
        // Organize comments into a tree structure
        const organizedComments = organizeComments(data.comments || []);
        setComments(organizedComments);
        // Clear the loading state for reply after comments are fetched
        setReplyingToParentId(null);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [slug, organizeComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Cleanup success timer on unmount
  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!content.trim()) {
      setError('Please enter a comment');
      return;
    }

    setIsSubmittingComment(true);
    try {
      const response = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          author_name: authorName.trim() || undefined,
          content,
        }),
      });

      if (response.ok) {
        await fetchComments(); // Refresh comments to get the tree structure
        setAuthorName('');
        setContent('');
        setSuccess(true);
        // Clear any existing timer
        if (successTimerRef.current) {
          clearTimeout(successTimerRef.current);
        }
        successTimerRef.current = setTimeout(() => {
          setSuccess(false);
          successTimerRef.current = null;
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit comment');
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };


  // Memoize formatDate to prevent recreation on every render
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return '1d';
    } else if (diffInDays < 7) {
      return `${diffInDays}d`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks}w`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  }, []);

  // Memoize getInitials to prevent recreation on every render
  const getInitials = useCallback((name: string) => {
    if (!name || name.trim().length === 0) {
      return '??';
    }
    const initials = name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .filter((char) => char && /[a-zA-Z]/.test(char))
      .join('')
      .toUpperCase()
      .slice(0, 2);
    return initials || '??';
  }, []);

  // Memoize getTotalCommentCount to prevent recalculation on every render
  const getTotalCommentCount = useCallback((comments: Comment[]): number => {
    let count = comments.length;
    comments.forEach((comment) => {
      if (comment.replies && comment.replies.length > 0) {
        count += getTotalCommentCount(comment.replies);
      }
    });
    return count;
  }, []);

  // Memoize total comment count calculation
  const totalCommentCount = useMemo(() => getTotalCommentCount(comments), [comments, getTotalCommentCount]);

  const handleReplyToggle = useCallback((commentId: string, isCurrentlyReplying: boolean) => {
    if (isCurrentlyReplying) {
      setReplyingTo(null);
    } else {
      // Close any other open reply forms
      setReplyingTo(commentId);
    }
  }, []);

  const handleReplySubmit = useCallback(async (replyAuthorName: string | undefined, replyContent: string, parentId: string) => {
    setIsSubmittingReply(true);
    setReplyingToParentId(parentId); // Track which comment is getting a reply
    // Close the reply form immediately to prevent visual glitch
    setReplyingTo(null);
    try {
      const response = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          author_name: replyAuthorName || undefined,
          content: replyContent,
          parent_id: parentId,
        }),
      });

      if (response.ok) {
        // Small delay to ensure smooth transition
        await new Promise<void>(resolve => {
          setTimeout(() => resolve(), 100);
        });
        await fetchComments(); // Refresh comments - this will clear replyingToParentId
        // Don't show success message for replies
      } else {
        const data = await response.json();
        setReplyingToParentId(null); // Clear on error
        throw new Error(data.error || 'Failed to submit reply');
      }
    } catch (error) {
      console.error('Failed to submit reply:', error);
      setReplyingToParentId(null); // Clear on error
      throw error;
    } finally {
      setIsSubmittingReply(false);
    }
  }, [slug, fetchComments]);

  const CommentItem = ({ comment, depth = 0, hasSiblingBelow = false }: { comment: Comment; depth?: number; hasSiblingBelow?: boolean }) => {
    const isReplying = replyingTo === comment.id;
    const maxDepth = 3; // Limit nesting depth
    const hasReplies = comment.replies && comment.replies.length > 0;

    return (
      <div className={`flex gap-3 ${depth > 0 ? 'mt-4' : ''}`}>
        {/* Avatar and connecting line */}
        <div className="flex flex-col items-center relative">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 z-10">
            {getInitials(comment.author_name)}
          </div>
          
          {/* L-shaped connecting line for replies */}
          {depth > 0 && (
            <>
              {/* Horizontal line */}
              <div className="absolute left-0 top-5 w-3 h-0.5 bg-slate-600" />
              {/* Vertical line */}
              <div className="w-0.5 bg-slate-600 mt-2 flex-1 min-h-[20px]" />
            </>
          )}
          
          {/* Vertical line if there are replies or siblings below */}
          {(hasReplies || hasSiblingBelow) && depth === 0 && (
            <div className="w-0.5 bg-slate-600 mt-2 flex-1 min-h-[20px]" />
          )}
        </div>

        {/* Comment content */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-4">
            {/* Author name */}
            <div className="mb-2">
              <h3 className="font-semibold text-slate-100 text-sm">
                {comment.author_name}
              </h3>
            </div>
            
            {/* Comment content */}
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap mb-3">
              {comment.content}
            </p>
            
            {/* Actions and timestamp */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              {depth < maxDepth ? (
                <button
                  type="button"
                  onClick={() => handleReplyToggle(comment.id, isReplying)}
                  className="hover:text-teal-300 transition-colors"
                >
                  {isReplying ? 'Cancel Reply' : 'Reply'}
                </button>
              ) : (
                <span className="text-slate-500 text-xs">Max depth reached</span>
              )}
              <time>{formatDate(comment.created_at)}</time>
            </div>

            {/* Reply form */}
            {isReplying && (
              <ReplyForm
                commentId={comment.id}
                onSubmit={handleReplySubmit}
                onCancel={() => setReplyingTo(null)}
                isSubmitting={isSubmittingReply}
              />
            )}
          </div>

          {/* Render replies */}
          {(hasReplies || replyingToParentId === comment.id) && (
            <div className="mt-4 space-y-4">
              {comment.replies && comment.replies.map((reply, index) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  hasSiblingBelow={index < comment.replies!.length - 1}
                />
              ))}
              {replyingToParentId === comment.id && (
                <div className="flex gap-3 mt-4">
                  <div className="flex flex-col items-center relative">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 z-10">
                      <span className="text-slate-400 text-xs">...</span>
                    </div>
                    <div className="w-0.5 bg-slate-600 mt-2 flex-1 min-h-[20px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-4 flex items-center justify-center min-h-[60px]">
                      <Loader />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-slate-700">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6 sm:mb-8">
        Comments ({totalCommentCount})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 sm:mb-12 space-y-4">
        <div>
          <label htmlFor="author_name" className="block text-sm font-medium text-slate-300 mb-2">
            Name <span className="text-slate-500 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            id="author_name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent"
            placeholder="Your name (optional)"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
            Comment *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent resize-y"
            placeholder="Share your thoughts..."
            required
          />
        </div>
        {error && (
          <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmittingComment}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmittingComment ? 'Submitting...' : 'Submit Comment'}
          </button>
          {success && !replyingTo && (
            <div className="p-3 bg-teal-900/30 border border-teal-700 rounded-lg text-teal-300 text-sm">
              Comment submitted successfully!
            </div>
          )}
        </div>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="text-slate-400 text-center py-8">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-slate-400 text-center py-8">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              hasSiblingBelow={index < comments.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
