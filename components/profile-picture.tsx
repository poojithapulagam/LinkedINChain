// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { useEffect, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import type { PublicKey } from '@solana/web3.js';
import { getProfilePicture } from '@solflare-wallet/pfp';
import Image from 'next/image';

export interface ProfilePictureProps {
  publicKey: PublicKey;
  className?: string;
}

export default function ProfilePicture({
  publicKey,
  className,
}: ProfilePictureProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { connection } = useConnection();
  useEffect(() => {
    const updateProfilePicture = async () => {
      try {
        const { url } = await getProfilePicture(connection, publicKey);
        setSrc(url);
      } catch (error) {
        console.error('Loading fetching profile picture:', error);
      } finally {
        setLoading(false);
      }
    };
    updateProfilePicture();
  }, [connection, publicKey]);

  if (loading) {
    return (
      <div className={`bg-gray-200 animate-pulse rounded-full flex items-center justify-center ${className}`}>
        <div className="w-1/2 h-1/2 bg-gray-300 rounded-full"></div>
      </div>
    );
  }

  if (!src) {
    return (
      <div className={`bg-gray-200 rounded-full flex items-center justify-center ${className}`}>
        <div className="w-1/2 h-1/2 bg-gray-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <Image
      className={`rounded-full object-cover ${className}`}
      alt="Profile Picture"
      src={src}
      height={40}
      width={40}
    />
  );
}
