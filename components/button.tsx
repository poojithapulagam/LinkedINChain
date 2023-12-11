// Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any additional props if needed
}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-yellow-500 text-white px-4 py-2 rounded-md focus:outline-none transition-transform transform hover:scale-105 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
