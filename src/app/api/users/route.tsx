// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Middleware has already handled authentication
    // We can now safely fetch all users
    
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