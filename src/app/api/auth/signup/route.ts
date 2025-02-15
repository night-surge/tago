import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

dotenv.config();

const prisma = new PrismaClient();
const jwtSecret: string = process.env.JWT_SECRET as string;

if (!jwtSecret) {
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
    if (!body || typeof body !== 'object') {
      console.error("Invalid request body:", body);
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
    }

    const { name, username, email, contact, password } = body;

    console.log("Received signup request:", { name, username, email, contact });

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { message: 'Name, username, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
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

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user according to schema
    const user = await prisma.user.create({
      data: {
        userName: username,
        Name: name,
        email: email.toLowerCase(),
        password: hashedPassword,
        links: [],
        Bio: ["Hey there! I am using Tago."],
        theme: 1,
        isVerified: false,
        profilePicture: "https://ia801307.us.archive.org/1/items/instagram-plain-round/instagram%20dip%20in%20hair.jpg"
      }
    });

    console.log("Created user:", { ...user, password: '[REDACTED]' });

    if (!user || !user.uid) {
      console.error("User creation failed");
      return NextResponse.json({ message: "User creation failed" }, { status: 500 });
    }

    // Create verification payload
    const verificationPayload = {
      uid: user.uid,
      email: user.email,
      userName: user.userName
    };

    console.log("Verification payload:", verificationPayload);

    const verificationToken = jwt.sign(
      verificationPayload,
      jwtSecret,
      { expiresIn: '24h' }
    );

    const verificationUrl = `/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Tago - Verify Your Email',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to Tago, ${name}!</h2>
          <p>Thank you for joining us. Please verify your email address by clicking the button below:</p>
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

    // Create auth payload
    const authPayload = {
      uid: user.uid,
      userName: user.userName,
      email: user.email
    };

    console.log("Auth payload:", authPayload);

    const token = jwt.sign(
      authPayload,
      jwtSecret,
      { expiresIn: '2h' }
    );

    const safeUser = {
      ...user,
      password: undefined
    };

    return NextResponse.json(
      {
        message: 'Account created successfully. Please check your email for verification.',
        token,
        user: safeUser
      },
      { 
        status: 201,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`
        }
      }
    );

  } catch (error) {
    console.error('Signup error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: 'Error creating account' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}