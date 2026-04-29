// Path: components\shared\Header.tsx

'use client';

import { Bookmark } from '@/types';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import AddBookmarkDialog from '../bookmark/AddBookmarkDialog';

type HeaderProps = {
  // These 3 come from useBookmarks() in the page and are passed down
  searchInput: string;
  onSearchChange: (value: string) => void;
  isSearching: boolean;
  // Parent page passes this so newly added bookmarks appear instantly
  onAdd?: (bookmark: Bookmark) => void;
};

const Header = ({
  searchInput,
  onSearchChange,
  isSearching,
  onAdd,
}: HeaderProps) => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        {isSearching ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-violet-400" />
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        )}
        <Input
          type="text"
          placeholder="Search bookmarks..."
          value={searchInput}
          // onChange fires on every keystroke — updates searchInput immediately
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-violet-500/50 h-9 text-sm"
        />

        {/* Clear button — only shows when something is typed */}
        {searchInput && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors text-xs"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {session?.user?.name && (
          <span className="hidden lg:block text-sm text-white">
            Hey, {session.user.name.split(' ')[0]} 👋
          </span>
        )}

        <AddBookmarkDialog onAdd={onAdd ?? (() => {})} />
      </div>
    </div>
  );
};

export default Header;
