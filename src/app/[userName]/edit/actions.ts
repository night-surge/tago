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

// Validate different link types
const validateLink = (link: string): boolean => {
  // Check if it's an email
  if (link.startsWith('mailto:')) {
    const email = link.substring(7);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // Check if it's a phone/contact
  if (link.startsWith('tel:')) {
    const phone = link.substring(4);
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
  }
  
  // Check if URL (including Google Maps)
  try {
    const url = new URL(link);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
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

    // Format link if needed
    let formattedLink = newLink;
    
    // Add protocol for email if not present
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newLink) && !newLink.startsWith('mailto:')) {
      formattedLink = `mailto:${newLink}`;
    }
    
    // Add protocol for phone if not present
    if (/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(newLink) && !newLink.startsWith('tel:')) {
      formattedLink = `tel:${newLink}`;
    }
    
    // Format Google Maps link if needed (handles coordinates format)
    if (/^-?\d+\.\d+,-?\d+\.\d+$/.test(newLink)) {
      formattedLink = `https://www.google.com/maps?q=${newLink}`;
    }

    // Validate link
    if (!validateLink(formattedLink)) {
      throw new Error('Please enter a valid URL, email address, phone number, or map coordinates');
    }

    await prisma.user.update({
      where: { userName },
      data: {
        links: [...user.links, formattedLink],
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