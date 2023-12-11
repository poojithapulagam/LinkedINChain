// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import { Profile } from '@/lib/models';
import BackButton from './back-button';
import DetailHeader from './detail-header';

export interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <DetailHeader>
      <div className="mb-4 flex items-center">
        <BackButton />
        <div className="ml-4">
          <h1 className="m-0 text-2xl font-semibold leading-tight text-gray-800">
            {profile.name}
          </h1>
          <p className="m-0 font-mono text-sm leading-none text-neutral-500">
            {profile.owner.toBase58()}
          </p>
        </div>
      </div>
    </DetailHeader>
  );
}
