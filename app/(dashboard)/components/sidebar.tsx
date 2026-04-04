import React from 'react';

const Sidebar = () => {
  return (
    <div className="h-full p-4">
      <h2 className="text-lg font-semibold mb-6">Markflow</h2>

      <nav className="space-y-2 ">
        <a href="" className="block py-2 px-3 rounded-md">
          Bookmarks
        </a>
        <a href="" className="block py-2 px-3 rounded-md">
          Collections
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
