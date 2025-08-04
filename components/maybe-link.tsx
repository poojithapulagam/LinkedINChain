// Add the "use client" comment at the top to mark it as a client entry
'use client';

// Import necessary modules
import React from 'react';

interface MaybeLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string; // Add className prop for additional styling
}

export default function MaybeLink({ href, children, className }: MaybeLinkProps) {
  if (href) {
    return (
      <a 
        href={href} 
        className={`text-black hover:text-gray-600 transition-colors duration-200 ${className || ''}`}
      >
        {children}
      </a>
    );
  } else {
    return <>{children}</>;
  }
}
