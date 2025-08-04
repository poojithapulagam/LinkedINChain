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
    <article className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex-shrink-0">
        <ProfilePicture publicKey={author.owner} className="w-12 h-12 sm:w-16 sm:h-16" />
      </div>
      <div className="flex-1 min-w-0">
        <header className="mb-3">
          <h3 className="text-lg font-lexend font-semibold text-black mb-1">
            <MaybeLink href={authorLink} className="hover:text-gray-600 transition-colors duration-200">
              {author.name}
            </MaybeLink>
          </h3>
          <p className="text-sm font-dm-sans text-gray-500">
            {condensePublicKey(author.owner.toBase58())} •{' '}
            <MaybeLink href={postLink} className="hover:text-gray-700 transition-colors duration-200">
              <time dateTime={new Date(timestamp).toISOString()}>
                {createdAt}
              </time>
            </MaybeLink>
          </p>
        </header>
        <div className="prose prose-sm max-w-none">
          <p className="text-black font-dm-sans leading-relaxed">{content}</p>
        </div>
      </div>
    </article>
  );
}
