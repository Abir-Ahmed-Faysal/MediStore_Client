'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'user' | 'admin' | 'vendor';
}

/**
 * ProtectedRoute component wraps pages that require authentication
 * 
 * Usage:
 * <ProtectedRoute requiredRole="admin">
 *   <AdminDashboardPage />
 * </ProtectedRoute>
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Allow time for auth to load from localStorage
      if (!isAuthenticated) {
        // Store intended destination for post-login redirect
        sessionStorage.setItem('intendedRoute', pathname);
        router.push('/auth/login');
      } else if (requiredRole && user?.role !== requiredRole) {
        // User doesn't have required role
        router.push('/unauthorized');
      } else {
        setIsChecking(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, requiredRole, router, pathname]);

  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

/**
 * Public Only Route - Redirects authenticated users away
 * 
 * Usage:
 * <PublicOnlyRoute>
 *   <LoginPage />
 * </PublicOnlyRoute>
 */
export const PublicOnlyRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        // Redirect to dashboard if already logged in
        router.push('/dashboard/user');
      } else {
        setIsChecking(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
