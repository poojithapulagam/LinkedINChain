// Button.tsx
import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any additional props if needed
}

const Button: React.FC<ButtonProps> = ({ children, className, disabled, ...rest }) => {
  return (
    <button
      className={clsx(
        'font-dm-sans font-medium px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
        'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
        'disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
