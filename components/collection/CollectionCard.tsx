// Path: components\collection\CollectionCard.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Collection } from '@/types';
import axios, { AxiosError } from 'axios';
import { Trash2, Bookmark, ChevronRight } from 'lucide-react';

type CollectionCardProps = {
  collection: Collection;
  onDelete: (id: string) => void;
};

const CollectionCard = ({ collection, onDelete }: CollectionCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    // Stop the click from bubbling up to the Link — otherwise
    // clicking delete would also navigate to the collection page
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await axios.delete(`/api/collections/${collection.id}`);
      onDelete(collection.id);
      toast.success(`"${collection.name}" deleted`);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error ?? 'Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  const bookmarkCount = collection._count?.bookmarks ?? 0;

  return (
    // The whole card is a link to the collection detail page
    <Link href={`/collections/${collection.id}`}>
      <div className="group flex flex-col gap-4 p-5 rounded-xl border border-white/10 bg-[#111111] hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200 cursor-pointer h-full">
        {/* Header: emoji icon + delete button */}
        <div className="flex items-start justify-between">
          {/* Large emoji icon */}
          <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
            {collection.icon ?? '📁'}
          </div>

          {/* Delete button — appears on hover */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-md text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-all disabled:opacity-50"
            aria-label="Delete collection"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Collection name + description */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm truncate">
            {collection.name}
          </h3>
          {collection.description && (
            <p className="text-xs text-white/40 mt-1 line-clamp-2">
              {collection.description}
            </p>
          )}
        </div>

        {/* Footer: bookmark count + arrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/30">
            <Bookmark className="w-3.5 h-3.5" />
            <span className="text-xs">
              {bookmarkCount} {bookmarkCount === 1 ? 'bookmark' : 'bookmarks'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-violet-400 transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
