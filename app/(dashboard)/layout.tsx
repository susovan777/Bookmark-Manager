// bookmark-manager/app/(dashboard)/layout.tsx

// Server Component — no 'use client' needed.
// MobileNav is a Client Component imported here — this is the correct pattern.
import React from 'react';
import Sidebar from '@/components/shared/Sidebar';
import Header from '@/components/shared/Header';
import MobileNav from '@/components/shared/MobileNav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/*
        Sidebar — responsive widths:
        md (768px+):  w-16 (icon only) — controlled by Sidebar.tsx internally
        lg (1024px+): w-64 (full)      — controlled by Sidebar.tsx internally
        mobile:       hidden — MobileNav handles mobile
      */}
      <aside className="hidden md:flex md:w-16 lg:w-64 flex-col border-r border-white/10 bg-[#111111] shrink-0 transition-all duration-300">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center gap-3 px-4 md:px-6 bg-[#111111] shrink-0">
          {/*
            Mobile menu button — only visible on mobile (hidden md+).
            Lives here so it's always accessible in the header.
          */}
          <MobileNav />

          {/* Header content (search + add button) */}
          <Header />
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
