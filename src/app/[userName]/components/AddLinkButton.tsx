'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddLinkButtonProps {
  addLink: (userName: string, link: string) => Promise<void>;
  userName: string;
  themeNumber: number;
}

export default function AddLinkButton({ addLink, userName }: AddLinkButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addLink(userName, link);
      setLink('');
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to add link:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 rounded-lg border border-zinc-800 text-white hover:border-white transition-all duration-300"
      >
        Add Link
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/80">
          <div className="bg-black border border-zinc-800 p-6 w-full max-w-md mx-auto rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">Add New Link</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter URL..."
                className="w-full px-4 py-2 rounded-lg bg-black border border-zinc-800 text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
                required
              />
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-black transition-all duration-200 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white"
                >
                  {isLoading ? 'Adding...' : 'Add Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}