"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import BackgroundGrid from './BackgroundGrid';

interface VerifyResponse {
  message: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

type VerificationStatus = 'initial' | 'loading' | 'success' | 'error' | 'resending' | 'redirecting';

const VerifyEmail = () => {
  const [status, setStatus] = useState<VerificationStatus>('initial');
  const [message, setMessage] = useState('Please check your email for a verification link.');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        setStatus('loading');
        setMessage('Verifying your email address...');

        try {
          const response = await axios.post<VerifyResponse>(
            `mytago.tech/api/auth/verify-email`,
            { token }
          );
          setStatus('success');
          setMessage(response.data.message || 'Email verified successfully!');
          
          // Show redirecting state
          setTimeout(() => {
            setStatus('redirecting');
            setMessage('Redirecting to login...');
          }, 1500);

          // Actual redirect after showing the redirecting state
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } catch (error) {
          const apiError = error as ApiError;
          setStatus('error');
          setMessage(apiError.response?.data?.message || 'Failed to verify email. Please try again.');
        }
      };

      verifyEmail();
    }
  }, [token, router]);

  const handleResendVerification = async () => {
    if (!email || resendCooldown > 0) return;

    setStatus('resending');
    try {
      await axios.post<VerifyResponse>(
        `mytago.tech/api/auth/resend-verification`,
        { email }
      );
      setMessage('Verification email sent successfully! Please check your inbox.');
      setStatus('initial');
      
      // Start cooldown
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((current) => {
          if (current <= 1) {
            clearInterval(interval);
            return 0;
          }
          return current - 1;
        });
      }, 1000);
    } catch (error) {
      const apiError = error as ApiError;
      setStatus('error');
      setMessage(apiError.response?.data?.message || 'Failed to resend verification email.');
    }
  };

  const shouldShowResendButton = ['initial', 'error'].includes(status) && email;
  const isResendDisabled = resendCooldown > 0 || status === 'resending';

  return (
    <BackgroundGrid>
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-black p-8 rounded-xl border border-white/10">
          <div className="text-center">
            {(status === 'loading' || status === 'redirecting') && (
              <div className="mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              </div>
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

            {['initial', 'resending'].includes(status) && (
              <div className="mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 border border-blue-500/50 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}

            <h2 className="text-3xl font-bold text-white mb-4">
              Email Verification
            </h2>
            
            {email && ['initial', 'resending'].includes(status) && (
              <p className="text-white/80 mb-4">
                Verification email sent to: <span className="font-semibold">{email}</span>
              </p>
            )}
            
            <p className={`text-lg ${
              status === 'success' ? 'text-green-500' : 
              status === 'error' ? 'text-red-500' : 
              status === 'redirecting' ? 'text-white' :
              ['initial', 'resending'].includes(status) ? 'text-blue-500' :
              'text-white'
            }`}>
              {message}
            </p>

            {shouldShowResendButton && (
              <div className="mt-8 space-y-4">
                <button
                  onClick={handleResendVerification}
                  disabled={isResendDisabled}
                  className={`w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md
                    ${isResendDisabled 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                >
                  {status === 'resending' 
                    ? 'Sending...' 
                    : resendCooldown > 0 
                      ? `Resend available in ${resendCooldown}s` 
                      : 'Resend verification email'}
                </button>

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