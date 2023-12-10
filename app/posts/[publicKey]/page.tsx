'use client';

import { PublicKey } from '@solana/web3.js';

import Post from '@/components/post-detail';

export interface PostPageParams {
  publicKey: string;
}

export interface PostPageProps {
  params: PostPageParams;
}

export default function PostPage({ params }: PostPageProps) {
  // TODO: Handle errors.
  const publicKey = new PublicKey(params.publicKey);

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      {/* Adjust the background color and other styles based on your design */}
      <Post publicKey={publicKey} />
    </div>
  );
}
