// Path: components\BookmarkCard.tsx
// 'use client' because we handle onClick events (delete button)
'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { Bookmark } from '@/types';
import axios, { AxiosError } from 'axios';
import { ExternalLink, Trash2, Globe, Pin, Calendar } from 'lucide-react';

// Imported shared Bookmark type — no more `any`!
type BookmarkCardProps = {
  bookmark: Bookmark;
  // onDelete tells the parent page to remove this card from its list after a successful delete — we pass the id back up
  onDelete: (id: string) => void;
};

// Format date (29 Apr)
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
};

const BookmarkCard = ({ bookmark, onDelete }: BookmarkCardProps) => {
  // Track loading state on the delete button so it shows a spinner
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

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
    <div className="group flex flex-col rounded-sm border border-white/10 bg-[#111111] hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200 overflow-hidden">
      {/* ── Card Header ── */}
      <div className="flex items-start gap-3 p-4 pb-3">
        <div className="shrink-0 mt-0.5">
          {bookmark.favicon ? (
            <img
              src={bookmark.favicon}
              alt={bookmark.title}
              width={28}
              height={28}
              className="w-7 h-7 rounded-sm"
              onError={(e) => {
                // If image fails, replace with Globe icon
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById(
                  `fallback-${bookmark.id}`
                );
                if (fallback) fallback.style.display = 'block';
              }}
            />
          ) : null}
          {/* Globe fallback */}
          <Globe
            id={`fallback-${bookmark.id}`}
            className="w-7 h-7 text-white/20"
            style={{ display: bookmark.favicon ? 'none' : 'block' }}
          />
        </div>

        {/* Title + hostname */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate leading-snug">
            {bookmark.title}
          </p>
          <p className="text-xs text-white/40 truncate mt-0.5">{hostname}</p>
        </div>

        {/* Three-dot menu area — open link + delete */}
        <div className="flex items-center gap-1 shrink-0">
          {/* External link */}
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center rounded-md text-white/20 hover:text-violet-400 hover:bg-white/5 transition-colors"
            aria-label={`Open ${bookmark.title}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Delete button — visible on hover */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-7 h-7 flex items-center justify-center rounded-md text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
            aria-label="Delete bookmark"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Description ── */}
      {/* Only rendered if description exists — most bookmarks won't have it initially */}
      {bookmark.description && (
        <p className="text-xs text-white/50 leading-relaxed px-4 pb-3 line-clamp-3">
          {/* line-clamp-3 cuts off at 3 lines with "..." — prevents tall cards */}
          {bookmark.description}
        </p>
      )}

      {/*
        ── Tags placeholder ──
        Tags will be wired up when we build the Tags feature.
        For now we render nothing here — no empty space.
        When ready, map over bookmark.tags and render Badge components.
      */}

      {/* ── Card Footer ── */}
      {/*
        Separator line between content and footer.
        Uses border-t to visually separate — same pattern as the screenshot.
      */}
      <div className="mt-auto border-t border-white/5 px-4 py-2.5 flex items-center justify-between">
        {/* Left side: added date */}
        <div className="flex items-center gap-1 text-white/30">
          <Calendar className="w-3 h-3" />
          <span className="text-xs">{formatDate(bookmark.createdAt)}</span>
        </div>

        {/* Right side: pin button — functionality added later */}
        <button
          onClick={() => setIsPinned((p) => !p)}
          // Toggle local state for now — will connect to DB in future
          className={`
            w-6 h-6 flex items-center justify-center rounded transition-colors
            ${
              isPinned
                ? 'text-violet-400' // pinned = violet
                : 'text-white/20 hover:text-white/50' // unpinned = subtle
            }
          `}
          aria-label={isPinned ? 'Unpin bookmark' : 'Pin bookmark'}
          title="Pin (coming soon)"
        >
          <Pin className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;
