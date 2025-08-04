// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import BackButton from './back-button';

export default function PostHeader() {
  return (
    <div className="flex items-center space-x-4">
      <BackButton />
      <h1 className="text-2xl font-lexend font-semibold text-black">
        Post
      </h1>
    </div>
  );
}
