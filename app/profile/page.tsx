// Import necessary modules and components
'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import ProfileDetail from '@/components/profile-detail';

export default function ProfilePage() {
  const { publicKey } = useWallet();

  if (!publicKey) {
    // Handle the case when publicKey is null or undefined, e.g., redirect to login page
    return (
      <div className="w-full bg-white">
        <div className="container-responsive py-8">
          <div className="card text-center py-12">
            <h2 className="text-xl font-lexend font-semibold text-black mb-4">Wallet Not Connected</h2>
            <p className="text-gray-600 font-dm-sans">Please connect your wallet to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="container-responsive py-8">
        <ProfileDetail publicKey={publicKey} />
      </div>
    </div>
  );
}
