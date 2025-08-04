// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { useEffect, useState } from 'react';
import type { PublicKey } from '@solana/web3.js';
import { notFound } from 'next/navigation';

import useWorkspace from '@/hooks/use-workspace';
import type { Profile } from '@/lib/models';
import { getProfile } from '@/lib/web3';
import useProfilePosts from '@/hooks/use-profile-posts';
import ProfileHeader from './profile-header';
import PostList from './post-list';
import PullToRefresh from './pull-to-refresh';

export interface ProfileDetailProps {
  publicKey: PublicKey;
}

export default function ProfileDetail({ publicKey }: ProfileDetailProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loaded, setLoaded] = useState(false);

  const workspace = useWorkspace();
  
  // Use the new profile posts hook with infinite scroll
  const { 
    posts, 
    loading: postsLoading, 
    loadingMore, 
    hasMore, 
    loadingRef,
    refreshPosts
  } = useProfilePosts(publicKey, {
    enableInfiniteScroll: true,
    limit: 10
  });

  useEffect(() => {
    const updateProfile = async (workspace: any) => {
      const fetchedProfile = await getProfile(workspace, publicKey);
      setProfile(fetchedProfile);
      setLoaded(true);
    };

    if (workspace && publicKey) {
      updateProfile(workspace);
    }
  }, [workspace, publicKey]);

  const handleRefresh = async () => {
    await refreshPosts();
  };

  if (!loaded) {
    return (
      <div className="card text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600 font-dm-sans">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    notFound();
    return null; // Make sure to return null here to avoid rendering the rest of the component without profile data.
  }

  return (
    <div className="space-y-8">
      <div className="card card-hover">
        <ProfileHeader profile={profile} />
      </div>
      <PullToRefresh onRefresh={handleRefresh}>
        <PostList 
          posts={posts} 
          loading={postsLoading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          loadingRef={loadingRef}
          showTitle={true}
          emptyMessage={`${profile.name} hasn't posted anything yet.`}
        />
      </PullToRefresh>
    </div>
  );
}
