// Path: components\home\MockBrowser.tsx

/* ─────────────────────────────────────────
   MOCK BROWSER WINDOW (hero visual)
───────────────────────────────────────── */

import {
  Bookmark,
  BookMarked,
  FolderOpen,
  Globe,
  Search,
  Share2,
  Star,
  Tags,
} from 'lucide-react';
import Image from 'next/image';
import logo from '../../public/bookmark.png';

const MockBrowser = () => {
  return (
    <div className="relative w-full max-w-[780px] mx-auto select-none">
      {/* glow behind */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-radial from-violet-400 via-violet-600 to-transparent scale-110" />

      {/* browser chrome */}
      <div className="rounded-2xl overflow-hidden border border-[#2A2840] shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
        {/* title bar */}
        <div className="bg-[#0F0E1E] px-4 py-3 flex items-center gap-3 border-b border-[#1E1D32]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 bg-[#1A1930] rounded-lg px-3 py-1.5 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#6B6880]" />
            <span className="text-xs text-[#6B6880] font-mono">
              app.Linkmark.io/dashboard
            </span>
          </div>
        </div>

        {/* app chrome */}
        <div className="bg-[#09090F] flex h-[460px]">
          {/* sidebar */}
          <div className="w-52 bg-[#0C0B18] border-r border-[#1A1930] flex flex-col py-4 px-3 gap-1 shrink-0">
            <div className="flex items-center gap-2 px-2 mb-4">
              <Image src={logo} alt="Bookmark Logo" width={20} height={20} />
              <span className="text-sm font-semibold text-violet-50">
                Linkmark
              </span>
            </div>
            {[
              {
                icon: Bookmark,
                label: 'All Bookmarks',
                active: true,
                count: 284,
              },
              { icon: Star, label: 'Favorites', count: 32 },
              { icon: FolderOpen, label: 'Collections', count: 18 },
              { icon: Tags, label: 'Tags', count: 47 },
              { icon: Share2, label: 'Shared', count: 5 },
            ].map(({ icon: Icon, label, active, count }) => (
              <div
                key={label}
                className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                  active
                    ? 'bg-violet-400/10 text-violet-300'
                    : 'text-[#7B7890] hover:text-[#B0ADCA]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </div>
                <span
                  className={`text-[10px] ${
                    active ? 'text-violet-400/70' : 'text-[#4A4860]'
                  }`}
                >
                  {count}
                </span>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-[#1A1930]">
              <p className="text-[10px] text-[#4A4860] px-2 mb-2 uppercase tracking-widest">
                Collections
              </p>
              {['Design Inspo', 'Dev Tools', 'AI & ML', 'Reading List'].map(
                (c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs text-[#7B7890] cursor-pointer hover:text-[#B0ADCA]"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#2A2840]" />
                    {c}
                  </div>
                )
              )}
            </div>
          </div>

          {/* main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* toolbar */}
            <div className="px-5 py-3 border-b border-[#1A1930] flex items-center justify-between">
              <div className="flex items-center gap-2 bg-[#111020] border border-[#1E1D32] rounded-lg px-3 py-1.5 w-56">
                <Search className="w-3.5 h-3.5 text-[#5A5870]" />
                <span className="text-xs text-[#5A5870]">
                  Search bookmarks...
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-violet-400 rounded-lg text-[11px] font-semibold text-black cursor-pointer">
                  + Add
                </div>
              </div>
            </div>

            {/* grid */}
            <div className="flex-1 overflow-hidden p-4 grid grid-cols-2 gap-3 content-start">
              {[
                {
                  title: 'Linear – Issue Tracking',
                  url: 'linear.app',
                  tag: 'Dev Tools',
                  tagColor: 'text-blue-400 bg-blue-400/10',
                  fav: true,
                },
                {
                  title: 'Vercel Dashboard',
                  url: 'vercel.com',
                  tag: 'Dev Tools',
                  tagColor: 'text-blue-400 bg-blue-400/10',
                  fav: false,
                },
                {
                  title: 'Figma — Design Tool',
                  url: 'figma.com',
                  tag: 'Design Inspo',
                  tagColor: 'text-violet-400 bg-violet-400/10',
                  fav: true,
                },
                {
                  title: 'Anthropic  Claude',
                  url: 'claude.ai',
                  tag: 'AI & ML',
                  tagColor: 'text-emerald-400 bg-emerald-400/10',
                  fav: false,
                },
              ].map((bm) => (
                <div
                  key={bm.title}
                  className="bg-[#0F0E1C] border border-[#1E1D32] rounded-xl p-3 cursor-pointer group hover:border-[#2E2C4A] transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-7 h-7 bg-[#1A1930] rounded-lg flex items-center justify-center">
                      <Globe className="w-3.5 h-3.5 text-[#5A5870]" />
                    </div>
                    {bm.fav && (
                      <Star className="w-3.5 h-3.5 text-violet-400 fill-violet-400" />
                    )}
                  </div>
                  <p className="text-xs text-[#D0CEEA] font-medium leading-snug mb-1 line-clamp-2">
                    {bm.title}
                  </p>
                  <p className="text-[10px] text-[#5A5870] mb-2">{bm.url}</p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${bm.tagColor}`}
                  >
                    {bm.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockBrowser;
