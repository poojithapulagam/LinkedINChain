// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React from 'react';
import type { Post } from '@/lib/models';
import PostCard from './post-card';
import LoadingSkeleton from './loading-skeleton';
import Button from './button';

export interface PostListProps {
  posts: Post[];
  loading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  loadingRef?: React.RefObject<HTMLDivElement>;
  showTitle?: boolean;
  emptyMessage?: string;
  onLoadMore?: () => void;
}

export default function PostList({ 
  posts, 
  loading = false, 
  loadingMore = false, 
  hasMore = false,
  loadingRef,
  showTitle = true,
  emptyMessage = "No posts yet. Be the first to share something!",
  onLoadMore
}: PostListProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {showTitle && (
          <h2 className="text-2xl font-lexend font-semibold text-black mb-6">Recent Posts</h2>
        )}
        <LoadingSkeleton count={3} type="post" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <h2 className="text-2xl font-lexend font-semibold text-black mb-6">Recent Posts</h2>
      )}
      
      {posts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 font-dm-sans text-lg">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="card card-hover">
              <PostCard post={post} />
            </div>
          ))}
          
          {/* Loading more indicator */}
          {loadingMore && (
            <div className="card text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600 font-dm-sans">Loading more posts...</p>
            </div>
          )}
          
          {/* Manual Load More Button */}
          {hasMore && !loadingMore && onLoadMore && (
            <div className="text-center py-4">
              <Button 
                onClick={onLoadMore}
                className="bg-black text-white hover:bg-gray-800"
              >
                Load More Posts
              </Button>
            </div>
          )}
          
          {/* Intersection observer target for infinite scroll */}
          {hasMore && !loadingMore && (
            <div 
              ref={loadingRef}
              className="h-20 w-full flex items-center justify-center"
              aria-label="Load more posts trigger"
            >
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-500 font-dm-sans">Scroll to load more</p>
              </div>
            </div>
          )}
          
          {/* End of posts indicator */}
          {!hasMore && posts.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 font-dm-sans">You&apos;ve reached the end of the posts!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
