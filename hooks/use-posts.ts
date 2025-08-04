import { useContext, useCallback, useRef, useEffect } from 'react';

import PostsContext from '@/context/posts';

export interface UsePostsOptions {
  limit?: number;
  filters?: any[];
  enableInfiniteScroll?: boolean;
}

export default function usePosts(options: UsePostsOptions = {}) {
  const context = useContext(PostsContext);
  if (typeof context === 'undefined') {
    throw new Error('usePosts must be used within a PostsProvider');
  }

  const { limit = 10, filters = [], enableInfiniteScroll = false } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (context.hasMore && !context.loadingMore) {
      context.loadMore();
    }
  }, [context.hasMore, context.loadingMore, context.loadMore]);

  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [target] = entries;
        if (target.isIntersecting && context.hasMore && !context.loadingMore) {
          loadMore();
        }
      },
      {
        rootMargin: '200px', // Increased margin for earlier loading
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enableInfiniteScroll, context.hasMore, context.loadingMore, loadMore]);

  // Re-observe when loadingRef changes
  useEffect(() => {
    if (observerRef.current && loadingRef.current && enableInfiniteScroll) {
      observerRef.current.observe(loadingRef.current);
    }
  }, [enableInfiniteScroll, context.hasMore]);

  return {
    ...context,
    loadingRef,
  };
}