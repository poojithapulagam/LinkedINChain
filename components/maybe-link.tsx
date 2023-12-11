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
      <a href={href} className={`text-blue-500 hover:underline ${className}`}>
        {children}
      </a>
    );
  } else {
    return <>{children}</>;
  }
}
