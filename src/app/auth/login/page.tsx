'use client';

import React, { useState, useEffect } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForm } from '@/components/auth/AuthForm';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { useAuth } from '@/hooks/useAuth';
import { DEMO_CREDENTIALS } from '@/constants/demo-credentials';

export default function LoginPage() {
  const { login, isLoading, error, clearError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  // Load demo credentials from session storage if available
  useEffect(() => {
    const demoEmail = sessionStorage.getItem('demoEmail');
    const demoPassword = sessionStorage.getItem('demoPassword');

    if (demoEmail && demoPassword) {
      // Auto-fill the form by triggering the form to read these values
      sessionStorage.removeItem('demoEmail');
      sessionStorage.removeItem('demoPassword');
    }
  }, []);

  const handleLogin = async (formData: Record<string, string>) => {
    try {
      setFormError(null);
      clearError();

      const email = formData.email?.trim();
      const password = formData.password;

      if (!email || !password) {
        setFormError('Email and password are required');
        return;
      }

      await login(email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setFormError(errorMessage);
    }
  };

  const handleDemoLogin = (type: 'admin') => {
    // Only admin demo login is available
    handleLogin({
      email: DEMO_CREDENTIALS.email,
      password: DEMO_CREDENTIALS.password,
    });
  };

  const displayError = formError || error?.message;

  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to your MediStore account"
      backLink={{
        href: '/',
        text: 'Back to Home',
      }}
      bottomLink={{
        text: "Don't have an account?",
        href: '/auth/register',
        linkText: 'Create one',
      }}
    >
      {/* Error message */}
      {displayError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400">{displayError}</p>
        </div>
      )}

      {/* Login Form */}
      <AuthForm
        fields={[
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
          },
        ]}
        submitLabel="Sign In"
        isLoading={isLoading}
        onSubmit={handleLogin}
      />

      {/* Forgot Password Link */}
      <div className="mt-4 text-right">
        <a
          href="/auth/forgot-password"
          className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition"
        >
          Forgot password?
        </a>
      </div>

      {/* Social Login */}
      <div className="mt-8">
        <SocialLoginButtons isLoading={isLoading} />
      </div>

      {/* Demo Credentials Section */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 text-center uppercase tracking-wide">Demo Credentials</p>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            disabled={isLoading}
            className="w-full px-4 py-2.5 text-sm font-medium border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            👨‍💼 Login as Admin Demo
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
          Email: {DEMO_CREDENTIALS.email}
        </p>
      </div>
    </AuthLayout>
  );
}
