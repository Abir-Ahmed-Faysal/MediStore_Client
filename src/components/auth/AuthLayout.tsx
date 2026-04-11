'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  backLink?: {
    href: string;
    text: string;
  };
  bottomLink?: {
    text: string;
    href: string;
    linkText: string;
  };
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  backLink,
  bottomLink,
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12">
        {/* Header with logo/brand */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-12">
            {/* Logo placeholder */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MediStore</span>
          </Link>

          {/* Back link if provided */}
          {backLink && (
            <Link
              href={backLink.href}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-6"
            >
              ← {backLink.text}
            </Link>
          )}

          {/* Title and description */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && <p className="text-gray-600 text-base">{description}</p>}
        </div>

        {/* Main content (form) */}
        <div className="w-full max-w-md mx-auto">{children}</div>

        {/* Bottom link if provided */}
        {bottomLink && (
          <div className="mt-8 text-center text-sm text-gray-600">
            {bottomLink.text}{' '}
            <Link href={bottomLink.href} className="text-blue-600 hover:text-blue-800 font-semibold">
              {bottomLink.linkText}
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p className="mb-2">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </Link>
          </p>
          <p>&copy; {new Date().getFullYear()} MediStore. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Illustration Section (Desktop only) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to MediStore</h2>
          <p className="text-gray-600 mb-8">
            Your trusted online pharmacy delivering quality medicines right to your doorstep. Secure, Fast, and Reliable.
          </p>

          {/* Features list */}
          <div className="space-y-4 text-left bg-white bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Licensed Medicines</p>
                <p className="text-sm text-gray-600">100% authentic and verified</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Fast Delivery</p>
                <p className="text-sm text-gray-600">Same-day delivery available</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-600">SSL encrypted transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header background */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          body {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          }
        }
      `}</style>
    </div>
  );
};
