'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Bookmark, Folders, Settings } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Bookmarks', href: '/bookmarks', icon: <Bookmark size={18} /> },
    { name: 'Categories', href: '/categories', icon: <Folders size={18} /> },
    { name: 'Settings', href: '/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="h-full p-4">
      <h2 className="text-lg font-semibold mb-6">Linkmark</h2>

      <nav className="space-y-2 ">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'flex gap-2 items-center py-2 px-3 rounded-md text-sm transition',
                isActive
                  ? 'bg-muted font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
