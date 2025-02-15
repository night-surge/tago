'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';
import AddLinkButton from '../components/AddLinkButton';
import ThemeSelector from '../components/ThemeSelector';
import Navbar from '@/components/EditPageNavbar';
import React from 'react';

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

interface EditPageClientProps {
  user: User;
  addLink: (userName: string, newLink: string) => Promise<void>;
  deleteLink: (userName: string, index: number) => Promise<void>;
  reorderLinks: (userName: string, fromIndex: number, toIndex: number) => Promise<void>;
  updateTheme: (userName: string, theme: number) => Promise<void>;
  updateBio: (userName: string, bio: string[]) => Promise<void>;
}

interface LinksListProps {
  links: string[];
  userName: string;
  onReorder: (fromIndex: number, toIndex: number) => Promise<void>;
  onDelete: (userName: string, index: number) => Promise<void>;
}

interface BioEditorProps {
  initialBio: string[];
  userName: string;
  updateBio: (userName: string, bio: string[]) => Promise<void>;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm';
  children: React.ReactNode;
  className?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Button = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-zinc-900 text-white hover:bg-zinc-800',
    outline: 'border border-zinc-800 hover:bg-zinc-800 hover:text-white'
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

const BioEditor = ({ initialBio, userName, updateBio }: BioEditorProps) => {
  const [bioLines, setBioLines] = useState<string[]>(initialBio);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddLine = () => {
    if (bioLines.length < 3) {
      setBioLines([...bioLines, '']);
      setIsEditing(true);
    }
  };

  const handleRemoveLine = (index: number) => {
    const newBioLines = bioLines.filter((_, i) => i !== index);
    setBioLines(newBioLines);
    setIsEditing(true);
  };

  const handleLineChange = (index: number, value: string) => {
    const newBioLines = [...bioLines];
    newBioLines[index] = value;
    setBioLines(newBioLines);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Filter out empty lines
      const filteredBio = bioLines.filter(line => line.trim() !== '');
      await updateBio(userName, filteredBio);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update bio:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Bio</h2>
        {bioLines.length < 3 && (
          <Button
            onClick={handleAddLine}
            variant="outline"
            size="sm"
            className="text-zinc-400 hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Line
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        {bioLines.map((line, index) => (
          <div key={index} className="flex gap-2">
            <Textarea
              value={line}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleLineChange(index, e.target.value)}
              className="flex-1 bg-black border-zinc-800 text-white resize-none"
              placeholder="Enter your bio"
              rows={2}
            />
            <Button
              onClick={() => handleRemoveLine(index)}
              variant="outline"
              size="sm"
              className="text-zinc-400 hover:text-white"
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {isEditing && (
        <Button
          onClick={handleSave}
          className="w-full bg-white text-black hover:bg-zinc-200"
        >
          Save Bio
        </Button>
      )}
    </div>
  );
};

function LinksList({ links, userName, onReorder, onDelete }: LinksListProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMoveUp = async (index: number) => {
    if (index > 0) {
      await onReorder(index, index - 1);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index < links.length - 1) {
      await onReorder(index, index + 1);
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        {links.map((link, index) => (
          <div
            key={index}
            className="flex flex-col bg-black border border-zinc-800 rounded-lg overflow-hidden"
          >
            <div className="p-3 flex items-center justify-between">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-zinc-300 truncate flex-1"
              >
                {link}
              </a>
              <button
                onClick={() => onDelete(userName, index)}
                className="p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex border-t border-zinc-800">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className={`flex-1 p-2 text-center ${
                  index === 0 ? 'text-zinc-600' : 'text-zinc-400 hover:text-white'
                } transition-colors border-r border-zinc-800`}
              >
                <ChevronUp className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === links.length - 1}
                className={`flex-1 p-2 text-center ${
                  index === links.length - 1 ? 'text-zinc-600' : 'text-zinc-400 hover:text-white'
                } transition-colors`}
              >
                <ChevronDown className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop version with drag and drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.classList.add('bg-zinc-900');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('bg-zinc-900');
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('bg-zinc-900');
    
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== dropIndex) {
      await onReorder(dragIndex, dropIndex);
    }
  };

  return (
    <div className="space-y-2">
      {links.map((link, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          className="flex items-center justify-between p-3 bg-black border border-zinc-800 rounded-lg transition-all hover:border-zinc-700"
        >
          <div className="cursor-move p-2">
            <svg className="w-4 h-4 text-zinc-500" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-2 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10-14a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-2 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm2 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-2 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              />
            </svg>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-zinc-300 truncate flex-1"
          >
            {link}
          </a>
          <button
            onClick={() => onDelete(userName, index)}
            className="p-2 text-zinc-500 hover:text-white transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default function EditPageClient({ user, addLink, deleteLink, reorderLinks, updateTheme, updateBio }: EditPageClientProps) {
  const [links, setLinks] = useState(user.links);
  const [previewKey, setPreviewKey] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Decode token and verify user
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        
        // Verify token expiration
        const currentTime = Math.floor(Date.now() / 1000);
        if (tokenData.exp && tokenData.exp < currentTime) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        // Check if logged-in user matches the profile owner
        if (tokenData.userName !== user.userName) {
          router.push(`/${user.userName}`);
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user.userName, router]);

  

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const newLinks = [...links];
      const [movedLink] = newLinks.splice(fromIndex, 1);
      newLinks.splice(toIndex, 0, movedLink);
      setLinks(newLinks);
      
      setPreviewKey(prev => prev + 1);
      await reorderLinks(user.userName, fromIndex, toIndex);
    } catch (error) {
      console.error('Error reordering links:', error);
      setLinks([...user.links]);
    }
  };

  const handleDelete = async (userName: string, index: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const newLinks = [...links];
      newLinks.splice(index, 1);
      setLinks(newLinks);
      
      setPreviewKey(prev => prev + 1);
      await deleteLink(userName, index);
    } catch (error) {
      console.error('Error deleting link:', error);
      setLinks([...user.links]);
    }
  };

  const handleAddLink = async (userName: string, newLink: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      await addLink(userName, newLink);
      setLinks([...links, newLink]);
      setPreviewKey(prev => prev + 1);
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  const handleThemeUpdate = async (userName: string, theme: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      await updateTheme(userName, theme);
      setPreviewKey(prev => prev + 1);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">You are not authorized to view this page.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black border border-zinc-800 p-6 rounded-lg">
              <h2 className="text-lg font-medium text-white mb-4">Theme</h2>
              <ThemeSelector
                currentTheme={user.theme}
                updateTheme={handleThemeUpdate}
                userName={user.userName}
              />
            </div>

            <div className="bg-black border border-zinc-800 p-6 rounded-lg">
              <BioEditor
                initialBio={user.Bio}
                userName={user.userName}
                updateBio={updateBio}
              />
            </div>

            <div className="bg-black border border-zinc-800 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-white">Links</h2>
                <AddLinkButton
                  addLink={handleAddLink}
                  userName={user.userName}
                  themeNumber={user.theme}
                />
              </div>
              <LinksList
                links={links}
                userName={user.userName}
                onReorder={handleReorder}
                onDelete={handleDelete}
              />
            </div>
          </div>

          <div className="bg-black border border-zinc-800 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-white mb-4">Preview</h2>
            <div className="border border-zinc-800 rounded-lg overflow-hidden">
              <iframe
                key={previewKey}
                src={`/${user.userName}`}
                className="w-full h-[600px] bg-black pointer-events-none select-none"
                title="Profile Preview"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}