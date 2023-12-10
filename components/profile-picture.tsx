// Import necessary modules and components
import { useConnection } from '@solana/wallet-adapter-react';
import type { PublicKey } from '@solana/web3.js';
import { getProfilePicture } from '@solflare-wallet/pfp';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface ProfilePictureProps {
  publicKey: PublicKey;
  className?: string;
}

export default function ProfilePicture({
  publicKey,
  className,
}: ProfilePictureProps) {
  const [src, setSrc] = useState<string | null>(null);

  const { connection } = useConnection();
  useEffect(() => {
    const updateProfilePicture = async () => {
      try {
        const { url } = await getProfilePicture(connection, publicKey);
        setSrc(url);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
    updateProfilePicture();
  }, [connection, publicKey]);

  if (!src) {
    // You might want to render a default placeholder image or loading spinner here
    return null;
  }

  return <Image className={className} alt="Profile Picture" src={src} height={40} width={40} />;
}
