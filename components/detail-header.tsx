import React from 'react';

export interface DetailHeaderProps {
  children: React.ReactNode;
}

export default function DetailHeader({ children }: DetailHeaderProps) {
  return (
    <header className="mb-4 sm:mb-6 flex flex-col border-b border-solid border-gradient-to-r from-blue-500 to-purple-500 pb-4 text-white bg-gradient-to-r from-blue-500 to-purple-500">
      {children}
    </header>
  );
}
