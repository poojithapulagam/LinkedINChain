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
      <div className="flex items-center">
        <ProfilePicture className="h-12 w-12 rounded-full" publicKey={publicKey!} />
        <div className="ml-4 flex flex-col">
          <p className="mx-0 mb-1 mt-0 text-lg font-semibold leading-tight text-gray-800">
            {name}
          </p>
          <p className="m-0 font-mono text-sm leading-4 text-gray-500">
            {condensePublicKey(publicKey!.toBase58())}
          </p>
        </div>
      </div>
    </MaybeLink>
  );
}
