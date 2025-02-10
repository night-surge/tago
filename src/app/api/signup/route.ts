
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const mongoURI = process.env.NEXT_PUBLIC_MONGODB_URI;

export async function POST(req: Request) {
  try {
    await connectDB();

    // Parse the request body
    const body = await req.json();
    const { name, username, email, phone, password } = body;

    if (!name || !username || !email || !phone || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

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
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: existingUser.username === username ? 
            'Username already taken' : 'Email already registered'
        },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      name,
      username,
      email,
      phone,
      password,
      links: []
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET!, // Make sure to set this in .env
      { expiresIn: '1d' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        message: 'User created successfully',
        token,
        user: userResponse
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
}