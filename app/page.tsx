'use client';

import { useWallet } from '@solana/wallet-adapter-react';

import PostForm from '@/components/post-form';
import PostList from '@/components/post-list';
import ProfileForm from '@/components/profile-form';
import usePosts from '@/hooks/use-posts';
import useProfile from '@/hooks/use-profile';

function NotConnected() {
  const { posts } = usePosts();

  return (
    <div className="bg-red-100 p-4">
      <h2 className="text-red-600 text-lg font-semibold mb-2">
        Not Connected to Wallet
      </h2>
      <PostList posts={posts} />
    </div>
  );
}

function NoProfile() {
  return (
    <div className="bg-yellow-100 p-4">
      <h2 className="text-yellow-600 text-lg font-semibold mb-2">
        No Profile Found
      </h2>
      <ProfileForm />
    </div>
  );
}

function ConnectedAndProfile() {
  const { posts } = usePosts();

  return (
    <div className="bg-green-100 p-4">
      <h2 className="text-green-600 text-lg font-semibold mb-2">
        Connected and Profile Found
      </h2>
      <div className="mb-4">
        <PostForm />
      </div>
      <PostList posts={posts} />
    </div>
  );
}

export default function HomePage() {
  const { connected } = useWallet();

  const { loaded, profile } = useProfile();
  const hasProfile = !!profile;

  return (
    <div className="min-h-screen flex items-center justify-center">
      {connected && loaded && hasProfile && <ConnectedAndProfile />}
      {connected && loaded && !hasProfile && <NoProfile />}
      {!connected && <NotConnected />}
    </div>
  );
}
