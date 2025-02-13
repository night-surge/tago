import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import dynamic from 'next/dynamic';
import { revalidatePath } from 'next/cache';
import { verify } from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';
import AddLinkButton from './components/AddLinkButton';
import ThemeSelector from './components/ThemeSelector';

// Theme imports remain the same
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

interface ThemeProps {
  user: {
    name: string;
    tagline: string;
    links: string[];
    picture: string;
    isVerified: boolean;
  };
}

interface PageProps {
  params: {
    userName: string;
  };
}

// Verify the JWT token and return the payload if valid
const verifyAuth = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // Add debug logging
    // console.log('Cookie token:', token ? 'exists' : 'missing');

    if (!token) {
      return null;
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as TokenPayload;
    // console.log('Decoded token:', decoded);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Server actions with auth checks
async function addLink(userName: string, newLink: string) {
  'use server';

  const auth = await verifyAuth();
  console.log('Add Link Auth State:', auth);

  if (!auth || auth.userName !== userName) {
    console.log('Add Link Authorization failed:', { auth, userName });
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

    revalidatePath(`/${userName}`);
  } catch (error) {
    console.error('Add link error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to add link');
  }
}

async function updateTheme(userName: string, theme: number) {
  'use server';

  const auth = await verifyAuth();
  console.log('Update Theme Auth State:', auth);

  if (!auth || auth.userName !== userName) {
    console.log('Update Theme Authorization failed:', { auth, userName });
    throw new Error('Unauthorized');
  }

  if (!userName || !theme) {
    throw new Error('Username and theme are required');
  }

  try {
    await prisma.user.update({
      where: { userName },
      data: { theme },
    });

    revalidatePath(`/${userName}`);
  } catch (error) {
    console.error('Error updating theme:', error);
    throw new Error('Failed to update theme');
  }
}

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

    console.log('Fetched user data:', user);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data');
  }
}

export default async function UserPage({ params }: PageProps) {
  const { userName } = await params;
  const user = await getUserData(userName);

  if (!user) {
    notFound();
  }

  // Add debug logging for auth state
  const auth = await verifyAuth();
  const isOwner = auth?.userName === user.userName;

  // const headersList = await headers();
  // console.log('Page Auth state:', {
  //   auth,
  //   userName: user.userName,
  //   isOwner,
  //   userAgent: headersList.get('user-agent')
  // });

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
      {/* Theme Controls - Only shown to authenticated owner */}
      {isOwner && (
        <div className="
    fixed 
    top-0
    left-0
    w-full
    md:w-auto
    md:top-4 
    md:left-4 
    z-[99999]
    flex 
    flex-col 
    md:flex-row 
    gap-3
    bg-white/90
    md:bg-white/50 
    backdrop-blur-sm 
    p-4
    shadow-lg
    border-b
    md:border
    md:rounded-lg
  ">
          <div className="flex flex-row justify-center gap-3 w-full md:w-auto">
            <AddLinkButton
              addLink={addLink}
              userName={user.userName}
              themeNumber={user.theme}
            />
            <ThemeSelector
              currentTheme={user.theme}
              updateTheme={updateTheme}
              userName={user.userName}
            />
          </div>
        </div>
      )}

      {/* Theme Content */}
      <div className="w-full">
        <ThemeComponent {...themeProps} />
      </div>

      {/* Footer */}
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