'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Types for authentication
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'vendor';
  avatar?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

interface UseAuthReturn {
  // State
  user: AuthUser | null;
  isLoading: boolean;
  error: AuthError | null;
  isAuthenticated: boolean;

  // Methods
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  clearError: () => void;
  setDemoCredentials: (type: 'user' | 'admin') => void;
}

export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Verify token is still valid
          // In production: call /api/auth/verify endpoint
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      // In production: call real API endpoint
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });

      // Demo implementation
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // Mock successful response
      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          name: 'Demo User',
          email,
          role: 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        },
        token: 'mock-jwt-token-' + Date.now(),
      };

      // Store in localStorage
      localStorage.setItem('authToken', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));

      setUser(mockResponse.user);
      
      // Redirect to dashboard
      router.push('/dashboard/user');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError({ message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Register
  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      if (name.length < 2) {
        throw new Error('Name must be at least 2 characters');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      // In production: call real API endpoint
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // });

      // Demo implementation
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // Mock successful response
      const mockResponse: AuthResponse = {
        user: {
          id: Date.now().toString(),
          name,
          email,
          role: 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        },
        token: 'mock-jwt-token-' + Date.now(),
      };

      // Store in localStorage
      localStorage.setItem('authToken', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));

      setUser(mockResponse.user);

      // Redirect to dashboard
      router.push('/dashboard/user');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError({ message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Logout
  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      // In production: call /api/auth/logout endpoint
      // await fetch('/api/auth/logout', { method: 'POST' });

      // Demo implementation
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      setUser(null);
      setError(null);

      // Redirect to login
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Forgot Password
  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email');
      }

      // In production: call /api/auth/forgot-password endpoint
      // await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // Demo implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setError({
        message: `Password reset email would be sent to ${email}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email';
      setError({ message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reset Password
  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!token || !newPassword) {
        throw new Error('Token and new password are required');
      }

      if (newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      // In production: call /api/auth/reset-password endpoint
      // await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, newPassword }),
      // });

      // Demo implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to login
      router.push('/auth/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
      setError({ message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Set demo credentials
  const setDemoCredentials = useCallback((type: 'user' | 'admin') => {
    if (type === 'admin') {
      // Auto-fill admin credentials
      const adminEmail = 'admin@medistore.com';
      const adminPassword = 'Admin@123456';

      // Store temporarily for form to pick up
      sessionStorage.setItem('demoEmail', adminEmail);
      sessionStorage.setItem('demoPassword', adminPassword);

      setError({
        message: 'Demo credentials set. Email: admin@medistore.com, Password: Admin@123456',
      });
    } else {
      // Auto-fill user credentials
      const userEmail = 'user@medistore.com';
      const userPassword = 'User@123456';

      sessionStorage.setItem('demoEmail', userEmail);
      sessionStorage.setItem('demoPassword', userPassword);

      setError({
        message: 'Demo credentials set. Email: user@medistore.com, Password: User@123456',
      });
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    clearError,
    setDemoCredentials,
  };
};
