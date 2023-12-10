// Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any additional props if needed
}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
