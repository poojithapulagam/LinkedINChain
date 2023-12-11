// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import BackButton from './back-button';
import DetailHeader from './detail-header';

export default function TweetHeader() {
  return (
    <DetailHeader>
      <div className="flex items-center">
        <BackButton />
        <h1 className="my-0 ml-4 text-2xl font-semibold leading-tight text-gray-800">
          Post
        </h1>
      </div>
    </DetailHeader>
  );
}
