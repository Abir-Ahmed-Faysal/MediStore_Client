'use client';

import React, { useState } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForm } from '@/components/auth/AuthForm';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const { register, isLoading, error, clearError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleRegister = async (formData: Record<string, string>) => {
    try {
      setFormError(null);
      clearError();

      const name = formData.name?.trim();
      const email = formData.email?.trim();
      const password = formData.password;
      const confirmPassword = formData.confirmPassword;

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        setFormError('All fields are required');
        return;
      }

      if (name.length < 2) {
        setFormError('Name must be at least 2 characters');
        return;
      }

      if (!email.includes('@')) {
        setFormError('Please enter a valid email');
        return;
      }

      if (password.length < 8) {
        setFormError('Password must be at least 8 characters');
        return;
      }

      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        setPasswordsMatch(false);
        return;
      }

      setPasswordsMatch(true);

      await register(name, email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setFormError(errorMessage);
    }
  };

  const displayError = formError || error?.message;

  return (
    <AuthLayout
      title="Create Account"
      description="Join MediStore and start shopping for medicines"
      backLink={{
        href: '/',
        text: 'Back to Home',
      }}
      bottomLink={{
        text: 'Already have an account?',
        href: '/auth/login',
        linkText: 'Sign in',
      }}
    >
      {/* Error message */}
      {displayError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400">{displayError}</p>
        </div>
      )}

      {/* Success message placeholder */}
      {/* {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )} */}

      {/* Register Form */}
      <AuthForm
        fields={[
          {
            name: 'name',
            label: 'Full Name',
            type: 'text',
            required: true,
          },
          {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            required: true,
          },
          {
            name: 'password',
            label: 'Password',
            type: 'password',
            required: true,
            validation: (value: string) => {
              if (value.length < 8) {
                return 'Password must be at least 8 characters';
              }
              if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
              }
              if (!/[0-9]/.test(value)) {
                return 'Password must contain at least one number';
              }
              return null;
            },
          },
          {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            required: true,
            validation: (value: string) => {
              // This would need access to password field - basic validation here
              return null;
            },
          },
        ]}
        submitLabel="Create Account"
        isLoading={isLoading}
        onSubmit={handleRegister}
      />

      {/* Terms and Conditions */}
      <div className="mt-4 text-xs text-gray-600">
        <p>
          By creating an account, you agree to our{' '}
          <a href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Social Registration */}
      <div className="mt-8">
        <SocialLoginButtons isLoading={isLoading} />
      </div>

      {/* Features Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-3 text-center font-medium">WHY JOIN MEDISTORE?</p>
        <ul className="space-y-2 text-xs text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Access to exclusive healthcare products</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Safe and secure online transactions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Fast and reliable delivery to your door</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>24/7 customer support and guidance</span>
          </li>
        </ul>
      </div>
    </AuthLayout>
  );
}
