import { verify } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JWTPayload {
  userId: number;  
  iat?: number;
  exp?: number;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    if (!JWT_SECRET) {
      throw new AuthError('Server configuration error: JWT_SECRET is not configured');
    }

    try {
      const decoded = verify(token, JWT_SECRET) as JWTPayload;
      
      // Check if userId exists and is a number
      if (typeof decoded.userId !== 'number') {
        throw new AuthError('Token missing or invalid userId in payload');
      }

      return decoded;
    } catch (error) {
      if (error instanceof Error) {
        throw new AuthError(`Token verification failed: ${error.message}`);
      }
      throw new AuthError('Token verification failed');
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Invalid token');
  }
}

export async function getTokenFromHeader(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader) {
    throw new AuthError('Authorization header is missing');
  }

  const parts = authHeader.split(' ');
  
  if (parts.length !== 2) {
    throw new AuthError('Authorization header must be in format: Bearer <token>');
  }

  const [bearer, token] = parts;
  
  if (bearer.toLowerCase() !== 'bearer') {
    throw new AuthError('Authorization header must start with Bearer');
  }

  if (!token || token.length < 10) {
    throw new AuthError('Token is missing or too short');
  }

  return token;
}