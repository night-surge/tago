import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { UserCog } from 'lucide-react';

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


interface ThemeProps {
  user: {
    name: string;
    tagline: string;
    links: string[];
    picture: string;
    isVerified: boolean;
  };
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
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data');
  }
}

export default async function UserPage(props: PageProps) {
  const { userName } = await props.params;
  const user = await getUserData(userName);

  if (!user) {
    notFound();
  }

  const ThemeComponent = themes[user.theme as keyof typeof themes];

  if (!ThemeComponent) {
    throw new Error(`Theme ${user.theme} not found`);
  }

  const themeProps: ThemeProps = {
    user: {
      name: user.Name,
      tagline: user.Bio[0] ?? "Hey there! I am using Tago.",
      links: user.links,
      picture: user.profilePicture,
      isVerified: user.isVerified,
    },
  };


  return (
    <main className="relative min-h-screen">
      {/* Login/Edit Button */}
      <div className="fixed top-4 left-4 z-[99999]">
        <Link href={`/${userName}/edit`} className="block rounded-full bg-black p-2">
          <UserCog className="w-4 h-4 text-white" />
        </Link>
      </div>

      <div className="w-full">
        <ThemeComponent {...themeProps} />
      </div>

      {user.isVerified && (
        <footer className="fixed bottom-4 right-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-blue-500"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Verified Profile
          </span>
        </footer>
      )}
    </main>
  );
}