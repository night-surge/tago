// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

dotenv.config();

const prisma = new PrismaClient();
const jwtSecret: string = process.env.JWT_SECRET as string;

if (!process.env.JWT_SECRET) {
  throw new Error('Please add your JWT_SECRET to .env.local');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, username, email, phone, password } = body;

    if (!name || !username || !email || !phone || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // todo - min character 8 , min 1 Upper Case Letter , min 1 Number
    // Check password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { 
          message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
        },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { userName: username },
          { email: email.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: existingUser.userName === username ? 
            'Username already taken' : 'Email already registered'
        },
        { status: 400 }
      );
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        userId: crypto.randomUUID(),
        userName: username,
        email: email.toLowerCase(),
        password: hashedPassword,
        links: [],
        profilePicture: undefined,
      }
    });

    // Generate email verification token
    const verificationToken = jwt.sign(
      { 
        userId: user.userId,
        email: user.email
      },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken}`;
    
    // Send verification email
    // todo - add email template
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email address',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to Our App!</h2>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
          <p>If the button doesn't work, you can also click this link:</p>
          <p>${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
        </div>
      `
    });

    // Generate auth token
    const token = jwt.sign(
      { userId: user.uid, userName: user.userName },
      jwtSecret,
      { expiresIn: '1d' }
    );

    // Remove password from response
    user.password = "_";


    return NextResponse.json(
      {
        message: 'User created successfully. Please check your email for verification.',
        token,
        user: user
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}