// utils/authUtils.ts
"use client"

/**
 * Checks if a token is valid and not expired
 * @param {string} token - JWT token to validate
 * @returns {boolean} - Whether the token is valid
 */
export const isTokenValid = (token: string): boolean => {
  if (!token) return false;
  
  try {
    // Get token payload without verifying signature
    // This is just to check expiration client-side
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
 * Handles user logout by clearing auth data
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
 * Saves authentication data to localStorage
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
 * Verifies token with the server
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
 * Checks authentication status
 * @returns {Promise<{isAuthenticated: boolean, user: any | null}>} - Auth status and user data
 */
export const checkAuthStatus = async (): Promise<{isAuthenticated: boolean, user: any | null}> => {
  try {
    if (typeof window === 'undefined') {
      return { isAuthenticated: false, user: null };
    }
    
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    // No token or user data - not authenticated
    if (!token || !userJson) {
      return { isAuthenticated: false, user: null };
    }
    
    // Check client-side if token is valid (expiration check)
    if (!isTokenValid(token)) {
      logout();
      return { isAuthenticated: false, user: null };
    }
    
    // Parse user data
    const user = JSON.parse(userJson);
    
    // Optionally verify with server
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