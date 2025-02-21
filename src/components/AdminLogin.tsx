"use client"
import React, { useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import BackgroundGrid from './BackgroundGrid';
import PasswordInput from './PasswordInput';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" 
           role="status" 
           aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const Login = () => {
  const [error, setError] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('admin-token');
        const user = localStorage.getItem('admin-user');

        if (token && user) {
          redirect(`/admin/dashboard`);

        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-user');
      } finally {
        setIsInitialLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Invalid credentials');
      }

      localStorage.setItem('admin-token', result.token);


      router.replace(`/admin/dashboard`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BackgroundGrid>
      <div className="relative flex h-[85vh] items-center justify-center p-4">
        <div className={`w-full max-w-md space-y-8 bg-black p-8 rounded-xl border border-white/10 
          ${isInitialLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <h2 className="text-3xl font-semibold text-center text-white mb-8 font-poppins">
              ADMIN LOGIN
            </h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-300">
                Username or Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                disabled={isInitialLoading || isSubmitting}
                className="mt-1 block w-full rounded-md bg-black border border-white/20 
                         text-white px-3 py-2 focus:border-white focus:ring-1 focus:ring-white
                         outline-none disabled:opacity-50"
                placeholder="Username or Email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <PasswordInput 
                id="password" 
                name="password" 
                required 
                disabled={isInitialLoading || isSubmitting}
              />
            </div>

            <div className="text-center mt-4">
              <Link
                href="/forgot-password"
                className={`text-white/60 hover:text-white text-sm transition-colors duration-200 
                  ${(isInitialLoading || isSubmitting) ? 'pointer-events-none opacity-50' : ''}`}
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isInitialLoading || isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-white rounded-md 
                       shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isInitialLoading ? <LoadingSpinner /> : isSubmitting ? <LoadingSpinner /> : 'Sign In'}
            </button>
          </form>
          
          <div className="text-center">
            <Link
              href="/signup"
              className={`text-white/60 hover:text-white text-sm transition-colors duration-200
                ${(isInitialLoading || isSubmitting) ? 'pointer-events-none opacity-50' : ''}`}
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </BackgroundGrid>
  );
};

export default Login;