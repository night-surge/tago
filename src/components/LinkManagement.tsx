"use client"
import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit2, X, Check, Loader2 } from 'lucide-react';

interface LinkManagementProps {
  username: string;
  links: string[];
  onLinksUpdate: (newLinks: string[]) => void;
}

export function LinkManagement({ username, links, onLinksUpdate }: LinkManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddLink = async () => {
    if (!validateUrl(newLink)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, link: newLink }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add link');
      }

      onLinksUpdate(data.links);
      setNewLink('');
      setIsAddModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/links', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, links: newLinks }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete link');
      }

      onLinksUpdate(data.links);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLink = async (index: number) => {
    if (!validateUrl(editValue)) {
      setError('Please enter a valid URL');
      return;
    }

    const newLinks = [...links];
    newLinks[index] = editValue;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/links', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, links: newLinks }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update link');
      }

      onLinksUpdate(data.links);
      setEditingIndex(null);
      setEditValue('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="w-full px-4 py-2 flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors duration-200"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Add New Link</span>
      </button>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-white/10">
            <h3 className="text-lg font-medium mb-4">Add New Link</h3>
            <input
              type="text"
              placeholder="Enter URL (e.g., https://twitter.com/username)"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 mb-4"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddLink}
                disabled={isLoading || !newLink}
                className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 rounded-lg flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <PlusCircle className="w-4 h-4" />
                )}
                <span>Add Link</span>
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {links.map((link, index) => (
          <div 
            key={`${link}-${index}`}
            className="flex items-center space-x-2 p-4 rounded-lg bg-white/5 border border-white/10"
          >
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <button
                  onClick={() => handleUpdateLink(index)}
                  disabled={isLoading}
                  className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setEditingIndex(null);
                    setEditValue('');
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 truncate">{link}</span>
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setEditValue(link);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <Edit2 className="w-4 h-4 text-blue-500" />
                </button>
                <button
                  onClick={() => handleDeleteLink(index)}
                  disabled={isLoading}
                  className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 text-red-500" />
                  )}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}