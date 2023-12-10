// connect-button.tsx
// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectButton: React.FC = () => {
  return <WalletMultiButton />;
};

export default ConnectButton;
