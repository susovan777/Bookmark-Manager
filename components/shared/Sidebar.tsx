// Path: components\shared\Sidebar.tsx

// components/shared/Sidebar.tsx
// This component renders the desktop sidebar.
// On lg+ screens: full width with icons + text (collapsed=false)
// On md screens:  icon-only narrow strip (collapsed=true)
// On mobile: this component is hidden — MobileNav handles it instead.
'use client';

import SidebarContent from './SidebarContent';

const Sidebar = () => {
  return (
    <>
      {/* md screens (768-1023px): icon-only collapsed sidebar */}
      <div className="md:flex lg:hidden h-full">
        <SidebarContent collapsed={true} />
      </div>

      {/* lg+ screens (1024px+): full sidebar with text */}
      <div className="hidden lg:flex h-full w-full">
        <SidebarContent collapsed={false} />
      </div>
    </>
  );
};

export default Sidebar;
