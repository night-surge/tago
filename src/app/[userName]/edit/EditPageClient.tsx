'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import AddLinkButton from '../components/AddLinkButton';
import ThemeSelector from '../components/ThemeSelector';

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
}

interface LinksListProps {
  links: string[];
  userName: string;
  onReorder: (fromIndex: number, toIndex: number) => Promise<void>;
  onDelete: (userName: string, index: number) => Promise<void>;
}

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

export default function EditPageClient({ user, addLink, deleteLink, reorderLinks, updateTheme }: EditPageClientProps) {
  const [links, setLinks] = useState(user.links);
  const [previewKey, setPreviewKey] = useState(0);

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    const newLinks = [...links];
    const [movedLink] = newLinks.splice(fromIndex, 1);
    newLinks.splice(toIndex, 0, movedLink);
    setLinks(newLinks);
    
    setPreviewKey(prev => prev + 1);
    await reorderLinks(user.userName, fromIndex, toIndex);
  };

  const handleDelete = async (userName: string, index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
    
    setPreviewKey(prev => prev + 1);
    await deleteLink(userName, index);
  };

  const handleAddLink = async (userName: string, newLink: string) => {
    await addLink(userName, newLink);
    setLinks([...links, newLink]);
    setPreviewKey(prev => prev + 1);
  };

  const handleThemeUpdate = async (userName: string, theme: number) => {
    await updateTheme(userName, theme);
    setPreviewKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white">Edit Profile</h1>
            <Link
              href={`/${user.userName}`}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <span>View Profile</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

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
                className="w-full h-[600px] bg-black"
                title="Profile Preview"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}