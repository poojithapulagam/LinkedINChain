// connect-button.tsx
// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectButton: React.FC = () => {
  return (
    <WalletMultiButton
      className="font-dm-sans font-medium px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 bg-black text-white hover:bg-gray-800 active:bg-gray-900"
    />
  );
};

export default ConnectButton;
