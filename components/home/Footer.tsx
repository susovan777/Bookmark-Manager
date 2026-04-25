import Link from 'next/link';
import { BookMarked } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-[#1A1930] py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* brand col */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center">
                <BookMarked className="w-4 h-4 text-black" strokeWidth={2.5} />
              </div>
              <span className="font-display text-base text-amber-50">
                Linkmark
              </span>
            </Link>
            <p className="text-sm text-[#6B6880] leading-relaxed max-w-xs">
              The bookmark manager for people who actually care about their
              saved links.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-[#0F0E1C] border border-[#1A1930] rounded-lg flex items-center justify-center text-[#6B6880] hover:text-amber-300 transition-colors"
              >
                {/* <Twitter className="w-3.5 h-3.5" /> */}
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-[#0F0E1C] border border-[#1A1930] rounded-lg flex items-center justify-center text-[#6B6880] hover:text-amber-300 transition-colors"
              >
                {/* <Github className="w-3.5 h-3.5" /> */}
              </a>
            </div>
          </div>

          {/* link cols */}
          {[
            {
              heading: 'Product',
              links: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
            },
            {
              heading: 'Resources',
              links: ['Docs', 'Blog', 'Help center', 'Status'],
            },
            {
              heading: 'Company',
              links: ['About', 'Privacy', 'Terms', 'Contact'],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-xs text-[#5A5870] font-medium uppercase tracking-widest mb-4">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm text-[#7B7890] hover:text-amber-200 transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-[#1A1930] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4A4860]">
            © 2025 Linkmark. All rights reserved.
          </p>
          <p className="text-xs text-[#4A4860]">
            Built with Next.js · Deployed on Vercel · Powered by Neon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
