// app/api/auth/verify-email/route.ts
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
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string;
      email: string;
    };

    // Find and update the user
    const user = await prisma.user.findUnique({
      where: { userId: decoded.userId }
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

    await prisma.user.update({
      where: { userId: decoded.userId },
      data: { isVerified: true }
    });

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { message: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    console.error('Email verification error:', error);
    return NextResponse.json(
      { message: 'Error verifying email' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}