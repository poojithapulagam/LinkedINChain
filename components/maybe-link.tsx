'use client';

// Import necessary modules
import React from 'react';

interface MaybeLinkProps {
  href?: string;
  children: React.ReactNode;
}

export default function MaybeLink({ href, children }: MaybeLinkProps) {
  if (href) {
    return <a href={href}>{children}</a>;
  } else {
    return <>{children}</>;
  }
}
