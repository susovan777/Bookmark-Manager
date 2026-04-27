// Path: components\shared\MobileNav.tsx

// This is a separate Client Component just for the mobile menu button + Sheet drawer.
// We keep this separate so app/(dashboard)/layout.tsx stays a Server Component.
'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import SidebarContent from './SidebarContent';
// SidebarContent is the shared nav content used in both desktop and mobile

const MobileNav = () => {
  // Controls whether the mobile drawer is open or closed
  const [open, setOpen] = useState(false);

  return (
    // Only visible on mobile — hidden from md breakpoint upward
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        {/* The hamburger button that triggers the drawer */}
        <SheetTrigger asChild>
          <button
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </SheetTrigger>

        {/* The slide-in drawer from the left */}
        <SheetContent
          side="left"
          className="w-72 p-0 bg-[#111111] border-r border-white/10"
        >
          {/* SheetTitle is required for accessibility (screen readers) */}
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          {/* Reuse the same sidebar content — closes drawer on link click */}
          <SidebarContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
