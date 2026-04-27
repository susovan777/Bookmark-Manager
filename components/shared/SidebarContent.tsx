// Path: components\shared\SidebarContent.tsx

// This component holds the actual sidebar content (logo, nav, user info).
// It's used in two places:
//   1. Desktop/md sidebar (Sidebar.tsx)
//   2. Mobile drawer (MobileNav.tsx)
// Keeping it separate avoids duplicating code.
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Bookmark, Star, FolderOpen, Tag, LogOut, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/bookmarks', label: 'All Bookmarks', icon: Bookmark },
  { href: '/favourites', label: 'Favourites', icon: Star },
  { href: '/collections', label: 'Collections', icon: FolderOpen },
  { href: '/tags', label: 'Tags', icon: Tag },
];

type SidebarContentProps = {
  // collapsed: true on md screens (icon-only mode)
  collapsed?: boolean;
  // onNavigate: called when a link is clicked — used by mobile drawer to close itself
  onNavigate?: () => void;
};

const SidebarContent = ({
  collapsed = false,
  onNavigate,
}: SidebarContentProps) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      {/* delayDuration={0} makes tooltips appear instantly — better UX */}
      <div className="flex flex-col h-full py-4">
        {/* Logo */}
        <div className={cn('mb-8', collapsed ? 'px-3' : 'px-4')}>
          <Link
            href="/"
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-2.5',
              // When collapsed, center the icon
              collapsed && 'justify-center'
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center shrink-0">
              <Bookmark className="w-4 h-4 text-white" />
            </div>
            {/* Hide "Linkmark" text when collapsed */}
            {!collapsed && (
              <span className="font-semibold text-lg tracking-tight text-white">
                Linkmark
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className={cn('flex-1 space-y-1', collapsed ? 'px-2' : 'px-3')}>
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;

            const linkEl = (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 rounded-lg text-sm transition-colors',
                  // Collapsed: center icon, no text; expanded: full padding
                  collapsed
                    ? 'justify-center p-2.5 w-10 h-10'
                    : 'px-3 py-2 w-full',
                  isActive
                    ? 'bg-violet-500/15 text-violet-400'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon
                  className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')}
                />
                {/* Hide label text in collapsed mode */}
                {!collapsed && <span>{label}</span>}
              </Link>
            );

            // In collapsed (icon-only) mode, wrap each link in a Tooltip
            // so hovering shows the label — important for accessibility/usability
            if (collapsed) {
              return (
                <div key={href} className="flex justify-center">
                  <Tooltip>
                    <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-[#1a1a1a] text-white border-white/10"
                    >
                      {label}
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            }

            return linkEl;
          })}
        </nav>

        {/* User info + sign out at the bottom */}
        <div
          className={cn(
            'pt-4 border-t border-white/10',
            collapsed ? 'px-2' : 'px-3'
          )}
        >
          {status === 'loading' ? (
            <div
              className={cn(
                'flex items-center gap-2 py-2',
                collapsed && 'justify-center'
              )}
            >
              <Loader2 className="w-4 h-4 animate-spin text-white/40" />
              {!collapsed && (
                <span className="text-sm text-white/40">Loading...</span>
              )}
            </div>
          ) : status === 'authenticated' && session?.user ? (
            <div className="space-y-2">
              {/* Avatar + name/email row */}
              <div
                className={cn(
                  'flex items-center gap-3 px-2 py-2',
                  collapsed && 'justify-center'
                )}
              >
                {/* Avatar circle */}
                <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-violet-400 text-sm font-semibold">
                      {(session.user.name ?? session.user.email ?? 'U')
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Hide name/email in collapsed mode */}
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {session.user.name ?? 'User'}
                    </p>
                    <p className="text-xs text-white/40 truncate">
                      {session.user.email}
                    </p>
                  </div>
                )}
              </div>

              {/* Sign out button */}
              {collapsed ? (
                // In collapsed mode — just icon with tooltip
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center justify-center w-10 h-10 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors mx-auto"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-[#1a1a1a] text-white border-white/10"
                  >
                    Sign out
                  </TooltipContent>
                </Tooltip>
              ) : (
                // Full sign out button
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SidebarContent;
