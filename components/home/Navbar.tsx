import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../../public/bookmark.png';

/* ─── tiny hook: track scroll position ─── */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return y;
}

const Navbar = () => {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 40
          ? 'bg-[#06060E]/90 backdrop-blur-xl border-b border-[#1A1930]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src={logo} alt="Bookmark Logo" width={30} height={30} />
          <span className="font-display tracking-wider text-xl text-blue-50">
            Linkmark
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#9E9AB0]">
          {['Features', 'Pricing', 'Blog', 'FAQ'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-violet-200 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-[#9E9AB0] hover:text-violet-200 transition-colors px-4 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-violet-400 hover:bg-violet-300 text-black px-5 py-2 rounded-lg transition-colors glow-violet-sm"
          >
            Get started free
          </Link>
        </div>

        {/* mobile menu button */}
        <button
          className="md:hidden text-[#9E9AB0] hover:text-violet-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0C0B18] border-b border-[#1A1930] px-6 py-4 flex flex-col gap-4">
          {['Features', 'Pricing', 'Blog', 'Docs'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-[#9E9AB0] hover:text-violet-200"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#1A1930]">
            <Link
              href="/login"
              className="text-sm text-center text-[#9E9AB0] py-2"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-center bg-violet-400 text-black py-2.5 rounded-lg"
            >
              Get started free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
