// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('Authorization')
    console.log('Auth header:', authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    try {
      const token = authHeader.split(' ')[1] // Extract token
      const secret = process.env.JWT_SECRET

      if (!secret) {
        console.error('JWT_SECRET is not defined in environment variables')
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
      }

      const decoded = verify(token, secret) 
      console.log('Decoded token:', decoded)
      
      if (decoded !== 'admin') {
        return NextResponse.json({ error: 'Not authorized - Admin access required' }, { status: 403 })

      }
    } catch (error) {
      console.error('Error verifying token:', error)

      if (error instanceof TokenExpiredError) {
        return NextResponse.json({ error: 'Token expired' }, { status: 401 })
      } else if (error instanceof JsonWebTokenError) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
      }

      return NextResponse.json({ error: 'Authentication error' }, { status: 401 })
    }



  try {

    const users = await prisma.user.findMany({
      select: {
        uid: true,
        userName: true,
        Name: true,
        links: true,
        profilePicture: true,
        email: true,
        isVerified: true,
        theme: true,
        Bio: true,
        // Exclude password and reset token fields
      }
    });
    
    return NextResponse.json({ users });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    
    return NextResponse.json(
      { message: 'Server error' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Middleware has already handled admin authentication
    const userData = await request.json();
    
    // Update user data
    const updatedUser = await prisma.user.update({
      where: { uid: userData.uid },
      data: {
        userName: userData.userName,
        Name: userData.Name,
        links: userData.links,
        profilePicture: userData.profilePicture,
        Bio: userData.Bio,
        theme: userData.theme,
        isVerified: userData.isVerified,
        // Don't allow updating sensitive fields like password through this endpoint
      },
      select: {
        uid: true,
        userName: true,
        Name: true,
        links: true,
        profilePicture: true,
        email: true, 
        isVerified: true,
        theme: true,
        Bio: true,
      }
    });
    
    return NextResponse.json({ 
      message: 'User updated successfully',
      user: updatedUser
    });
    
  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error instanceof Error && error.name.includes('Prisma')) {
      // Handle Prisma-specific errors
      return NextResponse.json(
        { message: 'Database error: ' + error.message }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Server error' }, 
      { status: 500 }
    );
  }
}