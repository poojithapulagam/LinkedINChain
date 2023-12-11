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
}

export default function TextField({
  className,
  ...otherProps
}: TextFieldProps) {
  return (
    <input
      autoComplete="off"
      className={clsx(
        'h-12 px-4 py-2 font-medium text-gray-800 border border-solid border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300',
        className,
      )}
      type="text"
      {...otherProps}
    />
  );
}
