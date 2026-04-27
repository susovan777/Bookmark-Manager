// Path: components\shared\Header.tsx

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [search, setSearch] = useState('');
  const { data: session } = useSession();

  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <Input
          type="text"
          placeholder="Search bookmarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-violet-500/50 h-9 text-sm"
        />
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {session?.user?.name && (
          <span className="hidden lg:block text-sm text-white/40">
            Hey, {session.user.name.split(' ')[0]} 👋
          </span>
        )}

        {/* Violet accent button */}
        <Button
          size="sm"
          className="bg-violet-500 hover:bg-violet-400 text-white font-medium gap-2 shadow-lg shadow-violet-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Bookmark</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
