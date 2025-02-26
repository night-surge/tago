import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error('JWT_SECRET environment variable is not set');
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
    let token=null
    if (user.userName ==='admin'){
      console.log('admin user logging in, returning token')
      token=jwt.sign("admin",jwtSecret)
    } else{
    // Create JWT token
    token = jwt.sign(
      {
        uid: user.uid,
        userName: user.userName,
        email: user.email,
        role: user.userName === 'admin' ? 'admin' : 'user'
      },
      jwtSecret
    );

    const safeUser = {
      ...user,
      password: undefined
    };

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    return NextResponse.json(
      {
        message: 'Login successful',
        user: safeUser,
        token
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; Expires=${expirationDate.toUTCString()}; SameSite=Lax; Secure`
        }
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}