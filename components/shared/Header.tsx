// Path: components\shared\Header.tsx
'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const Header = () => {
  const [search, setSearch] = useState('')

  // Get user session — useful for personalised greeting
  const { data: session } = useSession()

  return (
    <div className="w-full flex items-center justify-between gap-4">

      {/* Search bar */}
      <div className="relative flex-1 max-w-md">
        {/* Search icon positioned inside the input */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <Input
          type="text"
          placeholder="Search bookmarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-amber-400/50 h-9"
        />
      </div>

      {/* Right side: greeting + add button */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Greeting — only shown on larger screens */}
        {session?.user?.name && (
          <span className="hidden lg:block text-sm text-white/40">
            Hey, {session.user.name.split(' ')[0]} 👋
            {/* .split(' ')[0] gets first name only e.g. "John" from "John Doe" */}
          </span>
        )}

        {/* Add Bookmark button — will open a dialog in the next step */}
        <Button
          size="sm"
          className="bg-amber-400 hover:bg-amber-300 text-black font-medium gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Bookmark
        </Button>
      </div>
    </div>
  );
};

export default Header;
