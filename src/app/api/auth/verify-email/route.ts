import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const jwtSecret: string = process.env.JWT_SECRET as string;

if (!process.env.JWT_SECRET) {
  throw new Error('Please add your JWT_SECRET to .env.local');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body || !body.token) {
      return NextResponse.json(
        { message: 'Verification token is required' },
        { status: 400 }
      );
    }

    const { token } = body;

    // Verify the token and specify the correct payload type
    const decoded = jwt.verify(token, jwtSecret) as {
      uid: number;  // Changed from string to number to match your schema
      email: string;
      userName: string;
    };

    console.log('Decoded token:', decoded);

    // Find the user using uid (not userId)
    const user = await prisma.user.findUnique({
      where: { 
        uid: decoded.uid 
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { message: 'Email already verified' },
        { status: 400 }
      );
    }

    // Update user using uid (not userId)
    const updatedUser = await prisma.user.update({
      where: { 
        uid: decoded.uid 
      },
      data: { 
        isVerified: true 
      }
    });

    // Create a new auth token for the verified user
    const newToken = jwt.sign(
      {
        uid: updatedUser.uid,
        userName: updatedUser.userName,
        email: updatedUser.email
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      { 
        message: 'Email verified successfully',
        token: newToken,
        user: {
          ...updatedUser,
          password: undefined
        }
      },
      { 
        status: 200,
        headers: {
          'Set-Cookie': `token=${newToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`
        }
      }
    );

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { message: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    console.error('Email verification error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: 'Error verifying email' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}