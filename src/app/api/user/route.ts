import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

interface JWTPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

async function authenticateRequest(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new Error('Missing token');
    }

    const decoded = verify(token, JWT_SECRET) as JWTPayload;
    
    const user = await prisma.user.findFirst({
      where: { uid: decoded.userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Authentication failed');
  }
}

// GET /api/links - Get all links for a user
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);

    return NextResponse.json({ links: user.links });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 401 }
    );
  }
}

// POST /api/links - Add a new link
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    const { link } = await request.json();

    if (!link || typeof link !== 'string') {
      return NextResponse.json({ error: 'Invalid link format' }, { status: 400 });
    }

    try {
      new URL(link);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    if (user.links.includes(link)) {
      return NextResponse.json({ error: 'Link already exists' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { uid: user.uid },
      data: {
        links: {
          push: link
        }
      }
    });

    return NextResponse.json({
      message: 'Link added successfully',
      links: updatedUser.links
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 401 }
    );
  }
}

// PATCH /api/links - Update a link
export async function PATCH(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    const { oldLink, newLink } = await request.json();

    if (!oldLink || !newLink || typeof oldLink !== 'string' || typeof newLink !== 'string') {
      return NextResponse.json({ error: 'Invalid link format' }, { status: 400 });
    }

    try {
      new URL(newLink);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    if (!user.links.includes(oldLink)) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    if (user.links.includes(newLink) && oldLink !== newLink) {
      return NextResponse.json({ error: 'New link already exists' }, { status: 400 });
    }

    const updatedLinks = user.links.map(link => 
      link === oldLink ? newLink : link
    );

    const updatedUser = await prisma.user.update({
      where: { uid: user.uid },
      data: {
        links: updatedLinks
      }
    });

    return NextResponse.json({
      message: 'Link updated successfully',
      links: updatedUser.links
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 401 }
    );
  }
}

// DELETE /api/links - Delete a link
export async function DELETE(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    const { link } = await request.json();

    if (!link || typeof link !== 'string') {
      return NextResponse.json({ error: 'Invalid link format' }, { status: 400 });
    }

    if (!user.links.includes(link)) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    const updatedLinks = user.links.filter(l => l !== link);

    const updatedUser = await prisma.user.update({
      where: { uid: user.uid },
      data: {
        links: updatedLinks
      }
    });

    return NextResponse.json({
      message: 'Link deleted successfully',
      links: updatedUser.links
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 401 }
    );
  }
}