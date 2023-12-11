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
}

const defaultValue: PostsContextValue = {
  posts: [],
  sendPost: async () => {},
  loading: true,
};

const PostsContext = React.createContext<PostsContextValue>(defaultValue);

export interface PostsProviderProps {
  children: React.ReactNode;
}

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const workspace = useWorkspace();

  // Update posts on workspace changes.
  useEffect(() => {
    const updatePosts = async (workspace: Workspace) => {
      try {
        const fetchedPosts = await fetchPosts(workspace);
        const sortedPosts = fetchedPosts.sort(
          (a, b) => b.timestamp - a.timestamp,
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Loading fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (workspace) {
      updatePosts(workspace);
    }
  }, [workspace]);

  const sendPostAndUpdate = useCallback(
    async (content: string) => {
      try {
        invariant(workspace, 'Expected workspace to be defined');
        const newPost = await sendPost(workspace, content);
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      } catch (error) {
        console.error('Loading sending post:', error);
      }
    },
    [workspace],
  );

  const value = useMemo(
    () => ({
      posts,
      sendPost: sendPostAndUpdate,
      loading,
    }),
    [posts, sendPostAndUpdate, loading],
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export default PostsContext;
