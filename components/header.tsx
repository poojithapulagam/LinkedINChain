// header.tsx
// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { lazy, Suspense, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import Image from 'next/image';
import Wallet from './wallet';

// Use lazy and Suspense for dynamic import
const ConnectButton = lazy(() => import('./connect-button'));

const Header: React.FC = () => {
  const { connected } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
          
              <Image src="/logo.jpg" alt="ChatChain Logo" width={40} height={40} className="h-10 w-auto rounded-lg" />
           
          </div>

          {/* ChatChain Brand - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="text-black font-lexend font-bold text-xl tracking-wide">
              ChatChain
            </div>
          </nav>

          {/* ChatChain Brand - Mobile (visible when menu closed) */}
          <div className="md:hidden flex-1 flex justify-center">
            <div className="text-black font-lexend font-bold text-lg tracking-wide">
              ChatChain
            </div>
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              {connected ? (
                <Wallet />
              ) : (
                <Suspense fallback={<div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>}>
                  <ConnectButton />
                </Suspense>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
            {/* Wallet Section in Mobile Menu */}
            <div className="pt-4">
              {connected ? (
                <Wallet />
              ) : (
                <Suspense fallback={<div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>}>
                  <ConnectButton />
                </Suspense>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
