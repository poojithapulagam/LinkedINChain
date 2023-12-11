import clsx from 'clsx';
import type { Metadata } from 'next';

import './globals.css'; // Assuming this contains global styles
import AppContext from '@/context';
import Header from '@/components/header';
import { firaMono, poppins, sourceSans } from './fonts';

export const metadata: Metadata = {
  title: 'AMIGOS ODYSSEY SPACE',
  description: '🌌 Welcome to AO SPACE: The dynamic social frontier of Amigos Odyssey! 🚀 Immerse yourself in a decentralized haven on Solana blockchain devnet, fostering vibrant community engagement with a nominal Sol fee per message. Explore our beta version, a Twitter-style clone, and earn exclusive Discord roles and VIP access to NFT drops by actively participating in AO CLICK. Join the evolving world of Amigos Odyssey, where conversations ignite and innovation meets blockchain for an unparalleled social experience! 🌈💬',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500', // Set gradient background
          firaMono.variable,
          poppins.variable,
          sourceSans.variable,
          'font-sans',
          'text-white', // Set text color to white
        )}
      >
        <AppContext>
          <div className="flex h-full flex-col">
            <Header />
            <div className="flex-1 overflow-y-auto">
              <main className="mx-auto flex w-full max-w-[480px] flex-col pt-8">
                {children}
              </main>
            </div>
          </div>
        </AppContext>
      </body>
    </html>
  );
}
