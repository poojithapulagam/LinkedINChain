// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { useEffect, useState } from 'react';
import type { PublicKey } from '@solana/web3.js';
import { notFound } from 'next/navigation';

import useWorkspace from '@/hooks/use-workspace';
import type { Post } from '@/lib/models';
import type { Workspace } from '@/lib/web3';
import { getPost } from '@/lib/web3';
import PostCard from './post-card';
import PostHeader from './post-header';

export interface PostDetailProps {
  publicKey: PublicKey;
}

export default function PostDetail({ publicKey }: PostDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loaded, setLoaded] = useState(false);

  const workspace = useWorkspace();
  useEffect(() => {
    const updatePost = async (workspace: Workspace) => {
      const fetchedPost = await getPost(workspace, publicKey);
      setPost(fetchedPost);
    };

    if (workspace) {
      updatePost(workspace).then(() => setLoaded(true));
    }
  }, [workspace, publicKey]);

  if (!loaded) {
    return (
      <div className="card text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600 font-dm-sans">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    notFound();
    return null; // Make sure to return null here to avoid rendering the rest of the component without post data.
  }

  return (
    <div className="space-y-6">
      <PostHeader />
      <div className="card card-hover">
        <PostCard post={post} />
      </div>
    </div>
  );
}
