// Path: components\collection\CollectionCard.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Collection } from '@/types';
import axios, { AxiosError } from 'axios';
import { Bookmark, ChevronRight } from 'lucide-react';

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
      <div className="group relative flex flex-col justify-between p-6 rounded-md border border-white/10 bg-[#1a1a1a] hover:border-white/20 transition-all duration-200 cursor-pointer h-30">
        {/* Top Section: Title and Icon */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white truncate pr-2">
            {collection.name}
          </h3>

          <div className="text-xl">{collection.icon ?? '📁'}</div>
        </div>

        {/* Bottom section: Bookmark count and arrow */}
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
