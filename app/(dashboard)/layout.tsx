// bookmark-manager/app/(dashboard)/layout.tsx
import React from 'react';
import Header from '../../components/shared/Header';
import Sidebar from '../../components/shared/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-[#111111]">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center px-6 bg-[#111111] shrink-0">
          <Header />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a]">
          {children}
        </main>
      </main>
    </div>
  );
};

export default DashboardLayout;
