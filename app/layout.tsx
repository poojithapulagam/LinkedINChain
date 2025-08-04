import clsx from 'clsx';
import type { Metadata } from 'next';

import './globals.css';
import AppContext from '@/context';
import Header from '@/components/header';
import ScrollToTop from '@/components/scroll-to-top';
import { lexendDeca, dmSans } from './fonts';

export const metadata: Metadata = {
  title: 'ChatChain',
  
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
          'bg-white text-black', // Black and white color scheme
          lexendDeca.variable,
          dmSans.variable,
          'font-sans',
          'min-h-screen',
        )}
      >
        <AppContext>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
              <main className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
            </div>
          </div>
          <ScrollToTop />
        </AppContext>
      </body>
    </html>
  );
}
