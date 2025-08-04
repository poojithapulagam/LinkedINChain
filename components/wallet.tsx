// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import useProfile from '@/hooks/use-profile';
import { condensePublicKey } from '@/lib/utils/public-keys';
import MaybeLink from './maybe-link';
import ProfilePicture from './profile-picture';

export default function Wallet() {
  const { profile } = useProfile();
  const { publicKey } = useWallet();

  const hasProfile = !!profile;
  if (!hasProfile) {
    return null;
  }

  const { name } = profile;

  return (
    <MaybeLink href="/profile">
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
        <ProfilePicture className="h-10 w-10 rounded-full" publicKey={publicKey!} />
        <div className="flex flex-col">
          <p className="text-sm font-lexend font-semibold text-black leading-tight">
            {name}
          </p>
          <p className="text-xs font-dm-sans text-gray-500 leading-tight">
            {condensePublicKey(publicKey!.toBase58())}
          </p>
        </div>
      </div>
    </MaybeLink>
  );
}
