// Add the "use client" comment at the top to mark it as a client entry
'use client';

import React, { ErrorInfo } from 'react';
import { SolanaProvider } from './solana';
import { ProfileProvider } from './profile';
import { PostsProvider } from './posts';

interface AppContextProps {
  children: React.ReactNode;
}

interface AppContextState {
  hasError: boolean;
}

class AppContext extends React.Component<AppContextProps, AppContextState> {
  constructor(props: AppContextProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): AppContextState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error('Error caught in AppContext:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI when an error occurs
      return <div>Loading Please Wait...</div>;
    }

    return (
      <SolanaProvider>
        <ProfileProvider>
          <PostsProvider>{this.props.children}</PostsProvider>
        </ProfileProvider>
      </SolanaProvider>
    );
  }
}

export default AppContext;
