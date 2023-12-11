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
    // You might want to render a loading spinner here
    return <div className={`bg-gray-200 ${className}`} />;
  }

  if (!src) {
    // You might want to render a default placeholder image here
    return <div className={`bg-gray-200 ${className}`} />;
  }

  return (
    <Image
      className={`rounded-full ${className}`}
      alt="Profile Picture"
      src={src}
      height={40}
      width={40}
    />
  );
}
