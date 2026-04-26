// Path: components\shared\Sidebar.tsx
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  Bookmark,
  FolderOpen,
  Folders,
  Loader2,
  LogOut,
  Settings,
  Star,
  Tag,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

// Navigation links shown in the sidebar
const navLinks = [
  { href: '/bookmarks', label: 'All Bookmarks', icon: Bookmark },
  { href: '/favourites', label: 'Favourites', icon: Star },
  { href: '/collections', label: 'Collections', icon: FolderOpen },
  { href: '/tags', label: 'Tags', icon: Tag },
];

const Sidebar = () => {
  // useSession() gives us the logged-in user's data in a Client Component.
  // `status` can be: "loading" | "authenticated" | "unauthenticated"
  const { data: session, status } = useSession();

  // usePathname() returns the current URL path e.g. "/bookmarks"
  // We use it to highlight the active nav link
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full py-4">
      {/* Logo */}
      <div className="px-4 mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
            <Bookmark className="w-4 h-4 text-black" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Linkmark</span>
        </Link>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-3 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          // Check if this link is the currently active page
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                // Base styles for all nav items
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                // Active state — amber highlight matching landing page
                isActive
                  ? 'bg-amber-400/10 text-amber-400 font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User info at bottom of sidebar */}
      <div className="px-3 pt-4 border-t border-white/10">
        {status === 'loading' ? (
          // Show spinner while session loads
          <div className="flex items-center gap-2 px-3 py-2 text-white/40">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : status === 'authenticated' && session?.user ? (
          <div className="space-y-3">
            {/* User avatar + name + email */}
            <div className="flex items-center gap-3 px-3 py-2">
              {/* Avatar — show image if available, else show initial */}
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shrink-0 overflow-hidden">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // Show first letter of name or email as fallback
                  <span className="text-black text-sm font-semibold">
                    {(session.user.name ?? session.user.email ?? 'U')
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* min-w-0 prevents text overflow in flex container */}
                <p className="text-sm font-medium truncate">
                  {session.user.name ?? 'User'}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>

            {/* Sign out button */}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              // callbackUrl: '/' → after sign out, go back to landing page
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
