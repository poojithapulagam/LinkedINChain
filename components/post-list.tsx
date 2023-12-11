// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import type { Post } from '@/lib/models';
import PostCard from './post-card';

export interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="m-0 space-y-4 p-4 bg-white rounded-md shadow-md">
      {/* Updated spacing between list items */}
      {posts.map((post, index) => (
        <li
          className={`border-b border-solid border-gray-300 ${
            index === posts.length - 1 ? 'border-none' : '' // Remove border for the last item
          }`}
          key={post.id}
        >
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
