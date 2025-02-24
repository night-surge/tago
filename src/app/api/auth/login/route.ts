// app/api/auth/login/route.ts
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
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Calculate expiration time (7 days)
    const expiresIn = '7d';
    const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds

    // Create token with uid (not userId)
    const token = jwt.sign(
      {
        uid: user.uid,
        userName: user.userName,
        email: user.email
      },
      jwtSecret,
      { expiresIn }
    );

    // Remove password from user object
    const safeUser = {
      ...user,
      password: undefined
    };

    // Return response with token in both body and cookie
    return NextResponse.json(
      {
        message: 'Login successful',
        user: safeUser,
        token
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax`
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