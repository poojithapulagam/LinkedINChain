'use client';

import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  type?: 'post' | 'profile';
}

export default function LoadingSkeleton({ count = 3, type = 'post' }: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, index) => index);

  if (type === 'profile') {
    return (
      <div className="space-y-4">
        {skeletons.map((index) => (
          <div key={index} className="card animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {skeletons.map((index) => (
        <div key={index} className="card animate-pulse">
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 