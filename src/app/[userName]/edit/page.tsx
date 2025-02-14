import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import dynamic from 'next/dynamic';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import EditPageClient from './EditPageClient';
import { addLink, deleteLink, reorderLinks, updateBio, updateTheme } from './actions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themes = {
  1: dynamic(() => import('@/components/themes/one')),
  2: dynamic(() => import('@/components/themes/two')),
  3: dynamic(() => import('@/components/themes/three')),
  4: dynamic(() => import('@/components/themes/four')),
  5: dynamic(() => import('@/components/themes/five')),
  6: dynamic(() => import('@/components/themes/six')),
  7: dynamic(() => import('@/components/themes/seven')),
  8: dynamic(() => import('@/components/themes/eight')),
  9: dynamic(() => import('@/components/themes/nine')),
} as const;

interface TokenPayload {
  userId: number;
  userName: string;
  email: string;
}

interface User {
  uid: number;
  userName: string;
  Name: string;
  links: string[];
  profilePicture: string;
  Bio: string[];
  theme: number;
  isVerified: boolean;
}

type PageProps = {
    params: Promise<{
      userName: string;
    }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  };

async function getUserData(userName: string): Promise<User | null> {
  if (!userName) {
    throw new Error('Username is required');
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userName },
      select: {
        uid: true,
        userName: true,
        Name: true,
        links: true,
        profilePicture: true,
        Bio: true,
        theme: true,
        isVerified: true,
      },
    });

    return user;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch user data');
  }
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

export default async function EditPage(props: PageProps) {
  const auth = await verifyAuth();
  const { userName } = await props.params;
  const user = await getUserData(userName);

  if (!user) {
    notFound();
  }

  if (!auth) {
    redirect('/login');
  }

  if (auth.userName !== user.userName) {
    redirect(`/${userName}`);
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <EditPageClient 
        user={user}
        addLink={addLink}
        deleteLink={deleteLink}
        reorderLinks={reorderLinks}
        updateTheme={updateTheme}
        updateBio={updateBio}
      />
    </div>
  );
}