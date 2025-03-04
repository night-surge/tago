import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from 'jsonwebtoken';

// Helper function to verify admin token
const verifyAdminToken = (req: Request) => {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (_) {
    return null;
  }
};

// GET all users
export async function GET(req: Request) {
  try {
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        uid: true,
        userName: true,
        Name: true,
        email: true,
        isVerified: true,
        theme: true,
        profilePicture: true,
        links: true,
        Bio: true,
      },
    });

    return NextResponse.json(users);
  } catch (_) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(req: Request) {
  try {
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { uid } = await req.json();

    const deletedUser = await prisma.user.delete({
      where: { uid },
    });

    return NextResponse.json(deletedUser);
  } catch (_) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// UPDATE user
export async function PATCH(req: Request) {
  try {
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { uid, ...updateData } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { uid },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (_) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 