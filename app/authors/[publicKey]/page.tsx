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
      <div className="w-full bg-white">
        <div className="container-responsive py-8">
          <ProfileDetail publicKey={publicKey} />
        </div>
      </div>
    );
  } catch (error) {
    // Handle errors, e.g., redirect to an error page or display an error message
    console.error('Error processing public key:', error);
    return (
      <div className="w-full bg-white">
        <div className="container-responsive py-8">
          <div className="card text-center py-12">
            <h2 className="text-xl font-lexend font-semibold text-black mb-4">Error Loading Author</h2>
            <p className="text-gray-600 font-dm-sans">Unable to load the requested author profile. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }
}
