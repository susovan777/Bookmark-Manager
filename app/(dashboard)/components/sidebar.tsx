'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Bookmarks', href: '/bookmarks' },
    { name: 'Collections', href: '/collections' },
  ];

  return (
    <div className="h-full p-4">
      <h2 className="text-lg font-semibold mb-6">Markflow</h2>

      <nav className="space-y-2 ">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'block py-2 px-3 rounded-md text-sm transition',
                isActive
                  ? 'bg-muted font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
