'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { themeStyles } from '@/types/theme';

interface AddLinkButtonProps {
  addLink: (userName: string, link: string) => Promise<void>;
  userName: string;
  themeNumber: number;
}

export default function AddLinkButton({ addLink, userName, themeNumber }: AddLinkButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const styles = themeStyles[themeNumber];

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
        className={`${styles.buttonPrimary} px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        Add Link
      </button>

      {isModalOpen && (
        <div className={`fixed inset-0 flex items-center justify-center z-[9999] ${styles.modalOverlay}`}>
          <div className={`${styles.modal} p-6 w-full max-w-md mx-auto`}>
            <h3 className="text-lg font-semibold mb-4">Add New Link</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter URL..."
                className={`w-full px-4 py-2 rounded-lg ${styles.input}`}
                required
              />
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`${styles.buttonSecondary} px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${styles.buttonPrimary} px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50`}
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