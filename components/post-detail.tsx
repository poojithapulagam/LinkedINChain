'use client';

import type { PublicKey } from '@solana/web3.js';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

import useWorkspace from '@/hooks/use-workspace';
import type { Post } from '@/lib/models';
import type { Workspace } from '@/lib/web3';
import { getPost } from '@/lib/web3';
import PostCard from './post-card';
import PostHeader from './post-header';

// Import necessary modules and components

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
    // TODO: Render spinner.
    return null;
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <PostHeader />
      <div className="bg-gray-100 p-4">
        {/* Added background color and padding for better visual separation */}
        <PostCard post={post} />
      </div>
    </>
  );
}
