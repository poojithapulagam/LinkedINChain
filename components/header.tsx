// header.tsx
// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { lazy, Suspense } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import Wallet from './wallet';

// Use lazy and Suspense for dynamic import
const ConnectButton = lazy(() => import('./connect-button'));

const Header: React.FC = () => {
  const { connected } = useWallet();

  return (
    <header className="flex h-20 items-center justify-between px-8 bg-blue-500 text-white rounded-b-full mt-4">
      {/* Logo */}
      <h1 className="m-0">
        <Link href="/">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" />
        </Link>
      </h1>

      {/* Buttons */}
      <div className="flex space-x-4">
        <a
          href="https://twitter.com"
          className="btn-twitter text-black font-bold hover:text-black hover:bg-blue-600 transform transition-transform duration-300"
        >
          AO Click
        </a>
        <a
          href="https://twitter.com"
          className="btn-twitter text-black font-bold hover:text-black hover:bg-blue-600 transform transition-transform duration-300"
        >
          Discord
        </a>
        <a
          href="https://twitter.com"
          className="btn-twitter text-black font-bold hover:text-black hover:bg-blue-600 transform transition-transform duration-300"
        >
          Twitter
        </a>
      </div>

      {/* Wallet and Connect Button */}
      {connected ? (
        <Wallet />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <ConnectButton />
        </Suspense>
      )}
    </header>
  );
};

export default Header;
