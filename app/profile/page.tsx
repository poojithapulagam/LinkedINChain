// Import necessary modules and components
'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import ProfileDetail from '@/components/profile-detail';

export default function ProfilePage() {
  const { publicKey } = useWallet();

  if (!publicKey) {
    // Handle the case when publicKey is null or undefined, e.g., redirect to login page
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-200 via-red-300 to-red-400">
        {/* Adjust the background gradient and other styles based on your design */}
        <p className="text-white">Loading Please Wait...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      {/* Adjust the background gradient and other styles based on your design */}
      <ProfileDetail publicKey={publicKey} />
    </div>
  );
}
