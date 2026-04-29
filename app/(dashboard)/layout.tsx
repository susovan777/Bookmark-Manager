// bookmark-manager/app/(dashboard)/layout.tsx

// Server Component — no 'use client' needed.
// MobileNav is a Client Component imported here — this is the correct pattern.
import React from 'react';
import Sidebar from '@/components/shared/Sidebar';

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
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto  bg-[#0a0a0a]">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
