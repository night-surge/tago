"use client"
import React, { useState } from 'react';
import BackgroundGrid from './BackgroundGrid';
import Link from 'next/link';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage('If an account exists with this email, you will receive password reset instructions.');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundGrid>
      <div className="relative flex h-[85vh] items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-black p-8 rounded-xl border border-white/10">
          <div>
            <h2 className="text-3xl font-semibold text-center text-white mb-8 font-poppins">
              Reset Password
            </h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-2 rounded">
              {message}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md bg-black border border-white/20 
                         text-white px-3 py-2 focus:border-white focus:ring-1 focus:ring-white
                         outline-none"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-white rounded-md 
                       shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="text-center">
            <Link
              href="/login"
              className="text-white/60 hover:text-white text-sm transition-colors duration-200"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </BackgroundGrid>
  );
};

export default ForgotPassword;