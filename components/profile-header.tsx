// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import { Profile } from '@/lib/models';
import BackButton from './back-button';
import ProfilePicture from './profile-picture';

export interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <BackButton />
        <h1 className="text-2xl font-lexend font-semibold text-black">
          Profile
        </h1>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <ProfilePicture 
          publicKey={profile.owner} 
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-lexend font-semibold text-black mb-2">
            {profile.name}
          </h2>
          <p className="text-sm font-dm-sans text-gray-500 break-all">
            {profile.owner.toBase58()}
          </p>
        </div>
      </div>
    </div>
  );
}
