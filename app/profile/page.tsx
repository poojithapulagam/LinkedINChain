'use client';

import { useWallet } from '@solana/wallet-adapter-react';

import ProfileDetail from '@/components/profile-detail';

export default function ProfilePage() {
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      {/* Adjust the background color and other styles based on your design */}
      <ProfileDetail publicKey={publicKey!} />
    </div>
  );
}
