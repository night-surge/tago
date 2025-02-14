import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Email configuration
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

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    // Generate reset token even if user doesn't exist (to prevent email enumeration)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    if (user) {
      // Store hashed version of token
      const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: {
          resetToken: hashedToken,
          resetTokenExpiry
        }
      });

      // Send email
      const resetUrl = `/reset-password?token=${resetToken}`;
      
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      });
    }

    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive password reset instructions.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'Error processing password reset' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}