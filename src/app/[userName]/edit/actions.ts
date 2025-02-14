import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface TokenPayload {
  userId: number;
  userName: string;
  email: string;
}

// Verify the JWT token and return the payload if valid
const verifyAuth = async () => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export async function addLink(userName: string, newLink: string) {
  'use server';

  const auth = await verifyAuth();

  if (!auth || auth.userName !== userName) {
    throw new Error('Unauthorized');
  }

  if (!userName || !newLink) {
    throw new Error('Username and link are required');
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userName },
      select: { links: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    try {
      const url = new URL(newLink);
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Only HTTP and HTTPS protocols are allowed');
      }
    } catch {
      throw new Error('Please enter a valid URL (e.g., https://example.com)');
    }

    await prisma.user.update({
      where: { userName },
      data: {
        links: [...user.links, newLink],
      },
    });

    revalidatePath(`/${userName}/edit`);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to add link');
  }
}

export async function deleteLink(userName: string, linkIndex: number) {
  'use server';

  const auth = await verifyAuth();

  if (!auth || auth.userName !== userName) {
    throw new Error('Unauthorized');
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userName },
      select: { links: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const updatedLinks = [...user.links];
    updatedLinks.splice(linkIndex, 1);

    await prisma.user.update({
      where: { userName },
      data: {
        links: updatedLinks,
      },
    });

    revalidatePath(`/${userName}/edit`);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to delete link');
  }
}

export async function reorderLinks(userName: string, fromIndex: number, toIndex: number) {
  'use server';

  const auth = await verifyAuth();

  if (!auth || auth.userName !== userName) {
    throw new Error('Unauthorized');
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userName },
      select: { links: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const updatedLinks = [...user.links];
    const [movedLink] = updatedLinks.splice(fromIndex, 1);
    updatedLinks.splice(toIndex, 0, movedLink);

    await prisma.user.update({
      where: { userName },
      data: {
        links: updatedLinks,
      },
    });

    revalidatePath(`/${userName}/edit`);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to reorder links');
  }
}

export async function updateBio(userName: string, bio: string[]) {
  'use server';

  const auth = await verifyAuth();

  if (!auth || auth.userName !== userName) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.user.update({
      where: { userName },
      data: { Bio: bio },
    });

    revalidatePath(`/${userName}/edit`);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update bio');
  }
}

export async function updateTheme(userName: string, theme: number) {
  'use server';

  const auth = await verifyAuth();

  if (!auth || auth.userName !== userName) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.user.update({
      where: { userName },
      data: { theme },
    });

    revalidatePath(`/${userName}/edit`);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update theme');
  }
}