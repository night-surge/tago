import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const prisma = new PrismaClient();
const jwtSecret: string = process.env.JWT_SECRET as string;

if (!process.env.JWT_SECRET) {
  throw new Error('Please add your JWT_SECRET to .env.local');
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { identifier, password } = body;

    // Validate required fields
    if (!identifier || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Find user by username or email (case-insensitive search)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { userName: { equals: identifier, mode: 'insensitive' } },
          { email: { equals: identifier.toLowerCase(), mode: 'insensitive' } }
        ]
      },
      select: {
        uid: true,
        userName: true,
        Name: true,
        links: true,
        profilePicture: true,
        email: true,
        password: true,
        isVerified: true,
        theme: true,
        Bio: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.uid,
        userName: user.userName,
        email: user.email,
        role: user.userName === 'admin' ? 'admin' : 'user'
      },
      jwtSecret
    );

    // Create a safe user object without password
    const safeUser = {
      ...user,
      password: undefined
    };

    // In your login API route
    return NextResponse.json(
      {
        message: 'Login successful',
        user: safeUser,
        token
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax` // Changed SameSite to Lax
        }
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Error logging in' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}