// connect-button.tsx
// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectButton: React.FC = () => {
  return (
    <WalletMultiButton
      className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-md focus:outline-none transition-transform transform hover:scale-105"
    />
  );
};

export default ConnectButton;
