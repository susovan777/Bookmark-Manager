import { Button } from '@/components/ui/button';
import React from 'react';

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-xl font-semibold">Bookmarks</h1>

      <div><Button>Add Bookmark</Button></div>
    </div>
  );
};

export default Header;
