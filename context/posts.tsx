// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import invariant from 'tiny-invariant';

import useWorkspace from '@/hooks/use-workspace';
import type { Post } from '@/lib/models';
import type { Workspace } from '@/lib/web3';
import { fetchPosts, sendPost } from '@/lib/web3';

export interface PostsContextValue {
  posts: Post[];
  sendPost: (content: string) => Promise<void>;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  setFilters: (filters: any[]) => void;
}

const defaultValue: PostsContextValue = {
  posts: [],
  sendPost: async () => {},
  loading: true,
  loadingMore: false,
  hasMore: false,
  loadMore: async () => {},
  refreshPosts: async () => {},
  setFilters: () => {},
};

const PostsContext = React.createContext<PostsContextValue>(defaultValue);

export interface PostsProviderProps {
  children: React.ReactNode;
}

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<any[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const POSTS_PER_PAGE = 10;

  const workspace = useWorkspace();

  const loadPosts = useCallback(async (workspace: Workspace, isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
        setCurrentPage(0);
      } else {
        setLoadingMore(true);
      }

      const fetchedPosts = await fetchPosts(workspace, filters);
      const sortedPosts = fetchedPosts.sort((a, b) => b.timestamp - a.timestamp);
      
      if (isInitialLoad) {
        setAllPosts(sortedPosts);
        setPosts(sortedPosts.slice(0, POSTS_PER_PAGE));
        setHasMore(sortedPosts.length > POSTS_PER_PAGE);
      } else {
        // Load next page
        const nextPage = currentPage + 1;
        const startIndex = nextPage * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        const newPosts = sortedPosts.slice(startIndex, endIndex);
        
        if (newPosts.length > 0) {
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
          setCurrentPage(nextPage);
          setHasMore(endIndex < sortedPosts.length);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filters, currentPage]);

  // Update posts on workspace changes.
  useEffect(() => {
    if (workspace) {
      loadPosts(workspace, true);
    }
  }, [workspace, loadPosts]);

  const loadMore = useCallback(async () => {
    if (workspace && hasMore && !loadingMore) {
      await loadPosts(workspace, false);
    }
  }, [workspace, hasMore, loadingMore, loadPosts]);

  const refreshPosts = useCallback(async () => {
    if (workspace) {
      await loadPosts(workspace, true);
    }
  }, [workspace, loadPosts]);

  const sendPostAndUpdate = useCallback(
    async (content: string) => {
      try {
        invariant(workspace, 'Expected workspace to be defined');
        const newPost = await sendPost(workspace, content);
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setAllPosts((prevAllPosts) => [newPost, ...prevAllPosts]);
      } catch (error) {
        console.error('Error sending post:', error);
      }
    },
    [workspace],
  );

  const value = useMemo(
    () => ({
      posts,
      sendPost: sendPostAndUpdate,
      loading,
      loadingMore,
      hasMore,
      loadMore,
      refreshPosts,
      setFilters,
    }),
    [posts, sendPostAndUpdate, loading, loadingMore, hasMore, loadMore, refreshPosts],
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export default PostsContext;
