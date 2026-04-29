// Path: app\(dashboard)\bookmarks\page.tsx
'use client';

import BookmarkLoading from './loading';
import Header from '@/components/shared/Header';
import { useBookmarks } from '@/hooks/useBookmark';
import BookmarkCard from '@/components/bookmark/BookmarkCard';
import AddBookmarkDialog from '@/components/bookmark/AddBookmarkDialog';
import MobileNav from '@/components/shared/MobileNav';

const BookmarkPage = () => {
  const {
    bookmarks,
    totalCount,
    isLoading,
    isSearching,
    error,
    searchInput,
    setSearchInput,
    handleAdd,
    handleDelete,
  } = useBookmarks();

  // Full page loading state — only on initial load
  if (isLoading) return <BookmarkLoading />;

  // Show error if fetch failed
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
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center gap-3 px-4 md:px-6 bg-[#111111] shrink-0 mb-0">
        {/* Mobile menu button — only visible on mobile (hidden md+) */}
        <MobileNav />

        {/* Desktop Header */}
        <Header
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          isSearching={isSearching}
          onAdd={handleAdd}
        />
      </header>

      <div className="p-4 md:p-6">
        {/* Content header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {searchInput ? `Results for "${searchInput}"` : 'All Bookmarks'}
            </h2>

            {/* Counts — shows filtered/total when searching */}
            <p className="text-sm text-white/40 mt-0.5">
              {searchInput
                ? `${bookmarks.length} of ${totalCount} bookmarks`
                : totalCount > 0
                ? `${totalCount} saved`
                : ''}
            </p>
          </div>
        </div>

        {/* When no bookmarks found */}
        {bookmarks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-violet-400/10 flex items-center justify-center mb-4">
              <span className="text-2xl">{searchInput ? '🔍' : '🔖'}</span>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">
                {searchInput ? 'No bookmarks found' : 'No bookmarks yet'}
              </p>
              <p className="text-sm text-white/40 mt-1">
                {searchInput
                  ? `No results for "${searchInput}" — try a different term`
                  : 'Click "Add Bookmark" to save your first link'}
              </p>
            </div>

            {/* Only show Add button on empty state, not no-search-results */}
            {!searchInput && <AddBookmarkDialog onAdd={handleAdd} />}
          </div>
        )}

        {/* Bookmark grid */}
        {bookmarks.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onDelete={handleDelete}
                // Pass handleDelete so the card can tell this page when it's deleted
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
