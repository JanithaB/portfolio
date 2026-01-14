'use client';

import { useEffect, useState } from 'react';
import styles from './BlogReactions.module.css';

interface BlogReactionsProps {
  slug: string;
  onLoad?: () => void;
}

export default function BlogReactions({ slug, onLoad }: BlogReactionsProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState<'like' | 'dislike' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch current reaction counts
    const fetchReactions = async () => {
      try {
        const response = await fetch(`/api/blog/reactions?slug=${encodeURIComponent(slug)}`);
        if (response.ok) {
          const data = await response.json();
          setLikes(data.likes || 0);
          setDislikes(data.dislikes || 0);
        }
      } catch (error) {
        console.error('Failed to fetch reactions:', error);
      } finally {
        setIsLoading(false);
        onLoad?.();
      }
    };

    fetchReactions();
  }, [slug, onLoad]);

  const handleReaction = async (reactionType: 'like' | 'dislike') => {
    if (isSubmitting || selectedReaction === reactionType) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/blog/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, reactionType }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setSelectedReaction(reactionType);
      }
    } catch (error) {
      console.error('Failed to submit reaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format number for display (up to 3 digits)
  const formatCount = (count: number) => {
    const str = count.toString().padStart(3, '0');
    return {
      first: parseInt(str[0] || '0'),
      second: parseInt(str[1] || '0'),
      third: parseInt(str[2] || '0'),
    };
  };

  const likeCount = formatCount(likes);
  const dislikeCount = formatCount(dislikes);
  const displayCount = selectedReaction === 'like' ? likeCount : selectedReaction === 'dislike' ? dislikeCount : likeCount;

  const getTransform = (digit: number) => {
    return `translateY(calc(${50 - digit * 10}% - 8px))`;
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className={`${styles.container} ${selectedReaction === 'like' ? styles.likeSelected : selectedReaction === 'dislike' ? styles.dislikeSelected : ''}`}>
      <label htmlFor={`dislike-${slug}`}>
        <input
          type="radio"
          name={`evaluation-${slug}`}
          id={`dislike-${slug}`}
          checked={selectedReaction === 'dislike'}
          onChange={() => handleReaction('dislike')}
          disabled={isSubmitting}
        />
        <svg
          className={`${styles.icon} ${styles.dislike}`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2.004 2.004 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638L11.531 20zM18 14V5h2l.001 9H18z"></path>
        </svg>
      </label>
      <div className={styles.count}>
        <div className={styles.number} style={{ transform: getTransform(displayCount.first) }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>
        <div className={styles.number} style={{ transform: getTransform(displayCount.second) }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>
        <div className={styles.number} style={{ transform: getTransform(displayCount.third) }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>
      </div>
      <label htmlFor={`like-${slug}`}>
        <input
          type="radio"
          name={`evaluation-${slug}`}
          id={`like-${slug}`}
          checked={selectedReaction === 'like'}
          onChange={() => handleReaction('like')}
          disabled={isSubmitting}
        />
        <svg
          className={`${styles.icon} ${styles.like}`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path>
        </svg>
      </label>
    </div>
  );
}
