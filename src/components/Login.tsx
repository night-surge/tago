"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BackgroundGrid from './BackgroundGrid';
import PasswordInput from './PasswordInput';

const Login = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
          // Optional: Verify token validity with your backend
          // const response = await fetch('/api/auth/verify', {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          // if (response.ok) {
          const userData = JSON.parse(user);
          router.push(`/${userData.userName}`);
          return;
          // }
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

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

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      
      router.push(`/${result.user.userName}/edit`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <BackgroundGrid>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </BackgroundGrid>
    );
  }

  return (
    <BackgroundGrid>
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-black p-8 rounded-xl border border-white/10">
          <div>
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Welcome Back
            </h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-300">
                Username or Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                className="mt-1 block w-full rounded-md bg-black border border-white/20 
                         text-white px-3 py-2 focus:border-white focus:ring-1 focus:ring-white
                         outline-none"
                placeholder="username or email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <PasswordInput id="password" name="password" required />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-white rounded-md 
                       shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="text-center">
            <Link
              href="/signup"
              className="text-white/60 hover:text-white text-sm transition-colors duration-200"
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