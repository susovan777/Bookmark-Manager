// bookmark-manager/app/(dashboard)/layout.tsx
import React from 'react';
import Sidebar from './_components/sidebar';
import Header from './_components/header';

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <aside className="hidden md:block w-64 border-r bg-white p-4">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center px-6">
          <Header />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </main>
    </div>
  );
};

export default Dashboard;
