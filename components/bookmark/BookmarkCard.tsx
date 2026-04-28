// Path: components\BookmarkCard.tsx
// 'use client' because we handle onClick events (delete button)
'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { Bookmark } from '@/types';
import axios, { AxiosError } from 'axios';
import { ExternalLink, Trash2, Globe } from 'lucide-react';

// Imported shared Bookmark type — no more `any`!
type BookmarkCardProps = {
  bookmark: Bookmark;
  // onDelete tells the parent page to remove this card from its list after a successful delete — we pass the id back up
  onDelete: (id: string) => void;
};

const BookmarkCard = ({ bookmark, onDelete }: BookmarkCardProps) => {
  // Track loading state on the delete button so it shows a spinner
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // DELETE /api/bookmarks/:id
      await axios.delete(`/api/bookmarks/${bookmark.id}`);

      // Tell the parent to remove this card from the UI
      onDelete(bookmark.id);

      toast.success('Bookmark deleted');
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error ?? 'Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  // Extract hostname for display e.g. "github.com" from "https://github.com/..."
  let hostname = '';
  try {
    hostname = new URL(bookmark.url).hostname.replace('www.', '');
  } catch {
    hostname = bookmark.url;
  }

  return (
    <div className="group relative flex flex-col gap-3 p-4 rounded-sm border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 transition-all duration-200">
      {/* Top row: favicon + title + external link */}
      <div className="flex items-start gap-3">
        {/* Favicon */}
        <div>
          {bookmark.favicon ? (
            <img
              src={bookmark.favicon}
              alt={bookmark.title}
              className="w-6 h-6"
              // If favicon fails to load, show a globe icon instead
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                // Show the fallback Globe icon
                e.currentTarget.nextElementSibling?.removeAttribute('hidden');
              }}
            />
          ) : null}
          {/* Fallback icon — hidden by default, shown if favicon fails */}
          {/* <Globe className="w-4 h-4 text-white/30" hidden={!!bookmark.favicon} /> */}
        </div>

        {/* Title + URL */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate leading-tight">
            {bookmark.title}
          </p>
          <p className="text-xs text-white/40 truncate mt-0.5">{hostname}</p>
        </div>

        {/* External link — opens URL in new tab */}
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          // noopener noreferrer is a security best practice for target="_blank"
          // It prevents the new tab from accessing your page via window.opener
          className="text-white/20 hover:text-violet-400 transition-colors shrink-0 mt-0.5"
          aria-label={`Open ${bookmark.title}`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Delete button — appears on hover */}
      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-red-400 transition-colors disabled:opacity-50"
          aria-label="Delete bookmark"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;
