// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import type { Post } from '@/lib/models';
import { condensePublicKey } from '@/lib/utils/public-keys';
import MaybeLink from './maybe-link';
import ProfilePicture from './profile-picture';

export interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Extract post details
  const { author, content, createdAt, timestamp, id } = post;

  // Check if the current user is the author of the post
  const { publicKey } = useWallet();
  const isCurrentUserAuthor =
    publicKey && publicKey.toBase58() === author.owner.toBase58();
  const authorLink = isCurrentUserAuthor ? '/profile' : `/authors/${author.id}`;

  const postLink = `/posts/${id}`;

  return (
    <article className="flex flex-col sm:flex-row p-4 bg-white shadow-md rounded-md mb-4">
      <ProfilePicture publicKey={author.owner} className="mb-4 sm:mr-4 sm:mb-0" />
      <div className="flex flex-col w-full">
        <header className="mb-2">
          <h1 className="m-0 text-xl font-semibold text-blue-600">
            <MaybeLink href={authorLink}>{author.name}</MaybeLink>
          </h1>
          <p className="text-sm text-neutral-500">
            {condensePublicKey(author.owner.toBase58())} •{' '}
            <MaybeLink href={postLink}>
              <time dateTime={new Date(timestamp).toISOString()}>
                {createdAt}
              </time>
            </MaybeLink>
          </p>
        </header>
        <p className="text-gray-800">{content}</p>
      </div>
    </article>
  );
}
