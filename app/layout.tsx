import clsx from 'clsx';
import type { Metadata } from 'next';

import './globals.css'; // Assuming this contains global styles
import AppContext from '@/context';
import Header from '@/components/header';
import { firaMono, poppins, sourceSans } from './fonts';

export const metadata: Metadata = {
  title: 'Solana X',
  description: 'X clone built on Solana',
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
          'bg-gray-100', // Set background color
          firaMono.variable,
          poppins.variable,
          sourceSans.variable,
          'font-sans',
          'text-neutral-900', // Set text color
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
