// Import necessary modules and components
'use client';

import { PublicKey } from '@solana/web3.js';
import ProfileDetail from '@/components/profile-detail';

export interface AuthorPageParams {
  publicKey: string;
}

export interface AuthorPageProps {
  params: AuthorPageParams;
}

export default function AuthorPage({ params }: AuthorPageProps) {
  try {
    const publicKey = new PublicKey(params.publicKey);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
        {/* Adjust the background gradient and other styles based on your design */}
        <ProfileDetail publicKey={publicKey} />
      </div>
    );
  } catch (error) {
    // Handle errors, e.g., redirect to an error page or display an error message
    console.error('Error processing public key:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-200 via-red-300 to-red-400">
        {/* Adjust the background gradient and other styles based on your design */}
        <p className="text-white"> loading author page</p>
      </div>
    );
  }
}
