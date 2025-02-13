import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const userSelect = {
  uid: true,
  userName: true,
  Name: true,
  links: true,
  profilePicture: true,
  email: true,
  isVerified: true,
  theme: true,
  Bio: true
};

type UpdateUserInput = Partial<{
  Name: string;
  links: string[];
  profilePicture: string;
  email: string;
  theme: number;
  Bio: string[];
}>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type RouteContext = {
  params: Promise<{ userName: string }>;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userName: string }> }
) {
  try {
    const { userName } = await params;

    if (!userName) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
      select: userSelect,
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function HEAD(
  request: Request,
  { params }: { params: Promise<{ userName: string }> }
) {
  try {
    const { userName } = await params;
    const user = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
      select: { userName: true },
    });

    if (!user) {
      return new Response(null, { status: 404 });
    }

    return new Response(null, { status: 200 });

  } catch (error) {
    console.error('Error checking user:', error);
    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userName: string }> }
) {
  try {
    const { userName } = await params;
    
    if (!userName) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { userName },
      select: { userName: true }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updateData: UpdateUserInput = await request.json();

    const cleanedUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([, value]) => value !== undefined)
    );

    const updatedUser = await prisma.user.update({
      where: {
        userName,
      },
      data: cleanedUpdateData,
      select: userSelect,
    });

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}