// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import clsx from 'clsx';

export interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  maxLength?: number;
  placeholder?: string;
  id?: string;
}

export default function TextField({
  className,
  ...otherProps
}: TextFieldProps) {
  return (
    <input
      autoComplete="off"
      className={clsx(
        'w-full h-12 px-4 py-3 font-dm-sans text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-500',
        className,
      )}
      type="text"
      {...otherProps}
    />
  );
}
