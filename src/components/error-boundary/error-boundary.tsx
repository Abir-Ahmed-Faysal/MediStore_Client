'use client';

import React, { ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches errors in child components and displays a fallback UI
 * Also logs errors for monitoring/debugging
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }

    // You can also log the error to an external service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
            <div className="max-w-md w-full">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8">
                {/* Error Icon */}
                <div className="flex justify-center mb-4">
                  <div className="bg-red-100 dark:bg-red-900 rounded-full p-4">
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                </div>

                {/* Error Message */}
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
                  Oops! Something went wrong
                </h1>
                
                <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
                  We're sorry for the inconvenience. An unexpected error has occurred.
                </p>

                {/* Error Details (Development Only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
                    <p className="text-sm font-mono text-red-700 dark:text-red-400 break-words">
                      {this.state.error.message}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={this.handleReset}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="w-full"
                  >
                    Go to Home
                  </Button>
                </div>

                {/* Help Text */}
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-6">
                  If this problem persists, please{' '}
                  <a href="/contact" className="text-blue-600 hover:underline">
                    contact support
                  </a>
                </p>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
