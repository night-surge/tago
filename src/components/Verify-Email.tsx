"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import BackgroundGrid from './BackgroundGrid';

interface VerifyResponse {
    message: string;
  }

const VerifyEmail = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email address...');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. Please request a new one.');
        return;
      }

      try {
        const response = await axios.post<VerifyResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email`, { token });
        setStatus('success');
        setMessage(response.data.message || 'Email verified successfully!');
        
        // Automatically redirect to login after successful verification
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Failed to verify email. Please try again.');
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <BackgroundGrid>
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-black p-8 rounded-xl border border-white/10">
          <div className="text-center">
            {status === 'loading' && (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            )}
            
            {status === 'success' && (
              <div className="mb-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 border border-green-500/50 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            
            {status === 'error' && (
              <div className="mb-4">
                <div className="h-12 w-12 rounded-full bg-red-500/10 border border-red-500/50 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            )}

            <h2 className="text-3xl font-bold text-white mb-4">
              Email Verification
            </h2>
            
            <p className={`text-lg ${
              status === 'success' ? 'text-green-500' : 
              status === 'error' ? 'text-red-500' : 
              'text-white'
            }`}>
              {message}
            </p>

            {status === 'error' && (
              <div className="mt-8">
                <button
                  onClick={() => router.push('/signup')}
                  className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                >
                  Return to Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </BackgroundGrid>
  );
};

export default VerifyEmail;