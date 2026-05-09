// Path: app\(dashboard)\collections\[id]\page.tsx

'use client';

import { ArrowLeft, FolderOpen } from 'lucide-react';
import BookmarkLoading from '../../bookmarks/loading';
import { useParams, useRouter } from 'next/navigation';
import { useCollections } from '@/hooks/useCollections';
import BookmarkCard from '@/components/bookmark/BookmarkCard';
import { useBookmarksContext } from '@/context/BookmarkContext';

const CollectionDetailPage = () => {
  // useParams() reads the [id] segment from the URL
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    bookmarks,
    isLoading,
    error,
    handleDeleteBookmark,
    handleUpdateBookmark,
  } = useBookmarksContext();

  const { collections } = useCollections();

  const collection = collections.find((c) => c.id === id);
  const filteredBookmarks = bookmarks.filter((b) => b.collectionId === id);

  if (isLoading) {
    return <BookmarkLoading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-red-400">Collection not found</p>
        <p className="text-sm text-white/40 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button + collection header */}
      <div className="space-y-1">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collections
        </button>

        <div className="flex items-center gap-3">
          {/* Collection emoji icon */}
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
            {collection?.icon ?? '📁'}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{collection?.name}</h2>
            {collection?.description && (
              <p className="text-sm text-white/40 mt-0.5">
                {collection.description}
              </p>
            )}
          </div>
        </div>

        {filteredBookmarks.length > 0 && (
          <p className="text-sm text-white/40 pt-1">
            {filteredBookmarks.length}{' '}
            {filteredBookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
          </p>
        )}
      </div>

      {/* Empty state */}
      {filteredBookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <FolderOpen className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <p className="text-lg font-medium">
              No bookmarks in this collection
            </p>
            <p className="text-sm text-white/40 mt-1">
              Add bookmarks to this collection from the All Bookmarks page
            </p>
          </div>
        </div>
      )}

      {/* Bookmark grid */}
      {filteredBookmarks.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={handleDeleteBookmark}
              onUpdate={handleUpdateBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionDetailPage;
