'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email) {
      setLocalError('Email is required');
      return;
    }

    if (!email.includes('@')) {
      setLocalError('Please enter a valid email address');
      return;
    }

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setLocalError(errorMessage);
    }
  };

  const displayError = localError || error?.message;

  return (
    <AuthLayout
      title="Forgot Password?"
      description="No problem. We'll email you a link to reset it."
      backLink={{
        href: '/auth/login',
        text: 'Back to Login',
      }}
    >
      {isSubmitted ? (
        // Success message
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to{' '}
            <span className="font-semibold text-gray-900">{email}</span>. Please check your email
            and follow the link to reset your password.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-blue-800 font-medium mb-2">What to do next:</p>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Check your email inbox (including spam folder)</li>
              <li>2. Click on the reset password link</li>
              <li>3. Follow the instructions to create a new password</li>
              <li>4. Sign in to your account with the new password</li>
            </ol>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Didn't receive an email?{' '}
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Try another email
            </button>
          </p>

          <Link
            href="/auth/login"
            className="inline-block text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to login
          </Link>
        </div>
      ) : (
        // Form
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error message */}
          {displayError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{displayError}</p>
            </div>
          )}

          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the email address associated with your account
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-medium mb-2">Password Reset Link</p>
            <ul className="space-y-1 text-xs">
              <li>• The reset link will expire in 24 hours</li>
              <li>• For security, you'll need to verify your email</li>
              <li>• Make sure to save your new password</li>
            </ul>
          </div>

          {/* Back to login */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
