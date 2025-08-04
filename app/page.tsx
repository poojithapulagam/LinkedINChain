// client-entry.tsx
'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import PostForm from '@/components/post-form';
import PostList from '@/components/post-list';
import ProfileForm from '@/components/profile-form';
import PullToRefresh from '@/components/pull-to-refresh';
import usePosts from '@/hooks/use-posts';
import useProfile from '@/hooks/use-profile';

function NotConnected() {
  const { posts, loading, loadingMore, hasMore, loadingRef, refreshPosts, loadMore } = usePosts({
    enableInfiniteScroll: true,
    limit: 10
  });

  return (
    <div className="w-full">
      <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
        <h2 className="text-red-800 text-xl font-lexend font-semibold mb-4">Not Connected to Wallet</h2>
        <p className="text-red-600 font-dm-sans mb-4">Connect your Solana wallet to start posting and interacting with the community.</p>
      </div>
      <PullToRefresh onRefresh={refreshPosts}>
        <PostList 
          posts={posts} 
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          loadingRef={loadingRef}
          onLoadMore={loadMore}
        />
      </PullToRefresh>
    </div>
  );
}

function NoProfile() {
  return (
    <div className="w-full">
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
        <h2 className="text-yellow-800 text-xl font-lexend font-semibold mb-4">No Profile Found</h2>
        <p className="text-yellow-600 font-dm-sans mb-4">Create your profile to start posting and connecting with others.</p>
      </div>
      <ProfileForm />
    </div>
  );
}

function ConnectedAndProfile() {
  const { posts, loading, loadingMore, hasMore, loadingRef, refreshPosts, loadMore } = usePosts({
    enableInfiniteScroll: true,
    limit: 10
  });

  return (
    <div className="w-full">
      <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
        <h2 className="text-green-800 text-xl font-lexend font-semibold mb-4">Welcome to ChatChain!</h2>
        <p className="text-green-600 font-dm-sans mb-4">You&apos;re connected and ready to share with the community.</p>
      </div>
      <div className="mb-8">
        <PostForm />
      </div>
      <PullToRefresh onRefresh={refreshPosts}>
        <PostList 
          posts={posts} 
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          loadingRef={loadingRef}
          onLoadMore={loadMore}
        />
      </PullToRefresh>
    </div>
  );
}

export default function HomePage() {
  const { connected } = useWallet();
  const { loaded, profile } = useProfile();
  const hasProfile = !!profile;

  return (
    <div className="w-full">
      <div className="container-responsive">
        {connected && loaded && hasProfile && <ConnectedAndProfile />}
        {connected && loaded && !hasProfile && <NoProfile />}
        {!connected && <NotConnected />}
      </div>
    </div>
  );
}
