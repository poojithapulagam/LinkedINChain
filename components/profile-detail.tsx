// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { useEffect, useState } from 'react';
import type { PublicKey } from '@solana/web3.js';
import { notFound } from 'next/navigation';

import useWorkspace from '@/hooks/use-workspace';
import type { Post, Profile } from '@/lib/models';
import { authorFilter, fetchPosts, getProfile } from '@/lib/web3';
import type { Workspace } from '@/lib/web3';
import ProfileHeader from './profile-header';
import PostList from './post-list';

export interface ProfileDetailProps {
  publicKey: PublicKey;
}

export default function ProfileDetail({ publicKey }: ProfileDetailProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  const workspace = useWorkspace();
  useEffect(() => {
    const updateProfile = async (workspace: Workspace) => {
      const fetchedProfile = await getProfile(workspace, publicKey);
      setProfile(fetchedProfile);
    };

    const updatePosts = async (workspace: Workspace) => {
      const fetchedPosts = await fetchPosts(workspace, [
        authorFilter(publicKey),
      ]);
      setPosts(fetchedPosts);
    };

    if (workspace && publicKey) {
      Promise.all([updateProfile(workspace), updatePosts(workspace)]).then(() =>
        setLoaded(true),
      );
    }
  }, [workspace, publicKey]);

  if (!loaded) {
    // TODO: Render spinner.
    return null;
  }

  if (!profile) {
    notFound();
    return null; // Make sure to return null here to avoid rendering the rest of the component without profile data.
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {/* Added a responsive container */}
      <div className="bg-white rounded-md shadow-md p-4 mt-4">
        <ProfileHeader profile={profile} />
        <PostList posts={posts} />
      </div>
    </div>
  );
}
