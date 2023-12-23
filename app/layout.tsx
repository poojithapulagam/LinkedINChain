import clsx from 'clsx';
import type { Metadata } from 'next';

import './globals.css';
import AppContext from '@/context';
import Header from '@/components/header';
import { firaMono, poppins, sourceSans } from './fonts';

export const metadata: Metadata = {
  title: 'AMIGOS ODYSSEY SPACE',
  description: '🚀 Welcome to AO SPACE, the innovative social platform within the Amigos Odyssey ecosystem! Built on Solana blockchain devnet, AO SPACE integrates seamlessly with our flagship game, AO CLICK. Enjoy decentralized and secure interactions with a nominal Sol fee per message. Access SOL tokens effortlessly through SOL FAUCET and experience a Twitter-style community interface. Be part of the beta version, provide feedback, and connect with AO CLICK using the same wallet. Earn VIP roles for exclusive access to NFT drops by engaging in AO SPACE and sharing AO CLICK progress. Join us for an unparalleled social experience where community, innovation, and blockchain converge! 🌌💬',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          'bg-gradient-to-r from-green-400 via-purple-500 to-pink-500', // Set gradient background
          firaMono.variable,
          poppins.variable,
          sourceSans.variable,
          'font-sans',
          'text-white', // Set text color to white
          'bg-cover', // Make the background image cover the entire container
          'min-h-screen', // Ensure the body takes at least the full height of the viewport
        )}
        style={{ backgroundImage: 'url("/7.png")' }} // Set background image
      >
        <AppContext>
          <div className="flex flex-col h-full">
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
