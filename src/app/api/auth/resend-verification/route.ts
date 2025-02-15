
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { 
        email: email.toLowerCase() 
      },
      select: {
        uid: true,
        email: true,
        userName: true,
        Name: true,
        isVerified: true
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
        { message: 'Email is already verified' },
        { status: 400 }
      );
    }

    // Generate new verification token
    const verificationToken = jwt.sign(
      { 
        uid: user.uid,
        email: user.email,
        userName: user.userName
      },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Create verification URL
    const verificationUrl = `mytago.tech/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
    
    // Send verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email address',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to Tago, ${user.Name}!</h2>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
          <p>If the button doesn't work, you can also click this link:</p>
          <p>${verificationUrl}</p>
          <p>This verification link will expire in 24 hours.</p>
          <p>If you didn't create a Tago account, please ignore this email.</p>
        </div>
      `
    });

    return NextResponse.json(
      { message: 'Verification email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { message: 'Error sending verification email' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}