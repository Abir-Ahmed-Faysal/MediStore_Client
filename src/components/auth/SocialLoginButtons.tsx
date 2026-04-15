'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

export const SocialLoginButtons: React.FC<{ isLoading?: boolean }> = ({ isLoading = false }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsProcessing(true);
      
      // For better-auth, we need to get the OAuth URL and redirect
      // The OAuth sign-in URL follows the pattern: /api/auth/signin/provider
      const callbackUrl = `${window.location.origin}/dashboard`;
      const oauthUrl = new URL('/api/auth/signin/google', process.env.NEXT_PUBLIC_API_URL || window.location.origin);
      oauthUrl.searchParams.set('redirect_uri', callbackUrl);
      
      // better-auth OAuth endpoint
      const response = await fetch(`/api/auth/signin/google?redirect_uri=${encodeURIComponent(callbackUrl)}`, {
        method: 'GET',
      });

      if (response.ok) {
        // Redirect to OAuth provider
        window.location.href = response.url;
      } else {
        toast.error('Failed to initiate Google Sign-in');
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google Sign-in is currently unavailable. Please use email/password login.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setIsProcessing(true);
      
      // Facebook OAuth through better-auth when available
      const callbackUrl = `${window.location.origin}/dashboard`;
      
      const response = await fetch(`/api/auth/signin/facebook?redirect_uri=${encodeURIComponent(callbackUrl)}`, {
        method: 'GET',
      });

      if (response.ok) {
        window.location.href = response.url;
      } else {
        toast.info('Facebook Sign-in is currently unavailable. Please use email/password login.');
      }
    } catch (error) {
      console.error('Facebook login error:', error);
      toast.info('Facebook Sign-in is currently unavailable. Please use email/password login.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || isProcessing}
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm font-medium">{isProcessing ? 'Loading...' : 'Google'}</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={handleFacebookLogin}
          disabled={isLoading || isProcessing}
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
          <span className="text-sm font-medium">{isProcessing ? 'Loading...' : 'Facebook'}</span>
        </button>
      </div>

      {/* Note about demo credentials */}
      <p className="text-xs text-gray-500 text-center">
        Use demo credentials or social login to test the application
      </p>
    </div>
  );
};
