import { useCallback, useEffect, useRef, useState } from 'react';
import type { PublicKey } from '@solana/web3.js';

import useWorkspace from '@/hooks/use-workspace';
import type { Post } from '@/lib/models';
import type { Workspace } from '@/lib/web3';
import { fetchPosts, authorFilter } from '@/lib/web3';

export interface UseProfilePostsOptions {
  limit?: number;
  enableInfiniteScroll?: boolean;
}

export default function useProfilePosts(
  authorPublicKey: PublicKey,
  options: UseProfilePostsOptions = {}
) {
  const { limit = 10, enableInfiniteScroll = false } = options;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const workspace = useWorkspace();

  const loadProfilePosts = useCallback(async (workspace: Workspace, isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const filters = [authorFilter(authorPublicKey)];
      const fetchedPosts = await fetchPosts(workspace, filters);
      const sortedPosts = fetchedPosts.sort((a, b) => b.timestamp - a.timestamp);
      
      if (isInitialLoad) {
        setAllPosts(sortedPosts);
        setPosts(sortedPosts.slice(0, limit));
        setHasMore(sortedPosts.length > limit);
      } else {
        const currentLength = posts.length;
        const newPosts = sortedPosts.slice(currentLength, currentLength + limit);
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setHasMore(currentLength + limit < sortedPosts.length);
      }
    } catch (error) {
      console.error('Error fetching profile posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [authorPublicKey, limit, posts.length]);

  useEffect(() => {
    if (workspace && authorPublicKey) {
      loadProfilePosts(workspace, true);
    }
  }, [workspace, authorPublicKey, loadProfilePosts]);

  const loadMore = useCallback(() => {
    if (workspace && hasMore && !loadingMore) {
      loadProfilePosts(workspace, false);
    }
  }, [workspace, hasMore, loadingMore, loadProfilePosts]);

  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [target] = entries;
        if (target.isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      {
        rootMargin: '100px',
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
  }, [enableInfiniteScroll, hasMore, loadingMore, loadMore]);

  const refreshPosts = useCallback(() => {
    if (workspace && authorPublicKey) {
      loadProfilePosts(workspace, true);
    }
  }, [workspace, authorPublicKey, loadProfilePosts]);

  return {
    posts,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    refreshPosts,
    loadingRef,
  };
} 