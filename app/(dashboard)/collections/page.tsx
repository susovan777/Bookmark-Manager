// Path: app\(dashboard)\collections\page.tsx

'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useCollections } from '@/hooks/useCollections';
import CollectionCard from '@/components/collection/CollectionCard';
import AddCollectionDialog from '@/components/collection/AddCollectionDialog';

const CollectionsPage = () => {
  const {
    collections,
    isLoading,
    error,
    handleAddCollection,
    handleDeleteCollection,
  } = useCollections();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48 bg-white/10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 p-5 rounded-xl border border-white/10 bg-[#111111]"
            >
              <Skeleton className="w-11 h-11 rounded-xl bg-white/10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4 bg-white/10" />
                <Skeleton className="h-3 w-1/2 bg-white/5" />
              </div>
              <Skeleton className="h-3 w-1/3 bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-red-400">Something went wrong</p>
        <p className="text-sm text-white/40 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Collections</h2>
          {collections.length > 0 && (
            <p className="text-sm text-white/40 mt-0.5">
              {collections.length}{' '}
              {collections.length === 1 ? 'collection' : 'collections'}
            </p>
          )}
        </div>
        <AddCollectionDialog onAdd={handleAddCollection} />
      </div>

      {/* Empty state */}
      {collections.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-2xl">
            📁
          </div>
          <div>
            <p className="text-lg font-medium">No collections yet</p>
            <p className="text-sm text-white/40 mt-1">
              Create a collection to organise your bookmarks
            </p>
          </div>
        </div>
      )}

      {/* Collections grid */}
      {collections.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onDelete={handleDeleteCollection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
