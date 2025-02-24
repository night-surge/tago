/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/authUtils.ts
"use client"

/**
 * @param {string} token - JWT token to validate
 * @returns {boolean} - Whether the token is valid
 */
export const isTokenValid = (token: string): boolean => {
  if (!token) return false;
  
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    );
    
    // Check if token is expired
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    
    return currentTime < expirationTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

/**
 */
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optional: redirect to login page
    window.location.href = '/login';
  }
};

/**
 * @param {string} token - JWT token
 * @param {Object} user - User data object
 */
export const saveAuthData = (token: string, user: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

/**
 * @param {string} token - JWT token to verify
 * @returns {Promise<{valid: boolean, user?: any}>} - Verification result
 */
export const verifyTokenWithServer = async (token: string): Promise<{valid: boolean, user?: any}> => {
  try {
    const response = await fetch('/api/auth/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      return { valid: false };
    }

    const data = await response.json();
    return { valid: true, user: data.user };
  } catch (error) {
    console.error('Server token verification failed:', error);
    return { valid: false };
  }
};

/**
 * @returns {Promise<{isAuthenticated: boolean, user: any | null}>} - Auth status and user data
 */
export const checkAuthStatus = async (): Promise<{isAuthenticated: boolean, user: any | null}> => {
  try {
    if (typeof window === 'undefined') {
      return { isAuthenticated: false, user: null };
    }
    
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    if (!token || !userJson) {
      return { isAuthenticated: false, user: null };
    }
    
    if (!isTokenValid(token)) {
      logout();
      return { isAuthenticated: false, user: null };
    }
    
    const user = JSON.parse(userJson);
    
    const { valid } = await verifyTokenWithServer(token);
    if (!valid) {
      logout();
      return { isAuthenticated: false, user: null };
    }
    
    return { isAuthenticated: true, user };
  } catch (error) {
    console.error('Auth check error:', error);
    logout();
    return { isAuthenticated: false, user: null };
  }
};