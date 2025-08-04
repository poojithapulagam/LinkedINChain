import React from 'react';

export interface DetailHeaderProps {
  children: React.ReactNode;
}

export default function DetailHeader({ children }: DetailHeaderProps) {
  return (
    <header className="mb-6 sm:mb-8 flex flex-col border-b border-gray-200 pb-6">
      {children}
    </header>
  );
}
