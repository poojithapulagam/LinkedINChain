// Import necessary modules and components
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
  try {
    const publicKey = new PublicKey(params.publicKey);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400">
        {/* Adjust the background gradient and other styles based on your design */}
        <Post publicKey={publicKey} />
      </div>
    );
  } catch (error) {
    // Handle errors, e.g., redirect to an error page or display an error message
    console.error('Loading processing public key:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-200 via-red-300 to-red-400">
        {/* Adjust the background gradient and other styles based on your design */}
        <p className="text-white"> loading post page</p>
      </div>
    );
  }
}
