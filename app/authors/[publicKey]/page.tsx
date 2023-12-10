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
  // TODO: Handle errors.
  const publicKey = new PublicKey(params.publicKey);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      {/* Adjust the background color and other styles based on your design */}
      <ProfileDetail publicKey={publicKey} />
    </div>
  );
}
